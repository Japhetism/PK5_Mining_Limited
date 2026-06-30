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
                        className="text-2xl text-[#a0a0a0] max-w-3xl mx-auto leading-relaxed"
                    >
                        World-class mining operations powered by innovation, sustainable practices, and strategic vision
                    </motion.p>
                </div>
            </section>

            {/* ── CORE OPERATIONS ───────────────────────────────────────────── */}
            <section className="py-20 bg-[#090909] relative overflow-hidden">
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

                <div className="container mx-auto px-6 lg:px-16 max-w-[1380px] relative z-10 text-center">
                    {/* Section header */}
                    <div className="mb-10">
                        <AnimatedSection>
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.12 }}
                                className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white leading-tight mb-6 mx-auto"
                                style={{ letterSpacing: '-0.025em' }}
                            >
                                Our Core Operations
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.75, delay: 0.25 }}
                                className=" md:text-2xl text-lg text-[#787878] leading-relaxed max-w-2xl mx-auto"
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
                                        <p className="relative z-10 text-[#888] text-sm sm:text-base leading-relaxed">
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
            <section className="py-20 bg-[#0a0a0a] relative">
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
                    <AnimatedSection className="mb-20 text-center">
                        <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white mx-auto">
                            Strategic Focus Areas
                        </h2>
                        <p className="text-2xl text-[#a0a0a0] max-w-4xl leading-relaxed mx-auto">
                            PK5 Mining strategically aligns its core focus areas to enhance operational efficiency and drive sustainable growth. This approach ensures the company remains competitive while meeting industry demands and stakeholder expectations.

                        </p>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <StrategicCard
                            title="Iron Ore Development"
                            description=" We target high-grade deposits through systematic exploration, geological modelling, and JORC-compliant reserve validation to support long-term commercial production.
