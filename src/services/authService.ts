import app from '@/firebase/firebaseConfig';
import client from '@/utils/client';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { z } from 'zod';
import { useAuthStore } from '@/zustand/authStore';
import { exe } from '@/query/exe';

const auth = getAuth(app);

const User = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

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

export async function signInWithEmail(email: string, password: string) {
  console.log('Signing in with email and password');
  const validatedUser = User.safeParse({ email, password });
  if (!validatedUser.success) {
    throw new Error(validatedUser.error.errors[0].message);
  }
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  console.log('User:', user);
}

export async function signUpWithEmail(email: string, password: string) {
  const validatedUser = User.safeParse({ email, password });
  if (!validatedUser.success) {
    throw new Error(validatedUser.error.errors[0].message);
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User:', user);
  } catch (error: unknown) {
    return error;
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
  console.log('User signed out');
}
