import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ITrack } from '../../interfaces/i-track';

@Injectable({
  providedIn: 'root'
})
export class BlTracksApiService {

  private baseUrl = 'http://127.0.0.1:8000/api/v1'; // Chinook API base URL

  constructor(
    public http: HttpClient
  ) {}

  getTracks(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/tracks`);
  }

  getTrack(id: number): Observable<ITrack> {
    return this.http.get<ITrack>(`${this.baseUrl}/tracks/${id}`);
  }

  getTracksByAlbum(albumId: number): Observable<ITrack[]> {
    return this.getTracks().pipe(
      map(response => {
        if (response.success && response.data.data) {
          // Filter tracks by AlbumId on the client side
          return response.data.data.filter((track: ITrack) => track.AlbumId === albumId);
        }
        return [];
      })
    );
  }
}