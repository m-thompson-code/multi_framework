import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { useValidator } from '../../composable/useValidator';
import { AnimeData } from '../../models/api-anime-data.model';
import { AnimeService } from '../../services/anime.service';

@Component({
	selector: 'app-anime-form-search',
	standalone: true,
	imports: [CommonModule, FormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: AnimeFormSearchComponent,
			multi: true,
		},
	],
	template: `
		<div class="relative flex flex-col">
			Typing: {{ searchRef() }}

			<!-- search text input  -->
			<input
				[value]="searchRef()"
				(input)="saveSearchValue($event)"
				type="text"
				name="searchRef"
				placeholder="Search.."
				(keypress)="onInputKeyDown()"
			/>

			<!-- errors in search -->
			<div *ngIf="errors().selectedAnimeError.errors.length > 0" class="flex flex-col mb-2">
				<span *ngFor="let err of errors().selectedAnimeError.errors" class="text-red-400">
					{{ err }}
				</span>
			</div>

			<!-- results  -->
			<div *ngIf="!searchLoadingRef() && !searchSelectedRef() && searchRef().length > 3" class="flex flex-col w-full">
				<button
					*ngFor="let data of animeService.getLoadedAnime()"
					type="button"
					class="g-select-value"
					(click)="onClick(data)"
				>
					{{ data.title }}
				</button>
			</div>
			<div *ngIf="searchLoadingRef() && searchRef().length > 3">Loading ...</div>
		</div>
	`,
})
export class AnimeFormSearchComponent implements ControlValueAccessor {
	searchRef = signal('');
	// remember the selected value
	searchSelectedRef = signal(false);
	// mark to true to show loading screen
	searchLoadingRef = signal(false);

	animeService = inject(AnimeService);

	onChange: (value: AnimeData) => void = () => {};
	onTouched = () => {};

	effectRef = effect(
		() => {
			//console.log('effect', this.searchSelectedRef());
			// fetching anime data from api, don't fetch if I already selected
			if (this.searchRef().length > 3 && !this.searchSelectedRef()) {
				console.log('eefect running');
				this.searchSelectedRef.set(false);
				this.searchLoadingRef.set(false);
				this.animeService.fetchAnime(this.searchRef());
			}
		},
		{ allowSignalWrites: true }
	);

	errors = computed(() => {
		const modelValue = this.searchRef();
		//	console.log('running computed', modelValue);

		const selectedAnimeError = useValidator({
			value: modelValue,
			type: 'text',
			validations: {
				required: {
					value: true,
					message: 'Value is required',
				},
				min: {
					value: 3,
					message: 'Value must be at least 3 characters',
				},
			},
		});

		return { selectedAnimeError };
	});

	saveSearchValue(event: Event) {
		const value = (event.target as HTMLInputElement).value;
		this.searchRef.set(value);
	}

	onInputKeyDown() {
		console.log('onInputKeyDown');
		this.searchLoadingRef.set(true);
		this.searchSelectedRef.set(false);
	}

	onClick(data: AnimeData) {
		// update search with whole value
		this.searchRef.set(data.title);

		// set selected to true
		this.searchSelectedRef.set(true);

		// set loading to false
		this.searchLoadingRef.set(false);

		// emit event to parent
		this.onChange(data);
	}

	/*
    parent component adds value to child
  */
	writeValue(animeData?: AnimeData): void {
		console.log('writeValue', animeData);
		this.searchRef.set(animeData?.title ?? '');
	}

	/*
    method to notify parent that the value (disabled state) has been changed
  */
	registerOnChange(fn: AnimeFormSearchComponent['onChange']): void {
		this.onChange = fn;
	}

	/*
    method to notify parent that form control has been touched
  */
	registerOnTouched(fn: AnimeFormSearchComponent['onTouched']): void {
		this.onTouched = fn;
	}
}
