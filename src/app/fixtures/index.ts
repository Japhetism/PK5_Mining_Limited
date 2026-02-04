import {
  Heart,
  GraduationCap,
  TrendingUp,
  DollarSign,
  Users,
  BarChart3,
  Shield,
  Cpu,
  Award,
  Sun,
  Droplet,
  TreePine,
  Recycle,
  Wind,
  Leaf,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react";
import {
  IBenefit,
  IFeature,
  IHighlight,
  IInitiative,
  IJob,
  ILeader,
  ILocation,
  IMineral,
  IProductionData,
  IReport,
  IRevenueData,
  ISlideShowContent,
  ISocialLink,
  ITimelineEvent,
} from "../interfaces";
import CEOImg from "../../assets/images/CEO.png";
import HOOImg from "../../assets/images/HOO.png";
import HOPImg from "../../assets/images/HOP.png";
import HITImg from "../../assets/images/HIT.png";
import AnnualReport from "../../assets/documents/PK5_Annual_Report_2025.pdf";
import Q4Report from "../../assets/documents/PK5_Q4_2025_Financial_Results.pdf";
import SustainabilityReport from "../../assets/documents/PK5_Sustainability_Report_2025.pdf";
import InvestorPresentation from "../../assets/documents/PK5_Investor_Presentation_2025.pdf";

export const minerals: IMineral[] = [
  {
    name: "Iron Ore",
    image:
      "https://images.unsplash.com/photo-1696999504253-c9e8f16315ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8SXJvbiUyME9yZXxlbnwwfHwwfHx8MA%3D%3D",
    use: "Construction, Steel Production, Manufacturing",
    purity: "99.2%",
  },
  {
    name: "Tin Ore",
    image:
      "https://images.unsplash.com/photo-1686828282201-858515e59322?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5lcmFsJTIwcm9ja3MlMjBzdG9uZXN8ZW58MXx8fHwxNzY5MDc3NTE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    use: "Electronics, Soldering, Alloys",
    purity: "99.85%",
  },
  {
    name: "Copper",
    image:
      "https://images.unsplash.com/photo-1764022276404-85682f38ae35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3BwZXIlMjBvcmUlMjBtaW5lcmFsfGVufDF8fHx8MTc2OTA3NjkyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    use: "Wiring, Construction, Electronics",
    purity: "99.9%",
  },
];

export const leadership: ILeader[] = [
  {
    name: "Prince Nnaemeka Njoku",
    role: "Chairman",
    experience: "20 years",
    image: CEOImg,
  },
  {
    name: "Peter Eziakor",
    role: "Head of Facilities & Production",
    experience: "25 years",
    image: HOPImg,
  },
  {
    name: "Alozie Okwukanma ",
    role: "Head of IT",
    experience: "15 years",
    image: HITImg,
  },
];

export const timeline: ITimelineEvent[] = [
  {
    year: "2021",
    event: "Company Founded",
    description: "PK5 Holdings Inc. established with first iron ore operation",
  },
  {
    year: "2023",
    event: "Expansion Phase",
    description: "Added copper extraction capabilities",
  },
  {
    year: "2024",
    event: "Sustainability Initiative",
    description: "Launched comprehensive environmental program",
  },
  {
    year: "2025",
    event: "Lithium Operations",
    description: "Entered lithium market for EV battery supply",
  }
];

export const locations: ILocation[] = [
  {
    "displayAddress": "5901 Peachtree Dunwoody Road, Suite A310, Atlanta, GA 30328, USA",
    "actualAddress": "5901 Peachtree Dunwoody Rd, Atlanta, GA 30328, USA",
    "type": "Head Office",
  },
  {
    "displayAddress": "2/5, Nza Street, Independence Layout Enugu, Enugu State, Nigeria",
    "actualAddress": "2/5, Nza Street, Independence Layout Enugu, Enugu State, Nigeria",
  },
  {
    "displayAddress": "No. 5B, Ikosi Road, Oregun, Ikeja, Lagos, Nigeria",
    "actualAddress": "No. 5B, Ikosi Road, Oregun, Ikeja, Lagos, Nigeria",
  },
]

export const telephone: string = "+2348026133205";

export const email: string = "info@pk5miningltd.com";

export const benefits: IBenefit[] = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive medical, dental, and mental health coverage",
  },
  {
    icon: GraduationCap,
    title: "Learning & Development",
    description: "Continuous training and career advancement programs",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "Clear pathways for professional development and promotion",
  },
  {
    icon: DollarSign,
    title: "Competitive Compensation",
    description: "Industry-leading salaries and performance bonuses",
  },
];

