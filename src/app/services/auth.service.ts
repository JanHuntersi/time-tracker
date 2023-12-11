// auth.service.ts
import { Injectable } from '@angular/core';
import { User, TimeRecord } from '../models/user.model';
import { Router } from '@angular/router';
import { TimeTrackingService } from './time-tracking.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private user: User | null = null;
  private allUsers: User[] = [];

  constructor(private router: Router, private timeTrackingService: TimeTrackingService) {
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
        this.logoutUser();
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
    }
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

  async logoutUser(): Promise<void> {

    await this.updateUserTime(this.timeTrackingService.getPageName(), this.timeTrackingService.stopTracking());

    this.user = null;
    this.isAuthenticated = false;

    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  saveUserToAllUsers(user: User): void {
    const userIndex = this.allUsers.findIndex((u) => u.username === user.username);
    if (userIndex >= 0) {
      this.allUsers[userIndex] = user;
      localStorage.setItem('allUsers', JSON.stringify(this.allUsers));
    }
    else { console.log('user not found in users'); }
  }

  async updateUserTime(pageName: string, elapsedTime: number): Promise<void> {
    try {
      if (!this.user) {
        return;
      }
      this.user.times[pageName as keyof TimeRecord] += elapsedTime;
      localStorage.setItem('user', JSON.stringify(this.user));
      this.saveUserToAllUsers(this.user);
    } catch (error) {
      console.log(error);
    }
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getUserData(): User {
    return this.user as User;
  }

  getUserName(): string | null {
    return this.user?.username || null;
  }
}
