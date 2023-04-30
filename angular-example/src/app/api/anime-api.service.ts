import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AnimeData } from '../models/api-anime-data.model';

@Injectable({
	providedIn: 'root',
})
export class AnimeApiService {
	private readonly ANIME_API = 'https://api.jikan.moe/v4/anime';

	constructor(private httpClient: HttpClient) {}

	getAnime(query: string): Observable<AnimeData[]> {
		return this.httpClient.get<{ data: AnimeData[] }>(`${this.ANIME_API}?q=${query}&limit=6`).pipe(map((d) => d.data));
	}
}
