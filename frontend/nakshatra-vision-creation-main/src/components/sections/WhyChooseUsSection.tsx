import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { LogoWatermark } from "@/components/ui/LogoWatermark";
import { LucideIcon } from "lucide-react";

interface WhyChooseUsItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface WhyChooseUsSectionProps {
  whyChooseUs: WhyChooseUsItem[];
}

export const WhyChooseUsSection = ({ whyChooseUs }: WhyChooseUsSectionProps) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-secondary/40 via-background to-secondary/30 relative overflow-hidden">
      <LogoWatermark className="w-[60%] sm:w-[45%] h-auto opacity-[0.03] -rotate-6" />

      {/* Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-accent/5 via-transparent to-primary/5 animate-gradient"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary mb-4">
            Why Choose <span className="text-gradient-premium">Nakshatra</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Your trusted partner for exceptional interior design solutions
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {whyChooseUs.map((item, index) => (
            <div 
              key={index}
              className={`group text-center space-y-4 transition-all duration-700 hover:scale-105 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: isVisible ? `${index * 150}ms` : '0ms'
              }}
            >
              <div className="relative inline-block">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full transition-all duration-500 group-hover:from-accent/30 group-hover:to-accent/20 group-hover:scale-110 group-hover:rotate-12 animate-float shadow-soft group-hover:shadow-glow-accent" style={{ animationDelay: `${index * 0.5}s` }}>
                  <item.icon className="w-8 h-8 text-accent transition-transform duration-300 group-hover:scale-110" />
                </div>
                {/* Pulsing ring effect */}
                <div className="absolute inset-0 rounded-full bg-accent/20 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700"></div>
              </div>
              <h3 className="text-lg sm:text-xl font-heading font-semibold text-foreground transition-colors duration-300 group-hover:text-accent">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
