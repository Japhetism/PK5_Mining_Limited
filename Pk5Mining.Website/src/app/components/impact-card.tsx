import { motion } from 'motion/react';
import { StatCounter } from '@/app/components/stat-counter';
import { LucideIcon } from 'lucide-react';

interface ImpactCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  value?: number;
  suffix?: string;
  prefix?: string;
  delay?: number;
}

export function ImpactCard({
  icon: Icon,
  title,
  description,
  value,
  suffix = '',
  prefix = '',
  delay = 0
}: ImpactCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8 }}
      className="relative p-8 rounded-lg bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#2a2a2a] hover:border-[#D4AF37] transition-all duration-300 overflow-hidden group"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className="relative z-10">
        <motion.div
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className="w-16 h-16 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center mb-6 group-hover:bg-[#D4AF37]/20 transition-colors"
        >
          <Icon className="w-8 h-8 text-[#D4AF37]" />
        </motion.div>

        {value !== undefined && (
          <div className="mb-4">
            <div className="text-5xl font-bold text-[#D4AF37]">
              {prefix}<StatCounter end={value} suffix={suffix} />
            </div>
          </div>
        )}

        <h3 className="text-xl font-bold mb-3 text-white">
          {title}
        </h3>
        <p className="text-[#a0a0a0] leading-relaxed">
          {description}
        </p>
      </div>

      {/* Corner Accent */}
      <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl group-hover:bg-[#D4AF37]/10 transition-colors" />
    </motion.div>
  );
}