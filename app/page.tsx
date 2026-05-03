"use client";
import { useCV } from "@/features/cv/hooks/useCv";
import CV from "../features/cv/ui/Cv";

export default function Page() {
  const { data, isLoading, isError } = useCV();

  if (isLoading) {
    return <p className="text-center text-gray-500">Chargement…</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">
        Erreur lors du chargement du CV
      </p>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      <CV data={data} />
    </div>
  );
}
