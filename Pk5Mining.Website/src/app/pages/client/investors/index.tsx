import { motion } from 'motion/react';
import { TrendingUp, Download, FileText } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AnimatedSection } from '@/app/components/animated-section';
import { StatCounter } from '@/app/components/stat-counter';
import { highlights, productionData, reports, revenueData } from '@/app/fixtures';
import { IHighlight, IReport } from '@/app/interfaces';

export function InvestorRelations() {

  const downloadReport = (doc?: string, fileName?: string) => {
    if (!doc) return;

    const link = document.createElement("a");
    link.href = doc;
    link.download = fileName ? `${fileName}.pdf` : "document.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#1a1a1a]">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Investor <span className="text-[#c89b3c]">Relations</span>
            </h1>
            <p className="text-xl text-gray-400">
              Building value through sustainable growth and operational excellence
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="py-24 bg-[#1a1a1a]">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Financial Highlights</h2>
            <p className="text-xl text-gray-400">FY 2025 Performance</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight: IHighlight, index: number) => (
              <AnimatedSection key={highlight.label} delay={index * 0.1}>
                <motion.div
                  className="p-8 bg-[#0f0f0f] rounded-lg border border-gray-800 text-center"
                  whileHover={{ y: -10, borderColor: '#c89b3c', scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 bg-[#c89b3c]/10 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <highlight.icon className="w-8 h-8 text-[#c89b3c]" />
                  </motion.div>
                  <div className="text-4xl font-bold text-[#c89b3c] mb-2">
                    <StatCounter end={parseFloat(highlight.value)} suffix={highlight.suffix} prefix={highlight.prefix} />
                  </div>
                  <div className="text-gray-400">{highlight.label}</div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Revenue Chart */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Revenue Growth</h2>
            <p className="text-xl text-gray-400">Six-year revenue trajectory (in millions NGN)</p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <motion.div
              className="bg-[#1a1a1a] p-8 rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="year" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #c89b3c' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#c89b3c"
                    strokeWidth={3}
                    dot={{ fill: '#c89b3c', r: 6 }}
                    animationDuration={2000}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Production Volume */}
      <section className="py-24 bg-[#1a1a1a]">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Production Volume</h2>
            <p className="text-xl text-gray-400">Annual output by mineral type (in tons)</p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <motion.div
              className="bg-[#0f0f0f] p-8 rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={productionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="mineral" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #c89b3c' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Bar
                    dataKey="volume"
                    fill="url(#colorGradient)"
                    animationDuration={2000}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#c89b3c" />
                      <stop offset="100%" stopColor="#9d7a2e" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Reports & Documents */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Reports & Documents</h2>
            <p className="text-xl text-gray-400">Access our latest financial and operational reports</p>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            {reports.map((report: IReport, index: number) => (
              <AnimatedSection key={report.title} delay={index * 0.1}>
                <motion.div
                  className="mb-4 p-6 bg-[#1a1a1a] rounded-lg border border-gray-800 flex items-center justify-between group cursor-pointer"
                  whileHover={{ x: 10, borderColor: '#c89b3c' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <FileText className="w-8 h-8 text-[#c89b3c]" />
                    <div>
                      <h3 className="font-bold text-lg mb-1">{report.title}</h3>
                      <p className="text-sm text-gray-400">
                        {report.type} • {report.size} • {report.date}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-[#c89b3c] rounded-lg group-hover:bg-[#d4a84a] transition-colors"
                    onClick={() => downloadReport(report.doc, report.title)}
                  >
                    <Download className="w-5 h-5 text-black" />
                  </motion.button>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Proposition */}
      <section className="py-24 bg-[#1a1a1a]">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Invest in PK5?</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { title: 'Strategic Position', description: 'Leading supplier of critical minerals for growing industries' },
              { title: 'Strong Financials', description: 'Consistent revenue growth and healthy profit margins' },
              { title: 'ESG Leadership', description: 'Industry-leading sustainability and governance practices' },
            ].map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 0.1}>
                <motion.div
                  className="p-8 bg-[#0f0f0f] rounded-lg text-center"
                  whileHover={{ y: -10, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <TrendingUp className="w-12 h-12 text-[#c89b3c] mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}