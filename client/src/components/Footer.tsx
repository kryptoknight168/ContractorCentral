import { Building } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-gray-400 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Building className="text-primary text-2xl mr-3" />
              <div>
                <h3 className="font-inter font-bold text-lg text-white">BuildRight</h3>
                <p className="text-xs">GENERAL CONTRACTORS</p>
              </div>
            </div>
            <p className="mb-4">Quality construction and renovation services for residential and commercial properties since 2005.</p>
            <p>Licensed & Insured<br />License #BUILDRC-123456</p>
          </div>
          
          <div>
            <h3 className="font-inter font-bold text-lg text-white mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-primary transition duration-300">New Construction</a></li>
              <li><a href="#services" className="hover:text-primary transition duration-300">Renovations</a></li>
              <li><a href="#services" className="hover:text-primary transition duration-300">Custom Designs</a></li>
              <li><a href="#services" className="hover:text-primary transition duration-300">Commercial Projects</a></li>
              <li><a href="#services" className="hover:text-primary transition duration-300">Project Management</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-inter font-bold text-lg text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary transition duration-300">About Us</a></li>
              <li><a href="#team" className="hover:text-primary transition duration-300">Our Team</a></li>
              <li><a href="#portfolio" className="hover:text-primary transition duration-300">Portfolio</a></li>
              <li><a href="#" className="hover:text-primary transition duration-300">Testimonials</a></li>
              <li><a href="#" className="hover:text-primary transition duration-300">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-inter font-bold text-lg text-white mb-4">Newsletter</h3>
            <p className="mb-4">Subscribe to receive updates on our latest projects and construction tips.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 rounded-l-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-primary flex-grow"
                aria-label="Email for newsletter"
              />
              <button 
                type="submit" 
                className="bg-primary hover:bg-red-700 text-white px-4 rounded-r-lg transition duration-300"
                aria-label="Subscribe"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} BuildRight Construction. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="mx-2 hover:text-primary transition duration-300">Privacy Policy</a>
            <a href="#" className="mx-2 hover:text-primary transition duration-300">Terms of Service</a>
            <a href="#" className="mx-2 hover:text-primary transition duration-300">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
