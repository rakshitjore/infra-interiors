import { Card, CardContent } from "@/components/ui/card";
import { LogoWatermark } from "@/components/ui/LogoWatermark";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { LucideIcon } from "lucide-react";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ServicesSectionProps {
  services: Service[];
}

export const ServicesSection = ({ services }: ServicesSectionProps) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-secondary/50 via-background to-secondary/30 relative overflow-hidden">
      <LogoWatermark className="w-[70%] sm:w-[50%] h-auto opacity-[0.03] scale-125" />

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary mb-4">
            Our <span className="text-gradient-premium">Premium</span> Services
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive interior design solutions tailored to your unique vision and requirements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className={`group hover:shadow-glow-accent transition-all duration-500 hover:scale-105 hover:-translate-y-2 border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden relative h-full flex flex-col ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: isVisible ? `${index * 100}ms` : '0ms'
              }}
            >
              <CardContent className="p-6 sm:p-8 text-center space-y-4 relative flex-1 flex flex-col justify-center min-h-[280px]">
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/0 group-hover:from-accent/10 group-hover:via-accent/20 group-hover:to-accent/10 rounded-lg transition-all duration-500"></div>
                
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full group-hover:from-accent/30 group-hover:to-accent/20 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 relative z-10 shadow-soft group-hover:shadow-glow-accent">
                  <service.icon className="w-8 h-8 sm:w-10 sm:h-10 text-accent group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-semibold text-card-foreground relative z-10 group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground relative z-10 group-hover:text-foreground transition-colors duration-300">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
