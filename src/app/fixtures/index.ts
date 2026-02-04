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

export const jobs: IJob[] = [
  {
    id: "mining-engineer",
    title: "Mining Engineer",
    department: "Operations",
    location: "Site A - Northern District",
    type: "Full-time",
    experience: "5+ years",
    description:
      "As a Mining Engineer at PK5 Mining, you will design, plan, and oversee mining operations to ensure safe, efficient, and sustainable extraction of mineral resources.",
  },
  {
    id: "environmental-specialist",
    title: "Environmental Specialist",
    department: "Sustainability",
    location: "Site B - Eastern Region",
    type: "Full-time",
    experience: "3+ years",
    description:
      "The Environmental Specialist supports our ESG commitments by monitoring environmental impact, ensuring regulatory compliance, and driving continuous improvement in sustainability practices.",
  },
  {
    id: "safety-officer",
    title: "Safety Officer",
    department: "Health & Safety",
    location: "Multiple Sites",
    type: "Full-time",
    experience: "4+ years",
    description:
      "The Safety Officer is responsible for implementing and enforcing safety standards across our operations, conducting training, and leading incident investigations.",
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    department: "Operations",
    location: "Head Office",
    type: "Full-time",
    experience: "2+ years",
    description:
      "As a Data Analyst, you will work closely with operations teams to analyze production and performance data, generate insights, and support data-driven decision making.",
  },
  {
    id: "mechanical-engineer",
    title: "Mechanical Engineer",
    department: "Maintenance",
    location: "Site C - Western Zone",
    type: "Full-time",
    experience: "5+ years",
    description:
      "The Mechanical Engineer will maintain and optimize heavy mining equipment, ensuring maximum uptime and reliability across our sites.",
  },
  {
    id: "geologist",
    title: "Geologist",
    department: "Exploration",
    location: "Multiple Sites",
    type: "Full-time",
    experience: "3+ years",
    description:
      "The Geologist supports exploration activities by conducting field surveys, analyzing geological data, and identifying new resource opportunities.",
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
