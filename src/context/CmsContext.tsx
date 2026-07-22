import React, { createContext, useContext, useState, useEffect } from "react";
import {
  CmsData,
  BusinessConfig,
  Service,
  Benefit,
  ProcessStep,
  BeforeAfterItem,
  GalleryItem,
  FAQItem,
  CustomerLead
} from "../types";
import { BUSINESS_CONFIG } from "../config";
import {
  SERVICES_DATA,
  BENEFITS_DATA,
  PROCESS_STEPS,
  BEFORE_AFTER_DATA,
  GALLERY_DATA,
  FAQ_DATA
} from "../data";
import { saveCmsDataToDb, loadCmsDataFromDb } from "../utils/dbStorage";

const STORAGE_KEY = "ali_ibrahim_sandblast_cms_v3";
const ADMIN_PASS_KEY = "ali_ibrahim_admin_pass";

export const DEFAULT_ADMIN_PIN = "1234";

// Helper to sanitize saved image paths (replaces legacy /images/ local paths with CDN defaults)
function sanitizeImages(imagesObj: Record<string, string>): Record<string, string> {
  const result: Record<string, string> = { ...BUSINESS_CONFIG.images, ...(imagesObj || {}) };
  for (const key in result) {
    if (!result[key] || result[key].startsWith("/images/")) {
      result[key] = (BUSINESS_CONFIG.images as any)[key] || result[key];
    }
  }
  return result;
}

const INITIAL_LEADS: CustomerLead[] = [
  {
    id: "lead-1",
    name: "משה כהן",
    phone: "050-1234567",
    location: "חיפה והסביבה",
    serviceType: "הסרת חלודה ממתכת",
    notes: "אשמח לקבל הצעת מחיר לחידוש שער כניסה גדול מברזל.",
    date: new Date(Date.now() - 86400000 * 2).toLocaleDateString("he-IL"),
    status: "חדש"
  },
  {
    id: "lead-2",
    name: "אבי שמעוני",
    phone: "052-9876543",
    location: "קריות",
    serviceType: "ניקוי אבן ובטון",
    notes: "קיר חיצוני מאבן טבעית שסובל מפיח ולכלוך כבד.",
    date: new Date(Date.now() - 86400000 * 5).toLocaleDateString("he-IL"),
    status: "בטיפול"
  }
];

export const INITIAL_CMS_DATA: CmsData = {
  config: BUSINESS_CONFIG,
  services: SERVICES_DATA,
  benefits: BENEFITS_DATA,
  processSteps: PROCESS_STEPS,
  beforeAfterItems: BEFORE_AFTER_DATA,
  galleryItems: GALLERY_DATA,
  faqItems: FAQ_DATA,
  leads: INITIAL_LEADS
};

interface CmsContextType {
  data: CmsData;
  isAdminOpen: boolean;
  isLoggedIn: boolean;
  adminPin: string;
  openAdmin: () => void;
  closeAdmin: () => void;
  login: (pin: string) => boolean;
  logout: () => void;
  changeAdminPin: (newPin: string) => void;
  
  // Update functions
  updateConfig: (newConfig: Partial<BusinessConfig>) => void;
  updateImageKey: (key: string, url: string) => void;
  
  // Before & After
  addBeforeAfter: (item: Omit<BeforeAfterItem, "id">) => void;
  updateBeforeAfter: (item: BeforeAfterItem) => void;
  deleteBeforeAfter: (id: string) => void;
  
  // Gallery
  addGalleryItem: (item: Omit<GalleryItem, "id">) => void;
  updateGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;
  
  // Services
  addService: (service: Omit<Service, "id">) => void;
  updateService: (service: Service) => void;
  deleteService: (id: string) => void;
  
  // FAQ
  addFaq: (faq: Omit<FAQItem, "id">) => void;
  updateFaq: (faq: FAQItem) => void;
  deleteFaq: (id: string) => void;

  // Leads
  addLead: (lead: Omit<CustomerLead, "id" | "date" | "status">) => CustomerLead;
  updateLeadStatus: (id: string, status: CustomerLead["status"]) => void;
  deleteLead: (id: string) => void;

  // Global actions
  resetToDefaults: () => void;
  importJson: (jsonString: string) => boolean;
  getWhatsAppLink: (customMessage?: string) => string;
}

