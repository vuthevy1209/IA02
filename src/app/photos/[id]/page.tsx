import Image from "next/image";
import Link from "next/link";
import { fetchPhotoById } from "@/lib/picsum";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function PhotoDetailPage({ params }: PageProps) {
  const { id } = await params;
  const photo = await fetchPhotoById(id);
  const fullWidth = Math.min(1600, photo.width);
  const fullHeight = Math.round((photo.height / photo.width) * fullWidth);
  const fullSrc = `https://picsum.photos/id/${photo.id}/${fullWidth}/${fullHeight}`;

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6">
      <Link href="/photos" className="text-sm text-blue-600 hover:underline">
        ← Back to Photos
      </Link>
      <div className="mt-4">
        <div className="relative w-full" style={{ aspectRatio: `${photo.width} / ${photo.height}` }}>
          <Image
            src={fullSrc}
            alt={`Photo ${photo.id} by ${photo.author}`}
            fill
            sizes="100vw"
            className="object-contain rounded-md border border-black/10 dark:border-white/15 bg-black/5"
            priority
          />
        </div>
        <div className="mt-4 space-y-2">
          <h1 className="text-2xl font-semibold">Untitled Photo #{photo.id}</h1>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">Author:</span> {photo.author}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            This photo is provided by Lorem Picsum. Description is not available, so here is a placeholder.
          </p>
        </div>
      </div>
    </div>
  );
}


