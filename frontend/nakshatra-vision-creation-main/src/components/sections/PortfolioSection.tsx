import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { LogoWatermark } from "@/components/ui/LogoWatermark";

interface PortfolioItem {
  image: string;
  title: string;
  category: string;
}

interface PortfolioSectionProps {
  portfolio: PortfolioItem[];
}

export const PortfolioSection = ({ portfolio }: PortfolioSectionProps) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="portfolio" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      <LogoWatermark className="w-[80%] sm:w-[60%] h-auto opacity-[0.02] rotate-12" />

      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/20 to-background"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary mb-4">
            Our <span className="text-gradient-premium">Stunning</span> Portfolio
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our recent projects showcasing excellence in design and execution
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {portfolio.map((item, index) => (
            <div 
              key={index}
              className={`group relative overflow-hidden rounded-lg shadow-medium hover:shadow-glow-accent transition-all duration-500 hover:-translate-y-3 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{ 
                transitionDelay: isVisible ? `${index * 100}ms` : '0ms'
              }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-64 sm:h-72 object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-2"
                />
                {/* Animated Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/30 to-transparent animate-gradient"></div>
                </div>
              </div>
              
              <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="p-6 text-primary-foreground w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-sm font-semibold text-accent mb-1 animate-slide-up">{item.category}</p>
                  <h3 className="text-xl font-heading font-bold animate-slide-up" style={{ animationDelay: "0.1s" }}>{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
