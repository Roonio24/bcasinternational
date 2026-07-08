import React, { useState, useEffect } from "react";
import { 
  GraduationCap, 
  MapPin, 
  CheckCircle, 
  Users, 
  Globe2, 
  ArrowRight, 
  FileText, 
  PhoneCall, 
  Award,
  ChevronRight,
  TrendingUp,
  Calendar,
  BookOpen,
  Sparkles,
  Ticket,
  Check,
  Search,
  BookMarked,
  Info,
  Compass,
  ChevronLeft,
  Play,
  Pause
} from "lucide-react";
import { motion } from "motion/react";
import TestimonialCarousel from "./TestimonialCarousel";
import YouTubeTestimonials from "./YouTubeTestimonials";
import campusUkImg from "../assets/images/campus_uk_1782116777947.jpg";
import campusAustraliaImg from "../assets/images/campus_australia_1782116791822.jpg";
import campusCanadaImg from "../assets/images/campus_canada_1782116809850.jpg";

interface LandingHeroProps {
  onNavigate: (tab: string) => void;
}

interface BannerSlide {
  id: string;
  image: string;
  subtitle: string;
  title: string;
  slogan: string;
  country: string;
  buttonText: string;
}

const DEFAULT_SLIDES: BannerSlide[] = [
  {
    id: "slide-1",
    image: campusUkImg,
    subtitle: "ESTABLISHED UK PLACEMENT CHAMPIONS",
    title: "University of London Partner Programs",
    slogan: "Secure direct-entry fast-track placements, up to £3,000 entrance awards, and comprehensive Post-Study Work Visa support.",
    country: "United Kingdom",
    buttonText: "Match UK Programs"
  },
  {
    id: "slide-2",
    image: campusAustraliaImg,
    subtitle: "DREAM AUSTRALIAN TECH STUDY PATHWAYS",
    title: "Curtin University & Top Go8 Institutions",
    slogan: "Accelerated credit recognition for BCAS Higher Diploma grads. Direct placement application channels open now for next intake.",
    country: "Australia",
    buttonText: "Compute Aust Credit"
  },
  {
    id: "slide-3",
    image: campusCanadaImg,
    subtitle: "PREMIUM CANADIAN STEM DIPLOMATS",
    title: "Top Toronto & Vancouver Partner Systems",
    slogan: "Gain reliable access to high-demand computing, sustainable engineering, and 3-Year Post-Graduation Work Permits (PGWP).",
    country: "Canada",
    buttonText: "Explore Canada Catalog"
  }
];

