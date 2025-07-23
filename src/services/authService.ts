import app from '@/firebase/firebaseConfig';
import client from '@/utils/client';
import { useAuthStore } from '@/zustand/authStore';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { z } from 'zod';

export const auth = getAuth(app);

const User = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

interface ResType {
  success: boolean;
  message: string;
  haveToVerify?: boolean;
  data?: any;
  error?: unknown;
}

export async function checkVerification(): Promise<ResType> {
  try {
    const user = auth.currentUser;
    await user?.reload();
    if (user?.emailVerified) {
      const idToken = await user.getIdToken(true);
      return await loginInDatabase(idToken);
    } else {
      return {
        success: false,
        message: 'Email not verified',
        haveToVerify: true,
      };
    }
  } catch (error) {
    console.error('Error in checkVerification:', error);
    return {
      success: false,
      message: (error as Error).message || 'Error checking verification',
      error,
    };
  }
}

export async function resendVerificationEmail() {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('No user is currently signed in');
    }
    await sendEmailVerification(user);
    return {
      success: true,
      message: 'Verification email sent. Please check your inbox.',
    };
  } catch (error) {
    console.error('Error sending verification email:', error);
    return {
      success: false,
      message: (error as Error).message || 'Failed to send verification email',
    };
  }
}

async function loginInDatabase(idToken: string): Promise<ResType> {
  try {
    const res = await (
      await client.api.auth.firebase.$post({
        form: { idToken },
      })
    ).json();

    if (!res.success) {
      return res;
    }
    const token = res.data?.token || null;
    useAuthStore.getState().setToken(token);
    // updateClientHeader(token || '');
    return {
      success: true,
      message: 'User logged in successfully',
      data: res.data,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to log in to database',
      error,
    } as ResType;
  }
}

export default async function signInWithEmail(email: string, password: string): Promise<ResType | undefined> {
  try {
    const validatedUser = User.safeParse({ email, password });
    if (!validatedUser.success) {
      throw new Error(validatedUser.error.errors[0].message);
    }
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    if (!user.emailVerified) {
      await sendEmailVerification(user);
      return {
        success: false,
        haveToVerify: true,
        message: 'Verification email sent. Please check your inbox.',
      };
    }
    const idToken = await user.getIdToken();
    return await loginInDatabase(idToken);
  } catch (error) {
    throw error;
  }
}

export async function signUpWithEmail(email: string, password: string): Promise<ResType> {
  const validatedUser = User.safeParse({ email, password });
  if (!validatedUser.success) {
    throw new Error(validatedUser.error.errors[0].message);
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await sendEmailVerification(user);

    return {
      success: true,
      haveToVerify: true,
      message: 'Verification email sent. Please check your inbox.',
    };
  } catch (error: unknown) {
    return {
      success: false,
      haveToVerify: false,
      message: (error as Error).message || 'An error occurred during sign up',
      error,
    };
  }
}

export async function signInWithProvider(provider: GoogleAuthProvider | GithubAuthProvider): Promise<ResType> {
  try {
    const userCredential = await signInWithPopup(auth, provider);
    const idToken = await userCredential.user.getIdToken();
    return await loginInDatabase(idToken);
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || 'Provider login failed',
      error,
    };
  }
}

export async function logoutFn(): Promise<ResType> {
  try {
    await auth.signOut();
    useAuthStore.getState().logout();
    return {
      success: true,
      message: 'User signed out successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || 'Logout failed',
      error,
    };
  }
}
