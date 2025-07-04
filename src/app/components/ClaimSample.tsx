'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ClaimSample() {
  const [formData, setFormData] = useState({
    name: '',
    country: 'THE U.S.',
    state: 'NEW YORK STATE',
    phone: '',
    street: '',
    postalCode: '',
    city: '',
    email: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Submit to Klaviyo
      const response = await fetch('/api/klaviyo/claim-sample', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        console.log('Sample claim submitted successfully');
      } else {
        console.error('Failed to submit sample claim');
      }
    } catch (error) {
      console.error('Error submitting sample claim:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl text-black mb-4">THANK YOU</div>
          <div className="text-xs text-black">Your sample claim has been submitted successfully.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Left side - Images */}
        <div className="flex flex-col w-full">
          {/* First image with form to the right */}
          <div className="relative flex w-full">
            <div className='relative w-2/5'>
              <div className="relative bg-gray-100 w-full   pt-[133%]">
                <Image
                  src="/1.jpg"
                  alt="Product Sample 1"
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
              </div>
            </div>
            {/* Form next to first image */}
            <div className="w-3/5 p-8 lg:p-16 flex flex-col gap-8">
              <div className="flex gap-12 w-full max-w-4xl">
                {/* Left column - Title */}
                <div className="flex flex-col">
                  <div className="text-base text-black">CLAIM YOUR COMPLIMENTARY SAMPLE</div>
                  <div className="text-xs text-black mt-2">LIMITED AVAILABILITY</div>
                </div>

                {/* Middle column - Labels */}
                <div className="flex flex-col space-y-6">
                  <div className="text-xs text-black">NAME</div>
                  <div className="text-xs text-black">EMAIL</div>
                  <div className="text-xs text-black">COUNTRY</div>
                  <div className="text-xs text-black">PHONE</div>
                  <div className="text-xs text-black">STREET</div>
                  <div className="text-xs text-black">POSTAL/ZIP</div>
                  <div className="text-xs text-black">CITY</div>
                  <button
                    type="submit"
                    className={`text-xs text-black bg-transparent border-none cursor-pointer px-0 text-left ${
                      isLoading ? 'opacity-50' : ''
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? 'SUBMITTING...' : 'SUBMIT'}
                  </button>
                </div>

                {/* Right column - Inputs */}
                <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                  <input
                    type="text"
                    placeholder="FULL NAME"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-transparent text-black placeholder-black/60 focus:outline-none focus:ring-0 border-none text-xs "
                    spellCheck={false}
                    required
                  />

                  <input
                    type="email"
                    placeholder="EMAIL ADDRESS"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-transparent text-black placeholder-black/60 focus:outline-none focus:ring-0 border-none text-xs "
                    spellCheck={false}
                    required
                  />

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      className="text-xs  text-black bg-transparent border-none cursor-pointer"
                      onClick={() => handleInputChange('country', 'THE U.S.')}
                    >
                      + THE U.S.
                    </button>
                    <button
                      type="button"
                      className="text-xs  text-black bg-transparent border-none cursor-pointer"
                      onClick={() => handleInputChange('state', 'NEW YORK STATE')}
                    >
                      + NEW YORK STATE
                    </button>
                  </div>

                  <input
                    type="tel"
                    placeholder="+1 PHONE NUMBER"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="bg-transparent text-black placeholder-black/60 focus:outline-none focus:ring-0 border-none text-xs "
                    spellCheck={false}
                    required
                  />

                  <input
                    type="text"
                    placeholder="STREET NAME & NUMBER"
                    value={formData.street}
                    onChange={(e) => handleInputChange('street', e.target.value)}
                    className="bg-transparent text-black placeholder-black/60 focus:outline-none focus:ring-0 border-none text-xs "
                    spellCheck={false}
                    required
                  />

                  <input
                    type="text"
                    placeholder="POSTAL CODE"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    className="bg-transparent text-black placeholder-black/60 focus:outline-none focus:ring-0 border-none text-xs "
                    spellCheck={false}
                    required
                  />

                  <input
                    type="text"
                    placeholder="CITY NAME"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="bg-transparent text-black placeholder-black/60 focus:outline-none focus:ring-0 border-none text-xs "
                    spellCheck={false}
                    required
                  />
                </form>
              </div>
            </div>
          </div>

          {/* Second image with whitespace */}
          <div className='relative w-2/5'>
            <div className="relative bg-gray-100 w-full pt-[133%]">
              <Image
                src="/2.jpg"
                alt="Product Sample 2"
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </div>
          </div>

          {/* Third image with whitespace */}
          <div className='relative w-2/5'>
            <div className="relative bg-gray-100 w-full   pt-[133%]">
              <Image
                src="/3.jpg"
                alt="Product Sample 3"
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex flex-col lg:hidden">
        {/* Three stacked images full width */}
        <div className="relative bg-gray-100 w-full   pt-[133%]">
          <Image
            src="/1.jpg"
            alt="Product Sample 1"
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        </div>

        <div className="relative bg-gray-100 w-full   pt-[133%]">
          <Image
            src="/2.jpg"
            alt="Product Sample 2"
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        </div>

        <div className="relative bg-gray-100 w-full   pt-[133%]">
          <Image
            src="/3.jpg"
            alt="Product Sample 3"
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        </div>

        {/* Form below all images on mobile */}
        <div className="p-8 flex flex-col gap-8">
          <div className="flex flex-col">
            <div className="text-base text-black">CLAIM YOUR COMPLIMENTARY SAMPLE</div>
            <div className="text-xs text-black">LIMITED AVAILABILITY</div>
          </div>
          <div className="flex gap-12 w-full max-w-4xl">
            {/* Middle column - Labels */}
            <div className="flex flex-col space-y-6">
              <div className="text-xs text-black">NAME</div>
              <div className="text-xs text-black">EMAIL</div>
              <div className="text-xs text-black">COUNTRY</div>
              <div className="text-xs text-black">PHONE</div>
              <div className="text-xs text-black">STREET</div>
              <div className="text-xs text-black">POSTAL/ZIP</div>
              <div className="text-xs text-black">CITY</div>
              <button
                type="submit"
                className={`text-xs text-black bg-transparent border-none cursor-pointer px-0 text-left mt-3 ${
                  isLoading ? 'opacity-50' : ''
                }`}
                disabled={isLoading}
              >
                {isLoading ? 'SUBMITTING...' : 'SUBMIT'}
              </button>
            </div>

            {/* Right column - Inputs */}
            <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
              <input
                type="text"
                placeholder="FULL NAME"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="bg-transparent text-black placeholder-black/60 focus:outline-none focus:ring-0 border-none text-xs "
                spellCheck={false}
                required
              />

              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="bg-transparent text-black placeholder-black/60 focus:outline-none focus:ring-0 border-none text-xs "
                spellCheck={false}
                required
              />

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="text-xs  text-black bg-transparent border-none cursor-pointer"
                  onClick={() => handleInputChange('country', 'THE U.S.')}
                >
                  + THE U.S.
                </button>
                <button
                  type="button"
                  className="text-xs  text-black bg-transparent border-none cursor-pointer"
                  onClick={() => handleInputChange('state', 'NEW YORK STATE')}
                >
                  + NEW YORK STATE
                </button>
              </div>

              <input
                type="tel"
                placeholder="+1 PHONE NUMBER"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="bg-transparent text-black placeholder-black/60 focus:outline-none focus:ring-0 border-none text-xs "
                spellCheck={false}
                required
              />

              <input
                type="text"
                placeholder="STREET NAME & NUMBER"
                value={formData.street}
                onChange={(e) => handleInputChange('street', e.target.value)}
                className="bg-transparent text-black placeholder-black/60 focus:outline-none focus:ring-0 border-none text-xs "
                spellCheck={false}
                required
              />

              <input
                type="text"
                placeholder="POSTAL CODE"
                value={formData.postalCode}
                onChange={(e) => handleInputChange('postalCode', e.target.value)}
                className="bg-transparent text-black placeholder-black/60 focus:outline-none focus:ring-0 border-none text-xs "
                spellCheck={false}
                required
              />

              <input
                type="text"
                placeholder="CITY NAME"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="bg-transparent text-black placeholder-black/60 focus:outline-none focus:ring-0 border-none text-xs "
                spellCheck={false}
                required
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}