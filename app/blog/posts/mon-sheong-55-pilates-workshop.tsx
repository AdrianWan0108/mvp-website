import Image from "next/image";
import { CtaButton } from "@/app/components/cta-button";
import { anniversary, anniversaryIsActive } from "@/app/lib/anniversary";
import { site } from "@/app/lib/site";
import { A, Figure, FigurePair, InstagramEmbed, P, Quote, Section } from "../prose";
import type { BlogPost } from "./types";

const dir = "/assets/blog/mon-sheong-55-plus-workshop";

// Built by scripts/build-blog-photos.mjs from assets-src/photos/blog/.
const photo = {
  hero: {
    src: `${dir}/gary-fok-spine-model-mon-sheong-workshop.webp`,
    alt: "Pilates instructor Gary Fok using a spine model at the Mon Sheong 55+ workshop",
  },
  room: {
    src: `${dir}/mon-sheong-55-workshop-room-markham.webp`,
    alt: "Mon Sheong 55+ rehab and movement workshop room in Markham",
  },
  breathing: {
    src: `${dir}/seniors-pilates-breathing-posture.webp`,
    alt: "Seniors practising Pilates breathing and posture",
  },
  together: {
    src: `${dir}/older-adults-moving-together-pilates.webp`,
    alt: "Older adults moving together during a Pilates workshop",
  },
  floor: {
    src: `${dir}/gentle-pilates-floor-work-seniors.webp`,
    alt: "Gentle Pilates floor work for seniors",
  },
  guidance: {
    src: `${dir}/instructor-hands-on-guidance-senior.webp`,
    alt: "Instructor giving hands-on guidance to a senior participant",
  },
  alignment: {
    src: `${dir}/gary-fok-adjusting-alignment.webp`,
    alt: "Gary Fok adjusting alignment during floor exercises",
  },
  questions: {
    src: `${dir}/gary-fok-answering-questions.webp`,
    alt: "Gary answering questions from a workshop participant",
  },
  gary: {
    src: `${dir}/gary-fok-polestar-pilates-instructor.webp`,
    alt: "Gary Fok, Polestar Pilates instructor at Motion Vitality Pilates",
  },
  group: {
    src: `${dir}/mon-sheong-55-members-certificates.webp`,
    alt: "Mon Sheong 55+ members holding workshop certificates",
  },
};

const garyHref = "/about/team/gary-fok";
const monSheongHref = "https://www.monsheong.org/";

/**
 * TODO(client): the Instagram reel of the day, e.g.
 * "https://www.instagram.com/reel/XXXXXXXXX/". The embed appears under the
 * intro as soon as this is set.
 */
const instagramReelUrl: string | null = null;

/**
 * TODO(client): Gary's reflection, in his own words (about 150–250 words,
 * one string per paragraph). The section stays hidden until this has text.
 * Questions to ask him: What surprised you most about this group? Was there
 * one person or moment you keep thinking about? Why does teaching older
 * adults matter to you personally? What is the one thing you hope everyone
 * in the room remembers?
 */
const reflection: string[] = [];
/** Optional single line from the reflection, shown large. */
const reflectionPullQuote: string | null = null;

