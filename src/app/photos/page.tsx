"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import PhotoCard from "@/components/PhotoCard";
import { fetchPhotos, type PicsumPhoto } from "@/lib/picsum";

const PAGE_SIZE = 30;

export default function PhotosPage() {
  const [photos, setPhotos] = useState<PicsumPhoto[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const loadPage = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setError(null);
    try {
      const next = await fetchPhotos(page, PAGE_SIZE);
      setPhotos(prev => {
        const existingIds = new Set(prev.map(p => p.id));
        const merged = next.filter(p => !existingIds.has(p.id));
        return [...prev, ...merged];
      });
      setHasMore(next.length === PAGE_SIZE);
      setPage(prev => prev + 1);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading, hasMore]);

  useEffect(() => {
    // initial load
    loadPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const target = sentinelRef.current;
    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          loadPage();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [loadPage]);

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6">
      <h1 className="text-2xl font-semibold mb-4">Photos</h1>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        role="list"
        aria-label="Photos grid"
      >
        {photos.map(photo => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>

      {error && (
        <div className="mt-4 text-red-600 dark:text-red-400">{error}</div>
      )}

      {!hasMore && !isLoading && (
        <div className="mt-6 text-center text-gray-600 dark:text-gray-300">
          You have reached the end of the list.
        </div>
      )}

      <div ref={sentinelRef} className="h-10" />

      {isLoading && (
        <div className="mt-4 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-transparent" />
        </div>
      )}
    </div>
  );
}


