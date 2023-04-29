import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-main',
	standalone: true,
	imports: [CommonModule, RouterModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<nav class="flex items-center justify-between w-full gap-4 p-4 mt-2 bg-green-700">
			<a routerLink="/dashboard" class="link"> Dashboard </a>
			<a routerLink="/login" class="link" (click)="onLogOut()"> Logout </a>
		</nav>

		<div class="mt-20 text-xl text-center">
			Welcome: {{ (authenticationStore.authenticatedUserObs$ | async)?.name }}
		</div>

		<main class="w-full max-w-[840px] mx-auto mt-20 px-3 sm:px-6">
			<router-outlet></router-outlet>
		</main>
	`,
})
export class MainComponent {
	authenticationStore = inject(AuthService);

	onLogOut() {
		this.authenticationStore.removeAuthenticatedUser();
	}
}
