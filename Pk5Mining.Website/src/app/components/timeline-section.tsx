import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface TimelineItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface TimelineSectionProps {
  items: TimelineItem[];
}

export function TimelineSection({ items }: TimelineSectionProps) {
  return (
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#D4AF37] via-[#B8941F] to-transparent" />

      <div className="space-y-12">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="relative flex gap-8 items-start"
          >
            {/* Icon Node */}
            <motion.div
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center shadow-lg shadow-[#D4AF37]/30"
            >
              <item.icon className="w-8 h-8 text-black" />
            </motion.div>

            {/* Content */}
            <motion.div
              whileHover={{ x: 10 }}
              transition={{ duration: 0.3 }}
              className="flex-1 p-6 rounded-lg bg-[#141414] border border-[#2a2a2a] hover:border-[#D4AF37] transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-3 text-white">
                {item.title}
              </h3>
              <p className="text-[#a0a0a0] leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
