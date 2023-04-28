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
	private storedAnime$ = new BehaviorSubject<AnimeTypeStore[]>([]);
	storedAnimeObs$ = this.storedAnime$.asObservable();

	// data loaded from API
	private loadedAnime = new BehaviorSubject<AnimeData[]>([]);
	loadedAnimeObs$ = this.loadedAnime.asObservable();

	constructor(private animeApiService: AnimeApiService) {}

	getAnimeTypeStoreById(id: number): Observable<AnimeTypeStore | undefined> {
		return this.storedAnime$.asObservable().pipe(
			// get the first item that matches the condition
			map((anime) => anime.find((a) => a.selectedAnime.mal_id === id))
		);
	}

	fetchAnime(query: string) {
		console.log('query', query);
		this.animeApiService.getAnime(query).subscribe((data) => {
			console.log('data from api', data);
			this.loadedAnime.next(data);
		});
	}

	saveAnimeToStore(anime: AnimeTypeStore): void {
		this.storedAnime$.next([...this.storedAnime$.value, anime]);
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
	}
}
