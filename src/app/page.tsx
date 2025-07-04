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
      <div className="min-h-[90vh] flex lg:items-center justify-center px-16 pt-24 lg:py-24 relative">
        <div className="w-full absolute top-0 left-0 z-50 p-4 flex items-center justify-between lg:flex-col lg:h-screen lg:max-w-96 lg:items-start">
          <Image src="/logo.png" alt="Logo" width={64} height={64} className="h-12 w-auto basis-0 lg:absolute" />
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
              poster="/logo-large.png"
            >
              <source src="/portrait_low.mp4" type="video/mp4" media="(max-width: 1024px)" />
              <source src="/video_low.mp4" type="video/mp4" media="(min-width: 1025px)" />
              <source src="/hero.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="py-8 lg:absolute lg:top-0 lg:right-20 flex items-center justify-center lg:h-3/4 lg:w-1/2">
            <PlusText>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, quaerat velit nesciunt voluptate possimus, consectetur adipisicing elit.
            </PlusText>
          </div>
        </div>


        <EmailEntry onValidationError={handleValidationError} />

      </div>

      <ClaimSample />

      <Footer />

    </div>
  );
}
