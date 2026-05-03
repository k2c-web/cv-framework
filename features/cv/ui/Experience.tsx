import { CVData } from "../domain/cv.types";
import { Mission } from "./Mission";

export const Experience = ({ exp }: { exp: CVData["experience"][number] }) => (
  <div key={exp.company}>
    <h4 className="text-[16px] font-semibold text-gray-800">{exp.role}</h4>

    <p className="text-[14px] text-gray-500">
      {exp.company} | {exp.period}
    </p>

    {"intro" in exp && (
      <p className="text-[14px] text-gray-700 mt-2">{exp.intro}</p>
    )}

    {exp.bullets && (
      <ul className="list-disc ml-6 space-y-2 text-[14px] text-gray-700 marker:text-accent mt-2">
        {exp.bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    )}

    {exp.missions && (
      <div className="space-y-4 mt-4">
        {exp.missions.map((mission) => (
          <Mission key={mission.company} mission={mission} />
        ))}
      </div>
    )}

    {"stack" in exp && (
      <p className="text-[14px] text-gray-700 mt-4">
        <span className="font-semibold">Stack :</span> {exp.stack.join(", ")}
      </p>
    )}
  </div>
);
