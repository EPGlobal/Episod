'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function PreorderCTA() {
  const [gateCleared, setGateCleared] = useState(false);
  const [visible, setVisible] = useState(true);

  // Only render after the homepage email gate has been cleared, so the CTA
  // doesn't poke through the EmailEntry blur backdrop.
  useEffect(() => {
    const check = () => {
      if (localStorage.getItem('emailSubmitted')) {
        setGateCleared(true);
        return true;
      }
      return false;
    };
    if (check()) return;
    const id = setInterval(() => {
      if (check()) clearInterval(id);
    }, 500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!gateCleared) return;
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      if (y < 80) setVisible(true);
      else if (delta > 6) setVisible(false);
      else if (delta < -6) setVisible(true);
      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [gateCleared]);

  if (!gateCleared) return null;

  return (
    <div className="fixed left-1/2 bottom-6 z-40 -translate-x-1/2 pointer-events-none">
      <div
        className={`transition-[opacity,translate] duration-500 ease-out ${
          visible
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-8'
        }`}
      >
        <Link
          href="/preorder"
          className="flex items-center gap-3 bg-white text-black border border-black text-xs h-12 px-6 tracking-wider hover:bg-black hover:text-white transition-colors whitespace-nowrap"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-3 h-3 stroke-2 shrink-0"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>PREORDER — SHIPS JUNE 2026</span>
        </Link>
      </div>
    </div>
  );
}
