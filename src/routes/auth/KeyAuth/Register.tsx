import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import client from '@/utils/client';
import { getKeyPair, saveKeyPair } from '@/utils/indexedDB';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

function arrayBufferToPem(buffer: ArrayBuffer, type: 'PUBLIC KEY' | 'PRIVATE KEY') {
  const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
  const lines = base64.match(/.{1,64}/g) || [];
  return `-----BEGIN ${type}-----\n${lines.join('\n')}\n-----END ${type}-----`;
}

async function generateKeyPair() {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: 'RSA-PSS',
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256',
    },
    true,
    ['sign', 'verify'],
  );

  const publicKeyBuffer = await window.crypto.subtle.exportKey('spki', keyPair.publicKey);
  const privateKeyBuffer = await window.crypto.subtle.exportKey('pkcs8', keyPair.privateKey);

  const publicKeyPem = arrayBufferToPem(publicKeyBuffer, 'PUBLIC KEY');
  const privateKeyPem = arrayBufferToPem(privateKeyBuffer, 'PRIVATE KEY');

  return {
    publicKey: publicKeyPem,
    privateKey: privateKeyPem,
  };
}

export default function Register() {
  const [email, setEmail] = useState('codeantu@gmail.com');
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [privateKey, setPrivateKey] = useState<string | null>(null);
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async ({ email, publicKey }: { email: string; publicKey: string }) => {
      return await (await client.api['key-auth'].register.$post({ json: { email, publicKey } })).json();
    },
    onSuccess: (data) => {
      if (!data.success) {
        toast.error(data.message || 'Registration failed. Please try again.');
        return;
      }
      toast.success('Registration successful! Please check your email for further instructions.');
      navigate('/key-auth/verify?email=' + encodeURIComponent(email));
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { publicKey, privateKey } = await generateKeyPair();
    setPublicKey(publicKey);
    setPrivateKey(privateKey);

    await saveKeyPair(email, publicKey, privateKey);
    await mutate({ email, publicKey });
  };

  async function fetchKeyPair() {
    console.log('token', await getKeyPair('codeantu@gmail.com'));
  }

  fetchKeyPair();

  console.log('Public Key:', publicKey);
  console.log('Private Key:', privateKey);

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 dark:from-gray-900 dark:to-gray-800'>
      <div className='w-full max-w-md space-y-8'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-white'>Email Authentication</h2>
          <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
            Enter your email address to continue and generate key
          </p>
        </div>

        <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>
                Email Address
              </label>
              <Input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your email address'
                className='w-full'
              />
            </div>
          </div>

          <Button type='submit' className='w-full' disabled={!email.trim()}>
            Generate Keys & Register
          </Button>
        </form>
      </div>
    </div>
  );
}
