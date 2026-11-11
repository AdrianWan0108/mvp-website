import { photos, type Photo } from "./images";

type ProgrammeDay = {
  date: string;
  day: string;
  number: string;
  title: string;
  description: string;
  speaker?: string;
  time: string;
  provisional: boolean;
  kind: "talk" | "movement" | "open-house";
};

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
  programme: ProgrammeDay[];
  offers: { label: string; headline: string; detail: string }[];
  offersNote: string;
  celebration: { title: string; description: string };
  admission: string;
  recap: { title: string; description: string };
  images: { homepage: Photo; hero: Photo; studio: Photo; social: Photo };
};

/**
 * Edit campaign copy, times and images here. Monday–Thursday times are sample
 * values: replace them and set provisional to false when confirmed.
 * Set status to "ended" and rebuild to retire all promotional entry points.
 */
export const anniversary: AnniversaryCampaign = {
  id: "anniversary-rehab-week-2026",
  status: "active",
  href: "/anniversary",
  name: "MVP Anniversary Rehab Week",
  dates: "November 23–27, 2026",
  shortDates: "Nov 23–27",
  startDate: "2026-11-23",
  endDate: "2026-11-27",
  timezone: "America/Toronto",
  tagline: "Free physio talks. Movement with Gary. A week together.",
  introduction:
    "Celebrate with the MVP community through a week of conversation, movement, and connection. Explore guest physio talks, get to know our studio, and join us for our anniversary open house.",
  homepageIntroduction:
    "Come together for guest physio talks, our anniversary open house, and special studio offers. There’s something to discover every day.",
  movementNote: "Every talk is followed by movement with Gary.",
  highlights: ["Physio Talks", "Anniversary Open House", "Special Offers"],
  programme: [
    {
      date: "2026-11-23", day: "Monday", number: "23",
      title: "Back pain & posture", speaker: "Guest physiotherapist",
      description: "A conversation about back pain and posture, followed by movement with Gary.",
      time: "6–7 p.m.", provisional: true, kind: "talk",
    },
    {
      date: "2026-11-24", day: "Tuesday", number: "24",
      title: "Movement Check Day",
      description: "Explore trial classes and a personal movement check at the studio.",
      time: "1–4 p.m.", provisional: true, kind: "movement",
    },
    {
      date: "2026-11-25", day: "Wednesday", number: "25",
      title: "Understanding persistent pain", speaker: "Guest physiotherapist",
      description: "Join a talk on persistent pain, then explore movement with Gary.",
      time: "6–7 p.m.", provisional: true, kind: "talk",
    },
    {
      date: "2026-11-26", day: "Thursday", number: "26",
      title: "Anniversary Open House",
      description: "Meet the team, spend time in the studio, and enjoy a community class.",
      time: "1–4 p.m.", provisional: true, kind: "open-house",
    },
    {
      date: "2026-11-27", day: "Friday", number: "27",
      title: "Osteoporosis with Lianne", speaker: "Lianne",
      description: "An evening talk on osteoporosis with Lianne, followed by movement with Gary.",
      time: "6–7 p.m.", provisional: false, kind: "talk",
    },
  ],
  offers: [
    { label: "Group classes", headline: "$89", detail: "5 group classes" },
    { label: "Bring a friend", headline: "$89 each", detail: "6 classes each" },
    { label: "Private sessions", headline: "Buy 10", detail: "Get 2 free" },
  ],
  offersNote: "Packages available at the studio.",
  celebration: {
    title: "Goodie bags + anniversary raffle",
    description: "Attend the Open House or any talk to enter the raffle.",
  },
  admission: "Talks & Open House are free.",
  recap: {
    title: "Thank you for celebrating with us.",
    description: "Anniversary Rehab Week has ended. Here’s a look back at the programme and offers from November 23–27, 2026.",
  },
  images: {
    homepage: photos.groupClass,
    hero: photos.team,
    studio: photos.studioReformerFloor,
    social: photos.groupClass,
  },
};

export const anniversaryIsActive = anniversary.status === "active";
