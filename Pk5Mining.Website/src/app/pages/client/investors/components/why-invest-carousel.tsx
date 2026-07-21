import { useState, useRef, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ImageWithFallback } from "@/app/components/ui/ImageWithFallback";
import { ChevronDown, ChevronLeft, ChevronRight, LogIn } from "lucide-react";
import { slides } from "@/app/data/investor";
import { EASE } from "@/app/constants";

export function WhyInvestCarousel({ onLoginClick }: { onLoginClick: () => void }) {
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
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [idx, next]);

  const slide = slides[idx];
  const Icon = slide.icon;

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <div className="relative w-full" style={{ height: 'calc(100vh - 96px)' }}>
      <div className="relative w-full h-full overflow-hidden">

        {/* ── Background image with crossfade ── */}
        <AnimatePresence initial={false}>
          <motion.div
            key={`bg-${idx}`}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <ImageWithFallback
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover"
              style={{ opacity: 0.38 }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Radial vignette + bottom gradient */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 20%, rgba(6,4,8,0.72) 100%)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060408] via-[#060408]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060408]/50 via-transparent to-transparent" />

        {/* ── Prev / Next — flanking arrows at mid-height ── */}
        <button
          onClick={prev}
          className="absolute left-5 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:border-white/30"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.13)', backdropFilter: 'blur(8px)' }}
        >
          <ChevronLeft className="w-5 h-5 text-white/70" />
        </button>
        <button
          onClick={next}
          className="absolute right-5 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:border-white/30"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.13)', backdropFilter: 'blur(8px)' }}
        >
          <ChevronRight className="w-5 h-5 text-white/70" />
        </button>

        {/* ── Central content column ── */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-12 sm:px-24 xl:px-40 text-center">

          {/* Changing slide text */}
          <AnimatePresence custom={dir} mode="wait">
            <motion.div
              key={idx}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: EASE }}
              className="flex flex-col items-center"
            >
              {/* Accent pill */}
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#C89B3C] mb-6 tracking-wide"
                style={{ background: 'rgba(200,155,60,0.12)', border: '1px solid rgba(200,155,60,0.28)' }}
              >
                <Icon className="w-3.5 h-3.5" />
                {slide.accent}
              </div>

              {/* Headline */}
              <h2 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-white leading-tight mb-5 max-w-3xl">
                {slide.title}
              </h2>

              {/* Body */}
              <p className="text-base sm:text-lg text-white/75 leading-relaxed max-w-xl">
                {slide.desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* ── Already an investor — static, below the slide text ── */}
          <div className="mt-10 flex flex-col items-center gap-4">
            {/* Thin rule */}
            <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.15), transparent)' }} />

            {/* Glass pill containing label + button */}
            <div
              className="flex flex-col sm:flex-row items-center gap-4 px-6 py-3.5 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', backdropFilter: 'blur(12px)' }}
            >
              <p className="text-sm text-white/50 font-medium tracking-wide whitespace-nowrap">
                Already an investor at PK5?
              </p>
              <div className="w-px h-4 bg-white/10 hidden sm:block" />
              <motion.button
                onClick={onLoginClick}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-[#0a0a0a] font-bold text-sm bg-gradient-to-r from-[#C89B3C] to-[#E5C158] shadow-lg shadow-[#C89B3C]/20 transition-shadow duration-200 hover:shadow-[#C89B3C]/40 whitespace-nowrap"
              >
                <LogIn className="w-3.5 h-3.5" />
                Login
              </motion.button>
            </div>
          </div>
        </div>

        {/* ── Bottom bar: dots + counter + scroll cue ── */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-8 sm:px-12 xl:px-16 pb-7 flex items-end justify-between">

          {/* Dots + counter */}
          <div className="flex items-center gap-2.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i, i > idx ? 1 : -1)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === idx ? '24px' : '6px',
                  height: '6px',
                  background: i === idx ? '#C89B3C' : 'rgba(255,255,255,0.18)',
                }}
              />
            ))}
            <span className="ml-2 text-[11px] text-white/25 font-medium tabular-nums">
              {String(idx + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
          </div>

          {/* Scroll cue */}
          <motion.div
            className="flex flex-col items-center gap-1 cursor-default select-none"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/25 font-semibold">Scroll</span>
            <ChevronDown className="w-3.5 h-3.5 text-white/25" />
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/8">
          <motion.div
            key={idx}
            className="h-full bg-gradient-to-r from-[#C89B3C] to-[#E5C158]"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 5, ease: 'linear' }}
          />
        </div>
      </div>
    </div>
  );
}
