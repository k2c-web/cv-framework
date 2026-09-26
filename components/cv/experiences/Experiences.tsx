import { Experience as ExperiencesProps } from "@/types/cv.types";
import { Title } from "@/components/ui/Title";
import { Experience } from "./Experience";

export const Experiences = ({
  experiences,
}: {
  experiences: ExperiencesProps[];
}) => (
  <section>
    <Title>Expériences professionnelles</Title>
    <div className="mt-3 space-y-8">
      {experiences.map((exp) => (
        <Experience key={exp.company} exp={exp} />
      ))}
    </div>
  </section>
);
