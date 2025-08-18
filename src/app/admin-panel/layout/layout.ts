import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, Customer } from '../../shared/services/auth';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout implements OnInit {
  currentUser: Customer | null = null;
  userDisplayName = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.updateUserDisplayName();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private updateUserDisplayName(): void {
    if (this.currentUser) {
      this.userDisplayName = `${this.currentUser.FirstName} ${this.currentUser.LastName}`;
    }
  }
}
