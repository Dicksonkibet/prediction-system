import { Injectable } from '@angular/core';
import { 
  Firestore, 
  collection, 
  doc, 
  setDoc, 
  query, 
  where,
  getDocs 
} from '@angular/fire/firestore';
import { 
  Auth, 
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
  linkWithCredential,
  deleteUser,
  fetchSignInMethodsForEmail
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

export interface User {
  userId: string;
  username: string;
  email: string;
  organization: string;
  role: string;
  createdAt: Date;
  status?: 'active' | 'inactive';
  provider?: 'email' | 'google';
  lastLogin?: Date;
  uid?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly usersCollection = 'users';

  constructor(
    private firestore: Firestore, 
    private auth: Auth, 
    private router: Router
  ) {}

  async signInAnonymously(): Promise<void> {
    try {
      await signInAnonymously(this.auth);
      console.log("Anonymous user signed in.");
    } catch (error) {
      console.error("Error signing in anonymously:", error);
      Swal.fire('Error', 'Failed to sign in anonymously. Please try again.', 'error');
      throw error;
    }
  }

  private async checkEmailExists(email: string): Promise<boolean> {
    try {
      // Check in Firebase Auth
      const signInMethods = await fetchSignInMethodsForEmail(this.auth, email);
      if (signInMethods.length > 0) {
        return true;
      }

      // Check in Firestore
      const usersRef = collection(this.firestore, this.usersCollection);
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      
      return !querySnapshot.empty;
    } catch (error) {
      console.error('Error checking email existence:', error);
      Swal.fire('Error', 'Failed to verify email status. Please try again.', 'error');
      throw error;
    }
  }

  async createUser(userData: Partial<User>): Promise<void> {
    try {
      if (!userData.email) {
        Swal.fire('Error', 'Email is required', 'error');
        throw new Error('Email is required');
      }

      // Check if email already exists
      const emailExists = await this.checkEmailExists(userData.email);
      if (emailExists) {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'This email is already registered in the system. Please use a different email address.',
          confirmButtonText: 'OK'
        });
        throw new Error('Email already exists in the system');
      }

      const userId = userData.uid || userData.userId || this.auth.currentUser?.uid;
      
      if (!userId) {
        Swal.fire('Error', 'No user ID available', 'error');
        throw new Error('No user ID available');
      }

      const userRef = doc(this.firestore, `${this.usersCollection}/${userId}`);
      
      const newUser: User = {
        userId: userId,
        username: userData.username || '',
        email: userData.email,
        organization: userData.organization || '',
        role: userData.role || '',
        createdAt: new Date(),
        status: 'active',
        provider: userData.provider || 'email',
        lastLogin: new Date()
      };

      await setDoc(userRef, newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      if (!(error instanceof Error) || !error.message.includes('already')) {
        Swal.fire('Error', 'Failed to create user account. Please try again.', 'error');
      }
      throw error;
    }
  }

  async registerUser(
    username: string, 
    email: string, 
    password: string, 
    organization: string, 
    role: string
  ): Promise<void> {
    try {
      // Check if email already exists before attempting registration
      const emailExists = await this.checkEmailExists(email);
      if (emailExists) {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'This email is already registered. Please use a different email address.',
          confirmButtonText: 'OK'
        });
        throw new Error('This email is already registered in the system');
      }

      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const userId = userCredential.user.uid;

      const userData: User = {
        userId,
        username,
        email,
        organization,
        role,
        createdAt: new Date(),
        status: 'active',
        provider: 'email',
        lastLogin: new Date()
      };

      await this.createUser(userData);

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'Your account has been created successfully!',
        confirmButtonText: 'OK'
      });
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'This account already exists. Please use a different email address.',
          confirmButtonText: 'OK'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'An error occurred during registration. Please try again.',
          confirmButtonText: 'OK'
        });
      }
      throw error;
    }
  }

  async registerWithGoogle(organization: string, role: string): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      const user = result.user;

      if (!user.email || !user.displayName) {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'Required Google profile information is missing.',
          confirmButtonText: 'OK'
        });
        throw new Error('Missing required Google profile information');
      }

      // Check if email already exists
      const emailExists = await this.checkEmailExists(user.email);
      if (emailExists) {
        // Clean up the temporary Google auth
        await user.delete();
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'This Google account email is already registered in our system.',
          confirmButtonText: 'OK'
        });
        throw new Error('This email is already registered in the system');
      }

      if (this.auth.currentUser?.isAnonymous) {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          await linkWithCredential(this.auth.currentUser, credential);
        } else {
          Swal.fire('Error', 'Failed to retrieve Google credential.', 'error');
          throw new Error('Failed to retrieve Google credential.');
        }
      }

      const userData: User = {
        userId: user.uid,
        username: user.displayName,
        email: user.email,
        organization,
        role,
        createdAt: new Date(),
        status: 'active',
        provider: 'google',
        lastLogin: new Date()
      };

      await this.createUser(userData);

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'Your Google account has been registered successfully!',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error('Error registering with Google:', error);
      if (!(error instanceof Error) || !error.message.includes('already')) {
        Swal.fire({
          icon: 'error',
          title: 'Google Registration Failed',
          text: 'An error occurred during Google registration. Please try again.',
          confirmButtonText: 'OK'
        });
      }
      throw error;
    }
  }
}