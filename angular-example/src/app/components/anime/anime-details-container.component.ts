import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ComponentRef,
	OnDestroy,
	ViewChild,
	ViewContainerRef,
	inject,
} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { delay, filter, map, switchMap } from 'rxjs';
import { AnimeService, AnimeTypeStore } from '../../services/anime.service';
import { CompCowComponent } from '../shared/comp-cow.component';
import { CompSharkComponent } from '../shared/comp-shark.component';
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
				[title]="anime.selectedAnime.title"
				[showEditButton]="true"
				(editClicked)="onModalDisplay(anime)"
			>
				<app-anime-details [animeData]="anime"></app-anime-details>
			</app-general-card>

			<!-- display buttons for dynamic component -->
			<div class="grid mt-20 place-content-center">
				<div class="flex items-center justify-center gap-4 mb-10">
					<button class="bg-blue-500 general" (click)="renderDynamic('shark')">Shark</button>
					<button class="bg-white general" (click)="renderDynamic('cow')">Cow</button>
				</div>

				<!-- dynamic component -->
				<template #dynamicComponent></template>
			</div>
		</ng-container>

		<!-- loading -->
		<ng-template #loading>
			<app-loader></app-loader>
		</ng-template>
	`,
})
export class AnimeDetailsContainerComponent implements OnDestroy {
	route = inject(ActivatedRoute);
	animeStore = inject(AnimeService);
	dialog = inject(MatDialog);
	cd = inject(ChangeDetectorRef);

	@ViewChild('dynamicComponent', { read: ViewContainerRef }) dynamicComponent!: ViewContainerRef;
	private dynamicComponentRef?: ComponentRef<any>;

	selectedAnime$ = this.route.params.pipe(
		map((params) => params['id']),
		delay(3000),
		switchMap(async (id) => this.animeStore.getAnimeTypeStoreById(id))
	);

	ngOnDestroy(): void {
		this.dynamicComponentRef?.destroy();
	}

	renderDynamic(component: 'shark' | 'cow') {
		// prevent creating more than 1 component
		this.dynamicComponent.clear();
		// resolve component
		const dynamicComponent = component === 'shark' ? CompSharkComponent : CompCowComponent;
		// save ref to clear on component is destroy
		this.dynamicComponentRef = this.dynamicComponent.createComponent(dynamicComponent as any);
	}

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
				this.animeStore.editAnimeInStore(data.selectedAnime.mal_id, newDescription);
				this.cd.detectChanges();
			});
	}
}
