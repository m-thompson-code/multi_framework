import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HideAfterDirective } from '../../directives/hide-after.directive';

@Component({
	selector: 'app-banner',
	standalone: true,
	imports: [CommonModule, HideAfterDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div
			*hideAfter="bannerTime as time; let counter = counter"
			class="w-full p-4 text-xl text-center text-white bg-red-500"
		>
			Remaining time for banner: {{ counter }}
		</div>
	`,
})
export class BannerComponent {
	@Input() bannerTime: number = 6;
}
