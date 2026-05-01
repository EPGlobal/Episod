'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Footer from '../components/Footer';
import AnimatedNavText from '../components/AnimatedNavText';

function ThanksContent() {
  const params = useSearchParams();
  const sessionId = params.get('session_id');

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-8 text-center">
      <div className="flex flex-col items-center gap-8 max-w-lg">
        <div className="flex flex-col gap-3">
          <div className="text-xs text-black/60 tracking-[0.2em]">ORDER RECEIVED</div>
          {/* <div className="text-3xl lg:text-4xl text-black tracking-wider">
            WELCOME TO EPISOD.
          </div> */}
        </div>

        <div className="w-8 h-px bg-black/20" aria-hidden />

        <div className="text-sm text-black/80 leading-relaxed">
          Your bottle is reserved. A confirmation is on its way to your inbox —
          shipping details and a tracking link will follow closer to dispatch.
        </div>

        <div className="text-xs text-black tracking-[0.2em]">
          ANTICIPATED JUNE 2026
        </div>

        <Link
          href="/"
          className="text-xs text-black border border-black px-10 h-11 flex items-center justify-center hover:bg-black hover:text-white transition-colors tracking-wider"
        >
          RETURN HOME
        </Link>

        {sessionId && (
          <div className="text-[10px] text-black/30 tracking-widest break-all pt-4">
            REF · {sessionId}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ThanksPage() {
  return (
    <div>
      <div className="min-h-screen flex flex-col">
        <div className="w-full flex items-center justify-between p-4 lg:pt-6 px-8 relative z-50">
          <Link href="/" aria-label="Home" className="block shrink-0">
            <Image
              src="/Symbol_Black.svg"
              alt="Episod"
              width={18}
              height={30}
              className="h-8 w-auto"
            />
          </Link>
          <AnimatedNavText />
          <div className="w-[18px] shrink-0" aria-hidden />
        </div>

        <Suspense fallback={<div className="flex-1" />}>
          <ThanksContent />
        </Suspense>
      </div>

      <Footer />
    </div>
  );
}
