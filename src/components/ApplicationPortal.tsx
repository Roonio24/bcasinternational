import React, { useState } from "react";
import { StudentApplication, Course } from "../types";
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  GraduationCap, 
  ShieldAlert, 
  Sparkles,
  ClipboardList,
  Search,
  ChevronRight,
  Send,
  Loader2,
  CalendarDays,
  FileCheck2
} from "lucide-react";

interface ApplicationPortalProps {
  initialCourse?: Course | null;
  onClearSelectedCourse: () => void;
}

const DEFAULT_APPLICATIONS: StudentApplication[] = [
  {
    id: "APP-40291",
    fullName: "Aadhil Mohamed",
    email: "aadhil.m@gmail.com",
    phone: "+94 77 982 1204",
    passportNumber: "N4029188",
    dateOfBirth: "2003-05-14",
    highestQualification: "London GCE A-Levels (3 Passes)",
    gradesSummary: "Mathematics: B, Physics: B, Chemistry: C",
    englishProficiency: "IELTS 6.5 (R6.0, W6.5, L7.0, S6.5)",
    desiredCourseId: "uk-uwl-software",
    desiredCourseName: "BSc (Hons) Software Engineering with Cyber Security",
    desiredUniversity: "University of West London",
    desiredCountry: "United Kingdom",
    intakeSeason: "September 2026",
    status: "Offer_Issued",
    notes: "Offer letter issued on conditional IELTS validation. BCAS Visa officer assigned.",
    createdAt: "2026-06-15T10:30:00Z"
  },
  {
    id: "APP-39105",
    fullName: "Kaveesha Dilshani",
    email: "kavee.dil@yahoo.com",
    phone: "+94 71 883 4512",
    passportNumber: "N1924513",
    dateOfBirth: "2002-11-21",
    highestQualification: "Local Sri Lankan A-Levels (Pass)",
    gradesSummary: "Engineering Technology: A, Science: B, English: C",
    englishProficiency: "Pearson PTE 62 Overall",
    desiredCourseId: "aus-deakin-it",
    desiredCourseName: "Bachelor of Information Technology",
    desiredUniversity: "Deakin University",
    desiredCountry: "Australia",
    intakeSeason: "July 2026",
    status: "Visa_Lodged",
    notes: "GIC confirmed. Biometrics uploaded. Case pending Department of Home Affairs decision.",
    createdAt: "2026-06-10T14:15:00Z"
  }
];

