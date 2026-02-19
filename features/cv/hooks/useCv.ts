// app/queries/useCV.ts
import { fetchCV } from "@/features/cv/data/cv.repository";
import { useQuery } from "@tanstack/react-query";

export function useCV() {
  return useQuery({
    queryKey: ["cv"],
    queryFn: fetchCV,
    staleTime: Infinity,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
