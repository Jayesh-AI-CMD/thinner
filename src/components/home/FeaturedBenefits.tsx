import { TruckIcon, ShieldCheck, CreditCard, RefreshCcw, BadgeCheck } from "lucide-react";

const benefits = [
  {
    id: 1,
    icon: TruckIcon,
    title: "Free Delivery",
  },
  {
    id: 2,
    icon: ShieldCheck,
    title: "Secured Payment",
  },
  {
    id: 3,
    icon: CreditCard,
    title: "GST Billing",
  },
  {
    id: 4,
    icon: RefreshCcw,
    title: "15 Days Replacement",
  },
];

const FeaturedBenefits = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container">
        <div className="flex justify-center items-center gap-4 flex-wrap">
          {benefits.map((benefit) => (
            <div 
              key={benefit.id}
              className="flex flex-col items-center text-center p-4"
            >
              <benefit.icon className="h-10 w-10 text-brand-600 mb-2" />
              <h3 className="text-base font-medium text-gray-900">{benefit.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

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
