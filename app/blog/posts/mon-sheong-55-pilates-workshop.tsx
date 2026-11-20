import { CtaButton } from "@/app/components/cta-button";
import { A, Figure, FigureCollage, FigurePair, P, Section } from "../prose";
import type { BlogPhoto, BlogPost } from "./types";

const dir = "/assets/blog/mon-sheong-55-plus-workshop";

// Intrinsic dimensions of the derivatives built by scripts/build-blog-photos.mjs.
// Preserve the supplied crops; the layouts adapt to the photographs.
const photo = {
  participants: {
    src: `${dir}/mon-sheong-55-workshop-participants.webp`,
    alt: "Mon Sheong 55+ members seated together during the movement workshop",
    width: 1600, height: 899,
  },
  breathing: {
    src: `${dir}/seniors-pilates-breathing-posture.webp`,
    alt: "Workshop participants standing with their hands on their ribs and waists",
    width: 1599, height: 1600,
  },
  spine: {
    src: `${dir}/gary-fok-spine-model-mon-sheong-workshop.webp`,
    alt: "Gary holding up a spine model while explaining its movement to the group",
    width: 1599, height: 1600,
  },
  seatedGuidance: {
    src: `${dir}/gary-fok-guiding-seated-participant.webp`,
    alt: "Gary guiding a seated participant during the workshop",
    width: 1599, height: 1600,
  },
  laughter: {
    src: `${dir}/gary-fok-sharing-a-laugh.webp`,
    alt: "Gary smiling with the group during the floor session",
    width: 1599, height: 1600,
  },
  together: {
    src: `${dir}/older-adults-moving-together-pilates.webp`,
    alt: "Older adults practising overhead reaches together in the workshop room",
    width: 1600, height: 900,
  },
  floor: {
    src: `${dir}/gentle-pilates-floor-work-seniors.webp`,
    alt: "Participants reaching their arms up while lying on their mats",
    width: 1600, height: 1600,
  },
  guidance: {
    src: `${dir}/instructor-hands-on-guidance-senior.webp`,
    alt: "Gary supporting a participant's raised arm during floor work",
    width: 1599, height: 1600,
  },
  alignment: {
    src: `${dir}/gary-fok-adjusting-alignment.webp`,
    alt: "Gary guiding a participant with his hands on her bent knees on the mat",
    width: 1599, height: 1600,
  },
  questions: {
    src: `${dir}/gary-fok-answering-questions.webp`,
    alt: "Gary seated on a mat in conversation with a workshop participant",
    width: 1599, height: 1600,
  },
  group: {
    src: `${dir}/mon-sheong-55-members-certificates.webp`,
    alt: "Mon Sheong 55+ members and Gary together with their workshop certificates",
    width: 1600, height: 899,
  },
} satisfies Record<string, BlogPhoto>;

const garyHref = "/about/team/gary-fok";
const monSheongHref = "https://www.monsheong.org/";

