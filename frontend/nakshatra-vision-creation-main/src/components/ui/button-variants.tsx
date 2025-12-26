import { cva } from "class-variance-authority";

export const customButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        hero: "bg-gradient-to-r from-accent via-yellow-400 to-accent bg-[length:200%_100%] text-accent-foreground hover:bg-[length:100%_100%] shadow-medium hover:shadow-glow-accent hover:scale-105 font-bold animate-shimmer",
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft hover:shadow-medium hover:scale-105",
        outline: "border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground hover:shadow-glow-accent",
        premium: "bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] text-primary-foreground shadow-medium hover:shadow-glow-primary hover:scale-105 animate-shimmer",
      },
      size: {
        default: "h-11 px-8 py-3",
        lg: "h-12 px-10 py-4 text-base",
        sm: "h-9 px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);
