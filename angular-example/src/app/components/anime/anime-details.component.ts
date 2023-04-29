import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AnimeTypeStore } from '../../services/anime.service';
import { hardMathEquation } from './../../models/api-anime-data.model';

@Component({
	selector: 'app-anime-details',
	standalone: true,
	imports: [CommonModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<ng-template #reuseTemplate let-data="passingData">
			<div class="space-x-1">
				<span
					class="text-base"
					[ngClass]="{
						'text-green-700': !animeData.isCool,
						'text-yellow-700': animeData.isCool
					}"
				>
					{{ data.name }}
				</span>
				<span> {{ data.value }} </span>
			</div>
		</ng-template>

		<article>
			<div class="flex gap-4 mb-2">
				<ng-container
					*ngTemplateOutlet="reuseTemplate; context: { passingData: { name: 'User', value: animeData.user.name } }"
				></ng-container>

				<div *ngIf="animeData.description" class="w-[2px] bg-gray-300"></div>

				<ng-container
					*ngTemplateOutlet="
						reuseTemplate;
						context: { passingData: { name: 'Description', value: animeData.description } }
					"
				></ng-container>
			</div>
			<div class="flex gap-4">
				<ng-container
					*ngTemplateOutlet="
						reuseTemplate;
						context: { passingData: { name: 'Episodes', value: animeData.selectedAnime.episodes } }
					"
				></ng-container>

				<div class="w-[2px] bg-gray-300"></div>

				<ng-container
					*ngTemplateOutlet="
						reuseTemplate;
						context: { passingData: { name: 'Score', value: animeData.selectedAnime.score } }
					"
				></ng-container>

				<div class="w-[2px] bg-gray-300"></div>

				<ng-container
					*ngTemplateOutlet="
						reuseTemplate;
						context: { passingData: { name: 'Duration', value: animeData.selectedAnime.duration } }
					"
				></ng-container>

				<div class="w-[2px] bg-gray-300"></div>

				<div>Equation: {{ hardMathEquation(animeData.selectedAnime.score ?? 0) }}</div>
			</div>
		</article>
	`,
})
export class AnimeDetailsComponent {
	@Input() animeData!: AnimeTypeStore;

	hardMathEquation(value: number) {
		return hardMathEquation(value);
	}
}
