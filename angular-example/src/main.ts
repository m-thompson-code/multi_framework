import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { PreloadAllModules, Routes, provideRouter, withPreloading } from '@angular/router';
import { AppComponent } from './app/app.component';
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
	providers: [importProvidersFrom(HttpClientModule), provideRouter(routes, withPreloading(PreloadAllModules))],
});
