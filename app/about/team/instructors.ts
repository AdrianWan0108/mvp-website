import { photos, type Photo } from "@/app/lib/images";

export type InstructorGalleryImage = {
  photo: Photo;
  label: string;
  fit: "cover" | "contain";
  position?: string;
};

export type Instructor = {
  slug: string;
  name: string;
  role: string;
  quote: string;
  biography: string[];
  biographyLink?: { text: string; href: string };
  qualifications: string[];
  gallery: InstructorGalleryImage[];
  scheduleHref: string;
  educationHref?: string;
};

/**
 * Gary and Dorothy's biographies are adapted from the studio's published team
 * page. Booking details were intentionally omitted because the live schedule is
 * the source of truth: https://www.motionvitalitypilates.com/copy-of-our-team
 *
 * All three quotes are draft copy for client review. Florence's biography and
 * qualifications were supplied by the client, with qualifications updated
 * September 20, 2026.
 */
export const instructors: Instructor[] = [
  {
    slug: "gary-fok",
    name: "Gary Fok",
    role: "Founder & Director",
    quote:
      "Movement should help you feel capable, confident, and ready for life.",
    biography: [
      "Gary is a dedicated Pilates and GYROTONIC® practitioner with more than 25 years of experience in fitness and wellness. He also holds a 4th-degree black belt in Taekwondo, with a focus on patterns and self-defence.",
      "A lifelong commitment to fitness and martial arts—and his own recovery from multiple injuries—led Gary to discover how Pilates can support both rehabilitation and athletic performance. That experience shapes his passion for helping clients improve body awareness, mobility, core strength, and balance through safe, effective movement.",
      "Gary joined the Polestar Pilates Asia team in 2018 and now serves as an Educator and Mentor for Polestar Pilates US. His wider teaching experience includes HIIT, TRX®, stretching, fascia release, and martial arts, alongside certifications in GYROTONIC®, BodyPump, and BodyCombat.",
      "In Canada, Gary works to make mindful movement accessible to people of different ages and abilities, with particular attention to healthy aging. He also supports clients navigating scoliosis, arthritis, osteoporosis, hip replacements, Parkinson’s disease, and other conditions through personalized movement plans.",
    ],
    qualifications: [
      "Polestar Pilates Educator & Mentor",
      "Certified Polestar Comprehensive & Mat",
      "GYROTONIC® Trainer",
      "GYROKINESIS® Apprentice",
      "4th-degree Taekwondo black belt",
    ],
    gallery: [
      {
        photo: photos.garyTeamHeadshot,
        label: "Portrait",
        fit: "cover",
        position: "object-top",
      },
      {
        photo: photos.garyTeamAction,
        label: "In action",
        fit: "contain",
        position: "object-center",
      },
    ],
    scheduleHref: "/schedule",
    educationHref: "/education",
  },
  {
    slug: "dorothy-leung",
    name: "Dorothy Leung",
    role: "Pilates Instructor",
    quote:
      "Move with intelligence today so you can stay strong for the decades ahead.",
    biography: [
      "Dorothy brings a lifetime of movement, discipline, and design to her Pilates practice. Her journey began with childhood dance and certification in the Chinese Dance Graded Examination Syllabus from the Beijing Dance Academy. Her movement background also includes Chinese and Korean traditional dance and drumming, aerial arts, obstacle racing, snowboarding, and adventure travel.",
      "Performing with Disney Cruise Line deepened Dorothy’s understanding of performance, control, and physical longevity. She later built a 25-year career in industrial and residential design, and the same functional, thoughtful approach now informs the way she teaches movement.",
      "Reconnecting with Pilates in midlife transformed both Dorothy’s physical well-being and her sense of purpose. She travelled between Toronto and Miami for more than a year to complete her comprehensive Polestar Pilates certification.",
      "Dorothy specializes in intelligent, functional movement that supports strength, mobility, and resilience. Her goal is to help clients remain active, capable, and confident through the decades ahead.",
    ],
    qualifications: [
      "Polestar Pilates Mentor in Training",
      "Certified Polestar Comprehensive",
      "Chinese Dance Graded Examination Syllabus certification",
    ],
    gallery: [
      {
        photo: photos.dorothyTeamHeadshot,
        label: "Portrait",
        fit: "cover",
        position: "object-top",
      },
      {
        photo: photos.dorothyTeamAction,
        label: "In action",
        fit: "contain",
        position: "object-center",
      },
    ],
    scheduleHref: "/schedule",
  },
  {
    slug: "florence",
    name: "Florence Chan",
    role: "Pilates Instructor",
    quote:
      "Graceful movement begins with control, confidence, and care.",
    biography: [
      "For more than three decades, Florence has dedicated her life to helping people discover the joy of effortless, efficient movement. As a passionate educator, she weaves together neuroscience and Gyrotonic® principles to create highly individualized training sessions. Florence blends an extensive background in dance, education, and somatic practice to help her clients move with greater ease and strength. Highly adept at tailoring instruction for both private and group settings, she provides a supportive environment for Gyrotonic® and Pilates enthusiasts of all ages and fitness levels.",
      "With a professional dance background, Florence has cultivated a highly trained eye for alignment, symmetry, cadence, and balance. This allows her to detect subtle physical deviations and compensatory patterns before they lead to potential injury. Rather than simply managing pain, she targets underlying technical inefficiencies with precise corrective stretching and strengthening strategies to optimize overall biomechanics. Universally fluent in Cantonese, English, and Mandarin, Florence brings a sophisticated understanding of both Chinese and Canadian cultural paradigms. This unique cross-cultural perspective allows her to facilitate deep, intuitive learning and connect meaningfully with a diverse community of bodies.",
    ],
    biographyLink: { text: "Gyrotonic®", href: "https://www.gyrotonic.com/" },
    qualifications: [
      "Gyrotonic® Trainer",
      "Active Neuromuscular Rehabilitation Medicine Certificates, SFNG Institute",
      "Gyrokinesis® Apprentice",
      "Bachelor of Education, York University",
      "Dance Specialist Title, University of Toronto",
      "Bachelor of Fine Arts (Honours Specialist), York University",
      "Ontario Teaching Certificate, Ontario College of Teachers",
      "RAD Teaching Diploma, Royal Academy of Dancing",
      "Registered Dance Teacher, Chinese Dancers Association",
      "Pilates Reformer Certificate, Pilates Process Toronto",
    ],
    gallery: [
      {
        photo: photos.florenceTeamHeadshot,
        label: "Portrait",
        fit: "cover",
        position: "object-top",
      },
      {
        photo: photos.florenceTeamAction,
        label: "In action",
        fit: "contain",
        position: "object-center",
      },
    ],
    scheduleHref: "/schedule",
  },
];

export function getInstructor(slug: string) {
  return instructors.find((instructor) => instructor.slug === slug);
}
