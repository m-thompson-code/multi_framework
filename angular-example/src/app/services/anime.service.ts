import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
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
	// data selected by user
	private storedAnimeKey = 'storedAnimeKey';
	private storedAnime$ = new BehaviorSubject<AnimeTypeStore[]>([]);
	storedAnimeObs$ = this.storedAnime$.asObservable();

	// data loaded from API
	private loadedAnime = new BehaviorSubject<AnimeData[]>([]);
	loadedAnimeObs$ = this.loadedAnime.asObservable();

	constructor(private animeApiService: AnimeApiService) {
		const storedAnime = this.getStoredAnimeFromLocalStorage();
		if (storedAnime) {
			this.storedAnime$.next(storedAnime);
		}
	}

	getAnimeTypeStoreById(id: number | string): Observable<AnimeTypeStore | undefined> {
		return this.storedAnimeObs$.pipe(map((anime) => anime.find((a) => a.selectedAnime.mal_id === Number(id))));
	}

	fetchAnime(query: string): void {
		this.animeApiService.getAnime(query).subscribe((data) => {
			this.loadedAnime.next(data);
		});
	}

	saveAnimeToStore(anime: AnimeTypeStore): void {
		this.storedAnime$.next([...this.storedAnime$.value, anime]);
		localStorage.setItem(this.storedAnimeKey, JSON.stringify(this.storedAnime$.value));
	}

	deleteAnimeFromStore(anime: AnimeTypeStore): void {
		this.storedAnime$.next(this.storedAnime$.value.filter((a) => a !== anime));
	}

	editAnimeInStore(animeId: number, newDescription: string): void {
		const changedData = this.storedAnime$.value.map((item) => {
			if (item.selectedAnime.mal_id === animeId) {
				item.description = newDescription;
			}
			return item;
		});
		this.storedAnime$.next(changedData);
	}

	cleanAnimeStore(): void {
		this.storedAnime$.next([]);
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
