"use client";

import { type FormEvent, useEffect, useId, useState } from "react";
import { CircleCheck, Gift, Minus, Plus } from "lucide-react";
import { cn } from "@/app/lib/cn";
import { site } from "@/app/lib/site";
import { RSVP_SELECT_EVENT } from "./rsvp-link";

/** One talk as the form needs it. `id` is the talk's ISO date. */
export type RsvpTalk = {
  id: string;
  /** Display date, e.g. "Monday, Nov 23". */
  date: string;
  topic: string;
  time?: string;
  host: string;
};

/** Seats per talk id. A talk that isn't in the map isn't being attended. */
type Seats = Record<string, number>;

export type RsvpPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  talks: { id: string; topic: string; date: string; time?: string; people: number }[];
  /** Honeypot; always empty for people. */
  website: string;
};

/** Handled by the Worker in worker/index.ts, which saves to Brevo and sends the confirmation email. */
const RSVP_ENDPOINT = "/api/rsvp";

type Status =
  | { state: "idle" | "sending" }
  | { state: "done"; email: string; emailSent: boolean }
  | { state: "error"; message: string };

/** Everything a submission contains, in one object. */
function buildRsvpPayload(form: FormData, talks: RsvpTalk[], seats: Seats): RsvpPayload {
  const field = (name: string) => String(form.get(name) ?? "").trim();
  return {
    firstName: field("firstName"),
    lastName: field("lastName"),
    email: field("email"),
    phone: field("phone"),
    website: field("website"),
    talks: talks
      .filter((talk) => seats[talk.id])
      .map(({ id, topic, date, time }) => ({ id, topic, date, time, people: seats[id] })),
  };
}

const plural = (count: number, one: string, many: string) => `${count} ${count === 1 ? one : many}`;

const legend = "font-serif text-2xl tracking-[0.04em] text-brand-950 sm:text-[1.75rem]";
const input =
  "mt-1.5 block h-12 w-full rounded-md border border-brand-300 bg-white px-3.5 text-base text-brand-950 placeholder:text-brand-900/45";
const stepButton =
  "grid size-11 place-items-center text-brand-900 hover:bg-brand-100 disabled:text-brand-900/30 disabled:hover:bg-transparent";

function Field({
  label,
  name,
  ...props
}: { label: string; name: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-brand-900">
        {label}
      </label>
      <input id={id} name={name} required className={input} {...props} />
    </div>
  );
}