"
                            image="https://images.unsplash.com/photo-1709489662983-3674d790b224?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwcGl0JTIwbWluZXxlbnwxfHx8fDE3NjkwNTQyMDR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                            icon={Mountain}
                            delay={0}
                        />
                        <StrategicCard
                            title="Processing & Value Addition"
                            description="Our on-site beneficiation and crushing plants convert raw ore into refined, graded products ready for direct export, maximizing in-country value and margins."
                            image="https://images.unsplash.com/photo-1751054770504-c69daeec4721?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbmclMjBleGNhdmF0b3IlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzY5MDc3NTEyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                            icon={Factory}
                            delay={0.2}
                        />
                        <StrategicCard
                            title="Export-Oriented Production"
                            description="Our end-to-end logistics from mine to port, including rail corridors and bulk-handling terminals, deliver mineral commodities to global markets efficiently."
                            image="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJnbyUyMHNoaXAlMjBwb3J0fGVufDF8fHx8MTc2OTA3NzUxNHww&ixlib=rb-4.1.0&q=80&w=1080"
                            icon={Ship}
                            delay={0.4}
                        />
                    </div>
                </div>
            </section>

            {/* ── PROCESSING AND INDUSTRIALIZATION ──────────────────────────── */}
            <section className="py-20 bg-[#090909] relative overflow-hidden">
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
                    <AnimatedSection className="mb-16 text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white leading-tight mb-5 mx-auto"
                            style={{ letterSpacing: '-0.025em' }}
                        >
                            Processing and Industrialization
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.75, delay: 0.2 }}
                            className=" md:text-2xl text-lg text-[#848484] leading-relaxed max-w-4xl mx-auto"
                        >
                            PK5 Mining designs integrated processing plants to enhance the value of raw minerals using advanced
                            technologies. We promote sustainable mining and local economic growth through infrastructure
                            development.

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
                                // className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
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
                                <p className=" md:text-1xl text-sm sm:text-base leading-relaxed text-[0.95rem]">
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

                                <p className="md:text-1xl text-sm sm:text-base leading-relaxed text-[0.95rem]">
                                    We enhance the quality by transforming minerals into finished or semi-finished products
                                    to increase export revenues.

                                </p>

                                <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/0 to-transparent group-hover:via-[#D4AF37]/35 transition-all duration-600" />
                            </div>

                            {/* Image panel */}
                            <div className="relative h-72 lg:h-[440px] overflow-hidden order-1 lg:order-2">
                                <ImageWithFallback
                                    src="https://images.unsplash.com/photo-1668838225765-daa3a5da6207?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080"
                                    alt="Value Addition Before Market Distribution"
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out "
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
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out"
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

                                <p className="md:text-1xl text-sm sm:text-base leading-relaxed text-[0.95rem]">
                                    We decrease reliance on exporting unprocessed minerals by promoting local processing and
                                    manufacturing.
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

                                <p className=" md:text-1xl text-sm sm:text-base leading-relaxed text-[0.95rem]">
                                    We encourage industries that utilize processed minerals to produce finished goods,
                                    thereby boosting economic growth and diversification.

                                </p>

                                <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/0 to-transparent group-hover:via-[#D4AF37]/35 transition-all duration-600" />
                            </div>

                            {/* Image panel */}
                            <div className="relative h-72 lg:h-[440px] overflow-hidden order-1 lg:order-2">
                                <ImageWithFallback
                                    src="https://images.unsplash.com/photo-1582055871659-2fcf2e4d3bd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080"
                                    alt="Development of Agro-Based Industries"
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/60" />
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#D4AF37]/8 blur-2xl" />
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* ── COMPETITIVE ADVANTAGE ─────────────────────────────────────── */}
            <section className="py-20 bg-[#0a0a0a] relative overflow-hidden">
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
                    <AnimatedSection className="mb-16 text-center">

                        <motion.h2
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white leading-tight mb-5 mx-auto"
                            style={{ letterSpacing: '-0.025em' }}
                        >
                            Our Competitive Advantage
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.75, delay: 0.2 }}
                            className=" md:text-2xl text-lg text-[#848484] leading-relaxed max-w-4xl mx-auto"
                        >
                            PK5 Mining maintains a competitive edge through its commitment to sustainable mining practices and
                            advanced technological integration. Our focus on efficient resource management and community
                            engagement further strengthens our market position.

                        </motion.p>
                    </AnimatedSection>

                    {/* Gold horizontal rule */}
                    <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/22 to-transparent mb-14" />

                    {/* ── Expanding Panel Cards ─── */}
                    {(() => {
                        const cards = [
                            {
                                number: '01',
                                accent: 'Strong Vision',
                                title: 'Strong Leadership & Strategic Vision',
                                description:
                                    'Our organization consistently exhibits effective leadership by setting clear goals and a well-defined roadmap, ensuring all teams are aligned and motivated to achieve long-term success. This approach fosters innovation, adaptability, and resilience in a rapidly evolving industry.',
                                image:
                                    'https://images.unsplash.com/photo-1535379453347-1ffd615e2e08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
                                icon: Globe,
                            },
                            {
                                number: '02',
                                accent: 'Technology',
                                title: 'Technology-Driven Mining Approach',
                                description:
                                    'We leverage cutting-edge technologies, including automation, data analytics, and real-time monitoring systems, to optimize mining operations. These advancements not only boost operational efficiency but also significantly enhance safety protocols, minimizing risks for our workforce and the environment.',
                                image:
                                    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
                                icon: Network,
                            },
                            {
                                number: '03',
                                accent: 'Global ESG',
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
            <section className="py-20 bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f]">
                <div className="container mx-auto px-6">
                    <AnimatedSection className="text-center mb-20">
                        <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white mx-auto">
                            Our Growth Strategy
                        </h2>
                        <p className="text-xl text-[#a0a0a0] max-w-4xl mx-auto leading-relaxed ">
                            PK5 Mining is committed to driving sustainable growth through strategic investments in advanced mining
                            technologies and expanding our operational capacities. Our growth strategy focuses on enhancing
                            resource efficiency, fostering local partnerships, and exploring new markets to maximize value creation.

                        </p>
                    </AnimatedSection>

                    <div className="max-w-4xl mx-auto">
                        <TimelineSection
                            items={[
                                {
                                    icon: Target,
                                    title: 'Expansion of Mining Licenses and Assets',
                                    description: 'We scale production capacity by securing additional mining rights, ensuring a robust and sustainable resource pipeline for the future.',
                                },
                                {
                                    icon: Factory,
                                    title: 'Investment in Processing ',
                                    description: 'We enhance our operational footprint by upgrading equipment and adopting smart technologies to increase throughput and optimize processing speeds without compromising quality.',
                                },
                                {
                                    icon: Globe,
                                    title: '	Strategic Partnerships and Funding',
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
        </div>
    );
}
