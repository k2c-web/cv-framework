import clsx from "clsx";

interface Props {
  company: string;
  role: string;
  period: string;
}

export const ExperienceHeader = ({ company, role, period }: Props) => (
  <div>
    <h4 className="text-lg font-bold">{role}</h4>
    <p className="text-gray-500 leading-tight">
      {company} | {period}
    </p>
  </div>
);
