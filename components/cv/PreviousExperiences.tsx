import { Experience } from "@/types/cv.types";
import { Title } from "../ui/Title";
import { Liste } from "../ui/Liste";
import { ExperienceHeader } from "./experiences/ExperienceHeader";

export const PreviousExperiences = ({
  previousExperience,
}: {
  previousExperience: Experience[];
}) => (
  <section>
    <Title>Expériences antérieures</Title>
    <div className="mt-3 space-y-4">
      {previousExperience.map((exp) => (
        <div key={exp.company}>
          <ExperienceHeader
            company={exp.company}
            role={exp.role}
            period={exp.period}
          />
          <Liste items={exp.bullets} className="mt-2" />
        </div>
      ))}
    </div>
  </section>
);
