'use client';

import { useState } from "react";
import Image from "next/image";
import PlusText from "./components/PlusText";
import EmailEntry from "./components/EmailEntry";
import Footer from "./components/Footer";
import ClaimSample from "./components/ClaimSample";
import AnimatedNavText from "./components/AnimatedNavText";

export default function Home() {
  const [showValidationError, setShowValidationError] = useState(false);

  const handleValidationError = () => {
    setShowValidationError(true);
  };

  const handleAnimationComplete = () => {
    setShowValidationError(false);
  };

  return (
    <div>

      {/* Hero */}
      <div className="min-h-[90vh] flex lg:items-center justify-center px-16 pt-24 lg:pt-40 lg:py-24 relative">
        <div className="w-full absolute top-0 left-0 z-50 p-4 flex items-center justify-between lg:flex-col lg:h-[90vh] lg:max-w-96 lg:items-start px-8">
          <Image src="/Symbol_Black.svg" alt="Logo" width={18} height={30} className="h-8 w-auto basis-0 lg:absolute" />
          <div className="hidden lg:flex"></div>
          <AnimatedNavText
            onValidationError={showValidationError}
            onAnimationComplete={handleAnimationComplete}
          />
          <div className="hidden lg:flex"></div>
        </div>
        {/* <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-10">
          <Image src="/logo.png" alt="Logo" width={64} height={64} className="h-12 w-auto" />
        </div> */}
        <div className=" relative">

          <div className="w-full lg:max-w-[65vw] h-[65vh]">
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/video_frame.png"
            >
              <source src="/portrait_low.mp4" type="video/mp4" media="(max-width: 1024px)" />
              <source src="/video_low.mp4" type="video/mp4" media="(min-width: 1025px)" />
              <source src="/hero.mp4" type="video/mp4" />
              Your browser does not support videos {':('}
            </video>
          </div>
        </div>

        <EmailEntry onValidationError={handleValidationError} />

      </div>
        <div className="absolute inset-0 pointer-events-none h-[90vh]">
          <div className="absolute inset-0 flex lg:items-center justify-center z-20">
            <div className='grid lg:grid-cols-2'>
              <div></div>
              <div className="lg:pr-0 lg:pl-0 px-8 pb-16 lg:pb-0 flex flex-col items-center justify-end">
                <form className="flex items-center gap-4 pb-8 lg:pb-0">
                  <div className="lg:h-4 overflow-visible pointer-events-auto max-w-[414px]">
                    <PlusText>
                      ROOTED IN THE RAW WITH RARE INGREDIENTS, MADE TO AWAKEN EVERY SENSE AND DISRUPT ALL FREQUENCIES. CREATED FOR THOSE WHO MOVE THROUGH THE WORLD WITH INSTINCT.
                    </PlusText>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      <ClaimSample />

      <Footer />

    </div>
  );
}
