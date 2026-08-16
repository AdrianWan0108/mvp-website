/**
 * Photo manifest.
 *
 * Maps a logical name to its public path + descriptive alt text. Centralizing
 * alt text keeps it consistent, SEO-friendly, and easy to review. Components
 * render these with <Image fill> inside an aspect-ratio box, so intrinsic
 * dimensions aren't needed here.
 *
 * Paths are relative to /public. Only photos used by the in-scope pages
 * (Home + Polestar) are listed; add more as pages are built.
 *
 * NOTE: many portrait shots are stored EXIF-rotated. A one-off auto-orient
 * pass normalizes them upright (see plan's verification step).
 */

export type Photo = { src: string; alt: string };

const base = "/mvp-website/assets/photos";
const opt = "/mvp-website/assets/photos-optimized";

export const photos = {
  // --- Brand ---
  mvpLogo: {
    src: `${base}/polestar-logo/mvp-wordmark.png`,
    alt: "Motion Vitality Pilates wordmark.",
  },

  heroBg: {
    src: `${opt}/polestar-logo/Hero.webp`,
    alt: "Pilates instructor performing an inverted hang on the Cadillac trapeze table, showing control and mobility.",
  },

  mindbodyApp: {
    src: `${base}/polestar-logo/Mindbody.png`,
    alt: "The Mindbody app showing the Motion Vitality Pilates studio page, ready to book.",
  },

  // --- Studio ---
  studioReformerFloor: {
    src: `${opt}/studio-interior/reformer-environment.webp`,
    alt: "Bright, mirrored reformer studio at Motion Vitality Pilates in Markham, lined with Pilates reformers and TRX straps.",
  },
  heritageWall: {
    src: `${base}/studio-interior/pilates-wall-1.jpg`,
    alt: "Gallery wall of vintage black-and-white photographs of Joseph Pilates teaching the original Pilates method.",
  },
  entranceWall: {
    src: `${opt}/studio-interior/entrance-wall.webp`,
    alt: "Entrance wall at Motion Vitality Pilates welcoming clients into the studio.",
  },
  polestarOnWall: {
    src: `${base}/studio-interior/polestar-on-wall.jpg`,
    alt: "Polestar Pilates sign displayed on the studio wall at Motion Vitality Pilates.",
  },
  polestarFrontDoor: {
    src: `${base}/studio-interior/polestar-frontdoor.jpg`,
    alt: "Front entrance of Motion Vitality Pilates featuring the Polestar Pilates branding.",
  },
  spineFigure: {
    src: `${opt}/studio-interior/spine-figure.webp`,
    alt: "Anatomical spine model used to explain movement and rehabilitation at the studio.",
  },
  spineFigure_2: {
    src: `${base}/studio-interior/spine-figure-2.jpg`,
    alt: "Anatomical spine model used to explain movement and rehabilitation at the studio.",
  },

  // --- Equipment (one per signature class) ---
  reformer2: {
    src: `${opt}/equipment/reformer-2.webp`,
    alt: "Close view along a Pilates reformer carriage in the first studio room.",
  },
  reformer3: {
    src: `${opt}/equipment/reformer-3.webp`,
    alt: "Pilates reformer details and spring system at Motion Vitality Pilates.",
  },
  reformer4: {
    src: `${opt}/equipment/reformer-4.webp`,
    alt: "Wide view of a Pilates reformer in the mirrored group studio.",
  },
  reformer5: {
    src: `${opt}/equipment/reformer-5.webp`,
    alt: "Pilates reformer and tower in the sunlit first studio room.",
  },
  spineAndBalls: {
    src: `${opt}/equipment/spine-and-balls-1.webp`,
    alt: "Anatomical spine model and small Pilates balls used for movement instruction.",
  },
  yogaBlocks: {
    src: `${opt}/equipment/yoga-blocks-1.webp`,
    alt: "Supportive yoga blocks available beside the reformer room.",
  },
  gyrotonic2: {
    src: `${opt}/equipment/gyrotonic-2.webp`,
    alt: "Full GYROTONIC® pulley tower combination unit in the third studio room.",
  },
  gyrotonic3: {
    src: `${opt}/equipment/gyrotonic-3.webp`,
    alt: "Wide view of GYROTONIC® equipment and curved movement rails.",
  },
  gyrotonic4: {
    src: `${opt}/equipment/gyrotonic-4.webp`,
    alt: "Detailed portrait of the GYROTONIC® pulley tower apparatus.",
  },
  gyrotonic5: {
    src: `${opt}/equipment/gyrotonic-5.webp`,
    alt: "Close view of the GYROTONIC® rotational pulley housing.",
  },
  gyrotonicBrandDetail: {
    src: `${opt}/equipment/gyrotonic-logo-1.webp`,
    alt: "GYROTONIC® branding carved into the wooden pulley tower.",
  },
  gyrotonicLogo6: {
    src: `${opt}/equipment/gyrotonic-logo-6.webp`,
    alt: "GYROTONIC® logo detail on the wooden apparatus base.",
  },
  gyrokinesisStool: {
    src: `${opt}/equipment/gyrokinesis-1.webp`,
    alt: "Padded GYROKINESIS® stool used for seated movement practice.",
  },
  trapezeTable: {
    src: `${opt}/equipment/trapeze-table-1.webp`,
    alt: "Trapeze Table with springs, push-through bar, and supportive loops.",
  },
  konnector2: {
    src: `${opt}/equipment/konnecto2.webp`,
    alt: "Konnector® cords and attachment points in the second studio room.",
  },
  wundaChair2: {
    src: `${opt}/equipment/wunda-chair-2.webp`,
    alt: "Wunda Chair pedal and spring details for supported strength work.",
  },
  wundaChair3: {
    src: `${opt}/equipment/wunda-chair-3.webp`,
    alt: "Side view of the compact Pilates Wunda Chair.",
  },
  wundaChair4: {
    src: `${opt}/equipment/wunda-chair-4.webp`,
    alt: "Wunda Chair positioned among the apparatus in the second room.",
  },
  barrel2: {
    src: `${opt}/equipment/barrel-2.webp`,
    alt: "Ladder Barrel and curved padding used for supported spinal movement.",
  },
  reformer: {
    src: `${opt}/equipment/reformer-1.webp`,
    alt: "Pilates reformer with carriage, springs, and footbar at Motion Vitality Pilates.",
  },
  gyrotonic: {
    src: `${opt}/equipment/gyrotonic-1.webp`,
    alt: "GYROTONIC® pulley tower combination unit for circular, flowing movement.",
  },
  konnector: {
    src: `${opt}/equipment/konnector-1.webp`,
    alt: "Konnector® apparatus attached to a reformer for connected, full-body Pilates.",
  },
  wundaChair: {
    src: `${opt}/equipment/wunda-chair-1.webp`,
    alt: "Pilates Wunda chair used for strength and balance training.",
  },
  barrel: {
    src: `${opt}/equipment/barrel-1.webp`,
    alt: "Pilates ladder barrel used for spinal extension and stretching.",
  },
  polestarLogo: {
    src: `${base}/polestar-logo/POLESTAR_TM_-_Default_Logo.png`,
    alt: "Polestar Pilates logo.",
  },
  gyrotonicOfficialLogo: {
    src: `${opt}/equipment/gyrotonic-logo-transparent.png`,
    alt: "Official GYROTONIC logo.",
  },
  gyrokinesisWordmark: {
    src: `${opt}/equipment/gyrokinesis-wordmark.webp`,
    alt: "GYROKINESIS registered wordmark on MVP equipment.",
  },

  // --- People ---
  team: {
    src: `${opt}/instructor-team/team-under-polestar-logo.webp`,
    alt: "The Motion Vitality Pilates instructor team smiling together beneath the Polestar Pilates sign.",
  },
  team_2: {
    src: `${base}/instructor-team/team-under-polestar-logo-2.jpg`,
    alt: "The Motion Vitality Pilates instructor team smiling together beneath the Polestar Pilates sign.",
  },
  teamPolestar: {
    src: `${opt}/instructor-team/team-mvp-polestar.webp`,
    alt: "The Motion Vitality Pilates instructor team together, trained in the Polestar method.",
  },
  garyTeamHeadshot: {
    src: `${opt}/about-team/gary-headshot.webp`,
    alt: "Portrait of Gary Fok, founder and director of Motion Vitality Pilates.",
  },
  garyTeamAction: {
    src: `${opt}/about-team/gary-in-action.webp`,
    alt: "Gary Fok demonstrating a Pilates movement at Motion Vitality Pilates.",
  },
  dorothyTeamHeadshot: {
    src: `${opt}/about-team/dorothy-headshot.webp`,
    alt: "Portrait of Dorothy Leung, Pilates instructor at Motion Vitality Pilates.",
  },
  dorothyTeamAction: {
    src: `${opt}/about-team/dorothy-in-action.webp`,
    alt: "Dorothy Leung demonstrating a Pilates movement at Motion Vitality Pilates.",
  },
  florenceTeamHeadshot: {
    src: `${opt}/about-team/florence-headshot.webp`,
    alt: "Portrait of Florence, Pilates instructor at Motion Vitality Pilates.",
  },
  florenceTeamAction: {
    src: `${opt}/about-team/florence-in-action.webp`,
    alt: "Florence demonstrating a Pilates movement at Motion Vitality Pilates.",
  },
  garyHeadshot: {
    src: `${opt}/instructor-headshots/gary-headshot-1.webp`,
    alt: "Portrait of Gary Fok, founder of Motion Vitality Pilates, in a Polestar Canada shirt.",
  },
  dorothyHeadshot: {
    src: `${opt}/instructor-headshots/dorothy-headshot-1.webp`,
    alt: "Portrait of Dorothy, Pilates instructor at Motion Vitality Pilates.",
  },
  florenceHeadshot: {
    src: `${opt}/instructor-headshots/florance-headshot-1.webp`,
    alt: "Portrait of Florence, Pilates instructor at Motion Vitality Pilates.",
  },

  // --- Movement / Polestar mood ---
  heroPose: {
    src: `${base}/pilates-pose/Florence/florance-pose-2.jpg`,
    alt: "Pilates instructor demonstrating a strong, balanced standing movement at Motion Vitality Pilates.",
  },
  garyPose: {
    src: `${opt}/pilates-pose/Gary/gary-pose-1.webp`,
    alt: "Instructor demonstrating a controlled Pilates movement, showing strength and alignment.",
  },
  garyMoveUpLadderCutout: {
    src: `${opt}/pilates-pose/gary-move-up-ladder-cutout.png`,
    alt: "Gary Fok reaching upward in a long split stance, representing his journey from instructor to educator.",
  },
  dorothyPose: {
    src: `${opt}/pilates-pose/Dorothy/dorothy-pose-1.webp`,
    alt: "Instructor demonstrating a Pilates pose emphasizing core control and flexibility.",
  },
  florencePose: {
    src: `${opt}/pilates-pose/Florence/florance-pose-1.webp`,
    alt: "Instructor demonstrating a graceful, balanced Pilates movement.",
  },

  // --- Teaching ---
  privateSession: {
    src: `${opt}/instructor-teaching-students-private-class/Dorothy/dorothy-private-1.webp`,
    alt: "Pilates instructor giving hands-on cues to a client during a private one-on-one reformer session.",
  },
  groupClass: {
    src: `${base}/instructor-teaching-students-group-class/Gary/gary-group-3.JPG`,
    alt: "Gary Fok leading a small group reformer class at Motion Vitality Pilates in Markham.",
  },
  pricingHero: {
    src: `${opt}/instructor-teaching-students-group-class/Dorothy/dorothy-group-1-hero.jpg`,
    alt: "Dorothy guiding clients through a group reformer class at Motion Vitality Pilates.",
  },

  // --- Education / past training ---
  janeGotch: {
    src: `${base}/education/jane-gotch.jpg`,
    alt: "Jane Gotch performing a flowing backbend on the GYROTONIC® apparatus.",
  },
  gyrokinesisCohort: {
    src: `${base}/education/jane-gary-students.jpeg`,
    alt: "Jane Gotch, Gary Fok, and the GYROKINESIS® course cohort posing together in the studio.",
  },

  // --- Polestar community (teacher-training context) ---
  polestarFaculty: {
    src: `${base}/polestar-group/polestar-faculty.jpg`,
    alt: "Polestar Pilates faculty and trainees gathered on the steps of a Polestar Life Center training retreat.",
  },
  polestarCohort: {
    src: `${base}/polestar-group/polestar-cohort.jpg`,
    alt: "A Polestar Pilates teacher-training cohort together in the studio beneath the Polestar banner.",
  },
} as const satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

