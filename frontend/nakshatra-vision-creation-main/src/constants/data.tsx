import { 
  Home, 
  Briefcase, 
  Building2, 
  Lightbulb, 
  ChefHat,
  Hotel,
  CheckCircle2
} from "lucide-react";
import { LucideIcon } from "lucide-react";

import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpeg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";
import portfolio1a from "@/assets/portfolio-1a.jpg";
import portfolio3a from "@/assets/portfolio-3a.jpg";
import heroBg2 from "@/assets/hero-bg2.jpg";

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  backgroundImage?: string;
}

export interface  PortfolioItem {
  image: string;
  title: string;
  category: string;
}

export interface WhyChooseUsItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const SERVICES: Service[] = [
  {
    icon: Home,
    title: "Residential Interiors",
    description: "Transform your home into a personalized sanctuary with our bespoke residential interior design services.",
    backgroundImage: portfolio1a
  },
  {
    icon: Briefcase,
    title: "Home Office",
    description: "Create the perfect work-from-home environment that boosts productivity and comfort.",
    backgroundImage: portfolio2
  },
  {
    icon: Building2,
    title: "Office Spaces",
    description: "Professional commercial interior solutions that enhance workplace efficiency and aesthetics.",
    backgroundImage: portfolio3a
  },
  {
    icon: Lightbulb,
    title: "False Ceiling",
    description: "Innovative ceiling designs that add elegance and functionality to your spaces.",
    backgroundImage: portfolio4
  },
  {
    icon: ChefHat,
    title: "Modular Kitchen",
    description: "Smart, stylish kitchen solutions that combine functionality with contemporary design.",
    backgroundImage: portfolio5
  },
  {
    icon: Hotel,
    title: "Hotel Interiors",
    description: "Luxurious hospitality spaces that create memorable guest experiences and maximize comfort.",
    backgroundImage: heroBg2
  }
];

export const PORTFOLIO: PortfolioItem[] = [
  { image: portfolio1, title: "Luxury Living Room", category: "Residential" },
  { image: portfolio2, title: "Modern Home Office", category: "Home Office" },
  { image: portfolio3, title: "Hotel Decor", category: "Commercial" },
  { image: portfolio4, title: "Designer Ceiling", category: "False Ceiling" },
  { image: portfolio5, title: "Contemporary Kitchen", category: "Modular Kitchen" },
  { image: portfolio6, title: "Master Bedroom Suite", category: "Residential" }
];

export const WHY_CHOOSE_US: WhyChooseUsItem[] = [
  {
    icon: CheckCircle2,
    title: "Premium Quality Materials",
    description: "We use only the finest materials to ensure durability and aesthetic excellence."
  },
  {
    icon: CheckCircle2,
    title: "Experienced Design Team",
    description: "Our skilled professionals bring years of expertise to every project."
  },
  {
    icon: CheckCircle2,
    title: "On-Time Delivery",
    description: "We respect your time and consistently deliver projects within agreed timelines."
  },
  {
    icon: CheckCircle2,
    title: "Transparent Pricing",
    description: "No hidden costs - clear, competitive pricing from start to finish."
  }
];

