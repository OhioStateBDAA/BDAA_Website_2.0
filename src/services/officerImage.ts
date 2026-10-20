import type { AirtableImage } from '@/types/airtable';

// Large thumbnails retain portrait detail without transferring camera originals.
export function officerImageUrl(field: unknown): string {
  const image = Array.isArray(field) ? field[0] as AirtableImage | undefined : undefined;
  return image?.thumbnails?.large?.url || image?.url || '/img/default-headshot.svg';
}