const CmsContext = createContext<CmsContextType | null>(null);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<CmsData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_CMS_DATA,
          ...parsed,
          config: {
            ...INITIAL_CMS_DATA.config,
            ...(parsed.config || {}),
            images: sanitizeImages(parsed.config?.images)
          }
        };
      }
    } catch (e) {
      console.error("Failed to load CMS data from localStorage", e);
    }
    return INITIAL_CMS_DATA;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminPin, setAdminPin] = useState(() => {
    return localStorage.getItem(ADMIN_PASS_KEY) || DEFAULT_ADMIN_PIN;
  });

  // Load from IndexedDB on initial mount if available (to retrieve persistent base64 images)
  useEffect(() => {
    async function loadFromDb() {
      const dbData = await loadCmsDataFromDb();
      if (dbData) {
        setData((prev) => ({
          ...prev,
          ...dbData,
          config: {
            ...prev.config,
            ...(dbData.config || {}),
            images: sanitizeImages(dbData.config?.images)
          }
        }));
      }
    }
    loadFromDb();
  }, []);

  // Save to both IndexedDB and localStorage whenever data changes
  useEffect(() => {
    // Save to IndexedDB (supports large base64 images easily)
    saveCmsDataToDb(data);

    // Save to localStorage as secondary cache
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn("localStorage quota exceeded, relying on IndexedDB storage for images.", e);
    }
  }, [data]);

  const openAdmin = () => setIsAdminOpen(true);
  const closeAdmin = () => setIsAdminOpen(false);

  const login = (inputPin: string) => {
    if (inputPin === adminPin) {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const changeAdminPin = (newPin: string) => {
    setAdminPin(newPin);
    localStorage.setItem(ADMIN_PASS_KEY, newPin);
  };

  const updateConfig = (newConfigPartial: Partial<BusinessConfig>) => {
    setData((prev) => ({
      ...prev,
      config: {
        ...prev.config,
        ...newConfigPartial
      }
    }));
  };

  const updateImageKey = (key: string, url: string) => {
    setData((prev) => ({
      ...prev,
      config: {
        ...prev.config,
        images: {
          ...prev.config.images,
          [key]: url
        }
      }
    }));
  };

  // Before After
  const addBeforeAfter = (item: Omit<BeforeAfterItem, "id">) => {
    const newItem: BeforeAfterItem = {
      ...item,
      id: "ba-" + Date.now()
    };
    setData((prev) => ({
      ...prev,
      beforeAfterItems: [newItem, ...prev.beforeAfterItems]
    }));
  };

  const updateBeforeAfter = (item: BeforeAfterItem) => {
    setData((prev) => ({
      ...prev,
      beforeAfterItems: prev.beforeAfterItems.map((ba) => (ba.id === item.id ? item : ba))
    }));
  };

  const deleteBeforeAfter = (id: string) => {
    setData((prev) => ({
      ...prev,
      beforeAfterItems: prev.beforeAfterItems.filter((ba) => ba.id !== id)
    }));
  };

  // Gallery
  const addGalleryItem = (item: Omit<GalleryItem, "id">) => {
    const newItem: GalleryItem = {
      ...item,
      id: "g-" + Date.now()
    };
    setData((prev) => ({
      ...prev,
      galleryItems: [newItem, ...prev.galleryItems]
    }));
  };

  const updateGalleryItem = (item: GalleryItem) => {
    setData((prev) => ({
      ...prev,
      galleryItems: prev.galleryItems.map((g) => (g.id === item.id ? item : g))
    }));
  };

  const deleteGalleryItem = (id: string) => {
    setData((prev) => ({
      ...prev,
      galleryItems: prev.galleryItems.filter((g) => g.id !== id)
    }));
  };

  // Services
  const addService = (service: Omit<Service, "id">) => {
    const newItem: Service = {
      ...service,
      id: "srv-" + Date.now()
    };
    setData((prev) => ({
      ...prev,
      services: [...prev.services, newItem]
    }));
  };

  const updateService = (service: Service) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === service.id ? service : s))
    }));
  };

  const deleteService = (id: string) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id)
    }));
  };

  // FAQ
  const addFaq = (faq: Omit<FAQItem, "id">) => {
    const newItem: FAQItem = {
      ...faq,
      id: "faq-" + Date.now()
    };
    setData((prev) => ({
      ...prev,
      faqItems: [...prev.faqItems, newItem]
    }));
  };

  const updateFaq = (faq: FAQItem) => {
    setData((prev) => ({
      ...prev,
      faqItems: prev.faqItems.map((f) => (f.id === faq.id ? faq : f))
    }));
  };

  const deleteFaq = (id: string) => {
    setData((prev) => ({
      ...prev,
      faqItems: prev.faqItems.filter((f) => f.id !== id)
    }));
  };

  // Leads
  const addLead = (lead: Omit<CustomerLead, "id" | "date" | "status">) => {
    const newLead: CustomerLead = {
      ...lead,
      id: "lead-" + Date.now(),
      date: new Date().toLocaleDateString("he-IL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      status: "חדש"
    };
    setData((prev) => ({
      ...prev,
      leads: [newLead, ...(prev.leads || [])]
    }));
    return newLead;
  };

  const updateLeadStatus = (id: string, status: CustomerLead["status"]) => {
    setData((prev) => ({
      ...prev,
      leads: prev.leads.map((l) => (l.id === id ? { ...l, status } : l))
    }));
  };

  const deleteLead = (id: string) => {
    setData((prev) => ({
      ...prev,
      leads: prev.leads.filter((l) => l.id !== id)
    }));
  };

  const resetToDefaults = () => {
    if (window.confirm("האם אתה בטוח שברצונך לאפס את כל תוכן האתר והתמונות להגדרות המקוריות?")) {
      setData(INITIAL_CMS_DATA);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const importJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && typeof parsed === "object" && parsed.config) {
        setData(parsed);
        return true;
      }
    } catch (e) {
      console.error("Invalid JSON import", e);
    }
    return false;
  };

  const getWhatsAppLink = (customMessage?: string) => {
    const text = customMessage || data.config.defaultMessage;
    const encoded = encodeURIComponent(text);
    const cleanPhone = data.config.whatsappPhone.replace(/[^0-9]/g, "");
    return `https://wa.me/${cleanPhone}?text=${encoded}`;
  };

  return (
    <CmsContext.Provider
      value={{
        data,
        isAdminOpen,
        isLoggedIn,
        adminPin,
        openAdmin,
        closeAdmin,
        login,
        logout,
        changeAdminPin,
        updateConfig,
        updateImageKey,
        addBeforeAfter,
        updateBeforeAfter,
        deleteBeforeAfter,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        addService,
        updateService,
        deleteService,
        addFaq,
        updateFaq,
        deleteFaq,
        addLead,
        updateLeadStatus,
        deleteLead,
        resetToDefaults,
        importJson,
        getWhatsAppLink
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export function useCms() {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error("useCms must be used within a CmsProvider");
  }
  return context;
}
