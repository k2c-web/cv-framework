import { CVData } from "../domain/cv.types";
import { Experience } from "./Experience";
import { Title } from "./primitives/Title";

export const Experiences = ({
  experience,
}: {
  experience: CVData["experience"];
}) => (
  <section>
    <Title>Expériences professionnelles</Title>
    <div className="mt-3 space-y-8">
      {experience.map((exp) => (
        <Experience key={exp.company} exp={exp} />
      ))}
    </div>
  </section>
);
