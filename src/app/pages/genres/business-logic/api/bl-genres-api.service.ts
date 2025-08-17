import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGenre } from '../../interfaces/i-genre';

@Injectable({
  providedIn: 'root'
})
export class BlGenresApiService {

  private baseUrl = 'http://127.0.0.1:8000/api/v1'; // Chinook API base URL

  constructor(
    public http: HttpClient
  ) {}

  getAll(): Observable<IGenre[]> {
    return this.http.get<IGenre[]>(`${this.baseUrl}/genres`);
  }

  getOne(id: number): Observable<IGenre> {
    return this.http.get<IGenre>(`${this.baseUrl}/genres/${id}`);
  }
}