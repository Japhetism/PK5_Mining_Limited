import { motion } from 'motion/react';
import { AnimatedSection } from '@/app/components/animated-section';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { ImpactCard } from '@/app/components/impact-card';
import {
  Users,
  TrendingUp,
  DollarSign,
  Network,
  Briefcase,
  Factory,
  Globe,
} from 'lucide-react';

export function ImpactPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Economic and Social Impact"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0a0a0a]" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="w-16 h-px bg-[#D4AF37]" />
            <span className="px-5 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] font-semibold text-xs tracking-[0.35em] uppercase">
              Creating Value
            </span>
            <div className="w-16 h-px bg-[#D4AF37]" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            style={{ letterSpacing: '-0.02em' }}
          >
            Our Impact
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-[#a0a0a0] max-w-3xl mx-auto leading-relaxed"
          >
            Driving economic growth and sustainable development across communities and nations
          </motion.p>
        </div>
      </section>

      {/* Economic Impact */}
      <section className="py-32 bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#D4AF37]/5 rounded-full blur-[120px]" />

        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-6"
            >
              {/* <span className="px-5 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] font-semibold">
                National Impact
              </span> */}
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Economic Impact
            </h2>
            <p className="text-xl text-[#a0a0a0] max-w-3xl mx-auto leading-relaxed">
              PK5 Mining drives local, state, and national economic growth through sustainable mineral extraction, leveraging advanced
              technologies to enhance efficiency and support responsible environmental and socioeconomic development.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ImpactCard
              icon={Users}
              title="Creation of Direct and Indirect Employment"
              description="Our initiative generates numerous job opportunities not only within the core operations but also across related industries, thereby supporting livelihoods and reducing unemployment rates.​"
              // value={5000}
              // suffix="+"
              delay={0}
            />
            <ImpactCard
              icon={TrendingUp}
              title="Increased State and Federal Revenue"
              description="Enhanced economic activities lead to higher tax collections from businesses and employees, providing governments with additional resources to fund public services and infrastructure projects.​"
              // value={250}
              // suffix="M+"
              // prefix="$"
              delay={0.15}
            />
            <ImpactCard
              icon={Network}
              title="Development of Local Supply Chains"
              description="By fostering partnerships with local suppliers and manufacturers, the projects strengthen regional economies and promote sustainable business growth within the communities."
              delay={0.3}
            />
            <ImpactCard
              icon={DollarSign}
              title="Contribution of GDP and FX Earnings"
              description="The activities contribute significantly to the country's gross domestic product and foreign exchange earnings through exports and international trade, bolstering economic stability and growth.​"
              // value={500}
              // suffix="M+"
              // prefix="$"
              delay={0.45}
            />
          </div>
        </div>
      </section>

      {/* Government Alignment */}
      <section className="py-32 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-[#D4AF37]/4 rounded-full blur-[160px] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-16 max-w-[1380px]">
          <AnimatedSection className="mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-10 h-px bg-[#D4AF37]" />
              <span className="px-5 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] font-semibold text-xs tracking-[0.35em] uppercase">
                Policy Alignment
              </span>
              <div className="w-10 h-px bg-[#D4AF37]" />
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Aligned with Government Priorities
            </h2>
            <p className="text-xl text-[#a0a0a0] max-w-2xl leading-relaxed">
              PK5 Mining aligns closely with government priorities by promoting economic development through responsible mineral exploitation. Our company emphasizes job creation, infrastructure enhancement,
               and export-driven growth to support sustainable local, state, and national progress.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Briefcase,
                title: 'Supports Economic Diversification Agenda',
                description: 'We encourage the development of various sectors within the economy to reduce dependence on a single industry, fostering sustainable growth.',
                delay: 0,
              },
              {
                icon: TrendingUp,
                // label: 'Beyond Crude Oil',
                title: 'Reduces Reliance on Crude Oil',
                description: 'Our initiative decreases the country economic vulnerability by minimizing dependence on crude oil exports and promoting alternative revenue sources. ',
                delay: 0.12,
              },
              {
                icon: Factory,
                // label: 'Industrialization',
                title: 'Promotes Industrialization and Beneficiation',
                description: 'We facilitate the growth of manufacturing and processing industries, allowing the country to add value to its raw materials and boost domestic production.',
                delay: 0.24,
              },
              {
                icon: Globe,
                // label: 'Competitiveness',
                title: 'Strengthens State and National Global Mineral Standings',
                description: 'We encourage industries that utilize processed minerals to produce finished goods, thereby boosting economic growth and diversification',
                delay: 0.36,
              },
            ].map((item) => (
              <AnimatedSection key={item.label} delay={item.delay}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: item.delay }}
                  className="group relative p-8 rounded-xl border border-[#222] bg-gradient-to-b from-[#141414] to-[#0f0f0f] hover:border-[#D4AF37]/30 transition-colors duration-300 h-full flex flex-col"
                >
                  {/* Gold top bar */}
                  <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center mb-6 group-hover:bg-[#D4AF37]/15 transition-colors duration-300">
                    <item.icon className="w-6 h-6 text-[#D4AF37]" />
                  </div>

                  {/* Label */}
                  <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-3">{item.label}</p>

                  {/* Title */}
                  <h3 className="text-white mb-3">{item.title}</h3>

                  {/* Description */}
                  <p className="text-[#787878] leading-relaxed text-sm flex-1">{item.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
