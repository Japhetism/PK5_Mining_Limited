import { motion } from 'motion/react';
import { AnimatedSection } from '@/app/components/animated-section';
import { ImageWithFallback } from '@/app/components/ui/ImageWithFallback';
import { Target, Eye, Award, BarChart3, Factory, Network, TrendingUp } from 'lucide-react';
import { leadership, timeline } from '@/app/fixtures';
import { ILeader, ITimelineEvent } from '@/app/interfaces';

export function About() {
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
                  {/* Timeline line */}
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

                  {/* Content */}
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
      {/* Leadership */}
      <section className="py-24 bg-[#1a1a1a]">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-400">Experience and expertise driving our success</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadership.map((leader: ILeader, index: number) => (
              <AnimatedSection key={leader.name} delay={index * 0.1}>
                <motion.div
                  className="text-center p-6 bg-[#0f0f0f] rounded-lg"
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="w-32 h-32 rounded-full bg-gradient-to-br from-[#c89b3c] to-[#9d7a2e] mx-auto mb-6 flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    {/* <Users className="w-16 h-16 text-white" /> */}
                    <img src={leader.image} alt={leader.name} loading="lazy" className="w-32 h-32 rounded-full object-cover" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2">{leader.name}</h3>
                  <p className="text-[#c89b3c] text-sm mb-2">{leader.role}</p>
                  {/* <p className="text-gray-400 text-sm">{leader.experience} experience</p> */}
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Core Values</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {['Safety First', 'Environmental Stewardship', 'Innovation'].map((value, index) => (
              <AnimatedSection key={value} delay={index * 0.1}>
                <motion.div
                  className="p-8 bg-[#1a1a1a] rounded-lg text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Award className="w-12 h-12 text-[#c89b3c] mx-auto mb-4" />
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