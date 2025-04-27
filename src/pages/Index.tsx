
import Layout from "@/components/layout/Layout";
import HeroSlider from "@/components/home/HeroSlider";
import FeaturedBenefits from "@/components/home/FeaturedBenefits";
import KeyBenefits from "@/components/home/KeyBenefits";
import CategorySection from "@/components/home/CategorySection";
import AboutSection from "@/components/home/AboutSection";
import OrderSteps from "@/components/home/OrderSteps";
import { GSTDetails } from "@/components/home/GSTDetails";

const Index = () => {
  return (
    <Layout>
      <HeroSlider />
      <FeaturedBenefits />
      <KeyBenefits />
      <CategorySection />
      <AboutSection />
      <OrderSteps />
    </Layout>
  );
};

export default Index;
