/**
 * Photo manifest.
 *
 * Maps a logical name to its public path + descriptive alt text. Centralizing
 * alt text keeps it consistent, SEO-friendly, and easy to review. Components
 * render these with <Image fill> inside an aspect-ratio box, so intrinsic
 * dimensions aren't needed here.
 *
 * Paths are relative to /public. Every entry below points at a file that ships
 * in public/assets — that tree holds only what the site actually serves.
 * Camera masters and retired derivatives live in assets-src/ at the repo root,
 * outside public/, so they never reach a build. See assets-src/README.md.
 *
 * Photos are pre-sized and encoded at authoring time (webp unless alpha or a
 * CSS mask demands png) because next.config.ts sets `images.unoptimized` for
 * the static export — whatever is on disk is what the browser downloads.
 */

export type Photo = { src: string; alt: string };

const A = "/mvp-website/assets";

export type BrandLogoTone = "verdant" | "dark" | "white";

type BrandLogoSet = Record<BrandLogoTone, string>;

/**
 * Approved MVP identity suite, organized by lockup and contrast tone. These
 * stay PNG: `monogram` is consumed as a CSS `mask-image` in gallery-wall.tsx,
 * and keeping the whole suite one format avoids a per-tone format lookup.
 */
export const brandLogos = {
  primary: {
    verdant: `${A}/brand/mvp-primary-lockup-verdant.png`,
    dark: `${A}/brand/mvp-primary-lockup-dark.png`,
    white: `${A}/brand/mvp-primary-lockup-white.png`,
  },
  monogram: {
    verdant: `${A}/brand/mvp-monogram-verdant.png`,
    dark: `${A}/brand/mvp-monogram-dark.png`,
    white: `${A}/brand/mvp-monogram-white.png`,
  },
  wordmark: {
    verdant: `${A}/brand/mvp-wordmark-verdant.png`,
    dark: `${A}/brand/mvp-wordmark-dark.png`,
    white: `${A}/brand/mvp-wordmark-white.png`,
  },
  scriptLockup: {
    verdant: `${A}/brand/mvp-script-lockup-verdant.png`,
    dark: `${A}/brand/mvp-script-lockup-dark.png`,
    white: `${A}/brand/mvp-script-lockup-white.png`,
  },
  scriptMark: {
    verdant: `${A}/brand/mvp-script-mark-verdant.png`,
    dark: `${A}/brand/mvp-script-mark-dark.png`,
    white: `${A}/brand/mvp-script-mark-white.png`,
  },
} as const satisfies Record<string, BrandLogoSet>;

