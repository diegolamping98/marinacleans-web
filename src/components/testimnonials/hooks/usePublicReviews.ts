// src/hooks/usePublicReviews.ts
import { useEffect, useMemo, useState } from "react";
import { fetchReviewsFromCsv, type Review } from "../services/reviewsCsv";

export function usePublicReviews(csvUrl: string) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(null);

    fetchReviewsFromCsv(csvUrl)
      .then((items) => {
        if (!alive) return;
        setReviews(items);
      })
      .catch((err: any) => {
        if (!alive) return;
        setError(err?.message || "Failed to load reviews");
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [csvUrl]);

  const average = useMemo(() => {
    if (!reviews.length) return 0;
    const sum = reviews.reduce((acc, r) => acc + (r.rating || 0), 0);
    return Number((sum / reviews.length).toFixed(1));
  }, [reviews]);

  return { reviews, average, loading, error };
}
