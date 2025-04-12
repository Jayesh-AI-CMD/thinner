
import { useState, useEffect } from "react";
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
  {
    id: 5,
    icon: BadgeCheck,
    title: "Verified Merchant",
  }
];

const MobileStickyBenefits = ({ showOnScroll = false }: { showOnScroll?: boolean }) => {
  const [isVisible, setIsVisible] = useState(!showOnScroll);

  useEffect(() => {
    if (!showOnScroll) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showOnScroll]);

  if (!isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-40">
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

export default MobileStickyBenefits;
