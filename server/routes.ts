import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Add API route to handle contact form submissions
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, phone, project, message } = req.body;
      
      // Validate required fields
      if (!name || !email || !message || !project) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      
      // Here you would typically store the contact submission or send an email
      // For now, we'll just return a success response
      
      return res.status(200).json({ 
        success: true, 
        message: 'Contact form submission received'
      });
    } catch (error) {
      console.error('Error handling contact form submission:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Server error processing your request'
      });
    }
  });

  // Add routes to handle the clean URL paths - serve the SPA for all these routes
  const spaRoutes = ['/', '/services', '/our-team', '/portfolio', '/contact'];
  spaRoutes.forEach(route => {
    app.get(route, (req, res, next) => {
      // Allow Vite middleware to handle the request when in development mode
      if (process.env.NODE_ENV === 'development') {
        return next();
      }
      // In production, we would serve the index.html here
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
