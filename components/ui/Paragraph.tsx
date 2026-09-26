import clsx from "clsx";

export const Paragraph = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <p className={clsx("leading-[1.5]", className)}>{children}</p>;
