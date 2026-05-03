import { CVData } from "../domain/cv.types";
import { Title } from "./primitives/Title";

export const Skills = ({ skills }: { skills: CVData["skills"] }) => (
  <section>
    <Title>Compétences clés</Title>

    <div className="mt-3 space-y-4">
      {Object.entries(skills).map(([category, items]) => (
        <div key={category} className="space-y-1">
          <h4 className="text-[15px] font-semibold text-gray-800 leading-[1.35]">
            {category}
          </h4>
          <p className="text-[14px] text-gray-700 leading-[1.45]">
            {items.join(", ")}
          </p>
        </div>
      ))}
    </div>
  </section>
);