export function RsvpForm({
  talks,
  maxPerTalk,
  thanks,
}: {
  talks: RsvpTalk[];
  maxPerTalk: number;
  /** Note about what attendees receive, shown above the submit button. */
  thanks: { title: string; description: string };
}) {
  const [seats, setSeats] = useState<Seats>({});
  const [missingTalk, setMissingTalk] = useState(false);
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const errorId = useId();

  // An RSVP link beside a talk in the schedule ticks that talk here.
  useEffect(() => {
    function onSelect(event: Event) {
      const id = (event as CustomEvent<string>).detail;
      if (!talks.some((talk) => talk.id === id)) return;
      setSeats((current) => (current[id] ? current : { ...current, [id]: 1 }));
      setMissingTalk(false);
    }
    window.addEventListener(RSVP_SELECT_EVENT, onSelect);
    return () => window.removeEventListener(RSVP_SELECT_EVENT, onSelect);
  }, [talks]);

  function toggle(id: string, attending: boolean) {
    setSeats((current) => {
      const next = { ...current };
      if (attending) next[id] = 1;
      else delete next[id];
      return next;
    });
    if (attending) setMissingTalk(false);
  }

  function step(id: string, change: number) {
    setSeats((current) => ({
      ...current,
      [id]: Math.min(maxPerTalk, Math.max(1, (current[id] ?? 1) + change)),
    }));
  }

  const chosen = talks.filter((talk) => seats[talk.id]);
  const totalSeats = chosen.reduce((sum, talk) => sum + seats[talk.id], 0);

  // The browser has already checked the required fields by the time this runs.
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.state === "sending") return;
    if (chosen.length === 0) {
      setMissingTalk(true);
      return;
    }

    const payload = buildRsvpPayload(new FormData(event.currentTarget), talks, seats);
    setStatus({ state: "sending" });
    try {
      const response = await fetch(RSVP_ENDPOINT, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => ({}))) as { error?: string; emailSent?: boolean };
      if (!response.ok) {
        // 400s carry a message for the visitor; anything else is our problem, not theirs.
        const message =
          response.status === 400 && result.error
            ? result.error
            : "Sorry, we couldn’t save your RSVP just now. Please try again in a moment.";
        setStatus({ state: "error", message });
        return;
      }
      setStatus({ state: "done", email: payload.email, emailSent: result.emailSent !== false });
    } catch {
      setStatus({
        state: "error",
        message: "We couldn’t reach the studio’s server. Check your connection and try again.",
      });
    }
  }

  // The form stays mounted (just hidden) behind the confirmation, so "Change my
  // RSVP" brings it back with everything still filled in.
  const done = status.state === "done";
  const confirmation = done && (
    <div role="status" className="flex items-start gap-4">
      <CircleCheck className="mt-1 size-7 shrink-0 text-brand-700" aria-hidden />
      <div>
        <p className={legend}>You’re on the list, thank you!</p>
        <ul className="mt-4 space-y-1.5 text-brand-900">
          {chosen.map((talk) => (
            <li key={talk.id}>
              <span className="font-semibold text-brand-950">{talk.topic}</span> · {talk.date}
              {talk.time && <>, {talk.time}</>} · {plural(seats[talk.id], "person", "people")}
            </li>
          ))}
        </ul>
        <p className="mt-4 leading-relaxed text-brand-900">
          {status.emailSent ? (
            <>
              We’ve sent a confirmation to <span className="font-semibold break-words">{status.email}</span>. If
              it isn’t in your inbox in a few minutes, check your spam folder.
            </>
          ) : (
            <>
              Your RSVP is saved, but we couldn’t send the confirmation email to{" "}
              <span className="font-semibold break-words">{status.email}</span>. No need to do anything else, we’ll
              see you there.
            </>
          )}
        </p>
        <button
          type="button"
          onClick={() => setStatus({ state: "idle" })}
          className="mt-5 inline-flex min-h-11 items-center font-medium text-brand-950 underline decoration-brand-400 underline-offset-4 hover:decoration-brand-700"
        >
          Change my RSVP
        </button>
      </div>
    </div>
  );

  const sending = status.state === "sending";

  return (
    <>
    {confirmation}
    <form onSubmit={handleSubmit} className="space-y-9" aria-busy={sending} hidden={done}>
      <fieldset>
        <legend className={legend}>Your details</legend>
        {/* Honeypot: off-screen and hidden from screen readers; bots fill it in. */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="First name" name="firstName" autoComplete="given-name" />
          <Field label="Last name" name="lastName" autoComplete="family-name" />
          <Field label="Email" name="email" type="email" autoComplete="email" inputMode="email" />
          <Field
            label="Phone number"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            pattern="[0-9+()\-.\s]{7,}"
            title="A phone number with at least 7 digits"
          />
        </div>
      </fieldset>

      <fieldset aria-describedby={missingTalk ? errorId : undefined}>
        <legend className={legend}>Which talks would you like to attend?</legend>
        <p className="mt-2 text-brand-900">
          Tick each talk you’re coming to, then set how many people are coming, including you. Changing an
          RSVP? Send it again with the same email and every talk you’re coming to.
        </p>
        <ul className="mt-4 space-y-3">
          {talks.map((talk) => {
            const people = seats[talk.id];
            return (
              <li
                key={talk.id}
                className={cn(
                  "rounded-md border",
                  people ? "border-brand-500 bg-brand-50" : "border-brand-200 bg-white",
                )}
              >
                <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                  <label className="flex min-h-11 flex-1 cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={Boolean(people)}
                      onChange={(event) => toggle(talk.id, event.target.checked)}
                      className="mt-1 size-5 shrink-0 accent-brand-600"
                    />
                    <span>
                      <span className="block font-semibold text-brand-950">{talk.topic}</span>
                      <span className="block text-sm leading-relaxed text-brand-800">
                        {talk.date}
                        {talk.time && <> · {talk.time}</>} · {talk.host}
                      </span>
                    </span>
                  </label>

                  {people && (
                    <div
                      role="group"
                      aria-label={`People attending ${talk.topic}, including you`}
                      className="flex items-center gap-3 pl-8 sm:pl-0"
                    >
                      <span className="text-sm font-medium text-brand-900">People</span>
                      <div className="flex items-center overflow-hidden rounded-md border border-brand-300 bg-white">
                        <button
                          type="button"
                          onClick={() => step(talk.id, -1)}
                          disabled={people <= 1}
                          aria-label="One fewer person"
                          className={stepButton}
                        >
                          <Minus className="size-4" aria-hidden />
                        </button>
                        <output aria-live="polite" className="w-9 text-center font-semibold tabular-nums text-brand-950">
                          {people}
                        </output>
                        <button
                          type="button"
                          onClick={() => step(talk.id, 1)}
                          disabled={people >= maxPerTalk}
                          aria-label="One more person"
                          className={stepButton}
                        >
                          <Plus className="size-4" aria-hidden />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
        {missingTalk && (
          <p id={errorId} role="alert" className="mt-3 font-medium text-red-700">
            Tick at least one talk to RSVP.
          </p>
        )}
      </fieldset>

      <div className="flex items-start gap-4 rounded-md bg-brand-50 p-4 sm:p-5">
        <Gift className="mt-0.5 size-6 shrink-0 text-brand-700" aria-hidden />
        <div>
          <p className="font-semibold text-brand-950">{thanks.title}</p>
          <p className="mt-1 leading-relaxed text-brand-900">{thanks.description}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-brand-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p aria-live="polite" className="font-medium text-brand-900">
          {chosen.length === 0
            ? "No talks selected yet."
            : `${plural(chosen.length, "talk", "talks")} · ${plural(totalSeats, "seat", "seats")}`}
        </p>
        <button
          type="submit"
          disabled={sending}
          className="inline-flex min-h-12 items-center justify-center bg-primary px-7 py-3.5 text-base font-medium text-primary-foreground shadow-[0_8px_20px_-14px_var(--cta-primary-shadow)] transition-[transform,background-color,box-shadow] duration-[var(--cta-duration-out)] ease-[var(--cta-ease)] hover:-translate-y-0.5 hover:bg-[var(--cta-primary-hover)] hover:duration-[var(--cta-duration-in)] active:translate-y-0 disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0 motion-reduce:transform-none motion-reduce:transition-none"
        >
          {sending ? "Sending…" : "Send RSVP"}
        </button>
      </div>

      {status.state === "error" && (
        <p role="alert" className="-mt-4 font-medium text-red-700">
          {status.message} You can also RSVP by calling{" "}
          <a href={`tel:${site.phone}`} className="underline underline-offset-4">{site.phoneDisplay}</a> or emailing{" "}
          <a href={`mailto:${site.email}`} className="break-words underline underline-offset-4">{site.email}</a>.
        </p>
      )}
    </form>
    </>
  );
}
