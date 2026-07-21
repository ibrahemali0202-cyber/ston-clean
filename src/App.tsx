import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Benefits from "./components/Benefits";
import Process from "./components/Process";
import BeforeAfter from "./components/BeforeAfter";
import Gallery from "./components/Gallery";
import LeadForm from "./components/LeadForm";
import FAQ from "./components/FAQ";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");

  // מעקב אחר הגלילה לסימון אוטומטי של הקישור הפעיל בתפריט הניווט
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "services", "process", "before-after", "gallery", "faq"];
      const scrollPosition = window.scrollY + 120; // הוספת היסט קטן עבור ה-Header הקבוע

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // הרצת בדיקה ראשונית
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-coal-950 font-sans" dir="rtl" id="app-root">
      
      {/* תפריט ניווט עליון קבוע */}
      <Header activeSection={activeSection} />

      {/* אזור גלילה מרכזי */}
      <main className="flex-grow pb-16 sm:pb-0" id="main-content-scroll">
        
        {/* אזור פתיחה Hero */}
        <Hero />

        {/* אודות */}
        <About />

        {/* שירותי ניקוי והתזה */}
        <Services />

        {/* למה לבחור בניקוי חול - יתרונות */}
        <Benefits />

        {/* כיצד מתבצעת העבודה - שלבים */}
        <Process />

        {/* גלריית השוואה לפני ואחרי */}
        <BeforeAfter />

        {/* גלריית עבודות רחבה */}
        <Gallery />

        {/* טופס הצעת מחיר מהירה ישירות לוואטסאפ */}
        <LeadForm />

        {/* שאלות ותשובות נפוצות */}
        <FAQ />

        {/* אזור סיום והנעה לפעולה CTA */}
        <CTASection />

      </main>

      {/* פוטר האתר */}
      <Footer />

      {/* כפתור וואטסאפ צף ופס פעולה למובייל */}
      <FloatingWhatsApp />

    </div>
  );
}
