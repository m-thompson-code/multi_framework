import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Output,
	WritableSignal,
	computed,
	inject,
	signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { useValidator } from '../../composable/useValidator';
import { AnimeFormType } from '../../models';
import { AnimeTypeStore } from '../../services/anime.service';
import { AuthService, User } from '../../services/auth.service';
import { AnimeFormSearchComponent } from './anime-form-search.component';

@Component({
	selector: 'app-anime-form',
	standalone: true,
	imports: [CommonModule, FormsModule, AnimeFormSearchComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<h2 class="mb-2 text-xl text-center text-green-800">Choose an Anime</h2>

		<form (ngSubmit)="onSubmit()">
			<!-- name search -->
			<app-anime-form-search
				[ngModel]="model().selectedAnime"
				(ngModelChange)="setSignalValue($event, model, 'selectedAnime')"
				name="selectedAnime"
			></app-anime-form-search>

			<!-- show text area checkbox -->
			<div class="flex items-center justify-end gap-4">
				<label for="showTextArea">show text area</label>
				<input
					[ngModel]="showTextArea()"
					(ngModelChange)="setSignalValue($event, showTextArea)"
					name="showTextArea"
					type="checkbox"
				/>
			</div>

			<!-- description -->
			<ng-container *ngIf="showTextArea(); else noText">
				<label>Description</label>
				<textarea
					[ngModel]="model().description"
					(ngModelChange)="setSignalValue($event, model, 'description')"
					name="description"
					rows="7"
				></textarea>

				<!-- errors in search -->
				<div *ngIf="errors().descriptionError.errors.length > 0" class="flex flex-col mb-2">
					<span *ngFor="let err of errors().descriptionError.errors" class="text-red-400">
						{{ err }}
					</span>
				</div>
			</ng-container>

			<!-- text if no description -->
			<ng-template #noText>
				<div class="p-4 text-center rounded-md bg-slate-400">No text area</div>
			</ng-template>

			<!-- checkbox -->
			<div class="flex items-center justify-end gap-4">
				<label for="isCool">Is anime cool?</label>
				<input
					[ngModel]="model().isCool"
					(ngModelChange)="setSignalValue($event, model, 'isCool')"
					name="isCool"
					type="checkbox"
				/>
			</div>

			<!-- submit -->
			<button type="submit">Submit</button>
		</form>
	`,
})
export class AnimeFormComponent {
	@Output() formSubmit = new EventEmitter<AnimeTypeStore>();

	model: WritableSignal<AnimeFormType> = signal({
		selectedAnime: null,
		description: '',
		isCool: false,
	});

	showTextArea = signal(false);

	authService = inject(AuthService);

	onSubmit() {
		const modelValues = this.model();

		if (!modelValues.selectedAnime) {
			console.log('Submit form - no selected anime');
			return;
		}

		if (this.errors().descriptionError.errors.length > 0) {
			console.log('Submit form - description error');
			return;
		}

		// console.log("submitting", modelValues.value);

		this.formSubmit.emit({
			selectedAnime: modelValues.selectedAnime,
			description: modelValues.description,
			isCool: modelValues.isCool,
			user: this.authService.getUser() as User,
		});

		this.clearForm();
	}

	errors = computed(() => {
		// getting value because hard to debug
		const showTextAreaValue = this.showTextArea();
		const modelValue = this.model();

		const descriptionError = showTextAreaValue
			? useValidator({
					value: modelValue.description,
					type: 'text',
					validations: {
						required: {
							value: true,
							message: 'Value is required',
						},
					},
			  })
			: { errors: [] };

		return { descriptionError };
	});

	setSignalValue<T>(value: T, signal: WritableSignal<T>, key?: keyof T) {
		if (key) {
			signal.update((prev) => ({ ...prev, [key]: value }));
		} else {
			signal.set(value);
		}
	}

	clearForm() {
		this.showTextArea.set(false);
		this.model.set({
			selectedAnime: null,
			description: '',
			isCool: false,
		});
	}
}
