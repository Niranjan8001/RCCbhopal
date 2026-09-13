import { getReviews } from '@/lib/reviews';

// The homepage renders reviews server-side; this route remains as the
// client-side fallback used when that server render came back empty.
export async function GET() {
  return Response.json(await getReviews());
}
