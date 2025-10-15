"use client";

import Image from "next/image";
import Link from "next/link";
import type { PicsumPhoto } from "@/lib/picsum";

type PhotoCardProps = {
  photo: PicsumPhoto;
};

export default function PhotoCard({ photo }: PhotoCardProps) {
  const thumbWidth = 400;
  const thumbHeight = Math.round((photo.height / photo.width) * thumbWidth) || 300;
  const thumbSrc = `https://picsum.photos/id/${photo.id}/${thumbWidth}/${thumbHeight}`;

  return (
    <Link
      href={`/photos/${photo.id}`}
      className="group block overflow-hidden rounded-lg border border-black/10 dark:border-white/15 bg-white dark:bg-black/20 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative w-full" style={{ aspectRatio: `${photo.width} / ${photo.height}` }}>
        <Image
          src={thumbSrc}
          alt={`Photo by ${photo.author}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="p-3">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <span className="font-medium">Author:</span> {photo.author}
        </p>
      </div>
    </Link>
  );
}


