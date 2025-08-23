import { Component, OnInit } from '@angular/core';
import { AuthService, Customer } from '../../shared/services/auth';
import { BlArtistsApiService } from '../artists/business-logic/api/bl-artists-api.service';
import { BlAlbumsApiService } from '../albums/business-logic/api/bl-albums-api.service';
import { BlGenresApiService } from '../genres/business-logic/api/bl-genres-api.service';
import { BlTracksApiService } from '../tracks/business-logic/api/bl-tracks-api.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  currentUser: Customer | null = null;
  userDisplayName = '';
  
  // Counters for dashboard metrics
  artistsCount = 0;
  albumsCount = 0;
  genresCount = 0;
  tracksCount = 0;
  loading = true;
  
  // Track individual API call completion
  private apiCallsCompleted = {
    artists: false,
    albums: false,
    genres: false,
    tracks: false
  };

  constructor(
    private authService: AuthService,
    private artistsService: BlArtistsApiService,
    private albumsService: BlAlbumsApiService,
    private genresService: BlGenresApiService,
    private tracksService: BlTracksApiService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.updateUserDisplayName();
    this.loadDashboardData();
  }

  private updateUserDisplayName(): void {
    if (this.currentUser) {
      this.userDisplayName = `${this.currentUser.FirstName} ${this.currentUser.LastName}`;
    }
  }

  private loadDashboardData(): void {
    this.loading = true;
    this.resetApiCallsStatus();
    
    // Load artists count
    this.artistsService.getArtists().subscribe({
      next: (response: any) => {
        if (response.success && response.data) {
          this.artistsCount = response.data.length;
        }
        this.apiCallsCompleted.artists = true;
        this.checkAllApiCallsCompleted();
      },
      error: (error) => {
        console.error('Error loading artists:', error);
        this.apiCallsCompleted.artists = true;
        this.checkAllApiCallsCompleted();
      }
    });

    // Load albums count
    this.albumsService.getAlbums().subscribe({
      next: (response: any) => {
        if (response.success && response.data) {
          this.albumsCount = response.data.length;
        }
        this.apiCallsCompleted.albums = true;
        this.checkAllApiCallsCompleted();
      },
      error: (error) => {
        console.error('Error loading albums:', error);
        this.apiCallsCompleted.albums = true;
        this.checkAllApiCallsCompleted();
      }
    });

    // Load genres count
    this.genresService.getGenres().subscribe({
      next: (response: any) => {
        // Handle different response structures
        if (response && response.data && Array.isArray(response.data)) {
          // Handle {data: [...]} structure
          this.genresCount = response.data.length;
        } else if (response && response.success && response.data && Array.isArray(response.data.data)) {
          // Handle {success: true, data: {data: [...]}} structure
          this.genresCount = response.data.data.length;
        } else if (Array.isArray(response)) {
          // Handle direct array response
          this.genresCount = response.length;
        }
        this.apiCallsCompleted.genres = true;
        this.checkAllApiCallsCompleted();
      },
      error: (error) => {
        console.error('Error loading genres:', error);
        this.apiCallsCompleted.genres = true;
        this.checkAllApiCallsCompleted();
      }
    });

    // Load tracks count
    this.tracksService.getTracks().subscribe({
      next: (response: any) => {
        // Handle the paginated response structure
        if (response && response.success && response.data && Array.isArray(response.data.data)) {
          this.tracksCount = response.data.data.length;
        } else if (Array.isArray(response)) {
          this.tracksCount = response.length;
        }
        this.apiCallsCompleted.tracks = true;
        this.checkAllApiCallsCompleted();
      },
      error: (error) => {
        console.error('Error loading tracks:', error);
        this.apiCallsCompleted.tracks = true;
        this.checkAllApiCallsCompleted();
      }
    });
  }

  private resetApiCallsStatus(): void {
    this.apiCallsCompleted = {
      artists: false,
      albums: false,
      genres: false,
      tracks: false
    };
  }

  private checkAllApiCallsCompleted(): void {
    const allCompleted = Object.values(this.apiCallsCompleted).every(completed => completed);
    if (allCompleted) {
      this.loading = false;
    }
  }
}
