import { useState, useEffect, useRef } from 'react';
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

  useEffect(() => {
    const interval = window.setInterval(() => {
      setMissionIndex((current) => (current + 1) % missionCards.length);
    }, 7000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

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
            className="text-lg md:text-2xl text-gray-300 md:w-3/6 xs:w-5/6 mx-auto"
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
      <section className="relative py-20 bg-[#090909] overflow-hidden">
        {/* Ambient gold glow */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[400px] bg-[#C89B3C]/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-[#C89B3C]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6 lg:px-16 max-w-[1280px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

            {/* ── Left: Image ── */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative group order-2 lg:order-1"
            >
              {/* Gold border accent */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#C89B3C]/40 via-transparent to-[#C89B3C]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Outer shadow frame */}
              <div className="rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(200,155,60,0.15)] group-hover:shadow-[0_40px_100px_rgba(0,0,0,0.7),0_0_0_1px_rgba(200,155,60,0.3)] transition-shadow duration-500">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl"
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1767433072492-949406a337ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Green hills with exposed mineral rock formations — responsible mining and landscape preservation"
                    className="w-full h-full object-cover"
                  />
                  {/* Dark gradient overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
                  {/* Gold corner accent */}
                  <div className="absolute top-5 left-5 w-8 h-8 border-t-2 border-l-2 border-[#C89B3C]/70 rounded-tl-sm" />
                  <div className="absolute bottom-5 right-5 w-8 h-8 border-b-2 border-r-2 border-[#C89B3C]/70 rounded-br-sm" />
                </motion.div>
              </div>

              {/* Floating stat badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="absolute -bottom-5 -right-5 bg-[#0f0f0f] border border-[#C89B3C]/25 rounded-xl px-5 py-4 shadow-2xl backdrop-blur-sm"
              >
                <p className="text-[#C89B3C] text-2xl font-bold leading-none">5+</p>
                <p className="text-gray-400 text-xs mt-1 tracking-wider uppercase">Years of Impact</p>
              </motion.div>
            </motion.div>

            {/* ── Right: Content ── */}
            <div className="order-1 lg:order-2 flex flex-col justify-center">
              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-3xl sm:text-4xl lg:text-[2.6rem] xl:text-5xl font-bold text-white leading-[1.15] mb-6"
                style={{ letterSpacing: '-0.02em' }}
              >
                Our Vision
              </motion.h2>


              {/* Vision statement */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-gray-300 text-lg leading-relaxed mb-8"
              >
                At PK5 Mining, our vision is to be a trusted leader in the global mining sector, recognized for integrity, sustainability, and operational excellence.
              </motion.p>

              {/* Supporting line */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-gray-500 text-base leading-relaxed mb-10"
              >
                We are committed to driving long-term value for our stakeholders while preserving the natural landscapes and communities that make our operations possible — building a legacy that endures for generations.
              </motion.p>

              {/* Pillars row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.55 }}
                className="flex flex-wrap gap-3"
              >
                {['Integrity', 'Sustainability', 'Excellence'].map((pillar, i) => (
                  <span
                    key={pillar}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#C89B3C]/20 bg-[#C89B3C]/5 text-sm text-gray-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C89B3C]" />
                    {pillar}
                  </span>
                ))}
              </motion.div>
            </div>

          </div>
        </div>
      </section>


      {/* ── MISSION CAROUSEL ───────────────────────────────────────────── */}
      <section className="py-20 bg-[#090909] relative overflow-hidden">
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
          <div className="container mx-auto px-6 lg:px-16 max-w-[1380px] mb-16 text-center">
            <AnimatedSection>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-tight mb-4"
                style={{ letterSpacing: '-0.025em' }}
              >
                Our Mission
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.25 }}
                // <p className="text-lg md:text-2xl text-[#787878] max-w-xl leading-relaxed mx-auto"> </p>
                className="text-lg md:text-2xl text-[#787878] max-w-2xl leading-relaxed mx-auto"
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
      <section className="py-20 bg-[#0f0f0f]">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Our Journey</h2>
            <p className="text-lg md:text-2xl  text-gray-400">5 years of mining excellence</p>
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
                  <div className="text-lg md:text-2xl flex-1 pb-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">{item.event}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              PK5 Mining Leadership
            </h2>
            <p className="text-lg  md:text-2xl  text-[#a0a0a0] max-w-4xl mx-auto leading-relaxed">
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
      <section className="py-20 bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Our Core Values</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {['Safety First', 'Environmental Stewardship', 'Innovation'].map((value, index) => (
              <AnimatedSection key={value} delay={index * 0.1}>
                <motion.div
                  className="p-10 bg-[#141414] rounded-xl border border-[#2a2a2a] text-center"
                  whileHover={{  borderColor: '#D4AF37' }}
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