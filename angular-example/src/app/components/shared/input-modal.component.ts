import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-input-modal',
	standalone: true,
	imports: [CommonModule, FormsModule, MatDialogModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="fixed inset-0 z-10 p-6 overflow-y-auto bg-black bg-opacity-50" role="dialog" aria-modal="true">
			<div class="p-4 min-w-[420px] max-w-[420px] bg-gray-400 rounded-lg mx-auto mt-[30%]">
				<textarea
					[ngModel]="message()"
					(ngModelChange)="message.set($event)"
					placeholder="type value ..."
					class="w-full"
					cols="6"
				></textarea>

				<div class="flex items-center gap-3 mt-4">
					<button type="button" class="w-full p-2 text-center text-white bg-gray-600 rounded-lg" mat-dialog-close>
						Cancel
					</button>
					<button type="submit" class="w-full p-2 text-center text-white bg-green-600 rounded-lg" (click)="confirm()">
						Confirm
					</button>
				</div>
			</div>
		</div>
	`,
})
export class InputModalComponent {
	message = signal('');

	constructor(
		private dialogRef: MatDialogRef<InputModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data: { message: string }
	) {
		this.message.set(this.data.message);
	}

	confirm() {
		this.dialogRef.close(this.message());
	}
}
