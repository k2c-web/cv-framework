import { CVData } from "@/features/cv/domain/cv.types";
import { Header } from "./Header";
import { About } from "./About";
import { Skills } from "./Skills";
import { Experiences } from "./Experiences";
import { PreviousExperiences } from "./PreviousExperiences";
import { Education } from "./Education";

interface CVProps {
  data: CVData;
}

export default function Cv({ data }: CVProps) {
  return (
    <div className="max-w-3xl mx-auto p-10 space-y-8 text-gray-800">
      <Header data={data} />
      <About about={data.about} />
      <Skills skills={data.skills} />
      <Experiences experience={data.experience} />
      <PreviousExperiences previousExperience={data.previousExperience} />
      <Education education={data.education} />
    </div>
  );
}
