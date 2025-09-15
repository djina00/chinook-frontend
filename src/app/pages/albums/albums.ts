import { Component, OnInit, signal, computed } from '@angular/core';
import { BlAlbumsApiService } from '../../admin-panel/albums/business-logic/api/bl-albums-api.service';
import { BlTracksApiService } from '../../admin-panel/tracks/business-logic/api/bl-tracks-api.service';
import { IAlbum } from '../../admin-panel/albums/interfaces/i-album';
import { ITrack } from '../../admin-panel/tracks/interfaces/i-track';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private cartService: ShoppingCartService,
    private snackBar: MatSnackBar
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
    console.log('ALBUMS: Loading tracks for album ID:', albumId);
    this.selectedAlbumId.set(albumId);
    this.tracksLoading.set(true);
    this.albumsService.getAlbumWithTracks(albumId).subscribe({
      next: (response: any) => {
        console.log('ALBUMS: API Response for album tracks:', response);
        if (response && response.success && response.data) {
          // New API returns tracks directly in response.data
          if (Array.isArray(response.data)) {
            console.log('ALBUMS: Found tracks array:', response.data);
            this.selectedTracks.set(response.data);
          } else {
            console.log('ALBUMS: No tracks found, setting empty array');
            this.selectedTracks.set([]);
          }
        } else {
          this.selectedTracks.set([]);
        }
        this.tracksLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading album tracks:', error);
        this.tracksLoading.set(false);
      }
    });
  }

  onTabChanged(event: any): void {
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

  isInCart(trackId: number): boolean {
    return this.cartService.isInCart(trackId);
  }

  toggleCart(track: ITrack): void {
    this.cartService.toggleInCart(track);
    const action = this.isInCart(track.TrackId) ? 'added to' : 'removed from';
    this.snackBar.open(`"${track.Name}" ${action} cart!`, 'Close', {
      duration: 2000,
      panelClass: this.isInCart(track.TrackId) ? ['success-snackbar'] : ['info-snackbar']
    });
  }

}
