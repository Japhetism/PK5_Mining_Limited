import { motion } from 'motion/react';
import { AnimatedSection } from '@/app/components/animated-section';
import { ImageWithFallback } from '@/app/components/ui/ImageWithFallback';
import { Target, Eye, Award, DollarSign, Network, TrendingUp, Users, Briefcase, Globe } from 'lucide-react';
import { leadership, timeline } from '@/app/fixtures';
import { ILeader, ITimelineEvent } from '@/app/interfaces';
import { ImpactCard } from '@/app/components/impact-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';

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
      {/* Economic Impact */}
      <section className="py-32 bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#D4AF37]/5 rounded-full blur-[120px]" />

        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-6"
            >
              <span className="px-5 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] font-semibold">
                National Impact
              </span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Economic Impact
            </h2>
            <p className="text-xl text-[#a0a0a0] max-w-3xl mx-auto leading-relaxed">
              PK5 Mining drives local, state, and national economic growth through sustainable mineral extraction, leveraging advanced
              technologies to enhance efficiency and support responsible environmental and socioeconomic development.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ImpactCard
              icon={Users}
              title="Creation of Direct and Indirect Employment"
              description="Our initiative generates numerous job opportunities not only within the core operations but also across related industries, thereby supporting livelihoods and reducing unemployment rates.​"
              // value={5000}
              // suffix="+"
              delay={0}
            />
            <ImpactCard
              icon={TrendingUp}
              title="Increased State and Federal Revenue"
              description="Enhanced economic activities lead to higher tax collections from businesses and employees, providing governments with additional resources to fund public services and infrastructure projects.​"
              // value={250}
              // suffix="M+"
              // prefix="$"
              delay={0.15}
            />
            <ImpactCard
              icon={Network}
              title="Development of Local Supply Chains"
              description="By fostering partnerships with local suppliers and manufacturers, the projects strengthen regional economies and promote sustainable business growth within the communities."
              delay={0.3}
            />
            <ImpactCard
              icon={DollarSign}
              title="Contribution of GDP and FX Earnings"
              description="The activities contribute significantly to the country's gross domestic product and foreign exchange earnings through exports and international trade, bolstering economic stability and growth.​"
              // value={500}
              // suffix="M+"
              // prefix="$"
              delay={0.45}
            />
          </div>
        </div>
      </section>

      {/* Government Alignment */}
      <section className="py-32 bg-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-6"
            >
              <span className="px-5 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] font-semibold">
                Policy Alignment
              </span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Aligned with Government Priorities
            </h2>
            <p className="text-xl text-[#a0a0a0] max-w-3xl mx-auto leading-relaxed">
              PK5 Mining aligns closely with government priorities by promoting economic development through responsible mineral exploitation. Our company
              emphasizes job creation, infrastructure enhancement, and export-driven growth to support sustainable local, state, and national progress.
            </p>
          </AnimatedSection>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Tabs defaultValue="diversification" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-12 bg-[#141414] p-2 rounded-lg border border-[#2a2a2a]">
              <TabsTrigger
                value="diversification"
                className="text-white/90 hover:text-[#D4AF37] data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black font-medium transition-colors"
              >
                Supports Economic Diversification Agenda
              </TabsTrigger>
              <TabsTrigger
                value="crude"
                className="text-white/90 hover:text-[#D4AF37] data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black font-medium transition-colors"
              >
                Reduces Reliance on Crude Oil
              </TabsTrigger>
              <TabsTrigger
                value="industrialization"
                className="text-white/90 hover:text-[#D4AF37] data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black font-medium transition-colors"
              >
                Promotes Industrialization and beneficiation
              </TabsTrigger>
              <TabsTrigger
                value="competitiveness"
                className="text-white/90 hover:text-[#D4AF37] data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black font-medium transition-colors"
              >
                Strengthens State and National Global Mineral Standings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="diversification" className="mt-8">
              <div className="p-10 rounded-lg bg-gradient-to-br from-[#141414] to-[#0f0f0f] border border-[#2a2a2a]">
                <h3 className="text-3xl font-bold mb-6 text-[#D4AF37]">Supports Economic Diversification Agenda</h3>
                <p className="text-lg text-[#a0a0a0] leading-relaxed mb-6">
                  We encourage the development of various sectors within the economy to reduce dependence on a single industry, fostering sustainable growth.
                </p>
                {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="p-6 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
          <Briefcase className="w-10 h-10 text-[#D4AF37] mb-4" />
          <h4 className="text-xl font-bold mb-3">Multiple Revenue Streams</h4>
          <p className="text-[#a0a0a0]">Iron ore, nickel, lithium, and strategic minerals</p>
        </div>
        <div className="p-6 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
          <Globe className="w-10 h-10 text-[#D4AF37] mb-4" />
          <h4 className="text-xl font-bold mb-3">Export Growth</h4>
          <p className="text-[#a0a0a0]">Expanding foreign exchange earnings</p>
        </div>
        <div className="p-6 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
          <Target className="w-10 h-10 text-[#D4AF37] mb-4" />
          <h4 className="text-xl font-bold mb-3">Sector Development</h4>
          <p className="text-[#a0a0a0]">Building world-class mining sector</p>
        </div>
      </div> */}
              </div>
            </TabsContent>

            <TabsContent value="crude" className="mt-8">
              <div className="p-10 rounded-lg bg-gradient-to-br from-[#141414] to-[#0f0f0f] border border-[#2a2a2a]">
                <h3 className="text-3xl font-bold mb-6 text-[#D4AF37]">Reduces Reliance on Crude Oil</h3>
                <p className="text-lg text-[#a0a0a0] leading-relaxed mb-6">
                  Our initiative decreases the country's economic vulnerability by minimizing dependence on crude oil exports and promoting alternative revenue sources.
                </p>
                {/* <div className="flex items-center gap-12 mt-8">
        <div className="flex-1">
          <div className="text-5xl font-bold text-[#D4AF37] mb-3">40%</div>
          <p className="text-[#a0a0a0]">Potential contribution to non-oil exports by 2030</p>
        </div>
        <div className="flex-1">
          <div className="text-5xl font-bold text-[#D4AF37] mb-3">$2B+</div>
          <p className="text-[#a0a0a0]">Annual revenue potential from mining sector</p>
        </div>
      </div> */}
              </div>
            </TabsContent>

            <TabsContent value="industrialization" className="mt-8">
              <div className="p-10 rounded-lg bg-gradient-to-br from-[#141414] to-[#0f0f0f] border border-[#2a2a2a]">
                <h3 className="text-3xl font-bold mb-6 text-[#D4AF37]">Promotes Industrialization and Beneficiation</h3>
                <p className="text-lg text-[#a0a0a0] leading-relaxed mb-6">
                  We facilitate the growth of manufacturing and processing industries, allowing the country to add value to its raw materials and boost domestic production.
                </p>
                {/* <div className="grid grid-cols-2 gap-6 mt-8">
        <div className="p-6 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
          <h4 className="text-xl font-bold mb-3 text-[#D4AF37]">Processing Plants</h4>
          <p className="text-[#a0a0a0]">State-of-the-art beneficiation facilities</p>
        </div>
        <div className="p-6 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
          <h4 className="text-xl font-bold mb-3 text-[#D4AF37]">Value Addition</h4>
          <p className="text-[#a0a0a0]">Export refined products, not raw materials</p>
        </div>
      </div> */}
              </div>
            </TabsContent>

            <TabsContent value="competitiveness" className="mt-8">
              <div className="p-10 rounded-lg bg-gradient-to-br from-[#141414] to-[#0f0f0f] border border-[#2a2a2a]">
                <h3 className="text-3xl font-bold mb-6 text-[#D4AF37]">Strengthens State and National Global Mineral Standings​</h3>
                <p className="text-lg text-[#a0a0a0] leading-relaxed mb-6">
                  We enhance the country's reputation and competitiveness in the international mineral market, attracting investment and trade opportunities.
                </p>
                <ul className="space-y-4 mt-8">
                  {/* Cleaned up the split block list items cleanly below */}
                  {/* <li className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 mt-1">
            <div className="w-3 h-3 rounded-full bg-[#D4AF37]" />
          </div>
          <div>
            <h4 className="font-bold text-lg mb-1">International Standards</h4>
            <p className="text-[#a0a0a0]">ISO certified operations and global ESG compliance</p>
          </div>
        </li>
        <li className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 mt-1">
            <div className="w-3 h-3 rounded-full bg-[#D4AF37]" />
          </div>
          <div>
            <h4 className="font-bold text-lg mb-1">Technology Leadership</h4>
            <p className="text-[#a0a0a0]">AI-driven operations and automation excellence</p>
          </div>
        </li>
        <li className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 mt-1">
            <div className="w-3 h-3 rounded-full bg-[#D4AF37]" />
          </div>
          <div>
            <h4 className="font-bold text-lg mb-1">Global Partnerships</h4>
            <p className="text-[#a0a0a0]">Strategic alliances with international mining leaders</p>
          </div>
        </li> */}
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
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