import  ceo2  from '../../assets/images/CEO2.png';
import  ceo  from '../../assets/images/CEO.png';
import  HOO  from '../../assets/images/HOP.png';
import  ICT  from '../../assets/images/HIT.png';

export interface ExecutiveProfile {
    id: string;
    name: string;
    role: string;
    shortBio: string;
    image: string;
    department: string;
}

export const executiveLeadership: ExecutiveProfile[] = [
    {
        id: '1',
        department: "CEO & Chairman",
        name: 'Barr. Prince Njoku',
        role: 'CEO & Chairman',
        shortBio: 'Managing Partner and United State licensed Attorney with over a decade of experience spanning litigation, regulatory advisory, and corporate counsel roles. Background includes legal leadership within private practice, in-house advisory, and consulting engagements, with additional exposure to the mining and minerals sector through investment, governance, and regulatory consulting work. Currently serving as Chairman of PK5 Mining Limited (2014–present), providing strategic leadership and governance oversight for mining operations in Africa, including regulatory compliance, risk management, logistics, and export planning. Also served as a Legal & Regulatory Consultant in Tanzania (July 2024–July 2025), advising mining companies on compliance, regulatory frameworks, and legal considerations. Brings a strong blend of legal strategy, business judgment, and cross-border advisory experience.​',
        image: ceo2,
    },
    {
        id: '2',
        department: "Corporate Affairs",
        name: 'Peter Eziakor',
        role: 'CORPORATE AFFAIRS',
        shortBio: 'Peter Eziakor is a seasoned real estate professional with over two decades of experience, with an expanded focus in mineral mining and land asset development since 2004. He brings strong expertise in land acquisition, property brokerage, and investment advisory, supporting miningmprojects through strategic site identification, land negotiations, and stakeholder engagement. His deep understanding of land valuation, regulatory frameworks, and market dynamics positions him as a trusted advisor in securing and managing land assets critical to mining operations.​ Over the years, Peter has built an extensive network across the real estate and land management ecosystem, enabling him to identify high-value mining development opportunities and facilitate seamless land transactions. He is committed to transparency, due diligence, and long-term value creation, consistently guiding investors and project stakeholders through complex land acquisition and development processes with professionalism and strategic insight.​',
        image: HOO,
    },
    {
        id: '3',
        department: "Information Technology",
        name: 'Alozie Okwukanma',
        role: 'HEAD OF ICT',
        shortBio:'Alozie Okwukanma brings over eight years of experience delivering scalable, enterprise-grade digital solutions, with a growing focus on mineral mining and resource management systems. He specializes in the Microsoft .NET ecosystem, cloud platforms, and modern web technologies, developing solutions that support mining operations, workflow automation, operational monitoring, and data-driven decision-making. Having contributed to major technology organizations, including Microsoft and Dolby Laboratories, he combines strong technical expertise with strategic leadership to design and deliver high-quality systems that improve operational efficiency and business performance.',
        image: ICT,
    },

];