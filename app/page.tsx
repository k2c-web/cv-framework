import skills from "../data/skills.json";
import education from "../data/education.json";
import profile from "../data/profile.json";
import experiences from "../data/experiences.json";
import previousExperience from "../data/previousExperiences.json";
import CV from "@/components/cv/Cv";

export default function Page() {
  return (
    <CV
      skills={skills}
      education={education}
      profile={profile}
      experiences={experiences}
      previousExperiences={previousExperience}
    />
  );
}
