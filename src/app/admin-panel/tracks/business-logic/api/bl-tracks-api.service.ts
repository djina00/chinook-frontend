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

  getTracks(page: number = 1, perPage: number = 10): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/tracks?page=${page}&per_page=${perPage}`);
  }

  getTrack(id: number): Observable<ITrack> {
    return this.http.get<ITrack>(`${this.baseUrl}/tracks/${id}`);
  }

  getTracksByAlbum(albumId: number): Observable<ITrack[]> {
    // Get all tracks by requesting a large page size
    return this.getTracks(1, 5000).pipe(
      map(response => {
        if (response && response.success && response.data && Array.isArray(response.data.data)) {
          // Filter tracks by AlbumId on the client side
          return response.data.data.filter((track: ITrack) => track.AlbumId === albumId);
        }
        return [];
      })
    );
  }
}