import { useRef } from "react";
import SectionContainer from "@/components/ui/section-container";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Home, 
  Hammer, 
  Ruler, 
  Building, 
  Wrench, 
  PaintBucket, 
  ArrowRight
} from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactElement;
  title: string;
  description: string;
}

const ServiceCard = ({ icon, title, description }: ServiceCardProps) => (
  <Card className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
    <CardContent className="p-0">
      <div className="text-primary text-4xl mb-6">
        {icon}
      </div>
      <h3 className="font-inter font-bold text-xl mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <a href="#" className="text-primary font-medium hover:underline inline-flex items-center">
        Learn more <ArrowRight className="ml-2 h-4 w-4" />
      </a>
    </CardContent>
  </Card>
);

const services: ServiceCardProps[] = [
  {
    icon: <Home className="h-10 w-10" />,
    title: "New Construction",
    description: "Full-service new construction for residential homes and commercial buildings, from foundation to finishing touches."
  },
  {
    icon: <Hammer className="h-10 w-10" />,
    title: "Renovations",
    description: "Transform existing spaces with our comprehensive renovation services, from simple updates to complete remodels."
  },
  {
    icon: <Ruler className="h-10 w-10" />,
    title: "Custom Designs",
    description: "Bring your vision to life with our custom design services, tailored to meet your specific needs and preferences."
  },
  {
    icon: <Building className="h-10 w-10" />,
    title: "Commercial Projects",
    description: "Specialized construction services for retail, office, and industrial spaces with minimal disruption to operations."
  },
  {
    icon: <Wrench className="h-10 w-10" />,
    title: "Project Management",
    description: "End-to-end project management ensuring your construction project stays on time, within budget, and to specification."
  },
  {
    icon: <PaintBucket className="h-10 w-10" />,
    title: "Interior Finishing",
    description: "Expert interior finishing services including painting, flooring, cabinetry, and custom millwork installations."
  }
];

interface ServicesSectionProps {
  onVisibilityChange?: (id: string, isVisible: boolean) => void;
  isVisible?: boolean;
}

export default function ServicesSection({ 
  onVisibilityChange, 
  isVisible 
}: ServicesSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleVisibilityChange = (id: string, isVisible: boolean, element: HTMLElement) => {
    if (onVisibilityChange) {
      onVisibilityChange(id, isVisible);
    }
  };

  return (
    <SectionContainer
      id="services"
      title="Our Services"
      background="light"
      onVisibilityChange={handleVisibilityChange}
    >
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        We offer comprehensive construction and renovation services for residential and commercial properties.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </SectionContainer>
  );
}
