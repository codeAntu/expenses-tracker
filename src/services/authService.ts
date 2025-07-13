import app from '@/firebase/firebaseConfig';
import { exe } from '@/query/exe';
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

export async function checkVerification() {
  try {
    const user = auth.currentUser;
    console.log('Checking user verification status:', user);

    await user?.reload(); // Await reload to ensure latest info
    console.log('Checking user verification status:', user);

    if (user?.emailVerified) {
      console.log('User is verified:', user.email);
      await loginInDatabase(await user.getIdToken(true));
      return true;
    } else {
      if (user) await sendEmailVerification(user);
      return false;
    }
  } catch (error) {
    console.error('Error in checkVerification:', error);
    return false;
  }
}

async function loginInDatabase(idToken: string) {
  try {
    const res = await (
      await client.api.auth.firebase.$post({
        form: { idToken },
      })
    ).json();

    // TODO: Add sonner
    if (!res.success) {
      throw new Error(res.message || 'Login failed');
    }
    const token = res.data?.token || null;
    useAuthStore.getState().setToken(token);
    exe();
    console.log(res.data);
  } catch (error) {
    console.error('Error logging in user:', error);
    return null;
  }
}

export default async function signInWithEmail(
  email: string,
  password: string,
): Promise<{ haveToVerify: true; message: string } | any> {
  try {
    console.log('Signing in with email and password');
    const validatedUser = User.safeParse({ email, password });
    if (!validatedUser.success) {
      throw new Error(validatedUser.error.errors[0].message);
    }
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    if (!user.emailVerified) {
      await sendEmailVerification(user);
      return {
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

export async function signUpWithEmail(
  email: string,
  password: string,
): Promise<{ haveToVerify: boolean; message: string }> {
  const validatedUser = User.safeParse({ email, password });
  if (!validatedUser.success) {
    throw new Error(validatedUser.error.errors[0].message);
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await sendEmailVerification(user);

    return {
      haveToVerify: true,
      message: 'Verification email sent. Please check your inbox.',
    };
  } catch (error: unknown) {
    return {
      haveToVerify: false,
      message: (error as Error).message || 'An error occurred during sign up',
    };
  }
}

export async function signInWithProvider(provider: GoogleAuthProvider | GithubAuthProvider) {
  try {
    const userCredential = await signInWithPopup(auth, provider);
    const idToken = await userCredential.user.getIdToken();
    await loginInDatabase(idToken);
  } catch (error) {
    return error;
  }
}

export async function logout() {
  await auth.signOut();
  useAuthStore.getState().logout();
  console.log('User signed out');
}
