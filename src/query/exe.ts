import { getCookie } from '@/utils/cookies';

export function setAuthToken(t?: string): void {
  const token = getCookie('token') || t;
  // have to set the token in the headers
}

export function exe() {
  setAuthToken();
}