// Editorial sources: the owner's account of the workshop flow, the supplied
// video and caption screenshots, and the original brief. Practical mat work
// came first, followed by seated explanations and breathing instruction;
// individual guidance continued throughout. This is authored first-person
// copy, not a transcript. Describe teaching aims, not unverified outcomes.
function Body() {
  return (
    <>
      <P lead>
        When pain, stiffness, or a loss of confidence makes movement
        difficult, being shown an exercise is only a starting point. My
        role is to help someone understand it and find a way to take part
        that works for their body. That was my focus during an afternoon
        Rehab &amp; Movement Workshop with the{" "}
        <A href={monSheongHref}>Mon Sheong Foundation</A>&rsquo;s 55+ community.
      </P>
      <P>
        We began with the practical work. Participants brought their own
        mats and followed my demonstrations, with time for me to work
        alongside them. Later, everyone returned to their seats for
        explanations and breathing instruction. I offered individual
        guidance throughout, but the mat work was the heart of our
        afternoon: a chance to learn by moving, with help when it was needed.
      </P>

      <Section id="different-starting-points" title="Finding a way for each person to take part">
        <P>
          A group of people over 55 will bring different abilities and
          movement concerns into the room. During the practice, some
          participants had difficulty following a movement or could not
          comfortably do it as demonstrated. That was where I needed to
          give more individual attention. I could explain it again,
          offer a tip, or help them approach the movement another way.
        </P>
        <P>
          On the mats, we practised gentle core work and reaching, allowing
          people to work at their own pace. I moved between participants
          to see how they were getting on. Sometimes I supported a raised
          arm; at other times I guided a movement with the knees bent.
          Working beside someone gave me a chance to help with the part
          they were finding difficult, beyond what I could explain to the
          whole room.
        </P>
        <P>
          People also learn in different ways. Watching a demonstration,
          hearing another explanation, and receiving a hands-on cue offer
          different ways to understand the same movement. I used these
          throughout the workshop, including when working with participants
          while seated. The aim was to make the teaching accessible to
          the person in front of me.
        </P>
        <P>
          For me, that is an important part of teaching Pilates to seniors.
          A movement that looks straightforward in a demonstration may
          feel very different to someone dealing with stiffness or
          discomfort. Giving them time, guidance, and another way to
          participate is part of the work. We can share a session while
          making room for those differences.
        </P>
        <FigureCollage
          layout="grid"
          photos={[photo.floor, photo.guidance, photo.alignment, photo.seatedGuidance]}
          caption="Gentle mat work and individual guidance for the arms and bent knees, with support continuing during seated practice."
        />
      </Section>

      <Section id="everyday-movement" title="Practising for everyday movement">
        <P>
          I chose activities with everyday needs in mind. Gentle core work
          gave us a way to practise strength at a manageable pace. We also
          worked on reaching, both on the mats and standing. My aim was to
          help participants work towards more comfortable, confident
          movement in actions they use beyond an exercise class, such as
          reaching for something above them.
        </P>
        <P>
          Balance exercises focused on stability and feeling steadier
          while standing. We also practised getting down to the floor and
          back up. I wanted to give that transition attention in its own
          right. Being able to approach a change of position with more
          confidence is a meaningful goal, alongside the exercises done
          once someone is on the mat.
        </P>
        <P>
          The smaller movements mattered too. I demonstrated work for
          the feet aimed at easing tension, and gentle movements involving
          the knees, hips, and back. These gave us time to focus on parts
          of the body that can make everyday movement feel difficult.
          Alongside strength and balance, I wanted the session to make
          room for comfort and mobility, with guidance suited to what
          each participant could manage.
        </P>
      </Section>

      <Section id="understanding-the-movement" title="Understanding what the body is doing">
        <P>
          During the practical work, I used a spine model to explain how
          the spine is arranged and how it moves. It gave us something
          visible to refer to while talking about posture and alignment.
          I wanted participants to understand what I was asking of them,
          so they had more to work with than simply copying my position.
        </P>
        <P>
          Our posture work included finding length through the spine and
          paying attention to alignment while standing and reaching.
          Easing unnecessary tension around the neck and shoulders was
          one of the aims. The focus was on finding a more comfortable
          way to organise the body during movement, with an explanation
          and a demonstration to help make the idea understandable.
        </P>
        <P>
          Later, with everyone back in their seats, I used slides to
          explain movement principles and taught a breathing method,
          including attention to the breath around the ribs. More
          comfortable breathing was another focus of the workshop.
          This time for explanation complemented the practical work:
          participants could connect what they had tried with a clearer
          understanding of their bodies, and ask for help along the way.
        </P>
        <FigureCollage
          photos={[photo.together, photo.spine, photo.breathing]}
          caption="Reaching together, using the spine model during mat work, and bringing attention to the ribs during standing practice."
        />
      </Section>

      <Section id="learning-together" title="The same attention I bring to MVP">
        <P>
          Participants asked about sore knees, stiff shoulders, and
          continuing to practise at home. I spent time talking with them
          as well as demonstrating. Those questions matter to me because
          they tell me what someone wants help with, and what might make
          movement feel less approachable in daily life.
        </P>
        <P>
          This is the attention I bring to rehabilitation-focused Pilates
          at Motion Vitality Pilates in Markham. Whether someone is
          returning to movement after an injury, managing stiffness, or
          working on strength and balance as they get older, I want to
          understand their starting point. My own experience of recovering
          from injuries has shaped that interest in helping people feel
          more capable through movement.
        </P>
        <P>
          The Mon Sheong group was a community of older adults, but this
          approach matters across ages and abilities. At MVP, our senior
          programmes and individual sessions offer different settings for
          that work. I want people to have space to learn, ask questions,
          and work towards their movement goals with attentive teaching.
        </P>
        <FigurePair
          photos={[photo.questions, photo.laughter]}
          caption="Time to talk on the mats, with some laughter along the way."
        />
      </Section>

      <Section id="thank-you" title="Thank you, Mon Sheong">
        <P>
          Thank you to the <A href={monSheongHref}>Mon Sheong Foundation</A>{" "}
          team for inviting me, and to every member who brought a mat,
          joined the practice, and shared their questions. There was
          concentration, conversation, and laughter throughout the
          afternoon. I am grateful for the opportunity to share this
          work with your community and to spend time learning together.
        </P>
        <Figure
          photo={photo.group}
          wide
          caption="Together with our certificates at the end of the Mon Sheong 55+ workshop."
        />
      </Section>

      <aside aria-labelledby="move-with-us" className="mx-auto mt-12 max-w-[52rem] border-t border-brand-200 pt-8">
        <h2 id="move-with-us" className="text-3xl leading-none sm:text-4xl">
          Find your starting point at MVP
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-brand-950">
          If this approach sounds like the support you have been looking
          for, I would love to welcome you to MVP. Explore our senior
          programmes and individual session options on the pricing page,
          or view the class schedule to see what is available.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
          <CtaButton href="/pricing" square arrow>Explore pricing</CtaButton>
          <CtaButton href="/schedule" variant="outline" square arrow>View class schedule</CtaButton>
        </div>
      </aside>
    </>
  );
}

export const monSheongWorkshop: BlogPost = {
  slug: "mon-sheong-55-pilates-workshop",
  title: "Helping Seniors Move with More Confidence: My Mon Sheong Workshop",
  seoTitle: "Pilates for Seniors in Markham: Mon Sheong 55+ Workshop",
  description:
    "How I adapted Pilates for Mon Sheong’s 55+ members, with gentle strength work, balance practice and individual guidance—the approach I bring to MVP in Markham.",
  category: "Community",
  publishedAt: "2026-11-15",
  updatedAt: "2026-11-19",
  author: { type: "Person", name: "Gary Fok", href: garyHref },
  readingMinutes: 5,
  hero: photo.participants,
  socialImage: `${dir}/social.jpg`,
  Body,
};
