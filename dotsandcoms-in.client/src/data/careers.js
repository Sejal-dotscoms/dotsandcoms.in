import teamBrunch from "../assets/images/team-brunch-at-hyatt.png";
import cricketTeam1 from "../assets/images/cricket-dots-coms-team.png";
import teamOuting from "../assets/images/dots-coms-team-outing.png";
import alembicCity from "../assets/images/dots-coms-team-alembic-city.png";
import cricketTeam2 from "../assets/images/cricket-dots-coms-team-2.png";

export const CAREERS_PATH = "/training-and-job-vacancy-at-dots-coms-vadodara";
export const VACANCY_PATH = "/job-vacancy-at-dots-and-coms-company";
export const STATUS_PATH = "/check-application-status";
export const APPLY_PATH = "/apply";
export const RECEIVED_PATH = "/application-received";

export const workingCopy = {
  title: "Working at Dots and Coms",
  paragraphs: [
    "Life at work place is Energetic and funfilled. We are a team for whom IT is a place to live, not just a profession! Work pressure and work pleasure go hand in hand here.",
    "Learning new skills and being able to inspire others to excel is an integral part of working at Dots and Coms.",
    "Apart from core competence in segment of IT that you work, becoming an overall dynamic personality is necessary. Being capable to handle all spheres of life with confidence is what you get as a reward. Not just bits and bytes, but 360 degree personality development and knowledge enhancement is what we aim.",
    "We believe there is a rainbow in all of us, take a ray of chance to exhibit your colours and brighten them.",
  ],
};

export const gallerySlides = [
  { src: teamBrunch, alt: "Team Brunch at Hyatt Place Vadodara" },
  { src: cricketTeam1, alt: "Cricket Team Dots and Coms" },
  { src: teamOuting, alt: "Outing Team Dots and Coms" },
  { src: alembicCity, alt: "Alembic City Team Dots and Coms" },
  { src: cricketTeam2, alt: "Cricket Team Dots and Coms" },
];

export const HEARD_FROM = [
  "A Friend",
  "Ex-Dotcommers",
  "Current Dotcommers",
  "Radio Adv.",
  "Google Search",
  "Naukri.com",
  "Linked In",
  "Client",
  "Seminar / Workshop",
  "Campus Recruitements",
  "Others",
];

export const SCHOOL_MEDIUMS = ["English", "Gujarati", "Hindi", "Others"];

export const JOB_NOTE =
  "A job can only be offered if the candidate has completed an internship in a similar role or is capable of working independently.";
export const INTERNSHIP_NOTE =
  "We can only offer internships ranging from 4 to 6 months. We DO NOT provide short-term internships.";


export function jobPath(slug) {
  return `/${slug}`;
}
