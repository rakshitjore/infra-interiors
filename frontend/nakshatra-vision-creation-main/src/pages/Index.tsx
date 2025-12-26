import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { customButtonVariants } from "@/components/ui/button-variants";
import { LogoWatermark } from "@/components/ui/LogoWatermark";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Menu,
  X,
  Sparkles
} from "lucide-react";

import { ServicesSection } from "@/components/sections/ServicesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { SERVICES, PORTFOLIO, WHY_CHOOSE_US } from "@/constants/data";
import { CONTACT_INFO } from "@/utils/constants";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

import heroImage from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";
import logoFooter from "@/assets/logo-footer.png";

const Index = () => {
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "",
    budgetRange: "",
    message: ""
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.email || !formData.projectType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      if (!supabase || !isSupabaseConfigured) {
        throw new Error(
          "Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file."
        );
      }

      // Submit to Supabase instead of Flask API
      const { error } = await supabase
        .from("contacts")
        .insert({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: formData.projectType,
          message:
            formData.message ||
            `Project Type: ${formData.projectType}, Budget Range: ${
              formData.budgetRange || "Not specified"
            }`,
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Thank You!",
        description: "We've received your inquiry and will contact you within 24 hours.",
      });

      setFormData({
        name: "",
        phone: "",
        email: "",
        projectType: "",
        budgetRange: "",
        message: ""
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Failed to submit your inquiry. Please try again or contact us directly.",
        variant: "destructive"
      });
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-soft">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center transition-transform duration-300 hover:scale-105">
              <img 
                src={logo} 
                alt="Nakshatra INFRA & INTERIORS - Vision to Creation" 
                className="h-16 sm:h-24 md:h-28 w-auto object-contain drop-shadow-lg"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection("services")} className="text-sm font-medium text-foreground hover:text-accent transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all after:duration-300 hover:after:w-full">
                Services
              </button>
              <button onClick={() => scrollToSection("portfolio")} className="text-sm font-medium text-foreground hover:text-accent transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all after:duration-300 hover:after:w-full">
                Portfolio
              </button>
              <button onClick={() => scrollToSection("about")} className="text-sm font-medium text-foreground hover:text-accent transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all after:duration-300 hover:after:w-full">
                About
              </button>
              <button onClick={() => scrollToSection("contact")} className={customButtonVariants({ variant: "hero", size: "sm" })}>
                Contact Us
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-accent/10 transition-all duration-300"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-accent" /> : <Menu className="w-6 h-6 text-accent" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-3 animate-fade-in">
              <button onClick={() => scrollToSection("services")} className="block w-full text-left px-4 py-2 text-sm font-medium text-foreground hover:bg-accent/10 hover:text-accent rounded-md transition-all duration-300">
                Services
              </button>
              <button onClick={() => scrollToSection("portfolio")} className="block w-full text-left px-4 py-2 text-sm font-medium text-foreground hover:bg-accent/10 hover:text-accent rounded-md transition-all duration-300">
                Portfolio
              </button>
              <button onClick={() => scrollToSection("about")} className="block w-full text-left px-4 py-2 text-sm font-medium text-foreground hover:bg-accent/10 hover:text-accent rounded-md transition-all duration-300">
                About
              </button>
              <button onClick={() => scrollToSection("contact")} className={customButtonVariants({ variant: "hero", size: "sm" }) + " w-full"}>
                Contact Us
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 overflow-hidden">
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 z-0"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <img 
            src={heroImage} 
            alt="Luxury interior design" 
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50 animate-gradient"></div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-accent/10 rounded-full blur-2xl animate-float-delayed"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-primary-foreground/10 rounded-full blur-xl animate-float"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            <div className="animate-slide-up">
              <div className="inline-block p-4 bg-accent/10 rounded-full mb-6 backdrop-blur-sm">
                <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-accent animate-glow" />
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-primary-foreground leading-tight mb-4">
                Transform Your Space
              </h1>
            </div>
            <p className="text-xl sm:text-2xl md:text-3xl font-heading font-semibold text-gradient-premium animate-slide-up" style={{ animationDelay: "0.2s" }}>
              Vision to Creation
            </p>
            <p className="text-base sm:text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: "0.4s" }}>
              Crafting exceptional interior experiences that blend innovation, elegance, and functionality to bring your dream spaces to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: "0.6s" }}>
              <button 
                onClick={() => scrollToSection("contact")}
                className={customButtonVariants({ variant: "hero", size: "lg" })}
              >
                Get Free Consultation
              </button>
              <button 
                onClick={() => scrollToSection("portfolio")}
                className={customButtonVariants({ variant: "outline", size: "lg" }) + " bg-white/10 backdrop-blur-sm border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"}
              >
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection services={SERVICES} />

      {/* Portfolio Section */}
      <PortfolioSection portfolio={PORTFOLIO} />

      {/* Why Choose Us Section */}
      <WhyChooseUsSection whyChooseUs={WHY_CHOOSE_US} />

      {/* Contact Form Section */}
      <section id="contact" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
        <LogoWatermark className="w-[55%] sm:w-[40%] h-auto opacity-[0.02]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 animate-fade-in">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary mb-4">
                Let's Start Your Project
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground">
                Share your vision with us and we'll bring it to life
              </p>
            </div>

            <Card className="shadow-large border-border animate-fade-in">
              <CardContent className="p-6 sm:p-8 lg:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">
                        Full Name <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-background border-input"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-foreground">
                        Phone Number <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Your Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-background border-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email Address <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-background border-input"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="projectType" className="text-sm font-medium text-foreground">
                      Project Type <span className="text-destructive">*</span>
                    </label>
                    <Select 
                      value={formData.projectType}
                      onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                      required
                    >
                      <SelectTrigger className="bg-background border-input">
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        <SelectItem value="residential">Residential Interiors</SelectItem>
                        <SelectItem value="home-office">Home Office</SelectItem>
                        <SelectItem value="office-space">Office Spaces</SelectItem>
                        <SelectItem value="false-ceiling">False Ceiling</SelectItem>
                        <SelectItem value="modular-kitchen">Modular Kitchen</SelectItem>
                        <SelectItem value="hotel-interiors">Hotel Interiors</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="budgetRange" className="text-sm font-medium text-foreground">
                      Budget Range
                    </label>
                    <Select 
                      value={formData.budgetRange}
                      onValueChange={(value) => setFormData({ ...formData, budgetRange: value })}
                    >
                      <SelectTrigger className="bg-background border-input">
                        <SelectValue placeholder="Select budget range (optional)" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        <SelectItem value="under-5">Under ₹5 Lakhs</SelectItem>
                        <SelectItem value="5-10">₹5 - 10 Lakhs</SelectItem>
                        <SelectItem value="10-20">₹10 - 20 Lakhs</SelectItem>
                        <SelectItem value="20-50">₹20 - 50 Lakhs</SelectItem>
                        <SelectItem value="above-50">Above ₹50 Lakhs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-background border-input min-h-32"
                    />
                  </div>

                  <Button 
                    type="submit"
                    className={customButtonVariants({ variant: "hero", size: "lg" }) + " w-full"}
                  >
                    Submit Inquiry
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-r from-[hsl(42,91%,30%)] via-[hsl(45,90%,40%)] to-[hsl(42,91%,35%)] text-white py-12 sm:py-16 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-8">
            {/* Brand */}
            <div className="space-y-4">
              <img 
                src={logoFooter} 
                alt="Nakshatra INFRA & INTERIORS - Vision to Creation" 
                className="h-40 sm:h-48 w-auto object-contain filter drop-shadow-lg"
              />
              <p className="text-sm text-primary-foreground/70 max-w-xs">
                Transforming spaces with innovative design solutions and unmatched craftsmanship since inception.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="font-heading font-semibold text-lg text-accent mb-4">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 group">
                  <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                  <p className="text-sm text-primary-foreground/80 group-hover:text-primary-foreground transition-colors duration-300">
                    {CONTACT_INFO.address}
                  </p>
                </div>
                <div className="flex items-center space-x-3 group">
                  <Phone className="w-5 h-5 text-accent flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <div className="flex items-center space-x-2">
                    {CONTACT_INFO.phones.map((phone, index) => (
                      <span key={index} className="flex items-center">
                        <a href={`tel:${phone}`} className="text-sm text-primary-foreground/80 hover:text-accent transition-colors duration-300">
                          {phone}
                        </a>
                        {index < CONTACT_INFO.phones.length - 1 }
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-3 group">
                  <Mail className="w-5 h-5 text-accent flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-sm text-primary-foreground/80 hover:text-accent transition-colors duration-300">
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h4 className="font-heading font-semibold text-lg text-accent mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <div 
                  className="w-10 h-10 bg-accent/20 hover:bg-accent rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-glow-accent group cursor-default"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 text-accent group-hover:text-accent-foreground transition-colors duration-300" />
                </div>
                <div 
                  className="w-10 h-10 bg-accent/20 hover:bg-accent rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-glow-accent group cursor-default"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-accent group-hover:text-accent-foreground transition-colors duration-300" />
                </div>
                <div 
                  className="w-10 h-10 bg-accent/20 hover:bg-accent rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-glow-accent group cursor-default"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-accent group-hover:text-accent-foreground transition-colors duration-300" />
                </div>
              </div>
              <p className="text-sm text-primary-foreground/70 mt-4">
                Stay connected for latest projects, design tips, and exclusive offers.
              </p>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 pt-8 text-center">
            <p className="text-sm text-primary-foreground/70">
              © {new Date().getFullYear()} Nakshatra INFRA & INTERIOR. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
