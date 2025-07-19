'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Country, State } from 'country-state-city';

export default function ClaimSample() {
  const [formData, setFormData] = useState({
    name: '',
    country: 'UNITED STATES',
    state: 'NEW YORK',
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

  const handleCountryChange = (country: string) => {
    setFormData(prev => ({
      ...prev,
      country,
      state: ''
    }));
  };

  const handleStateChange = (state: string) => {
    setFormData(prev => ({
      ...prev,
      state
    }));
  };

  const getCountryCode = (countryName: string): string | null => {
    const country = Country.getAllCountries().find(c => c.name.toUpperCase() === countryName);
    return country ? country.isoCode : null;
  };

  const getCountryPhoneCode = (countryName: string): string => {
    const country = Country.getAllCountries().find(c => c.name.toUpperCase() === countryName);
    return country ? `+${country.phonecode}` : '+1';
  };

  const hasStates = () => {
    const countryCode = getCountryCode(formData.country);
    if (!countryCode) return false;
    const states = State.getStatesOfCountry(countryCode);
    return states && states.length > 0;
  };

  const getStates = () => {
    const countryCode = getCountryCode(formData.country);
    if (!countryCode) return [];
    return State.getStatesOfCountry(countryCode).map(state => state.name.toUpperCase());
  };

  const getAllCountries = () => {
    return Country.getAllCountries().map(country => ({
      code: country.isoCode,
      name: country.name.toUpperCase()
    })).sort((a, b) => a.name.localeCompare(b.name));
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

  useEffect(() => {
    // prefill email
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      setFormData(prev => ({
        ...prev,
        email: userEmail
      }));
    }

  }, []);

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
    <div className="">
      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Left side - Images */}
        <div className="flex flex-col w-full">
          {/* First image with form to the right */}
          <div className="flex w-full">
            <div className='relative w-full'>
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
          </div>

          {/* Second image with whitespace */}
          <div className='relative w-full'>
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
          <div className='relative w-full'>
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
        <div className='w-[53%] shrink-0 h-screen flex items-center sticky top-0'>
          <div className="p-8 lg:p-16 flex flex-col gap-8 overflow-hidden">
            <form onSubmit={handleSubmit} className="flex gap-12 w-full max-w-4xl">
              {/* Left column - Title */}
              <div className="flex flex-col">
                <div className="text-base text-black">CLAIM YOUR COMPLIMENTARY SAMPLE</div>
                <div className="text-xs text-black mt-2">LIMITED AVAILABILITY</div>
              </div>
              {/* Middle column - Labels */}
              <div className="flex flex-col space-y-6">
                <div className="text-xs text-black h-5 flex items-center">NAME</div>
                <div className="text-xs text-black h-5 flex items-center">COUNTRY</div>
                {hasStates() && <div className="text-xs text-black h-5 flex items-center">STATE</div>}
                <div className="text-xs text-black h-5 flex items-center">PHONE</div>
                <div className="text-xs text-black h-5 flex items-center">STREET</div>
                <div className="text-xs text-black h-5 flex items-center">POSTAL/ZIP</div>
                <div className="text-xs text-black h-5 flex items-center">CITY</div>
                <button
                  type="submit"
                  className={`text-xs text-black bg-transparent border-none cursor-pointer px-0 text-left mt-6 ${isLoading ? 'opacity-50' : ''
                    }`}
                  disabled={isLoading}
                >
                  {isLoading ? 'SUBMITTING...' : 'SUBMIT'}
                </button>
              </div>
              {/* Right column - Inputs */}
              <div className="flex flex-col space-y-6">
                <input
                  type="text"
                  placeholder="FULL NAME"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-transparent text-black placeholder-black/60 focus:outline-none focus:ring-0 border-none text-xs h-5"
                  spellCheck={false}
                  required
                />
                <div className='flex'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 mt-1 stroke-2 shrink-0 mr-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  <select
                    value={formData.country}
                    onChange={(e) => handleCountryChange(e.target.value)}
                    className="bg-transparent text-black focus:outline-none focus:ring-0 border-none text-xs h-5 cursor-pointer max-w-32 appearance-none"
                    required
                  >
                    {getAllCountries().map((country) => (
                      <option key={country.code} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                {hasStates() && (
                  <div className='flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 mt-1 stroke-2 shrink-0 mr-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <select
                      value={formData.state}
                      onChange={(e) => handleStateChange(e.target.value)}
                      className="bg-transparent text-black focus:outline-none focus:ring-0 border-none text-xs h-5 cursor-pointer max-w-32 appearance-none"
                      required
                    >
                      <option value="">SELECT STATE</option>
                      {getStates().map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="flex items-center h-5">
                  <span className="text-xs text-black mr-2">{getCountryPhoneCode(formData.country)}</span>
                  <input
                    type="tel"
                    placeholder="PHONE NUMBER"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="bg-transparent text-black placeholder-black/60 focus:outline-none focus:ring-0 border-none text-xs flex-1"
                    spellCheck={false}
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="STREET NAME & NUMBER"
                  value={formData.street}
                  onChange={(e) => handleInputChange('street', e.target.value)}
                  className="bg-transparent text-black placeholder-black/60 focus:outline-none focus:ring-0 border-none text-xs h-5"
                  spellCheck={false}
                  required
                />
                <input
                  type="text"
                  placeholder="POSTAL CODE"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  className="bg-transparent text-black placeholder-black/60 focus:outline-none focus:ring-0 border-none text-xs h-5"
                  spellCheck={false}
                  required
                />
                <input
                  type="text"
                  placeholder="CITY NAME"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="bg-transparent text-black placeholder-black/60 focus:outline-none focus:ring-0 border-none text-xs h-5"
                  spellCheck={false}
                  required
                />
              </div>
            </form>
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
          <form onSubmit={handleSubmit} className="flex gap-12 w-full max-w-4xl">
            {/* Middle column - Labels */}
            <div className="flex flex-col space-y-6">
              <div className="text-xs text-black h-5 flex items-center">NAME</div>
              <div className="text-xs text-black h-5 flex items-center">COUNTRY</div>
              {hasStates() && <div className="text-xs text-black h-5 flex items-center">STATE</div>}
              <div className="text-xs text-black h-5 flex items-center">PHONE</div>
              <div className="text-xs text-black h-5 flex items-center">STREET</div>
              <div className="text-xs text-black h-5 flex items-center">POSTAL/ZIP</div>
              <div className="text-xs text-black h-5 flex items-center">CITY</div>
              <button
                type="submit"
                className={`text-xs text-black bg-transparent border-none cursor-pointer px-0 text-left mt-6 ${isLoading ? 'opacity-50' : ''
                  }`}
                disabled={isLoading}
              >
                {isLoading ? 'SUBMITTING...' : 'SUBMIT'}
              </button>
            </div>

            {/* Right column - Inputs */}
            <div className="flex flex-col space-y-6">
              <input
                type="text"
                placeholder="FULL NAME"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="bg-transparent text-black placeholder-black/60 focus:outline-none focus:ring-0 border-none text-xs h-5"
                spellCheck={false}
                required
              />
              <div className='flex'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 mt-1 stroke-2 shrink-0 mr-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <select
                  value={formData.country}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  className="bg-transparent text-black focus:outline-none focus:ring-0 border-none text-xs h-5 cursor-pointer max-w-32 appearance-none"
                  required
                >
                  {getAllCountries().map((country) => (
                    <option key={country.code} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              {hasStates() && (
                <div className='flex'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 mt-1 stroke-2 shrink-0 mr-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  <select
                    value={formData.state}
                    onChange={(e) => handleStateChange(e.target.value)}
                    className="bg-transparent text-black focus:outline-none focus:ring-0 border-none text-xs h-5 cursor-pointer max-w-32 appearance-none"
                    required
                  >
                    <option value="">SELECT STATE</option>
                    {getStates().map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex items-center h-5">
                <span className="text-xs text-black mr-2">{getCountryPhoneCode(formData.country)}</span>
                <input
                  type="tel"
                  placeholder="PHONE NUMBER"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="bg-transparent text-black placeholder-black/60 focus:outline-none focus:ring-0 border-none text-xs flex-1"
                  spellCheck={false}
                  required
                />
              </div>

              <input
                type="text"
                placeholder="STREET NAME & NUMBER"
                value={formData.street}
                onChange={(e) => handleInputChange('street', e.target.value)}
                className="bg-transparent text-black placeholder-black/60 focus:outline-none focus:ring-0 border-none text-xs h-5"
                spellCheck={false}
                required
              />

              <input
                type="text"
                placeholder="POSTAL CODE"
                value={formData.postalCode}
                onChange={(e) => handleInputChange('postalCode', e.target.value)}
                className="bg-transparent text-black placeholder-black/60 focus:outline-none focus:ring-0 border-none text-xs h-5"
                spellCheck={false}
                required
              />

              <input
                type="text"
                placeholder="CITY NAME"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="bg-transparent text-black placeholder-black/60 focus:outline-none focus:ring-0 border-none text-xs h-5"
                spellCheck={false}
                required
              />

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}