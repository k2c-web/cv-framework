import { Mission as MissionProps } from "@/types/cv.types";
import { Liste } from "../../ui/Liste";

export const Mission = ({ mission }: { mission: MissionProps }) => (
  <div className="space-y-1.5 break-inside-avoid">
    <p>
      <span className="underline underline-offset-3">{mission.company}</span>{" "}
      {mission.period ? `(${mission.period})` : " :"}
    </p>
    <Liste items={mission.bullets || []} className="mt-2" />
  </div>
);
