import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote, Award, Sparkles, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SUCCESS_STORIES } from "../data/courses";

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isHovering, setIsHovering] = useState(false);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % SUCCESS_STORIES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + SUCCESS_STORIES.length) % SUCCESS_STORIES.length
    );
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Autoplay
  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovering, handleNext]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const activeStory = SUCCESS_STORIES[currentIndex];

  return (
    <div 
      id="testimonial-carousel-container"
      className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white rounded-3xl p-8 md:p-14 border border-slate-800 shadow-2xl overflow-hidden relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-8">
        {/* Header decoration */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-extrabold text-xs uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Success Stories</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Alumni Placements & Plaudits
          </h2>
          <p className="text-slate-400 text-sm max-w-xl">
            Read inspiring journeys of Sri Lankan peers who pursued foreign education pathways under the trusted stewardship of BCAS advisors.
          </p>
        </div>

        {/* Carousel Transition Area */}
        <div className="relative min-h-[300px] md:min-h-[240px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full text-center space-y-6 md:px-12"
            >
              {/* Star Rating decoration */}
              <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Quote Sign */}
              <div className="flex justify-center text-blue-500 opacity-80">
                <Quote className="w-10 h-10 rotate-180" />
              </div>

              {/* The Testimonial Text */}
              <p className="text-lg md:text-xl font-medium text-slate-100 leading-relaxed italic px-4">
                "{activeStory.testimonial}"
              </p>

              {/* Student Bio */}
              <div className="flex flex-col items-center space-y-2 pt-4 border-t border-slate-800/80 max-w-md mx-auto">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full border-2 border-blue-500/80 overflow-hidden shadow-lg flex-shrink-0 select-none bg-slate-850">
                    {activeStory.studentImage ? (
                      <img
                        src={activeStory.studentImage}
                        alt={activeStory.studentName}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center font-extrabold text-sm text-white">
                        {activeStory.studentName.split(" ").map(n => n[0]).join("")}
                      </div>
                    )}
                  </div>
                  <div className="text-left">
                    <h4 className="font-extrabold text-white text-base">
                      {activeStory.studentName}
                    </h4>
                    <p className="text-xs text-blue-400 font-semibold md:max-w-xs">
                      {activeStory.courseName}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-slate-400 font-mono mt-1">
                  <span>From Sri Lanka</span>
                  <span className="text-slate-600">&bull;</span>
                  <span className="text-slate-300 font-bold">{activeStory.destinationUniversity}</span>
                  <span className="text-slate-600">&bull;</span>
                  <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-sans text-[10px] font-bold">Class of {activeStory.placedYear}</span>
                </div>

                {activeStory.currentRole && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold mt-1.5 bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/10">
                    <Award className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Current Role: {activeStory.currentRole}</span>
                  </span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrow buttons and Dots indicators */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/50">
          {/* Slide dots */}
          <div className="flex gap-2">
            {SUCCESS_STORIES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx 
                    ? "bg-blue-500 w-8" 
                    : "bg-slate-700 hover:bg-slate-600"
                }`}
                aria-label={`Go to testimonial slice ${idx + 1}`}
              />
            ))}
          </div>

          {/* Nav arrows buttons */}
          <div className="flex items-center gap-3">
            <button
              id="prev-testimonial-btn"
              onClick={handlePrev}
              className="p-3 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white hover:border-slate-500 active:scale-95 transition-all cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              id="next-testimonial-btn"
              onClick={handleNext}
              className="p-3 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white hover:border-slate-500 active:scale-95 transition-all cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
