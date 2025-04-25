import SectionContainer from "@/components/ui/section-container";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  imageUrl: string;
}

const ProjectCard = ({ title, category, description, imageUrl }: ProjectCardProps) => (
  <div className="group overflow-hidden rounded-lg shadow-lg bg-white hover:shadow-xl transition duration-300">
    <div className="relative h-64 overflow-hidden">
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-full object-cover object-center transform group-hover:scale-105 transition duration-500" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
        <div className="absolute bottom-0 left-0 p-6">
          <h3 className="text-white font-inter font-bold text-xl mb-1">{title}</h3>
          <p className="text-gray-200">{category}</p>
        </div>
      </div>
    </div>
    <CardContent className="p-6">
      <p className="text-gray-600 mb-4">{description}</p>
      <a href="#" className="text-primary font-medium hover:underline inline-flex items-center">
        View Project <ArrowRight className="ml-2 h-4 w-4" />
      </a>
    </CardContent>
  </div>
);

const projects: ProjectCardProps[] = [
  {
    title: "Luxury Home Renovation",
    category: "Residential",
    description: "Complete renovation of a 4,500 sq ft luxury home in Bellevue, including kitchen, bathrooms, and outdoor living space.",
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Downtown Office Building",
    category: "Commercial",
    description: "Six-story office building with modern amenities, collaborative spaces, and energy-efficient design elements.",
    imageUrl: "https://images.unsplash.com/photo-1464082354059-27db6ce50048?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Modern Lakefront Home",
    category: "Residential",
    description: "Custom-built 3,800 sq ft contemporary home with extensive glazing, open floor plan, and sustainable features.",
    imageUrl: "https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Retail Complex",
    category: "Commercial",
    description: "Multi-tenant retail complex with 12 storefronts, shared parking, and distinctive architectural elements.",
    imageUrl: "https://images.unsplash.com/photo-1517581177548-b1e88cc6d5ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Kitchen Remodel",
    category: "Renovation",
    description: "Complete kitchen transformation featuring custom cabinetry, premium appliances, and luxury finishes.",
    imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Corporate Headquarters",
    category: "Commercial",
    description: "State-of-the-art corporate campus with office space, conference facilities, and employee amenities.",
    imageUrl: "https://images.unsplash.com/photo-1486325212027-8081e485255e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  }
];

interface PortfolioSectionProps {
  onVisibilityChange?: (id: string, isVisible: boolean) => void;
  isVisible?: boolean;
}

export default function PortfolioSection({ 
  onVisibilityChange, 
  isVisible 
}: PortfolioSectionProps) {
  const handleVisibilityChange = (id: string, isVisible: boolean, element: HTMLElement) => {
    if (onVisibilityChange) {
      onVisibilityChange(id, isVisible);
    }
  };

  return (
    <SectionContainer
      id="portfolio"
      title="Our Portfolio"
      background="light"
      onVisibilityChange={handleVisibilityChange}
    >
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        Explore our completed projects showcasing quality craftsmanship and attention to detail.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            category={project.category}
            description={project.description}
            imageUrl={project.imageUrl}
          />
        ))}
      </div>
    </SectionContainer>
  );
}
