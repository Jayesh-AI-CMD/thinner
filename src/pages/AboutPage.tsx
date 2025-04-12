
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MedalIcon, LeafIcon, FlaskConical, TruckIcon, HeartHandshake } from "lucide-react";

const AboutPage = () => {
  return (
    <Layout>
      <div className="py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto mb-16">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center">About Thinnermart</h1>
            <p className="text-lg text-gray-700 text-center mb-8">
              Your Trusted Partner in Quality Thinners Since 2005
            </p>
            
            <div className="relative rounded-xl overflow-hidden h-[300px] md:h-[400px] mb-8">
              <img 
                src="/benefits-image.jpg" 
                alt="Thinnermart Factory" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <h2 className="text-white text-2xl md:text-3xl font-semibold">
                  Committed to Quality and Innovation
                </h2>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p>
                Welcome to Thinnermart, where excellence meets innovation in the world of thinners and solvents. Founded in 2005, we have established ourselves as a leading manufacturer and supplier of premium quality thinners in India.
              </p>
              
              <p>
                At our state-of-the-art manufacturing facility, we combine traditional expertise with modern technology to create products that meet the highest standards of quality and performance. Our comprehensive range of thinners caters to diverse applications in the painting and coating industry.
              </p>
              
              <p>
                What sets us apart is our unwavering commitment to quality control at every stage of production. From sourcing the finest raw materials to implementing stringent testing protocols, we ensure that each batch of thinner that leaves our facility meets our exacting standards.
              </p>
              
              <p>
                Our dedicated team of experienced professionals is the backbone of our success. With their expertise and passion for excellence, we continue to innovate and improve our products to meet the evolving needs of our customers.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-8 md:p-12 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Our Core Values</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="bg-brand-100 p-3 rounded-full mb-4">
                  <MedalIcon className="h-8 w-8 text-brand-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Excellence</h3>
                <p className="text-gray-600">
                  We are committed to maintaining the highest standards of quality in all our products and services.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="bg-brand-100 p-3 rounded-full mb-4">
                  <LeafIcon className="h-8 w-8 text-brand-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Environmental Responsibility</h3>
                <p className="text-gray-600">
                  We strive to minimize our environmental footprint through sustainable practices and eco-friendly formulations.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="bg-brand-100 p-3 rounded-full mb-4">
                  <FlaskConical className="h-8 w-8 text-brand-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-gray-600">
                  We continuously research and develop new formulations to enhance performance and meet emerging market needs.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Why Choose Thinnermart?</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-brand-100 p-2 rounded-full">
                    <TruckIcon className="h-6 w-6 text-brand-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Nationwide Distribution</h3>
                  <p className="text-gray-600">
                    With our extensive distribution network, we ensure timely delivery across India. Whether you're in a metropolitan city or a remote location, we've got you covered.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-brand-100 p-2 rounded-full">
                    <HeartHandshake className="h-6 w-6 text-brand-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Customer-Centric Approach</h3>
                  <p className="text-gray-600">
                    We believe in building lasting relationships with our customers through exceptional service, technical support, and after-sales assistance.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Experience the Thinnermart Difference?</h2>
            <p className="text-lg text-gray-600 mb-6">
              Explore our range of premium quality thinners and elevate your painting and coating projects.
            </p>
            <Link to="/products">
              <Button size="lg">Browse Our Products</Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
