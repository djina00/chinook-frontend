import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { BlTracksApiService } from './business-logic/api/bl-tracks-api.service';
import { ITrack } from './interfaces/i-track';
import { EditTrackModal } from './components/edit-track-modal/edit-track-modal';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-tracks',
  standalone: false,
  templateUrl: './tracks.html',
  styleUrl: './tracks.css'
})
export class Tracks implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'TrackId', 
    'Name', 
    'album', 
    'genre', 
    'Composer', 
    'UnitPrice',
    'actions'
  ];
  
  dataSource = new MatTableDataSource<ITrack>([]);
  loading = true;
  totalTracks = 0;
  pageSize = 10;
  currentPage = 0;

  constructor(
    private tracksService: BlTracksApiService,
    private bottomSheet: MatBottomSheet,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadTracks();
  }

  ngAfterViewInit(): void {
    // Don't connect paginator to datasource for server-side pagination
    this.dataSource.sort = this.sort;
  }

  loadTracks(): void {
    this.loading = true;
    const page = this.currentPage + 1; // API pages start from 1, Material paginator from 0
    
    this.tracksService.getTracks(page, this.pageSize).subscribe({
      next: (response: any) => {
        console.log('Tracks API Response:', response);
        
        if (response && response.success && response.data) {
          // Handle paginated response structure
          if (Array.isArray(response.data.data)) {
            this.dataSource.data = response.data.data;
            this.totalTracks = response.data.total;
          }
        }
        
        console.log('Loaded tracks:', this.dataSource.data.length);
        console.log('Total tracks:', this.totalTracks);
        
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading tracks:', error);
        this.loading = false;
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadTracks();
  }

  editTrack(track: ITrack): void {
    const bottomSheetRef = this.bottomSheet.open(EditTrackModal, {
      data: track,
      panelClass: 'edit-track-bottom-sheet'
    });

    bottomSheetRef.afterDismissed().subscribe((result: ITrack | undefined) => {
      if (result) {
        console.log('Track updated:', result);
        // Call API to update the track
        this.tracksService.updateTrack(result.TrackId, result).subscribe({
          next: (response) => {
            console.log('Track successfully updated:', response);
            this.snackBar.open('Track updated successfully!', 'Close', {
              duration: 3000,
              panelClass: ['success-snackbar']
            });
            this.loadTracks(); // Reload the tracks to show updated data
          },
          error: (error) => {
            console.error('Error updating track:', error);
            this.snackBar.open('Failed to update track. Please try again.', 'Close', {
              duration: 5000,
              panelClass: ['error-snackbar']
            });
          }
        });
      }
    });
  }

  deleteTrack(track: ITrack): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Track',
        message: `Are you sure you want to delete "${track.Name}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.tracksService.deleteTrack(track.TrackId).subscribe({
          next: (response) => {
            console.log('Track successfully deleted:', response);
            this.snackBar.open('Track deleted successfully!', 'Close', {
              duration: 3000,
              panelClass: ['success-snackbar']
            });
            this.loadTracks(); // Reload the tracks
          },
          error: (error) => {
            console.error('Error deleting track:', error);
            this.snackBar.open('Failed to delete track. Please try again.', 'Close', {
              duration: 5000,
              panelClass: ['error-snackbar']
            });
          }
        });
      }
    });
  }

}