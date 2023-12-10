// auth.service.ts
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private user: User | null = null;

  constructor() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        this.user = JSON.parse(storedUser);
        this.isAuthenticated = true;
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        this.logout();
      }
    }
  }

  setLoggedInUser(username: string): void {
    this.user = { username };
    this.isAuthenticated = true;
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  logout(): void {
    this.user = null;
    this.isAuthenticated = false;
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getUser(): User | null {
    return this.user;
  }
}