export const revenueData: IRevenueData[] = [
  { year: "2020", revenue: 245 },
  { year: "2021", revenue: 298 },
  { year: "2022", revenue: 342 },
  { year: "2023", revenue: 389 },
  { year: "2024", revenue: 425 },
  { year: "2025", revenue: 478 },
];

export const productionData: IProductionData[] = [
  { mineral: "Iron Ore", volume: 45000 },
  { mineral: "Tin Ore", volume: 38000 },
  { mineral: "Copper", volume: 52000 },
];

export const reports: IReport[] = [
  {
    title: "Annual Report 2025",
    type: "PDF",
    size: "4.2 MB",
    date: "Jan 2026",
    doc: AnnualReport,
  },
  {
    title: "Q4 2025 Financial Results",
    type: "PDF",
    size: "2.1 MB",
    date: "Jan 2026",
    doc: Q4Report,
  },
  {
    title: "Sustainability Report 2025",
    type: "PDF",
    size: "5.8 MB",
    date: "Dec 2025",
    doc: SustainabilityReport,
  },
  {
    title: "Investor Presentation",
    type: "PDF",
    size: "3.5 MB",
    date: "Nov 2025",
    doc: InvestorPresentation,
  },
];

export const highlights: IHighlight[] = [
  {
    label: "Market Cap",
    value: "2.5",
    suffix: "B",
    prefix: "₦",
    icon: DollarSign,
  },
  {
    label: "Annual Revenue",
    value: "478",
    suffix: "M",
    prefix: "₦",
    icon: TrendingUp,
  },
  { label: "Employees", value: "50+", suffix: "+", icon: Users },
  { label: "Operating Margin", value: "32", suffix: "%", icon: BarChart3 },
];

export const features: IFeature[] = [
  {
    icon: Shield,
    title: "Sustainable Mining",
    description: "Environmental responsibility at every stage of extraction",
  },
  {
    icon: Cpu,
    title: "Advanced Technology",
    description: "State-of-the-art extraction and processing equipment",
  },
  {
    icon: Users,
    title: "Skilled Workforce",
    description: "Highly trained professionals ensuring quality and safety",
  },
  {
    icon: Award,
    title: "Government Certified",
    description: "Fully compliant with international mining standards",
  },
];

export const esgMetrics = [
  { label: "Renewable Energy Usage", value: 75, icon: Sun },
  { label: "Water Recycling Rate", value: 85, icon: Droplet },
  { label: "Land Reclamation Progress", value: 68, icon: TreePine },
  { label: "Waste Reduction", value: 92, icon: Recycle },
  { label: "Carbon Footprint Reduction", value: 60, icon: Wind },
  { label: "Biodiversity Protection", value: 78, icon: Leaf },
];

export const initiatives: IInitiative[] = [
  {
    title: "Zero Waste Mining",
    description:
      "Implementing circular economy principles to minimize waste and maximize resource efficiency.",
    icon: Recycle,
  },
  {
    title: "Water Conservation",
    description:
      "Advanced water recycling systems reducing freshwater consumption by 85%.",
    icon: Droplet,
  },
  {
    title: "Renewable Energy",
    description:
      "Transitioning to solar and wind power for 75% of our energy needs.",
    icon: Sun,
  },
  {
    title: "Ecosystem Restoration",
    description: "Active programs to restore and protect local biodiversity.",
    icon: Leaf,
  },
];

export const socialLinks: ISocialLink[] = [
  {
    name: "LinkedIn",
    url: "https://linkedin.com/company/pk5-mining-limited",
    icon: Linkedin,
  },
  {
    name: "Twitter",
    url: "https://x.com/PK5Mining",
    icon: Twitter,
  },
  {
    name: "Facebook",
    url: "https://web.facebook.com/profile.php?id=61586817075708",
    icon: Facebook,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/pk5miningltd/",
    icon: Instagram,
  }
]

export const slideShowContent: ISlideShowContent[] = [
  {
    title: "Powering Industry Through",
    subTitle: "Responsible Mining",
    description: "PK5 Mining delivers high-quality iron ore, tin ore, copper, and strategic minerals for global industries.",
  },
  {
    title: "A Strategic Mining Brand of",
    subTitle: "PK5 Holdings Inc. (USA)",
    description: "PK5 Mining is an Africa-focused mining platform backed by PK5 Holdings Inc., USA, with initial operations in Tanzania and a strategic expansion focus on Nigeria as part of its long-term continental growth strategy.",
  },
  {
    title: "Africa-Focused • Expansion Focus",
    subTitle: "on Nigeria",
    description: "Our African journey began in Tanzania, with a strategic expansion focus on key mineral-rich regions of the continent, including Nigeria.",
  }
]

