export interface ReviewApiResponse {
  name: string;
  rating: number;
  totalReviews: number;
  reviews: {
    author: string;
    rating: number;
    text: string;
    time: string;
    avatar: string;
  }[];
}

const EMPTY: ReviewApiResponse = { name: '', rating: 0, totalReviews: 0, reviews: [] };

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return Response.json(EMPTY);
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
      placeId
    )}&fields=name,rating,user_ratings_total,reviews&key=${apiKey}`;

    const res = await fetch(url, { next: { revalidate: 43200 } }); // 12h cache
    if (!res.ok) return Response.json(EMPTY);

    const data = await res.json();
    if (data.status !== 'OK' || !data.result) {
      console.error('[api/reviews] Places API status:', data.status);
      return Response.json(EMPTY);
    }

    const result = data.result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const reviews = (result.reviews || []).map((r: any) => ({
      author: r.author_name ?? 'Google User',
      rating: r.rating ?? 5,
      text: r.text ?? '',
      time: r.relative_time_description ?? '',
      avatar: r.profile_photo_url ?? '',
    }));

    const payload: ReviewApiResponse = {
      name: result.name ?? '',
      rating: result.rating ?? 0,
      totalReviews: result.user_ratings_total ?? 0,
      reviews,
    };

    return Response.json(payload);
  } catch (err) {
    console.error('[api/reviews] error:', err);
    return Response.json(EMPTY);
  }
}
