/**
 * Data modeling response from https://animechan.vercel.app/api/random/anime?title=naruto
 */

export interface AnimeDataImage {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export type AnimeData = {
  mal_id: number;
  url: string;
  images: {
    jpg: AnimeDataImage;
    webp: AnimeDataImage;
  };
  title: string;
  title_english?: string;
  episodes: number;
  score: number;
  duration: string;
  popularity: number;
  source: string;
  rank: number;
};
