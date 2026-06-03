import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { AnimatedSection } from '@/app/components/animated-section';
import { ImageWithFallback } from '@/app/components/ui/ImageWithFallback';
import { Target, Eye, Award, DollarSign, Network, TrendingUp, Briefcase, Globe, BarChart3, Factory, ChevronRight, ChevronLeft, Users, Mountain } from 'lucide-react';
import { leadership, timeline } from '@/app/fixtures';
import { ILeader, ITimelineEvent } from '@/app/interfaces';
import { ImpactCard } from '@/app/components/impact-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { LeadershipAccordionCard } from '@/app/components/leadership-accordion-card';
import { executiveLeadership } from '@/app/data/leadership';
import { TimelineSection } from '@/app/components/timeline-section';
import visionimage1 from '../../../../assets/images/visionimage1.png';
import visionimage2 from '../../../../assets/images/visionimage2.png';
import visionimage3 from '../../../../assets/images/visionimage3.png';
import visionimage4 from '../../../../assets/images/visionimage4.png';

const missionCards = [
  {
    id: 'card-1',
    number: '01',
    accent: 'Operations',
    title: 'Develop World Class Mining Operations',
    description: 'Our mission is to establish efficient and innovative mining processes that meet international standards for safety, productivity, and environmental responsibility.',
    image: visionimage1,
    icon: Mountain,
  },
  {
    id: 'card-2',
    number: '02',
    accent: 'Quality',
    title: 'Deliver High Quality Processed Minerals',
    description: 'Our mission is to ensure the consistent production of minerals that meet rigorous quality requirements to satisfy market demands.',
    image: visionimage2,
    icon: Factory,
  },
  {
    id: 'card-3',
    number: '03',
    accent: 'Sustainability',
    title: 'Drive Sustainable Economic Growth',
    description: 'Our mission is to promote initiatives that support economic development while minimizing environmental impact and fostering community well-being.',
    image: visionimage3,
    icon: Globe,
  },
  {
    id: 'card-4',
    number: '04',
    accent: 'Value',
    title: 'Create Long Term Stakeholder Value',
    description: 'Our mission is to build enduring relationships with stakeholders by focusing on transparency, ethical practices, and sustained financial performance.',
    image: visionimage4,
    icon: Users,
  },
];

