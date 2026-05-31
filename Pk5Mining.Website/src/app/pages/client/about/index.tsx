import { motion } from 'motion/react';
import { AnimatedSection } from '@/app/components/animated-section';
import { ImageWithFallback } from '@/app/components/ui/ImageWithFallback';
import { Target, Eye, Award, BarChart3, Factory, Globe, Network } from 'lucide-react';
import { LeadershipAccordionCard } from '@/app/components/leadership-accordion-card';

// FIX 1: Keep timeline imported here so your journey section works perfectly!
import { timeline } from '@/app/fixtures';
import { executiveLeadership } from '@/app/data/leadership';
import { ITimelineEvent } from '@/app/interfaces';
import { TimelineSection } from '@/app/components/timeline-section';
import { useState } from 'react';

export function About() {
  // State to manage the expanded executive accordion card
  const [expandedExecutiveId, setExpandedExecutiveId] = useState<string | null>(null);

  // Toggle handler function for the accordion cards
  const handleToggleExecutive = (id: string) => {
    setExpandedExecutiveId(prevId => (prevId === id ? null : id));
  };


  const [hoveredAdvantage, setHoveredAdvantage] = useState<number | null>(null);

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
            src="https://images.unsplash.com/photo-1767416657497-6af140eac750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbWluaW5nJTIwc2l0ZXxlbnwxfHx8fDE3Njg5ODg3MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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

      {/* Mission & Vision */}
      <section className="py-24 bg-[#1a1a1a]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <AnimatedSection>
              <motion.div
                className="p-8 bg-[#0f0f0f] rounded-lg border border-gray-800"
                whileHover={{ borderColor: '#c89b3c', y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Target className="w-12 h-12 text-[#c89b3c] mb-6" />
                <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
                <p className="text-gray-400 leading-relaxed">
                  To responsibly extract and deliver high-quality strategic minerals that power global industries,
                  while maintaining the highest standards of environmental stewardship, worker safety, and
                  community engagement.
                </p>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <motion.div
                className="p-8 bg-[#0f0f0f] rounded-lg border border-gray-800"
                whileHover={{ borderColor: '#c89b3c', y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Eye className="w-12 h-12 text-[#c89b3c] mb-6" />
                <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
                <p className="text-gray-400 leading-relaxed">
                  To be the world's most trusted and sustainable mining company, setting industry standards for
                  operational excellence, innovation, and environmental responsibility while creating lasting value
                  for all stakeholders.
                </p>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Journey</h2>
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
                    className="w-16 h-16 rounded-full bg-[#c89b3c] flex items-center justify-center font-bold shrink-0"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {item.year}
                  </motion.div>

                  <div className="flex-1 pb-8">
                    <h3 className="text-2xl font-bold mb-2">{item.event}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
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
      <section className="py-24 bg-[#1a1a1a]">
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Core Values</h2>
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
                  <h3 className="text-2xl font-bold">{value}</h3>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}