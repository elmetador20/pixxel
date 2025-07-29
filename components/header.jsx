"use client"

import Link from 'next/link'; // ❗️Use from next/link, not lucide-react
import Image from 'next/image';
import React from 'react';

const Header = () => {
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
      </div>
    </header>
  );
};

export default Header;
