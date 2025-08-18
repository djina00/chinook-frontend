import { Component, OnInit } from '@angular/core';
import { AuthService, Customer } from '../../shared/services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  currentUser: Customer | null = null;
  userDisplayName = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.updateUserDisplayName();
  }

  private updateUserDisplayName(): void {
    if (this.currentUser) {
      this.userDisplayName = `${this.currentUser.FirstName} ${this.currentUser.LastName}`;
    }
  }
}
