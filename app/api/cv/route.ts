import cv from "@/infra/fs/cv.json";

export async function GET() {
  return Response.json(cv);
}
