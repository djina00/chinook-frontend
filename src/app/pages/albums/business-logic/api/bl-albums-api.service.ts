import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IAlbumResponse } from '../../interfaces/i-album';
import { ITrackResponse, ITrack } from '../../../tracks/interfaces/i-track';

@Injectable({
  providedIn: 'root'
})
export class BlAlbumsApiService {
  private readonly baseUrl = 'http://localhost:8000/api/v1';

  constructor(private http: HttpClient) { }

  getAlbums(): Observable<IAlbumResponse> {
    return this.http.get<IAlbumResponse>(`${this.baseUrl}/albums`);
  }

  getTracksByAlbum(albumId: number): Observable<ITrack[]> {
    return this.http.get<ITrackResponse>(`${this.baseUrl}/tracks`).pipe(
      map(response => {
        if (response.success && response.data.data) {
          // Filter tracks by AlbumId on the client side
          return response.data.data.filter(track => track.AlbumId === albumId);
        }
        return [];
      })
    );
  }

  getAllTracks(): Observable<ITrackResponse> {
    return this.http.get<ITrackResponse>(`${this.baseUrl}/tracks`);
  }
}