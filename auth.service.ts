// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = false;

  login(email: string, password: string): boolean {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser.email === email && storedUser.password === password) {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  register(user: any): boolean {
    user.balance = 1000;
    user.transactions = [];
    localStorage.setItem('user', JSON.stringify(user));
    this.isAuthenticated = true;
    return true;
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  updateUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout(): void {
    localStorage.removeItem('user');
    this.isAuthenticated = false;
  }
}
