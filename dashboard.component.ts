// src/app/pages/dashboard/dashboard.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  balance = 0;
  transactions: any[] = [];
  transferAmount = 0;
  recipientEmail = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    this.balance = user.balance || 0;
    this.transactions = user.transactions || [];
  }

  transferFunds(): void {
    if (!this.recipientEmail || this.transferAmount <= 0 || this.transferAmount > this.balance) {
      alert('Invalid transfer details');
      return;
    }

    this.balance -= this.transferAmount;

    const transaction = {
      type: 'Transfer',
      amount: this.transferAmount,
      to: this.recipientEmail,
      date: new Date().toISOString()
    };

    this.transactions.push(transaction);

    const user = this.authService.getUser();
    user.balance = this.balance;
    user.transactions = this.transactions;
    this.authService.updateUser(user);

    alert('Transfer successful!');
    this.transferAmount = 0;
    this.recipientEmail = '';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
