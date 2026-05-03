import { CVData } from "../domain/cv.types";
import { Title } from "./primitives/Title";

export const Education = ({
  education,
}: {
  education: CVData["education"];
}) => (
  <section>
    <Title>Formation</Title>
    <div className="mt-3 space-y-1">
      <p className="text-[15px] font-semibold text-gray-800 leading-[1.35]">
        {education.school} - {education.title}
      </p>
      <p className="text-[14px] text-gray-700 leading-[1.45]">
        {education.details}
      </p>
    </div>
  </section>
);
