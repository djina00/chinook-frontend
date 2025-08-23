import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITrack } from '../../../tracks/interfaces/i-track';

@Injectable({
  providedIn: 'root'
})
export class BlAlbumsApiService {
  private readonly baseUrl = 'http://localhost:8000/api/v1';

  constructor(private http: HttpClient) { }

  getAlbums(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/albums`);
  }

  getAlbumWithTracks(albumId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/albums/${albumId}/tracks`);
  }
}