'use client'; // You need this because you're using fetch

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    async function logout() {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          credentials: 'include' // THIS IS CRUCIAL
        });
        router.push('/auth/login');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
    logout();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      Logging out...
    </div>
  );
}