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
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8000/api/v1';

  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest): Observable<ApiResponse<Customer>> {
    return this.http.post<ApiResponse<Customer>>(`${this.baseUrl}/login`, credentials);
  }

  register(userData: RegisterRequest): Observable<ApiResponse<Customer>> {
    return this.http.post<ApiResponse<Customer>>(`${this.baseUrl}/register`, userData);
  }
}
