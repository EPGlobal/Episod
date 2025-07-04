'use client';

import { useState, useEffect } from 'react';

interface EmailEntryProps {
  onValidationError: () => void;
}

export default function EmailEntry({ onValidationError }: EmailEntryProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if email was already submitted
    const emailSubmitted = localStorage.getItem('emailSubmitted');
    if (emailSubmitted) {
      setIsSubmitted(true);
    }

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
      <div className="absolute inset-0 flex lg:items-center justify-center z-20">
        <div className='grid lg:grid-cols-2'>
          <div></div>
          <div className="lg:pr-0 lg:pl-0 px-8 pb-16 lg:pb-0 flex flex-col items-center justify-end">
            <form onSubmit={handleSubmit} className="flex items-center gap-4 pb-4 lg:pb-0">
              <div className="text-xs text-black/90">
                <span className="pr-6">+</span>
              </div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ENTER WITH EMAIL"
                className="bg-transparent text-black placeholder-black/60 focus:outline-none focus:ring-0 border-none text-xs min-w-[200px]"
                autoFocus
                spellCheck={false}
              />
              <button
                type="submit"
                className={`text-xs transition-colors bg-transparent border-none cursor-pointer ${
                  email.length > 0 && !isLoading
                    ? 'text-black/90 hover:text-black' 
                    : 'text-black/60'
                }`}
                disabled={email.length === 0 || isLoading}
              >
                {isLoading ? 'ENTERING...' : 'ENTER'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}