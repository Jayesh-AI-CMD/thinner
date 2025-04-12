
import { Check } from "lucide-react";

const KeyBenefits = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Benefits of Our Products</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover why professionals and businesses across India trust our premium quality thinners for their painting and industrial needs.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="w-full md:w-1/2">
            <img 
              src="public/benifit.png" 
              alt="Product Benefits" 
              className="rounded-lg shadow-lg w-full object-cover"
              style={{ maxHeight: "500px" }}
            />
          </div>

          <div className="w-full md:w-1/2 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-brand-100 flex items-center justify-center mt-1">
                  <Check className="h-4 w-4 text-brand-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900">High-Quality Formulation</h3>
                  <p className="mt-1 text-gray-600">
                    Our thinners are manufactured using the finest raw materials to ensure optimal performance and consistency.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-brand-100 flex items-center justify-center mt-1">
                  <Check className="h-4 w-4 text-brand-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900">Professional Results</h3>
                  <p className="mt-1 text-gray-600">
                    Achieve flawless finishes with our thinners designed for professional-grade applications and industrial use.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-brand-100 flex items-center justify-center mt-1">
                  <Check className="h-4 w-4 text-brand-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900">Economic Value</h3>
                  <p className="mt-1 text-gray-600">
                    Our concentrated formulas offer excellent dilution ratios, making them cost-effective for high-volume users.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-brand-100 flex items-center justify-center mt-1">
                  <Check className="h-4 w-4 text-brand-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900">Specialized Solutions</h3>
                  <p className="mt-1 text-gray-600">
                    Each product is specially formulated for specific applications, ensuring the best results for your particular needs.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-brand-100 flex items-center justify-center mt-1">
                  <Check className="h-4 w-4 text-brand-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900">Made in India</h3>
                  <p className="mt-1 text-gray-600">
                    Proudly manufactured in our state-of-the-art facility in India, supporting local industry while meeting global standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyBenefits;
