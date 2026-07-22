import React, { useState, useRef } from "react";
import {
  X,
  Lock,
  LogOut,
  Upload,
  Plus,
  Trash2,
  Edit2,
  Check,
  Phone,
  MessageSquare,
  Image as ImageIcon,
  Sliders,
  Settings,
  HelpCircle,
  FileText,
  Download,
  RotateCcw,
  Eye,
  Key,
  Layers,
  Building
} from "lucide-react";
import { useCms, DEFAULT_ADMIN_PIN } from "../context/CmsContext";
import { compressAndReadFile } from "../utils/imageCompressor";
import { BeforeAfterItem, GalleryItem, Service, FAQItem, CustomerLead } from "../types";

export default function AdminModal() {
  const {
    data,
    isAdminOpen,
    isLoggedIn,
    adminPin,
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
    updateLeadStatus,
    deleteLead,
    resetToDefaults,
    importJson
  } = useCms();

  const [activeTab, setActiveTab] = useState<
    "leads" | "info" | "siteImages" | "beforeAfter" | "gallery" | "services" | "faq" | "export"
  >("leads");

  // Login PIN state
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  // New Pin state inside settings
  const [newPin, setNewPin] = useState("");
  const [pinSuccessMsg, setPinSuccessMsg] = useState("");

  // Business config form state
  const [configForm, setConfigForm] = useState(data.config);

  // Before After editing state
  const [editingBa, setEditingBa] = useState<BeforeAfterItem | null>(null);
  const [newBa, setNewBa] = useState<Omit<BeforeAfterItem, "id">>({
    title: "",
    category: "מתכת",
    beforeImage: "",
    afterImage: "",
    description: ""
  });
  const [isAddingBa, setIsAddingBa] = useState(false);

  // Gallery editing state
  const [editingGallery, setEditingGallery] = useState<GalleryItem | null>(null);
  const [newGallery, setNewGallery] = useState<Omit<GalleryItem, "id">>({
    title: "",
    category: "מתכת",
    image: "",
    description: ""
  });
  const [isAddingGallery, setIsAddingGallery] = useState(false);

  // Service editing state
  const [newService, setNewService] = useState<Omit<Service, "id">>({
    title: "",
    description: "",
    iconName: "Sparkles"
  });
  const [isAddingService, setIsAddingService] = useState(false);

  // FAQ editing state
  const [newFaq, setNewFaq] = useState<Omit<FAQItem, "id">>({
    question: "",
    answer: ""
  });
  const [isAddingFaq, setIsAddingFaq] = useState(false);

  // Image upload loading & notification state
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isAdminOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(pinInput)) {
      setPinError(false);
      setPinInput("");
    } else {
      setPinError(true);
    }
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig(configForm);
    setSaveSuccessMsg("פרטי העסק עודכנו בהצלחה!");
    setTimeout(() => setSaveSuccessMsg(""), 4000);
  };

  const handlePinChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.trim().length >= 4) {
      changeAdminPin(newPin.trim());
      setPinSuccessMsg("הקוד שונה בהצלחה!");
      setNewPin("");
      setTimeout(() => setPinSuccessMsg(""), 3000);
    } else {
      alert("קוד הגישה חייב להכיל לפחות 4 תווים");
    }
  };

  // Image Upload Handler
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    callback: (dataUrl: string) => void,
    keyIdentifier?: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (keyIdentifier) setUploadingKey(keyIdentifier);
    try {
      // Compress to max 1000px width with 0.8 quality for ultra-fast loading & high quality
      const dataUrl = await compressAndReadFile(file, 1000, 0.8);
      callback(dataUrl);
      setSaveSuccessMsg("התמונה עודכנה ונשמרה בהצלחה באתר!");
      setTimeout(() => setSaveSuccessMsg(""), 4000);
    } catch (err) {
      alert("שגיאה בטעינת התמונה, אנא נסה תמונה אחרת");
    } finally {
      setUploadingKey(null);
      if (e.target) e.target.value = "";
    }
  };

  // Export JSON Backup
  const handleExportJson = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ali_ibrahim_cms_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON Backup
  const handleImportJsonFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (importJson(content)) {
        alert("התוכן והתמונות יובאו בהצלחה!");
      } else {
        alert("קובץ הגיבוי אינו תקין");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const unreadLeadsCount = data.leads?.filter((l) => l.status === "חדש").length || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto" dir="rtl">
      <div className="relative w-full max-w-5xl bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl text-zinc-100 my-8 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950">
          <div className="flex items-center space-x-reverse space-x-3">
            <div className="p-2 bg-orange-500/20 text-orange-400 rounded-lg">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">מערכת ניהול תוכן ותמונות (CMS)</h2>
              <p className="text-xs text-zinc-400">עריכה ועדכון בזמן אמת - עלי איבראהים</p>
            </div>
          </div>
          <button
            onClick={closeAdmin}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
            title="סגור חלון ניהול"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Login Screen */}
        {!isLoggedIn ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-6 my-auto">
            <div className="w-16 h-16 bg-orange-600/20 text-orange-500 rounded-full flex items-center justify-center shadow-inner">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white">כניסת מנהל האתר</h3>
              <p className="text-sm text-zinc-400 mt-1">הזן קוד גישה לניהול תוכן האתר, העלאת תמונות וצפייה בפניות</p>
            </div>

            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
              <div>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="הזן קוד גישה (ברירת מחדל: 1234)"
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-center text-xl text-white font-mono focus:border-orange-500 focus:outline-none"
                  autoFocus
                />
                {pinError && (
                  <p className="text-xs text-red-400 mt-2 font-medium">קוד שגוי! נסה שוב (קוד ברירת המחדל: 1234)</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2"
              >
                <span>כניסה למערכת הניהול</span>
              </button>
            </form>

            <div className="p-4 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-xs text-zinc-400 max-w-sm text-right">
              <p className="font-bold text-zinc-300 mb-1">💡 טיפ לבעל האתר:</p>
              <p>תוכל להעלות תמונות ישירות מהנייד או המחשב. כל התמונות נשמרות באופן מאובטח ומתעדכנות באופן מיידי באתר.</p>
            </div>
          </div>
        ) : (
          /* Logged In Dashboard Interface */
          <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
            
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-zinc-950 border-b md:border-b-0 md:border-l border-zinc-800 p-3 flex md:flex-col justify-between overflow-x-auto shrink-0 space-x-reverse space-x-1 md:space-x-0 md:space-y-1">
              <div className="flex md:flex-col space-x-reverse space-x-1 md:space-x-0 md:space-y-1 w-full">
                
                {/* Leads Tab */}
                <button
                  onClick={() => setActiveTab("leads")}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                    activeTab === "leads"
                      ? "bg-orange-600 text-white font-bold shadow"
                      : "text-zinc-300 hover:bg-zinc-800/80 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <MessageSquare className="w-4 h-4" />
                    <span>פניות ולידים</span>
                  </div>
                  {unreadLeadsCount > 0 && (
                    <span className="px-2 py-0.5 text-xs bg-red-500 text-white rounded-full font-bold">
                      {unreadLeadsCount}
                    </span>
                  )}
                </button>

                {/* Main Images Tab */}
                <button
                  onClick={() => setActiveTab("siteImages")}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                    activeTab === "siteImages"
                      ? "bg-orange-600 text-white font-bold shadow"
                      : "text-zinc-300 hover:bg-zinc-800/80 hover:text-white"
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>תמונות ראשיות</span>
                </button>

                {/* Before After Tab */}
                <button
                  onClick={() => setActiveTab("beforeAfter")}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                    activeTab === "beforeAfter"
                      ? "bg-orange-600 text-white font-bold shadow"
                      : "text-zinc-300 hover:bg-zinc-800/80 hover:text-white"
                  }`}
                >
                  <Sliders className="w-4 h-4" />
                  <span>לפני ואחרי</span>
                </button>

                {/* Gallery Tab */}
                <button
                  onClick={() => setActiveTab("gallery")}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                    activeTab === "gallery"
                      ? "bg-orange-600 text-white font-bold shadow"
                      : "text-zinc-300 hover:bg-zinc-800/80 hover:text-white"
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>גלריית עבודות</span>
                </button>

                {/* Services Tab */}
                <button
                  onClick={() => setActiveTab("services")}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                    activeTab === "services"
                      ? "bg-orange-600 text-white font-bold shadow"
                      : "text-zinc-300 hover:bg-zinc-800/80 hover:text-white"
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>שירותים</span>
                </button>

                {/* FAQ Tab */}
                <button
                  onClick={() => setActiveTab("faq")}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                    activeTab === "faq"
                      ? "bg-orange-600 text-white font-bold shadow"
                      : "text-zinc-300 hover:bg-zinc-800/80 hover:text-white"
                  }`}
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>שאלות ותשובות</span>
                </button>

                {/* Business Info Tab */}
                <button
                  onClick={() => setActiveTab("info")}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                    activeTab === "info"
                      ? "bg-orange-600 text-white font-bold shadow"
                      : "text-zinc-300 hover:bg-zinc-800/80 hover:text-white"
                  }`}
                >
                  <Building className="w-4 h-4" />
                  <span>פרטי עסק וטלפון</span>
                </button>

                {/* Backup & Export Tab */}
                <button
                  onClick={() => setActiveTab("export")}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                    activeTab === "export"
                      ? "bg-orange-600 text-white font-bold shadow"
                      : "text-zinc-300 hover:bg-zinc-800/80 hover:text-white"
                  }`}
                >
                  <Download className="w-4 h-4" />
                  <span>גיבוי וייצוא</span>
                </button>
              </div>

              {/* Logout button */}
              <div className="pt-2 md:border-t border-zinc-800 mt-2 shrink-0">
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-red-400 hover:bg-zinc-900 transition w-full"
                >
                  <LogOut className="w-4 h-4" />
                  <span>יציאה ממערכת הניהול</span>
                </button>
              </div>
            </div>

            {/* Main Content Body */}
            <div className="flex-grow p-4 sm:p-6 overflow-y-auto bg-zinc-900 space-y-6">

              {/* Global Save Notification Toast */}
              {saveSuccessMsg && (
                <div className="p-3.5 bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 rounded-xl text-xs font-bold flex items-center justify-between shadow-lg animate-fade-in">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{saveSuccessMsg}</span>
                  </div>
                  <button onClick={() => setSaveSuccessMsg("")} className="text-emerald-400 hover:text-white p-1">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              
              {/* TAB: LEADS */}
              {activeTab === "leads" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <span>פניות ופניות מחיר מלקוחות האתר</span>
                        <span className="text-xs px-2.5 py-0.5 bg-orange-500/20 text-orange-400 rounded-full border border-orange-500/30">
                          {data.leads?.length || 0} פניות
                        </span>
                      </h3>
                      <p className="text-xs text-zinc-400">פניות שנשלחו דרך טופס האתר המהיר</p>
                    </div>
                  </div>

                  {!data.leads || data.leads.length === 0 ? (
                    <div className="p-8 text-center bg-zinc-800/40 rounded-2xl border border-zinc-800 text-zinc-400">
                      אין פניות חדשות עדיין. כשיבואו פניות מהטופס הן יופיעו כאן.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {data.leads.map((lead) => (
                        <div
                          key={lead.id}
                          className={`p-4 rounded-xl border transition ${
                            lead.status === "חדש"
                              ? "bg-orange-950/20 border-orange-500/50"
                              : "bg-zinc-800/60 border-zinc-700/60"
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-base">{lead.name}</span>
                              <span className="text-xs text-zinc-400 font-mono">({lead.date})</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <select
                                value={lead.status}
                                onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                                className="px-3 py-1 bg-zinc-900 border border-zinc-700 rounded-lg text-xs font-semibold text-zinc-200 focus:outline-none"
                              >
                                <option value="חדש">🔴 חדש</option>
                                <option value="בטיפול">🟡 בטיפול</option>
                                <option value="נסגר">🟢 נסגר בהצלחה</option>
                                <option value="בוטל">⚪ בוטל</option>
                              </select>
                              <button
                                onClick={() => deleteLead(lead.id)}
                                className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-zinc-800 rounded-lg transition"
                                title="מחק פנייה"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-zinc-300 bg-zinc-900/60 p-3 rounded-lg border border-zinc-800/80 mb-3">
                            <div>
                              <span className="text-zinc-500 block">טלפון:</span>
                              <a href={`tel:${lead.phone}`} className="font-bold text-orange-400 hover:underline">
                                {lead.phone}
                              </a>
                            </div>
                            <div>
                              <span className="text-zinc-500 block">סוג השירות:</span>
                              <span className="font-semibold text-zinc-200">{lead.serviceType}</span>
                            </div>
                            {lead.location && (
                              <div>
                                <span className="text-zinc-500 block">אזור / עיר:</span>
                                <span>{lead.location}</span>
                              </div>
                            )}
                          </div>

                          {lead.notes && (
                            <p className="text-xs text-zinc-300 italic bg-zinc-950/40 p-2.5 rounded-lg border border-zinc-800">
                              "{lead.notes}"
                            </p>
                          )}

                          <div className="mt-3 flex justify-end">
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                `שלום ${lead.name}, פנית אלינו דרך האתר בנוגע ל${lead.serviceType}. אשמח לתת לך פרטים!`
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded-lg text-xs font-bold transition"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>פתח שיחה בוואטסאפ</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB: SITE MAIN IMAGES */}
              {activeTab === "siteImages" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white">תמונות ראשיות של האתר</h3>
                    <p className="text-xs text-zinc-400">
                      העלה תמונה חדשה מהמחשב או הנייד להחלפת התמונות המרכזיות באתר.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Hero Image Slot */}
                    <div className="p-4 bg-zinc-800/60 rounded-xl border border-zinc-700/60 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-white">תמונת רקע ראשית (Hero)</span>
                        <span className="text-[10px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded">באנר ראשי</span>
                      </div>
                      <div className="relative h-40 rounded-lg overflow-hidden border border-zinc-700 bg-zinc-900 group">
                        <img
                          src={data.config.images.hero}
                          alt="Hero"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex gap-2">
                        <label className="flex-1 cursor-pointer py-2 px-3 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold rounded-lg text-center transition flex items-center justify-center gap-1.5">
                          <Upload className="w-4 h-4" />
                          <span>העלה תמונה חדשה</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, (url) => updateImageKey("hero", url), "hero")}
                          />
                        </label>
                      </div>
                    </div>

                    {/* Action Image Slot */}
                    <div className="p-4 bg-zinc-800/60 rounded-xl border border-zinc-700/60 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-white">תמונת עובד בפעולה (Action)</span>
                        <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">אזור אודות</span>
                      </div>
                      <div className="relative h-40 rounded-lg overflow-hidden border border-zinc-700 bg-zinc-900 group">
                        <img
                          src={data.config.images.action}
                          alt="Action"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex gap-2">
                        <label className="flex-1 cursor-pointer py-2 px-3 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold rounded-lg text-center transition flex items-center justify-center gap-1.5">
                          <Upload className="w-4 h-4" />
                          <span>העלה תמונה חדשה</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, (url) => updateImageKey("action", url), "action")}
                          />
                        </label>
                      </div>
                    </div>

                    {/* Gate Before */}
                    <div className="p-4 bg-zinc-800/60 rounded-xl border border-zinc-700/60 space-y-3">
                      <span className="font-bold text-sm text-white block">שער - תמונת 'לפני'</span>
                      <div className="relative h-32 rounded-lg overflow-hidden border border-zinc-700 bg-zinc-900">
                        <img src={data.config.images.gateBefore} alt="Gate Before" className="w-full h-full object-cover" />
                      </div>
                      <label className="block cursor-pointer py-2 px-3 bg-zinc-700 hover:bg-zinc-600 text-white text-xs font-bold rounded-lg text-center transition">
                        <Upload className="w-3.5 h-3.5 inline ml-1" />
                        החלף תמונה
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (url) => updateImageKey("gateBefore", url))}
                        />
                      </label>
                    </div>

                    {/* Gate After */}
                    <div className="p-4 bg-zinc-800/60 rounded-xl border border-zinc-700/60 space-y-3">
                      <span className="font-bold text-sm text-white block">שער - תמונת 'אחרי'</span>
                      <div className="relative h-32 rounded-lg overflow-hidden border border-zinc-700 bg-zinc-900">
                        <img src={data.config.images.gateAfter} alt="Gate After" className="w-full h-full object-cover" />
                      </div>
                      <label className="block cursor-pointer py-2 px-3 bg-zinc-700 hover:bg-zinc-600 text-white text-xs font-bold rounded-lg text-center transition">
                        <Upload className="w-3.5 h-3.5 inline ml-1" />
                        החלף תמונה
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (url) => updateImageKey("gateAfter", url))}
                        />
                      </label>
                    </div>

                    {/* Rim Before */}
                    <div className="p-4 bg-zinc-800/60 rounded-xl border border-zinc-700/60 space-y-3">
                      <span className="font-bold text-sm text-white block">ג'אנט רכב - תמונת 'לפני'</span>
                      <div className="relative h-32 rounded-lg overflow-hidden border border-zinc-700 bg-zinc-900">
                        <img src={data.config.images.rimBefore} alt="Rim Before" className="w-full h-full object-cover" />
                      </div>
                      <label className="block cursor-pointer py-2 px-3 bg-zinc-700 hover:bg-zinc-600 text-white text-xs font-bold rounded-lg text-center transition">
                        <Upload className="w-3.5 h-3.5 inline ml-1" />
                        החלף תמונה
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (url) => updateImageKey("rimBefore", url))}
                        />
                      </label>
                    </div>

                    {/* Rim After */}
                    <div className="p-4 bg-zinc-800/60 rounded-xl border border-zinc-700/60 space-y-3">
                      <span className="font-bold text-sm text-white block">ג'אנט רכב - תמונת 'אחרי'</span>
                      <div className="relative h-32 rounded-lg overflow-hidden border border-zinc-700 bg-zinc-900">
                        <img src={data.config.images.rimAfter} alt="Rim After" className="w-full h-full object-cover" />
                      </div>
                      <label className="block cursor-pointer py-2 px-3 bg-zinc-700 hover:bg-zinc-600 text-white text-xs font-bold rounded-lg text-center transition">
                        <Upload className="w-3.5 h-3.5 inline ml-1" />
                        החלף תמונה
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (url) => updateImageKey("rimAfter", url))}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: BEFORE & AFTER CARDS */}
              {activeTab === "beforeAfter" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white">גלריית לפני ואחרי</h3>
                      <p className="text-xs text-zinc-400">נהל והוסף השוואות לפני ואחרי עם סליידר דינמי</p>
                    </div>
                    <button
                      onClick={() => setIsAddingBa(true)}
                      className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>הוסף השוואה חדשה</span>
                    </button>
                  </div>

                  {/* Add New Before After Form */}
                  {isAddingBa && (
                    <div className="p-5 bg-zinc-800 border border-orange-500/40 rounded-2xl space-y-4">
                      <h4 className="font-bold text-white text-sm">הוספת פריט לפני ואחרי חדש</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block text-zinc-400 mb-1">כותרת העבודה</label>
                          <input
                            type="text"
                            value={newBa.title}
                            onChange={(e) => setNewBa({ ...newBa, title: e.target.value })}
                            placeholder="לדוגמה: שער ברזל ישן"
                            className="w-full p-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-zinc-400 mb-1">קטגוריה</label>
                          <select
                            value={newBa.category}
                            onChange={(e) => setNewBa({ ...newBa, category: e.target.value })}
                            className="w-full p-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-white"
                          >
                            <option value="מתכת">מתכת</option>
                            <option value="חלודה">חלודה</option>
                            <option value="אבן ובטון">אבן ובטון</option>
                            <option value="ציוד וחלקים">ציוד וחלקים</option>
                            <option value="צבע ישן">צבע ישן</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-zinc-400 mb-1 text-xs">תיאור העבודה והתוצאה</label>
                        <textarea
                          value={newBa.description}
                          onChange={(e) => setNewBa({ ...newBa, description: e.target.value })}
                          rows={2}
                          className="w-full p-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-xs"
                          placeholder="תיאור קצר על סוג הניקוי שבוצע..."
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Before Image */}
                        <div className="space-y-2">
                          <label className="block text-xs font-bold text-zinc-300">תמונת 'לפני'</label>
                          {newBa.beforeImage ? (
                            <img src={newBa.beforeImage} alt="Before" className="h-32 w-full object-cover rounded-lg" />
                          ) : (
                            <div className="h-32 border-2 border-dashed border-zinc-700 rounded-lg flex items-center justify-center text-zinc-500 text-xs">
                              טרם נבחרה תמונה
                            </div>
                          )}
                          <label className="block cursor-pointer py-2 px-3 bg-zinc-700 hover:bg-zinc-600 text-white text-xs font-bold rounded-lg text-center transition">
                            <Upload className="w-3.5 h-3.5 inline ml-1" />
                            בחר תמונת לפני
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, (url) => setNewBa({ ...newBa, beforeImage: url }))}
                            />
                          </label>
                        </div>

                        {/* After Image */}
                        <div className="space-y-2">
                          <label className="block text-xs font-bold text-zinc-300">תמונת 'אחרי'</label>
                          {newBa.afterImage ? (
                            <img src={newBa.afterImage} alt="After" className="h-32 w-full object-cover rounded-lg" />
                          ) : (
                            <div className="h-32 border-2 border-dashed border-zinc-700 rounded-lg flex items-center justify-center text-zinc-500 text-xs">
                              טרם נבחרה תמונה
                            </div>
                          )}
                          <label className="block cursor-pointer py-2 px-3 bg-zinc-700 hover:bg-zinc-600 text-white text-xs font-bold rounded-lg text-center transition">
                            <Upload className="w-3.5 h-3.5 inline ml-1" />
                            בחר תמונת אחרי
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, (url) => setNewBa({ ...newBa, afterImage: url }))}
                            />
                          </label>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          onClick={() => setIsAddingBa(false)}
                          className="px-4 py-2 bg-zinc-700 text-zinc-300 rounded-lg text-xs"
                        >
                          ביטול
                        </button>
                        <button
                          onClick={() => {
                            if (!newBa.title || !newBa.beforeImage || !newBa.afterImage) {
                              alert("אנא מלא כותרת והעלה תמונות לפני ואחרי");
                              return;
                            }
                            addBeforeAfter(newBa);
                            setIsAddingBa(false);
                            setNewBa({ title: "", category: "מתכת", beforeImage: "", afterImage: "", description: "" });
                          }}
                          className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-bold"
                        >
                          שמור השוואה
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Existing Before After List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.beforeAfterItems?.map((item) => (
                      <div key={item.id} className="p-4 bg-zinc-800/60 rounded-xl border border-zinc-700/60 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-sm">{item.title}</span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => deleteBeforeAfter(item.id)}
                              className="p-1.5 text-zinc-400 hover:text-red-400 rounded-lg transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="relative">
                            <span className="absolute top-1 right-1 text-[9px] bg-red-600/80 text-white px-1.5 py-0.5 rounded">לפני</span>
                            <img src={item.beforeImage} alt="Before" className="h-28 w-full object-cover rounded-lg border border-zinc-700" />
                          </div>
                          <div className="relative">
                            <span className="absolute top-1 right-1 text-[9px] bg-green-600/80 text-white px-1.5 py-0.5 rounded">אחרי</span>
                            <img src={item.afterImage} alt="After" className="h-28 w-full object-cover rounded-lg border border-zinc-700" />
                          </div>
                        </div>

                        <p className="text-xs text-zinc-400">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: GALLERY ITEMS */}
              {activeTab === "gallery" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white">גלריית עבודות שבוצעו</h3>
                      <p className="text-xs text-zinc-400">נהל את תמונות הפרויקטים המופיעות בגלריה</p>
                    </div>
                    <button
                      onClick={() => setIsAddingGallery(true)}
                      className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>הוסף תמונה לגלריה</span>
                    </button>
                  </div>

                  {/* Add Gallery Item Form */}
                  {isAddingGallery && (
                    <div className="p-5 bg-zinc-800 border border-orange-500/40 rounded-2xl space-y-4">
                      <h4 className="font-bold text-white text-sm">הוספת פרויקט חדש לגלריה</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block text-zinc-400 mb-1">כותרת התמונה</label>
                          <input
                            type="text"
                            value={newGallery.title}
                            onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })}
                            placeholder="כותרת התמונה..."
                            className="w-full p-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-zinc-400 mb-1">קטגוריה</label>
                          <select
                            value={newGallery.category}
                            onChange={(e) => setNewGallery({ ...newGallery, category: e.target.value })}
                            className="w-full p-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-white"
                          >
                            <option value="מתכת">מתכת</option>
                            <option value="חלודה">חלודה</option>
                            <option value="אבן ובטון">אבן ובטון</option>
                            <option value="ציוד וחלקים">ציוד וחלקים</option>
                            <option value="צבע ישן">צבע ישן</option>
                            <option value="הכנה לצביעה">הכנה לצביעה</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-zinc-400 mb-1 text-xs">תיאור העבודה</label>
                        <input
                          type="text"
                          value={newGallery.description}
                          onChange={(e) => setNewGallery({ ...newGallery, description: e.target.value })}
                          className="w-full p-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-xs"
                          placeholder="תיאור קצר מפורט..."
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-zinc-300 mb-2">תמונה</label>
                        {newGallery.image ? (
                          <img src={newGallery.image} alt="Gallery" className="h-40 w-full object-cover rounded-lg mb-2" />
                        ) : (
                          <div className="h-32 border-2 border-dashed border-zinc-700 rounded-lg flex items-center justify-center text-zinc-500 text-xs mb-2">
                            טרם נבחרה תמונה
                          </div>
                        )}
                        <label className="block cursor-pointer py-2.5 px-3 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold rounded-lg text-center transition">
                          <Upload className="w-4 h-4 inline ml-1" />
                          העלה תמונה מהמכשיר
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, (url) => setNewGallery({ ...newGallery, image: url }))}
                          />
                        </label>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          onClick={() => setIsAddingGallery(false)}
                          className="px-4 py-2 bg-zinc-700 text-zinc-300 rounded-lg text-xs"
                        >
                          ביטול
                        </button>
                        <button
                          onClick={() => {
                            if (!newGallery.title || !newGallery.image) {
                              alert("אנא מלא כותרת והעלה תמונה");
                              return;
                            }
                            addGalleryItem(newGallery);
                            setIsAddingGallery(false);
                            setNewGallery({ title: "", category: "מתכת", image: "", description: "" });
                          }}
                          className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-bold"
                        >
                          הוסף לגלריה
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Existing Gallery Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {data.galleryItems?.map((item) => (
                      <div key={item.id} className="relative group bg-zinc-800 rounded-xl overflow-hidden border border-zinc-700">
                        <img src={item.image} alt={item.title} className="h-36 w-full object-cover" />
                        <div className="p-2 bg-zinc-900">
                          <span className="text-xs font-bold text-white block truncate">{item.title}</span>
                          <span className="text-[10px] text-orange-400 block">{item.category}</span>
                        </div>
                        <button
                          onClick={() => deleteGalleryItem(item.id)}
                          className="absolute top-2 left-2 p-1.5 bg-black/70 hover:bg-red-600 text-white rounded-lg transition"
                          title="מחק"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: SERVICES */}
              {activeTab === "services" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white">רשימת השירותים באתר</h3>
                      <p className="text-xs text-zinc-400">הוסף, ערוך או מחק את כרטיסי השירותים</p>
                    </div>
                    <button
                      onClick={() => setIsAddingService(true)}
                      className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>הוסף שירות חדש</span>
                    </button>
                  </div>

                  {isAddingService && (
                    <div className="p-4 bg-zinc-800 border border-orange-500/40 rounded-xl space-y-3">
                      <h4 className="font-bold text-white text-xs">שירות חדש</h4>
                      <input
                        type="text"
                        placeholder="שם השירות..."
                        value={newService.title}
                        onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                        className="w-full p-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-xs"
                      />
                      <textarea
                        placeholder="תיאור השירות..."
                        value={newService.description}
                        onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                        rows={2}
                        className="w-full p-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-xs"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setIsAddingService(false)}
                          className="px-3 py-1.5 bg-zinc-700 text-zinc-300 rounded text-xs"
                        >
                          ביטול
                        </button>
                        <button
                          onClick={() => {
                            if (!newService.title) return;
                            addService(newService);
                            setIsAddingService(false);
                            setNewService({ title: "", description: "", iconName: "Sparkles" });
                          }}
                          className="px-3 py-1.5 bg-orange-600 text-white rounded text-xs font-bold"
                        >
                          שמור
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    {data.services?.map((srv) => (
                      <div key={srv.id} className="p-4 bg-zinc-800/60 rounded-xl border border-zinc-700/60 flex justify-between items-start gap-3">
                        <div>
                          <h4 className="font-bold text-white text-sm">{srv.title}</h4>
                          <p className="text-xs text-zinc-400 mt-1">{srv.description}</p>
                        </div>
                        <button
                          onClick={() => deleteService(srv.id)}
                          className="p-1.5 text-zinc-400 hover:text-red-400 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: FAQ */}
              {activeTab === "faq" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white">שאלות ותשובות נפוצות</h3>
                      <p className="text-xs text-zinc-400">נהל את רשימת השאלות והתשובות בדף הבית</p>
                    </div>
                    <button
                      onClick={() => setIsAddingFaq(true)}
                      className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>הוסף שאלה חדשה</span>
                    </button>
                  </div>

                  {isAddingFaq && (
                    <div className="p-4 bg-zinc-800 border border-orange-500/40 rounded-xl space-y-3">
                      <input
                        type="text"
                        placeholder="השאלה..."
                        value={newFaq.question}
                        onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                        className="w-full p-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-xs"
                      />
                      <textarea
                        placeholder="התשובה..."
                        value={newFaq.answer}
                        onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                        rows={2}
                        className="w-full p-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-xs"
                      />
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setIsAddingFaq(false)} className="px-3 py-1.5 bg-zinc-700 text-zinc-300 rounded text-xs">
                          ביטול
                        </button>
                        <button
                          onClick={() => {
                            if (!newFaq.question || !newFaq.answer) return;
                            addFaq(newFaq);
                            setIsAddingFaq(false);
                            setNewFaq({ question: "", answer: "" });
                          }}
                          className="px-3 py-1.5 bg-orange-600 text-white rounded text-xs font-bold"
                        >
                          שמור שאלה
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    {data.faqItems?.map((faq) => (
                      <div key={faq.id} className="p-4 bg-zinc-800/60 rounded-xl border border-zinc-700/60 flex justify-between items-start gap-3">
                        <div className="space-y-1">
                          <h4 className="font-bold text-white text-xs">{faq.question}</h4>
                          <p className="text-xs text-zinc-400">{faq.answer}</p>
                        </div>
                        <button onClick={() => deleteFaq(faq.id)} className="p-1.5 text-zinc-400 hover:text-red-400 transition">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: BUSINESS INFO */}
              {activeTab === "info" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white">פרטי עסק וטלפון הוואטסאפ</h3>
                    <p className="text-xs text-zinc-400">עדכן את השמות, מספרי הטלפון והודעת הברירת מחדל</p>
                  </div>

                  <form onSubmit={handleSaveConfig} className="space-y-4 max-w-xl">
                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-1">שם העסק / בעל העסק</label>
                      <input
                        type="text"
                        value={configForm.businessName}
                        onChange={(e) => setConfigForm({ ...configForm, businessName: e.target.value })}
                        className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-1">כותרת משנה</label>
                      <input
                        type="text"
                        value={configForm.businessSubTitle}
                        onChange={(e) => setConfigForm({ ...configForm, businessSubTitle: e.target.value })}
                        className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-1">
                        מספר וואטסאפ לקבלת הודעות (כולל קידומת מדינה)
                      </label>
                      <input
                        type="text"
                        value={configForm.whatsappPhone}
                        onChange={(e) => setConfigForm({ ...configForm, whatsappPhone: e.target.value })}
                        placeholder="לדוגמה: 9725395629817"
                        className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white text-sm font-mono dir-ltr text-right"
                      />
                      <p className="text-[11px] text-zinc-500 mt-1">לדוגמה עבור 053-95629817 הזינו 9725395629817</p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-1">הודעת פנייה ברירת מחדל בוואטסאפ</label>
                      <textarea
                        value={configForm.defaultMessage}
                        onChange={(e) => setConfigForm({ ...configForm, defaultMessage: e.target.value })}
                        rows={3}
                        className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl text-sm transition"
                    >
                      שמור שינויים בפרטי העסק
                    </button>
                  </form>

                  <div className="pt-6 border-t border-zinc-800 max-w-xl space-y-4">
                    <h4 className="font-bold text-white text-sm flex items-center gap-2">
                      <Key className="w-4 h-4 text-orange-400" />
                      <span>שינוי קוד גישה למערכת הניהול</span>
                    </h4>
                    <form onSubmit={handlePinChangeSubmit} className="flex gap-2">
                      <input
                        type="password"
                        value={newPin}
                        onChange={(e) => setNewPin(e.target.value)}
                        placeholder="קוד חדש (לפחות 4 ספרות)"
                        className="flex-1 p-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white text-sm font-mono"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 bg-zinc-700 hover:bg-zinc-600 text-white font-bold rounded-xl text-xs"
                      >
                        עדכן קוד
                      </button>
                    </form>
                    {pinSuccessMsg && <p className="text-xs text-green-400 font-bold">{pinSuccessMsg}</p>}
                  </div>
                </div>
              )}

              {/* TAB: BACKUP & EXPORT */}
              {activeTab === "export" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white">גיבוי, ייבוא וייצוא נתונים</h3>
                    <p className="text-xs text-zinc-400">
                      שמור גיבוי מלא של התוכן והתמונות, או ייבא גיבוי למכשיר חדש או להוסטנגר (Hostinger).
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Export JSON */}
                    <div className="p-5 bg-zinc-800/60 rounded-2xl border border-zinc-700/60 space-y-3">
                      <div className="w-10 h-10 bg-orange-500/20 text-orange-400 rounded-xl flex items-center justify-center">
                        <Download className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-white text-sm">הורדת גיבוי מלא (JSON)</h4>
                      <p className="text-xs text-zinc-400">
                        מוריד קובץ נתונים הכולל את כל השינויים, הטקסטים והתמונות שהעלית.
                      </p>
                      <button
                        onClick={handleExportJson}
                        className="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold rounded-xl transition"
                      >
                        הורד קובץ גיבוי
                      </button>
                    </div>

                    {/* Import JSON */}
                    <div className="p-5 bg-zinc-800/60 rounded-2xl border border-zinc-700/60 space-y-3">
                      <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center">
                        <Upload className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-white text-sm">ייבוא קובץ גיבוי</h4>
                      <p className="text-xs text-zinc-400">
                        שחזר תוכן ותמונות מקובץ גיבוי קיים שהורדת מראש.
                      </p>
                      <label className="block w-full py-2.5 bg-zinc-700 hover:bg-zinc-600 text-white text-xs font-bold rounded-xl text-center transition cursor-pointer">
                        בחר קובץ גיבוי לייבוא
                        <input
                          type="file"
                          accept=".json"
                          className="hidden"
                          onChange={handleImportJsonFile}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Reset to Defaults */}
                  <div className="pt-6 border-t border-zinc-800 p-4 bg-red-950/20 border-red-500/30 rounded-2xl space-y-2">
                    <h4 className="font-bold text-red-400 text-sm flex items-center gap-2">
                      <RotateCcw className="w-4 h-4" />
                      <span>איפוס נתונים להגדרות המקוריות</span>
                    </h4>
                    <p className="text-xs text-zinc-400">
                      פעולה זו תאפס את כל התמונות והטקסטים באתר לתוכן ברירת המחדל הראשוני.
                    </p>
                    <button
                      onClick={resetToDefaults}
                      className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl transition"
                    >
                      אפס את כל הנתונים לברירת מחדל
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
