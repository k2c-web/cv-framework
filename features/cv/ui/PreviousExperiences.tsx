import { CVData } from "../domain/cv.types";
import { Title } from "./primitives/Title";

export const PreviousExperiences = ({
  previousExperience,
}: {
  previousExperience: CVData["previousExperience"];
}) => (
  <section className="break-inside-avoid">
    <Title>Expériences antérieures</Title>
    <div className="mt-3 space-y-4">
      {previousExperience.map((exp) => (
        <div key={exp.company}>
          <h4 className="text-[16px] font-semibold text-gray-800">
            {exp.role}
          </h4>
          <p className="text-[14px] text-gray-500">
            {exp.company} | {exp.period}
          </p>
          <ul className="list-disc ml-6 space-y-1 text-[14px] text-gray-700 marker:text-accent mt-2">
            {exp.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);
