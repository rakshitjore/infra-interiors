import logo from "@/assets/logo.png";

interface LogoWatermarkProps {
  className?: string;
}

export const LogoWatermark = ({ className = "w-[60%] sm:w-[45%] h-auto opacity-[0.03]" }: LogoWatermarkProps) => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
    <img 
      src={logo} 
      alt="" 
      className={className}
    />
  </div>
);

