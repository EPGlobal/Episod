'use client';

import { useState, useEffect } from 'react';

interface EmailEntryProps {
  onValidationError: () => void;
}

export default function EmailEntry({ onValidationError }: EmailEntryProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    // Check if email was already submitted
    const emailSubmitted = localStorage.getItem('emailSubmitted');
    if (emailSubmitted) {
      setIsSubmitted(true);
    }

    // Set initial focus state based on screen size (desktop is autofocused)
    const isDesktop = window.innerWidth >= 1024;
    setIsFocused(isDesktop);

    if (!isSubmitted) {
      // Prevent scrolling until email is submitted
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling after email submission
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isSubmitted]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      onValidationError();
      return;
    }

    setIsLoading(true);

    localStorage.setItem('userEmail', email);

    try {
      // Submit to Klaviyo
      const response = await fetch('/api/klaviyo/email-entry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Save to localStorage
        localStorage.setItem('emailSubmitted', 'true');
        localStorage.setItem('userEmail', email);
        setIsSubmitted(true);
      } else {
        console.error('Failed to submit email');
      }
    } catch (error) {
      console.error('Error submitting email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return null;
  }

  return (
    <div className="fixed inset-0 backdrop-blur-xl z-40 bg-white/20">
      <div className='h-[90vh] inset-0 fixed'>
        <div className="absolute inset-0 flex lg:items-center justify-center z-20">
          <div className='grid lg:grid-cols-2 lg:-ml-32'>
            <div></div>
            <div className="lg:pr-0 lg:pl-0 px-8 pb-8 lg:pb-0 flex flex-col items-center justify-end">
              <form onSubmit={handleSubmit} className="flex items-start justify-start gap-4 pb-4 lg:pb-0">
                <div className='flex w-screen px-12 lg:w-auto lg:px-0'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 mt-0.5 stroke-2 shrink-0 mr-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  {/* Mobile input - no autofocus */}
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="ENTER WITH EMAIL"
                    className="bg-transparent min-w-0 w-full text-black placeholder-black focus:placeholder-black/29 focus:outline-none focus:ring-0 border-none text-xs lg:hidden"
                    spellCheck={false}
                  />
                  {/* Desktop input - autofocused */}
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="ENTER WITH EMAIL"
                    className="bg-transparent min-w-0 w-full text-black placeholder-black focus:placeholder-black/29 focus:outline-none focus:ring-0 border-none text-xs hidden lg:block"
                    autoFocus
                    spellCheck={false}
                  />
                  <button
                    type="submit"
                    className={`text-xs transition-colors bg-transparent border-none cursor-pointer ${
                      email.length === 0 && !isFocused ?
                        'hidden'
                        :
                        email.length > 0 && !isLoading
                          ? 'text-black/90 hover:text-black'
                          : 'text-black/60'
                      }`}
                    disabled={email.length === 0 || isLoading}
                  >
                    {isLoading ? 'ENTERING...' : 'ENTER'}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}