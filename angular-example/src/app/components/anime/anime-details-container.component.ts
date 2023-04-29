import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { delay, filter, map, switchMap } from 'rxjs';
import { AnimeService, AnimeTypeStore } from '../../services/anime.service';
import { GeneralCardComponent } from '../shared/general-card.component';
import { InputModalComponent } from '../shared/input-modal.component';
import { LoaderComponent } from '../shared/loader.component';
import { AnimeDetailsComponent } from './anime-details.component';

@Component({
	selector: 'app-anime-details-container',
	standalone: true,
	imports: [CommonModule, GeneralCardComponent, AnimeDetailsComponent, LoaderComponent, MatDialogModule],
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
	dialog = inject(MatDialog);

	selectedAnime$ = this.route.params.pipe(
		map((params) => params['id']),
		delay(3000),
		switchMap((id) => this.animeStore.getAnimeTypeStoreById(id))
	);

	onModalDisplay(data: AnimeTypeStore) {
		this.dialog
			.open(InputModalComponent, {
				data: {
					message: data.description,
				},
			})
			.afterClosed()
			.pipe(filter((d): d is string => !!d))
			.subscribe((newDescription) => {
				console.log(newDescription);
				this.animeStore.editAnimeInStore(data.selectedAnime.mal_id, newDescription);
			});
	}
}
