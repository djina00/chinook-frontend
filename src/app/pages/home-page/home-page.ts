import { Component, OnInit } from '@angular/core';
import { BlTracksApiService } from '../../admin-panel/tracks/business-logic/api/bl-tracks-api.service';
import { ITrack } from '../../admin-panel/tracks/interfaces/i-track';
import { BlGenresApiService } from '../../admin-panel/genres/business-logic/api/bl-genres-api.service';
import { IGenre } from '../../admin-panel/genres/interfaces/i-genre';

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage implements OnInit {
  tracks: ITrack[] = [];
  genres: IGenre[] = [];
  loading = true;
  genresLoading = true;
  error: string | null = null;
  genresError: string | null = null;

  constructor(
    private tracksApiService: BlTracksApiService,
    private genresApiService: BlGenresApiService
  ) {}

  ngOnInit(): void {
    this.loadTracks();
    this.loadGenres();
  }

  private loadTracks(): void {
    this.loading = true;
    this.error = null;
    
    this.tracksApiService.getTracks().subscribe({
      next: (response: any) => {
        console.log('API Response:', response);
        
        // Handle the paginated response structure: {success: true, data: {data: [...], ...}}
        if (response && response.success && response.data && Array.isArray(response.data.data)) {
          this.tracks = response.data.data;
          console.log('Tracks loaded:', this.tracks.length);
        } else {
          console.log('Unexpected response structure:', response);
          this.tracks = [];
        }
        
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load tracks. Please try again.';
        this.loading = false;
        console.error('Error loading tracks:', error);
      }
    });
  }

  private loadGenres(): void {
    this.genresLoading = true;
    this.genresError = null;
    
    this.genresApiService.getGenres().subscribe({
      next: (response: any) => {
        console.log('Genres API Response:', response);
        
        // Handle different response structures
        if (response && response.data && Array.isArray(response.data)) {
          // Handle {data: [...]} structure
          this.genres = response.data;
          console.log('Genres loaded:', this.genres.length);
        } else if (response && response.success && response.data && Array.isArray(response.data.data)) {
          // Handle {success: true, data: {data: [...]}} structure
          this.genres = response.data.data;
          console.log('Genres loaded:', this.genres.length);
        } else if (Array.isArray(response)) {
          // Handle direct array response
          this.genres = response;
          console.log('Genres loaded:', this.genres.length);
        } else {
          console.log('Unexpected genres response structure:', response);
          this.genres = [];
        }
        
        this.genresLoading = false;
      },
      error: (error) => {
        this.genresError = 'Failed to load genres. Please try again.';
        this.genresLoading = false;
        console.error('Error loading genres:', error);
      }
    });
  }

  get featuredTracks(): ITrack[] {
    return this.tracks.slice(0, 6);
  }

  get featuredGenres(): IGenre[] {
    return this.genres.slice(0, 8);
  }
}