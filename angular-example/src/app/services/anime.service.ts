import { Injectable, signal } from '@angular/core';
import { AnimeData } from '../models/api-anime-data.model';
import { AnimeApiService } from './../api/anime-api.service';
import { User } from './auth.service';

export type AnimeTypeStore = {
	selectedAnime: AnimeData;
	description: string;
	isCool: boolean;
	user: User;
};

@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private storedAnimeKey = 'storedAnimeKey';

	// data selected by user
	private storedAnime = signal<AnimeTypeStore[]>([]);

	// data loaded from API
	private loadedAnime = signal<AnimeData[]>([]);

	constructor(private animeApiService: AnimeApiService) {
		const storedAnime = this.getStoredAnimeFromLocalStorage();
		if (storedAnime) {
			this.storedAnime.set(storedAnime);
		}
	}

	getStoredAnime(): AnimeTypeStore[] {
		return this.storedAnime();
	}

	getLoadedAnime(): AnimeData[] {
		return this.loadedAnime();
	}

	getAnimeTypeStoreById(id: number | string): AnimeTypeStore | undefined {
		return this.storedAnime().find((a) => a.selectedAnime.mal_id === Number(id));
	}

	fetchAnime(query: string): void {
		this.animeApiService.getAnime(query).subscribe((data) => {
			this.loadedAnime.set(data);
		});
	}

	saveAnimeToStore(anime: AnimeTypeStore): void {
		this.storedAnime.set([...this.storedAnime(), anime]);
		localStorage.setItem(this.storedAnimeKey, JSON.stringify(this.storedAnime()));
	}

	deleteAnimeFromStore(anime: AnimeTypeStore): void {
		this.storedAnime.set(this.storedAnime().filter((a) => a !== anime));
	}

	editAnimeInStore(animeId: number, newDescription: string): void {
		const changedData = this.storedAnime().map((item) => {
			if (item.selectedAnime.mal_id === animeId) {
				item.description = newDescription;
			}
			return item;
		});
		this.storedAnime.set(changedData);
	}

	cleanAnimeStore(): void {
		this.storedAnime.set([]);
		localStorage.removeItem(this.storedAnimeKey);
	}

	getStoredAnimeFromLocalStorage(): AnimeTypeStore[] | [] {
		const anime = localStorage.getItem(this.storedAnimeKey);
		if (anime) {
			return JSON.parse(anime);
		}
		return [];
	}
}
