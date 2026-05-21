import { useState } from 'react';
import { motion } from 'motion/react';
import { AnimatedSection } from '@/app/components/animated-section';
import { ImageWithFallback } from '@/app/components/ui/ImageWithFallback';
import { Target, Eye, Award } from 'lucide-react';
import { LeadershipAccordionCard } from '@/app/components/leadership-accordion-card';

// FIX 1: Keep timeline imported here so your journey section works perfectly!
import { timeline } from '@/app/fixtures';
import { executiveLeadership } from '@/app/data/leadership';
import { ITimelineEvent } from '@/app/interfaces';

export function About() {
  // State to manage the expanded executive accordion card
  const [expandedExecutiveId, setExpandedExecutiveId] = useState<string | null>(null);

  // Toggle handler function for the accordion cards
  const handleToggleExecutive = (id: string) => {
    setExpandedExecutiveId(prevId => (prevId === id ? null : id));
  };

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
            <p>PK5 Mining is a strategic mining brand of PK5 Holdings Inc., USA , established to develop and operate responsible mining assets across Africa.</p><br/>
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