function Body() {
  return (
    <>
      {/* TODO(client): add the date, attendance and venue once confirmed, e.g.
          "On [date], Gary … spent the morning with [number] members of the
          Mon Sheong Foundation at [location]." */}
      <P lead>
        Gary Fok, founder of Motion Vitality Pilates, spent a morning in
        Markham with members of the{" "}
        <A href={monSheongHref}>Mon Sheong Foundation</A>{" "}
        for our 55+ Rehab &amp; Movement Workshop. The idea was simple: show older adults that
        Pilates for seniors is not about hard workouts, but about moving with
        less pain and more confidence. Here is how the day went.
      </P>

      {instagramReelUrl && (
        <InstagramEmbed url={instagramReelUrl} title="Instagram reel from the Mon Sheong 55+ workshop" />
      )}

      <Section id="starting-with-the-spine" title="Starting with the spine">
        <Figure photo={photo.room} ratio="aspect-[16/9]" wide />
        <P>
          Gary opened with an introduction to the Polestar Pilates principles
          of movement, then picked up a spine model. Seeing how the spine
          bends, twists and stacks made the rest of the session click. Once
          people understand their spine, they stop being afraid to move it.
        </P>
      </Section>

      <Section id="standing-taller" title="Standing taller and breathing easier">
        <Figure photo={photo.breathing} ratio="aspect-[4/3]" position="50% 40%" />
        <P>
          Next, everyone stood up. Gary taught the group to find length through
          the spine, as if the top of the head were lifting to the ceiling, and
          to breathe into the sides of the ribs. Then came balance work and big
          overhead reaches, done together as a room. There was a lot of
          laughing.
        </P>
        <Figure photo={photo.together} ratio="aspect-[16/9]" wide />
      </Section>

      <Section id="down-on-the-mats" title="Down on the mats">
        <Figure photo={photo.floor} ratio="aspect-[3/2]" position="55% 45%" />
        <P>
          On the floor, the focus moved to gentle core work at each
          person&rsquo;s own pace, plus easy movements for the knees, hips and
          back. For anyone who preferred not to get down on the floor, Gary
          showed options using a chair.
        </P>
      </Section>

      <Section id="hands-on" title="Hands-on, one person at a time">
        <FigurePair
          photos={[
            { ...photo.guidance, position: "45% 50%" },
            { ...photo.alignment, position: "45% 50%" },
          ]}
        />
        <P>
          This is the part that makes rehab Pilates different. Gary walked the
          room the whole time, adjusting alignment and giving each person an
          easier or harder version. Every body in the room was different, so
          everyone got something slightly different.
        </P>
        <Figure photo={photo.questions} ratio="aspect-[3/2]" position="50% 60%" />
        <P>
          The questions kept coming after the exercises ended, about sore
          knees, stiff shoulders, and how to keep practising at home.
        </P>
      </Section>

      {reflection.length > 0 && (
        <Section id="garys-reflection" title="Gary’s reflection">
          {reflectionPullQuote && <Quote cite="Gary Fok">{reflectionPullQuote}</Quote>}
          {reflection.map((paragraph) => (
            <P key={paragraph.slice(0, 32)}>{paragraph}</P>
          ))}
        </Section>
      )}

      <Section id="thank-you" title="Thank you, Mon Sheong">
        <Figure photo={photo.group} ratio="aspect-[16/9]" wide />
        <P>
          Thank you to the <A href={monSheongHref}>Mon Sheong Foundation</A>{" "}
          team for having us, and to every member who joined. Your energy made
          the day.
        </P>
      </Section>

      {/* Closing invitation: the one place the post sells, kept to the end. */}
      <aside
        aria-labelledby="move-with-us"
        className="mx-auto mt-16 grid w-full max-w-5xl overflow-hidden border border-brand-200 bg-brand-50 sm:mt-20 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
      >
        <div className="relative aspect-[4/3] md:aspect-auto md:min-h-full">
          <Image
            src={photo.gary.src}
            alt={photo.gary.alt}
            fill
            sizes="(min-width: 1088px) 26rem, (min-width: 768px) 40vw, 100vw"
            className="object-cover"
            style={{ objectPosition: "40% 0%" }}
          />
        </div>
        <div className="p-6 sm:p-10">
          <h2 id="move-with-us" className="text-4xl leading-none text-brand-950 sm:text-5xl">
            Come and move with us
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-brand-950/85">
            If the workshop made you curious, come and move with us at{" "}
            {site.name}, {site.address.street.replace(/^Unit \d+, /, "")} in{" "}
            {site.address.locality}.
          </p>
          {anniversaryIsActive && (
            <p className="mt-4 text-lg leading-relaxed text-brand-950/85">
              During our <A href={anniversary.href}>Anniversary Rehab Week</A>,{" "}
              {anniversary.dates.replace(/, \d{4}$/, "")}, every free physio
              talk is followed by a short movement session with Gary.
            </p>
          )}
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
            <CtaButton href="/schedule" square arrow size="lg">
              Book a class
            </CtaButton>
            <A href={garyHref}>Meet Gary</A>
          </div>
        </div>
      </aside>
    </>
  );
}

export const monSheongWorkshop: BlogPost = {
  slug: "mon-sheong-55-pilates-workshop",
  title: "A Morning with Mon Sheong: Our 55+ Rehab & Movement Workshop",
  seoTitle: "Pilates for Seniors in Markham: Mon Sheong 55+ Workshop",
  // TODO(client): once Gary's reflection is in, switch the ending back to the
  // draft's "Here is the day, and what he took away from it."
  description:
    "Gary Fok, a Polestar Pilates instructor, led a rehab and movement workshop for Mon Sheong 55+ members in Markham. Here is how the day went.",
  category: "Community",
  publishedAt: "2026-11-15",
  author: { name: "Motion Vitality Pilates" },
  readingMinutes: 3,
  hero: { ...photo.hero, position: "35% 22%" },
  socialImage: `${dir}/social.jpg`,
  Body,
};
