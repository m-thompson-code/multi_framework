import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { delay, map, of } from 'rxjs';

@Component({
	selector: 'app-comp-cow',
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
export class CompCowComponent implements OnInit {
	readonly url =
		'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&w=1000&q=80';

	image$ = of([]).pipe(
		delay(2500),
		map(() => this.url)
	);

	ngOnInit(): void {
		console.log('[CompCowComponent] ngOnInit');
	}
}
