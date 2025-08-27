import { Button } from '@/components/ui/button';
import client from '@/utils/client';
import { getKeyPair } from '@/utils/indexedDB';
import { useKeyAuthStore } from '@/zustand/keyAuthStore';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export default function KeyVerifyPage() {
  const [email, setEmail] = useState('');
  const { setToken } = useKeyAuthStore();
  const navigate = useNavigate();

  const { mutate: getChallenge, isPending: isLoadingChallenge } = useMutation({
    mutationFn: async (email: string) => {
      return await (await client.api['key-auth'].challenge.$post({ json: { email } })).json();
    },
    onSuccess: async (data) => {
      if (!data.success) {
        toast.error(data.message || 'Failed to get challenge. Please try again.');
        return;
      }

      const challenge = data.data?.challenge;

      if (!challenge) {
        toast.error('No challenge received from server.');
        return;
      }

      const keyPair = await getKeyPair(email);

      if (!keyPair) {
        toast.error('No key pair found for this email. Please register first.');
        return;
      }

      try {
        // Convert your stored private key PEM to a crypto key
        // Extract base64 content from PEM format (remove headers and newlines)
        const pemContent = keyPair.privateKey
          .replace(/-----BEGIN PRIVATE KEY-----/g, '')
          .replace(/-----END PRIVATE KEY-----/g, '')
          .replace(/\r?\n|\r/g, '');

        const privateKeyBuffer = Uint8Array.from(atob(pemContent), (c) => c.charCodeAt(0));
        const privateKey = await window.crypto.subtle.importKey(
          'pkcs8',
          privateKeyBuffer,
          { name: 'RSA-PSS', hash: 'SHA-256' },
          false,
          ['sign'],
        );

        // Sign the challenge string
        const encoder = new TextEncoder();
        const challengeBuffer = encoder.encode(challenge); // Convert string to bytes

        const signatureBuffer = await window.crypto.subtle.sign(
          {
            name: 'RSA-PSS',
            saltLength: 32, // SHA-256 hash length
          },
          privateKey,
          challengeBuffer,
        );

        // Convert signature to base64 string
        const signature = btoa(String.fromCharCode(...new Uint8Array(signatureBuffer)));

        verifySignature({ email, signature });
      } catch (error) {
        console.error('Cryptographic operation failed:', error);
        toast.error('Failed to sign challenge. Please check your private key and try again.');
      }
    },
  });

  const { mutate: verifySignature, isPending: isLoadingVerify } = useMutation({
    mutationFn: async (params: { email: string; signature: string }) => {
      return await (await client.api['key-auth'].verify.$post({ json: params })).json();
    },
    onSuccess: (data) => {
      if (data.success) {
        if (data.data?.token) {
          setToken(data.data.token);
          toast.success('Verification successful! You are now logged in.');
          navigate('/key-auth/protected');
        } else {
          toast.error('No token received from server.');
        }
      } else {
        toast.error(data.message || 'Verification failed. Please try again.');
      }
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get('email');
    if (emailParam) setEmail(emailParam);
  }, []);

  const handleVerify = () => {
    if (!email) {
      toast.error('Email is required for verification.');
      return;
    }
    getChallenge(email);
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 p-4 dark:from-gray-900 dark:to-gray-800'>
      <div className='w-full max-w-lg space-y-8 rounded-xl border border-gray-200 bg-white/80 px-8 py-10 shadow-lg backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80'>
        <div className='space-y-3 text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-white'>Key-Based Verification</h2>
          <p className='mt-2 text-sm text-gray-700 dark:text-gray-300'>
            Secure your account with cryptographic key authentication.
            <br />
            Click the button below to verify your identity using your device's private key.
          </p>
          {email && (
            <div className='mt-4 text-sm font-medium text-blue-700 dark:text-blue-300'>
              <span className='font-semibold'>Email:</span> {email}
            </div>
          )}
        </div>
        <Button onClick={handleVerify} className='w-full' disabled={isLoadingChallenge || isLoadingVerify}>
          {isLoadingChallenge || isLoadingVerify ? (
            <div className='flex items-center'>
              <div className='mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white'></div>
              {isLoadingChallenge ? 'Getting Challenge...' : 'Verifying...'}
            </div>
          ) : (
            'Verify with Key'
          )}
        </Button>
        <div className='mt-4 text-center'>
          <a
            href='/key-auth/register'
            className='inline-block text-sm font-semibold text-blue-500 underline transition hover:text-blue-600 dark:hover:text-blue-300'
          >
            Need to register? Go to Registration
          </a>
        </div>
      </div>
    </div>
  );
}
