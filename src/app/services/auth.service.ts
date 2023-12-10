// auth.service.ts
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private user: User | null = null;
  private allUsers: User[] = [];

  constructor(private router: Router) {
    // Get all users from localStorage
    const storedUsers = localStorage.getItem('allUsers');
    if (storedUsers) {
      try {
        this.allUsers = JSON.parse(storedUsers);
      } catch (error) {
        console.error('Error parsing users data from localStorage:', error);
      }
    }

    // Get user from localStorage
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

  async loginUser(username: string): Promise<void> {
    try {
      const user = this.allUsers.find((user) => user.username === username);
      if (user) {
        this.loginExistingUser(user);
      } else {
        const newUser = await this.createUser(username);
        this.loginExistingUser(newUser);
      }
    } catch (error) {
      console.error('Error during login or registration:', error);
      // Handle the error (e.g., show a message to the user)
    }
    // Navigate user to home page after successful login
    this.router.navigate(['/']);
  }

  async createUser(username: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      try {
        const newUser = new User(username);
        this.allUsers.push(newUser);
        localStorage.setItem('allUsers', JSON.stringify(this.allUsers));
        resolve(newUser);
      } catch (error) {
        reject(error);
      }
    });
  }

  loginExistingUser(user: User): void {
    this.user = user;
    this.isAuthenticated = true;
    localStorage.setItem('user', JSON.stringify(user));
  }


  logout(): void {
    this.user = null;
    this.isAuthenticated = false;
    //TODO call save time tracker
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getUserName(): string | null {
    return this.user?.username || null;
  }

  getUser(): User | null {
    return this.user;
  }
}
