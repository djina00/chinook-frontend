import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../../../../shared/services/auth';
import { ShoppingCartService } from '../../../../../shared/services/shopping-cart.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  isMobileMenuOpen = false;
  isLoggedIn = false;
  isAdmin = false;
  isUser = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    public cartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.updateUserStatus();
    
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.updateUserStatus();
      }
    });
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  get cartCount(): number {
    return this.cartService.getCartCount();
  }

  private updateUserStatus(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isAdmin = this.authService.isAdmin();
    this.isUser = this.authService.isUser();
  }
}
