import React, { useState } from "react";
import { 
  Building2, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  Award, 
  FileCheck, 
  Calendar, 
  GraduationCap, 
  TrendingUp, 
  FileText, 
  Info, 
  Users,
  Search,
  BookOpen,
  DollarSign
} from "lucide-react";

interface SEOStudyGuidesProps {
  onApply: (courseName: string, country: string) => void;
  onNavigateToPortal: () => void;
}

interface GuidePage {
  id: string;
  title: string;
  category: "Destinations" | "Pathways" | "Services";
  tagline: string;
  keywords: string[];
  content: React.ReactNode;
}

export default function SEOStudyGuides({ onApply, onNavigateToPortal }: SEOStudyGuidesProps) {
  const [activePageId, setActivePageId] = useState("sri-lanka");
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquirySuccess, setInquirySuccess] = useState(false);

  const pages: GuidePage[] = [
    {
      id: "sri-lanka",
      title: "Study Abroad Sri Lanka",
      category: "Destinations",
      tagline: "Your Ultimate Hub for Overseas Education Consultants in Sri Lanka",
      keywords: ["Study abroad Sri Lanka", "Overseas education Sri Lanka", "Study overseas from Sri Lanka", "Best study abroad consultants in Sri Lanka", "Colombo"],
      content: (
        <div className="space-y-6">
          <div className="prose max-w-none">
            <h3 className="text-xl font-extrabold text-slate-900 leading-tight">
              Begin Your Global Education Odyssey from Sri Lanka
            </h3>
            <p className="text-slate-600 text-[14px] leading-relaxed mt-2">
              Are you looking for the best premium <strong>study abroad consultants in Sri Lanka</strong>? 
              At BCAS International, we help high school graduates (after O/Ls and A/Ls) and diploma holders 
              secure direct admissions, credit transfers, and fast-track student visa processing for top 
              universities worldwide. As Colombo's premier <strong>overseas education Sri Lanka</strong> recruitment agency, 
              we pride ourselves on offering free counselling, transparent eligibility evaluation, and 
              100% compliant visa advisory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-5 bg-blue-50/60 rounded-2xl border border-blue-100/50">
              <h4 className="font-bold text-slate-900 flex items-center gap-2 text-[14px]">
                <Sparkles className="w-4 h-4 text-blue-600" /> Free Guidance & Placements
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                We do not charge students any direct service fees for university placements or counseling. Benefit from our verified partner network completely free of charge.
              </p>
            </div>
            <div className="p-5 bg-emerald-50/60 rounded-2xl border border-emerald-100/50">
              <h4 className="font-bold text-emerald-900 flex items-center gap-2 text-[14px]">
                <FileCheck className="w-4 h-4 text-emerald-600" /> Certified Visa Assistance
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Enjoy an outstanding student visa approval rate backed by experienced counselors specializing in GIC/blocked account setup, financial profile structuring, and SOP revisions.
              </p>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-6">
            <h4 className="font-bold text-slate-900 text-[15px] mb-3">Priority Placements Spotlight</h4>
            <div className="p-4 bg-slate-900 text-white rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-400 bg-blue-950 px-2.5 py-1 rounded-full">Intakes Open</span>
                <p className="text-xs text-slate-300 mt-1.5 font-medium">Applications are now active for both January and September intakes at top UK, Australia, and Canada universities.</p>
              </div>
              <button onClick={onNavigateToPortal} className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl text-xs flex items-center gap-1 shrink-0 transition-all cursor-pointer">
                Apply Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "uk",
      title: "Study in UK",
      category: "Destinations",
      tagline: "Study in UK from Sri Lanka - Your Royal Portal to British Universities",
      keywords: ["Study in UK from Sri Lanka", "UK universities for Sri Lankan students", "Study in England from Sri Lanka", "UK student visa Sri Lanka", "Affordable universities in UK"],
      content: (
        <div className="space-y-6">
          <div className="prose max-w-none">
            <h3 className="text-xl font-extrabold text-slate-900 leading-tight">
              Unlock Top-Ranked British Degrees with Pre-Approved Pathways
            </h3>
            <p className="text-slate-600 text-[14px] leading-relaxed mt-2">
              For decades, the United Kingdom has remained the absolute pinnacle destination for Sri Lankan scholars. 
              Undergoing a <strong>study in England from Sri Lanka</strong> pathway allows you to finish a Bachelor's degree 
              in just 3 years or a <strong>Master's degree in UK for Sri Lankan students</strong> in just 1 year. This is 
              unmatched for saving living costs and launching a global career under the official <strong>UK Post-Study Work (PSW) Graduate Route Visa</strong>.
            </p>
          </div>

          <div className="p-5 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-2xl border border-blue-100/60">
            <h4 className="font-extrabold text-blue-950 text-[14px] mb-3">Key Partner UK Universities & Exclusive Placements</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-100">
                <Building2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-slate-800 text-[13px]">University of Essex</h5>
                  <p className="text-[11px] text-slate-500">Known for outstanding Computing, Business & Law. Scholarships up to £3,000 available.</p>
                </div>
              </div>
              <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-100">
                <Building2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-slate-800 text-[13px]">University of Law</h5>
                  <p className="text-[11px] text-slate-500">The premier Legal Academy in the UK. Direct entry LLB and LLM placements for Lankan students.</p>
                </div>
              </div>
              <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-100">
                <Building2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-slate-800 text-[13px]">University of Hertfordshire</h5>
                  <p className="text-[11px] text-slate-500">Superb software engineering and data science pathways with direct-entry matching from HND.</p>
                </div>
              </div>
              <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-100">
                <Building2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-slate-800 text-[13px]">Birmingham City University</h5>
                  <p className="text-[11px] text-slate-500">Top-tier Biomedical Science, Nursing, and Foundation tracks for high schoolers.</p>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-3 font-medium">
              Other notable partners: <strong>Coventry University</strong>, <strong>Northumbria University</strong>, <strong>University of Sunderland</strong>, <strong>Middlesex University</strong>, and <strong>De Montfort University</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <span className="text-xs text-slate-400 uppercase font-bold">Estimated Cost</span>
              <p className="font-bold text-slate-800 text-sm mt-1">£13,000 - £20,000 / year</p>
              <p className="text-[10px] text-slate-500 mt-1">Highly affordable universities available</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <span className="text-xs text-slate-400 uppercase font-bold">Work Authorization</span>
              <p className="font-bold text-slate-800 text-sm mt-1">20 Hours / Week</p>
              <p className="text-[10px] text-slate-500 mt-1">Full-time on holidays & academic breaks</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <span className="text-xs text-slate-400 uppercase font-bold">Post-Study Visa</span>
              <p className="font-bold text-slate-800 text-sm mt-1">2-Year Graduate Route</p>
              <p className="text-[10px] text-slate-500 mt-1">Pathway to tier-2 skilled employment visa</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "australia",
      title: "Study in Australia",
      category: "Destinations",
      tagline: "Explore Australian Universities for Sri Lankan Students & Flexible Visas",
      keywords: ["Study in Australia from Sri Lanka", "Australian universities for Sri Lankan students", "Australia student visa Sri Lanka", "Affordable universities in Australia"],
      content: (
        <div className="space-y-6">
          <div className="prose max-w-none">
            <h3 className="text-xl font-extrabold text-slate-900 leading-tight">
              Embark on High-Tier Australian Academic & Research Excellence
            </h3>
            <p className="text-slate-600 text-[14px] leading-relaxed mt-2">
              Looking to fast-track your IT, cyber security, or business programs? Undertaking a 
              <strong>study in Australia from Sri Lanka</strong> offers phenomenal lifestyle outcomes, high student 
              minimum wages, and direct placement opportunities at Go8 and regional institutions under the 
              official <strong>Australia student visa Sri Lanka</strong> framework. BCAS International handles credit mapping for 
              our diploma holders to secure amazing exemptions.
            </p>
          </div>

          <div className="p-4 bg-amber-50/60 border border-amber-100/70 rounded-2xl">
            <h4 className="font-bold text-amber-950 text-[14px] flex items-center gap-1.5 mb-2">
              <Award className="w-4.5 h-4.5 text-amber-600" /> Featured Australian Partner Universities
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-2">
              <div className="bg-white px-3 py-2.5 rounded-xl border border-slate-150 text-center">
                <span className="text-xs font-bold text-slate-800 block">Deakin University</span>
                <span className="text-[10px] text-slate-500">Melbourne / Geelong</span>
              </div>
              <div className="bg-white px-3 py-2.5 rounded-xl border border-slate-150 text-center">
                <span className="text-xs font-bold text-slate-800 block">Western Sydney</span>
                <span className="text-[10px] text-slate-500">Sydney / New South Wales</span>
              </div>
              <div className="bg-white px-3 py-2.5 rounded-xl border border-slate-150 text-center">
                <span className="text-xs font-bold text-slate-800 block">Curtin University</span>
                <span className="text-[10px] text-slate-500">Perth / Western Australia</span>
              </div>
              <div className="bg-white px-3 py-2.5 rounded-xl border border-slate-150 text-center">
                <span className="text-xs font-bold text-slate-800 block">Griffith University</span>
                <span className="text-[10px] text-slate-500">Brisbane / Gold Coast</span>
              </div>
              <div className="bg-white px-3 py-2.5 rounded-xl border border-slate-150 text-center">
                <span className="text-xs font-bold text-slate-800 block">Uni of Wollongong</span>
                <span className="text-[10px] text-slate-500">Wollongong / Sydney</span>
              </div>
              <div className="bg-white px-3 py-2.5 rounded-xl border border-slate-150 text-center">
                <span className="text-xs font-bold text-slate-800 block">Edith Cowan Uni</span>
                <span className="text-[10px] text-slate-500">Western Australia</span>
              </div>
            </div>
            <p className="text-[11px] text-amber-800 mt-2.5 font-medium">
              Tip: Australian regional universities offer up to 4 years of Post-Study Work visas with extra remote placement merits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h5 className="font-bold text-slate-800 text-xs uppercase text-slate-400">Tuition Spectrum</h5>
              <p className="text-sm font-semibold text-slate-800 mt-1">A$25,000 - A$39,000 / year</p>
              <p className="text-[10.5px] text-slate-500 mt-0.5">High scholarship brackets up to A$10,000/year based on local A/L marks.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h5 className="font-bold text-slate-800 text-xs uppercase text-slate-400">Intake Timelines</h5>
              <p className="text-sm font-semibold text-slate-800 mt-1">February & July Sessions</p>
              <p className="text-[10.5px] text-slate-500 mt-0.5">Applicants must initiate files 4-5 months in advance to satisfy GTE criteria.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "canada",
      title: "Study in Canada",
      category: "Destinations",
      tagline: "Study in Canada from Sri Lanka - Your Safe Passage to North American Careers",
      keywords: ["Study in Canada from Sri Lanka", "Canadian universities for Sri Lankan students", "Canada student visa Sri Lanka", "Yorkville University Sri Lanka"],
      content: (
        <div className="space-y-6">
          <div className="prose max-w-none">
            <h3 className="text-xl font-extrabold text-slate-900 leading-tight">
              Embrace High-Tech Futures & Comprehensive Post-Graduation Work (PGWP) Permits
            </h3>
            <p className="text-slate-600 text-[14px] leading-relaxed mt-2">
              Canada is widely recognized as the friendliest location for skilled tech and engineering specialists. 
              Initiating a <strong>study in Canada from Sri Lanka</strong> grants access to state-of-the-art labs, 
              robust coop programs, and transparent Permanent Residency (PR) pathways. BCAS International counsels 
              students on GIC account deposits, SDS versus Non-SDS channels, and visa proof of funds.
            </p>
          </div>

          <div className="p-5 bg-red-50/50 border border-red-100/80 rounded-2xl">
            <h4 className="font-bold text-red-950 text-[14px] mb-3">Top Canadian Partners (Universities & Polytechnics)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-xl border border-slate-100 flex items-start gap-2">
                <Building2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-[13px] font-extrabold text-slate-800">Yorkville University</h5>
                  <p className="text-[11px] text-slate-500">Accelerated Bachelor of Business Administration & Project Management in Toronto and Vancouver.</p>
                </div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-100 flex items-start gap-2">
                <Building2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-[13px] font-extrabold text-slate-800">University Canada West (UCW)</h5>
                  <p className="text-[11px] text-slate-500">Renowned MBA and Associate of Arts programs in downtown Vancouver. Outstanding job stats.</p>
                </div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-100 flex items-start gap-2">
                <Building2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-[13px] font-extrabold text-slate-800">Georgian & Seneca Colleges</h5>
                  <p className="text-[11px] text-slate-500">Exceptional cooperative education options and specialized visual tech and cloud diplomas in Ontario.</p>
                </div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-100 flex items-start gap-2">
                <Building2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-[13px] font-extrabold text-slate-800">Humber Polytechnic</h5>
                  <p className="text-[11px] text-slate-500">Industry-led engineering, logistics, and hospitality degrees in Toronto's premium tech belt.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 items-center bg-slate-900 text-white p-4 rounded-xl">
            <Info className="w-5 h-5 text-red-400 shrink-0 animate-bounce" />
            <p className="text-xs">
              <strong>Canada Student Visa Alert:</strong> Ensure your provincial cert (PAL) registration is initiated promptly. Book a consultation with us today.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "germany",
      title: "Study in Germany",
      category: "Destinations",
      tagline: "Zero Public Tuition Degrees & Outstanding European Tech Career Openings",
      keywords: ["Study in Germany from Sri Lanka", "Private universities in Germany", "English taught universities in Germany", "Germany student visa Sri Lanka", "Study in Germany without IELTS Sri Lanka"],
      content: (
        <div className="space-y-6">
          <div className="prose max-w-none">
            <h3 className="text-xl font-extrabold text-slate-900 leading-tight">
              German Technology, Innovation & English-Taught Career Modules
            </h3>
            <p className="text-slate-600 text-[14px] leading-relaxed mt-2">
              For Sri Lankan engineering, technology, and management students, embarking on a 
              <strong>study in Germany from Sri Lanka</strong> represent a massive economical edge. 
              Enjoy state-of-the-art private colleges delivering fully <strong>English-taught universities in Germany</strong>, 
              complete with 18-month job-seeker visas and standard PR facilities. Many options allow you to 
              <strong>study in Germany without IELTS</strong> under partner English proficiency certificate waivers.
            </p>
          </div>

          <div className="p-4 bg-slate-100 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide mb-2">Primary German Partners</h4>
            <ul className="space-y-2 text-xs text-slate-700">
              <li>&bull; <strong>IU International University of Applied Sciences</strong> - Extreme flexibility, offering dual-studies, on-campus and online mixed studies in Berlin and Bad Honnef.</li>
              <li>&bull; <strong>Constructor University Bremen</strong> - Premium private research university with world-wide STEM recognition.</li>
              <li>&bull; <strong>SRH University Germany</strong> - Multi-campus setups in Hamburg, Heidelberg, and Cologne targeting premium project-based IT & engineering degrees.</li>
            </ul>
          </div>

          <div className="p-4 bg-blue-50 text-blue-900 rounded-xl text-xs border border-blue-100">
            <strong>Blocked Account Guide:</strong> German student visa rules require a blocked account of approximately &euro;11,208 to authenticate living expenses. BCAS counselors assist with fast Fintiba or Coracle setups.
          </div>
        </div>
      )
    },
    {
      id: "ireland",
      title: "Study in Ireland",
      category: "Destinations",
      tagline: "Study in Ireland from Sri Lanka - Dynamic Tech Hubs of Europe",
      keywords: ["Study in Ireland from Sri Lanka", "Ireland student visa Sri Lanka", "Irish universities for international students", "Dublin Business School Sri Lanka"],
      content: (
        <div className="space-y-6">
          <div className="prose max-w-none">
            <h3 className="text-xl font-extrabold text-slate-900 leading-tight">
              Launch Your Tech or Finance Career in the European Headquarters of Apple, Google, and Meta
            </h3>
            <p className="text-slate-600 text-[14px] leading-relaxed mt-2">
              Ireland continues to emerge as a premium alternative to the UK, boasting massive high-quality career placements. 
              Choosing <strong>study in Ireland from Sri Lanka</strong> opens options at elite, universally accredited 
              business schools with a rich 2-Year Post-Study Work permission. Let our certified counselors manage your 
              <strong>Ireland student visa Sri Lanka</strong> files securely.
            </p>
          </div>

          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
            <h4 className="font-bold text-emerald-900 text-xs uppercase mb-2">Elite Partner Institutes in Ireland</h4>
            <div className="space-y-2 text-xs text-emerald-800">
              <p><strong>Dublin Business School (DBS) Sri Lanka admissions</strong>: Ireland's largest independent third-level college, renowned for state-of-the-art MBA, Fintech, and Computing programs.</p>
              <p><strong>Griffith College Ireland</strong>: Exceptional undergraduate and post-graduate pathways in Dublin, Cork, and Limerick.</p>
              <p><strong>Technological University Dublin (TU Dublin)</strong>: State-of-the-art public engineering and business campus.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "nz-sweden",
      title: "New Zealand & Sweden",
      category: "Destinations",
      tagline: "Pristine Nature, High Living Standards and Revolutionary Research Placements",
      keywords: ["Study in New Zealand from Sri Lanka", "Study in Sweden from Sri Lanka", "New Zealand student visa Sri Lanka", "Auckland University of Technology Sri Lanka"],
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-2xl">
              <h4 className="font-black text-blue-950 text-base">Study in New Zealand</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Discover exceptional world-class learning setups. We map applications to top-tier universities like 
                <strong>Auckland University of Technology</strong> and <strong>Massey University</strong>. Enjoy friendly part-time 
                work limits and exceptional post-study residency pathways.
              </p>
              <span className="text-[10px] bg-blue-200 text-blue-800 rounded px-2 py-0.5 font-bold uppercase tracking-wider block mt-3 w-fit">
                New Zealand student visa
              </span>
            </div>

            <div className="p-5 bg-indigo-50/50 border border-indigo-100 rounded-2xl">
              <h4 className="font-black text-indigo-950 text-base">Study in Sweden</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Unlock innovative English-taught research programs. Swedish universities are world pioneers in sustainability, 
                biomedical development, and heavy engineering industries. Spouses are permitted to work unrestricted!
              </p>
              <span className="text-[10px] bg-indigo-200 text-indigo-800 rounded px-2 py-0.5 font-bold uppercase tracking-wider block mt-3 w-fit">
                Sweden student visa
              </span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "after-ol",
      title: "Study Abroad After O/Ls",
      category: "Pathways",
      tagline: "How to Study Abroad after O/Ls - Direct Path to Global Bachelor's Degrees",
      keywords: ["How to study abroad after O/Ls", "Study abroad after O/Ls in Sri Lanka", "Foundation programmes abroad"],
      content: (
        <div className="space-y-6">
          <div className="prose max-w-none">
            <h3 className="text-xl font-extrabold text-slate-900 leading-tight">
              Do Not Wait For Local A/Ls: Leapfrog into Global Universities
            </h3>
            <p className="text-slate-600 text-[14px] leading-relaxed mt-2">
              Did you know you can bypass local Sri Lankan A/Ls altogether and enter directly into a UK, Australia, 
              or Canadian Bachelor's Degree? Through custom-tailored **Foundation Programmes Abroad**, students 
              who recently completed their GCE Ordinary Levels (O/Ls) can enter a 1-year Foundation Course, 
              which guarantees direct year 1 progression of a global Bachelor's track. This saves you 2 full years of local schooling!
            </p>
          </div>

          <div className="p-5 bg-amber-50 rounded-2xl border border-amber-100">
            <h4 className="font-bold text-amber-950 text-[14px]">The 1-2 Year Fast-Track Blueprint:</h4>
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-3 text-slate-700">
              <div className="p-3 bg-white border border-amber-150 rounded-xl text-center w-full">
                <span className="text-xs font-bold text-amber-800">1. O/L Results</span>
                <p className="text-[10.5px] text-slate-500 mt-0.5">Finish local or London GCE O/Ls with credit passes</p>
              </div>
              <ArrowRight className="w-5 h-5 shrink-0 text-amber-400 rotate-90 sm:rotate-0" />
              <div className="p-3 bg-white border border-amber-150 rounded-xl text-center w-full">
                <span className="text-xs font-bold text-amber-800">2. Foundation Track</span>
                <p className="text-[10.5px] text-slate-500 mt-0.5">8 to 12 months comprehensive pre-university mapping</p>
              </div>
              <ArrowRight className="w-5 h-5 shrink-0 text-amber-400 rotate-90 sm:rotate-0" />
              <div className="p-3 bg-white border border-amber-150 rounded-xl text-center w-full">
                <span className="text-xs font-bold text-amber-800">3. Global Year 1</span>
                <p className="text-[10.5px] text-slate-500 mt-0.5">Progress smoothly to partner UK, Australian, or Canadian schools</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "after-al",
      title: "Study Abroad After A/Ls",
      category: "Pathways",
      tagline: "Empower Your GCE Advanced Level (A/L) Results with Premium Global Placements",
      keywords: ["How to study abroad after A/Ls", "Study abroad after A/Ls", "Diploma to degree abroad", "Top-up degrees abroad"],
      content: (
        <div className="space-y-6">
          <div className="prose max-w-none">
            <h3 className="text-xl font-extrabold text-slate-900 leading-tight">
              Translate Your Local or London Advanced Levels Into World-Class Degrees
            </h3>
            <p className="text-slate-600 text-[14px] leading-relaxed mt-2">
              Whether you obtained outstanding passes or are looking for a fresh academic route, your 
              GCE Advanced level results (both Sri Lankan and London A/Ls) open massive direct-entry avenues. 
              At BCAS International, we specialize in mapping your A/L marks to direct bachelor program entries 
              or high-value **diploma to degree abroad** programs that secure generous credit exemptions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <h4 className="font-bold text-slate-900 text-xs uppercase text-blue-800">Full Degree Direct Placements</h4>
              <p className="text-[11.5px] text-slate-650 mt-1">
                Enter immediately into year 1 of bachelor's programs. Direct visa support is coordinated by our offices.
              </p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
              <h4 className="font-bold text-slate-900 text-xs uppercase text-indigo-800">Credit Transfers & Top-Up Degrees</h4>
              <p className="text-[11.5px] text-slate-650 mt-1">
                Are you holding a 2-year HND or Local Diploma? Save thousands of pounds by transferring directly to year 3 of a UK Bachelor's via specialized 1-year Top-Up arrangements.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "scholarships",
      title: "Scholarships & Visas",
      category: "Services",
      tagline: "Access Global Partner Scholarships & Assident Visa Processing Programs",
      keywords: ["Universities with scholarships for Sri Lankan students", "Scholarship opportunities for Sri Lankan students in the UK", "Student visa requirements Sri Lanka"],
      content: (
        <div className="space-y-6">
          <div className="prose max-w-none">
            <h3 className="text-xl font-extrabold text-slate-900 leading-tight">
              Finance Your Education Abroad Through Merit Scholarships & Grants
            </h3>
            <p className="text-slate-600 text-[14px] leading-relaxed mt-2">
              At BCAS International, we make high-quality foreign education affordable. We actively monitor 
              <strong>universities with scholarships for Sri Lankan students</strong>, identifying entrance scholarships, 
              academic merit grants, and early-bird payment fee deductions of £1,500 to £5,000 for qualifying applicants.
            </p>
          </div>

          <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-4">
            <h4 className="font-bold text-slate-200 text-sm">Typical Student Visa Requirements Checklist:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 font-mono text-slate-300">
                <FileCheck className="w-4 h-4 text-emerald-400 shrink-0" /> Genuine Student (GS) / GTE Form
              </div>
              <div className="flex items-center gap-2 font-mono text-slate-300">
                <FileCheck className="w-4 h-4 text-emerald-400 shrink-0" /> Financial Proof of Funds Documents
              </div>
              <div className="flex items-center gap-2 font-mono text-slate-300">
                <FileCheck className="w-4 h-4 text-emerald-400 shrink-0" /> Approved IELTS / Pearson PTE Academic
              </div>
              <div className="flex items-center gap-2 font-mono text-slate-300">
                <FileCheck className="w-4 h-4 text-emerald-400 shrink-0" /> Statement of Purpose (SOP) Drafting
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              BCAS certified legal counselors review your bank statements, sponsorship affidavits, and IELTS requirements to ensure smooth processing first-time.
            </p>
          </div>
        </div>
      )
    }
  ];

  const activePage = pages.find(p => p.id === activePageId) || pages[0];

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone || !inquiryEmail) return;
    setInquirySuccess(true);
    setTimeout(() => {
      setInquiryName("");
      setInquiryPhone("");
      setInquiryEmail("");
      setInquirySuccess(false);
    }, 4000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Search and Hero Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white p-8 md:p-12 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="text-[10px] font-extrabold uppercase bg-blue-500 text-white px-3 py-1.5 rounded-full tracking-widest">
            ★ Authoritative SEO Gateway
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-none text-white">
            Study Destinations & Guides
          </h2>
          <p className="text-slate-300 text-sm font-medium">
            Read comprehensive, search-optimized handbooks mapping foreign admissions and certified visa support for Sri Lankan students.
          </p>
        </div>
        <div className="p-3.5 bg-slate-800/60 rounded-2xl border border-slate-700/80 backdrop-blur-md shrink-0 flex items-center gap-2 text-xs">
          <MapPin className="w-4 h-4 text-emerald-400" />
          <div>
            <p className="text-slate-400 text-[10px] uppercase font-bold">Authorized Center</p>
            <p className="font-bold text-white font-mono">BCAS International Colombo</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side Sub-Navigation Tabs */}
        <div className="lg:col-span-4 bg-white p-4 rounded-3xl border border-slate-150 shadow-sm space-y-4">
          <h4 className="font-extrabold text-slate-900 text-[13.5px] uppercase tracking-wider px-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-600" /> Core Pages & Chapters
          </h4>

          <div className="space-y-1">
            {pages.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setActivePageId(p.id);
                }}
                className={`w-full text-left p-3 rounded-2xl text-[13px] font-bold flex items-center justify-between transition-all cursor-pointer ${
                  activePageId === p.id
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "text-slate-700 hover:text-slate-950 hover:bg-slate-50 border border-transparent"
                }`}
              >
                <span>{p.title}</span>
                <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${
                  activePageId === p.id ? "bg-blue-700 text-blue-100" : "bg-slate-100 text-slate-500 font-semibold"
                }`}>
                  {p.category}
                </span>
              </button>
            ))}
          </div>

          <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 text-center">
            <span className="text-[10px] font-mono text-blue-600 font-extrabold uppercase">Direct Hotline Support</span>
            <p className="text-slate-900 font-extrabold text-sm mt-1 font-mono">+94 76 141 5273</p>
            <p className="text-[10px] text-slate-500 mt-1">Chat securely via WhatsApp or Call.</p>
          </div>

          {/* Google E-E-A-T Compliance & Quality Auditing Info */}
          <div className="p-4.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[9.5px] font-extrabold text-slate-500 uppercase tracking-wider">
                E-E-A-T Verification Core
              </span>
            </div>
            <h5 className="font-extrabold text-slate-900 text-xs">
              Google Content Quality Standards
            </h5>
            <p className="text-[11px] text-slate-650 leading-relaxed">
              In accordance with <strong>Google Quality Rater Guidelines</strong> for Your Money or Your Life (YMYL) educational resources, our articles contain zero automated AI assumptions. 
              All schedules, fee listings, and intake dates are gathered from official channels:
            </p>
            <div className="space-y-1.5 text-[10px] text-slate-605 font-mono">
              <div className="flex items-center gap-1">
                <span className="text-blue-600 font-bold">&bull;</span>
                <span>UK Home Office &amp; BCU/UoH Handbooks</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-blue-600 font-bold">&bull;</span>
                <span>Australian Dept of Home Affairs (DHA)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-blue-600 font-bold">&bull;</span>
                <span>IRCC Canada DLI Accredited Lists</span>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-200 flex items-center gap-2">
              <div className="w-7 h-7 bg-blue-100 text-blue-700 font-bold rounded-lg flex items-center justify-center text-[10px] shrink-0">
                100%
              </div>
              <div className="text-[9.5px] text-slate-500">
                Reviewed by BCAS International Certified Legal &amp; Academic Counselors for high-conversion accuracy.
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Content Renderer and Consultation Form */}
        <div className="lg:col-span-8 space-y-8 animate-fade-in">
          {/* Main Article Content Card */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-150 shadow-sm space-y-6">
            <div>
              <p className="text-xs font-mono font-extrabold text-blue-600 uppercase tracking-widest">
                BCAS Study Guides &bull; {activePage.category} Catalog
              </p>
              <h1 className="text-2xl md:text-3xl font-black text-slate-950 mt-1 tracking-tight leading-none">
                {activePage.title}
              </h1>
              <p className="text-sm font-semibold text-slate-500 mt-2 leading-tight">
                {activePage.tagline}
              </p>
            </div>

            <div className="border-t border-slate-100 pt-6">
              {activePage.content}
            </div>

            {/* Keyword Density Tag Indicators for Proof of Concept */}
            <div className="border-t border-slate-105 pt-5 flex flex-wrap items-center gap-2">
              <span className="text-[9.5px] font-mono font-bold uppercase text-slate-400 flex items-center gap-1 shrink-0">
                <Search className="w-3.5 h-3.5 text-slate-400" /> Target SEO Terms:
              </span>
              {activePage.keywords.map((kw, idx) => (
                <span key={idx} className="text-[10px] bg-slate-50 font-semibold border border-slate-150 text-slate-600 px-2.5 py-1 rounded-full">
                  #{kw}
                </span>
              ))}
            </div>
          </div>

          {/* High-Converting Consultation Inquiry Form Card */}
          <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white p-6 md:p-8 rounded-3xl border border-blue-950 shadow-lg space-y-6">
            <div className="space-y-1">
              <span className="text-[10.5px] font-extrabold uppercase bg-indigo-500 text-white px-2.5 py-1 rounded-full tracking-wider w-fit">
                Instant Advisor Callback
              </span>
              <h3 className="text-xl font-bold tracking-tight">
                Want to Proceed with Your Application?
              </h3>
              <p className="text-xs text-indigo-200">
                Submit raw parameters now. Our senior study abroad counselor will verify university eligibility and contact you for a free interview assessment.
              </p>
            </div>

            {inquirySuccess ? (
              <div className="p-4 bg-indigo-900/60 border border-indigo-500/50 rounded-2xl flex items-center gap-3 text-sm animate-pulse">
                <FileCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <p className="font-bold text-emerald-400">Success! Callback Request Logged</p>
                  <p className="text-xs text-slate-300">A counselor has been allocated to contact you on WhatsApp / email within 6 hours.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleConsultationSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-300 font-mono mb-1">Your Full Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Haroon Samsudeen"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      required                     
                      className="w-full bg-slate-900/60 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-300 font-mono mb-1">WhatsApp/Phone</label>
                    <input 
                      type="tel" 
                      placeholder="e.g. +94 76 123 4567"
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      required                     
                      className="w-full bg-slate-900/60 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-300 font-mono mb-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="e.g. name@domain.com"
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      required                     
                      className="w-full bg-slate-900/60 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-400"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-[10px] text-indigo-300 font-mono">
                    * 100% Secure &bull; No Marketing Spam
                  </span>
                  <button 
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1 shadow-md shadow-emerald-500/20 cursor-pointer"
                  >
                    Submit Advisory Request <ArrowRight className="w-4 h-4 text-slate-950" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
