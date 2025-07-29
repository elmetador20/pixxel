"use client"

import Link from 'next/link'; // ❗️Use from next/link, not lucide-react
import Image from 'next/image';
import React from 'react';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
const Header = () => {
  const path = usePathname();


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
          <SignedOut>
            <SignInButton>
            <Button variant="glass">Sign-In</Button>
            </SignInButton>
            <SignUpButton>
              <Button variant="primary">Get started</Button>
              
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton appearance={{

              element:{
                avatarBox:"w-8 h-8",
              }

            }}
            
            
            
            />
          </SignedIn>


        </div>
      </div>
    </header>
  );
};

export default Header;
