import { Skills as SkillsProps } from "@/types/cv.types";
import { Title } from "../ui/Title";

export const Skills = ({ skills }: { skills: SkillsProps }) => (
  <section>
    <Title>Compétences clés</Title>
    <div className="mt-3 space-y-4 font-mono tracking-tight">
      {Object.entries(skills).map(([category, items]) => (
        <p key={category}>
          <span className="font-bold">{category} :</span> {items.join(", ")}
        </p>
      ))}
    </div>
  </section>
);
