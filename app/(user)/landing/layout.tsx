'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CircleIcon, LogOut } from 'lucide-react';
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  signOut,
} from "@/lib/features/auth/authSlice";
import { useRouter } from 'next/navigation';

function Header() {
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();

  const router = useRouter();

  async function handleSignOut() {
    const result = await dispatch(signOut());
    console.log(result);
    if (result?.payload?.error) {
      setError(result.payload?.error || 'Signout failed. Please try again.');
      return;
    }
    if (result?.payload?.redirect) {

      router.push(result.payload.redirect);
    }
  }

  return (
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <CircleIcon className="h-6 w-6 text-orange-500" />
          <span className="ml-2 text-xl font-semibold text-gray-900">Your account</span>
        </Link>
        <div className="flex items-center space-x-4">
          {error && <p className="text-red-500">{error}</p>}
          <Button onClick={handleSignOut} className="flex w-full">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      {children}
    </section>
  );
}
