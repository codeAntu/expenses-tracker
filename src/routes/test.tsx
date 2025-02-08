import { Button } from '@/components/ui/button';
import app from '@/firebase/firebaseConfig';
import { createFileRoute } from '@tanstack/react-router';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/test')({
  component: RouteComponent,
});

function RouteComponent() {
  const [token, setToken] = useState<string | null>(null);
  const auth = getAuth(app);

  async function getToken() {
    console.log('getToken');

    try {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken(); // 🔥 Firebase ID Token
        setToken(token);
      }
      return null;
    } catch (error) {
      console.error(error);
    }
  }



  console.log(token);

  return (
    <div>
      <Button onClick={getToken}>Get Token</Button>
      {/* <Button onClick={test}>Test</Button> */}
    </div>
  );
}
