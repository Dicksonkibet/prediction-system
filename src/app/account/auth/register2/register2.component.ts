import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { UserService } from './register.service';


@Component({
  selector: 'app-register2',
  //templateUrl: './register2.component.html',
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
    private auth: Auth,
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
        email: [{ value: '', disabled: false }, [Validators.required, Validators.email]], // Changed disabled to false
        organization: ['', Validators.required],
        role: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
    }, { validator: this.mustMatch('password', 'confirmPassword') });
}

  ngAfterViewInit() {
    if (isSignInWithEmailLink(this.auth, window.location.href)) {
      this.completeSignIn();
    }
  }

  toggleSignInMethod(method: 'email' | 'google') {
    this.isGoogleSignIn = method;
  }

  async handleGoogleSignIn() {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(this.auth, provider);
        const user = result.user;
        if (user && user.email) {
            await user.delete();
            this.showRegistrationForm = true;
            this.verifiedEmail = user.email;
            this.registrationForm.patchValue({
                email: user.email,  // This will now work since the field isn't disabled
                username: user.displayName || ''
            });
            Swal.fire('Email Verified', 'Please complete your registration.', 'success');
        }
    } catch (error: any) {
        Swal.fire('Error', error.message, 'error');
    }
}

  async sendVerificationEmail() {
    if (this.emailForm.invalid) return;
    this.isLoading = true;
    const email = this.emailForm.get('email')?.value;
    const actionCodeSettings = { url: window.location.href, handleCodeInApp: true };
    try {
      await sendSignInLinkToEmail(this.auth, email, actionCodeSettings);
      localStorage.setItem('emailForSignIn', email);
      Swal.fire('Verification Email Sent', 'Check your email for the verification link.', 'success');
    } catch (error: any) {
      Swal.fire('Error', error.message, 'error');
    } finally {
      this.isLoading = false;
    }
  }

  async completeSignIn() {
    const email = localStorage.getItem('emailForSignIn');
    if (!email) {
      Swal.fire('Error', 'No email found for sign-in.', 'error');
      return;
    }
    try {
      const result = await signInWithEmailLink(this.auth, email, window.location.href);
      localStorage.removeItem('emailForSignIn');
      if (result.user) {
        await result.user.delete();
      }
      this.verifiedEmail = email;
      this.showRegistrationForm = true;
      this.registrationForm.patchValue({ email: this.verifiedEmail });
      Swal.fire('Success', 'Email verified! Complete your registration.', 'success');
    } catch (error: any) {
      Swal.fire('Error', error.message, 'error');
    }
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
        ...this.registrationForm.value,
        email: this.verifiedEmail || this.registrationForm.get('email')?.value // Use verified email or form email
    };

    try {
        // Check if we have an email
        if (!formValue.email) {
            throw new Error('Email is required');
        }

        const userCredential = await createUserWithEmailAndPassword(
            this.auth,
            formValue.email,
            formValue.password
        );

        if (userCredential.user) {
            await this.userService.createUser({
                uid: userCredential.user.uid,
                email: formValue.email,
                username: formValue.username,
                organization: formValue.organization,
                role: formValue.role
            });

            Swal.fire('Registration Successful', 'You can now log in.', 'success');
            this.router.navigate(['/login']);
        }
    } catch (error: any) {
        Swal.fire('Error', error.message, 'error');
    } finally {
        this.loading = false;
    }
}
}
