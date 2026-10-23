import type { Photo } from "@/content/types";

export function isPublicPhoto(photo: Photo): boolean {
  const src = photo.src.trim();
  if (!src.startsWith("/images/") || !photo.alt.trim()) return false;
  if (/^https?:/i.test(src)) return false;
  return true;
}

export function photoDimensions(photo: Pick<Photo, "width" | "height">): { width: number; height: number } {
  if (photo.width && photo.width > 0 && photo.height && photo.height > 0) {
    return { width: photo.width, height: photo.height };
  }
  return { width: 1200, height: 900 };
}

export function publicPhotos(photos: Photo[]): Photo[] {
  return photos.filter(isPublicPhoto);
}

/** Gallery skips the logo tile. */
export function galleryPhotos(photos: Photo[]): Photo[] {
  return publicPhotos(photos).filter((photo) => photo.category !== "logo");
}
