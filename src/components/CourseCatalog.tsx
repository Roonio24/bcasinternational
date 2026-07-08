import React, { useState } from "react";
import { Course } from "../types";
import { PRE_LOAD_COURSES } from "../data/courses";
import { 
  Building2, 
  MapPin, 
  Clock, 
  Calendar, 
  DollarSign, 
  BookOpen, 
  CheckCircle, 
  Scale, 
  Plus, 
  Trash2, 
  ArrowRightLeft,
  X,
  Search,
  ChevronRight,
  TrendingUp,
  FileCheck2
} from "lucide-react";

interface CourseCatalogProps {
  onApplyForCourse: (course: Course) => void;
}

export default function CourseCatalog({ onApplyForCourse }: CourseCatalogProps) {
  // Initialize state from localstorage helper
  const [courses, setCourses] = useState<Course[]>(() => {
    try {
      const saved = localStorage.getItem("bcas_custom_courses");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Local courses fallback error", e);
    }
    return PRE_LOAD_COURSES;
  });

  const [comparedCourseIds, setComparedCourseIds] = useState<string[]>([]);
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("All");
  const [selectedBudget, setSelectedBudget] = useState<string>("All");

  const countries = ["All", "United Kingdom", "Australia", "Canada", "Germany", "United States"];
  const budgetRanges = [
    { label: "All Budgets", value: "All" },
    { label: "Affordable (< £15k / AUD 30k)", value: "Low" },
    { label: "Standard (£15k-£18k / AUD 30k-35k)", value: "Medium" },
    { label: "Premium (> £18k / AUD 35k)", value: "High" }
  ];

  // Helper to parse tuition value for filtering
  const matchesBudget = (tuition: string, level: string) => {
    if (level === "All") return true;
    
    const match = tuition.match(/[\d,]+/);
    if (!match) return true;
    const num = parseInt(match[0].replace(/,/g, ""), 10);

    const isAudOrCad = tuition.includes("AUD") || tuition.includes("CAD");
    const isEuro = tuition.includes("€");

    let valInGBP = num;
    if (isAudOrCad) valInGBP = num * 0.52; // roughly convert to GBP
    if (isEuro) valInGBP = num * 0.85;

    if (level === "Low") return valInGBP < 15000;
    if (level === "Medium") return valInGBP >= 15000 && valInGBP <= 18000;
    if (level === "High") return valInGBP > 18000;

    return true;
  };

  // Filtered list
  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.universityName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCountr = selectedCountry === "All" || course.country === selectedCountry;
    const matchesBud = matchesBudget(course.annualTuition, selectedBudget);

    return matchesSearch && matchesCountr && matchesBud;
  });

  const toggleCompare = (courseId: string) => {
    if (comparedCourseIds.includes(courseId)) {
      setComparedCourseIds(prev => prev.filter(id => id !== courseId));
    } else {
      if (comparedCourseIds.length >= 3) {
        alert("You can compare a maximum of 3 courses side-by-side.");
        return;
      }
      setComparedCourseIds(prev => [...prev, courseId]);
    }
  };

  const clearCompared = () => setComparedCourseIds([]);

  const comparedCourses = courses.filter(c => comparedCourseIds.includes(c.id));



  return (
    <div className="space-y-12">
      {/* Header, Filters & File Management Suite */}
      <div className="bg-white border border-slate-150 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              International Admissions Catalog
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Compare tuition rates, language requisites, post-study work routes, and secure fast-track placements at BCAS partner universities.
            </p>
          </div>
        </div>



        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-6 relative">
            <Search className="absolute left-3.5 top-3 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by course name or university affiliation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-2.5 pl-11 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-2.5 px-3.5 text-sm text-slate-700 focus:outline-none focus:border-blue-500 max-h-48 overflow-y-auto"
            >
              {countries.map((c, idx) => (
                <option key={idx} value={c}>{c === "All" ? "Select All Countries" : c}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-2.5 px-3.5 text-sm text-slate-700 focus:outline-none focus:border-blue-500"
            >
              {budgetRanges.map((b, idx) => (
                <option key={idx} value={b.value}>{b.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Comparison Drawer/Dashboard */}
      {comparedCourseIds.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 text-white shadow-xl animate-fade-in relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -z-10" />
          
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
                <ArrowRightLeft className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xl font-bold">Course Match Comparison Dashboard</h3>
                <p className="text-xs text-slate-400">Comparing {comparedCourseIds.length} of max 3 courses side-by-side</p>
              </div>
            </div>
            <button 
              onClick={clearCompared}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear Compare
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {comparedCourses.map(course => (
              <div 
                key={course.id}
                className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-4 relative"
              >
                <button
                  type="button"
                  onClick={() => toggleCompare(course.id)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white hover:bg-slate-700 p-1 rounded transition-colors block cursor-pointer"
                  aria-label="Remove course from comparison"
                >
                  <X className="w-4 h-4" />
                </button>

                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400">
                    {course.country}
                  </span>
                  <h4 className="font-bold text-base leading-snug line-clamp-2 pr-4">{course.courseName}</h4>
                  <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-1 font-semibold">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {course.universityName}
                  </p>
                </div>

                <div className="space-y-2 text-xs border-t border-slate-700/60 pt-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Annual Tuition:</span>
                    <span className="font-bold text-white text-right">{course.annualTuition}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Est. Living Cost:</span>
                    <span className="font-medium text-slate-200 text-right">{course.estimatedLivingCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Intake Season:</span>
                    <span className="font-medium text-slate-200 text-right">{course.intake}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Employability:</span>
                    <span className="font-semibold text-emerald-400">{course.employabilityRate || "96% Rate"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Duration:</span>
                    <span className="font-medium text-slate-200 text-right">{course.duration}</span>
                  </div>
                </div>

                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/40 space-y-1">
                  <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Entry Requirements</p>
                  <p className="text-[11px] text-slate-300 leading-normal line-clamp-3">{course.entryRequirements}</p>
                </div>

                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/40 space-y-1">
                  <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Scholarship & Aid</p>
                  <p className="text-[11px] text-slate-300 leading-normal">{course.scholarshipAvailable}</p>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => onApplyForCourse(course)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1 shadow-md transition-colors cursor-pointer"
                  >
                    <FileCheck2 className="w-3.5 h-3.5" /> Start Portal Application
                  </button>
                </div>
              </div>
            ))}

            {Array.from({ length: 3 - comparedCourseIds.length }).map((_, idx) => (
              <div 
                key={idx}
                className="border-2 border-dashed border-slate-800 rounded-2xl flex flex-col justify-center items-center p-8 text-center text-slate-500 min-h-[300px]"
              >
                <div className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center mb-3">
                  <Plus className="w-5 h-5 text-slate-600" />
                </div>
                <p className="text-xs font-semibold">Empty Slot</p>
                <p className="text-[11px] text-slate-600 mt-1 max-w-[160px]">
                  Add another degree program down below to compare parameters side-by-side.
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Catalog View Grid */}
      <div className="space-y-6">
        <div className="flex justify-between items-center bg-white border border-slate-150 px-5 py-3 rounded-xl shadow-sm">
          <p className="text-slate-600 text-sm font-semibold">
            Showing <span className="text-slate-950 font-extrabold">{filteredCourses.length}</span> accredited programs
          </p>
          <div className="text-xs font-semibold text-slate-500">
            {courses.length > PRE_LOAD_COURSES.length ? (
              <span className="text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100/60 font-bold">
                ★ {courses.length - PRE_LOAD_COURSES.length} Custom Imports Loaded
              </span>
            ) : (
              <span>Standard Admissions List</span>
            )}
          </div>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center space-y-4">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
            <div>
              <p className="text-base font-bold text-slate-950">No courses match your selected parameters</p>
              <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
                Try clearing your search keyword, adjusting your budget level filters, or configuring the country selection to see all opportunities.
              </p>
            </div>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCountry("All");
                setSelectedBudget("All");
              }}
              className="bg-blue-50 hover:bg-blue-100 ring-1 ring-blue-100 text-blue-600 font-bold py-2 px-4 rounded-xl text-xs transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCourses.map(course => {
              const isCompared = comparedCourseIds.includes(course.id);
              return (
                <div 
                  key={course.id}
                  className="bg-white border border-slate-150 hover:border-slate-300 rounded-2xl p-6 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        <span className="inline-flex items-center gap-1 shrink-0 text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                          <MapPin className="w-3 h-3" /> {course.country}
                        </span>
                        {course.ranking && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-600 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
                            {course.ranking}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => toggleCompare(course.id)}
                        className={`text-xs inline-flex items-center gap-1 font-semibold px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                          isCompared 
                            ? "bg-slate-900 border-slate-900 text-white" 
                            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                        aria-label={isCompared ? "Compared" : "Add to compare"}
                      >
                        <Scale className="w-3.5 h-3.5" />
                        {isCompared ? "Compared" : "Compare"}
                      </button>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-lg text-slate-900 mb-1 leading-snug">
                        {course.courseName}
                      </h3>
                      <p className="text-sm font-semibold text-slate-600 flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-slate-400 shrink-0" /> {course.universityName}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-y-3 gap-x-4 border-t border-b border-slate-50 py-4 text-xs font-medium text-slate-700">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                        <div>
                          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Duration</p>
                          <p className="font-bold text-slate-800">{course.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                        <div>
                          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Next Intake</p>
                          <p className="font-bold text-slate-800">{course.intake}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-slate-400 shrink-0" />
                        <div>
                          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Annual Tuition</p>
                          <p className="font-extrabold text-blue-600">{course.annualTuition}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-slate-400 shrink-0" />
                        <div>
                          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Employability</p>
                          <p className="font-extrabold text-emerald-600">{course.employabilityRate || "96%"}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1 text-xs">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-slate-400" /> Entry Criteria Summary
                      </p>
                      <p className="text-slate-600 text-[11px] leading-normal">{course.entryRequirements}</p>
                    </div>

                    <div className="bg-amber-500/5 hover:bg-amber-500/10 p-3 rounded-xl border border-amber-500/10 space-y-1 text-xs">
                      <p className="text-[10px] font-bold text-amber-700 uppercase tracking-widest">
                        Available Scholarship
                      </p>
                      <p className="text-slate-700 text-[11px] leading-normal">{course.scholarshipAvailable}</p>
                    </div>
                  </div>

                  <div className="pt-6 flex gap-3">
                    <button
                      onClick={() => onApplyForCourse(course)}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      Apply Now with BCAS Counselors <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
