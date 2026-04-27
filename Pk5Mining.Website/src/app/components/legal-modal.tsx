import { X, Scale, Fingerprint } from "lucide-react";
import { Modal } from "@/app/components/ui/modal";

type LegalModalProps = {
  open: boolean;
  onClose: () => void;
  mode: "privacy" | "terms";
};

export function LegalModal({ open, onClose, mode }: LegalModalProps) {
  
  const privacyContent = [
    { 
      subtitle: "1. Data Collection & Scope", 
      text: "PK5 Mining Limited collects personal identification data, including but not limited to: full legal names, contact information, National Identity Numbers (NIN), professional history, and educational qualifications. We also collect metadata related to your submission for security purposes." 
    },
    { 
      subtitle: "2. Purpose of Processing", 
      text: "Your data is processed under the legal basis of 'Contractual Necessity'. This includes: verifying identity for site access, evaluating suitability for mining operations, conducting background checks required by the Ministry of Mines and Steel Development, and maintaining emergency records." 
    },
    { 
      subtitle: "3. Data Retention Policy", 
      text: "In accordance with the NDPR, PK5 Mining will retain applicant data for 24 months. Successfully engaged candidate data will move to the employee record system. Unsuccessful data is purged unless explicit consent is given for future role notifications." 
    },
    { 
      subtitle: "4. Third-Party Disclosures", 
      text: "We do not sell your personal information. Data may be shared with regulatory bodies, government agencies, or secure cloud infrastructure providers solely for the purpose of hosting our digital ecosystem and ensuring compliance with Nigerian law." 
    },
    { 
      subtitle: "5. Your Rights", 
      text: "Under the Nigeria Data Protection Regulation, you have the right to access, rectify, or request deletion of your data. For any data-related inquiries, please contact our Data Protection Officer at privacy@pk5mining.com." 
    }
  ];

  const termsContent = [
    { 
      subtitle: "1. Accuracy and Verification", 
      text: "By submitting this application, you certify that all statements are true and complete. You authorize PK5 Mining Limited to investigate all statements contained in your application. Any misrepresentation is cause for immediate disqualification." 
    },
    { 
      subtitle: "2. Intellectual Property", 
      text: "All content, logos, and portal architecture provided on this website are the exclusive property of PK5 Mining Limited. Users are prohibited from scraping, reverse-engineering, or attempting to breach the security of the PK5 Digital Ecosystem." 
    },
    { 
      subtitle: "3. Site Safety & Conduct", 
      text: "Applicants acknowledge that mining operations involve inherent risks. Subsequent site visits require strict adherence to PK5 Mining Health, Safety, and Environment (HSE) protocols and local mining regulations." 
    },
    { 
      subtitle: "4. Limitation of Liability", 
      text: "PK5 Mining Limited shall not be liable for any damages arising from the use of this portal, including transmission errors, data loss, or system downtime. We do not guarantee that every application will receive a response." 
    },
    { 
      subtitle: "5. Governing Law", 
      text: "These terms are governed by the laws of the Federal Republic of Nigeria. Any disputes shall be subject to the exclusive jurisdiction of the courts located in Lagos, Nigeria." 
    }
  ];

  const isPrivacy = mode === "privacy";

  return (
    <Modal
      open={open}
      onClose={onClose}
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
            onClick={onClose}
            className="p-2 rounded-md hover:bg-white/10 text-gray-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-8 bg-[#0a0a0a] scrollbar-thin scrollbar-thumb-gray-800">
          <div className="space-y-8">
            {(isPrivacy ? privacyContent : termsContent).map((item, index) => (
              <div key={index} className="animate-in fade-in slide-in-from-bottom-2 duration-400">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c89b3c] mb-3">
                  {item.subtitle}
                </h4>
                <p className="text-sm text-white leading-relaxed font-light">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-800 bg-[#0f0f0f] flex items-center justify-between">
          <p className="text-[10px] text-gray-600">Effective Date: April 2026</p>
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-2.5 rounded-md bg-[#c89b3c] text-black text-[11px] font-bold uppercase tracking-wider hover:bg-[#d4a84a] transition-all"
          >
            I Acknowledge
          </button>
        </div>
      </div>
    </Modal>
  );
}