export default function LandingHero({ onNavigate }: LandingHeroProps) {
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquirySuccess, setInquirySuccess] = useState(false);
  
  // Destination Guide State
  const [selectedDestTab, setSelectedDestTab] = useState("uk");

  // Carousel Slides State
  const [slides] = useState<BannerSlide[]>(DEFAULT_SLIDES);

  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Handle auto slide rotation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };


  const countries = [
    { name: "United Kingdom", desc: "Top choice for fast-track 1-Yr Masters & 3-Yr Bachelors. Post-Study Work Visa (Graduate Route) benefits.", count: "110+ Partners", color: "from-blue-500 to-indigo-600" },
    { name: "Australia", desc: "Sunny climate, top-tier global universities and high student wages. Post-study work pathways up to 5 years.", count: "85+ Partners", color: "from-amber-500 to-orange-600" },
    { name: "Canada", desc: "High employment values, extremely friendly PR pathways, and PGWP work permit facilities through colleges & universities.", count: "70+ Partners", color: "from-red-500 to-rose-600" },
    { name: "Germany", desc: "Lush European tech hubs, English-taught degrees, highly affordable tuition, and solid 18-month job seeker visa.", count: "25+ Partners", color: "from-slate-700 to-slate-900" },
    { name: "United States", desc: "Global academic leaders, Ivy League standards, STEM extensions up to 3 years of OPT work authorization.", count: "65+ Partners", color: "from-indigo-600 to-purple-600" }
  ];

  const destinationData = [
    {
      id: "uk",
      country: "United Kingdom",
      bgClass: "bg-blue-50/50 border-blue-100",
      accent: "text-blue-600 border-blue-200",
      tuition: "£13,000 to £22,000 / year",
      living: "£9,206 (Outside London) to £12,006 / year",
      intakes: "September & January (Major), May (Minor)",
      workRights: "2-Year Post Study Work (Graduate Route Visa)",
      popularCourses: "Cloud Architecture, MSc Data Tech, MBA, Public Health Administration, LLB",
      whyStudy: "Accelerated 1-year Masters, fast-tracked direct transfer using standard Sri Lankan HND / Diplomas."
    },
    {
      id: "aus",
      country: "Australia",
      bgClass: "bg-amber-50/50 border-amber-100",
      accent: "text-amber-700 border-amber-200",
      tuition: "A$24,000 to A$38,000 / year",
      living: "A$24,505 to A$26,000 / year",
      intakes: "February & July (Major), November (Minor)",
      workRights: "2 to 4 Years Post-Study Work Visa depending on study tier",
      popularCourses: "Nursing, FinTech Engineering, Cyber Security Systems, Hospitality Leadership",
      whyStudy: "Incredible living standards, competitive student wage limits, and top-tier direct university pathways."
    },
    {
      id: "can",
      country: "Canada",
      bgClass: "bg-red-50/50 border-red-100",
      accent: "text-red-600 border-red-200",
      tuition: "C$16,500 to C$32,000 / year",
      living: "C$20,635 / year (Mandatory GIC amount)",
      intakes: "September (Major), January & May",
      workRights: "Post-Graduation Work Permit (PGWP) up to 3 Years",
      popularCourses: "Advanced Computing, Sustainable Technology, Healthcare Admin, Mechanical Automation",
      whyStudy: "Clear Permanent Residency (PR) pathways, multi-year PGWP, world-class high-tech learning hubs."
    },
    {
      id: "us",
      country: "United States",
      bgClass: "bg-purple-50/50 border-purple-100",
      accent: "text-purple-600 border-purple-200",
      tuition: "$18,500 to $39,000 / year",
      living: "$11,500 to $15,000 / year",
      intakes: "August / Fall (Major), January / Spring",
      workRights: "1 Year Standard OPT + 24 Months STEM Extension (3 Years Total)",
      popularCourses: "Artificial Intelligence, Data Science, Biomedical Sciences, Creative Media, MBA Exec",
      whyStudy: "Premium worldwide recognition, unmatched enterprise network connections, vast research foundations."
    },
    {
      id: "ger",
      country: "Germany",
      bgClass: "bg-slate-50/90 border-slate-200",
      accent: "text-slate-800 border-slate-300",
      tuition: "€0 at Public Universities; €8,500 to €15,000 / year at Partner Private Universities",
      living: "€11,208 / year (German Blocked Account Required)",
      intakes: "Winter (October - Major), Summer (April)",
      workRights: "18-Month Job Seeker Visa post graduation with limitless hours",
      popularCourses: "Automotive Management, Robotics & Automation, Digital Logistics, Energy System design",
      whyStudy: "Almost zero public state tuition fees, strong economy, immense engineering & IT placements demand."
    }
  ];

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) return;
    setInquirySuccess(true);
    setTimeout(() => {
      setInquiryName("");
      setInquiryPhone("");
      setInquirySuccess(false);
    }, 4000);
  };


  return (
    <div className="space-y-16">
      {/* 🌟 Premium Scrolling Universities Showcase Carousel */}
      <div className="space-y-6" id="university-showcase-carousel">
        <div className="flex justify-between items-center px-2">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
              ★ Accreditations Portfolio
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1.5 dynamic-title">
              Study at Top Universities Worldwide
            </h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors flex items-center justify-center cursor-pointer"
              title={isPlaying ? "Pause rotation" : "Auto-play rotation"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Dynamic sliding viewport card */}
        <div className="relative overflow-hidden bg-slate-950 rounded-3xl min-h-[440px] md:min-h-[500px] flex items-stretch shadow-md group">
          {/* Active slide container */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000 transform scale-100"
            style={{ backgroundImage: `url(${slides[activeSlide]?.image})` }}
          />

          {/* Deep professional dark shadow layout for text visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />

          {/* Foreground slide contents container */}
          <div className="relative z-10 w-full p-8 md:p-16 flex flex-col justify-between items-start text-white">
            {/* Top Indicator / Badges */}
            <div className="flex justify-between items-center w-full">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-extrabold bg-blue-500 text-white shadow-sm tracking-widest uppercase">
                <MapPin className="w-3 h-3 text-white" /> Featured Destination &bull; {slides[activeSlide]?.country}
              </span>
              <span className="text-xs font-bold font-mono text-slate-300 bg-black/40 px-3 py-1.5 rounded-lg backdrop-blur-md">
                Slide 0{activeSlide + 1} / 0{slides.length}
              </span>
            </div>

            {/* Middle slider texts with high contrast drop-shadow */}
            <div className="max-w-2xl space-y-4 pt-12 md:pt-20">
              <p className="text-xs font-mono font-extrabold text-blue-300 uppercase tracking-widest drop-shadow">
                {slides[activeSlide]?.subtitle}
              </p>
              <h3 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-white drop-shadow-md">
                {slides[activeSlide]?.title}
              </h3>
              <p className="text-sm md:text-base text-slate-200 font-medium leading-relaxed drop-shadow">
                {slides[activeSlide]?.slogan}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate("catalog")}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-blue-500/30 transition-all cursor-pointer"
                >
                  <Compass className="w-4 h-4" /> {slides[activeSlide]?.buttonText} <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Slide Index Dot Overlays and arrows */}
            <div className="flex justify-between items-center w-full pt-6">
              <div className="flex gap-2.5">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer ${
                      activeSlide === idx 
                        ? "bg-blue-500 w-8 scale-110" 
                        : "bg-white/40 hover:bg-white/70"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
              <div className="flex gap-2">
                <button
                  onClick={handlePrevSlide}
                  className="p-2.5 rounded-full bg-black/45 hover:bg-black/70 border border-white/10 text-white transition-colors cursor-pointer"
                  aria-label="Previous Featured Slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextSlide}
                  className="p-2.5 rounded-full bg-black/45 hover:bg-black/70 border border-white/10 text-white transition-colors cursor-pointer"
                  aria-label="Next Featured Slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>


      </div>

      {/* Hero Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-3xl p-8 md:p-16 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -z-10" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
              <Award className="w-3.5 h-3.5" /> Established Global Placers — BCAS International
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-none bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent">
              Your Gateway to <span className="whitespace-nowrap">World-Class</span> <span className="text-blue-400 whitespace-nowrap">Universities</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-xl">
              Turn your local qualifications into a global academic career. Compare thousands of accredited degrees, matching your exact grades and budget instantly with our smart placements tracker.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => onNavigate("matcher")}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all cursor-pointer"
                id="btn-hero-match"
              >
                Match Fast with AI Selection <ArrowRight className="w-4 h-4 animate-pulse" />
              </button>
              <button 
                onClick={() => onNavigate("catalog")}
                className="inline-flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-white px-6 py-3.5 rounded-xl font-semibold transition-all cursor-pointer"
                id="btn-hero-catalog"
              >
                Explore Courses & Compare
              </button>
            </div>
            
          </div>

          <div className="lg:col-span-5 bg-slate-800/50 border border-slate-700 p-6 md:p-8 rounded-2xl shadow-xl">
            <h3 className="text-xl font-bold text-white mb-2">Instant Advisor Call</h3>
            <p className="text-xs text-slate-400 mb-6 font-medium">
              Requested callback goes directly to our senior international visa placements counselor.
            </p>
            
            {inquirySuccess ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 p-4 rounded-xl text-center space-y-2 animate-pulse">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <p className="font-bold">Callback Scheduled!</p>
                <p className="text-xs text-emerald-400">A BCAS counselor will contact you within 15 minutes.</p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="e.g. Mohamed Haroon"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 px-3.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    placeholder="e.g. +94 77 123 4567"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 px-3.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
                    Academic Interest
                  </label>
                  <select className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 px-3.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors">
                    <option>Computing & Software Development</option>
                    <option>Business Management & Analytics</option>
                    <option>Engineering & Applied Science</option>
                    <option>Biomedical & Healthcare Studies</option>
                    <option>Foundation & Fast-track Studies</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-bold text-sm shadow-md transition-colors cursor-pointer"
                >
                  Book Callback Now
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Study Abroad Interactive Comparison Hub */}
      <div className="space-y-8 bg-white border border-slate-200/65 rounded-3xl p-6 md:p-10 shadow-sm" id="destinations-hub">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 font-sans">
              Explore Your Ideal Destinations
            </h2>
            <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
              Plan with absolute precision. Toggle between top-ranking study abroad destinations to compare direct tuition fees, actual living requirements, intakes, and post-study work authorization durations.
            </p>
          </div>
          
          {/* Country Tabs Selector */}
          <div className="flex flex-wrap gap-2 w-full lg:w-auto">
            {destinationData.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDestTab(d.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  selectedDestTab === d.id
                    ? "bg-teal-600 text-white border-teal-600 shadow-sm"
                    : "bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-slate-200"
                }`}
              >
                {d.country}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Country Comprehensive Grid */}
        {destinationData.filter(d => d.id === selectedDestTab).map((d) => (
          <div key={d.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
            {/* Quick Summary card */}
            <div className="lg:col-span-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 md:p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl" />
              <div className="space-y-4">
                <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-teal-400 bg-teal-950/50 px-3 py-1 rounded-full border border-teal-800">
                  Global Destination
                </span>
                <h3 className="text-3xl font-extrabold pb-2 border-b border-slate-700/60 leading-tight">
                  {d.country}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-sans font-light">
                  {d.whyStudy}
                </p>
              </div>

              <div className="pt-6">
                <button 
                  onClick={() => onNavigate("catalog")}
                  className="w-full bg-teal-500 hover:bg-teal-600 text-slate-950 hover:text-white py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Search {d.country} Courses <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-2xl space-y-1.5">
                <span className="text-[10px] font-bold text-teal-700 uppercase tracking-widest block font-mono">Average Academic Tuition</span>
                <p className="text-lg font-extrabold text-slate-900">{d.tuition}</p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Depends heavily on program selection (Bachelors vs Masters) and region.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-2xl space-y-1.5">
                <span className="text-[10px] font-bold text-teal-700 uppercase tracking-widest block font-mono">Living & Food Funds Required</span>
                <p className="text-lg font-extrabold text-slate-900">{d.living}</p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Officially verified index required as proof of financial capacity when submitting visa.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-2xl space-y-1.5">
                <span className="text-[10px] font-bold text-teal-700 uppercase tracking-widest block font-mono">Standard Academic Intakes</span>
                <p className="text-lg font-extrabold text-slate-900">{d.intakes}</p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  We suggest preparing documents at least 4 to 6 months prior to targeted intake.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-2xl space-y-1.5">
                <span className="text-[10px] font-bold text-teal-700 uppercase tracking-widest block font-mono">Post-Study Work Authorization</span>
                <p className="text-lg font-extrabold text-slate-900">{d.workRights}</p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Work legally without restrictions after graduating in selected technical disciplines.
                </p>
              </div>

              <div className="md:col-span-2 bg-gradient-to-r from-teal-50 to-blue-50 border border-blue-100/60 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-teal-800 uppercase tracking-widest block font-mono">Popular Placement Streams</span>
                  <p className="text-sm font-extrabold text-slate-800">{d.popularCourses}</p>
                </div>
                <div className="shrink-0 flex gap-2">
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-100/60 px-3 py-1.5 rounded-lg">High Employability</span>
                  <span className="text-[11px] font-bold text-teal-800 bg-teal-100/60 px-3 py-1.5 rounded-lg">Scholarship Safe</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>


      {/* Animated Student Placements Testimonial Carousel */}
      <TestimonialCarousel />

      {/* YouTube Video Testimonials Wall */}
      <YouTubeTestimonials />

      {/* Fully Structured Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border border-slate-100 p-8 rounded-2xl space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Globe2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">End-to-End Visa Processing</h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            From document authentication and GIC/funds assessment, to certified SOP drafting and mock visa interviews. BCAS international delivers exceptional, high-assurance visa results.
          </p>
        </div>

        <div className="bg-white border border-slate-100 p-8 rounded-2xl space-y-4">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Merit Scholarship Matching</h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            Save up to 30% of tuition costs. Our smart platform references active academic bursaries, regional grants, and entrance discounts to match you with top funding.
          </p>
        </div>

        <div className="bg-white border border-slate-100 p-8 rounded-2xl space-y-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Direct Partner Admissions</h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            Skip delayed general response queues. We process applications directly with accredited University officers for lightning-fast conditional offer letters.
          </p>
        </div>
      </div>
    </div>
  );
}
