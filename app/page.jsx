import Features from "../components/Home/Features";
import Hero from "../components/Home/Hero";
import Steps from "../components/Home/Steps";
import Testimonials from "../components/Home/Testimonials";
import Footer from "../components/Footer";
import Action from "../components/Home/Actions";

export default function Home() {
  return (
    <div className="flex flex-col pt-16">
      <Hero />
      <Features />
      <Steps />
      <Testimonials />
      <Action />
      <Footer />
    </div>
  );
}
