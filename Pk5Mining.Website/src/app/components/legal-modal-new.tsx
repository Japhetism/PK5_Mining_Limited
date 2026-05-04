import { useState, useRef, useEffect } from "react";
import { X, Scale, Fingerprint, ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Modal } from "@/app/components/ui/modal";
import { useLegalModalState } from "../hooks/useLegalModalState";
import { privacyContent, termsContent } from "../fixtures";
import { LegalContent } from "../interfaces";

function ReadingProgress({ 
  containerRef 
}: { 
  containerRef: React.RefObject<HTMLDivElement | null> 
}) {
  const { scrollYProgress } = useScroll({
    container: containerRef as React.RefObject<HTMLDivElement>,
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c89b3c] origin-left z-30"
      style={{ scaleX }}
    />
  );
}

export function LegalModalNew() {
  const { isLegalModalOpen, mode, closeModal } = useLegalModalState();
  const [canAcknowledge, setCanAcknowledge] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isPrivacy = mode === "privacy";
  const content = isPrivacy ? privacyContent : termsContent;

  useEffect(() => {
    if (isLegalModalOpen) {
      setCanAcknowledge(false);
      const timer = setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = 0;
        }
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [isLegalModalOpen, mode]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      if (scrollHeight <= clientHeight || scrollHeight - scrollTop <= clientHeight + 25) {
        setCanAcknowledge(true);
      }
    }
  };

  return (
    <Modal
      open={isLegalModalOpen}
      onClose={() => closeModal("modal")}
      maxWidth="lg"
      height="md"
      showCloseButton={false}
      panelClassName="h-auto overflow-hidden rounded-xl border border-gray-800 shadow-2xl"
    >
      <div className="flex flex-col max-h-[85vh] bg-[#0a0a0a]">
        {/* Header - Stays Fixed at Top */}
        <div className="relative flex items-center justify-between px-6 py-5 border-b border-gray-800 bg-[#0f0f0f] z-20">
          <div className="flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-[#c89b3c]/10 border border-[#c89b3c]/20">
              {isPrivacy ? (
                <Fingerprint className="w-5 h-5 text-[#c89b3c]" />
              ) : (
                <Scale className="w-5 h-5 text-[#c89b3c]" />
              )}
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">
                {isPrivacy ? "Privacy Policy" : "Terms of Service"}
              </h2>
            </div>
          </div>

          <button
            onClick={() => closeModal("modal")}
            className="p-2 rounded-full hover:bg-white/5 text-gray-500 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <ReadingProgress containerRef={scrollRef} />
        </div>

        <div
          key={mode}
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-8 space-y-12 scrollbar-black"
        >
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {content.map((item: LegalContent, index) => (
                <motion.section
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="mb-12 last:mb-0"
                >
                  <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-[#c89b3c]/80 mb-4 flex items-center gap-2">
                    {item.subtitle}
                  </h4>
                  <p className="text-[15px] text-gray-200 leading-relaxed font-normal selection:bg-[#c89b3c]/40">
                    {item.text}
                  </p>

                  {item?.points && (
                    <ul className="mt-6 space-y-4">
                      {item.points.map((point, pIdx) => (
                        <motion.li
                          key={pIdx}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: pIdx * 0.05 }}
                          className="flex items-start gap-3 text-sm text-gray-400 group"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#c89b3c]/40 group-hover:bg-[#c89b3c] transition-colors" />
                          <span className="flex-1 leading-relaxed group-hover:text-gray-100 transition-colors">
                            {point}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </motion.section>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="px-6 py-5 border-t border-gray-800 bg-[#0f0f0f] flex items-center justify-between z-20">
          <div className="flex flex-col gap-1">
            <p className="text-[10px] text-gray-500 font-medium">
              Effective Date: April 2026
            </p>
            {!canAcknowledge && (
              <motion.div
                animate={{ y: [0, 3, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="flex items-center gap-1.5 text-[10px] text-[#c89b3c]"
              >
                <ChevronDown className="w-3 h-3" />
                <span>Scroll to the end to acknowledge</span>
              </motion.div>
            )}
          </div>

          <button
            type="button"
            disabled={!canAcknowledge}
            onClick={() => closeModal("modal")}
            className={`
              relative px-10 py-3 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all duration-500
              ${
                canAcknowledge
                  ? "bg-[#c89b3c] text-black shadow-[0_0_20px_rgba(200,155,60,0.3)] hover:bg-[#d4a84a] active:scale-95 cursor-pointer"
                  : "bg-gray-800/50 text-gray-600 cursor-not-allowed opacity-50"
              }
            `}
          >
            I Acknowledge
          </button>
        </div>
      </div>
    </Modal>
  );
}