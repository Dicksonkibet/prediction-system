import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
      
    });
  }

  ngOnInit() {
    this.loadRememberedEmail();
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.setErrorMessage();
      return;
    }
  
    this.loading = true; // Set loading to true when login starts
  
    const { email, password, rememberMe } = this.loginForm.value;
  
    try {
      await this.authService.login(email, password);
      this.successMessage = 'Login successful!';
      this.errorMessage = '';
  
      // Handle Remember Me functionality
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
  
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      if (error?.error?.message === 'INVALID_LOGIN_CREDENTIALS') {
        this.errorMessage = 'Invalid email or password. Please try again.';
      } else if (error instanceof Error) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = 'An unexpected error occurred. Please try again later.';
      }
    } finally {
      this.loading = false; // Reset loading when login completes
    }
  }
  

  private setErrorMessage() {
    const controls = this.loginForm.controls;
  
    if (controls['email'].hasError('required')) {
      this.errorMessage = 'Email is required.';
    } else if (controls['email'].hasError('email')) {
      this.errorMessage = 'Invalid email format.';
    } else if (controls['email'].hasError('invalidDomain')) {
      this.errorMessage = 'Only Gmail and Yahoo emails are allowed.';
    } else if (controls['password'].hasError('required')) {
      this.errorMessage = 'Password is required.';
    } else {
      this.errorMessage = 'Please enter valid credentials.';
    }
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
  navigateToHome() {
    this.router.navigate(['/homepage']);
  }

  private loadRememberedEmail() {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      this.loginForm.patchValue({ email: rememberedEmail, rememberMe: true });
    }
  }

}
