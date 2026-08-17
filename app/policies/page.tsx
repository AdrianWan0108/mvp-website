import type { Metadata } from "next";
import { PageHeader } from "../components/page-header";
import { Container } from "../components/container";
import { PolicyDocument, type PolicySection } from "../components/policy-document";

export const metadata: Metadata = {
  title: "Emergency & Sickness Policies",
  description:
    "Emergency, illness, and cancellation policies for Motion Vitality Pilates.",
};

/**
 * Migrated from the studio's existing Emergency & Sickness Policies. Wording is
 * verbatim, minus the staff-facing procedure (Incident Report Forms, instructor
 * expectations, staff training and drills, medical clearance to return to work)
 * that belongs in the internal manual rather than on a client-facing page.
 */
const emergencyIntro =
  "The purpose of this Emergency Policy is to ensure the safety and well-being of all clients, staff, and visitors in the event of an emergency. This policy outlines procedures to follow during medical emergencies, fire, natural disasters, and other critical incidents.";

const emergencySections: PolicySection[] = [
  {
    title: "Medical Emergencies",
    items: [
      "Stay calm and call 911 immediately if the situation is life-threatening.",
      "Administer first aid or CPR only if trained and certified to do so.",
      "Notify the studio manager/owner immediately.",
      "Do not move the injured person unless they are in immediate danger.",
    ],
  },
  {
    title: "Fire Emergency",
    items: [
      "Activate the nearest fire alarm if a fire is detected.",
      "Call 911.",
      "Evacuate the building using designated exit routes.",
      "Instructors must account for all clients and staff at the assembly point.",
      "Only trained personnel may use a fire extinguisher if it is safe to do so.",
      "Wait for the all-clear from emergency services before re-entering the studio.",
    ],
  },
  {
    title: "Power Outage",
    items: [
      "Instructors must stop all classes safely and calmly.",
      "Assist clients in leaving the studio if the outage is prolonged or affects visibility/safety.",
      "Emergency lighting should activate automatically. If not, use flashlights.",
    ],
  },
  {
    title: "Aggressive or Suspicious Behavior",
    items: [
      "Do not engage with the individual. Remove clients from the area calmly.",
      "Call 911 if the situation escalates.",
      "Report the incident to management immediately.",
    ],
  },
];

const sicknessIntro =
  "This Sickness Policy outlines expectations for clients who are feeling unwell. The goal is to maintain a safe, clean, and supportive environment for everyone who visits our studio.";

const sicknessSections: PolicySection[] = [
  {
    title: "General Guidelines",
    items: [
      "Anyone who is feeling unwell—whether a staff member or a client—should stay home and avoid coming to the studio.",
      {
        text: "This includes symptoms of contagious illnesses such as:",
        sub: [
          "Fever or chills",
          "Persistent cough",
          "Sore throat",
          "Shortness of breath",
          "Fatigue or muscle aches",
          "Gastrointestinal issues (nausea, vomiting, diarrhea)",
          "Runny nose or congestion not related to allergies",
        ],
      },
    ],
  },
  {
    title: "Client Expectations",
    items: [
      {
        text: "Clients who are experiencing any symptoms of illness are asked to:",
        sub: [
          "Cancel or reschedule their session.",
          "Contact the studio if unsure whether it's appropriate to attend.",
        ],
      },
      "Our cancellation policy allows for illness-related cancellations without penalty (please notify us as early as possible).",
    ],
  },
  {
    title: "Return-to-Studio Guidelines",
    items: [
      {
        text: "Individuals may return to the studio when:",
        sub: [
          "They have been symptom-free for at least 24 hours without the use of medication (e.g., fever reducers).",
          "For confirmed contagious illnesses (e.g., flu, COVID-19), they must follow local public health guidelines for isolation and return.",
        ],
      },
    ],
  },
  {
    title: "In-Studio Hygiene Protocols",
    intro:
      "To reduce the spread of illness, the studio maintains the following standards:",
    items: [
      "Hand sanitizer is available at the entrance and in the studio.",
      "High-touch surfaces and equipment are disinfected regularly.",
      "Clients and instructors are encouraged to bring their own mats and towels.",
      "Ventilation is maintained per health guidelines.",
    ],
  },
  {
    title: "Studio Rights",
    items: [
      {
        text: "The studio reserves the right to:",
        sub: [
          "Refuse entry to anyone displaying symptoms of illness.",
          "Cancel or reschedule classes if a health risk is identified.",
        ],
      },
    ],
  },
];

export default function PoliciesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Studio policies"
        title="Emergency & Sickness Policies"
        intro="How we handle illness, cancellations, and emergencies to keep everyone safe."
        tone="dark"
      />
      <Container className="py-16">
        <div className="space-y-16">
          <PolicyDocument
            title="Emergency Policies"
            intro={emergencyIntro}
            sections={emergencySections}
            footnote="This policy will be reviewed and updated annually or as needed."
          />
          <PolicyDocument
            title="Sickness Policies"
            intro={sicknessIntro}
            sections={sicknessSections}
          />
        </div>
      </Container>
    </>
  );
}
