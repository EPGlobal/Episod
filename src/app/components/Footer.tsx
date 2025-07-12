import Image from "next/image";

export default function Footer() {
  return (
    <footer className="p-8 pt-36 lg:pt-8">
      <div className="flex flex-col lg:flex-row lg:items-start">
        {/* Logo */}
        <div className="w-full lg:w-1/2 mb-5 lg:mb-0">
          <Image 
            src="/episod_logo_large.svg" 
            alt="EPISOD" 
            width={300} 
            height={100} 
            className="h-auto w-full"
          />
        </div>

        {/* Navigation Links */}
        <div className="w-full lg:w-1/2 lg:pl-8">
          <div className="flex flex-col lg:flex-row lg:gap-8">
            {/* First Column on Desktop / Mobile Order */}
            <div className="flex justify-between lg:gap-12 lg:justify-center flex-1">
              <p className="text-black text-[10px]  hover:opacity-70 transition-opacity">
                2025
              </p>
              <a href="https://www.instagram.com/episod.global/" target="_blank" rel="noreferrer" className="text-black text-[10px]  hover:opacity-70 transition-opacity">
                INSTAGRAM
              </a>
              <a href="mailto:info@episod.global" className="text-black text-[10px]  hover:opacity-70 transition-opacity">
                CONTACT
              </a>
            </div>

            {/* Second Column on Desktop / Mobile Order */}
            <div className="flex lg:flex-col justify-between lg:items-end mt-4 lg:mt-0">
              <span className="text-black text-[10px]">
                COPYRIGHT 2025 EP. GLOBAL AB
              </span>
              <span className="text-black text-[8px]">
                ACENGY NINETIES
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}