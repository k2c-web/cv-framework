import { Header } from "./Header";
import { About } from "./About";
import { Skills } from "./Skills";
import { Experiences } from "./experiences/Experiences";
import { PreviousExperiences } from "./PreviousExperiences";
import { Education } from "./Education";
import { CVData } from "@/types/cv.types";

export default function Cv({
  education,
  profile,
  skills,
  experiences,
  previousExperiences,
}: CVData) {
  return (
    <main className="max-w-3xl mx-auto space-y-8 text-gray-900 main_container text-[15px]">
      <Header data={profile} />
      <About about={profile.about} />
      <Skills skills={skills} />
      <Experiences experiences={experiences} />
      <PreviousExperiences previousExperience={previousExperiences} />
      <Education education={education} />
    </main>
  );
}
