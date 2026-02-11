import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { AnimatedSection } from "@/app/components/animated-section";
import { ImageWithFallback } from "@/app/components/ui/ImageWithFallback";
import { Briefcase, MapPin, Clock, ChevronRight, LocateIcon } from "lucide-react";
import { benefits, jobs } from "../fixtures";
import { IBenefit, IJob } from "../interfaces";
import { Link, useLocation } from "react-router-dom";
import { capitalizeFirstLetter } from "../utils/helper";

export function CareersPage() {
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const openPositionsRef = useRef<HTMLElement | null>(null);
  const { hash } = useLocation();

  const scrollToOpenPositions = () => {
    openPositionsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    if (hash === "#open-positions") {
      // wait a tick so layout/sections mount first
      requestAnimationFrame(() => {
        openPositionsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  }, [hash]);

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
            alt="Careers"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </motion.div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Careers at <span className="text-[#c89b3c]">PK5</span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join our team and help <br /> shape the future of sustainable mining.
          </motion.p>

          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 px-6 py-3 bg-[#c89b3c] text-black font-bold rounded hover:bg-[#d4a84a] transition-colors"
            onClick={scrollToOpenPositions}
          >
            See Job Openings
          </motion.button>
        </div>
      </section>

      {/* Why Work Here */}
      <section className="py-24 bg-[#1a1a1a]">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Work With Us?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We invest in our people because they are our greatest asset
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit: IBenefit, index: number) => (
              <AnimatedSection key={benefit.title} delay={index * 0.1}>
                <motion.div
                  className="p-8 bg-[#0f0f0f] rounded-lg border border-gray-800"
                  whileHover={{ y: -10, borderColor: "#c89b3c", scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 bg-[#c89b3c]/10 rounded-lg flex items-center justify-center mb-6"
                  >
                    <benefit.icon className="w-8 h-8 text-[#c89b3c]" />
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our <span className="text-[#c89b3c]">Culture</span>
              </h2>

              <p className="text-xl text-gray-400 mb-6">
                At PK5 Mining, we foster a culture of innovation, collaboration,
                and continuous improvement.
              </p>

              <div className="space-y-4">
                {[
                  "Safety-first mindset in everything we do",
                  "Diverse and inclusive work environment",
                  "Work-life balance and flexible arrangements",
                  "Recognition and reward programs",
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-[#c89b3c] rounded-full" />
                    <span className="text-gray-300">{item}</span>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <motion.div
                className="relative rounded-lg overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1751054770504-c69daeec4721?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbmclMjBleGNhdmF0b3IlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzY5MDc3NTEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Our culture"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section
        id="open-positions"
        ref={(el) => {
          openPositionsRef.current = el;
        }}
        className="py-24 bg-[#1a1a1a]"
      >
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Open Positions
            </h2>
            <p className="text-xl text-gray-400">
              Find your next opportunity with KP5 Mining
            </p>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            {jobs.length === 0 ? (
              <AnimatedSection>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center text-center py-16 px-6 bg-[#0f0f0f] border border-dashed border-gray-800 rounded-lg"
                >
                  <Briefcase className="w-10 h-10 text-[#c89b3c] mb-4 opacity-80" />

                  <p className="text-gray-300 text-lg mb-2">
                    No open roles at the moment
                  </p>

                  <p className="text-gray-500 max-w-md">
                    We are not hiring right now, but new positions open up from
                    time to time. Please check back soon.
                  </p>
                </motion.div>
              </AnimatedSection>
            ) : (
              jobs.map((job: IJob, index: number) => (
                <AnimatedSection key={job.title + index} delay={index * 0.05}>
                  <motion.div
                    className="mb-4 bg-[#0f0f0f] rounded-lg border border-gray-800 overflow-hidden"
                    whileHover={{ borderColor: "#c89b3c" }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.button
                      className="w-full p-6 flex items-center justify-between cursor-pointer"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center gap-4 flex-1 text-left">
                        <div>
                          <h3 className="font-bold text-lg mb-5">
                            {job.title}
                          </h3>
                          <p className="font-normal text-sm mb-3 text-gray-400">
                            {job.briefDescription}
                          </p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <MapPin size={14} /> {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={14} /> {capitalizeFirstLetter(job.jobType)}
                            </span>
                            <span className="flex items-center gap-1">
                              <LocateIcon size={14} /> {capitalizeFirstLetter(job.workArrangement)}
                            </span>
                            <span>{job.experience}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Link to={`/careers/job/${job.id}`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-[#c89b3c] text-xs text-black font-bold rounded hover:bg-[#d4a84a] transition-colors"
                        >
                          Apply Now
                        </motion.button>
                      </Link>
                    </motion.button>
                  </motion.div>
                </AnimatedSection>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}