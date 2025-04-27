
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a production environment, this would save to a Supabase table
      // For now, we'll just simulate the process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 mb-8">
            Have questions about our products or services? Get in touch with our team, and we'll be happy to help you.
          </p>

        
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Our Information</h2>
              
              <div className="space-y-4">
              <div>
                  <p className="font-medium">Merchant Legal entity name</p>
                  <p className="text-gray-600">mehta corporation</p>
                </div>

                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-gray-600">W 228, Dombivali Industrial Area Phase 2, MIDC PHASE II, MIDC, DOMBIVLI EAST, Kalyan Thane MAHARASHTRA 421201</p>
                </div>
                
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-600">+91 8452006089</p>
                </div>
                
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">thinnermart@gmail.com</p>
                </div>
                
                <div>
                  <p className="font-medium">Hours</p>
                  <p className="text-gray-600">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    rows={4} 
                    value={formData.message}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
          
          <div className="border rounded-lg overflow-hidden h-80">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448183.7390424122!2d76.81306179643338!3d28.647279935270907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1660841264000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Company Location"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
