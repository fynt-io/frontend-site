"use client";
import { useState, useEffect } from "react";
import { Footer } from "./components/Layout/Structure/Footer";
import Plans from "./components/Stripe/plans";
import { NewsletterSignup } from "./components/Home/NewsletterSignup";
import { FAQSection } from "./components/Home/FaqSection";
import { ComparativeChartSection } from "./components/Home/ComparativeChartSection";
import { TestimonialsSection } from "./components/Home/TestimonialsSection";
import { BrenFeaturesSection } from "./components/Home/BrenFeaturesSection";
import { HomeMenu } from "./components/Home/HomeMenu";
import { HomeStartScreen } from "./components/Home/HomeStartScreen";
import { QuoteSection } from "./components/Home/QuoteSection";
import { TalkToUsWhatsAppButton } from "./components/Home/TalkToUsWhatsAppButton";
import { BREN_CONSTANTS } from "./constants/constants";
  
const HomeSection = ({
  id,
  children,
  background = "transparent",
  classname,
}: {
  id: string;
  children?: any;
  background?: string;
  classname?: string;
}) => {
  return (
    <section
      id={id}
      className={` relative overflow-hidden flex flex-col justify-center items-center !bg-cover ${classname}`}
      style={{ background: background }}
    >
      {children}
    </section>
  );
};

export default function Home() {
  //detect the scroll position
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mount, setMount] = useState(false);
  //smooth scroll to an element
  function scrollToElement(elementId: string) {
    if (typeof document === "undefined") return false;
    var element = document.getElementById(elementId);
    if (!element) return false;
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  //force darkmode in this page
  useEffect(() => {
    setMount(true);
    document.documentElement.classList.add("dark");
    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, [mount]);

  //add the event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className={` bg-[#050505] home dark relative`}>
      {/* WhatsApp Button */}
      <TalkToUsWhatsAppButton />

      {/* Menu */}
      <HomeMenu />

      {/* Start Screen */}
      <HomeSection
        id="start"
        background="url(/home/bg-bren-home.webp) bottom center #050505  "
        classname=" !justify-start"
      >
        <HomeStartScreen
          scrollPosition={scrollPosition}
          scrollToElement={scrollToElement}
        />
      </HomeSection>

      {/* Features */}
      <HomeSection
        id="features"
        classname=" h-auto relative"
        background="url(/home/bg-bren-home-2.webp) fixed top center #050505"
      >
        <BrenFeaturesSection triggerAction={() => scrollToElement("plans")} />
        <QuoteSection />
      </HomeSection>

      {/* Plans */}
      <HomeSection
        id="plans"
        classname="text-white h-auto relative pb-20"
        background="url(/home/curve-grey.svg) 50% 450px  no-repeat #050505"
      >
        <Plans
          goToSinup
          sectionTitle={
            <div>
              <h2 className="text-[40px] font-light text-center mb-4 leading-[40px]">
                Um plano que se{" "}
                <span className="text-[40px] font-bold text-yellowgreenish text-center xl:mb-0 mt-2 xl:inline-block  ">
                  {" "}
                  adapta
                </span>{" "}
                ao seu negócio
              </h2>
              <p className="text-center font-light mb-10 text-[18px] opacity-75">
                Simule abaixo a quantidade de atendimentos e {BREN_CONSTANTS.SHOW_SIGNUP ? "contrate" : "entre em contato"} agora mesmo
                
              </p>
            </div>
          }
        />
      </HomeSection>

      {/* Testimonials */}
      <HomeSection
        id="testimonials"
        classname="text-white h-auto relative"
        background="#2d2d2d"
      >
        <TestimonialsSection />
      </HomeSection>

      {/* Comparative Chart */}
      <HomeSection
        id="comparative"
        classname=" h-auto relative"
        background="#2d2d2d"
      >
        <ComparativeChartSection />
      </HomeSection>

      {/* Newsletter */}
      <HomeSection
        id="newsletter"
        classname=" h-auto relative"
        background="url(/home/newsletter_bg.webp) no-repeat #050505"
      >
        <NewsletterSignup />
      </HomeSection>

      {/* FAQ */}
      <HomeSection id="faq" background="#2d2d2d">
        <FAQSection />
      </HomeSection>
      <Footer showDarkModeSwitch={false} />
    </main>
  );
}