export const photos = {
  // --- Brand ---
  mvpLogo: {
    src: brandLogos.primary.verdant,
    alt: "Motion Vitality Pilates logo.",
  },
  polestarLogo: {
    src: `${A}/brand/polestar-logo.png`,
    alt: "Polestar Pilates logo.",
  },
  gyrotonicOfficialLogo: {
    src: `${A}/brand/gyrotonic-logo.webp`,
    alt: "Official GYROTONIC logo.",
  },

  // Retouched wide crop: clean studio-green field on the left for the headline,
  // Gary on the right. Native width — the source is 1672px, so that's the
  // ceiling on how crisp this can get.
  heroBg: {
    src: `${A}/poses/gary-cadillac-hero.webp`,
    alt: "Gary Fok performing an inverted hang on the Cadillac trapeze table, showing control and mobility.",
  },

  mindbodyApp: {
    src: `${A}/booking/mindbody-app.webp`,
    alt: "The Mindbody app showing the Motion Vitality Pilates studio page, ready to book.",
  },

  // --- Studio ---
  studioReformerFloor: {
    src: `${A}/studio/reformer-floor.webp`,
    alt: "Bright, mirrored reformer studio at Motion Vitality Pilates in Markham, lined with Pilates reformers and TRX straps.",
  },
  heritageWall: {
    src: `${A}/studio/heritage-wall.webp`,
    alt: "Gallery wall of vintage black-and-white photographs of Joseph Pilates teaching the original Pilates method.",
  },
  entranceWall: {
    src: `${A}/studio/entrance-wall.webp`,
    alt: "Entrance wall at Motion Vitality Pilates welcoming clients into the studio.",
  },
  polestarOnWall: {
    src: `${A}/studio/polestar-on-wall.webp`,
    alt: "Polestar Pilates sign displayed on the studio wall at Motion Vitality Pilates.",
  },
  polestarFrontDoor: {
    src: `${A}/studio/front-door.webp`,
    alt: "Front entrance of Motion Vitality Pilates featuring the Polestar Pilates branding.",
  },
  spineFigure: {
    src: `${A}/studio/spine-model-detail.webp`,
    alt: "Anatomical spine model used to explain movement and rehabilitation at the studio.",
  },
  spineFigure_2: {
    src: `${A}/studio/spine-model.webp`,
    alt: "Anatomical spine model used to explain movement and rehabilitation at the studio.",
  },

  // --- Equipment (one per signature class) ---
  reformer: {
    src: `${A}/equipment/reformer-1.webp`,
    alt: "Pilates reformer with carriage, springs, and footbar at Motion Vitality Pilates.",
  },
  reformer2: {
    src: `${A}/equipment/reformer-2.webp`,
    alt: "Close view along a Pilates reformer carriage in the first studio room.",
  },
  reformer4: {
    src: `${A}/equipment/reformer-4.webp`,
    alt: "Wide view of a Pilates reformer in the mirrored group studio.",
  },
  reformer5: {
    src: `${A}/equipment/reformer-5.webp`,
    alt: "Pilates reformer and tower in the sunlit first studio room.",
  },
  spineAndBalls: {
    src: `${A}/equipment/spine-and-balls.webp`,
    alt: "Anatomical spine model and small Pilates balls used for movement instruction.",
  },
  yogaBlocks: {
    src: `${A}/equipment/yoga-blocks.webp`,
    alt: "Supportive yoga blocks available beside the reformer room.",
  },
  gyrotonic: {
    src: `${A}/equipment/gyrotonic-1.webp`,
    alt: "GYROTONIC® pulley tower combination unit for circular, flowing movement.",
  },
  gyrotonic4: {
    src: `${A}/equipment/gyrotonic-2.webp`,
    alt: "Detailed portrait of the GYROTONIC® pulley tower apparatus.",
  },
  gyrotonicBrandDetail: {
    src: `${A}/equipment/gyrotonic-detail-1.webp`,
    alt: "GYROTONIC® branding carved into the wooden pulley tower.",
  },
  gyrotonicLogo6: {
    src: `${A}/equipment/gyrotonic-detail-2.webp`,
    alt: "GYROTONIC® logo detail on the wooden apparatus base.",
  },
  gyrokinesisStool: {
    src: `${A}/equipment/gyrokinesis-stool.webp`,
    alt: "Padded GYROKINESIS® stool used for seated movement practice.",
  },
  trapezeTable: {
    src: `${A}/equipment/trapeze-table.webp`,
    alt: "Trapeze Table with springs, push-through bar, and supportive loops.",
  },
  konnector: {
    src: `${A}/equipment/konnector-1.webp`,
    alt: "Konnector® apparatus attached to a reformer for connected, full-body Pilates.",
  },
  konnector2: {
    src: `${A}/equipment/konnector-2.webp`,
    alt: "Konnector® cords and attachment points in the second studio room.",
  },
  wundaChair: {
    src: `${A}/equipment/wunda-chair-1.webp`,
    alt: "Pilates Wunda chair used for strength and balance training.",
  },
  wundaChair2: {
    src: `${A}/equipment/wunda-chair-2.webp`,
    alt: "Wunda Chair pedal and spring details for supported strength work.",
  },
  wundaChair4: {
    src: `${A}/equipment/wunda-chair-3.webp`,
    alt: "Wunda Chair positioned among the apparatus in the second room.",
  },
  barrel: {
    src: `${A}/equipment/barrel.webp`,
    alt: "Pilates ladder barrel used for spinal extension and stretching.",
  },

  // --- People ---
  team: {
    src: `${A}/team/team-under-polestar-sign.webp`,
    alt: "The Motion Vitality Pilates instructor team smiling together beneath the Polestar Pilates sign.",
  },
  teamPolestar: {
    src: `${A}/team/team-mvp-polestar.webp`,
    alt: "The Motion Vitality Pilates instructor team together, trained in the Polestar method.",
  },
  garyTeamHeadshot: {
    src: `${A}/team/gary-headshot.webp`,
    alt: "Portrait of Gary Fok, founder and director of Motion Vitality Pilates.",
  },
  garyTeamAction: {
    src: `${A}/team/gary-in-action.webp`,
    alt: "Gary Fok demonstrating a Pilates movement at Motion Vitality Pilates.",
  },
  dorothyTeamHeadshot: {
    src: `${A}/team/dorothy-headshot.webp`,
    alt: "Portrait of Dorothy Leung, Pilates instructor at Motion Vitality Pilates.",
  },
  dorothyTeamAction: {
    src: `${A}/team/dorothy-in-action.webp`,
    alt: "Dorothy Leung demonstrating a Pilates movement at Motion Vitality Pilates.",
  },
  florenceTeamHeadshot: {
    src: `${A}/team/florence-headshot.webp`,
    alt: "Portrait of Florence, Pilates instructor at Motion Vitality Pilates.",
  },
  florenceTeamAction: {
    src: `${A}/team/florence-in-action.webp`,
    alt: "Florence demonstrating a Pilates movement at Motion Vitality Pilates.",
  },
  garyHeadshot: {
    src: `${A}/team/gary-portrait.webp`,
    alt: "Portrait of Gary Fok, founder of Motion Vitality Pilates, in a Polestar Canada shirt.",
  },
  dorothyHeadshot: {
    src: `${A}/team/dorothy-portrait.webp`,
    alt: "Portrait of Dorothy, Pilates instructor at Motion Vitality Pilates.",
  },
  florenceHeadshot: {
    src: `${A}/team/florence-portrait.webp`,
    alt: "Portrait of Florence, Pilates instructor at Motion Vitality Pilates.",
  },

  // --- Movement / Polestar mood ---
  garyPose: {
    src: `${A}/poses/gary-pose.webp`,
    alt: "Instructor demonstrating a controlled Pilates movement, showing strength and alignment.",
  },
  garyMoveUpLadderCutout: {
    src: `${A}/poses/gary-move-up-ladder-cutout.webp`,
    alt: "Gary Fok reaching upward in a long split stance, representing his journey from instructor to educator.",
  },
  florencePose: {
    src: `${A}/poses/florence-pose.webp`,
    alt: "Instructor demonstrating a graceful, balanced Pilates movement.",
  },

  // --- Teaching ---
  privateSession: {
    src: `${A}/teaching/private-session-dorothy.webp`,
    alt: "Pilates instructor giving hands-on cues to a client during a private one-on-one reformer session.",
  },
  groupClass: {
    src: `${A}/teaching/group-class-gary.webp`,
    alt: "Gary Fok leading a small group reformer class at Motion Vitality Pilates in Markham.",
  },
  pricingHero: {
    src: `${A}/teaching/group-class-dorothy-hero.webp`,
    alt: "Dorothy guiding clients through a group reformer class at Motion Vitality Pilates.",
  },

  // --- Education / past training ---
  janeGotch: {
    src: `${A}/education/jane-gotch.webp`,
    alt: "Jane Gotch performing a flowing backbend on the GYROTONIC® apparatus.",
  },
  gyrokinesisCohort: {
    src: `${A}/education/gyrokinesis-cohort.webp`,
    alt: "Jane Gotch, Gary Fok, and the GYROKINESIS® course cohort posing together in the studio.",
  },

  // --- Polestar community (teacher-training context) ---
  polestarFaculty: {
    src: `${A}/education/polestar-faculty.webp`,
    alt: "Polestar Pilates faculty and trainees gathered on the steps of a Polestar Life Center training retreat.",
  },
  polestarCohort: {
    src: `${A}/education/polestar-cohort.webp`,
    alt: "A Polestar Pilates teacher-training cohort together in the studio beneath the Polestar banner.",
  },

  // --- Mentors — Gary with the educators and mentors who shaped his teaching ---
  mentorTraceyMallett: {
    src: `${A}/mentors/tracey-mallett.webp`,
    alt: "Gary Fok with Tracey Mallett, fitness expert and creator of bodybarre.",
  },
  mentorBrentAnderson: {
    src: `${A}/mentors/brent-anderson.webp`,
    alt: "Gary Fok with Dr. Brent Anderson, founder of Polestar Pilates.",
  },
  mentorDawnnaWayburne: {
    src: `${A}/mentors/dawnna-wayburne.webp`,
    alt: "Gary Fok with Dawnna Wayburne, head of Polestar Asia and founder of Isofit HK.",
  },
  mentorShellyPower: {
    src: `${A}/mentors/shelly-power.webp`,
    alt: "Gary Fok with Shelly Power, VP International Education at Polestar Pilates and co-founder of Polestar Pilates Center Miami.",
  },
  mentorChristiIdavoy: {
    src: `${A}/mentors/christi-idavoy.webp`,
    alt: "Gary Fok with Christi Idavoy, Senior Educator at Polestar Pilates.",
  },
  mentorNelsonCheak: {
    src: `${A}/mentors/nelson-cheak.webp`,
    alt: "Gary Fok with Master Nelson Cheak, founder of the GCTF Taekwondo Federation.",
  },
  mentorYvonneHsi: {
    src: `${A}/mentors/yvonne-hsi.webp`,
    alt: "Gary Fok with Yvonne Hsi, Senior Polestar Educator in Asia and founder of In-Motion HK.",
  },
  mentorSerafinaAmbrosio: {
    src: `${A}/mentors/serafina-ambrosio.webp`,
    alt: "Gary Fok with Serafina Ambrosio, Master Educator for Polestar Italy.",
  },
  mentorHagitBerdishevsky: {
    src: `${A}/mentors/hagit-berdishevsky.webp`,
    alt: "Gary Fok with Dr. Hagit Berdishevsky, Co-Director of Conservative Care for Spinal Deformities at Columbia.",
  },
  mentorLisaStolze: {
    src: `${A}/mentors/lisa-stolze.webp`,
    alt: "Gary Fok with Lisa Stolze, advanced scoliosis physical therapist and educator for SSQL-Schroth, founder of Stolze Therapies.",
  },
} as const satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

