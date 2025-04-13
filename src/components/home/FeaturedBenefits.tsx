import { TruckIcon, ShieldCheck, CreditCard, RefreshCcw, BadgeCheck } from "lucide-react";

const benefits = [
  {
    id: 1,
    icon: TruckIcon,
    title: "Free Delivery",
    description: "On orders above ₹2000"
  },
  {
    id: 2,
    icon: ShieldCheck,
    title: "Secured Payment",
    description: "100% secure payment"
  },
  {
    id: 3,
    icon: CreditCard,
    title: "GST Billing",
    description: "Professional GST invoices"
  },
  {
    id: 4,
    icon: RefreshCcw,
    title: "15 Days Replacement",
    description: "Quality guarantee"
  },

];

// Desktop version
const FeaturedBenefits = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container">
        <div className="hidden md:flex justify-center items-center gap-4">
          {benefits.map((benefit) => (
            <div 
              key={benefit.id}
              className="flex flex-col items-center text-center p-4"
            >
              <benefit.icon className="h-10 w-10 text-brand-600 mb-3" />
              <h3 className="text-base font-medium text-gray-900 mb-1">{benefit.title}</h3>
              <p className="text-sm text-gray-500">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Mobile scrollable version */}
        <div className="md:hidden flex justify-center items-center overflow-x-auto pb-4 -mx-4">
          <div className="flex px-4 space-x-4">
            {benefits.map((benefit) => (
              <div 
                key={benefit.id}
                className="flex flex-col items-center text-center p-3 bg-white rounded-lg shadow-sm"
              >
                <benefit.icon className="h-8 w-8 text-brand-600 mb-2" />
                <h3 className="text-sm font-medium text-gray-900 mb-1">{benefit.title}</h3>
                <p className="text-xs text-gray-500">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Mobile sticky version for product pages
export const MobileStickyBenefits = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-40">
      <div className="overflow-x-auto pb-1 pt-1">
        <div className="flex space-x-4 px-4 min-w-max">
          {benefits.map((benefit) => (
            <div 
              key={benefit.id}
              className="flex items-center py-2"
            >
              <benefit.icon className="h-4 w-4 text-brand-600 mr-2 flex-shrink-0" />
              <span className="text-xs font-medium whitespace-nowrap">{benefit.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedBenefits;
