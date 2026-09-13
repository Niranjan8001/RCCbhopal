// Google reviews, read from the Places Details API for the business's own
// listing. Server-only: GOOGLE_PLACES_API_KEY must never reach the client.
//
// Shared by the page (which renders reviews into the server HTML so they are
// visible to crawlers and present on first paint) and by /api/reviews, which
// stays available as a client-side fallback.

export interface ReviewItem {
  author: string;
  rating: number;
  text: string;
  time: string;
  avatar: string;
}

export interface ReviewsData {
  name: string;
  rating: number;
  totalReviews: number;
  reviews: ReviewItem[];
}

export const EMPTY_REVIEWS: ReviewsData = {
  name: '',
  rating: 0,
  totalReviews: 0,
  reviews: [],
};

/**
 * Fetches the listing's rating and reviews. Never throws and never invents
 * data — any failure returns EMPTY_REVIEWS and the UI falls back to its empty
 * state. Cached for 12h to stay within Places API quota and caching terms.
 */
export async function getReviews(): Promise<ReviewsData> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) return EMPTY_REVIEWS;

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
      placeId
    )}&fields=name,rating,user_ratings_total,reviews&key=${apiKey}`;

    const res = await fetch(url, { next: { revalidate: 43200 } }); // 12h cache
    if (!res.ok) return EMPTY_REVIEWS;

    const data = await res.json();
    if (data.status !== 'OK' || !data.result) {
      console.error('[reviews] Places API status:', data.status);
      return EMPTY_REVIEWS;
    }

    const result = data.result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const reviews: ReviewItem[] = (result.reviews || []).map((r: any) => ({
      author: r.author_name ?? 'Google User',
      rating: r.rating ?? 5,
      text: r.text ?? '',
      time: r.relative_time_description ?? '',
      avatar: r.profile_photo_url ?? '',
    }));

    return {
      name: result.name ?? '',
      rating: result.rating ?? 0,
      totalReviews: result.user_ratings_total ?? 0,
      reviews,
    };
  } catch (err) {
    console.error('[reviews] error:', err);
    return EMPTY_REVIEWS;
  }
}
