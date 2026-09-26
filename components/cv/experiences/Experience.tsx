import { Experience as ExperienceProps } from "@/types/cv.types";
import { Mission } from "./Mission";
import { Liste } from "../../ui/Liste";
import { ExperienceHeader } from "./ExperienceHeader";
import { Paragraph } from "../../ui/Paragraph";
import { Stack } from "./Stack";

export const Experience = ({ exp }: { exp: ExperienceProps }) => (
  <div>
    <ExperienceHeader
      company={exp.company}
      role={exp.role}
      period={exp.period}
    />
    {"intro" in exp && <Paragraph className="mt-2">{exp.intro}</Paragraph>}
    {exp.bullets && <Liste items={exp.bullets} className="mt-3" />}
    {exp.missions && (
      <div className="space-y-4 mt-3">
        {exp.missions.map((mission) => (
          <Mission key={mission.company} mission={mission} />
        ))}
      </div>
    )}
    {"stack" in exp && exp.stack && <Stack stack={exp.stack} />}
  </div>
);
