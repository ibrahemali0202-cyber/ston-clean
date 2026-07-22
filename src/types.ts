/**
 * הגדרות טיפוסים עבור פרויקט עלי איבראהים - ניקוי חול בהתזה
 */

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string; // שם האייקון מתוך lucide-react
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  iconName: string;
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  category: string;
  beforeImage: string;
  afterImage: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  category: string;
  image: string;
  title: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface BusinessConfig {
  businessName: string;
  businessSubTitle: string;
  whatsappPhone: string;
  defaultMessage: string;
  images: {
    hero: string;
    gateBefore: string;
    gateAfter: string;
    rimBefore: string;
    rimAfter: string;
    wallBefore: string;
    wallAfter: string;
    action: string;
    [key: string]: string;
  };
}

export interface CustomerLead {
  id: string;
  name: string;
  phone: string;
  location?: string;
  serviceType: string;
  notes: string;
  date: string;
  status: "חדש" | "בטיפול" | "נסגר" | "בוטל";
}

export interface CmsData {
  config: BusinessConfig;
  services: Service[];
  benefits: Benefit[];
  processSteps: ProcessStep[];
  beforeAfterItems: BeforeAfterItem[];
  galleryItems: GalleryItem[];
  faqItems: FAQItem[];
  leads: CustomerLead[];
}

