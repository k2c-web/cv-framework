export const Stack = ({ stack }: { stack: string[] }) => (
  <p className="mt-4">
    <span className="font-bold">Stack :</span> {stack.join(", ")}
  </p>
);
