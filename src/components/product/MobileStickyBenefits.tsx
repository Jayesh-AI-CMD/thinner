
import { useState, useEffect } from "react";
import { Truck, ShieldCheck, Receipt, RotateCcw, Award } from "lucide-react";

const MobileStickyBenefits = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Show when scrolled past 300px
      setVisible(scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  const benefits = [
    { icon: Truck, text: "Free delivery" },
    { icon: ShieldCheck, text: "Secured payment" },
    { icon: Receipt, text: "GST billing" },
    { icon: RotateCcw, text: "15 days replacement" },
    { icon: Award, text: "Verified merchant" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-2">
      <div className="flex overflow-x-auto scrollbar-hide space-x-3 pb-1">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex flex-col items-center flex-shrink-0 text-center px-2">
            <benefit.icon className="h-5 w-5 text-primary mb-1" />
            <span className="text-xs whitespace-nowrap">{benefit.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileStickyBenefits;
