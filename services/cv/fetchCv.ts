// app/queries/fetchCV.ts
import { CVData } from "@/types/cv";

export async function fetchCV(): Promise<CVData> {
  const res = await fetch("/api/cv");

  if (!res.ok) {
    throw new Error("Failed to fetch CV");
  }

  const data = await res.json();

  return data;
}
