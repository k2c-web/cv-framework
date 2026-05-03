import { Title } from "./primitives/Title";

export const About = ({ about }: { about: string }) => (
  <section>
    <Title>À propos</Title>
    <p className="mt-3 text-[14px] text-gray-700 leading-[1.45]">{about}</p>
  </section>
);
