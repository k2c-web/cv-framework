import { CVData } from "@/cv.types";
import { Title } from "../ui/Title";

export const Education = ({
  education,
}: {
  education: CVData["education"];
}) => (
  <section>
    <Title>Formation</Title>
    <div className="mt-3 space-y-1">
      <p className="font-bold">
        {education.school} - {education.title}
      </p>
      <p>{education.details}</p>
    </div>
  </section>
);
