import SectionContainer from "@/components/ui/section-container";
import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Twitter, Mail } from "lucide-react";

interface TeamMemberProps {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
}

const TeamMemberCard = ({ name, role, description, imageUrl }: TeamMemberProps) => (
  <Card className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
    <div className="h-64 overflow-hidden">
      <img 
        src={imageUrl} 
        alt={`${name}, ${role}`} 
        className="w-full h-full object-cover object-center" 
      />
    </div>
    <CardContent className="p-6">
      <h3 className="font-inter font-bold text-xl mb-1">{name}</h3>
      <p className="text-primary font-medium mb-3">{role}</p>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex space-x-3">
        <a href="#" className="text-gray-400 hover:text-primary transition">
          <Linkedin className="h-5 w-5" />
        </a>
        <a href="#" className="text-gray-400 hover:text-primary transition">
          <Twitter className="h-5 w-5" />
        </a>
        <a href="#" className="text-gray-400 hover:text-primary transition">
          <Mail className="h-5 w-5" />
        </a>
      </div>
    </CardContent>
  </Card>
);

const teamMembers: TeamMemberProps[] = [
  {
    name: "Michael Johnson",
    role: "Chief Architect",
    description: "Over 15 years of experience designing award-winning residential and commercial properties.",
    imageUrl: "https://images.unsplash.com/photo-1581992652564-44c42f5ad3ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Sarah Martinez",
    role: "Project Manager",
    description: "Specialized in managing complex construction projects with impeccable planning and execution.",
    imageUrl: "https://images.unsplash.com/photo-1594751684241-bcef739c3bfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "David Wilson",
    role: "Lead Contractor",
    description: "Expert in construction techniques with a focus on quality craftsmanship and timely project delivery.",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  }
];

interface TeamSectionProps {
  onVisibilityChange?: (id: string, isVisible: boolean) => void;
  isVisible?: boolean;
}

export default function TeamSection({ 
  onVisibilityChange, 
  isVisible 
}: TeamSectionProps) {
  const handleVisibilityChange = (id: string, isVisible: boolean, element: HTMLElement) => {
    if (onVisibilityChange) {
      onVisibilityChange(id, isVisible);
    }
  };

  return (
    <SectionContainer
      id="team"
      title="Meet Our Team"
      background="accent"
      onVisibilityChange={handleVisibilityChange}
    >
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        Our experienced professionals are dedicated to delivering quality construction 
        with exceptional attention to detail.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        {teamMembers.map((member, index) => (
          <TeamMemberCard
            key={index}
            name={member.name}
            role={member.role}
            description={member.description}
            imageUrl={member.imageUrl}
          />
        ))}
      </div>
    </SectionContainer>
  );
}
