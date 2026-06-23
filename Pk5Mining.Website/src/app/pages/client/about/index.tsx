import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { AnimatedSection } from '@/app/components/animated-section';
import { ImageWithFallback } from '@/app/components/ui/ImageWithFallback';
import { Award, DollarSign, Network, TrendingUp, Briefcase, Globe, BarChart3, Factory, ChevronRight, ChevronLeft, Users, Mountain } from 'lucide-react';
import { timeline } from '@/app/fixtures';
import { ITimelineEvent } from '@/app/interfaces';
import { LeadershipAccordionCard } from '@/app/components/leadership-accordion-card';
import { executiveLeadership } from '@/app/data/leadership';
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
            {/* Cinematic statement */}
            <div className="relative">
              {/* Decorative oversized quotation mark */}
              <div
                className="absolute -top-4 -left-2 text-[#D4AF37] select-none pointer-events-none font-serif leading-none"
                style={{ fontSize: 'clamp(7rem, 16vw, 18rem)', opacity: 0.055, lineHeight: 1 }}
              >
                &ldquo;
              </div>

              <div className="relative">
                {/* Decorative oversized quotation mark */}
                <div
                  className="absolute -top-4 -left-2 text-white select-none pointer-events-none font-serif leading-none"
                  style={{ fontSize: 'clamp(7rem, 16vw, 18rem)', opacity: 0.04, lineHeight: 1 }}
                >
                  "
                </div>

                <motion.h2
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.05, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative text-4xl sm:text-5xl md:text-[3.25rem] lg:text-[3.75rem] xl:text-[4.25rem] font-bold leading-[1.12] text-white max-w-[1080px]"
                  style={{ letterSpacing: '-0.025em' }}
                >
                  At PK5 Mining, our vision is to be a trusted leader in the global mining sector, recognized for integrity, sustainability, and operational excellence.
                </motion.h2>
              </div>

            </div>
          </div>
        </div>
      </section>

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
                className="text-lg text-[#787878] max-w-2xl leading-relaxed mx-auto"
              >
                Four pillars that define our commitment to excellence, sustainability, and long-term value creation.
              </motion.p>
            </AnimatedSection>
          </div>

          {/* Carousel track */}
          <div
            ref={carouselContainerRef}
            className="overflow-hidden mx-auto max-w-[1380px]"
          >
            <div
              className="flex gap-5"
              style={{
                transform: `translateX(-${(missionIndex % missionCards.length) * cardStepPx}px)`,
                transition: 'transform 0.72s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                willChange: 'transform',
              }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {[...missionCards, ...missionCards].map((card, index) => {
                const Icon = card.icon;
                const isActive = (index % missionCards.length) === missionIndex;
                return (
                  <motion.div
                    data-slide
                    key={`${card.id}-${index}`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.75, delay: (index % missionCards.length) * 0.08 }}
                    className="flex-shrink-0 w-[82vw] sm:w-[65vw] md:w-[52vw] lg:w-[480px]"
                  >
                    <motion.div
                      className="relative rounded-2xl overflow-hidden group"
                      style={{
                        height: 'clamp(460px, 50vh, 560px)',
                        boxShadow: isActive
                          ? '0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,175,55,0.25)'
                          : '0 20px 55px rgba(0,0,0,0.55)',
                        transition: 'box-shadow 0.4s ease',
                      }}
                      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                      onClick={() => goToMissionSlide(index % missionCards.length)}
                    >
                      {/* Background image */}
                      <ImageWithFallback
                        src={card.image}
                        alt={card.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out"
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

      {/* Leadership */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center mb-20">
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