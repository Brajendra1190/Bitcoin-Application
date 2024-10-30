import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { User, UserSchema } from '../types/user';

export async function signUp(email: string, password: string, displayName: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    
    // Create user document in Firestore
    const userData: Partial<User> = {
      uid: userCredential.user.uid,
      email,
      displayName,
      kycVerified: false
    };
    
    await setDoc(doc(db, 'users', userCredential.user.uid), userData);
    return userCredential.user;
  } catch (error) {
    console.error('Signup failed:', error);
    throw error;
  }
}

export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}

export async function signOut() {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Signout failed:', error);
    throw error;
  }
}

export async function resetPassword(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Password reset failed:', error);
    throw error;
  }
}