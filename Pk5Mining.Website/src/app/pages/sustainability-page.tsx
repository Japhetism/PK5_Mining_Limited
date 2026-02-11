import { motion, useInView } from 'motion/react';
import { AnimatedSection } from '@/app/components/animated-section';
import { ImageWithFallback } from '@/app/components/ui/ImageWithFallback';
import { Leaf } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import * as Progress from '@radix-ui/react-progress';
import { esgMetrics, initiatives } from '../fixtures';
import { IESGMetric, IInitiative } from '../interfaces';

function AnimatedProgressBar({ value, delay = 0 }: { value: number; delay?: number }) {
  const [progress, setProgress] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        setProgress(value);
      }, delay);
    }
  }, [isInView, value, delay]);

  return (
    <Progress.Root
      ref={ref}
      className="relative overflow-hidden bg-gray-800 rounded-full h-3 w-full"
      value={progress}
    >
      <Progress.Indicator
        className="bg-gradient-to-r from-[#c89b3c] to-[#9d7a2e] h-full transition-all duration-1000 ease-out rounded-full"
        style={{ width: `${progress}%` }}
      />
    </Progress.Root>
  );
}

export function SustainabilityPage() {
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
            src="https://images.unsplash.com/photo-1767385205729-2c4d176ffdd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbmclMjB3b3JrZXIlMjBzYWZldHl8ZW58MXx8fHwxNzY5MDc3NTE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Sustainability"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
        </motion.div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Sustainability <span className="text-[#c89b3c]">& ESG</span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Mining responsibly today for a sustainable tomorrow
          </motion.p>
        </div>
      </section>

      {/* ESG Commitment */}
      <section className="py-24 bg-[#1a1a1a]">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our ESG Commitment</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We believe that responsible mining is not just good ethics—it's good business. 
              Our comprehensive ESG framework guides every decision we make.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {esgMetrics.map((metric: IESGMetric, index: number) => (
              <AnimatedSection key={metric.label} delay={index * 0.1}>
                <motion.div
                  className="p-6 bg-[#0f0f0f] rounded-lg border border-gray-800"
                  whileHover={{ borderColor: '#c89b3c', y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="p-3 bg-[#c89b3c]/10 rounded-lg"
                    >
                      <metric.icon className="w-6 h-6 text-[#c89b3c]" />
                    </motion.div>
                    <h3 className="font-bold text-lg">{metric.label}</h3>
                  </div>
                  <AnimatedProgressBar value={metric.value} delay={index * 100} />
                  <div className="mt-2 text-right">
                    <span className="text-2xl font-bold text-[#c89b3c]">{metric.value}%</span>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Initiatives */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Sustainability Initiatives</h2>
            <p className="text-xl text-gray-400">
              Leading the industry with innovative environmental programs
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {initiatives.map((initiative: IInitiative, index: number) => (
              <AnimatedSection key={initiative.title} delay={index * 0.1}>
                <motion.div
                  className="p-8 bg-[#1a1a1a] rounded-lg"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="w-16 h-16 bg-gradient-to-br from-[#c89b3c] to-[#9d7a2e] rounded-lg flex items-center justify-center mb-6"
                  >
                    <initiative.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-3">{initiative.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{initiative.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Land Reclamation Story */}
      <section className="py-24 bg-[#1a1a1a]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Land <span className="text-[#c89b3c]">Reclamation</span>
              </h2>
              <p className="text-xl text-gray-400 mb-6">
                Every site we operate becomes a testament to our commitment to environmental restoration.
              </p>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Our land reclamation program goes beyond compliance. We don't just restore—we enhance. 
                Former mining sites are transformed into thriving ecosystems with native vegetation, 
                restored waterways, and protected habitats for local wildlife.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-4xl font-bold text-[#c89b3c] mb-2">50+</div>
                  <div className="text-sm text-gray-400">Hectares Restored</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[#c89b3c] mb-2">50k+</div>
                  <div className="text-sm text-gray-400">Trees Planted</div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <motion.div
                className="relative rounded-lg overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1767416657497-6af140eac750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbWluaW5nJTIwc2l0ZXxlbnwxfHx8fDE3Njg5ODg3MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Land reclamation"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Environmental Protection */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Environmental <span className="text-[#c89b3c]">Protection</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Proactive measures to minimize environmental impact and protect ecosystems
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { title: 'Air Quality Monitoring', description: 'Real-time tracking of emissions and air quality' },
              { title: 'Water Treatment', description: 'Advanced filtration before water release' },
              { title: 'Biodiversity Surveys', description: 'Regular assessments of local ecosystems' },
            ].map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 0.1}>
                <motion.div
                  className="p-6 bg-[#1a1a1a] rounded-lg text-center"
                  whileHover={{ y: -10, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 bg-[#c89b3c]/10 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Leaf className="w-6 h-6 text-[#c89b3c]" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
