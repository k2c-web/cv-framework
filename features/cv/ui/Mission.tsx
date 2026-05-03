import { ExperienceWithMissions, MissionEntry } from "../domain/cv.types";

export const Mission = ({ mission }: { mission: MissionEntry }) => (
  <div key={mission.company} className="space-y-1.5 break-inside-avoid">
    <p className="text-[12px] font-semibold text-gray-800">
      {mission.company} {mission.period ? `(${mission.period})` : " :"}
    </p>
    <ul className="list-disc ml-6 space-y-1.5 text-[14px] text-gray-700 leading-[1.45] marker:text-accent">
      {mission.bullets.map((b, i) => (
        <li key={i}>{b}</li>
      ))}
    </ul>
  </div>
);
