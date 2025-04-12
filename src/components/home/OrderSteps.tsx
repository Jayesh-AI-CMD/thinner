
import { Check } from "lucide-react";

const OrderSteps = () => {
  const steps = [
    {
      number: 1,
      title: "Browse Products",
      description: "Explore our range of professional-grade thinners for different applications."
    },
    {
      number: 2,
      title: "Select Options",
      description: "Choose the right product, size, and quantity to meet your requirements."
    },
    {
      number: 3,
      title: "Add to Cart",
      description: "Add your selected products to the shopping cart for checkout."
    },
    {
      number: 4,
      title: "Place Order",
      description: "Complete your purchase with our secure payment options."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How to Order</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Follow these simple steps to order our premium thinners online. It's easy, secure, and convenient.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <div className="space-y-8">
              {steps.map((step) => (
                <div key={step.number} className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-600 text-white font-bold">
                      {step.number}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/2 order-1 md:order-2">
            <img 
              src="/order-process.jpg" 
              alt="Order Process" 
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>

        <div className="mt-12 bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold mb-4 text-center">Why Buy From Us?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-brand-100 flex items-center justify-center mt-1">
                <Check className="h-3 w-3 text-brand-600" />
              </div>
              <p className="ml-3 text-gray-600">Direct from manufacturer pricing</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-brand-100 flex items-center justify-center mt-1">
                <Check className="h-3 w-3 text-brand-600" />
              </div>
              <p className="ml-3 text-gray-600">Bulk order discounts available</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-brand-100 flex items-center justify-center mt-1">
                <Check className="h-3 w-3 text-brand-600" />
              </div>
              <p className="ml-3 text-gray-600">Fast shipping across India</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-brand-100 flex items-center justify-center mt-1">
                <Check className="h-3 w-3 text-brand-600" />
              </div>
              <p className="ml-3 text-gray-600">Sample options for product testing</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-brand-100 flex items-center justify-center mt-1">
                <Check className="h-3 w-3 text-brand-600" />
              </div>
              <p className="ml-3 text-gray-600">Secure payment options</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-brand-100 flex items-center justify-center mt-1">
                <Check className="h-3 w-3 text-brand-600" />
              </div>
              <p className="ml-3 text-gray-600">Expert customer support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSteps;