export default function ApplicationPortal({ initialCourse, onClearSelectedCourse }: ApplicationPortalProps) {
  const [applications, setApplications] = useState<StudentApplication[]>(DEFAULT_APPLICATIONS);
  
  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [highestQualification, setHighestQualification] = useState("Local Sri Lankan A-Levels (Pass)");
  const [gradesSummary, setGradesSummary] = useState("");
  const [englishProficiency, setEnglishProficiency] = useState("IELTS 6.5 overall");
  const [intakeSeason, setIntakeSeason] = useState("September 2026");
  
  // Quick pre-fill Course if clicked from catalog
  const [selectedCourseName, setSelectedCourseName] = useState(initialCourse?.courseName || "BSc (Hons) AI and Computing");
  const [selectedUniversity, setSelectedUniversity] = useState(initialCourse?.universityName || "University of West London");
  const [selectedCountry, setSelectedCountry] = useState(initialCourse?.country || "United Kingdom");

  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState<StudentApplication | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleCreateApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;

    setIsSubmitting(true);

    const newAppId = `APP-${Math.floor(10000 + Math.random() * 90000)}`;
    const newApp: StudentApplication = {
      id: newAppId,
      fullName,
      email,
      phone,
      passportNumber,
      dateOfBirth,
      highestQualification,
      gradesSummary,
      englishProficiency,
      desiredCourseId: initialCourse?.id || "custom-id",
      desiredCourseName: initialCourse?.courseName || selectedCourseName,
      desiredUniversity: initialCourse?.universityName || selectedUniversity,
      desiredCountry: initialCourse?.country || selectedCountry,
      intakeSeason,
      status: "Submitted",
      notes: "BCAS Admissions agent is performing document integrity checks.",
      createdAt: new Date().toISOString()
    };

    try {
      await fetch("https://formspree.io/f/xrewwknz", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...newApp, source: "application-portal" })
      });
    } catch {
      // Even if the email notification fails, keep the local application
      // tracking flow working so the student still gets their ID/status.
    }

    setApplications(prev => [newApp, ...prev]);
    setSuccessMsg(`Congratulations! Your application has been logged on the BCAS international portal. Save your Application ID: ${newAppId}`);

    // Reset Form fields
    setFullName("");
    setEmail("");
    setPhone("");
    setPassportNumber("");
    setDateOfBirth("");
    setGradesSummary("");
    onClearSelectedCourse();
    setIsSubmitting(false);

    // Auto-focus search status on the newly created app to show off the cool tracking stepper
    setSearchId(newAppId);
    setSearchResult(newApp);
  };

  const handleSearchApp = (e: React.FormEvent) => {
    e.preventDefault();
    const app = applications.find(a => a.id.toLowerCase() === searchId.trim().toLowerCase());
    if (app) {
      setSearchResult(app);
    } else {
      setSearchResult(null);
      alert(`No active submission found with ID "${searchId}". Make sure it is formatted exactly like (e.g. APP-40291).`);
    }
  };

  const getStatusStepClass = (currentStatus: string, stepName: string) => {
    const statusOrder = ["Submitted", "Verified", "Offer_Issued", "Deposit_Paid", "Visa_Lodged", "Approved"];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const stepIndex = statusOrder.indexOf(stepName);

    if (currentIndex >= stepIndex) {
      return "bg-blue-600 border-blue-600 text-white font-black";
    }
    return "bg-slate-100 border-slate-200 text-slate-400";
  };

  return (
    <div className="space-y-12">
      {/* Banner / Guide */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
        <div className="space-y-1">
          <h3 className="text-xl font-bold">BCAS Fast-Track Placements Portal</h3>
          <p className="text-xs text-slate-300">
            Submit credentials directly to University admissions officers. Track real-time progress of conditional offers and visa lodging stages.
          </p>
        </div>
        
        {/* Search portal status bar */}
        <form onSubmit={handleSearchApp} className="flex gap-2">
          <input
            type="text"
            placeholder="Enter App ID (e.g. APP-40291)"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="bg-white/10 text-white placeholder-slate-400 text-xs rounded-xl py-2 px-3 border border-slate-700/60 focus:outline-none focus:border-blue-400 w-48 font-mono"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3.5 rounded-xl text-xs flex items-center gap-1 cursor-pointer transition-colors"
          >
            <Search className="w-3.5 h-3.5" /> Track
          </button>
        </form>
      </div>

      {/* Tracker display if search is active */}
      {searchResult && (
        <div className="bg-slate-50 border-2 border-blue-100 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 pb-4 border-b border-slate-200">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-extrabold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                  ID: {searchResult.id}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  Logged on {new Date(searchResult.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h4 className="text-lg font-extrabold text-slate-900">
                Admissions File of <span className="text-blue-600">{searchResult.fullName}</span>
              </h4>
            </div>

            <button
              onClick={() => {
                setSearchResult(null);
                setSearchId("");
              }}
              className="text-xs font-semibold text-slate-400 hover:text-slate-600 cursor-pointer self-start md:self-auto"
            >
              Close Tracker View
            </button>
          </div>

          {/* Stepper tracker bar */}
          <div className="space-y-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Placements & Visa Stage Progress
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {[
                { label: "Submitted", name: "Submitted", desc: "Form & file logged" },
                { label: "Credentials Verified", name: "Verified", desc: "BCAS checks complete" },
                { label: "Offer Issued", name: "Offer_Issued", desc: "University conditional seat" },
                { label: "Deposit Pre-Paid", name: "Deposit_Paid", desc: "Tuition seat locked" },
                { label: "Visa Lodged", name: "Visa_Lodged", desc: "Embassy file uploaded" },
                { label: "Approved / Issued", name: "Approved", desc: "Ready to depart" }
              ].map((step, idx) => (
                <div key={idx} className="space-y-2 text-center bg-white p-3 rounded-xl border border-slate-100 flex flex-col justify-between">
                  <div className={`w-7 h-7 mx-auto rounded-full border flex items-center justify-center text-xs font-bold ${getStatusStepClass(searchResult.status, step.name)}`}>
                    {idx + 1}
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-800 text-[11px] leading-tight">{step.label}</p>
                    <p className="text-[10px] text-slate-500 leading-normal">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-100 p-4 rounded-xl flex gap-3.5 items-start">
            <ClipboardList className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
            <div className="text-xs space-y-1">
              <p className="font-bold text-slate-800">Assigned Case Counselor Remarks:</p>
              <p className="text-slate-700 leading-relaxed font-sans italic">
                "{searchResult.notes || "No updates logged by visa department yet."}"
              </p>
            </div>
          </div>

          {/* Course Placements Recap */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
            <div className="bg-white border border-slate-100 p-4 rounded-xl">
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Target Course Name</p>
              <p className="font-bold text-slate-800 mt-1">{searchResult.desiredCourseName}</p>
            </div>
            <div className="bg-white border border-slate-100 p-4 rounded-xl">
              <p className="text-[10px] text-slate-400 uppercase font-semibold">University Affiliation</p>
              <p className="font-semibold text-slate-700 mt-1">{searchResult.desiredUniversity}</p>
            </div>
            <div className="bg-white border border-slate-100 p-4 rounded-xl">
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Study Destination</p>
              <p className="font-bold text-blue-600 mt-1">{searchResult.desiredCountry} ({searchResult.intakeSeason})</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: Application creation Form on Left, quick directory list on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Registration Form */}
        <div className="lg:col-span-8 bg-white border border-slate-150 p-6 md:p-8 rounded-2xl shadow-sm space-y-6">
          <div className="flex justify-between items-start border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Admissions Form</h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Submit academic credits directly. Mandatory fields are verified internally by registered BCAS agents.
              </p>
            </div>

            {initialCourse && (
              <div className="bg-blue-50 text-blue-600 border border-blue-100 rounded-lg p-2.5 text-xs font-mono max-w-[240px] text-right">
                <p className="font-bold">Target Placements Link</p>
                <p className="truncate font-semibold">{initialCourse.courseName}</p>
                <button 
                  onClick={onClearSelectedCourse}
                  className="text-[10px] underline font-bold hover:text-blue-700"
                >
                  Change Course
                </button>
              </div>
            )}
          </div>

          {successMsg && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-xl flex gap-3 items-start animate-pulse">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-xs font-sans leading-relaxed">{successMsg}</p>
            </div>
          )}

          <form onSubmit={handleCreateApplication} className="space-y-6">
            {/* Section 1: Personal Particulars */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest flex items-center gap-1">
                <User className="w-3.5 h-3.5" /> 1. Personal & Passport Particulars
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Mohamed Haroon Samsudeen"
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-2.5 px-3.5 text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. haroon@gmail.com"
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-2.5 px-3.5 text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Phone / Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +94 77 123 4567"
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-2.5 px-3.5 text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                      Passport/ID No
                    </label>
                    <input
                      type="text"
                      required
                      value={passportNumber}
                      onChange={(e) => setPassportNumber(e.target.value)}
                      placeholder="e.g. N1234567"
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-2.5 px-3.5 text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                      Birth Date
                    </label>
                    <input
                      type="date"
                      required
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-2 px-3.5 text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Educational Credits */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5" /> 2. Educational Transcript Records
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Highest Level of Qualification Completed
                  </label>
                  <select
                    value={highestQualification}
                    onChange={(e) => setHighestQualification(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-2.5 px-3.5 text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                  >
                    <option>Local Sri Lankan A-Levels (Pass)</option>
                    <option>London GCE A-Levels (3 Passes)</option>
                    <option>Higher National Diploma (HND) / Advanced BTEC</option>
                    <option>Recognized University Bachelor Degree</option>
                    <option>BCAS Internal Foundation Certificate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    English Language Exam Score (IELTS/PTE)
                  </label>
                  <input
                    type="text"
                    required
                    value={englishProficiency}
                    onChange={(e) => setEnglishProficiency(e.target.value)}
                    placeholder="e.g. IELTS 6.5 overall (No band less than 6.0)"
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-2.5 px-3.5 text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    List of Grades / Marks Summary
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={gradesSummary}
                    onChange={(e) => setGradesSummary(e.target.value)}
                    placeholder="e.g. Combined Mathematics: B, Physics: B, Chemistry: C, English: Pass"
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-2.5 px-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Target Placements Option (Show only if course is not selected) */}
            {!initialCourse && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> 3. Target Course & Placements Country
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                      Target Course Title
                    </label>
                    <input
                      type="text"
                      value={selectedCourseName}
                      onChange={(e) => setSelectedCourseName(e.target.value)}
                      placeholder="e.g. BSc Software Engineering"
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-2.5 px-3.5 text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                      Preferred University Name
                    </label>
                    <input
                      type="text"
                      value={selectedUniversity}
                      onChange={(e) => setSelectedUniversity(e.target.value)}
                      placeholder="e.g. University of West London"
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-2.5 px-3.5 text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                      Destination Country
                    </label>
                    <select
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-2.5 px-3.5 text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                    >
                      <option>United Kingdom</option>
                      <option>Australia</option>
                      <option>Canada</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Section 4: Intake & Acknowledgment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Desired Intake Season
                </label>
                <select
                  value={intakeSeason}
                  onChange={(e) => setIntakeSeason(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-2.5 px-3.5 text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                >
                  <option>September 2026</option>
                  <option>January/February 2027</option>
                  <option>May/June 2027</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Verifying Records & Lodging...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Finalize Direct Seat Submission
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Existing Applications sidebar info */}
        <div className="lg:col-span-4 bg-slate-50 border border-slate-150 p-6 rounded-2xl space-y-6">
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900 text-sm">Recent Direct Registrations</h4>
            <p className="text-xs text-slate-500">Live submissions tracked on global central nodes.</p>
          </div>

          <div className="space-y-4">
            {applications.map((app) => (
              <div 
                key={app.id}
                onClick={() => {
                  setSearchId(app.id);
                  setSearchResult(app);
                }}
                className="bg-white hover:bg-blue-50 p-4 rounded-xl border border-slate-200/80 hover:border-blue-300 transition-all cursor-pointer space-y-3"
              >
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="font-mono text-blue-600 bg-blue-50/80 border border-blue-100 px-2 py-0.5 rounded">
                    {app.id}
                  </span>
                  <span className="text-slate-500">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div>
                  <h5 className="font-extrabold text-slate-950 text-sm">{app.fullName}</h5>
                  <p className="text-xs text-slate-500 leading-normal line-clamp-1">
                    {app.desiredCourseName}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-2.5 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" /> {app.desiredCountry}
                  </span>
                  
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    app.status === "Approved" 
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                      : app.status === "Visa_Lodged"
                      ? "bg-purple-50 text-purple-600 border border-purple-100"
                      : app.status === "Offer_Issued"
                      ? "bg-blue-50 text-blue-600 border border-blue-100"
                      : "bg-slate-50 text-slate-600 border border-slate-100"
                  }`}>
                    {app.status.replace("_", " ")}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-100 border border-slate-200 p-4 rounded-xl space-y-2 text-xs">
            <h5 className="font-bold text-slate-700 flex items-center gap-1">
              <ShieldAlert className="w-4 h-4 text-slate-500" /> Security Verification Policy
            </h5>
            <p className="text-slate-600 leading-normal text-[11px]">
              By submitting files to the BCAS integrated portal, you certify that all transcripts, high school diplomas, GIC statements and IELTS/PTE documents are authentic and unmodified.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
