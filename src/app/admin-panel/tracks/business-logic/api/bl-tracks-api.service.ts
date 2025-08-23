import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITrack } from '../../interfaces/i-track';

@Injectable({
  providedIn: 'root'
})
export class BlTracksApiService {

  private baseUrl = 'http://127.0.0.1:8000/api/v1'; // Chinook API base URL

  constructor(
    public http: HttpClient
  ) {}

  getAll(): Observable<ITrack[]> {
    return this.http.get<ITrack[]>(`${this.baseUrl}/tracks`);
  }

  getOne(id: number): Observable<ITrack> {
    return this.http.get<ITrack>(`${this.baseUrl}/tracks/${id}`);
  }
}