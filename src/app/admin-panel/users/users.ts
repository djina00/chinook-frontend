import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { BlUsersApiService } from './business-logic/api/bl-users-api.service';
import { IUser } from './interfaces/i-user';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog';
import { EditUserModal } from './components/edit-user-modal/edit-user-modal';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'CustomerId', 
    'FirstName', 
    'LastName', 
    'Email',
    'Company',
    'Country',
    'actions'
  ];
  
  dataSource = new MatTableDataSource<IUser>([]);
  loading = true;
  totalUsers = 0;
  pageSize = 10;
  currentPage = 0;

  constructor(
    private usersService: BlUsersApiService,
    private bottomSheet: MatBottomSheet,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  loadUsers(): void {
    this.loading = true;
    const page = this.currentPage + 1;
    
    this.usersService.getUsers(page, this.pageSize).subscribe({
      next: (response: any) => {
        console.log('Users API Response:', response);
        
        if (response && response.success && response.data) {
          if (Array.isArray(response.data.data)) {
            this.dataSource.data = response.data.data;
            this.totalUsers = response.data.total;
          }
        }
        
        console.log('Loaded users:', this.dataSource.data.length);
        console.log('Total users:', this.totalUsers);
        
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.loading = false;
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadUsers();
  }

  editUser(user: IUser): void {
    const bottomSheetRef = this.bottomSheet.open(EditUserModal, {
      data: user,
      panelClass: 'edit-user-bottom-sheet'
    });

    bottomSheetRef.afterDismissed().subscribe((result: IUser | undefined) => {
      if (result) {
        console.log('User updated:', result);
        this.usersService.updateUser(result.CustomerId, result).subscribe({
          next: (response) => {
            console.log('User successfully updated:', response);
            this.snackBar.open('User updated successfully!', 'Close', {
              duration: 3000,
              panelClass: ['success-snackbar']
            });
            this.loadUsers(); // Reload the users to show updated data
          },
          error: (error) => {
            console.error('Error updating user:', error);
            this.snackBar.open('Failed to update user. Please try again.', 'Close', {
              duration: 5000,
              panelClass: ['error-snackbar']
            });
          }
        });
      }
    });
  }

  deleteUser(user: IUser): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete User',
        message: `Are you sure you want to delete "${user.FirstName} ${user.LastName}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.usersService.deleteUser(user.CustomerId).subscribe({
          next: (response) => {
            console.log('User successfully deleted:', response);
            this.snackBar.open('User deleted successfully!', 'Close', {
              duration: 3000,
              panelClass: ['success-snackbar']
            });
            this.loadUsers(); // Reload the users
          },
          error: (error) => {
            console.error('Error deleting user:', error);
            this.snackBar.open('Failed to delete user. Please try again.', 'Close', {
              duration: 5000,
              panelClass: ['error-snackbar']
            });
          }
        });
      }
    });
  }

}
