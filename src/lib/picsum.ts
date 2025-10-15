export type PicsumPhoto = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

export async function fetchPhotos(page: number, limit: number = 30): Promise<PicsumPhoto[]> {
  const endpoint = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;
  const response = await fetch(endpoint, { cache: "force-cache" });
  if (!response.ok) {
    throw new Error(`Failed to fetch photos: ${response.status}`);
  }
  return response.json();
}

export async function fetchPhotoById(id: string): Promise<PicsumPhoto> {
  const endpoint = `https://picsum.photos/id/${id}/info`;
  const response = await fetch(endpoint, { cache: "force-cache" });
  if (!response.ok) {
    throw new Error(`Failed to fetch photo ${id}: ${response.status}`);
  }
  return response.json();
}


