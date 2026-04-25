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
          spaceBetween={2}
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="relative bg-gray-100 w-full pt-[133%]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop: 3 images side by side */}
      <div className="hidden lg:flex gap-0.5 mb-2">
        {baseImages.map((img, i) => (
          <div key={i} className="relative bg-gray-100 flex-1">
            <div className="relative w-full pt-[133%]">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
