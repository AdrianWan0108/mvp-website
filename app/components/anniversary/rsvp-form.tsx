"use client";

import { type FormEvent, useEffect, useId, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/app/lib/cn";
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
};

/**
 * Everything a submission contains, in one object. This is the single place
 * to hook up a backend: the site is a static export, so that will be a POST of
 * this payload to an external endpoint rather than a server action.
 */
function buildRsvpPayload(form: FormData, talks: RsvpTalk[], seats: Seats): RsvpPayload {
  const field = (name: string) => String(form.get(name) ?? "").trim();
  return {
    firstName: field("firstName"),
    lastName: field("lastName"),
    email: field("email"),
    phone: field("phone"),
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

export function RsvpForm({ talks, maxPerTalk }: { talks: RsvpTalk[]; maxPerTalk: number }) {
  const [seats, setSeats] = useState<Seats>({});
  const [missingTalk, setMissingTalk] = useState(false);
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
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (chosen.length === 0) {
      setMissingTalk(true);
      return;
    }

    const payload = buildRsvpPayload(new FormData(event.currentTarget), talks, seats);

    // TEMPORARY: no backend yet. Replace this alert with a request that sends
    // `payload`, then show a real confirmation.
    window.alert(
      [
        "RSVP preview — this form isn't connected yet, so nothing has been sent.",
        "",
        `${payload.firstName} ${payload.lastName}`,
        payload.email,
        payload.phone,
        "",
        ...payload.talks.map(
          (talk) =>
            `${talk.date}${talk.time ? `, ${talk.time}` : ""} · ${talk.topic}: ${plural(talk.people, "person", "people")}`,
        ),
      ].join("\n"),
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-9">
      <fieldset>
        <legend className={legend}>Your details</legend>
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
          Tick each talk you’re coming to, then set how many people are coming, including you.
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

      <div className="flex flex-col gap-4 border-t border-brand-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p aria-live="polite" className="font-medium text-brand-900">
          {chosen.length === 0
            ? "No talks selected yet."
            : `${plural(chosen.length, "talk", "talks")} · ${plural(totalSeats, "seat", "seats")}`}
        </p>
        <button
          type="submit"
          className="inline-flex min-h-12 items-center justify-center bg-primary px-7 py-3.5 text-base font-medium text-primary-foreground shadow-[0_8px_20px_-14px_var(--cta-primary-shadow)] transition-[transform,background-color,box-shadow] duration-[var(--cta-duration-out)] ease-[var(--cta-ease)] hover:-translate-y-0.5 hover:bg-[var(--cta-primary-hover)] hover:duration-[var(--cta-duration-in)] active:translate-y-0 motion-reduce:transform-none motion-reduce:transition-none"
        >
          Send RSVP
        </button>
      </div>
    </form>
  );
}
