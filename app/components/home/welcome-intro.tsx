import { Container } from "../container";

const values = [
  {
    title: "Polestar-certified team",
    body: "Every instructor is trained in Polestar's rehabilitation-informed method.",
  },
  {
    title: "Equipment for every level",
    body: "Reformers, GYROTONIC®, Konnector®, chairs, and barrels under one roof.",
  },
  {
    title: "Programs that fit you",
    body: "From first-timers to athletes, pre/postnatal to scoliosis-aware training.",
  },
];

/**
 * "Welcome to MVP" band: a welcome line over a three-column grid of value props.
 */
export function WelcomeIntro() {
  return (
    <section className="bg-brand-200/50 py-10">
      <Container size="wide">
        <p className="max-w-3xl font-serif text-2xl leading-snug sm:text-3xl">
          Welcome to MVP — a studio where strength, mobility, and recovery meet
          expert, science-led coaching.
        </p>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {values.map((value) => (
            <div key={value.title}>
              <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
                {value.title}
              </h2>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                {value.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
