import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Compass, Globe, Settings } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AnimatedSection } from "@/app/components/animated-section";
import { StatCounter } from "@/app/components/stat-counter";
import { ImageWithFallback } from "@/app/components/ui/ImageWithFallback";
import { features, minerals, slideShowContent } from "@/app/fixtures";
import { IFeature, IMineral } from "@/app/interfaces";

const HERO_SLIDE_DURATION = 6000;

export function Home() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setSlide((s) => (s + 1) % slideShowContent.length);
    }, HERO_SLIDE_DURATION);

    return () => clearInterval(t);
  }, []);

  const content = slideShowContent[slide];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1709489662983-3674d790b224?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwcGl0JTIwbWluZXxlbnwxfHx8fDE3NjkwNTQyMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Mining site"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
        </motion.div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="relative min-h-[320px] md:min-h-[380px] flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center px-6"
              >
                <h1 className="text-3xl md:text-6xl font-bold mb-2 leading-tight">
                  {content.title} <br />
                  <span className="text-[#c89b3c]">{content.subTitle}</span>
                </h1>

                <p className="text-md md:text-2xl text-gray-300 max-w-3xl mx-auto">
                  {content.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide indicators */}
          <div className="flex justify-center gap-2 mb-8 mt-5">
            {slideShowContent.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setSlide(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === slide
                  ? "w-8 bg-[#c89b3c]"
                  : "w-2 bg-gray-500 hover:bg-gray-400"
                  }`}
              />
            ))}
          </div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#d4a84a" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-[#c89b3c] text-black font-bold rounded flex items-center gap-2 justify-center mx-auto"
              >
                Explore Our Operations
                <ArrowRight size={20} />
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
      <section className="py-20 bg-[#0a0a0a] relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/4 rounded-full blur-[150px] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-16 max-w-[1380px]">
          <AnimatedSection className="mb-20 text-center">
            <h2
              className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white mb-5 mx-auto"
              style={{ letterSpacing: '-0.025em' }}
            >
              Minerals We Mine
            </h2>
            <p className="text-lg md:text-2xl text-[#787878] max-w-xl leading-relaxed mx-auto">
              High-purity strategic minerals for the modern industrial age
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {minerals.map((mineral, index) => (
              <AnimatedSection key={mineral.name} delay={index * 0.1}>
                <motion.div
                  className="group relative rounded-xl overflow-hidden cursor-pointer"
                  // whileHover={{ y: -8 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{
                    boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
                  }}
                >
                  {/* Image */}
                  <div className="h-64 overflow-hidden">
                    <ImageWithFallback
                      src={mineral.image}
                      alt={mineral.name}
                    // className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                  </div>

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                  {/* Index number */}
                  <div
                    className="absolute top-4 right-4 font-bold text-white/10 leading-none select-none"
                    style={{ fontSize: '4rem' }}
                  >
                    {mineral.index}
                  </div>

                  {/* Purity badge */}
                  <div className="absolute top-4 left-4 px-2.5 py-1 rounded-sm bg-[#D4AF37]/15 border border-[#D4AF37]/30 backdrop-blur-sm">
                    <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.3em] uppercase">
                      {mineral.purity} purity
                    </span>
                  </div>

                  {/* Card content */}
                  <div className="absolute bottom-0 inset-x-0 p-6">
                    <h3
                      className="text-2xl font-bold text-white mb-1"
                      style={{ letterSpacing: '-0.02em' }}
                    >
                      {mineral.name}
                    </h3>
                    <p className="text-[#909090] text-sm sm:text-base">{mineral.use}</p>

                    {/* Bottom rule */}
                    <div className="mt-4 h-px bg-gradient-to-r from-[#D4AF37]/50 to-transparent transition-all duration-300 group-hover:from-[#D4AF37]" />
                  </div>

                  {/* Gold border on hover */}
                  <div className="absolute inset-0 rounded-xl border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/25 transition-all duration-500 pointer-events-none" />
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Operations Overview */}
      <section className="py-20 bg-[#0d0d0d]">
        <div className="container mx-auto px-6 lg:px-16 max-w-[1380px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <h2
                className="text-4xl md:text-5xl font-bold mb-6 text-white"
                style={{ letterSpacing: '-0.025em' }}
              >
                Our Footprints
              </h2>

              <p className="text-lg md:text-2xl text-[#787878] max-w-xl leading-relaxed text-left">
                Strategically located mining sites with state-of-the-art infrastructure and advanced
                extraction technology.
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-0 mb-12 border border-[#2a2a2a] rounded-xl overflow-hidden">
                {[
                  { end: 5, suffix: '+', label: 'Years Experience' },
                  { end: 2, suffix: '', label: 'Active Sites' },
                  { end: 900, suffix: 'k', label: 'Tons / Year' },
                ].map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`p-6 text-center ${i < 2 ? 'border-r border-[#2a2a2a]' : ''}`}
                    style={{ background: 'rgba(20,20,20,0.6)' }}
                  >
                    <div
                      className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-1.5"
                      style={{ textShadow: '0 0 40px rgba(212,175,55,0.3)' }}
                    >
                      <StatCounter end={stat.end} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs text-[#666] uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>

              <Link to="/about">
                <motion.button
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-2.5 text-[#D4AF37] font-semibold group text-sm tracking-wide uppercase"
                >
                  Learn More About Our Operations
                  <ArrowRight
                    className="group-hover:translate-x-1.5 transition-transform duration-200"
                    size={16}
                  />
                </motion.button>
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <motion.div
                className="relative rounded-2xl overflow-hidden"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.4 }}
                style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1751054770504-c69daeec4721?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbmclMjBleGNhdmF0b3IlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzY5MDc3NTEyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Mining operations"
                  className="w-full h-[520px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Floating badge */}
                <div
                  className="absolute bottom-6 left-6 px-5 py-3 rounded-xl"
                  style={{
                    background: 'rgba(10,10,10,0.75)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(212,175,55,0.2)',
                  }}
                >
                  <div className="text-[#D4AF37] font-bold text-sm mb-0.5">ISO Certified</div>
                  <div className="text-[#666] text-xs">International Mining Standards</div>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Why Choose PK5 */}
      <section className="py-20 bg-[#0d0d0d] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#D4AF37]/4 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-16 max-w-[1380px] relative z-10">
          <AnimatedSection className="mb-20 text-center">
            <h2
              className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white mb-5 mx-auto"
              style={{ letterSpacing: '-0.025em' }}
            >
              Why Choose PK5
            </h2>
            <p className="text-lg md:text-2xl text-[#787878] max-w-xl leading-relaxed mx-auto">
              Industry-leading expertise combined with commitment to excellence
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feature, index) => (
              <AnimatedSection key={feature.title} delay={index * 0.1}>
                <motion.div
                  className="group relative p-8 rounded-xl overflow-hidden"
                  style={{
                    background: 'rgba(16,16,16,0.8)',
                    border: '1px solid rgba(42,42,42,0.8)',
                  }}
                  whileHover={{ y: -8, borderColor: 'rgba(212,175,55,0.3)' }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Top gold accent line */}
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/0 to-transparent group-hover:via-[#D4AF37]/50 transition-all duration-500" />

                  {/* Background glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 to-transparent group-hover:from-[#D4AF37]/5 transition-all duration-500 rounded-xl" />

                  <motion.div
                    className="relative z-10 w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{
                      background: 'rgba(212,175,55,0.08)',
                      border: '1px solid rgba(212,175,55,0.15)',
                    }}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="w-6 h-6 text-[#D4AF37]" />
                  </motion.div>

                  <div className="relative z-10">
                    <h3
                      className="text-lg font-bold text-white mb-3"
                      style={{ letterSpacing: '-0.015em' }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-[#777] text-sm sm:text-base leading-relaxed">{feature.description}</p>
                  </div>

                  {/* Vertical gold line on hover */}
                  <div className="absolute left-0 top-8 bottom-8 w-0.5 bg-[#D4AF37] scale-y-0 group-hover:scale-y-100 transition-transform duration-400 origin-top rounded-full" />
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#c89b3c] to-[#9d7a2e] text-black">
        <div className="container mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Partner With Us?
            </h2>
            <p className="text-lg md:text-2xl text-[#787878] max-w-xl leading-relaxed mx-auto"> </p>
            <p className="text-xl mb-8 max-w-xl mx-auto opacity-90">
              Join industry leaders who trust PK5 Mining for their mineral
              supply needs
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