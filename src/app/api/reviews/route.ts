import { reviews } from "@/data/reviews";

export async function GET() {
  return Response.json(reviews);
}
