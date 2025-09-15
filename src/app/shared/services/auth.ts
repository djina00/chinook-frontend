import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginRequest {
  Email: string;
  Password: string;
}

export interface RegisterRequest {
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any;
}

export interface Customer {
  CustomerId: number;
  FirstName: string;
  LastName: string;
  Company?: string;
  Address?: string;
  City?: string;
  State?: string;
  Country?: string;
  PostalCode?: string;
  Phone?: string;
  Fax?: string;
  Email: string;
  RoleId?: number;
  Role?: 'admin' | 'user';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8000/api/v1';
  private currentUser: Customer | null = null;

  constructor(private http: HttpClient) { 
    this.loadUserFromStorage();
  }

  login(credentials: LoginRequest): Observable<ApiResponse<Customer>> {
    return this.http.post<ApiResponse<Customer>>(`${this.baseUrl}/login`, credentials);
  }

  register(userData: RegisterRequest): Observable<ApiResponse<Customer>> {
    return this.http.post<ApiResponse<Customer>>(`${this.baseUrl}/register`, userData);
  }

  setCurrentUser(user: Customer): void {
    console.log('Logged in user data:', user);
    
    if (user.RoleId === 1) {
      user.Role = 'admin';
    } else if (user.RoleId === 2) {
      user.Role = 'user';
    }
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): Customer | null {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getUserRole(): 'admin' | 'user' | null {
    return this.currentUser?.Role || null;
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }

  isUser(): boolean {
    return this.getUserRole() === 'user';
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  private loadUserFromStorage(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }
  }
}
