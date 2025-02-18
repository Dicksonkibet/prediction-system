import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { UserService } from './register.service';
// Remove incorrect imports:
// import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink, signInWithPopup } from 'firebase/auth';

@Component({
  selector: 'app-register2',
  templateUrl: './register2.component.html',
  styleUrls: ['./register2.component.scss']
})
export class Register2Component implements OnInit {
 
  isGoogleSignIn: 'email' | 'google' = 'email';
  verifiedEmail: string | null = null;
  submitted = false;
  checkingEmail = false;
  emailExists: boolean | null = null;
  error = '';
  showPassword = false;
  year = new Date().getFullYear();
  isLoading = false;
  showRegistrationForm = false;
  emailForm!: FormGroup;
  registrationForm!: FormGroup;
  loading = false;

  constructor(
    // Remove Auth injection from here
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForms();
    document.body.classList.add('auth-body-bg');
  }

  navigateToHome() {
    this.router.navigate(['/homepage']);
  }
  
  private initializeForms() {
    this.emailForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]]
    });

    this.registrationForm = this.fb.group({
        username: ['', Validators.required],
        email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
        organization: ['', Validators.required],
        role: ['', Validators.required],
        password: ['', [
          Validators.required, 
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
        ]],
        confirmPassword: ['', Validators.required]
    }, { validator: this.mustMatch('password', 'confirmPassword') });
  }

  toggleSignInMethod(method: 'email' | 'google') {
    this.isGoogleSignIn = method;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registrationForm.controls;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  mustMatch(passwordKey: string, confirmPasswordKey: string) {
    return (formGroup: FormGroup) => {
      const password = formGroup.controls[passwordKey];
      const confirmPassword = formGroup.controls[confirmPasswordKey];
      if (confirmPassword.errors && !confirmPassword.errors['mustMatch']) {
        return;
      }
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ mustMatch: true });
      } else {
        confirmPassword.setErrors(null);
      }
    };
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goBack(): void {
    this.router.navigate(['..']);
  }

  async onSubmit() {
    this.submitted = true;
    if (this.registrationForm.invalid) return;
    this.loading = true;
    
    const formValue = {
        ...this.registrationForm.getRawValue(),
        email: this.verifiedEmail || this.registrationForm.get('email')?.value
    };

    try {
        // Check if we have an email
        if (!formValue.email) {
            throw new Error('Email is required');
        }

        // Use UserService to handle registration instead of doing it here
        await this.userService.registerUser(
            formValue.username,
            formValue.email,
            formValue.password,
            formValue.organization,
            formValue.role
        );

        // Success message is handled by UserService
        this.router.navigate(['/login']);
    } catch (error: any) {
        // Error handling is done in UserService
        console.error('Registration error:', error);
    } finally {
        this.loading = false;
    }
  }
}