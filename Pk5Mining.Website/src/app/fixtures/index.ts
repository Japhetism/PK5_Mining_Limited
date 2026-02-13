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
  IUser,
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
    id: "65f1a9c2e4b0f7a3d91c0a01",
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
        You will lead mine planning, drill and blast optimization, and day-to-day production improvements.
        You will collaborate closely with operations, geology, and HSE teams to deliver safe and efficient output.
      </p>

      <p><strong>Key responsibilities</strong></p>
      <ul>
        <li>Develop short- and long-term mine plans and production schedules.</li>
        <li>Optimize production KPIs including cycle time, dilution, recovery, and cost per ton.</li>
        <li>Coordinate with geology and maintenance teams to minimize downtime.</li>
        <li>Ensure strict adherence to safety standards and regulatory requirements.</li>
      </ul>

      <p><strong>Requirements</strong></p>
      <ul>
        <li>B.Eng or B.Sc in Mining Engineering or a related discipline.</li>
        <li>Minimum of 5 years experience in mine planning and operations.</li>
        <li>Strong understanding of drill and blast, haulage, and pit design.</li>
        <li>Excellent communication and site coordination skills.</li>
      </ul>
    `,
  },

  {
    id: "65f1a9c2e4b0f7a3d91c0a02",
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
        You will ensure that all operations comply with environmental regulations and internal sustainability
        standards while supporting long-term environmental programs.
      </p>

      <p><strong>Key responsibilities</strong></p>
      <ul>
        <li>Conduct environmental monitoring covering air, water, noise, and waste.</li>
        <li>Prepare environmental compliance reports and support audits.</li>
        <li>Support ESIA and ESMP implementation activities.</li>
        <li>Work with site teams to reduce environmental impact.</li>
      </ul>

      <p><strong>Requirements</strong></p>
      <ul>
        <li>Degree in Environmental Science, Engineering, or a related field.</li>
        <li>Knowledge of environmental regulations and permitting processes.</li>
        <li>Experience with compliance reporting and site-based work.</li>
      </ul>
    `,
  },

  {
    id: "65f1a9c2e4b0f7a3d91c0a03",
    title: "Safety Officer",
    department: "Health & Safety",
    location: "Multiple Sites",
    experience: "4+ years",
    jobType: "full-time",
    workArrangement: "onsite",
    briefDescription:
      "Own safety routines, training, and incident prevention to keep people and sites protected.",
    descriptionHtml: `
      <p><strong>About the role</strong></p>
      <p>
        You will promote a strong safety-first culture by leading inspections, training, and incident
        prevention initiatives across multiple operational sites.
      </p>

      <p><strong>Key responsibilities</strong></p>
      <ul>
        <li>Conduct routine safety inspections and risk assessments.</li>
        <li>Lead incident reporting, investigations, and corrective actions.</li>
        <li>Deliver safety training, toolbox talks, and enforce PPE standards.</li>
        <li>Track safety KPIs and drive continuous improvement.</li>
      </ul>

      <p><strong>Requirements</strong></p>
      <ul>
        <li>Relevant HSE experience in mining or industrial environments.</li>
        <li>HSE certifications such as NEBOSH or IOSH are an advantage.</li>
        <li>Strong communication, coaching, and documentation skills.</li>
      </ul>
    `,
  },

  {
    id: "65f1a9c2e4b0f7a3d91c0a04",
    title: "Data Analyst",
    department: "Operations",
    location: "Head Office",
    experience: "2+ years",
    jobType: "full-time",
    workArrangement: "hybrid",
    briefDescription:
      "Turn operational data into insights through dashboards, KPIs, and reporting.",
    descriptionHtml: `
      <p><strong>About the role</strong></p>
      <p>
        You will work closely with operations leaders to define KPIs, build dashboards, and improve data
        quality to support informed decision-making.
      </p>

      <p><strong>Key responsibilities</strong></p>
      <ul>
        <li>Design and maintain operational dashboards and reports.</li>
        <li>Analyze production, downtime, cost, and safety datasets.</li>
        <li>Define metrics and ensure data consistency across teams.</li>
        <li>Translate insights into actionable recommendations.</li>
      </ul>

      <p><strong>Requirements</strong></p>
      <ul>
        <li>Strong analytical skills with advanced Excel knowledge.</li>
        <li>Experience using SQL or similar querying tools.</li>
        <li>Ability to communicate insights to non-technical stakeholders.</li>
      </ul>

      <p><strong>Tech stack</strong></p>
      <ul>
        <li>SQL, Excel, Power BI or Tableau.</li>
        <li>Python for advanced analysis (optional).</li>
      </ul>
    `,
  },

  {
    id: "65f1a9c2e4b0f7a3d91c0a05",
    title: "Mechanical Engineer",
    department: "Maintenance",
    location: "Site C - Western Zone",
    experience: "5+ years",
    jobType: "full-time",
    workArrangement: "onsite",
    briefDescription:
      "Improve equipment reliability through preventive maintenance and failure analysis.",
    descriptionHtml: `
      <p><strong>About the role</strong></p>
      <p>
        You will be responsible for improving equipment reliability and uptime by leading preventive
        maintenance programs and root cause analysis.
      </p>

      <p><strong>Key responsibilities</strong></p>
      <ul>
        <li>Plan and execute preventive and corrective maintenance activities.</li>
        <li>Perform root cause analysis on recurring equipment failures.</li>
        <li>Coordinate spare parts, vendors, and maintenance documentation.</li>
        <li>Ensure maintenance activities comply with safety standards.</li>
      </ul>

      <p><strong>Requirements</strong></p>
      <ul>
        <li>Mechanical Engineering degree or equivalent experience.</li>
        <li>Experience with heavy equipment or plant maintenance.</li>
        <li>Strong troubleshooting and documentation skills.</li>
      </ul>
    `,
  },

  {
    id: "65f2b7d9a3c4e1f089ab3c10",
    title: "Geologist",
    department: "Exploration",
    location: "Multiple Sites",
    experience: "3+ years",
    jobType: "contract",
    workArrangement: "onsite",
    briefDescription:
      "Support exploration and grade control through mapping, sampling, and geological interpretation.",
    descriptionHtml: `
      <p><strong>About the role</strong></p>
      <p>
        You will support exploration and grade control activities by conducting geological mapping,
        sampling, logging, and interpretation across multiple sites.
      </p>

      <p><strong>Key responsibilities</strong></p>
      <ul>
        <li>Log core and RC samples while maintaining QA/QC standards.</li>
        <li>Support grade control and ore/waste boundary decisions.</li>
        <li>Interpret geological data and update models.</li>
        <li>Prepare field reports and technical summaries.</li>
      </ul>

      <p><strong>Requirements</strong></p>
      <ul>
        <li>Degree in Geology or equivalent field experience.</li>
        <li>Experience with site-based fieldwork.</li>
        <li>Strong attention to detail and data accuracy.</li>
      </ul>
    `,
  },
];

export const authUser: IUser = {
  id: "b27a5a58-5a5f-4c2d-b4e0-8d7a3e2d5e9c",
  username: "admin",
  firstName: "Babatunde",
  lastName: "Ojo",
  email: "babatunde.ojo@pk5miningltd.com",
  isActive: true,
  role: "super admin",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
}