/**
 * Per-palette navbar logo — the coloured mark on a transparent field
 * (`{palette}-transparent-logo.png`). The header renders it white over the dark
 * hero and over the scrolled brand-colour bar, and as the coloured mark on the
 * light bar used by other pages. (The `{palette}-logo.png` posters, which bake
 * the mark onto a solid --brand-500 field, are intentionally unused here — the
 * transparent mark reads lighter on the bar.)
 *
 * NOTE: mint ships no transparent logo yet, and the non-green palettes (blush /
 * amber / terracotta) have no logos — verdant stands in for now.
 */
const logoDir = `${base}/mvp-logo`;
const verdantTransparentLogo = `${logoDir}/verdant-transparent-logo.png`;

export const navLogos: Record<string, string> = {
  verdant: verdantTransparentLogo,
  forest: `${logoDir}/forest-transparent-logo.png`,
  sage: `${logoDir}/sage-transparent-logo.png`,
  // No mint transparent logo yet — verdant stands in.
  mint: verdantTransparentLogo,
  // Non-green palettes have no logo yet — verdant stands in.
  blush: verdantTransparentLogo,
  amber: verdantTransparentLogo,
  terracotta: verdantTransparentLogo,
};

/**
 * MVP logo split into its individual shapes for the hover-reveal section
 * (see app/components/home/logo-reveal.tsx). Generated by
 * `scripts/gen-logo-shapes.mjs` from `polestar-logo/MVP LOGO 001.png`: each
 * `mask` is a positive alpha mask of one shape on a shared, registered canvas;
 * `left`/`width` are the hover-column bounds (% of the box) centred on each
 * shape. Re-run the script and paste its printed numbers here if the logo
 * changes (and update the shape count).
 */
