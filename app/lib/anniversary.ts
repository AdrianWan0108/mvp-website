import { photos, type Photo } from "./images";

/** A clinic logo needs its pixel size: logos render at their own aspect ratio
 *  rather than inside a fixed-ratio box like the photos do. */
type Clinic = { name: string; url: string; logo: Photo & { width: number; height: number } };

/**
 * The guest speakers' clinics. `url` is where the clinic's name and logo link.
 * Logo sizes are the built files' dimensions — see the output of
 * scripts/build-anniversary-photos.mjs.
 */
export const clinics = {
  cornerstone: {
    name: "Cornerstone Physiotherapy",
    url: "https://cornerstonephysio.com/",
    logo: { ...photos.anniversaryLogoCornerstone, width: 432, height: 95 },
  },
  striowski: {
    name: "Striowski & Associates Physiotherapy",
    url: "https://www.striowskiphysio.com/",
    logo: { ...photos.anniversaryLogoStriowski, width: 871, height: 151 },
  },
  familyPhysio: {
    name: "Family Physiotherapy",
    url: "https://www.familyphysiotherapy.com/",
    logo: { ...photos.anniversaryLogoFamilyPhysio, width: 325, height: 155 },
  },
  firstMarkham: {
    name: "First Markham Physiotherapy & Rehabilitation",
    url: "https://www.firstmarkhamrehab.com/",
    logo: { ...photos.anniversaryLogoFirstMarkham, width: 319, height: 98 },
  },
} as const satisfies Record<string, Clinic>;

export type ClinicKey = keyof typeof clinics;

type ProgrammeDay = {
  date: string;
  day: string;
  /** Short month name, e.g. "Nov"; the programme spans two months. */
  month: string;
  number: string;
  /** Short name of the day, shown as the eyebrow. */
  title: string;
  /** What happens that day; follows the date in the heading. */
  summary: string;
  description: string;
  time?: string;
  /** Guest speaker giving the talk; omitted for open houses. A day with a
   *  speaker is a talk, and talks are what the RSVP form lists. */
  speaker?: {
    name: string;
    clinic: ClinicKey;
    photo: Photo;
    /** Their own page on the clinic site. */
    bioUrl: string;
    /** Who they are and why they suit this topic. Facts from their clinic bio only. */
    bio: string;
  };
};

type ProgrammeWeek = { label: string; dates: string; days: ProgrammeDay[] };

type AnniversaryCampaign = {
  id: string;
  status: "active" | "ended";
  href: string;
  name: string;
  dates: string;
  shortDates: string;
  startDate: string;
  endDate: string;
  timezone: string;
  tagline: string;
  introduction: string;
  homepageIntroduction: string;
  movementNote: string;
  highlights: string[];
  programme: ProgrammeWeek[];
  offers: { title: string; description: string }[];
  offersNote: string;
  celebration: { title: string; description: string };
  admission: string;
  /** Most people one RSVP can bring to a single talk, the person included. */
  rsvp: { maxPerTalk: number };
  recap: { title: string; description: string };
  /** `hero` is the diagonal strip, in display order: narrow screens show only
   *  the first three, so lead with the frames that matter most. */
  images: { homepage: Photo; hero: Photo[]; offers: Photo; social: Photo };
};

/**
 * Edit campaign copy and images here. Each programme day and offer is a title
 * plus a sentence or two; add `time` to a day once its time is confirmed.
 * Set status to "ended" and rebuild to retire all promotional entry points.
 */
