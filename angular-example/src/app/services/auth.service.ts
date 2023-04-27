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
	private authenticatedUser = new BehaviorSubject<User | null>(null);
	authenticatedUser$ = this.authenticatedUser.asObservable();

	constructor() {
		const user = this.getAuthenticatedUserFromLocalStorage();
		if (user) {
			this.setAuthenticatedUser(user);
		}
	}

	getAuthenticatedUser() {
		return this.authenticatedUser.asObservable();
	}

	setAuthenticatedUser(user: User) {
		this.authenticatedUser.next(user);
		this.saveAuthenticatedUserIntoLocalStorage(user);
	}

	removeAuthenticatedUser() {
		this.authenticatedUser.next(null);
		this.removeAuthenticatedUserFromLocalStorage();
	}

	private saveAuthenticatedUserIntoLocalStorage(user: User) {
		localStorage.setItem(this.authenticatedUserKey, JSON.stringify(user));
	}

	private removeAuthenticatedUserFromLocalStorage() {
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
