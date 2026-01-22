import { motion } from 'motion/react';
import { AnimatedSection } from '@/app/components/animated-section';
import { StatCounter } from '@/app/components/stat-counter';
import { ImageWithFallback } from '@/app/components/ui/ImageWithFallback';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { features, minerals } from '../fixtures';
import { IFeature, IMineral } from '../interfaces';

export function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1709489662983-3674d790b224?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwcGl0JTIwbWluZXxlbnwxfHx8fDE3NjkwNTQyMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Mining site"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
        </motion.div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Powering Industry Through
            <br />
            <span className="text-[#c89b3c]">Responsible Mining</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            PK5 Mining Limited delivers high-quality tin ore, nickel, and strategic minerals for global industries.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: '#d4a84a' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-[#c89b3c] text-black font-bold rounded flex items-center gap-2 justify-center"
              >
                Explore Our Operations
                <ArrowRight size={20} />
              </motion.button>
            </Link>
            <Link to="/investor-relations">
              <motion.button
                whileHover={{ scale: 1.05, borderColor: '#c89b3c', color: '#c89b3c' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-white text-white font-bold rounded"
              >
                Investor Relations
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Minerals We Mine */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Minerals We Mine</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              High-purity strategic minerals for the modern industrial age
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {minerals.map((mineral: IMineral, index: number) => (
              <AnimatedSection key={mineral.name} delay={index * 0.1}>
                <motion.div
                  className="group relative overflow-hidden rounded-lg bg-[#1a1a1a] cursor-pointer"
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-square overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <ImageWithFallback
                        src={mineral.image}
                        alt={mineral.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <motion.div
                    className="absolute inset-0 p-6 flex flex-col justify-end"
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold mb-2 text-white">{mineral.name}</h3>
                    <p className="text-gray-300 text-sm mb-2">{mineral.use}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[#c89b3c] font-bold">Purity:</span>
                      <span className="text-white">{mineral.purity}</span>
                    </div>
                  </motion.div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{mineral.name}</h3>
                    <p className="text-gray-400 text-sm">{mineral.use}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Operations Overview */}
      <section className="py-24 bg-[#1a1a1a]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Operations</h2>
              <p className="text-xl text-gray-400 mb-8">
                Strategically located mining sites with state-of-the-art infrastructure and advanced extraction technology.
              </p>

              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#c89b3c] mb-2">
                    <StatCounter end={25} suffix="+" />
                  </div>
                  <div className="text-sm text-gray-400">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#c89b3c] mb-2">
                    <StatCounter end={12} />
                  </div>
                  <div className="text-sm text-gray-400">Active Sites</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#c89b3c] mb-2">
                    <StatCounter end={500} suffix="k" />
                  </div>
                  <div className="text-sm text-gray-400">Tons/Year</div>
                </div>
              </div>

              <Link to="/about">
                <motion.button
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-2 text-[#c89b3c] font-bold group"
                >
                  Learn More About Our Operations
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
                </motion.button>
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <motion.div
                className="relative rounded-lg overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1751054770504-c69daeec4721?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbmclMjBleGNhdmF0b3IlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzY5MDc3NTEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Mining operations"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Why Choose PK5 */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose PK5</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Industry-leading expertise combined with commitment to excellence
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature: IFeature, index: number) => (
              <AnimatedSection key={feature.title} delay={index * 0.1}>
                <motion.div
                  className="p-8 bg-[#1a1a1a] rounded-lg border border-gray-800 hover:border-[#c89b3c] transition-colors"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 bg-[#c89b3c]/10 rounded-lg flex items-center justify-center mb-6"
                  >
                    <feature.icon className="w-8 h-8 text-[#c89b3c]" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#c89b3c] to-[#9d7a2e] text-black">
        <div className="container mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Partner With Us?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join industry leaders who trust PK5 Mining for their mineral supply needs
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-black text-white font-bold rounded inline-flex items-center gap-2"
              >
                Get In Touch
                <ArrowRight size={20} />
              </motion.button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