export const jobs: IJob[] = [
  {
    id: "mining-engineer-001",
    title: "Mining Engineer",
    department: "Operations",
    location: "Site A - Northern District",
    experience: "5+ years",
    jobType: "full-time",
    workArrangement: "onsite",
    briefDescription:
      "Own mine planning and production optimization while keeping safety and sustainability at the center.",
    descriptionHtml: `
      <p><strong>About the role</strong></p>
      <p>
        You will lead mine planning, drill & blast optimization, and day-to-day production improvements.
        You’ll partner with operations and HSE to deliver safe, efficient output.
      </p>

      <p><strong>Job role</strong></p>
      <ul>
        <li>Develop short- and long-term mine plans and schedules.</li>
        <li>Optimize production KPIs (cycle time, dilution, recovery, cost/ton).</li>
        <li>Coordinate with geology and maintenance to reduce downtime.</li>
        <li><span>Enforce safety standards and compliance on site.</span></li>
      </ul>

      <p><strong>Requirements (optional)</strong></p>
      <ul>
        <li>B.Eng / B.Sc in Mining Engineering (or related).</li>
        <li>Strong understanding of drill & blast, haulage, and pit design.</li>
        <li>Ability to communicate plans clearly across teams.</li>
        <li>Mining Engineering degree or equivalent experience</li>
        <li>Experience with pit design / production planning</li>
        <li>Strong site coordination and reporting skills</li>
      </ul>

      <p><strong>Job Duties</strong></p>
      <ul>
        <li>Mine planning and scheduling</li>
        <li>Production optimization</li>
        <li>Safety-first execution</li>
      </ul>
    `
  },

  {
    id: "environmental-specialist-002",
    title: "Environmental Specialist",
    department: "Sustainability",
    location: "Site B - Eastern Region",
    experience: "3+ years",
    jobType: "full-time",
    workArrangement: "hybrid",
    briefDescription:
      "Drive environmental compliance, monitoring, and sustainability initiatives across operations.",
    descriptionHtml: `
      <p><strong>About the role</strong></p>
      <p>
        You will ensure our sites meet environmental regulations and internal standards, while supporting
        long-term sustainability programs.
      </p>

      <p><strong>Job role</strong></p>
      <ul>
        <li>Run environmental monitoring (water, air, noise, waste).</li>
        <li>Prepare compliance reports and coordinate audits.</li>
        <li>Support ESIA/ESMP activities and stakeholder engagement.</li>
        <li><span>Partner with operations to reduce environmental impact.</span></li>
        <li>Environmental monitoring and reporting</li>
        <li>Audit readiness and compliance</li>
        <li>Sustainability program support</li>
      </ul>

      <p><strong>Requirements (optional)</strong></p>
      <ul>
        <li>Degree in Environmental Science/Engineering (or related).</li>
        <li>Knowledge of local environmental regulations and permitting.</li>
        <li>Environmental background (degree or equivalent experience)</li>
        <li>Experience with compliance reporting</li>
        <li>Comfortable working with site teams</li>
      </ul>

      <p><strong>Tools (optional)</strong></p>
      <ul>
        <li>Reporting tools (Excel/Power BI) and field sampling tools.</li>
      </ul>
    `,
  },

  {
    id: "safety-officer-003",
    title: "Safety Officer",
    department: "Health & Safety",
    location: "Multiple Sites",
    experience: "4+ years",
    jobType: "full-time",
    workArrangement: "onsite",
    briefDescription:
      "Own safety routines, training, and incident prevention to keep our people and sites protected.",
    descriptionHtml: `
      <p><strong>About the role</strong></p>
      <p>
        You’ll build a safety-first culture by leading toolbox talks, inspections, and corrective actions.
        You’ll partner with supervisors to prevent incidents and improve safety performance.
      </p>

      <p><strong>Job role</strong></p>
      <ul>
        <li>Conduct daily/weekly safety inspections and risk assessments.</li>
        <li>Lead incident reporting, investigation, and corrective actions.</li>
        <li>Deliver safety training and enforce PPE/permit-to-work processes.</li>
        <li><span>Track safety KPIs and recommend improvements.</span></li>
        <li>Site inspections and risk assessments</li>
        <li>Incident prevention and response</li>
        <li>Training and safety coaching</li>
      </ul>

      <p><strong>Requirements (optional)</strong></p>
      <ul>
        <li>HSE certification is a plus (e.g., NEBOSH/IOSH).</li>
        <li>Strong communication and coaching skills.</li>
        <li>Relevant HSE experience</li>
        <li>Comfortable working across multiple sites</li>
        <li>Strong reporting and documentation skills</li>
      </ul>
    `,
  },

  {
    id: "data-analyst-004",
    title: "Data Analyst",
    department: "Operations",
    location: "Head Office",
    experience: "2+ years",
    jobType: "full-time",
    workArrangement: "hybrid",
    briefDescription:
      "Turn operational data into insights—dashboards, KPIs, and reporting for better decisions.",
    descriptionHtml: `
      <p><strong>About the role</strong></p>
      <p>
        You’ll work with operations leaders to define KPIs, build dashboards, and improve data quality.
      </p>

      <p><strong>Job role</strong></p>
      <ul>
        <li>Build and maintain operational dashboards and weekly reports.</li>
        <li>Analyze production, downtime, cost, and safety datasets.</li>
        <li>Work with teams to define metric definitions and data sources.</li>
        <li><span>Recommend process improvements based on insights.</span></li>
        <li>Dashboards and reporting</li>
        <li>Operational KPI analysis</li>
        <li>Data quality</li>
         <li>Strong Excel skills and reporting mindset</li>
         <li>Comfortable with SQL or equivalent querying</li>
         <li>Ability to explain insights to non-technical stakeholders</li>
      </ul>

      <p><strong>Tech stack (optional)</strong></p>
      <ul>
        <li>SQL, Excel, Power BI/Tableau.</li>
        <li>Python (optional) for deeper analysis.</li>
      </ul>
    `,
  },

  {
    id: "mechanical-engineer-005",
    title: "Mechanical Engineer",
    department: "Maintenance",
    location: "Site C - Western Zone",
    experience: "5+ years",
    jobType: "full-time",
    workArrangement: "onsite",
    briefDescription:
      "Maintain and improve equipment reliability—preventive maintenance, root cause analysis, and uptime.",
    descriptionHtml: `
      <p><strong>About the role</strong></p>
      <p>
        You’ll reduce downtime and improve reliability across heavy equipment and plant operations.
      </p>

      <p><strong>Job role</strong></p>
      <ul>
        <li>Plan and execute preventive and corrective maintenance schedules.</li>
        <li>Perform root cause analysis for recurring equipment failures.</li>
        <li>Coordinate spares, vendors, and maintenance documentation.</li>
        <li><span>Ensure all maintenance is executed with safety compliance.</span></li>
        <li>Preventive maintenance</li>
        <li>Reliability improvement</li>
        <li>Failure analysis</li>
      </ul>

      <p><strong>Requirements</strong></p>
      <ul>
        <li>CMMS tools, maintenance logs, and reporting via Excel.</li>
        <li>Mechanical engineering background</li>
        <li>Experience with heavy equipment/plant maintenance</li>
        <li>Strong troubleshooting and documentation skills</li>
      </ul>
    `
  },

  {
    id: "geologist-006",
    title: "Geologist",
    department: "Exploration",
    location: "Multiple Sites",
    experience: "3+ years",
    jobType: "contract",
    workArrangement: "onsite",
    briefDescription:
      "Support exploration and grade control with mapping, sampling, logging, and interpretation.",
    descriptionHtml: `
      <p><strong>About the role</strong></p>
      <p>
        You’ll work closely with mining and exploration teams on mapping, drilling programs, and
        geological modeling to improve resource confidence.
      </p>

      <p><strong>Job role</strong></p>
      <ul>
        <li>Log core/RC samples and maintain sampling QA/QC.</li>
        <li>Support grade control and ore/waste boundary decisions.</li>
        <li>Interpret data and update geological models.</li>
        <li><span>Prepare field reports and technical summaries.</span></li>
        <li>Core logging and sampling</li>
        <li>Geological interpretation</li>
        <li>Field reporting</li>
      </ul>

      <p><strong>Requirements</strong></p>
      <ul>
        <li>GIS tools, modeling software, and Excel.</li>
        <li>Geology background (degree or equivalent experience)</li>
        <li>Fieldwork readiness across sites</li>
        <li>Strong attention to detail for QA/QC</li>
      </ul>
    `
  },
];