/** The new primary lockup doubles as the exact mask for the homepage reveal. */
export const mvpLogoReveal = {
  alt: "Motion Vitality Pilates logo.",
  aspect: 2887 / 1312,
  mask: brandLogos.primary.verdant,
} as const;

/**
 * The 8×4 photo mosaic masked by the MVP monogram in the home page's "Be our
 * MVP" section. Tiles are purely decorative — each <Image> renders with alt=""
 * and aria-hidden under the wrapper's role="img" label — so these are bare
 * paths rather than Photo entries.
 *
 * They point at 600px derivatives, not the full-size sets: a tile is only
 * ~152×104 CSS px, and next.config.ts disables image optimization, so the
 * originals would ship ~1.8MB for imagery nobody sees at size.
 *
 * Order is row-major across 8 columns, sequenced so movement, teaching, studio,
 * and equipment interleave instead of clustering — index 0 is the top-left tile
 * that also carries the sheen sweep.
 *
 * Built by scripts/build-collage-photos.mjs — keep this list in sync with that
 * script's SOURCES.
 */
export const collagePhotos: string[] = [
  // row 1
  `${A}/collage/gary-pose-1.webp`,
  `${A}/collage/dorothy-private-1.webp`,
  `${A}/collage/florence-pose-1.webp`,
  `${A}/collage/reformer-environment.webp`,
  `${A}/collage/dorothy-pose-1.webp`,
  `${A}/collage/gary-group-1.webp`,
  `${A}/collage/team-polestar-sign.webp`,
  `${A}/collage/gyrotonic-1.webp`,
  // row 2
  `${A}/collage/dorothy-pose-3.webp`,
  `${A}/collage/entrance-wall.webp`,
  `${A}/collage/gary-pose-3.webp`,
  `${A}/collage/dorothy-group-1.webp`,
  `${A}/collage/florence-in-action.webp`,
  `${A}/collage/barrel-1.webp`,
  `${A}/collage/florence-pose-2.webp`,
  `${A}/collage/dorothy-private-2.webp`,
  // row 3
  `${A}/collage/gary-in-action.webp`,
  `${A}/collage/gary-pose-5.webp`,
  `${A}/collage/heritage-wall.webp`,
  `${A}/collage/dorothy-pose-5.webp`,
  `${A}/collage/gary-group-5.webp`,
  `${A}/collage/florence-pose-3.webp`,
  `${A}/collage/konnector-1.webp`,
  `${A}/collage/dorothy-headshot.webp`,
  // row 4
  `${A}/collage/dorothy-pose-6.webp`,
  `${A}/collage/reformer-1.webp`,
  `${A}/collage/gary-pose-7.webp`,
  `${A}/collage/dorothy-group-2.webp`,
  `${A}/collage/spine-figure.webp`,
  `${A}/collage/gary-pose-11.webp`,
  `${A}/collage/team-mvp-polestar.webp`,
  `${A}/collage/wunda-chair-1.webp`,
];

/**
 * Four Gary & Dorothy movement poses used as the 2×2 background collage behind
 * the Polestar "Learn to Move" heading. Order is row-major (top-left → bottom-
 * right). Rendered decoratively under a dark overlay.
 *
 * These reuse the 600px collage tiles rather than their own derivatives: the
 * only consumer is app/about/polestar/page.tsx, which currently calls
 * notFound(), so shipping full-size copies would be dead weight. If that page
 * comes back, re-cut these from the masters in assets-src/.
 */
export const learnToMovePoses: Photo[] = [
  {
    src: `${A}/collage/dorothy-pose-3.webp`,
    alt: "Dorothy demonstrating a controlled Pilates movement in the studio.",
  },
  {
    src: `${A}/collage/gary-pose-5.webp`,
    alt: "Gary Fok performing a strong, balanced Pilates movement.",
  },
  {
    src: `${A}/collage/gary-pose-11.webp`,
    alt: "Gary Fok showing strength and stability in a reformer exercise.",
  },
  {
    src: `${A}/collage/dorothy-pose-6.webp`,
    alt: "Dorothy demonstrating a graceful, controlled Pilates movement.",
  },
];
