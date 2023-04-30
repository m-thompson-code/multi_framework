import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AnimeService, AnimeTypeStore } from '../../services/anime.service';
import { AnimeDetailsComponent } from '../anime/anime-details.component';
import { AnimeFormComponent } from '../anime/anime-form.component';
import { GeneralCardComponent } from '../shared/general-card.component';

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [CommonModule, AnimeFormComponent, GeneralCardComponent, AnimeDetailsComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<section>
			<app-anime-form (formSubmit)="onFormSubmit($event)"></app-anime-form>

			<div class="mt-12 mb-3">Total Selected Data: {{ animeStore.getStoredAnime().length }}</div>

			<div class="flex flex-col gap-4">
				<app-general-card
					*ngFor="let data of animeStore.getStoredAnime()"
					[title]="data.selectedAnime.title"
					[showButtonDelete]="true"
					[showButtonDetails]="true"
					(detailsClicked)="onDetails(data)"
					(deleteClicked)="onDelete(data)"
				>
					<app-anime-details [animeData]="data"></app-anime-details>
				</app-general-card>
			</div>

			<footer class="h-16"></footer>
		</section>
	`,
})
export class DashboardComponent {
	animeStore = inject(AnimeService);
	router = inject(Router);

	onFormSubmit(value: AnimeTypeStore) {
		this.animeStore.saveAnimeToStore(value);
	}

	onDetails(data: AnimeTypeStore) {
		this.router.navigate([`/anime/${data.selectedAnime.mal_id}`]);
	}

	onDelete(data: AnimeTypeStore) {
		this.animeStore.deleteAnimeFromStore(data);
	}
}