const logoShapesDir = `${base}/polestar-logo/shapes`;

export const mvpLogoReveal = {
  alt: "Motion Vitality Pilates logo.",
  aspect: 3.1419,
  fullMask: `${logoShapesDir}/logo-full.png`,
  shapes: [
    { mask: `${logoShapesDir}/shape-1.png`, left: 0, width: 15.87 },
    { mask: `${logoShapesDir}/shape-2.png`, left: 15.87, width: 15.78 },
    { mask: `${logoShapesDir}/shape-3.png`, left: 31.64, width: 17.19 },
    { mask: `${logoShapesDir}/shape-4.png`, left: 48.83, width: 16.9 },
    { mask: `${logoShapesDir}/shape-5.png`, left: 65.73, width: 16.91 },
    { mask: `${logoShapesDir}/shape-6.png`, left: 82.64, width: 17.36 },
  ],
} as const;

/**
 * Four Gary & Dorothy movement poses used as the 2×2 background collage behind
 * the Polestar "Learn to Move" heading. Order is row-major (top-left → bottom-
 * right). Rendered decoratively under a dark overlay.
 */
export const learnToMovePoses: Photo[] = [
  {
    src: `${base}/pilates-pose/Dorothy/dorothy-pose-3.jpg`,
    alt: "Dorothy demonstrating a controlled Pilates movement in the studio.",
  },
  {
    src: `${base}/pilates-pose/Gary/gary-pose-5.jpg`,
    alt: "Gary Fok performing a strong, balanced Pilates movement.",
  },
  {
    src: `${base}/pilates-pose/Gary/gary-pose-11.jpg`,
    alt: "Gary Fok showing strength and stability in a reformer exercise.",
  },
  {
    src: `${base}/pilates-pose/Dorothy/dorothy-pose-6.jpg`,
    alt: "Dorothy demonstrating a graceful, controlled Pilates movement.",
  },
];
