import React, { useState } from "react";
import LandingHero from "./components/LandingHero";
import CourseCatalog from "./components/CourseCatalog";
import SmartMatchmaker from "./components/SmartMatchmaker";
import ApplicationPortal from "./components/ApplicationPortal";
import SEOStudyGuides from "./components/SEOStudyGuides";
import BCASLogo from "./components/BCASLogo";
import { Course } from "./types";
import { 
  GraduationCap, 
  Sparkles, 
  Search, 
  MapPin, 
  ChevronRight, 
  Users, 
  Compass, 
  Globe, 
  Layers3, 
  FileCheck2,
  PhoneCall,
  Menu,
  X,
  Check
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleApplyForCourse = (course: Course) => {
    setSelectedCourse(course);
    setActiveTab("portal");
  };

  const handleClearSelectedCourse = () => {
    setSelectedCourse(null);
  };

  const menuItems = [
    { id: "overview", label: "Overview & Placements", icon: Compass },
    { id: "catalog", label: "University Catalog & Compare", icon: Layers3 },
    { id: "guides", label: "Study Destinations & Guides", icon: Globe },
    { id: "matcher", label: "Smart Matchmaker", icon: Sparkles },
    { id: "portal", label: "Application Portal", icon: FileCheck2 }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-150 shadow-sm" id="main-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div 
              onClick={() => setActiveTab("overview")} 
              className="flex items-center cursor-pointer shrink-0"
              id="brand-logo"
            >
              <BCASLogo size="sm" />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex gap-1.5 items-center">
              {menuItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13.5px] font-bold transition-all cursor-pointer ${
                      isActive 
                        ? "bg-blue-50 text-blue-600 border border-blue-100/60" 
                        : "text-slate-600 hover:text-slate-950 hover:bg-slate-50 border border-transparent"
                    }`}
                    id={`nav-tab-${item.id}`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Support Hotline Widget */}
            <div className="hidden lg:flex items-center gap-2.5 bg-slate-900 text-white px-4 py-2 rounded-xl border border-slate-800 shadow-sm">
              <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="text-right">
                <p className="text-[9px] uppercase text-slate-400 leading-none">Senior Counselor</p>
                <p className="text-xs font-mono font-bold mt-0.5">+94 76 141 5273</p>
              </div>
            </div>

            {/* Mobile Menu Actions Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-slate-100 border border-slate-200 cursor-pointer text-slate-700"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Fullscreen Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 py-4 px-6 space-y-2 font-semibold">
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left inline-flex items-center gap-3 py-3 px-4 rounded-xl text-sm transition-all cursor-pointer ${
                    isActive 
                      ? "bg-blue-50 text-blue-600 font-extrabold" 
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <p className="text-xs text-slate-600 font-bold">24/7 Hotline: +94 76 141 5273</p>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Page Content Wrapper Layer */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow">
        {activeTab === "overview" && (
          <LandingHero onNavigate={setActiveTab} />
        )}

        {activeTab === "catalog" && (
          <CourseCatalog onApplyForCourse={handleApplyForCourse} />
        )}

        {activeTab === "guides" && (
          <SEOStudyGuides 
            onApply={(courseName, country) => {
              const mockCourse = {
                id: "guides-quick-apply",
                courseName: courseName,
                universityName: "Partner University",
                country: country,
                tuitionFee: "Scholarships Available",
                intake: "January / September",
                duration: "Full-Time",
                category: "Undergraduate",
                overview: "Applied from Destination Guide Hub."
              };
              setSelectedCourse(mockCourse);
              setActiveTab("portal");
            }}
            onNavigateToPortal={() => setActiveTab("portal")}
          />
        )}

        {activeTab === "matcher" && (
          <SmartMatchmaker 
            onApplyForCourse={handleApplyForCourse} 
            onNavigateToCatalog={() => setActiveTab("catalog")} 
          />
        )}

        {activeTab === "portal" && (
          <ApplicationPortal 
            initialCourse={selectedCourse} 
            onClearSelectedCourse={handleClearSelectedCourse} 
          />
        )}
      </main>

      {/* Fully structured human footer */}
      <footer className="bg-slate-900 text-white border-t border-slate-800" id="main-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-5 space-y-4">
              <div className="inline-flex items-center" id="footer-logo-wrapper">
                <BCASLogo size="md" variant="dark" />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Empowering Sri Lankan high school and diploma students to bridge their qualifications into elite global universities across the UK, Australia, Canada, and Germany. Fully accredited recruitment agency.
              </p>
              <div className="text-xs text-slate-400 font-semibold font-mono">
                Authorizations: APEX Placements • British Council Registry • ICEF Partner Agency
              </div>
            </div>

            <div className="md:col-span-3 space-y-3 text-xs">
              <h5 className="font-bold text-slate-300 uppercase tracking-widest">Active Services</h5>
              <ul className="space-y-2 text-slate-400">
                <li>• Degree Comparison Dashboard</li>
                <li>• Direct Admission Processing</li>
                <li>• Certified Visa Documentation Assuring</li>
                <li>• GIC Curation & SOP Advisory</li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-3 text-xs">
              <h5 className="font-bold text-slate-300 uppercase tracking-widest font-sans">Branches</h5>
              <p className="text-slate-400 leading-relaxed">
                Primary Placements Center:<br />
                356 Galle Rd, Colombo 00300, Colombo 10107<br />
                Branch Helplines: +94 76 141 5273 / placements@bcas.lk
              </p>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500">
            <p>© {new Date().getFullYear()} BCAS International (Pvt) Ltd. All Rights Reserved.</p>
            <div className="flex gap-4 mt-4 sm:mt-0">
              <span className="hover:text-blue-400 cursor-pointer">Admissions Terms</span>
              <span className="hover:text-blue-400 cursor-pointer">Privacy Guidelines</span>
              <span className="hover:text-blue-400 cursor-pointer">Verify Consultant Credentials</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
