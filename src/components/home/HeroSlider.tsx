
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Slider data
const slides = [
  {
    id: 1,
    image: "/images/slider1-new.jpg",
    title: "Premium Quality Thinners",
    subtitle: "For Professional Painters & Industrial Applications",
    cta: "Shop Now",
    link: "/products"
  },
  {
    id: 2,
    image: "/images/slider2-new.jpg",
    title: "Royal GP Thinner",
    subtitle: "The Most Versatile General Purpose Thinner",
    cta: "View Details",
    link: "/products/royal-gp-thinner"
  },
  {
    id: 3,
    image: "/images/slider3-new.jpg",
    title: "Sailac PU Thinner",
    subtitle: "Perfect for Polyurethane Coatings",
    cta: "Learn More",
    link: "/products/sailac-pu-thinner"
  },
  {
    id: 4,
    image: "/images/slider4-new.jpg",
    title: "Top 999 NC Thinner",
    subtitle: "For Premium Nitrocellulose Finishes",
    cta: "Explore",
    link: "/products/top-999-nc-thinner"
  },
  {
    id: 5,
    image: "/images/slider5-new.jpg",
    title: "Industrial Strength Solutions",
    subtitle: "For Manufacturing & Wholesale Needs",
    cta: "Contact Us",
    link: "/contact"
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Automatic slideshow
  useEffect(() => {
    if (!isPaused) {
      const timer = setTimeout(() => {
        nextSlide();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentSlide, isPaused, nextSlide]);

  return (
    <div 
      className="relative hero-slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slide Container */}
      <div className="relative h-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Background Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
            
            {/* Slide Background */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            ></div>
            
            {/* Slide Content */}
            <div className="relative h-full z-20">
              <div className="container h-full flex items-center">
                <div className="max-w-lg text-white p-6">
                  <h2 
                    className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2"
                    style={{
                      opacity: index === currentSlide ? 1 : 0,
                      transform: index === currentSlide ? "translateY(0)" : "translateY(20px)",
                      transition: "opacity 0.5s ease, transform 0.5s ease",
                      transitionDelay: "0.3s"
                    }}
                  >
                    {slide.title}
                  </h2>
                  <p 
                    className="text-lg md:text-xl opacity-90 mb-6"
                    style={{
                      opacity: index === currentSlide ? 1 : 0,
                      transform: index === currentSlide ? "translateY(0)" : "translateY(20px)",
                      transition: "opacity 0.5s ease, transform 0.5s ease",
                      transitionDelay: "0.5s"
                    }}
                  >
                    {slide.subtitle}
                  </p>
                  <Link 
                    to={slide.link}
                    style={{
                      opacity: index === currentSlide ? 1 : 0,
                      transform: index === currentSlide ? "translateY(0)" : "translateY(20px)",
                      transition: "opacity 0.5s ease, transform 0.5s ease",
                      transitionDelay: "0.7s"
                    }}
                  >
                    <Button size="lg" className="bg-brand-600 hover:bg-brand-700">
                      {slide.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-30 transition-colors"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-30 transition-colors"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide 
                ? "bg-white w-6" 
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
