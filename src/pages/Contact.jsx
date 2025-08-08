import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mock form submission
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-charcoal mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-brand-warm-gray max-w-3xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-brand-charcoal">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormInput
                  label="Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  required
                />
                
                <FormInput
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                />
                
                <FormInput
                  label="Subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="What's this about?"
                  required
                />
                
                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-2">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us how we can help you..."
                    rows={6}
                    required
                    className="focus-visible:ring-brand-accent"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-brand-charcoal hover:bg-brand-warm-gray"
                  size="lg"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-brand-charcoal">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-brand-accent mt-1" />
                  <div>
                    <h3 className="font-medium text-brand-charcoal">Address</h3>
                    <p className="text-brand-warm-gray">
                      123 Fashion Street<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-brand-accent mt-1" />
                  <div>
                    <h3 className="font-medium text-brand-charcoal">Phone</h3>
                    <p className="text-brand-warm-gray">1-800-LOVEABLE</p>
                    <p className="text-brand-warm-gray">(1-800-568-3225)</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-brand-accent mt-1" />
                  <div>
                    <h3 className="font-medium text-brand-charcoal">Email</h3>
                    <p className="text-brand-warm-gray">contact@loveable.com</p>
                    <p className="text-brand-warm-gray">support@loveable.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-brand-accent mt-1" />
                  <div>
                    <h3 className="font-medium text-brand-charcoal">Business Hours</h3>
                    <p className="text-brand-warm-gray">
                      Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                      Saturday: 10:00 AM - 4:00 PM EST<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-brand-charcoal">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-medium text-brand-charcoal">What's your return policy?</h4>
                  <p className="text-sm text-brand-warm-gray">We offer a 30-day return policy for unworn items with tags.</p>
                </div>
                <div>
                  <h4 className="font-medium text-brand-charcoal">Do you offer international shipping?</h4>
                  <p className="text-sm text-brand-warm-gray">Yes, we ship to most countries worldwide. Shipping costs vary by location.</p>
                </div>
                <div>
                  <h4 className="font-medium text-brand-charcoal">How do I track my order?</h4>
                  <p className="text-sm text-brand-warm-gray">You'll receive a tracking number via email once your order ships.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;