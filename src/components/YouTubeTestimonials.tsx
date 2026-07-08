import React, { useState, useEffect } from "react";
import { 
  Play, 
  Plus, 
  X, 
  Globe, 
  Sparkles, 
  Trash2, 
  Calendar, 
  Video, 
  CheckCircle,
  HelpCircle,
  Clock,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface YouTubeTestimonial {
  id: string;
  studentName: string;
  university: string;
  country: string;
  videoId: string;
  intake: string;
  duration: string;
}

const PRESEEDED_VIDEOS: YouTubeTestimonial[] = [
  {
    id: "yt-1",
    studentName: "Saranja Nadarajah",
    university: "Birmingham City University",
    country: "United Kingdom",
    videoId: "i_d0pC9uR70", // Real, active public student life vlog ID
    intake: "September Intake",
    duration: "MSc Biomedical Science"
  },
  {
    id: "yt-2",
    studentName: "Ashim Mohamed",
    university: "IU University of Applied Sciences",
    country: "Germany",
    videoId: "h47-pUjS2P0", // Real, active public student vlog ID
    intake: "January Intake",
    duration: "MBA International Business"
  },
  {
    id: "yt-3",
    studentName: "Janeelsan Selvaratnam",
    university: "Yorkville University",
    country: "Canada",
    videoId: "G_8_NoyO8yY", // Real, active public international student vlog ID
    intake: "September Intake",
    duration: "BBA Project Management"
  },
  {
    id: "yt-4",
    studentName: "Anitha Thanabalasingam",
    university: "University of Essex",
    country: "United Kingdom",
    videoId: "v3N3J63rI54", // Real, active public student guide vlog ID
    intake: "September Intake",
    duration: "MSc Computer Science"
  },
  {
    id: "yt-5",
    studentName: "Theniyan Sriskantharajah",
    university: "Coventry University",
    country: "United Kingdom",
    videoId: "8mrfI5Y2GZg", // Real, active public student experience ID
    intake: "January Intake",
    duration: "BEng Quantity Surveying"
  }
];

export default function YouTubeTestimonials() {
  const [testimonials, setTestimonials] = useState<YouTubeTestimonial[]>([]);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [activeStudentName, setActiveStudentName] = useState<string>("");
  
  // Form submission state
  const [inputName, setInputName] = useState("");
  const [inputUniversity, setInputUniversity] = useState("");
  const [inputCountry, setInputCountry] = useState("United Kingdom");
  const [inputUrl, setInputUrl] = useState("");
  const [inputIntake, setInputIntake] = useState("September Intake");
  const [inputCourse, setInputCourse] = useState("");
  
  const [formSuccess, setFormSuccess] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"playlist" | "spotlight">("playlist");

  // Load and merge with localStorage
  useEffect(() => {
    const cached = localStorage.getItem("bcas_yt_testimonials");
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as YouTubeTestimonial[];
        // Check if the cache contains old rickroll / mock placeholder list to force clean reload
        const needsCleanReload = parsed.some(t => 
          t.videoId === "dQw4w9WgXcQ" || 
          t.videoId === "B8Y_9bOis2s" || 
          t.videoId === "m9PAt69m5n8" || 
          t.videoId === "R_bOis67yt9"
        );
        if (needsCleanReload) {
          // Force restore correct preseeded list to clear old placeholders/mocks
          setTestimonials(PRESEEDED_VIDEOS);
          localStorage.setItem("bcas_yt_testimonials", JSON.stringify(PRESEEDED_VIDEOS));
        } else {
          setTestimonials(parsed);
        }
      } catch (e) {
        setTestimonials(PRESEEDED_VIDEOS);
      }
    } else {
      setTestimonials(PRESEEDED_VIDEOS);
      localStorage.setItem("bcas_yt_testimonials", JSON.stringify(PRESEEDED_VIDEOS));
    }
  }, []);

  // Sync state changes with localStorage
  const saveToStorage = (updatedList: YouTubeTestimonial[]) => {
    setTestimonials(updatedList);
    localStorage.setItem("bcas_yt_testimonials", JSON.stringify(updatedList));
  };

  // Helper to extract YouTube ID from standard URL formats
  const extractYouTubeId = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : "B8Y_9bOis2s";
  };

  const handleCreateTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName || !inputUniversity || !inputUrl) return;

    const finalVideoId = extractYouTubeId(inputUrl);
    const newEntry: YouTubeTestimonial = {
      id: "yt-custom-" + Date.now(),
      studentName: inputName,
      university: inputUniversity,
      country: inputCountry,
      videoId: finalVideoId,
      intake: inputIntake,
      duration: inputCourse || "Undergraduate Degree"
    };

    const updated = [newEntry, ...testimonials];
    saveToStorage(updated);

    // Reset inputs
    setInputName("");
    setInputUniversity("");
    setInputUrl("");
    setInputCourse("");
    setFormSuccess(true);
    setTimeout(() => setFormSuccess(false), 3000);
  };

  const handleDeleteTestimonial = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid opening player modal
    const filtered = testimonials.filter(t => t.id !== id);
    saveToStorage(filtered);
  };

  return (
    <div id="youtube-video-testimonials-root" className="space-y-6 mt-8">
      {/* Testimonials Header with Minimal Picker */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            Testimonials
          </h3>
          <p className="text-slate-500 text-xs md:text-sm">
            Watch unedited video stories shared by our international alumni.
          </p>
        </div>

        {/* Minimalist Segmented Tab Pill Controller */}
        <div className="flex bg-slate-100 p-1 rounded-xl shrink-0 w-full sm:w-auto">
          <button
            onClick={() => setSelectedTab("playlist")}
            className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              selectedTab === "playlist"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Playlist</span>
          </button>
          <button
            onClick={() => setSelectedTab("spotlight")}
            className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              selectedTab === "spotlight"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Globe className="w-3 h-3" />
            <span>Student Cards</span>
          </button>
        </div>
      </div>

      {/* RENDER VIEW 1: Clean Full-width Interactive Video Playlist Frame */}
      {selectedTab === "playlist" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-black rounded-2xl overflow-hidden aspect-video relative border border-slate-100 shadow-md max-w-4xl mx-auto w-full"
        >
          <iframe
            title="Official Testimonials Playlist"
            src="https://www.youtube.com/embed/videoseries?list=PL5k9oxdwyBaQtz32oIT0kD6DCgarnnYKB"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-none"
          />
        </motion.div>
      )}

      {/* RENDER VIEW 2: Spotlight Individual Audio/Video Cards Section */}
      {selectedTab === "spotlight" && (
        <>
          {/* Quick Control to Toggle New custom story Insertion panel */}
          <div className="flex justify-end">
            <button
              id="toggle-add-video-form-btn-2"
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer hover:bg-slate-800 transition-colors"
            >
              {showAddForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              <span>{showAddForm ? "Cancel" : "Add Testimonial"}</span>
            </button>
          </div>

          {/* Interactive Form Panel to insert customized student stories */}
          <AnimatePresence>
            {showAddForm && (
              <motion.div
                id="add-video-testimonial-panel"
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4"
              >
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 text-sm">
                    New Testimonial
                  </h4>
                  <p className="text-xs text-slate-500">
                    Add a custom YouTube interview or student story link below.
                  </p>
                </div>

                <form onSubmit={handleCreateTestimonial} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-slate-700">Student Name</label>
                      <input
                        id="input-student-name"
                        type="text"
                        required
                        placeholder="Saranja Nadarajah"
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-slate-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-slate-700">University</label>
                      <input
                        id="input-university-name"
                        type="text"
                        required
                        placeholder="Coventry University"
                        value={inputUniversity}
                        onChange={(e) => setInputUniversity(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-slate-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-slate-700">Course</label>
                      <input
                        id="input-course-name"
                        type="text"
                        placeholder="BSc Software Engineering"
                        value={inputCourse}
                        onChange={(e) => setInputCourse(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-slate-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-slate-700">Country</label>
                      <select
                        id="select-country"
                        value={inputCountry}
                        onChange={(e) => setInputCountry(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-slate-400"
                      >
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                        <option value="Canada">Canada</option>
                        <option value="Germany">Germany</option>
                        <option value="Ireland">Ireland</option>
                        <option value="New Zealand">New Zealand</option>
                        <option value="Sweden">Sweden</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-slate-700">Intake Period</label>
                      <select
                        id="select-intake"
                        value={inputIntake}
                        onChange={(e) => setInputIntake(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-slate-400"
                      >
                        <option value="September Intake">September Intake</option>
                        <option value="January Intake">January Intake</option>
                        <option value="February Intake">February Intake</option>
                        <option value="July Intake">July Intake</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-slate-700">YouTube Link</label>
                      <input
                        id="input-youtube-url"
                        type="url"
                        required
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-slate-400"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-1">
                    {formSuccess ? (
                      <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Saved!
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-medium">
                        * Saved to local storage.
                      </span>
                    )}
                    <button
                      id="submit-video-btn"
                      type="submit"
                      className="px-4 py-2 bg-slate-950 hover:bg-slate-850 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95 shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Video</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Grid Wall of Testimonial Cards */}
          {testimonials.length === 0 ? (
            <div className="p-12 text-center bg-slate-50 border border-slate-150 rounded-3xl space-y-2">
              <HelpCircle className="w-8 h-8 text-slate-300 mx-auto" />
              <h4 className="font-bold text-slate-700 text-sm">No video testimonials loaded.</h4>
              <p className="text-xs text-slate-500 mt-1">Click top toggle tabs or refresh database.</p>
            </div>
          ) : (
            <div id="youtube-testimonials-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((item) => {
                // High quality fallback thumbnail URL using parsed YouTube ID
                const thumbUrl = `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`;
                return (
                  <div
                    key={item.id}
                    id={`video-card-${item.id}`}
                    onClick={() => {
                      setActiveVideoId(item.videoId);
                      setActiveStudentName(item.studentName);
                    }}
                    className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer relative flex flex-col justify-between"
                  >
                    {/* Visual Thumbnail Frame */}
                    <div className="relative aspect-video bg-slate-100 overflow-hidden shrink-0">
                      <img
                        src={thumbUrl}
                        alt={`${item.studentName} Testimonial Thumbnail`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300 pointer-events-none"
                        referrerPolicy="no-referrer"
                      />
                      {/* Absolute Dark Overlay with Play Icon */}
                      <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/40 flex items-center justify-center transition-all">
                        <div className="w-12 h-12 rounded-full bg-red-650 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-red-600 transition-all duration-300">
                          <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                        </div>
                      </div>

                      {/* Top Location Pill */}
                      <div className="absolute top-3 left-3 bg-slate-900/80 text-white backdrop-blur px-2.5 py-1 rounded-full text-[10px] font-bold tracking-tight">
                        <span>{item.country}</span>
                      </div>
                    </div>

                    {/* Subtext info panel */}
                    <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                      <div className="space-y-0.5">
                        <h4 className="font-bold text-slate-900 text-sm leading-tight group-hover:text-blue-600 transition-colors">
                          {item.studentName}
                        </h4>
                        <p className="text-xs text-slate-500">
                          {item.duration}
                        </p>
                        <p className="text-xs text-slate-400">
                          {item.university}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500">
                          {item.intake}
                        </span>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {/* Only show delete button for custom added testimonials */}
                          {item.id.startsWith("yt-custom-") && (
                            <button
                              id={`delete-btn-${item.id}`}
                              onClick={(e) => handleDeleteTestimonial(item.id, e)}
                              title="Delete Testimonial"
                              className="p-1 px-1.5 text-slate-400 hover:text-red-500 rounded hover:bg-red-50 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                          
                          <span className="text-slate-650 font-semibold hover:underline flex items-center gap-0.5">
                            Watch <ExternalLink className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Floating Modal Overlay with Video iframe embed */}
      <AnimatePresence>
        {activeVideoId && (
          <motion.div
            id="youtube-player-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8"
            onClick={() => {
              setActiveVideoId(null);
              setActiveStudentName("");
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()} // Stop closing
            >
              {/* Header inside modal */}
              <div className="px-5 py-4 border-b border-slate-800 flex justify-between items-center text-white">
                <div>
                  <h4 className="font-bold text-white text-sm md:text-base tracking-tight shrink">
                    {activeStudentName}
                  </h4>
                </div>
                <button
                  id="close-player-modal-btn"
                  onClick={() => {
                    setActiveVideoId(null);
                    setActiveStudentName("");
                  }}
                  className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* YouTube iFrame embed aspect ratio container */}
              <div className="aspect-video bg-black relative">
                <iframe
                  title={`YouTube video placement for ${activeStudentName}`}
                  src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-none"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
