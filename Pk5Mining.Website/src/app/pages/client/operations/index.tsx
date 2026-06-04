import { motion } from 'motion/react';
import { AnimatedSection } from '@/app/components/animated-section';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { StrategicCard } from '@/app/components/strategic-card';
import { TimelineSection } from '@/app/components/timeline-section';
import { useState } from 'react';
import {
    Target,
    Factory,
    Ship,
    Mountain,
    TrendingUp,
    Network,
    Globe,
    BarChart3,
    Compass,
    Building2,
    Settings
} from 'lucide-react';
    
const coreOperations = [
    {
      number: '01',
      icon: Compass,
      title: 'Geological Exploration & Resource Validation:',
      description:
        'We conduct detailed surveys and analysis to identify and confirm the presence of valuable mineral deposits.',
    },
    {
      number: '02',
      icon: Building2,
      title: 'Mine Development & Infrastructure:',
      description:
        'We plan and construct the necessary facilities and systems to support efficient mining operations.',
    },
    {
      number: '03',
      icon: Settings,
      title: 'Extraction & Mineral Processing:',
      description:
        'We remove minerals from the earth and refine them to meet quality standards for market readiness.',
    },
    {
      number: '04',
      icon: Globe,
      title: 'Logistics & Export Operations:',
      description:
        'We manage the transportation and shipment of processed minerals to global markets in a timely and cost-effective manner.',
    },
  ];

