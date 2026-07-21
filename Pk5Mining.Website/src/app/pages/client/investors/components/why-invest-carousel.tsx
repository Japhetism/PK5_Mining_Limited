import { useState, useRef, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ImageWithFallback } from "@/app/components/ui/ImageWithFallback";
import { ChevronLeft, ChevronRight, LogIn } from "lucide-react";
import { slides } from "@/app/data/investor";
import { EASE } from "@/app/constants";

export function WhyInvestCarousel({
  onLoginClick,
}: {
  onLoginClick: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback((to: number, d: number) => {
    setDir(d);
    setIdx((to + slides.length) % slides.length);
  }, []);
  const next = useCallback(() => go(idx + 1, 1), [idx, go]);
  const prev = useCallback(() => go(idx - 1, -1), [idx, go]);

  useEffect(() => {
    timer.current = setTimeout(next, 5000);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [idx, next]);

  const slide = slides[idx];
  const Icon = slide.icon;

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <div className="px-8 sm:px-12 xl:px-16 pt-10">
      {/* Carousel frame */}
      <div
        className="relative w-full overflow-hidden rounded-2xl"
        style={{ height: "380px" }}
      >
        {/* Background image */}
        <AnimatePresence initial={false}>
          <motion.div
            key={`bg-${idx}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <ImageWithFallback
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover"
              style={{ opacity: 0.45 }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#060408]/95 via-[#060408]/72 to-[#060408]/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060408]/80 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* ── Right: Already an investor? — vertically centered ── */}
        <div className="absolute right-8 top-0 bottom-0 z-20 flex flex-col items-center justify-center gap-3">
          <span className="text-base text-[#ccc] font-semibold text-center hidden sm:block">
            Already an investor at PK5?
          </span>
          <motion.button
            onClick={onLoginClick}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-black font-bold text-base bg-gradient-to-r from-[#C89B3C] to-[#E5C158] shadow-lg shadow-[#C89B3C]/25 transition-all duration-200"
          >
            <LogIn className="w-3.5 h-3.5" />
            Investor Login
          </motion.button>
        </div>

        {/* Slide content */}
        <div className="relative z-10 h-full flex items-center px-10 py-10">
          <AnimatePresence custom={dir} mode="wait">
            <motion.div
              key={idx}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.42, ease: EASE }}
              className="max-w-2xl"
            >
              <div
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-[#C89B3C] mb-4"
                style={{
                  background: "rgba(200,155,60,0.15)",
                  border: "1px solid rgba(200,155,60,0.35)",
                }}
              >
                <Icon className="w-3 h-3" />
                {slide.accent}
              </div>
              <h3 className="text-3xl xl:text-4xl font-bold text-white mb-3 leading-tight">
                {slide.title}
              </h3>
              <p className="text-base text-[#ccc] leading-relaxed max-w-lg">
                {slide.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute right-16 bottom-5 z-20 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:bg-white/15"
          style={{
            background: "rgba(255,255,255,0.09)",
            border: "1px solid rgba(255,255,255,0.16)",
          }}
        >
          <ChevronLeft className="w-4 h-4 text-white" />
        </button>
        <button
          onClick={next}
          className="absolute right-5 bottom-5 z-20 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:bg-white/15"
          style={{
            background: "rgba(255,255,255,0.09)",
            border: "1px solid rgba(255,255,255,0.16)",
          }}
        >
          <ChevronRight className="w-4 h-4 text-white" />
        </button>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
          <motion.div
            key={idx}
            className="h-full bg-gradient-to-r from-[#C89B3C] to-[#E5C158]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
          />
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center gap-2 mt-5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i, i > idx ? 1 : -1)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === idx ? "28px" : "7px",
              height: "7px",
              background: i === idx ? "#C89B3C" : "rgba(255,255,255,0.2)",
            }}
          />
        ))}
        <span className="ml-auto text-xs text-[#555] font-medium">
          {String(idx + 1).padStart(2, "0")} /{" "}
          {String(slides.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
