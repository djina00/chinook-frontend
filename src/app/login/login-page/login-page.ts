import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginRequest } from '../../shared/services/auth';

@Component({
  selector: 'app-login-page',
  standalone: false,
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  hidePassword = true;
  loading = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      
      const credentials: LoginRequest = {
        Email: this.loginForm.get('email')?.value,
        Password: this.loginForm.get('password')?.value
      };

      this.authService.login(credentials).subscribe({
        next: (response) => {
          this.loading = false;
          if (response.success) {
            localStorage.setItem('currentUser', JSON.stringify(response.data));
            this.router.navigate(['/']);
          } else {
            this.errorMessage = response.message;
          }
        },
        error: (error) => {
          this.loading = false;
          if (error.status === 401) {
            this.errorMessage = 'Invalid email or password';
          } else if (error.status === 422) {
            this.errorMessage = 'Please check your input';
          } else {
            this.errorMessage = 'Login failed. Please try again.';
          }
          console.error('Login error:', error);
        }
      });
    }
  }
}
