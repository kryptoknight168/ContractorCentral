import { useState } from "react";
import SectionContainer from "@/components/ui/section-container";
import { 
  useForm,
  Controller
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Send,
  ShieldCheck
} from "lucide-react";

// Contact form validation schema
const formSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(/^(\+\d{1,3})?[ ]?\(?\d{3}\)?[ ]?[-.]?\d{3}[ ]?[-.]?\d{4}$/, "Please enter a valid phone number"),
  project: z.string().min(1, "Please select a project type"),
  message: z.string().min(5, "Please enter a message (min 5 characters)"),
  verificationCode: z.string().min(4, "Please enter the verification code"),
  humanVerify: z.boolean().refine(val => val === true, {
    message: "You must verify that you are human"
  })
});

type ContactFormValues = z.infer<typeof formSchema>;

interface ContactSectionProps {
  onVisibilityChange?: (id: string, isVisible: boolean) => void;
  isVisible?: boolean;
}

export default function ContactSection({ 
  onVisibilityChange, 
  isVisible 
}: ContactSectionProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [verificationCode, setVerificationCode] = useState("BLD" + Math.floor(1000 + Math.random() * 9000)); // Random 4-digit code with BLD prefix
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      project: "",
      message: "",
      verificationCode: "",
      humanVerify: false
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Verify the code matches
      if (data.verificationCode !== verificationCode) {
        form.setError("verificationCode", {
          type: "manual",
          message: "The verification code you entered is incorrect"
        });
        setIsSubmitting(false);
        return;
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      
      // Generate a new verification code for next submission
      setVerificationCode("BLD" + Math.floor(1000 + Math.random() * 9000));
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVisibilityChange = (id: string, isVisible: boolean, element: HTMLElement) => {
    if (onVisibilityChange) {
      onVisibilityChange(id, isVisible);
    }
  };

  return (
    <SectionContainer
      id="contact"
      title="Contact Us"
      background="secondary"
      onVisibilityChange={handleVisibilityChange}
    >
      <p className="text-lg text-gray-300 max-w-3xl text-left">
        Ready to start your project? Contact us today for a consultation and free quote.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
        <div>
          <h3 className="font-inter font-bold text-2xl mb-6 border-b border-gray-700 pb-4 text-left">Get In Touch</h3>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Full Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your Name" 
                        {...field} 
                        className="bg-gray-700 text-white border-gray-600 focus:border-primary" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Email Address</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="youremail@example.com" 
                        type="email"
                        {...field} 
                        className="bg-gray-700 text-white border-gray-600 focus:border-primary" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Phone Number</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="(123) 456-7890" 
                        type="tel"
                        {...field} 
                        className="bg-gray-700 text-white border-gray-600 focus:border-primary" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="project"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Project Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-700 text-white border-gray-600 focus:border-primary">
                          <SelectValue placeholder="Select Project Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="new-construction">New Construction</SelectItem>
                        <SelectItem value="renovation">Renovation</SelectItem>
                        <SelectItem value="commercial">Commercial Project</SelectItem>
                        <SelectItem value="consultation">Consultation Only</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us about your project..." 
                        {...field} 
                        rows={4}
                        className="bg-gray-700 text-white border-gray-600 focus:border-primary resize-none" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-6">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <ShieldCheck className="h-5 w-5 text-primary mr-2" />
                    <h4 className="text-white font-medium">Human Verification</h4>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="px-4 py-2 bg-gray-700 rounded select-none text-lg text-gray-300 tracking-wider font-mono" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}>
                      {verificationCode}
                    </div>
                    <Button 
                      type="button" 
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => setVerificationCode("BLD" + Math.floor(1000 + Math.random() * 9000))}
                    >
                      New Code
                    </Button>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="verificationCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Enter the code above</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter verification code" 
                            {...field} 
                            className="bg-gray-700 text-white border-gray-600 focus:border-primary" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="humanVerify"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-3 space-y-0 pt-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="bg-gray-700 border-gray-500 text-primary"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-gray-300">
                            I am not a robot
                          </FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-red-700 text-white" 
                  disabled={isSubmitting}
                >
                  <span>Send Message</span>
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        </div>
        
        <div>
          <h3 className="font-inter font-bold text-2xl mb-6 border-b border-gray-700 pb-4 text-left">Our Information</h3>
          
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="mr-4 bg-primary/20 p-3 rounded-lg">
                <MapPin className="text-primary h-6 w-6" />
              </div>
              <div>
                <h4 className="font-inter font-medium text-lg">Office Location</h4>
                <p className="text-gray-300 mt-1">123 Construction Way<br />Seattle, WA 98101</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4 bg-primary/20 p-3 rounded-lg">
                <Phone className="text-primary h-6 w-6" />
              </div>
              <div>
                <h4 className="font-inter font-medium text-lg">Phone</h4>
                <p className="text-gray-300 mt-1">(206) 555-0123</p>
                <p className="text-gray-400 text-sm">Monday - Friday, 8am - 5pm</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4 bg-primary/20 p-3 rounded-lg">
                <Mail className="text-primary h-6 w-6" />
              </div>
              <div>
                <h4 className="font-inter font-medium text-lg">Email</h4>
                <p className="text-gray-300 mt-1">info@buildright-construction.com</p>
                <p className="text-gray-400 text-sm">We respond within 24 hours</p>
              </div>
            </div>
            
            <div className="mt-10">
              <h4 className="font-inter font-medium text-lg mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-700 hover:bg-primary text-white h-10 w-10 rounded-full flex items-center justify-center transition duration-300">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="bg-gray-700 hover:bg-primary text-white h-10 w-10 rounded-full flex items-center justify-center transition duration-300">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="bg-gray-700 hover:bg-primary text-white h-10 w-10 rounded-full flex items-center justify-center transition duration-300">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="bg-gray-700 hover:bg-primary text-white h-10 w-10 rounded-full flex items-center justify-center transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 19c-.721 0-1.418-.109-2.073-.312.286-.465.517-.982.688-1.543.129-.427.254-.854.382-1.281.125.121.258.238.398.359.363.263.724.561 1.097.682.373.121.797.184 1.124.063.377-.138.502-.511.473-.873-.029-.362-.139-.665-.34-.905-.201-.24-.456-.419-.736-.56-1.376-.652-2.113-1.567-2.248-2.836-.068-.642-.01-1.279.16-1.879s.43-1.15.792-1.646c.362-.496.797-.905 1.322-1.223.525-.318 1.089-.561 1.722-.638.665-.082 1.34-.053 1.994.105.654.158 1.243.461 1.709.9.221.207.405.434.553.681.148.247.276.51.376.795.108.314.154.643.189.977.013.121.028.227.064.321.301.774.411 1.603.365 2.431-.046.825-.296 1.635-.773 2.31-.476.675-1.132 1.222-1.956 1.536-.219.083-.441.15-.668.195.125.119.257.226.361.355.274.325.474.702.56 1.125.115.591-.093 1.199-.598 1.536-.361.244-.811.336-1.218.328h-.04c-.544-.019-1.054-.244-1.414-.634zm-3.344-3.683c-.16.164-.398.232-.602.161-.204-.073-.333-.271-.333-.489 0-.054.006-.108.019-.161.028-.11.068-.208.122-.3l.038-.062c.02-.029.086-.094.088-.097l.111-.089.029-.02c.052-.033.108-.038.161-.039.159-.003.318.081.402.226.031.055.049.116.054.178l.004.096c-.002.118-.05.23-.093.296zm1.421-1.176c-.245.075-.445-.024-.544-.232-.099-.209-.069-.472.07-.7l.11-.128c.029-.031.059-.061.087-.093.058-.056.123-.104.193-.14.051-.028.108-.043.165-.052.058-.009.117-.009.175.001.058.01.114.031.165.061.051.03.095.071.132.118.073.097.124.212.146.336.022.124.013.251-.028.368-.093.27-.32.389-.582.461h-.89zm3.201-2.223c-.336.038-.499-.027-.678-.298-.18-.27-.163-.571.102-.814.133-.122.301-.197.478-.218.176-.021.355.005.512.077.157.072.279.189.358.338.077.15.102.322.072.487-.058.305-.282.399-.584.431-.089.01-.1 0-.174.004l-.086-.007zm2.871-.098c-.088.174-.215.297-.363.39-.148.093-.314.154-.486.171-.171.017-.345-.013-.502-.088-.156-.075-.288-.192-.387-.337-.098-.145-.156-.312-.168-.483-.012-.171.026-.343.108-.493.109-.202.285-.359.497-.458.213-.099.45-.13.68-.089.23.042.433.167.57.348.14.181.199.404.167.624-.02.145-.051.265-.116.415z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
