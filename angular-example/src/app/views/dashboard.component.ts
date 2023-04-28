import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AnimeFormComponent } from '../components/anime-form.component';

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [CommonModule, AnimeFormComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<section>
			<app-anime-form></app-anime-form>
		</section>
	`,
})
export class DashboardComponent {}