export function OperationsPage() {
    const [hoveredAdvantage, setHoveredAdvantage] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            {/* Hero Section */}
            <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <ImageWithFallback
                        src="https://images.unsplash.com/photo-1751054770504-c69daeec4721?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbmclMjBleGNhdmF0b3IlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzY5MDc3NTEyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="PK5 Mining Operations"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0a0a0a]" />
                </div>

                {/* Content */}
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex items-center justify-center gap-4 mb-6"
                    >
                        <div className="w-16 h-px bg-[#D4AF37]" />
                        <span className="px-5 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] font-semibold text-xs tracking-[0.35em] uppercase">
                            Operations Excellence
                        </span>
                        <div className="w-16 h-px bg-[#D4AF37]" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-6"
                        style={{ letterSpacing: '-0.02em' }}
                    >
                        Our Operations
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-[#a0a0a0] max-w-3xl mx-auto leading-relaxed"
                    >
                        World-class mining operations powered by innovation, sustainable practices, and strategic vision
                    </motion.p>
                </div>
            </section>

            {/* ── CORE OPERATIONS ───────────────────────────────────────────── */}
            {/* ── CORE OPERATIONS ───────────────────────────────────────────── */}
            <section className="py-28 bg-[#090909] relative overflow-hidden">
                {/* Industrial grid texture */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage:
                            'repeating-linear-gradient(0deg, #D4AF37 0px, transparent 1px, transparent 72px), repeating-linear-gradient(90deg, #D4AF37 0px, transparent 1px, transparent 72px)',
                    }}
                />
                {/* Ambient gold glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#D4AF37]/4 rounded-full blur-[160px] pointer-events-none" />

                <div className="container mx-auto px-6 lg:px-16 max-w-[1380px] relative z-10">
                    {/* Section header */}
                    <div className="mb-10">
                        <AnimatedSection>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-4 mb-7"
                            >
                                <div className="w-10 h-px bg-[#D4AF37]" />
                                <span className="px-5 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] font-semibold text-xs tracking-[0.35em] uppercase">
                                    What We Do
                                </span>
                                <div className="w-10 h-px bg-[#D4AF37]" />
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.12 }}
                                className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white leading-tight mb-6"
                                style={{ letterSpacing: '-0.025em' }}
                            >
                                Our Mining Footprints
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.75, delay: 0.25 }}
                                className="text-lg text-[#787878] leading-relaxed max-w-2xl"
                            >
                                PK5 Mining specializes in the exploration and extraction of mineral resources across
                                nations. Our company is committed to sustainable mining practices and delivering
                                high-quality minerals to meet industrial demands.
                            </motion.p>
                        </AnimatedSection>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent mb-10" />

                    {/* Operations cards — 2×2 grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {coreOperations.map((op, index) => {
                            const Icon = op.icon;
                            return (
                                <AnimatedSection key={op.number} delay={index * 0.1}>
                                    <motion.div
                                        className="group relative rounded-xl p-8 overflow-hidden cursor-default"
                                        style={{
                                            background:
                                                'linear-gradient(135deg, rgba(20,20,20,0.9) 0%, rgba(12,12,12,0.95) 100%)',
                                            border: '1px solid rgba(42,42,42,0.8)',
                                            boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
                                        }}
                                        whileHover={{ y: -5 }}
                                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                                    >
                                        {/* Gold left border that appears on hover */}
                                        <motion.div
                                            className="absolute left-0 top-6 bottom-6 w-0.5 rounded-full bg-[#D4AF37] origin-top"
                                            initial={{ scaleY: 0, opacity: 0 }}
                                            whileHover={{ scaleY: 1, opacity: 1 }}
                                            transition={{ duration: 0.4 }}
                                        />

                                        {/* Hover border glow */}
                                        <div
                                            className="absolute inset-0 rounded-xl border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/20 transition-all duration-500 pointer-events-none"
                                        />

                                        {/* Background gold glow on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 to-[#D4AF37]/0 group-hover:from-[#D4AF37]/4 transition-all duration-500 rounded-xl pointer-events-none" />

                                        {/* Large dim number watermark */}
                                        <div
                                            className="absolute top-3 right-5 font-bold text-[#D4AF37] leading-none select-none pointer-events-none"
                                            style={{ fontSize: '5.5rem', opacity: 0.055 }}
                                        >
                                            {op.number}
                                        </div>

                                        {/* Icon */}
                                        <div className="relative z-10 mb-6">
                                            <motion.div
                                                className="w-14 h-14 rounded-xl flex items-center justify-center"
                                                style={{
                                                    background: 'rgba(212,175,55,0.08)',
                                                    border: '1px solid rgba(212,175,55,0.18)',
                                                }}
                                                whileHover={{ scale: 1.1, background: 'rgba(212,175,55,0.14)' }}
                                                transition={{ duration: 0.25 }}
                                            >
                                                <Icon className="w-6 h-6 text-[#D4AF37]" />
                                            </motion.div>
                                        </div>

                                        {/* Gold rule separator */}
                                        <div className="relative z-10 h-px w-12 bg-[#D4AF37]/40 mb-5 group-hover:w-20 group-hover:bg-[#D4AF37]/70 transition-all duration-400" />

                                        {/* Title */}
                                        <h3
                                            className="relative z-10 text-lg md:text-xl font-bold text-white mb-4 leading-snug"
                                            style={{ letterSpacing: '-0.015em' }}
                                        >
                                            {op.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="relative z-10 text-[#888] text-sm leading-relaxed">
                                            {op.description}
                                        </p>
                                    </motion.div>
                                </AnimatedSection>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Strategic Focus Areas */}
            <section className="py-32 bg-[#0a0a0a] relative">
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)',
                            backgroundSize: '48px 48px',
                        }}
                    />
                </div>

                <div className="container mx-auto px-6 lg:px-16 max-w-[1380px] relative z-10">
                    <AnimatedSection className="mb-20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4 mb-6"
                        >
                            <div className="w-10 h-px bg-[#D4AF37]" />
                            <span className="px-5 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] font-semibold text-xs tracking-[0.35em] uppercase">
                                Strategic Focus
                            </span>
                            <div className="w-10 h-px bg-[#D4AF37]" />
                        </motion.div>
                        <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                            Strategic Focus Areas
                        </h2>
                        <p className="text-xl text-[#a0a0a0] max-w-2xl leading-relaxed">
                            Comprehensive mining operations spanning exploration, processing, and export logistics
                        </p>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <StrategicCard
                            title="Iron Ore Development"
                            description="Advanced exploration, geological modelling, and reserve validation driving long-term commercial iron ore production across our strategic mining sites."
                            image="https://images.unsplash.com/photo-1709489662983-3674d790b224?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwcGl0JTIwbWluZXxlbnwxfHx8fDE3NjkwNTQyMDR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                            icon={Mountain}
                            delay={0}
                        />
                        <StrategicCard
                            title="Processing & Value Addition"
                            description="State-of-the-art beneficiation plants and crushing facilities transforming raw minerals into export-ready, refined products of exceptional quality."
                            image="https://images.unsplash.com/photo-1751054770504-c69daeec4721?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbmclMjBleGNhdmF0b3IlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzY5MDc3NTEyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                            icon={Factory}
                            delay={0.2}
                        />
                        <StrategicCard
                            title="Export-Oriented Production"
                            description="Integrated mine-to-port logistics infrastructure ensuring seamless export operations and global market access for African mineral resources."
                            image="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJnbyUyMHNoaXAlMjBwb3J0fGVufDF8fHx8MTc2OTA3NzUxNHww&ixlib=rb-4.1.0&q=80&w=1080"
                            icon={Ship}
                            delay={0.4}
                        />
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
                    <AnimatedSection className="mb-16">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="flex items-center gap-4 mb-7"
                        >
                            <div className="w-10 h-px bg-[#D4AF37]" />
                            <span className="px-5 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] font-semibold text-xs tracking-[0.35em] uppercase">
                                Infrastructure
                            </span>
                            <div className="w-10 h-px bg-[#D4AF37]" />
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white leading-tight mb-5"
                            style={{ letterSpacing: '-0.025em' }}
                        >
                            Processing and<br />Industrialization
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.75, delay: 0.2 }}
                            className="text-lg text-[#848484] leading-relaxed max-w-2xl"
                        >
                            PK5 Agro-Allied develops integrated agro-processing facilities to enhance the value
                            of agricultural produce using modern technologies. We promote sustainable agriculture
                            and local economic growth through infrastructure development and value chain expansion.
                        </motion.p>
                    </AnimatedSection>

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
                                        Agro-Processing
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
                                    Establishment of Agro-Processing Facilities
                                </h3>

                                {/* Animated separator */}
                                <div className="h-px w-12 bg-gradient-to-r from-[#D4AF37] to-transparent mb-5 group-hover:w-20 transition-all duration-500" />

                                {/* Description */}
                                <p className="text-[#888] leading-relaxed text-[0.95rem]">
                                    We set up processing plants to handle agricultural produce locally, increasing
                                    value addition and creating employment opportunities.
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
                                    Value Addition Before Market Distribution
                                </h3>

                                <div className="h-px w-12 bg-gradient-to-r from-[#D4AF37] to-transparent mb-5 group-hover:w-20 transition-all duration-500" />

                                <p className="text-[#888] leading-relaxed text-[0.95rem]">
                                    We improve product quality by transforming raw crops into processed or
                                    semi-processed goods, enhancing market value and revenue potential.
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
                                        Local Processing
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
                                    Reduction of Raw Produce Export Dependency
                                </h3>

                                <div className="h-px w-12 bg-gradient-to-r from-[#D4AF37] to-transparent mb-5 group-hover:w-20 transition-all duration-500" />

                                <p className="text-[#888] leading-relaxed text-[0.95rem]">
                                    We reduce reliance on exporting unprocessed agricultural products by promoting
                                    local processing and packaging.
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
                                    Development of Agro-Based Industries
                                </h3>

                                <div className="h-px w-12 bg-gradient-to-r from-[#D4AF37] to-transparent mb-5 group-hover:w-20 transition-all duration-500" />

                                <p className="text-[#888] leading-relaxed text-[0.95rem]">
                                    We support the growth of industries that utilize processed agricultural outputs,
                                    driving economic diversification and industrial development.
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
                    <AnimatedSection className="mb-16">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="flex items-center gap-4 mb-7"
                        >
                            <div className="w-10 h-px bg-[#D4AF37]" />
                            <span className="px-5 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] font-semibold text-xs tracking-[0.35em] uppercase">
                                Competitive Edge
                            </span>
                            <div className="w-10 h-px bg-[#D4AF37]" />
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white leading-tight mb-5"
                            style={{ letterSpacing: '-0.025em' }}
                        >
                            Competitive<br />Advantage
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.75, delay: 0.2 }}
                            className="text-lg text-[#848484] leading-relaxed max-w-2xl"
                        >
                            PK5 Agro-Allied maintains a competitive edge through its commitment to sustainable
                            agricultural practices and the integration of modern technologies. Our focus on
                            efficient resource management and strong community engagement further strengthens our
                            position in the agribusiness sector.
                        </motion.p>
                    </AnimatedSection>

                    {/* Gold horizontal rule */}
                    <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/22 to-transparent mb-14" />

                    {/* ── Expanding Panel Cards ─── */}
                    {(() => {
                        const cards = [
                            {
                                number: '01',
                                accent: 'Supply Chain',
                                title: 'Integrated farm-to-market model',
                                description:
                                    'Our operations ensure seamless control of the supply chain from cultivation to retail, enhancing freshness, reducing waste, and lowering overall costs.',
                                image:
                                    'https://images.unsplash.com/photo-1535379453347-1ffd615e2e08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
                                icon: Globe,
                            },
                            {
                                number: '02',
                                accent: 'Partnerships',
                                title: 'Strong technical and strategic partnerships',
                                description:
                                    'Collaborations with industry experts and technology providers allow us to adopt advanced processing techniques and continuously improve product quality.',
                                image:
                                    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
                                icon: Network,
                            },
                            {
                                number: '03',
                                accent: 'Growth',
                                title: 'Scalable operations',
                                description:
                                    'Our robust infrastructure supports expansion and increased production capacity to efficiently meet growing market demands.',
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
                            className="flex items-center justify-center gap-4 mb-6"
                        >
                            <div className="w-10 h-px bg-[#D4AF37]" />
                            <span className="px-5 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] font-semibold text-xs tracking-[0.35em] uppercase">
                                Future Vision
                            </span>
                            <div className="w-10 h-px bg-[#D4AF37]" />
                        </motion.div>
                        <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                            Growth Strategy
                        </h2>
                        <p className="text-xl text-[#a0a0a0] max-w-3xl mx-auto leading-relaxed">
                            Strategic roadmap for sustainable expansion and market leadership
                        </p>
                    </AnimatedSection>

                    <div className="max-w-4xl mx-auto">
                        <TimelineSection
                            items={[
                                {
                                    icon: Target,
                                    title: 'Expansion of Mining Assets',
                                    description: 'Strategic acquisition of additional mining licenses and exploration of high-potential mineral reserves across multiple regions.',
                                },
                                {
                                    icon: Factory,
                                    title: 'Processing Infrastructure Investment',
                                    description: 'Development of advanced processing facilities and beneficiation plants to maximize value addition and product quality.',
                                },
                                {
                                    icon: Globe,
                                    title: 'Strategic Partnerships',
                                    description: 'Establishing international partnerships and securing strategic funding for accelerated growth and market expansion.',
                                },
                                {
                                    icon: BarChart3,
                                    title: 'Operational Optimization',
                                    description: 'Continuous improvement through technology adoption, process refinement, and efficiency maximization across all operations.',
                                },
                            ]}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
