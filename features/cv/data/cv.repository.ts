import { getCvFromFile } from "@/infra/fs/getCvFromFile";
import { CVData } from "@/features/cv/domain/cv.types";

export async function fetchCV(): Promise<CVData> {
  return getCvFromFile();
}
