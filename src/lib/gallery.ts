import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { events } from '../data/events.js';
import { photosCdn } from '../data/site.js';

// One JSON index per event; the images themselves are served from photosCdn.
const DIR = 'src/data/gallery';
const CDN = import.meta.env.PUBLIC_PHOTOS_CDN || photosCdn;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const FILE = /^\d{3}$/;

type Size = { width: number; height: number };

export type Photo = Size & { number: number; src: string; thumb: string };

export type GalleryEvent = {
  slug: string;
  name: string;
  date: string;
  place?: string;
  neighborhood?: string;
  album?: string;
  cover: Size & { src: string };
  photos: Photo[];
};

const isSize = (s: Partial<Size> | null | undefined): s is Size =>
  Number.isInteger(s?.width) && s!.width! > 0 && Number.isInteger(s?.height) && s!.height! > 0;

// Any inconsistency in an index fails the build.
function readIndex(slug: string) {
  const path = `${DIR}/${slug}.json`;
  const { cover, photos } = JSON.parse(readFileSync(path, 'utf8'));
  if (!isSize(cover)) throw new Error(`${path}: missing cover`);
  if (!Array.isArray(photos) || !photos.length) throw new Error(`${path}: no photos`);
  const seen = new Set<string>();
  return {
    cover: { width: cover.width, height: cover.height, src: `${CDN}/${slug}/cover.jpg` },
    photos: photos.map((p: { file: string } & Size, i: number) => {
      if (!FILE.test(p.file) || seen.has(p.file) || !isSize(p)) {
        throw new Error(`${path}: invalid entry ${JSON.stringify(p)}`);
      }
      seen.add(p.file);
      return {
        number: i + 1,
        src: `${CDN}/${slug}/${p.file}.jpg`,
        thumb: `${CDN}/${slug}/${p.file}-thumb.jpg`,
        width: p.width,
        height: p.height,
      };
    }),
  };
}

function checkAlbum(slug: string, album?: string) {
  if (album !== undefined && new URL(album).protocol !== 'https:') {
    throw new Error(`event ${slug}: album must be https`);
  }
}

let cache: GalleryEvent[] | undefined;

// Events with photos, newest first.
export function getGallery(): GalleryEvent[] {
  if (cache) return cache;
  const slugs = existsSync(DIR)
    ? readdirSync(DIR)
        .filter((f) => f.endsWith('.json'))
        .map((f) => f.slice(0, -5))
    : [];
  const withSlug = events.filter((e) => e.slug);
  const bySlug = new Map(withSlug.map((e) => [e.slug, e]));
  if (bySlug.size !== withSlug.length) throw new Error('src/data/events.js: duplicate slug');

  cache = slugs
    .map((slug) => {
      if (!SLUG.test(slug)) throw new Error(`${DIR}/${slug}.json: invalid file name`);
      const e = bySlug.get(slug);
      if (!e) throw new Error(`${DIR}/${slug}.json: no event with slug '${slug}' in src/data/events.js`);
      checkAlbum(slug, e.album);
      return {
        slug,
        name: e.name,
        date: e.date,
        place: e.place,
        neighborhood: e.neighborhood,
        album: e.album,
        ...readIndex(slug),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
  return cache;
}

// Event date in pt-BR, timezone-free: '2025-05-17' becomes '17 de maio de 2025'.
export function formatDate(iso: string) {
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`));
}

export const photoPath = (slug: string, number: number) => `/galeria/${slug}/${number}/`;
