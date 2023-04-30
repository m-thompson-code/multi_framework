import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routerAnimation } from '../../animations/router-default';
import { StickyDirective } from '../../directives/sticky.directive';
import { AuthService } from '../../services/auth.service';
import { BannerComponent } from '../shared/banner.component';

@Component({
	selector: 'app-main',
	standalone: true,
	imports: [CommonModule, RouterModule, BannerComponent, StickyDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [routerAnimation],
	template: `
		<nav class="flex items-center justify-between w-full gap-4 p-4 bg-green-700">
			<a routerLink="/dashboard"> Dashboard </a>
			<a routerLink="/login" (click)="onLogOut()"> Logout </a>
		</nav>

		<!-- banner -->
		<app-banner [bannerTime]="8"></app-banner>

		<!-- bottom sticky -->
		<div [appSticky]="'bottom'">This is a bottom</div>

		<div class="mt-20 text-xl text-center">Welcome: {{ authenticationStore.getUser()?.name }}</div>

		<main [@routerAnimation]="outlet" class="w-full max-w-[840px] mx-auto mt-20 px-3 sm:px-6">
			<router-outlet #outlet="outlet"></router-outlet>
		</main>
	`,
})
export class MainComponent {
	authenticationStore = inject(AuthService);

	onLogOut() {
		this.authenticationStore.removeAuthenticatedUser();
	}
}
