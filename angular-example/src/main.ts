import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
	ActivatedRouteSnapshot,
	PreloadAllModules,
	Router,
	Routes,
	provideRouter,
	withPreloading,
} from '@angular/router';
import { AppComponent } from './app/app.component';
import { AuthService } from './app/services/auth.service';
import { AnimeDetailsComponent } from './app/views/anime-details.component';
import { DashboardComponent } from './app/views/dashboard.component';
import { LoginViewComponent } from './app/views/login-view.component';
import { MainComponent } from './app/views/main.component';

const routes: Routes = [
	{
		path: '',
		component: AppComponent,
		children: [
			{
				path: '',
				component: MainComponent,
				children: [
					{
						path: 'dashboard',
						loadChildren: () =>
							import('./app/views/dashboard.component').then((m) => [{ path: '', component: DashboardComponent }]),
						canActivate: [
							(route: ActivatedRouteSnapshot) => {
								const authenticationFacadeService = inject(AuthService);
								const router = inject(Router);

								if (!authenticationFacadeService.user) {
									router.navigate(['/login']);
								}

								return true;
							},
						],
					},
					{
						path: 'anime/:id',
						loadChildren: () =>
							import('./app/views/anime-details.component').then((m) => [
								{ path: '', component: AnimeDetailsComponent },
							]),
					},
				],
			},
			{
				path: 'login',
				loadChildren: () =>
					import('./app/views/login-view.component').then((m) => [{ path: '', component: LoginViewComponent }]),
			},
		],
	},
];

bootstrapApplication(AppComponent, {
	providers: [
		importProvidersFrom(HttpClientModule),
		provideRouter(routes, withPreloading(PreloadAllModules)),
		provideAnimations(),
	],
});
