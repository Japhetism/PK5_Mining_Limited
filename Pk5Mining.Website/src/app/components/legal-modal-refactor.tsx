import { X, Scale, Fingerprint } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react"; // Added hooks
import { Modal } from "@/app/components/ui/modal";
import { useLegalModalState } from "../hooks/useLegalModalState";
import { privacyContent, termsContent } from "../fixtures";
import { LegalContent } from "../interfaces";

export function LegalModalRefactor() {
  const { isLegalModalOpen, mode, closeModal } = useLegalModalState();
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const isPrivacy = mode === "privacy";
  const content = isPrivacy ? privacyContent : termsContent;

  useEffect(() => {
    if (isLegalModalOpen) {
      setHasScrolledToBottom(false);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    }
  }, [isLegalModalOpen, mode]);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        setHasScrolledToBottom(true);
      }
    }
  };

  return (
    <Modal
      open={isLegalModalOpen}
      onClose={() => closeModal("modal")}
      maxWidth="lg"
      showCloseButton={false}
      panelClassName="bg-white rounded-xl overflow-hidden p-0 border-none shadow-2xl"
    >
      <div className="flex flex-col h-[90vh] md:h-[80vh] bg-white text-black font-sans">
        
        {/* Header */}
        <div className="flex-none flex items-center justify-between px-6 py-5 bg-black text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/10">
              {isPrivacy ? (
                <Fingerprint className="w-5 h-5 text-white" />
              ) : (
                <Scale className="w-5 h-5 text-white" />
              )}
            </div>
            <div>
              <p className="text-sm font-bold tracking-tight">
                {isPrivacy ? "Privacy Policy" : "Terms of Service"}
              </p>
              <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">
                PK5 Mining Limited
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => closeModal("modal")}
            className="p-2 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-8 bg-white scrollbar-thin scrollbar-thumb-gray-300"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="space-y-10 pb-10"
            >
              {content.map((item: LegalContent, index) => (
                <div key={index} className="group">
                  <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-gray-400 mb-4 group-hover:text-black transition-colors">
                    {item.subtitle}
                  </h4>
                  <p className="text-sm text-gray-800 leading-relaxed font-normal mb-4">
                    {item.text}
                  </p>
                  {item?.points && (
                    <ul className="space-y-3 ml-1">
                      {item.points.map((point, pIndex) => (
                        <li
                          key={pIndex}
                          className="flex flex-row items-start text-[13px] text-gray-600 leading-relaxed"
                        >
                          <span className="text-black font-bold mr-3 mt-[-2px]">
                            —
                          </span>
                          <span className="flex-1">{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer with Conditional Button */}
        <div className="flex-none px-6 py-5 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">
              Official Document
            </p>
            <p className="text-[10px] text-gray-500">
              {hasScrolledToBottom ? "Ready to accept" : "Please scroll to continue"}
            </p>
          </div>
          
          <button
            type="button"
            disabled={!hasScrolledToBottom}
            onClick={() => closeModal("modal")}
            className={`px-8 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all 
              ${hasScrolledToBottom 
                ? "bg-black text-white hover:bg-gray-800 active:scale-95 cursor-pointer shadow-lg shadow-black/10" 
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
          >
            I Acknowledge
          </button>
        </div>
      </div>
    </Modal>
  );
}