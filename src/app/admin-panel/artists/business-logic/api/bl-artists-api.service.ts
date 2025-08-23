import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlArtistsApiService {
  private readonly baseUrl = 'http://localhost:8000/api/v1';

  constructor(private http: HttpClient) { }

  getArtists(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/artists`);
  }
}