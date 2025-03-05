import app from '@/firebase/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { z } from 'zod';

const auth = getAuth(app);

const User = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

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
    const user = userCredential.user;

    console.log('User:', user);
  } catch (error) {
    return error;
  }
}
