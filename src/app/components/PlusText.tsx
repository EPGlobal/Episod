interface PlusTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function PlusText({ children, className = "" }: PlusTextProps) {
  return (
    <div className={`text-xs ${className} flex`}>
      {/* <span className="pr-5 text-sm leading-3.5">+</span> */}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 mt-0.5 stroke-2 shrink-0 mr-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>

      <p className="uppercase">
        {children}
      </p>
    </div>
  );
}