export const anniversary: AnniversaryCampaign = {
  id: "anniversary-rehab-week-2026",
  status: "active",
  href: "/anniversary",
  name: "MVP Anniversary Rehab Week",
  dates: "November 23 – December 4, 2026",
  shortDates: "Nov 23 – Dec 4",
  startDate: "2026-11-23",
  endDate: "2026-12-04",
  timezone: "America/Toronto",
  tagline: "Free physio talks. Movement with Gary. Two weeks together.",
  introduction:
    "We’re celebrating our anniversary with two weeks of free talks from local physiotherapists, each followed by a short movement session with our head coach Gary, plus two open houses at our Markham studio. Come for one day or all seven. There are goodie bags, an anniversary raffle, and special package offers too.",
  homepageIntroduction:
    "It’s our anniversary and we want to celebrate with you! Join us for two weeks of free talks from local physiotherapists on low back pain, osteoporosis, pelvic floor health, persistent pain and arthritis, and scoliosis and posture, each followed by a short movement session with our head coach Gary. Drop in to an Open House for a posture and strength check, and join us on December 4 for the anniversary raffle draw. There are special anniversary offers and goodie bags too. Come for one day or all seven. We can’t wait to see you!",
  movementNote: "Every talk is followed by a short movement session with our head coach Gary.",
  highlights: ["Physio Talks", "Open Houses", "Special Offers"],
  programme: [
    {
      label: "Week one",
      dates: "Nov 23–27",
      days: [
        {
          date: "2026-11-23", day: "Monday", month: "Nov", number: "23",
          title: "Low back pain", time: "6–7pm",
          summary: "Free physio talk, then movement with Gary",
          speaker: { name: "Tony Fu", clinic: "cornerstone", photo: photos.anniversaryHostTonyFu, bioUrl: "https://cornerstonephysio.com/our-team/tony-fu/",
            bio: "Tony Fu is a physiotherapist at Cornerstone Physiotherapy.",
          },
          description:
            "A free physio talk on low back pain. Afterwards, Gary leads a short movement session of gentle exercises for the trunk and hips, so you can try the ideas in your own body.",
        },
        {
          date: "2026-11-25", day: "Wednesday", month: "Nov", number: "25",
          title: "Open House",
          summary: "Open House and posture & strength check",
          description:
            "Drop in to see the studio and meet the team, and get a posture and strength check while you’re here. A good day to visit if you’re new to Pilates or to the studio.",
        },
        {
          date: "2026-11-27", day: "Friday", month: "Nov", number: "27",
          title: "Osteoporosis", time: "6–7pm",
          summary: "Free physio talk, then movement with Gary",
          speaker: { name: "Lianne Chan", clinic: "striowski", photo: photos.anniversaryHostLianneChan, bioUrl: "https://striowskiphysio.com/users/lianne-chan",
            bio: "Lianne Chan is a physiotherapist at Striowski & Associates Physiotherapy who has worked in orthopaedics since graduating from the University of Toronto in 1993. She is Bone Fit™ trained in prescribing safe exercise for people with osteoporosis and low bone mass, and is an adjunct lecturer for physiotherapy students at the University of Toronto.",
          },
          description:
            "A free physio talk on osteoporosis. Gary follows with a short movement session on posture, balance and controlled strength work to close out the first week.",
        },
      ],
    },
    {
      label: "Week two",
      dates: "Nov 30 – Dec 4",
      days: [
        {
          date: "2026-11-30", day: "Monday", month: "Nov", number: "30",
          title: "Pelvic floor health", time: "6–7pm",
          summary: "Free physio talk, then movement with Gary",
          speaker: { name: "Julianna Chan", clinic: "familyPhysio", photo: photos.anniversaryHostJuliannaChan, bioUrl: "https://www.familyphysiotherapy.com/about-us/our-team/julianna-chan-physiotherapist/",
            bio: "Julianna Chan is a physiotherapist at Family Physiotherapy with a keen interest in pelvic floor rehabilitation. She has completed additional training to treat both female and male pelvic floor conditions, and pairs exercise-based rehab with hands-on manual therapy.",
          },
          description:
            "A free physio talk on pelvic floor health. Afterwards, Gary leads a short movement session on breathing and deep core control.",
        },
        {
          date: "2026-12-01", day: "Tuesday", month: "Dec", number: "1",
          title: "Persistent pain & hip/knee arthritis", time: "6–7pm",
          summary: "Free physio talk, then movement with Gary",
          speaker: { name: "Matthew Johnston", clinic: "cornerstone", photo: photos.anniversaryHostMatthewJohnston, bioUrl: "https://cornerstonephysio.com/our-team/matthew-johnston/",
            bio: "Matthew Johnston is a physiotherapist at Cornerstone Physiotherapy.",
          },
          description:
            "A free physio talk on persistent pain and arthritis of the hip and knee. Afterwards, Gary leads a short movement session of low-impact exercises for hip and knee mobility and strength.",
        },
        {
          date: "2026-12-02", day: "Wednesday", month: "Dec", number: "2",
          title: "Scoliosis & posture", time: "6–7pm",
          summary: "Free talk, then movement with Gary",
          speaker: { name: "Dr. Jessica Tsang", clinic: "firstMarkham", photo: photos.anniversaryHostJessicaTsang, bioUrl: "https://www.firstmarkhamrehab.com/dr-jessica-tsang",
            bio: "Dr. Jessica Tsang is a chiropractor at First Markham Physiotherapy & Rehabilitation and a certified Schroth practitioner, a method for the conservative management of scoliosis. She studied kinesiology at McMaster University and chiropractic at the Canadian Memorial Chiropractic College.",
          },
          description:
            "A free talk on scoliosis and posture. Afterwards, Gary leads a short movement session on posture, breathing and spinal mobility.",
        },
        {
          date: "2026-12-04", day: "Friday", month: "Dec", number: "4",
          title: "Open House",
          summary: "Open House and anniversary raffle draw",
          description:
            "Our anniversary celebration. See the studio, meet the team, and be there for the anniversary raffle draw.",
        },
      ],
    },
  ],
  offers: [
    {
      title: "5 group classes for $89",
      description:
        "Our MVP Welcome Package is $89 for 3 classes. This anniversary offer is the same $89 for 5 group classes, so you get 2 extra classes.",
    },
    {
      title: "Bring a friend: 6 classes each for $89",
      description:
        "Sign up together with a friend and you each get six group classes for $89, one more class than the regular anniversary package.",
    },
    {
      title: "Private sessions: buy 10, get 2 free",
      description: "Buy a package of ten private sessions and we add two more at no charge.",
    },
  ],
  offersNote: "Packages available at the studio.",
  celebration: {
    title: "A little thank-you for joining us",
    description: "Every attendee receives a goodie bag and an entry into our raffle to win 10 Reformer classes. The winner will be drawn at our December 4 Open House.",
  },
  admission: "All events are free.",
  rsvp: { maxPerTalk: 10 },
  recap: {
    title: "Thank you for celebrating with us.",
    description: "Anniversary Rehab Week has ended. Here’s a look back at the programme and offers from November 23 to December 4, 2026.",
  },
  images: {
    homepage: photos.groupClass,
    hero: [
      photos.anniversaryHeroCommunityTalk,
      photos.anniversaryHeroMatClass,
      photos.anniversaryHeroBarrelHandsOn,
      photos.anniversaryHeroSpineModel,
      photos.anniversaryHeroBarrelSession,
    ],
    offers: photos.anniversaryOffersStudio,
    social: photos.anniversarySocial,
  },
};

export const anniversaryIsActive = anniversary.status === "active";
