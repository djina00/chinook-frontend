import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BlTracksApiService } from './business-logic/api/bl-tracks-api.service';
import { ITrack } from './interfaces/i-track';

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

  constructor(private tracksService: BlTracksApiService) {}

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



}