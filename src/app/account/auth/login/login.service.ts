import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, collection, getDocs, query, where, CollectionReference, collectionData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authStateSubject = new BehaviorSubject<boolean>(this.checkAuthState());
  authState$ = this.authStateSubject.asObservable();

  constructor(
    private auth: Auth,  // ✅ Ensure proper injection
    private firestore: Firestore,  // ✅ Ensure Firestore is injected
    private router: Router
  ) {
    // Track auth state changes
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        localStorage.setItem('userToken', user.uid);
        this.authStateSubject.next(true);
      } else {
        localStorage.removeItem('userToken');
        this.authStateSubject.next(false);
      }
    });
  }
  getUser(): any {
    return this.auth.currentUser; // Firebase method to get current user
  }

  private checkAuthState(): boolean {
    return !!localStorage.getItem('userToken');
  }

  get isAuthenticated(): boolean {
    return this.checkAuthState();
  }
  async login(email: string, password: string): Promise<void> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
  
      const userData = await this.getUserData(email);
      if (!userData) throw new Error('No user data found.');
  
      this.storeUserData(user.uid, email, userData);
  
      // Store the username in localStorage for easy access in other components
      localStorage.setItem('userName', userData.username || 'User'); // Save username
  
      this.authStateSubject.next(true);
  
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: `Welcome back, ${userData.username || 'User'}!`,
        timer: 2000,
        showConfirmButton: false,
      });
  
      setTimeout(() => this.router.navigate(['/dashboard']), 1000);
    } catch (error: any) {
      console.error('Login Error:', error);
      this.authStateSubject.next(false);
  
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: this.getErrorMessage(error),
        timer: 3000,
        showConfirmButton: false,
      });
  
      throw new Error(this.getErrorMessage(error));
    }
  }
  

  /** ✅ Logout Method */
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      localStorage.clear();
      this.authStateSubject.next(false);

      Swal.fire({
        icon: 'success',
        title: 'Logged Out',
        text: 'You have been logged out successfully.',
        timer: 2000,
        showConfirmButton: false,
      });

      await this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout Error:', error);
    }
  }

  /** ✅ Firestore: Fetch user data from 'users' collection */
  async getUserData(email: string): Promise<any> {
    try {
      const usersCollection: CollectionReference = collection(this.firestore, 'users');
      const q = query(usersCollection, where('email', '==', email));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        console.error('User data not found for email:', email);
        return null;
      }

      return querySnapshot.docs[0].data();
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  }

  /** ✅ Store user data locally */
  private storeUserData(uid: string, email: string, userData: any) {
    localStorage.setItem('userToken', uid);
    localStorage.setItem('userRole', userData.role || 'user');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', userData.username || 'User');
  }

  /** ✅ Handle Authentication Errors */
  private getErrorMessage(error: any): string {
    switch (error.code) {
      case 'auth/invalid-credential':
        return 'Incorrect email or password. Please try again.';
      case 'auth/user-not-found':
        return 'No account found with this email. Please sign up.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please check and try again.';
      case 'auth/user-disabled':
        return 'Your account has been disabled. Contact support for help.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  }
}
