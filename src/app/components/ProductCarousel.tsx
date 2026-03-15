'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const baseImages = [
  { src: '/swiper/Episod_Original_852Hz_Front.webp', alt: '852 Hz' },
  { src: '/swiper/Episod_Original_NoSingal_Front.webp', alt: 'No Signal' },
  { src: '/swiper/Episod_Original_SourceCode_Front.webp', alt: 'Source Code' },
];

// Duplicate so Swiper loop mode has enough slides to work smoothly
const images = [...baseImages, ...baseImages];

const blurDataURL =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';

export default function ProductCarousel() {
  return (
    <div>
      {/* Mobile: swipeable infinite carousel */}
      <div className="lg:hidden mb-2">
        <Swiper
          loop
          loopAdditionalSlides={3}
          slidesPerView={1.3}
          centeredSlides
          spaceBetween={8}
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="relative bg-gray-100 w-full pt-[133%]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop: 3 images side by side */}
      <div className="hidden lg:flex gap-2 mb-2">
        {baseImages.map((img, i) => (
          <div key={i} className="relative bg-gray-100 flex-1">
            <div className="relative w-full pt-[133%]">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL={blurDataURL}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
