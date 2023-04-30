import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-login-view',
	imports: [FormsModule],
	standalone: true,
	template: `
		<main class="w-full max-w-[640px] h-[100vh] mx-auto grid place-content-center px-3 sm:px-6">
			<form class="w-[400px]" (ngSubmit)="onFormSubmit()">
				<h3 class="text-center">Login Credentials</h3>
				<input
					(ngModel)="username()"
					(ngModelChange)="username.set($event)"
					required
					minlength="3"
					autocomplete="off"
					type="text"
					name="username"
					placeholder="Enter username"
				/>
				<button type="submit">Login</button>
			</form>
		</main>
	`,
})
export class LoginViewComponent {
	private authService = inject(AuthService);
	private router = inject(Router);

	username = signal('');

	onFormSubmit() {
		console.log(this.username());
		this.authService.setAuthenticatedUser({ name: this.username() });
		this.router.navigate(['dashboard']);
	}
}
