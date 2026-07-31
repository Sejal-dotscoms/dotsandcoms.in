import EventsAwards from "../Events/EventsAwards";
import DNCTimeline from "./DNCTimeline";
import TeamSection from "./TeamSection";

function AboutUs() {
  return (
      <>
          <DNCTimeline/>
          <TeamSection />
          <EventsAwards/>
      </>
  );
}

export default AboutUs;