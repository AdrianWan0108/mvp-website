/**
 * The site's only server code. Everything else is the static export in ./out;
 * wrangler.jsonc routes just /api/* here (run_worker_first).
 *
 * POST /api/rsvp — Anniversary Rehab Week RSVP:
 *   1. create or update the contact in Brevo and add it to the RSVP list
 *   2. send the confirmation email (Brevo template) with the booked talks
 *
 * Secret: BREVO_API_KEY (`npx wrangler secret put BREVO_API_KEY`; locally, in .dev.vars).
 */

interface Env {
  BREVO_API_KEY: string;
}

const BREVO_API = "https://api.brevo.com/v3";
/** Brevo list "Anniversary Rehab Week 2026 RSVPs". */
const RSVP_LIST_ID = 13;
/** Brevo template "MVP Anniversary Week Confirmation". */
const CONFIRMATION_TEMPLATE_ID = 12;
/** Matches anniversary.rsvp.maxPerTalk in app/lib/anniversary.ts. */
const MAX_PER_TALK = 10;
const TIMEZONE = "America/Toronto";

/** Talk id (its ISO date, as the form sends it) → Brevo number attribute.
 *  The confirmation template reads the same names from `params`. */
const TALK_ATTRIBUTES: Record<string, string> = {
  "2026-11-23": "RSVP_NOV23",
  "2026-11-27": "RSVP_NOV27",
  "2026-11-30": "RSVP_NOV30",
  "2026-12-01": "RSVP_DEC01",
  "2026-12-02": "RSVP_DEC02",
};

type Rsvp = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  /** Attribute name → people, for every talk (0 = not attending). */
  seats: Record<string, number>;
};

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

const text = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

/** Returns the cleaned RSVP, or an error message for the visitor. */
function parse(body: unknown): Rsvp | string {
  if (typeof body !== "object" || body === null) return "Invalid request.";
  const data = body as Record<string, unknown>;

  const firstName = text(data.firstName, 100);
  const lastName = text(data.lastName, 100);
  const email = text(data.email, 254).toLowerCase();
  const phone = text(data.phone, 40);
  if (!firstName || !lastName) return "Please enter your first and last name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address.";
  if ((phone.match(/\d/g) ?? []).length < 7) return "Please enter a valid phone number.";

  const seats: Record<string, number> = Object.fromEntries(
    Object.values(TALK_ATTRIBUTES).map((attribute) => [attribute, 0]),
  );
  const talks = Array.isArray(data.talks) ? data.talks : [];
  for (const talk of talks) {
    if (typeof talk !== "object" || talk === null) continue;
    const { id, people } = talk as Record<string, unknown>;
    const attribute = typeof id === "string" ? TALK_ATTRIBUTES[id] : undefined;
    if (!attribute || typeof people !== "number" || !Number.isInteger(people)) continue;
    seats[attribute] = Math.min(MAX_PER_TALK, Math.max(1, people));
  }
  if (!Object.values(seats).some(Boolean)) return "Please choose at least one talk.";

  return { firstName, lastName, email, phone, seats };
}

async function brevo(env: Env, path: string, body: unknown) {
  const response = await fetch(`${BREVO_API}${path}`, {
    method: "POST",
    headers: {
      "api-key": env.BREVO_API_KEY,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    // Logged to Workers observability; never shown to the visitor.
    console.error(`Brevo ${path} failed: ${response.status} ${await response.text()}`);
  }
  return response.ok;
}

async function handleRsvp(request: Request, env: Env) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json(400, { error: "Invalid request." });
  }

  // Honeypot: a field people never see. Bots that fill it get a quiet "ok".
  if (text((body as Record<string, unknown> | null)?.website, 200)) return json(200, { ok: true });

  const rsvp = parse(body);
  if (typeof rsvp === "string") return json(400, { error: rsvp });

  // Brevo date attributes take YYYY-MM-DD; en-CA formats dates that way.
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: TIMEZONE }).format(new Date());

  // A repeat RSVP from the same email replaces the earlier one: every talk
  // attribute is written, so talks left unticked go back to 0.
  const saved = await brevo(env, "/contacts", {
    email: rsvp.email,
    updateEnabled: true,
    listIds: [RSVP_LIST_ID],
    attributes: {
      FIRSTNAME: rsvp.firstName,
      LASTNAME: rsvp.lastName,
      RSVP_PHONE: rsvp.phone,
      RSVP_UPDATED: today,
      ...rsvp.seats,
    },
  });
  if (!saved) return json(502, { error: "save" });

  const sent = await brevo(env, "/smtp/email", {
    templateId: CONFIRMATION_TEMPLATE_ID,
    to: [{ email: rsvp.email, name: `${rsvp.firstName} ${rsvp.lastName}` }],
    params: { FIRSTNAME: rsvp.firstName, ...rsvp.seats },
  });
  // The RSVP is saved either way; the form tells them if the email didn't go.
  return json(200, { ok: true, emailSent: sent });
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/rsvp") {
      if (request.method !== "POST") return json(405, { error: "Method not allowed." });
      if (!env.BREVO_API_KEY) {
        console.error("BREVO_API_KEY is not set");
        return json(500, { error: "save" });
      }
      return handleRsvp(request, env);
    }
    return json(404, { error: "Not found." });
  },
};

export default worker;
