import { getCvFromFile } from "@/infra/fs/getCvFromFile";

export async function GET() {
  const data = await getCvFromFile();
  return Response.json(data);
}
