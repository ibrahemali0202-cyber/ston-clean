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
