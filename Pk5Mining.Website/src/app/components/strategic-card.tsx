import { motion } from 'motion/react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { LucideIcon } from 'lucide-react';

interface StrategicCardProps {
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  delay?: number;
}

export function StrategicCard({ title, description, image, icon: Icon, delay = 0 }: StrategicCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ borderColor: '#D4AF37' }}
      className="group relative overflow-hidden rounded-lg bg-[#141414] border"
      style={{ borderColor: '#2a2a2a' }}
    >
      <div className="relative h-72 overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full"
        >
          <ImageWithFallback
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

        {/* Icon */}
        <motion.div
          className="absolute top-6 right-6 w-14 h-14 rounded-lg bg-[#D4AF37]/20 backdrop-blur-sm border border-[#D4AF37]/30 flex items-center justify-center"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="w-7 h-7 text-[#D4AF37]" />
        </motion.div>
      </div>

      <div className="p-8">
        <motion.h3
          className="text-2xl font-bold mb-4 text-white"
          whileHover={{ color: '#D4AF37' }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>
        <p className="text-[#a0a0a0] leading-relaxed">
          {description}
        </p>
      </div>

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10"
      />
    </motion.div>
  );
}