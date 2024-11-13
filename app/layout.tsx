'use client';

import { Fragment, useState } from 'react';
import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CircleIcon, LogOut } from 'lucide-react';
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  signOut,
  selectUser
} from "@/lib/features/auth/authSlice";
import { useRouter } from 'next/navigation';

import "./styles/globals.css";

interface Props {
  readonly children: ReactNode;
}

function Header() {
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const router = useRouter();

  async function handleSignOut() {
    const result = await dispatch(signOut());
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
          <span className="ml-2 text-xl font-semibold text-gray-900">Your account application</span>
        </Link>
        <div className="flex items-center space-x-4">
          {error && <p className="text-red-500">{error}</p>}
          {user && user.data && (
            <Button onClick={handleSignOut} className="flex w-full">
              <LogOut className="mr-2 h-4 w-4" />
              {user ? <span>Sign out {user.name}</span> : <span>Sign out</span>}
            </Button>) ||
            <Fragment>
              <Link href="/login">
                <Button className="flex w-full">
                  <span>Sign in</span>
                </Button>
              </Link>
              <Link href="/register">
                <Button className="flex w-full">
                  <span>Register</span>
                </Button>
              </Link>
            </Fragment>
          }
        </div>
      </div>
    </header>
  );
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <section>
            <main>
              <section className="flex flex-col min-h-screen">
                <Header />
                {children}
              </section>
            </main>
          </section>
        </body>
      </html>
    </StoreProvider>
  );
}
