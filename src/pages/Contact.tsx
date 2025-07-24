
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";

const ContactPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Have questions or feedback? We'd love to hear from you. Get in touch with our team.
        </p>
      </div>

      {/* Contact Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div className="bg-background border border-border rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="text-primary h-6 w-6" />
          </div>
          <h3 className="font-semibold mb-2">Visit Us</h3>
          <p className="text-muted-foreground text-sm">
            123 Fashion Street<br />
            Trendy Hub, Style City<br />
            12345
          </p>
        </div>

        <div className="bg-background border border-border rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="text-primary h-6 w-6" />
          </div>
          <h3 className="font-semibold mb-2">Call Us</h3>
          <p className="text-muted-foreground text-sm">
            Customer Service:<br />
            +1 234 567 8900<br />
            Mon-Fri, 9am-6pm
          </p>
        </div>

        <div className="bg-background border border-border rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="text-primary h-6 w-6" />
          </div>
          <h3 className="font-semibold mb-2">Email Us</h3>
          <p className="text-muted-foreground text-sm">
            General Inquiries:<br />
            info@trendydesign.com<br />
            Support: support@trendydesign.com
          </p>
        </div>

        <div className="bg-background border border-border rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="text-primary h-6 w-6" />
          </div>
          <h3 className="font-semibold mb-2">Business Hours</h3>
          <p className="text-muted-foreground text-sm">
            Monday - Friday: 9am - 6pm<br />
            Saturday: 10am - 4pm<br />
            Sunday: Closed
          </p>
        </div>
      </div>

      {/* Contact Form and Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          
          {formSubmitted ? (
            <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-100 p-6 rounded-lg border border-green-200 dark:border-green-800 text-center">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600 dark:text-green-400" />
              <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
              <p className="mb-4">
                Thank you for reaching out to us. We've received your message and will get back to you as soon as possible.
              </p>
              <Button onClick={() => setFormSubmitted(false)} variant="outline">
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <Input id="name" placeholder="Your name" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <Input id="email" type="email" placeholder="Your email" required />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <Input id="subject" placeholder="What is this regarding?" required />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <Textarea 
                  id="message" 
                  placeholder="Your message" 
                  rows={6}
                  required 
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          )}
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-6">Our Location</h2>
          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
            {/* Using a placeholder for the map */}
            <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
              <p className="text-center px-4">
                Interactive map would be displayed here.<br />
                For an actual implementation, consider using Google Maps, Mapbox, or similar services.
              </p>
            </div>
          </div>
          
          <div className="mt-6 bg-muted/30 p-4 rounded-md">
            <h3 className="font-semibold mb-2">Getting Here</h3>
            <p className="text-muted-foreground text-sm">
              Our flagship store is conveniently located in the heart of Style City. We're accessible by public transportation, with bus stops and subway stations within walking distance. Parking is available in nearby garages.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-muted/20 rounded-lg p-6">
            <h3 className="font-semibold mb-2">What are your shipping options?</h3>
            <p className="text-muted-foreground text-sm">
              We offer standard shipping (3-5 business days), express shipping (1-2 business days), and free shipping on all orders over ₹499.
            </p>
          </div>
          
          <div className="bg-muted/20 rounded-lg p-6">
            <h3 className="font-semibold mb-2">How can I track my order?</h3>
            <p className="text-muted-foreground text-sm">
              Once your order is shipped, you'll receive a confirmation email with a tracking number. You can also track your order in your account dashboard.
            </p>
          </div>
          
          <div className="bg-muted/20 rounded-lg p-6">
            <h3 className="font-semibold mb-2">What is your return policy?</h3>
            <p className="text-muted-foreground text-sm">
              We accept returns within 30 days of purchase. Items must be in their original condition with tags attached. Please visit our Returns page for more details.
            </p>
          </div>
          
          <div className="bg-muted/20 rounded-lg p-6">
            <h3 className="font-semibold mb-2">Do you offer international shipping?</h3>
            <p className="text-muted-foreground text-sm">
              Yes, we ship to selected countries worldwide. International shipping typically takes 7-14 business days, depending on your location.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
