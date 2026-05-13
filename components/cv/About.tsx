import { Paragraph } from "../ui/Paragraph";
import { Title } from "../ui/Title";

export const About = ({ about }: { about: string }) => (
  <section>
    <Title>À propos</Title>
    <Paragraph className="mt-3">{about}</Paragraph>
  </section>
);
