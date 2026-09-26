import clsx from "clsx";

export const Liste = ({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) => (
  <ul className={clsx("list-disc ml-6 space-y-1.5", className)}>
    {items.map((b, i) => (
      <li key={i}>{b}</li>
    ))}
  </ul>
);
