import cv from "@/data/cv.json";

export async function GET() {
  return Response.json(cv);
}
