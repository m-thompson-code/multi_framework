import { Injectable, signal } from '@angular/core';

export type User = {
	name: string;
};

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private authenticatedUserKey = 'authenticatedUser';
	private authenticatedUser = signal<User | null>(null);

	constructor() {
		const user = this.getAuthenticatedUserFromLocalStorage();
		if (user) {
			this.setAuthenticatedUser(user);
		}
	}

	getUser(): User | null {
		return this.authenticatedUser();
	}

	setAuthenticatedUser(user: User) {
		this.authenticatedUser.set(user);
		localStorage.setItem(this.authenticatedUserKey, JSON.stringify(user));
	}

	removeAuthenticatedUser() {
		this.authenticatedUser.set(null);
		localStorage.removeItem(this.authenticatedUserKey);
	}

	private getAuthenticatedUserFromLocalStorage(): User | null {
		const user = localStorage.getItem(this.authenticatedUserKey);
		if (user) {
			return JSON.parse(user);
		}
		return null;
	}
}