export function About() {
  // State to manage the expanded executive accordion card
  const [expandedExecutiveId, setExpandedExecutiveId] = useState<string | null>(null);

  // Toggle handler function for the accordion cards
  const handleToggleExecutive = (id: string) => {
    setExpandedExecutiveId(prevId => (prevId === id ? null : id));
  };

  const [hoveredAdvantage, setHoveredAdvantage] = useState<number | null>(null);

  // --- CAROUSEL REFS & STATES PRESERVING ALL LAYOUT LOGIC ---
  const [missionIndex, setMissionIndex] = useState<number>(0);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const cardStepPx = 500; // Expected card step offset for layout calculations

  // --- MOCK CAROUSEL DATA COMPATIBLE WITH ALL ICON AND PROPERTY LAYOUTS ---
  // const missionCards = [
  //   { id: 1, number: '01', title: 'Develop World Class Mining Operations', description: 'Our mission is to establish efficient and innovative mining processes that meet international standards for safety, productivity, and environmental responsibility.​', icon: Target, accent: 'Pillar One', image: 'https://images.unsplash.com/photo-1767416657497-6af140eac750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  //   { id: 2, number: '02', title: 'Deliver High Quality Processed Minerals', description: 'Our mission is to ensure the consistent production of minerals that meet rigorous quality requirements to satisfy market demands.​', icon: Eye, accent: 'Pillar Two', image: 'https://images.unsplash.com/photo-1767416657497-6af140eac750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  //   { id: 3, number: '03', title: 'Drive Sustainable Economic Growth​', description: 'Our mission is to promote initiatives that support economic development while minimizing environmental impact and fostering community well-being.​', icon: Users, accent: 'Pillar Three', image: 'https://images.unsplash.com/photo-1767416657497-6af140eac750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  //   { id: 4, number: '04', title: 'Create Long Term Stakeholder Value​', description: 'Our mission is to build enduring relationships with stakeholders by focusing on transparency, ethical practices, and sustained financial performance.', icon: Award, accent: 'Pillar Four', image: 'https://images.unsplash.com/photo-1767416657497-6af140eac750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' }
  // ];

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>): void {
    // UI gesture placeholder
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>): void {
    // UI gesture placeholder
  }

  function goToMissionSlide(arg0: number): void {
    if (arg0 >= 0 && arg0 < missionCards.length) {
      setMissionIndex(arg0);
    }
  }

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1767416657497-6af140eac750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            alt="Mining site"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About <span className="text-[#c89b3c]">PK5 Mining</span>
          </motion.h1>
          <motion.div
            className="text-md md:text-xl text-gray-300 md:w-3/6 xs:w-5/6 mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p>PK5 Mining is a strategic mining brand of PK5 Holdings Inc., USA , established to develop and operate responsible mining assets across Africa.</p><br />
            <p>The company began its African journey in Tanzania and is strategically expanding its focus to Nigeria, aligning with national development priorities, local content participation, and international best practices in environmental, social, and governance (ESG) standards.</p>
          </motion.div>
        </div>
      </section>

      {/* ── VISION ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden">
        {/* Cinematic background */}
        <div className="absolute inset-0">
          {/* <ImageWithFallback
            src="https://images.unsplash.com/photo-1767416657497-6af140eac750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            alt="PK5 Mining Vision"
            className="w-full h-full object-cover"
          /> */}
          {/* Multi-layer cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/92 via-black/78 to-[#0a0a0a]/95" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          {/* Subtle gold dot texture */}
          <div
            className="absolute inset-0 opacity-[0.045]"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)',
              backgroundSize: '44px 44px',
            }}
          />
          {/* Gold atmospheric glow */}
          <div className="absolute bottom-0 left-1/3 w-[700px] h-[280px] bg-[#D4AF37]/8 rounded-full blur-[130px]" />
        </div>

        <div className="relative z-10 w-full py-36">
          <div className="container mx-auto px-6 lg:px-16 max-w-[1380px]">
            {/* Vision label */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex items-center gap-5 mb-16"
            >
              {/* <div className="w-20 h-px bg-[#D4AF37]" />
              <span className="text-[#D4AF37] font-semibold tracking-[0.45em] uppercase text-xs">
                Vision
              </span> */}
            </motion.div>

            {/* Cinematic statement */}
            <div className="relative">
              {/* Decorative oversized quotation mark */}
              <div
                className="absolute -top-4 -left-2 text-[#D4AF37] select-none pointer-events-none font-serif leading-none"
                style={{ fontSize: 'clamp(7rem, 16vw, 18rem)', opacity: 0.055, lineHeight: 1 }}
              >
                &ldquo;
              </div>

              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.05, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative text-4xl sm:text-5xl md:text-[3.25rem] lg:text-[3.75rem] xl:text-[4.25rem] font-bold leading-[1.12] text-white max-w-[1080px]"
                style={{ letterSpacing: '-0.025em' }}
              >
                At PK5 Mining, our vision is to be a{' '}
                <span
                  className="text-[#D4AF37]"
                  style={{ textShadow: '0 0 80px rgba(212, 175, 55, 0.45)' }}
                >
                  trusted leader
                </span>{' '}
                in the global mining sector, recognized for{' '}
                <span
                  className="text-[#D4AF37]"
                  style={{ textShadow: '0 0 80px rgba(212, 175, 55, 0.45)' }}
                >
                  integrity, sustainability,
                </span>{' '}
                and{' '}
                <span
                  className="text-[#D4AF37]"
                  style={{ textShadow: '0 0 80px rgba(212, 175, 55, 0.45)' }}
                >
                  operational excellence.
                </span>
              </motion.h2>

            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION CAROUSEL ───────────────────────────────────────────── */}
      
      {/* ── MISSION CAROUSEL ───────────────────────────────────────────── */}
      <section className="py-28 bg-[#090909] relative overflow-hidden">
        {/* Background elements */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, #D4AF37 0px, transparent 1px, transparent 80px), repeating-linear-gradient(90deg, #D4AF37 0px, transparent 1px, transparent 80px)',
          }}
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#B8941F]/4 rounded-full blur-[130px]" />

        <div className="relative z-10">
          {/* Section header */}
          <div className="container mx-auto px-6 lg:px-16 max-w-[1380px] mb-16">
            <AnimatedSection>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-7"
              >
                <div className="w-10 h-px bg-[#D4AF37]" />
                <span className="px-5 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] font-semibold text-xs tracking-[0.35em] uppercase">
                  Our Mission
                </span>
                <div className="w-10 h-px bg-[#D4AF37]" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-tight mb-4"
                style={{ letterSpacing: '-0.025em' }}
              >
                What We Stand For
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="text-lg text-[#787878] max-w-2xl leading-relaxed"
              >
                Four pillars that define our commitment to excellence, sustainability, and long-term value creation.
              </motion.p>
            </AnimatedSection>
          </div>

          {/* Carousel track */}
          <div
            ref={carouselContainerRef}
            className="overflow-hidden"
          >
            <div
              className="flex gap-5"
              style={{
                transform: `translateX(calc(${cardStepPx > 0 ? `-${missionIndex * cardStepPx}px` : '0px'} + clamp(24px, calc((100vw - 1380px) / 2 + 64px), 120px)))`,
                transition: 'transform 0.72s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                willChange: 'transform',
              }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {missionCards.map((card, index) => {
                const Icon = card.icon;
                const isActive = index === missionIndex;
                return (
                  <motion.div
                    data-slide
                    key={card.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.75, delay: index * 0.08 }}
                    className="flex-shrink-0 w-[82vw] sm:w-[65vw] md:w-[52vw] lg:w-[480px]"
                  >
                    <motion.div
                      className="relative rounded-2xl overflow-hidden cursor-pointer group"
                      style={{
                        height: 'clamp(460px, 50vh, 560px)',
                        boxShadow: isActive
                          ? '0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,175,55,0.25)'
                          : '0 20px 55px rgba(0,0,0,0.55)',
                        transition: 'box-shadow 0.4s ease',
                      }}
                      whileHover={{ y: -7 }}
                      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                      onClick={() => goToMissionSlide(index)}
                    >
                      {/* Background image */}
                      <ImageWithFallback
                        src={card.image}
                        alt={card.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Gradient overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
                      <div className="absolute inset-0 bg-gradient-to-br from-black/25 via-transparent to-transparent" />

                      {/* Active/hover gold border */}
                      <div
                        className="absolute inset-0 rounded-2xl border-2 transition-opacity duration-500 pointer-events-none"
                        style={{
                          borderColor: '#D4AF37',
                          opacity: isActive ? 0.5 : 0,
                        }}
                      />
                      <div className="absolute inset-0 rounded-2xl border-2 border-[#D4AF37] opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />

                      {/* Card number watermark */}
                      <div
                        className="absolute top-5 right-6 font-bold text-white leading-none select-none pointer-events-none"
                        style={{ fontSize: 'clamp(4.5rem, 8vw, 6.5rem)', opacity: 0.07 }}
                      >
                        {card.number}
                      </div>

                      {/* Content */}
                      <div className="absolute inset-x-0 bottom-0 p-7 md:p-8">
                        {/* Category badge */}
                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-7 h-px bg-[#D4AF37]" />
                          <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.42em] uppercase">
                            {card.accent}
                          </span>
                        </div>

                        {/* Icon */}
                        <motion.div
                          className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                          style={{
                            background: 'rgba(212, 175, 55, 0.1)',
                            border: '1px solid rgba(212, 175, 55, 0.22)',
                            backdropFilter: 'blur(8px)',
                          }}
                          whileHover={{ scale: 1.12 }}
                          transition={{ duration: 0.25 }}
                        >
                          <Icon className="w-5 h-5 text-[#D4AF37]" />
                        </motion.div>

                        {/* Title */}
                        <h3
                          className="text-xl md:text-[1.4rem] font-bold text-white mb-3 leading-snug"
                          style={{ letterSpacing: '-0.015em' }}
                        >
                          {card.title}
                        </h3>

                        {/* Description */}
                        <p className="text-[#aaaaaa] text-sm leading-relaxed">
                          {card.description}
                        </p>

                        {/* Bottom gold rule */}
                        <div className="mt-6 h-px bg-gradient-to-r from-[#D4AF37]/50 via-[#D4AF37]/20 to-transparent" />
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}

              {/* Right spacer so last card can scroll into partial-preview position */}
              <div className="flex-shrink-0 w-8 md:w-16 lg:w-24" />
            </div>
          </div>

          {/* Navigation row */}
          <div className="container mx-auto px-6 lg:px-16 max-w-[1380px] mt-12 flex items-center gap-5">
            {/* Prev */}
            <motion.button
              onClick={() => goToMissionSlide(missionIndex - 1)}
              disabled={missionIndex === 0}
              className="w-12 h-12 rounded-full border border-[#D4AF37]/35 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/70 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {missionCards.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => goToMissionSlide(i)}
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: i === missionIndex ? '2.5rem' : '0.4rem',
                    background: i === missionIndex ? '#D4AF37' : 'rgba(212,175,55,0.22)',
                  }}
                  whileTap={{ scale: 0.85 }}
                />
              ))}
            </div>

            {/* Next */}
            <motion.button
              onClick={() => goToMissionSlide(missionIndex + 1)}
              disabled={missionIndex === missionCards.length - 1}
              className="w-12 h-12 rounded-full border border-[#D4AF37]/35 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/70 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>

            {/* Slide counter */}
            <div className="ml-auto text-sm font-semibold tracking-widest">
              <span className="text-[#D4AF37]">{String(missionIndex + 1).padStart(2, '0')}</span>
              <span className="text-[#444]"> / </span>
              <span className="text-[#555]">{String(missionCards.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Our Journey</h2>
            <p className="text-xl text-gray-400">5 years of mining excellence</p>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item: ITimelineEvent, index: number) => (
              <AnimatedSection key={item.year} delay={index * 0.1}>
                <motion.div
                  className="flex gap-8 mb-12 relative"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {index < timeline.length - 1 && (
                    <div className="absolute left-[31px] top-16 w-0.5 h-full bg-gradient-to-b from-[#c89b3c] to-transparent" />
                  )}

                  {/* Year badge */}
                  <motion.div
                    className="w-16 h-16 rounded-full bg-[#c89b3c] flex items-center justify-center font-bold shrink-0 text-black"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {item.year}
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 pb-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">{item.event}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
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
      <section className="py-32 bg-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-6"
            >
              <span className="px-5 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] font-semibold">
                Policy Alignment
              </span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Aligned with Government Priorities
            </h2>
            <p className="text-xl text-[#a0a0a0] max-w-3xl mx-auto leading-relaxed">
              PK5 Mining aligns closely with government priorities by promoting economic development through responsible mineral exploitation. Our company
              emphasizes job creation, infrastructure enhancement, and export-driven growth to support sustainable local, state, and national progress.
            </p>
          </AnimatedSection>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Tabs defaultValue="diversification" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-12 bg-[#141414] p-2 rounded-lg border border-[#2a2a2a]">
              <TabsTrigger
                value="diversification"
                className="text-white/90 hover:text-[#D4AF37] data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black font-medium transition-colors"
              >
                Supports Economic Diversification Agenda
              </TabsTrigger>
              <TabsTrigger
                value="crude"
                className="text-white/90 hover:text-[#D4AF37] data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black font-medium transition-colors"
              >
                Reduces Reliance on Crude Oil
              </TabsTrigger>
              <TabsTrigger
                value="industrialization"
                className="text-white/90 hover:text-[#D4AF37] data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black font-medium transition-colors"
              >
                Promotes Industrialization and beneficiation
              </TabsTrigger>
              <TabsTrigger
                value="competitiveness"
                className="text-white/90 hover:text-[#D4AF37] data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black font-medium transition-colors"
              >
                Strengthens State and National Global Mineral Standings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="diversification" className="mt-8">
              <div className="p-10 rounded-lg bg-gradient-to-br from-[#141414] to-[#0f0f0f] border border-[#2a2a2a]">
                <h3 className="text-3xl font-bold mb-6 text-[#D4AF37]">Supports Economic Diversification Agenda</h3>
                <p className="text-lg text-[#a0a0a0] leading-relaxed mb-6">
                  We encourage the development of various sectors within the economy to reduce dependence on a single industry, fostering sustainable growth.
                </p>
                {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="p-6 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
          <Briefcase className="w-10 h-10 text-[#D4AF37] mb-4" />
          <h4 className="text-xl font-bold mb-3">Multiple Revenue Streams</h4>
          <p className="text-[#a0a0a0]">Iron ore, nickel, lithium, and strategic minerals</p>
        </div>
        <div className="p-6 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
          <Globe className="w-10 h-10 text-[#D4AF37] mb-4" />
          <h4 className="text-xl font-bold mb-3">Export Growth</h4>
          <p className="text-[#a0a0a0]">Expanding foreign exchange earnings</p>
        </div>
        <div className="p-6 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
          <Target className="w-10 h-10 text-[#D4AF37] mb-4" />
          <h4 className="text-xl font-bold mb-3">Sector Development</h4>
          <p className="text-[#a0a0a0]">Building world-class mining sector</p>
        </div>
      </div> */}
              </div>
            </TabsContent>

            <TabsContent value="crude" className="mt-8">
              <div className="p-10 rounded-lg bg-gradient-to-br from-[#141414] to-[#0f0f0f] border border-[#2a2a2a]">
                <h3 className="text-3xl font-bold mb-6 text-[#D4AF37]">Reduces Reliance on Crude Oil</h3>
                <p className="text-lg text-[#a0a0a0] leading-relaxed mb-6">
                  Our initiative decreases the country's economic vulnerability by minimizing dependence on crude oil exports and promoting alternative revenue sources.
                </p>
                {/* <div className="flex items-center gap-12 mt-8">
        <div className="flex-1">
          <div className="text-5xl font-bold text-[#D4AF37] mb-3">40%</div>
          <p className="text-[#a0a0a0]">Potential contribution to non-oil exports by 2030</p>
        </div>
        <div className="flex-1">
          <div className="text-5xl font-bold text-[#D4AF37] mb-3">$2B+</div>
          <p className="text-[#a0a0a0]">Annual revenue potential from mining sector</p>
        </div>
      </div> */}
              </div>
            </TabsContent>

            <TabsContent value="industrialization" className="mt-8">
              <div className="p-10 rounded-lg bg-gradient-to-br from-[#141414] to-[#0f0f0f] border border-[#2a2a2a]">
                <h3 className="text-3xl font-bold mb-6 text-[#D4AF37]">Promotes Industrialization and Beneficiation</h3>
                <p className="text-lg text-[#a0a0a0] leading-relaxed mb-6">
                  We facilitate the growth of manufacturing and processing industries, allowing the country to add value to its raw materials and boost domestic production.
                </p>
                {/* <div className="grid grid-cols-2 gap-6 mt-8">
        <div className="p-6 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
          <h4 className="text-xl font-bold mb-3 text-[#D4AF37]">Processing Plants</h4>
          <p className="text-[#a0a0a0]">State-of-the-art beneficiation facilities</p>
        </div>
        <div className="p-6 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
          <h4 className="text-xl font-bold mb-3 text-[#D4AF37]">Value Addition</h4>
          <p className="text-[#a0a0a0]">Export refined products, not raw materials</p>
        </div>
      </div> */}
              </div>
            </TabsContent>

            <TabsContent value="competitiveness" className="mt-8">
              <div className="p-10 rounded-lg bg-gradient-to-br from-[#141414] to-[#0f0f0f] border border-[#2a2a2a]">
                <h3 className="text-3xl font-bold mb-6 text-[#D4AF37]">Strengthens State and National Global Mineral Standings​</h3>
                <p className="text-lg text-[#a0a0a0] leading-relaxed mb-6">
                  We enhance the country's reputation and competitiveness in the international mineral market, attracting investment and trade opportunities.
                </p>
                <ul className="space-y-4 mt-8">
                  {/* Cleaned up the split block list items cleanly below */}
                  {/* <li className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 mt-1">
            <div className="w-3 h-3 rounded-full bg-[#D4AF37]" />
          </div>
          <div>
            <h4 className="font-bold text-lg mb-1">International Standards</h4>
            <p className="text-[#a0a0a0]">ISO certified operations and global ESG compliance</p>
          </div>
        </li>
        <li className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 mt-1">
            <div className="w-3 h-3 rounded-full bg-[#D4AF37]" />
          </div>
          <div>
            <h4 className="font-bold text-lg mb-1">Technology Leadership</h4>
            <p className="text-[#a0a0a0]">AI-driven operations and automation excellence</p>
          </div>
        </li>
        <li className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 mt-1">
            <div className="w-3 h-3 rounded-full bg-[#D4AF37]" />
          </div>
          <div>
            <h4 className="font-bold text-lg mb-1">Global Partnerships</h4>
            <p className="text-[#a0a0a0]">Strategic alliances with international mining leaders</p>
          </div>
        </li> */}
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </section>

      {/* ── PROCESSING AND INDUSTRIALIZATION ──────────────────────────── */}
      <section className="py-32 bg-[#090909] relative overflow-hidden">
        {/* Industrial cross-hatch texture */}
        <div
          className="absolute inset-0 opacity-[0.028]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, #D4AF37 0px, transparent 1px, transparent 70px), repeating-linear-gradient(90deg, #D4AF37 0px, transparent 1px, transparent 70px)',
          }}
        />
        {/* Ambient glow blurs */}
        <div className="absolute top-0 left-0 w-[700px] h-[600px] bg-[#D4AF37]/4 rounded-full blur-[200px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-[#B8941F]/4 rounded-full blur-[180px] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-16 max-w-[1380px] relative z-10">

          {/* ── Section Header ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-16">
            <AnimatedSection>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-4 mb-7"
              >
                <div className="w-10 h-px bg-[#D4AF37]" />
                <span className="px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] font-semibold text-xs tracking-[0.35em] uppercase">
                  Infrastructure
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white leading-tight"
                style={{ letterSpacing: '-0.025em' }}
              >
                Processing and<br />Industrialization
              </motion.h2>
            </AnimatedSection>

            <AnimatedSection delay={0.18}>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: 0.2 }}
                className="text-lg text-[#848484] leading-relaxed"
              >
                PK5 Mining designs integrated processing plants to enhance the value of raw minerals using advanced technologies.
                We promote sustainable mining and local economic growth through infrastructure development.
              </motion.p>
            </AnimatedSection>
          </div>

          {/* Gold horizontal rule */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/22 to-transparent mb-16" />

          {/* ── 4 Alternating Cinematic Rows ─── */}
          <div className="space-y-6">

            {/* ROW 1 — Image LEFT · Content RIGHT */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group grid grid-cols-1 lg:grid-cols-[55%_45%] rounded-2xl overflow-hidden"
              style={{ boxShadow: '0 24px 70px rgba(0,0,0,0.55)' }}
            >
              {/* Image panel */}
              <div className="relative h-72 lg:h-[440px] overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1652211955967-99c892925469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Agro-Processing Facilities"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black/60" />
                {/* Diagonal corner accent */}
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#D4AF37]/8 blur-2xl" />
              </div>

              {/* Content panel */}
              <div
                className="relative p-10 lg:p-14 flex flex-col justify-center overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #141414 0%, #0e0e0e 100%)' }}
              >
                {/* Dim number watermark */}
                <div
                  className="absolute top-3 right-5 font-bold text-[#D4AF37] leading-none select-none pointer-events-none"
                  style={{ fontSize: 'clamp(4.5rem, 8vw, 7rem)', opacity: 0.055 }}
                >
                  01
                </div>

                {/* Category label */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px bg-[#D4AF37]" />
                  <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.42em] uppercase">
                    Mineral Processing
                  </span>
                </div>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{
                    background: 'rgba(212,175,55,0.08)',
                    border: '1px solid rgba(212,175,55,0.2)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <Factory className="w-5 h-5 text-[#D4AF37]" />
                </div>

                {/* Title */}
                <h3
                  className="text-2xl md:text-[1.65rem] font-bold text-white mb-5 leading-snug"
                  style={{ letterSpacing: '-0.018em' }}
                >
                  Establishment of Mineral Processing Plants
                </h3>

                {/* Animated separator */}
                <div className="h-px w-12 bg-gradient-to-r from-[#D4AF37] to-transparent mb-5 group-hover:w-20 transition-all duration-500" />

                {/* Description */}
                <p className="text-[#888] leading-relaxed text-[0.95rem]">
                  We set up facilities to process raw minerals locally to enhance their value and create jobs.
                </p>

                {/* Bottom edge glow */}
                <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/0 to-transparent group-hover:via-[#D4AF37]/35 transition-all duration-600" />
              </div>
            </motion.div>

            {/* ROW 2 — Content LEFT · Image RIGHT */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group grid grid-cols-1 lg:grid-cols-[45%_55%] rounded-2xl overflow-hidden"
              style={{ boxShadow: '0 24px 70px rgba(0,0,0,0.55)' }}
            >
              {/* Content panel — first on mobile via order */}
              <div
                className="relative p-10 lg:p-14 flex flex-col justify-center overflow-hidden order-2 lg:order-1"
                style={{ background: 'linear-gradient(225deg, #141414 0%, #0e0e0e 100%)' }}
              >
                <div
                  className="absolute top-3 right-5 font-bold text-[#D4AF37] leading-none select-none pointer-events-none"
                  style={{ fontSize: 'clamp(4.5rem, 8vw, 7rem)', opacity: 0.055 }}
                >
                  02
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px bg-[#D4AF37]" />
                  <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.42em] uppercase">
                    Value Addition
                  </span>
                </div>

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{
                    background: 'rgba(212,175,55,0.08)',
                    border: '1px solid rgba(212,175,55,0.2)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
                </div>

                <h3
                  className="text-2xl md:text-[1.65rem] font-bold text-white mb-5 leading-snug"
                  style={{ letterSpacing: '-0.018em' }}
                >
                  Value Addition Before Export
                </h3>

                <div className="h-px w-12 bg-gradient-to-r from-[#D4AF37] to-transparent mb-5 group-hover:w-20 transition-all duration-500" />

                <p className="text-[#888] leading-relaxed text-[0.95rem]">
                  We enhance the quality by transforming minerals into finished or semi-finished products to increase export revenues.
                </p>

                <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/0 to-transparent group-hover:via-[#D4AF37]/35 transition-all duration-600" />
              </div>

              {/* Image panel */}
              <div className="relative h-72 lg:h-[440px] overflow-hidden order-1 lg:order-2">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1668838225765-daa3a5da6207?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Value Addition Before Market Distribution"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/60" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#D4AF37]/8 blur-2xl" />
              </div>
            </motion.div>

            {/* ROW 3 — Image LEFT · Content RIGHT */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group grid grid-cols-1 lg:grid-cols-[55%_45%] rounded-2xl overflow-hidden"
              style={{ boxShadow: '0 24px 70px rgba(0,0,0,0.55)' }}
            >
              {/* Image panel */}
              <div className="relative h-72 lg:h-[440px] overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Reduction of Raw Produce Export Dependency"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black/60" />
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#D4AF37]/8 blur-2xl" />
              </div>

              {/* Content panel */}
              <div
                className="relative p-10 lg:p-14 flex flex-col justify-center overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #141414 0%, #0e0e0e 100%)' }}
              >
                <div
                  className="absolute top-3 right-5 font-bold text-[#D4AF37] leading-none select-none pointer-events-none"
                  style={{ fontSize: 'clamp(4.5rem, 8vw, 7rem)', opacity: 0.055 }}
                >
                  03
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px bg-[#D4AF37]" />
                  <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.42em] uppercase">
                    Raw Mineral
                  </span>
                </div>

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{
                    background: 'rgba(212,175,55,0.08)',
                    border: '1px solid rgba(212,175,55,0.2)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <Network className="w-5 h-5 text-[#D4AF37]" />
                </div>

                <h3
                  className="text-2xl md:text-[1.65rem] font-bold text-white mb-5 leading-snug"
                  style={{ letterSpacing: '-0.018em' }}
                >
                  Reduction of Raw Mineral Export Dependency
                </h3>

                <div className="h-px w-12 bg-gradient-to-r from-[#D4AF37] to-transparent mb-5 group-hover:w-20 transition-all duration-500" />

                <p className="text-[#888] leading-relaxed text-[0.95rem]">
                  We decrease reliance on exporting unprocessed minerals by promoting local processing and manufacturing
                </p>

                <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/0 to-transparent group-hover:via-[#D4AF37]/35 transition-all duration-600" />
              </div>
            </motion.div>

            {/* ROW 4 — Content LEFT · Image RIGHT */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.16, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group grid grid-cols-1 lg:grid-cols-[45%_55%] rounded-2xl overflow-hidden"
              style={{ boxShadow: '0 24px 70px rgba(0,0,0,0.55)' }}
            >
              {/* Content panel */}
              <div
                className="relative p-10 lg:p-14 flex flex-col justify-center overflow-hidden order-2 lg:order-1"
                style={{ background: 'linear-gradient(225deg, #141414 0%, #0e0e0e 100%)' }}
              >
                <div
                  className="absolute top-3 right-5 font-bold text-[#D4AF37] leading-none select-none pointer-events-none"
                  style={{ fontSize: 'clamp(4.5rem, 8vw, 7rem)', opacity: 0.055 }}
                >
                  04
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px bg-[#D4AF37]" />
                  <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.42em] uppercase">
                    Agro Industries
                  </span>
                </div>

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{
                    background: 'rgba(212,175,55,0.08)',
                    border: '1px solid rgba(212,175,55,0.2)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <BarChart3 className="w-5 h-5 text-[#D4AF37]" />
                </div>

                <h3
                  className="text-2xl md:text-[1.65rem] font-bold text-white mb-5 leading-snug"
                  style={{ letterSpacing: '-0.018em' }}
                >
                  Development of Downstream Industries
                </h3>

                <div className="h-px w-12 bg-gradient-to-r from-[#D4AF37] to-transparent mb-5 group-hover:w-20 transition-all duration-500" />

                <p className="text-[#888] leading-relaxed text-[0.95rem]">
                  We encourage industries that utilize processed minerals to produce finished goods, thereby boosting economic growth and diversification.
                </p>

                <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/0 to-transparent group-hover:via-[#D4AF37]/35 transition-all duration-600" />
              </div>

              {/* Image panel */}
              <div className="relative h-72 lg:h-[440px] overflow-hidden order-1 lg:order-2">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1582055871659-2fcf2e4d3bd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Development of Agro-Based Industries"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/60" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#D4AF37]/8 blur-2xl" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* ── COMPETITIVE ADVANTAGE ─────────────────────────────────────── */}
      <section className="py-32 bg-[#0a0a0a] relative overflow-hidden">
        {/* Ambient glow blurs */}
        <div className="absolute top-0 left-1/4 w-[700px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[200px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-[#B8941F]/5 rounded-full blur-[180px] pointer-events-none" />
        {/* Subtle dot texture */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)',
            backgroundSize: '52px 52px',
          }}
        />

        <div className="container mx-auto px-6 lg:px-16 max-w-[1380px] relative z-10">

          {/* ── Section Header ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-16">
            <AnimatedSection>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-4 mb-7"
              >
                <div className="w-10 h-px bg-[#D4AF37]" />
                <span className="px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] font-semibold text-xs tracking-[0.35em] uppercase">
                  Competitive Edge
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white leading-tight"
                style={{ letterSpacing: '-0.025em' }}
              >
                Competitive<br />Advantage
              </motion.h2>
            </AnimatedSection>

            <AnimatedSection delay={0.18}>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: 0.2 }}
                className="text-lg text-[#848484] leading-relaxed"
              >
                PK5 Mining maintains a competitive edge through its commitment to sustainable mining practices
                and advanced technological integration. Our focusnon efficient resource management and community engagement
                further strengthens our market position.
              </motion.p>
            </AnimatedSection>
          </div>

          {/* Gold horizontal rule */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/22 to-transparent mb-14" />

          {/* ── Expanding Panel Cards ─── */}
          {(() => {
            const cards = [
              {
                number: '01',
                accent: 'Strategic Leadership',
                title: 'Strong Leadership & Strategic Vision',
                description:
                  'Our organization consistently exhibits effective leadership by setting clear goals and a well-defined roadmap, ensuring all teams are aligned and motivated to achieve long-term success. This approach fosters innovation, adaptability, and resilience in a rapidly evolving industry. ',
                image:
                  'https://images.unsplash.com/photo-1535379453347-1ffd615e2e08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
                icon: Globe,
              },
              {
                number: '02',
                accent: 'Technology-Driven Operations',
                title: 'Technology-Driven Mining Approach',
                description:
                  'We leverage cutting-edge technologies, including automation, data analytics, and real-time monitoring systems, to optimize mining operations. These advancements not only boost operational efficiency but also significantly enhance safety protocols, minimizing risks for our workforce and the environment.',
                image:
                  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
                icon: Network,
              },
              {
                number: '03',
                accent: 'ESG Compliance',
                title: 'Alignment with Global ESG Standards',
                description:
                  'Our commitment to environmental, social, and governance (ESG) principles is integral to our business model. We actively implement sustainable practices, promote social responsibility, and maintain transparent governance structures, thereby contributing to the well-being of communities and ensuring accountability to stakeholders worldwide.',
                image:
                  'https://images.unsplash.com/photo-1586528321409-9c7853d54ff1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
                icon: BarChart3,
              },
            ];

            return (
              <div className="flex flex-col md:flex-row gap-4 md:h-[600px]">
                {cards.map((card, index) => {
                  const Icon = card.icon;
                  const isExpanded = hoveredAdvantage === index;
                  const isCollapsed = hoveredAdvantage !== null && !isExpanded;

                  return (
                    <motion.div
                      key={card.number}
                      initial={{ opacity: 0, y: 45 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.85,
                        delay: index * 0.13,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      className="relative rounded-2xl overflow-hidden cursor-pointer h-[400px] md:h-auto"
                      style={{
                        flex: isExpanded ? 1.7 : isCollapsed ? 0.65 : 1,
                        transition: 'flex 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        boxShadow: isExpanded
                          ? '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,175,55,0.2)'
                          : '0 16px 50px rgba(0,0,0,0.5)',
                      }}
                      onMouseEnter={() => {
                        if (typeof window !== 'undefined' && window.innerWidth >= 768) {
                          setHoveredAdvantage(index);
                        }
                      }}
                      onMouseLeave={() => setHoveredAdvantage(null)}
                    >
                      {/* Full-bleed image with Ken Burns */}
                      <ImageWithFallback
                        src={card.image}
                        alt={card.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{
                          transform: isExpanded ? 'scale(1.06)' : 'scale(1)',
                          transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        }}
                      />

                      {/* Cinematic gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />

                      {/* Gold atmospheric glow — expanded */}
                      <div
                        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                        style={{
                          background:
                            'radial-gradient(ellipse at bottom left, rgba(212,175,55,0.12) 0%, transparent 70%)',
                          opacity: isExpanded ? 1 : 0,
                        }}
                      />

                      {/* Gold border — expanded */}
                      <div
                        className="absolute inset-0 rounded-2xl border-2 border-[#D4AF37] pointer-events-none transition-opacity duration-500"
                        style={{ opacity: isExpanded ? 0.35 : 0 }}
                      />

                      {/* Dim number watermark */}
                      <div
                        className="absolute top-5 right-5 font-bold text-white leading-none select-none pointer-events-none"
                        style={{
                          fontSize: 'clamp(4rem, 7vw, 6.5rem)',
                          opacity: isExpanded ? 0.06 : 0.1,
                          transition: 'opacity 0.4s ease',
                        }}
                      >
                        {card.number}
                      </div>

                      {/* ── Content panel ── */}
                      <div className="absolute bottom-0 inset-x-0 p-7 md:p-8">
                        {/* Category label */}
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className="h-px bg-[#D4AF37] transition-all duration-500"
                            style={{ width: isExpanded ? '2.5rem' : '1.75rem' }}
                          />
                          <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.42em] uppercase">
                            {card.accent}
                          </span>
                        </div>

                        {/* Icon — always visible on mobile, reveals on desktop expand */}
                        <div
                          className="overflow-hidden transition-all duration-500"
                          style={{
                            maxHeight: isExpanded ? '4rem' : '0',
                            opacity: isExpanded ? 1 : 0,
                            marginBottom: isExpanded ? '1.25rem' : '0',
                          }}
                        >
                          <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center"
                            style={{
                              background: 'rgba(212,175,55,0.1)',
                              border: '1px solid rgba(212,175,55,0.25)',
                              backdropFilter: 'blur(8px)',
                            }}
                          >
                            <Icon className="w-5 h-5 text-[#D4AF37]" />
                          </div>
                        </div>

                        {/* Mobile icon — always visible below md */}
                        <div className="md:hidden mb-4">
                          <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center"
                            style={{
                              background: 'rgba(212,175,55,0.1)',
                              border: '1px solid rgba(212,175,55,0.25)',
                            }}
                          >
                            <Icon className="w-5 h-5 text-[#D4AF37]" />
                          </div>
                        </div>

                        {/* Title */}
                        <h3
                          className="font-bold text-white leading-snug mb-0"
                          style={{
                            fontSize: isExpanded ? '1.35rem' : '1.15rem',
                            letterSpacing: '-0.018em',
                            transition: 'font-size 0.4s ease',
                          }}
                        >
                          {card.title}
                        </h3>

                        {/* Divider + Description — desktop: expands on hover; mobile: always visible */}
                        <div
                          className="md:hidden mt-4"
                        >
                          <div className="h-px bg-gradient-to-r from-[#D4AF37]/50 to-transparent mb-3" />
                          <p className="text-[#aaa] text-sm leading-relaxed">{card.description}</p>
                        </div>

                        <div
                          className="hidden md:block overflow-hidden transition-all duration-600"
                          style={{
                            maxHeight: isExpanded ? '12rem' : '0',
                            opacity: isExpanded ? 1 : 0,
                            marginTop: isExpanded ? '1rem' : '0',
                          }}
                        >
                          <div className="h-px bg-gradient-to-r from-[#D4AF37]/50 via-[#D4AF37]/20 to-transparent mb-4" />
                          <p className="text-[#b0b0b0] text-sm leading-relaxed">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            );
          })()}

        </div>
      </section>

      {/* Growth Strategy */}
      <section className="py-32 bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f]">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-6"
            >
              <span className="px-5 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] font-semibold">
                Future Vision
              </span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Growth Strategy
            </h2>
            <p className="text-xl text-[#a0a0a0] max-w-3xl mx-auto leading-relaxed">
              PK5 Mining is committed to driving sustainable growth through strategic investments in advanced mining technologies and expanding our operational capacities.
              Our growthstrategy focuses on enhancing resource efficiency, local partnerships, and exploring new markets to maximize value creation.
            </p>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <TimelineSection
              items={[
                {
                  icon: Target,
                  title: 'Expansion of Mining Licenses and Assets',
                  description: 'We scale production capacity by securing additional mining rights, ensuring arobust and sustainable resource pipeline for the future.​',
                },
                {
                  icon: Factory,
                  title: 'Investment in Processing',
                  description: 'We enhance our operational footprint by upgrading equipment and adopting smart technologies to increase throughput and optimize processing speeds without compromising quality',
                },
                {
                  icon: Globe,
                  title: 'Strategic Partnerships and Funding',
                  description: 'We partner with leading industry and financial experts to drive innovation, optimize resource allocation, and ensure the long-term financial stability and scalability of our operations.',
                },
                {
                  icon: BarChart3,
                  title: 'Continuous Operational Optimization',
                  description: 'We enhance organizational performance by modernizing workflows and leveraging industrial innovation, ensuring a lean operational model that prioritizes environmental responsibility and stringent safety protocols.',
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 bg-[#0a0a0a]">
         <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-6"
            >
              <span className="px-5 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] font-semibold">
                Executive Leadership
              </span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              PK5 Mining Leadership
            </h2>
            <p className="text-xl text-[#a0a0a0] max-w-4xl mx-auto leading-relaxed">
              Our executive leadership team brings world-class expertise in mining operations, sustainable resource
              development, and technological innovation. With deep industry experience and unwavering commitment to
              operational excellence, environmental responsibility, and long-term economic growth, our leaders position
              PK5 Mining as Africa's premier mining and minerals development company.
            </p>
          </AnimatedSection>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
          {/* FIX 2: Changed from 'leadership' to loop through your unique 'executiveLeadership' array */}
          {executiveLeadership.map((leader) => (
            <LeadershipAccordionCard
              key={leader.id}
              executive={leader}
              isExpanded={expandedExecutiveId === leader.id}
              onToggle={() => handleToggleExecutive(leader.id)}
            />
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Our Core Values</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {['Safety First', 'Environmental Stewardship', 'Innovation'].map((value, index) => (
              <AnimatedSection key={value} delay={index * 0.1}>
                <motion.div
                  className="p-10 bg-[#141414] rounded-xl border border-[#2a2a2a] text-center"
                  whileHover={{ scale: 1.05, borderColor: '#D4AF37' }}
                  transition={{ duration: 0.3 }}
                >
                  <Award className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white">{value}</h3>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}