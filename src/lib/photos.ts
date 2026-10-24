import type { Photo, PhotoCategory } from "@/content/types";

/** What the browser is allowed to see. Credit keys never leave the server module. */
export type DisplayPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
  category: PhotoCategory;
  locationId?: string;
};

const FAVORITE_SRCS = [
  "/images/three-tacos-takeout.webp",
  "/images/steak-quesadilla-chips-salsa.webp",
  "/images/burrito-chips-salsa.webp",
  "/images/veggie-nachos.webp",
  "/images/fajita-steak-plate.webp",
];

const FRESH_SRCS = ["/images/fresh-avocado-peppers.webp", "/images/fresh-tomato-lettuce.webp"];

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

function displayPhoto(photo: Photo): DisplayPhoto | null {
  if (!isPublicPhoto(photo)) return null;
  const size = photoDimensions(photo);
  return {
    src: photo.src.trim(),
    alt: photo.alt.trim(),
    width: size.width,
    height: size.height,
    category: photo.category,
    ...(photo.locationId?.trim() ? { locationId: photo.locationId.trim() } : {}),
  };
}

function listed(photos: Photo[], srcs: string[]): DisplayPhoto[] {
  return srcs.flatMap((src) => {
    const match = photos.find((photo) => photo.src.trim() === src);
    if (!match) return [];
    const shown = displayPhoto(match);
    return shown ? [shown] : [];
  });
}

export function heroPhoto(photos: Photo[], heroImage?: string): DisplayPhoto | null {
  const explicit = heroImage?.trim();
  if (explicit) {
    const match = photos.find((photo) => photo.src.trim() === explicit);
    if (!match) return null;
    return displayPhoto(match);
  }
  const flagged = photos.find((photo) => photo.hero);
  return flagged ? displayPhoto(flagged) : null;
}

export function favoritePhotos(photos: Photo[]): DisplayPhoto[] {
  return listed(photos, FAVORITE_SRCS);
}

export function freshPhotos(photos: Photo[]): DisplayPhoto[] {
  return listed(photos, FRESH_SRCS);
}

export function logoPhoto(photos: Photo[]): DisplayPhoto | null {
  const match = photos.find((photo) => photo.category === "logo" && isPublicPhoto(photo));
  return match ? displayPhoto(match) : null;
}

export function menuBoardPhoto(photos: Photo[]): DisplayPhoto | null {
  const match = photos.find((photo) => photo.category === "menu-board" && isPublicPhoto(photo));
  return match ? displayPhoto(match) : null;
}

export function photosForLocation(photos: Photo[], locationId: string): DisplayPhoto[] {
  return photos.flatMap((photo) => {
    if (photo.category !== "truck" || photo.locationId?.trim() !== locationId) return [];
    const shown = displayPhoto(photo);
    return shown ? [shown] : [];
  });
}

/** Food photos that are not already the hero, a favorite card, or the fresh strip. */
export function galleryPhotos(photos: Photo[], heroImage?: string): DisplayPhoto[] {
  const hero = heroPhoto(photos, heroImage)?.src;
  const used = new Set([...FAVORITE_SRCS, ...FRESH_SRCS, hero].filter(Boolean));
  return photos.flatMap((photo) => {
    if (photo.category !== "food") return [];
    if (used.has(photo.src.trim())) return [];
    const shown = displayPhoto(photo);
    return shown ? [shown] : [];
  });
}
