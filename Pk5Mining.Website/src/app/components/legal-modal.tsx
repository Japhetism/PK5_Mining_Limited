import { X, Scale, Fingerprint } from "lucide-react";
import { Modal } from "@/app/components/ui/modal";
import { useLegalModalState } from "../hooks/useLegalModalState";
import { privacyContent, termsContent } from "../fixtures";
import { LegalContent } from "../interfaces";

export function LegalModal() {
  const { isOpen, mode, closeModal } = useLegalModalState();

  const isPrivacy = mode === "privacy";

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      maxWidth="lg"
      height="md"
      showCloseButton={false}
      panelClassName="h-auto"
    >
      <div className="flex flex-col max-h-[85vh]">
        {/* Header - Dynamic Title */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800 bg-[#0f0f0f]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#c89b3c]/10">
              {isPrivacy ? (
                <Fingerprint className="w-5 h-5 text-[#c89b3c]" />
              ) : (
                <Scale className="w-5 h-5 text-[#c89b3c]" />
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                {isPrivacy ? "Privacy Policy" : "Terms of Service"}
              </p>
              <p className="text-[10px] text-white uppercase tracking-[0.2em]">
                PK5 Mining Limited
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="p-2 rounded-md hover:bg-white/10 text-gray-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-8 bg-[#0a0a0a] scrollbar-thin scrollbar-thumb-gray-800">
          <div className="space-y-8">
            {(isPrivacy ? privacyContent : termsContent).map(
              (item: LegalContent, index) => (
                <div
                  key={index}
                  className="animate-in fade-in slide-in-from-bottom-2 duration-400"
                >
                  <h4 className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#c89b3c] mb-3">
                    {item.subtitle}
                  </h4>
                  <p className="text-md text-white leading-relaxed font-light">
                    {item.text}
                  </p>
                  <ul className="text-sm text-white leading-relaxed font-light ml-5">
                    {item?.points?.map((point, index) => (
                      <li
                        key={index}
                        className="flex flex-row items-start mb-1"
                      >
                        {/* Platinum light grey bullet */}
                        <span
                          className="text-[#E0E0E0] mr-2"
                          style={{ fontSize: "1.2rem", lineHeight: "1rem" }}
                        >
                          •
                        </span>
                        <span className="flex-1">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-800 bg-[#0f0f0f] flex items-center justify-between">
          <p className="text-[10px] text-gray-600">
            Effective Date: April 2026
          </p>
          <button
            type="button"
            onClick={closeModal}
            className="px-8 py-2.5 rounded-md bg-[#c89b3c] text-black text-[11px] font-bold uppercase tracking-wider hover:bg-[#d4a84a] transition-all"
          >
            I Acknowledge
          </button>
        </div>
      </div>
    </Modal>
  );
}
