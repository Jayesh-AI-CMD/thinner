
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Truck, Factory, Beaker, BadgeCheck } from "lucide-react";

const AboutSection = () => {
  const benefits = [
    {
      icon: Factory,
      title: "Manufacturing Excellence",
      description: "State-of-the-art manufacturing facility with quality control at every step."
    },
    {
      icon: Beaker,
      title: "Research & Development",
      description: "Continuous innovation to improve our product formulations and performance."
    },
    {
      icon: Truck,
      title: "Pan-India Distribution",
      description: "Serving customers across India with efficient logistics and distribution."
    },
    {
      icon: BadgeCheck,
      title: "Quality Certified",
      description: "Our products comply with industry standards and quality certifications."
    }
  ];

  return (
    <section className="py-16">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About ThinnerMart</h2>
            <p className="text-lg text-gray-600 mb-6">
              ThinnerMart is a leading manufacturer of high-quality paint thinners and solvents in India. With over 15 years of experience in the industry, we have established ourselves as a trusted supplier to professionals, businesses, and industries across the country.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Our manufacturing facility employs the latest technology and stringent quality control processes to ensure every product that bears our name meets the highest standards of performance and consistency.
            </p>
            <Link to="/about">
              <Button size="lg">Learn More About Us</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 benefit-card"
              >
                <benefit.icon className="h-10 w-10 text-brand-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
