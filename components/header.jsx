"use client"

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { BarLoader } from 'react-spinners';

import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import {
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs'
import { useStoreUser } from '@/hooks/use-store-user';
import { Authenticated, Unauthenticated } from 'convex/react';
import { LayoutDashboard } from 'lucide-react';
const Header = () => {
  const path = usePathname();
  const { isLoading } = useStoreUser();

  if (path.includes("/editor")) {
    return null;
  }


  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 text-nowrap">
      <div className="backdrop-blur-md bg-white/20 border border-white/20 rounded-full px-8 py-3 flex items-center justify-between gap-8">
        <Link href="/" className="mr-10 md:mr-20">
          <Image
            src="/logo-text.png"
            alt="pixxel logo"
            className="min-w-24 object-cover"
            width={96}
            height={24}
            priority
          />
        </Link>

        {path === "/" && (
          <div className='hidden md:flex space-x-6'>

            <Link
              href="#features"
              className="text-white font-medium transition-all duration-300 hover:text-cyan-400 cursor-pointer"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-white font-medium transition-all duration-300 hover:text-cyan-400 cursor-pointer"
            >
              Pricing
            </Link>
            <Link
              href="#contact"
              className="text-white font-medium transition-all duration-300 hover:text-cyan-400 cursor-pointer"
            >
              Contact
            </Link>


          </div>
        )
        }
        <div className='flex itmes-centre gap-3 ml-10 md:ml-20'>
          <Unauthenticated>
            <SignInButton>
              <Button variant="glass">Sign-In</Button>
            </SignInButton>
            <SignUpButton>
              <Button variant="primary">Get started</Button>

            </SignUpButton>
          </Unauthenticated>
          <Authenticated>
            <Link href="/dashboard">
              <Button variant="primary" >
                <LayoutDashboard className='gap-5 h-10 w-22'/>
                <span className="hidden md:flex">Dashboard</span>
              </Button>

            </Link>
            <UserButton appearance={{

              element: {
                avatarBox: "w-8 h-8",
              }

            }}



            />
          </Authenticated>


        </div>
        {isLoading &&
          <div className='fixed bottom-0 left-0 w-full z-40 flex justify-center'>
            <BarLoader width={'94%'} color='magenta' />
          </div>}
      </div>
    </header>
  );
};

export default Header;
