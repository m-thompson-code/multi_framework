import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay, map, switchMap } from 'rxjs';
import { AnimeService, AnimeTypeStore } from '../../services/anime.service';
import { GeneralCardComponent } from '../shared/general-card.component';
import { LoaderComponent } from '../shared/loader.component';
import { AnimeDetailsComponent } from './anime-details.component';

@Component({
	selector: 'app-anime-details-container',
	standalone: true,
	imports: [CommonModule, GeneralCardComponent, AnimeDetailsComponent, LoaderComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<ng-container *ngIf="selectedAnime$ | async as anime; else loading">
			<app-general-card
				*ngFor="let data of animeStore.storedAnimeObs$ | async"
				[title]="data.selectedAnime.title"
				[showEditButton]="true"
				(editClicked)="onModalDisplay(data)"
			>
				<app-anime-details [animeData]="data"></app-anime-details>
			</app-general-card>

			<!-- display buttons for dynamic component -->
			<div class="grid mt-20 place-content-center">
				<div class="flex items-center justify-center gap-4 mb-10">
					<button class="bg-blue-500 general">Shark</button>
					<button class="bg-white general">Cow</button>
				</div>

				<!-- dynamic component -->
			</div>
		</ng-container>

		<!-- loading -->
		<ng-template #loading>
			<app-loader></app-loader>
		</ng-template>
	`,
})
export class AnimeDetailsContainerComponent {
	route = inject(ActivatedRoute);
	animeStore = inject(AnimeService);

	selectedAnime$ = this.route.params.pipe(
		map((params) => params['id']),
		delay(3000),
		switchMap((id) => this.animeStore.getAnimeTypeStoreById(id))
	);

	constructor() {
		this.selectedAnime$.subscribe((data) => console.log(data));
	}

	onModalDisplay(data: AnimeTypeStore) {
		console.log(data);
	}
}
