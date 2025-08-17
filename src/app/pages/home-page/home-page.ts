import { Component, OnInit } from '@angular/core';
import { BlTracksApiService } from '../tracks/business-logic/api/bl-tracks-api.service';
import { ITrack } from '../tracks/interfaces/i-track';

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage implements OnInit {
  tracks: ITrack[] = [];
  loading = true;
  error: string | null = null;
  displayedColumns: string[] = ['trackId', 'name', 'composer', 'duration', 'price'];

  constructor(
    private tracksApiService: BlTracksApiService
  ) {}

  ngOnInit(): void {
    this.loadTracks();
  }

  private loadTracks(): void {
    this.loading = true;
    this.error = null;
    
    this.tracksApiService.getAll().subscribe({
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

}