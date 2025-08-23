import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { BlAlbumsApiService } from '../../../albums/business-logic/api/bl-albums-api.service';
import { BlGenresApiService } from '../../../genres/business-logic/api/bl-genres-api.service';
import { IAlbum } from '../../../albums/interfaces/i-album';
import { IGenre } from '../../../genres/interfaces/i-genre';

@Component({
  selector: 'app-add-track-modal',
  standalone: false,
  templateUrl: './add-track-modal.html'
})
export class AddTrackModal implements OnInit {
  addForm: FormGroup;
  albums: IAlbum[] = [];
  genres: IGenre[] = [];
  loadingAlbums = false;
  loadingGenres = false;

  constructor(
    private fb: FormBuilder,
    private bottomSheetRef: MatBottomSheetRef<AddTrackModal>,
    private albumsService: BlAlbumsApiService,
    private genresService: BlGenresApiService
  ) {
    this.addForm = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(1)]],
      AlbumId: ['', [Validators.required]],
      GenreId: [''],
      Composer: ['', [Validators.required]],
      UnitPrice: [0.99, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadAlbums();
    this.loadGenres();
  }

  loadAlbums(): void {
    this.loadingAlbums = true;
    this.albumsService.getAlbums().subscribe({
      next: (response: any) => {
        if (response.success && response.data) {
          this.albums = response.data;
        }
        this.loadingAlbums = false;
      },
      error: (error) => {
        console.error('Error loading albums:', error);
        this.loadingAlbums = false;
      }
    });
  }

  loadGenres(): void {
    this.loadingGenres = true;
    this.genresService.getGenres().subscribe({
      next: (response: any) => {
        if (response && response.data && Array.isArray(response.data)) {
          this.genres = response.data;
        } else if (response && response.success && response.data && Array.isArray(response.data.data)) {
          this.genres = response.data.data;
        } else if (Array.isArray(response)) {
          this.genres = response;
        }
        this.loadingGenres = false;
      },
      error: (error) => {
        console.error('Error loading genres:', error);
        this.loadingGenres = false;
      }
    });
  }

  onSave(): void {
    if (this.addForm.valid) {
      const newTrack = {
        ...this.addForm.value,
        AlbumId: parseInt(this.addForm.value.AlbumId),
        GenreId: this.addForm.value.GenreId ? parseInt(this.addForm.value.GenreId) : null
      };
      this.bottomSheetRef.dismiss(newTrack);
    }
  }

  onCancel(): void {
    this.bottomSheetRef.dismiss();
  }
}