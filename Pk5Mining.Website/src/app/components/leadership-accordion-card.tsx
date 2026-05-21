import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from '@/app/components/ui/ImageWithFallback'; 
import { ChevronDown } from 'lucide-react';
import { ExecutiveProfile } from '@/app/data/leadership';
import { ILeader } from '@/app/interfaces'; 

interface LeadershipAccordionCardProps {
  executive: ExecutiveProfile | ILeader; 
  isExpanded: boolean;
  onToggle: () => void;
  delay?: number;
  children?: React.ReactNode; 
}

export function LeadershipAccordionCard({
  executive,
  isExpanded,
  onToggle,
  delay = 0,
  children, 
}: LeadershipAccordionCardProps) {
  // Safe helper casting to read properties without TypeScript blocking the build
  const exec = executive as any; 

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group"
    >
      {/* Card Body Container */}
      <motion.div
        whileHover={{ y: isExpanded ? 0 : -10 }}
        transition={{ duration: 0.3 }}
        onClick={onToggle}
        className="relative overflow-hidden rounded-xl cursor-pointer"
        style={{
          background: 'rgba(20, 20, 20, 0.6)',
          backdropFilter: 'blur(20px)',
          border: isExpanded ? '1px solid rgba(212, 175, 55, 0.3)' : '1px solid rgba(212, 175, 55, 0.15)',
        }}
      >
        {/* Background Glow */}
        <div className={`absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent transition-opacity duration-500 ${isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

        {/* Executive Photo Container */}
        <div className="relative h-80 overflow-hidden">
          <motion.div
            whileHover={{ scale: isExpanded ? 1 : 1.05 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full"
          >
            <ImageWithFallback
              src={exec?.image || ''}
              alt={exec?.name || 'Executive'}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />

          {/* Hover Image Overlay */}
          <motion.div
            className={`absolute inset-0 bg-[#D4AF37]/10 transition-opacity duration-500 ${isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
          />

          {/* Top Arrow Button */}
          <motion.div
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#D4AF37]/20 backdrop-blur-sm border border-[#D4AF37]/30 flex items-center justify-center"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5 text-[#D4AF37]" />
          </motion.div>
        </div>

        {/* Executive Header Metadata Details */}
        <div className="relative p-8">
          <h3 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${isExpanded ? 'text-[#D4AF37]' : 'text-white group-hover:text-[#D4AF37]'}`}>
            {exec?.name}
          </h3>
          <p className="text-[#D4AF37] text-sm font-semibold mb-4 uppercase tracking-wider">
            {exec?.role}
          </p>

          {/* Bottom Interactive Label Link */}
          <div className="flex items-center gap-2 text-[#D4AF37] group-hover:gap-4 transition-all duration-300">
            <span className="text-sm font-semibold">
              {isExpanded ? 'Hide Info' : 'Read Bio'}
            </span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={18} />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {children && <div className="mt-4">{children}</div>}

      {/* Simplified Dropdown Content Box */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-4 p-6 rounded-xl bg-[#0f0f0f] border border-[#D4AF37]/20">
              <p className="text-[#a0a0a0] text-sm leading-relaxed whitespace-pre-line">
                {exec?.shortBio || exec?.description || "Biography summary details coming soon."}
              </p>
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}