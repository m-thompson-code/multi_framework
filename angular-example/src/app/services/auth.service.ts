import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type User = {
	name: string;
};

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private authenticatedUserKey = 'authenticatedUser';
	private authenticatedUser$ = new BehaviorSubject<User | null>(null);
	authenticatedUserObs$ = this.authenticatedUser$.asObservable();

	constructor() {
		const user = this.getAuthenticatedUserFromLocalStorage();
		if (user) {
			this.setAuthenticatedUser(user);
		}
	}

	get user(): User | null {
		return this.authenticatedUser$.value;
	}

	setAuthenticatedUser(user: User) {
		this.authenticatedUser$.next(user);
		localStorage.setItem(this.authenticatedUserKey, JSON.stringify(user));
	}

	removeAuthenticatedUser() {
		this.authenticatedUser$.next(null);
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
