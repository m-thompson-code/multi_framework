import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { delay, map, of } from 'rxjs';

@Component({
	selector: 'app-comp-shark',
	standalone: true,
	imports: [CommonModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<ng-container *ngIf="image$ | async as image; else loader">
			<img [src]="image" class="w-[400px] h-[300px]" />
		</ng-container>

		<ng-template #loader>
			<div class="w-[400px] h-[300px] animate-pulse bg-gray-500 p-2"></div>
		</ng-template>
	`,
})
export class CompSharkComponent implements OnInit {
	readonly url = 'https://cdn.britannica.com/79/65379-050-5CF52BAC/Shortfin-mako-shark-seas.jpg';

	image$ = of([]).pipe(
		delay(2500),
		map(() => this.url)
	);

	ngOnInit(): void {
		console.log('[CompSharkComponent] ngOnInit');
	}
}
