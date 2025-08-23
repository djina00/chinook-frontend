import { Component, OnInit, signal, computed } from '@angular/core';
import { BlAlbumsApiService } from '../../admin-panel/albums/business-logic/api/bl-albums-api.service';
import { BlTracksApiService } from '../../admin-panel/tracks/business-logic/api/bl-tracks-api.service';
import { IAlbum } from '../../admin-panel/albums/interfaces/i-album';
import { ITrack } from '../../admin-panel/tracks/interfaces/i-track';

@Component({
  selector: 'app-albums',
  standalone: false,
  templateUrl: './albums.html',
  styleUrl: './albums.css'
})
export class Albums implements OnInit {
  albums = signal<IAlbum[]>([]);
  selectedTracks = signal<ITrack[]>([]);
  selectedAlbumId = signal<number | null>(null);
  loading = signal<boolean>(false);
  tracksLoading = signal<boolean>(false);
  searchQuery = signal<string>('');

  // Computed signal for filtered tracks
  filteredTracks = computed(() => {
    const tracks = this.selectedTracks();
    const query = this.searchQuery().toLowerCase().trim();
    
    if (!query) {
      return tracks;
    }
    
    return tracks.filter(track => 
      track.Name.toLowerCase().includes(query) ||
      (track.Composer && track.Composer.toLowerCase().includes(query)) ||
      (track.genre && track.genre.Name.toLowerCase().includes(query))
    );
  });

  constructor(
    private albumsService: BlAlbumsApiService,
    private tracksService: BlTracksApiService
  ) {}

  ngOnInit(): void {
    this.loadAlbums();
  }

  loadAlbums(): void {
    this.loading.set(true);
    this.albumsService.getAlbums().subscribe({
      next: (response) => {
        if (response.success) {
          this.albums.set(response.data);
          // Auto-load the first album's tracks
          if (response.data.length > 0) {
            this.onAlbumSelected(response.data[0].AlbumId);
          }
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading albums:', error);
        this.loading.set(false);
      }
    });
  }

  onAlbumSelected(albumId: number): void {
    this.selectedAlbumId.set(albumId);
    this.tracksLoading.set(true);
    this.tracksService.getTracksByAlbum(albumId).subscribe({
      next: (tracks) => {
        this.selectedTracks.set(tracks);
        this.tracksLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading tracks:', error);
        this.tracksLoading.set(false);
      }
    });
  }

  onTabChanged(event: any): void {
    // Album tab selected - tabs now start at index 0
    const album = this.albums()[event.index];
    if (album) {
      this.onAlbumSelected(album.AlbumId);
    }
    // Clear search when switching albums
    this.searchQuery.set('');
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  clearSearch(): void {
    this.searchQuery.set('');
  }

}
