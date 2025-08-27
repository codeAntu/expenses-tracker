import { Button } from '@/components/ui/button';
import client from '@/utils/client';
import { getKeyPair } from '@/utils/indexedDB';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function KeyVerifyPage() {
  const [email, setEmail] = useState('');

  const { mutate: getChallenge } = useMutation({
    mutationFn: async (email: string) => {
      return await (await client.api['key-auth'].challenge.$post({ json: { email } })).json();
    },
    onSuccess: async (data) => {
      try {
        if (!data.success) {
          toast.error(data.message || 'Failed to get challenge. Please try again.');
          return;
        }

        console.log('here');

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

        console.log('KeyPair retrieved:', keyPair);

        // Convert PEM private key to ArrayBuffer
        const pemPrivateKey = keyPair.privateKey;
        const pemHeader = '-----BEGIN PRIVATE KEY-----';
        const pemFooter = '-----END PRIVATE KEY-----';
        const pemContents = pemPrivateKey.replace(pemHeader, '').replace(pemFooter, '').replace(/\s/g, '');
        const privateKeyBuffer = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0));

        const privateKey = await window.crypto.subtle.importKey(
          'pkcs8',
          privateKeyBuffer,
          {
            name: 'RSA-PSS',
            hash: 'SHA-256',
          },
          false,
          ['sign'],
        );

        console.log('Private key imported successfully');

        const encoder = new TextEncoder();
        const signatureBuffer = await window.crypto.subtle.sign(
          {
            name: 'RSA-PSS',
            saltLength: 32,
          },
          privateKey,
          encoder.encode(challenge),
        );
        const signature = btoa(String.fromCharCode(...new Uint8Array(signatureBuffer)));

        console.log({ signature });
        console.log('About to call verifySignature');

        verifySignature({ email, signature });
      } catch (error) {
        console.error('Error in onSuccess:', error);
        toast.error(
          'An error occurred during verification: ' + (error instanceof Error ? error.message : String(error)),
        );
      }
    },
  });

  const { mutate: verifySignature } = useMutation({
    mutationFn: async (params: { email: string; signature: string }) => {
      return await (await client.api['key-auth'].verify.$post({ json: params })).json();
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success('Verification successful! You are now logged in.');
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
        <Button onClick={handleVerify} className='w-full'>
          Verify with Key
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
