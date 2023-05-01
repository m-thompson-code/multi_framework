import { useMemoize } from "@vueuse/core";
import { evaluate, round } from "mathjs";

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

export const hardMathEquation = (animeScore: number): number => {
  console.log(`%c hardMathEquation`, `color: #22fea3`);
  return round(evaluate(`4 * (2 + 4.5) + 3 ^ ${animeScore} + 123 - 4.3 / 3 /2 ^ 3 + 8 + 9 / 12`));
};

export const hardMathEquationMemo = useMemoize((animeScore: number) => hardMathEquation(animeScore));
