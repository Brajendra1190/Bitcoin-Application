import { db } from '../config/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { User } from '../types/user';

export async function submitKYC(userId: string, kycData: Partial<User>) {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...kycData,
      kycVerified: false,
      kycSubmittedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (error) {
    console.error('KYC submission failed:', error);
    throw new Error('Failed to submit KYC');
  }
}

export async function getKYCStatus(userId: string) {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    return userDoc.data()?.kycVerified || false;
  } catch (error) {
    console.error('Failed to get KYC status:', error);
    throw new Error('Failed to get KYC status');
  }
}