import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { CheckCircle2, ArrowLeft } from "lucide-react";

type ApplicationSubmittedProps = {
  jobTitle?: string;
  message?: string;
  backTo?: string; // default /careers#open-positions
  onApplyAnother?: () => void; // optional callback if you want to reset form state instead of routing
};

export const ApplicationSubmitted: React.FC<ApplicationSubmittedProps> = ({
  jobTitle,
  message,
  backTo = "/careers#open-positions",
  onApplyAnother,
}) => {
  return (
    <div className="pt-24">
      <section className="py-16 bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#1a1a1a]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col items-center max-w-xl mx-auto text-center px-6"
        >
          <CheckCircle2 className="w-12 h-12 text-[#c89b3c] mb-4" />

          <h2 className="text-2xl font-bold text-gray-100 mb-2">
            Application Submitted
          </h2>

          <p className="text-gray-400 mb-6">
            {message ??
              `Thank you for applying${
                jobTitle ? ` for ${jobTitle}` : ""
              }. Our team will review your application and get back to you.`}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
            <Link to={backTo}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-6 py-3 bg-[#c89b3c] text-black font-bold rounded-lg hover:bg-[#d4a84a] transition-colors"
              >
                Browse Open Roles
              </motion.button>
            </Link>

            {onApplyAnother && (
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onApplyAnother}
                className="w-full sm:w-auto px-6 py-3 bg-transparent border border-gray-700 text-gray-200 font-semibold rounded-lg hover:border-[#c89b3c] transition-colors inline-flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Apply Another
              </motion.button>
            )}
          </div>
        </motion.div>
      </section>
    </div>
  );
};
