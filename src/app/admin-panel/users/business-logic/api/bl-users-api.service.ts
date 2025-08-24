import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../../interfaces/i-user';

@Injectable({
  providedIn: 'root'
})
export class BlUsersApiService {
  private baseUrl = 'http://127.0.0.1:8000/api/v1';

  constructor(private http: HttpClient) {}

  getUsers(page: number = 1, perPage: number = 10): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/customers?page=${page}&perpage=${perPage}`);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/customers/${id}`);
  }

  createUser(user: Partial<IUser>): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/customers`, user);
  }

  updateUser(id: number, user: Partial<IUser>): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/customers/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/customers/${id}`);
  }
}