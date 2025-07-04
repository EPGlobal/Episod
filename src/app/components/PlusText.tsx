interface PlusTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function PlusText({ children, className = "" }: PlusTextProps) {
  return (
    <div className={`text-xs ${className} flex`}>
      <span className="pr-6">+</span>
      <p className="uppercase">
        {children}
      </p>
    </div>
  );
}