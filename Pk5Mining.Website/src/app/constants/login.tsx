import miningBgImg from "@/assets/images/miningloginbg.png";
import agrobgimage from "@/assets/images/agrobgimage.png";
import miningFormBgImg from "@/assets/images/miningloginformbg.png";
import agrologinbg from "@/assets/images/agrologinbg.png";
import miningLogo from "@/assets/images/logo.png";
import agroLogo from "@/assets/images/agrologo.png";

export const LOGIN_CONTENT = {
  agro: {
    logo: agroLogo,
    bgImage: agrobgimage,
    formBgImage: agrologinbg,
    bgAlt: "PK5 Agro Allied operations background",
    logoAlt: "PK5 Agro Allied logo",
    headline: (
      <>
        Powering the Future of 
        <br />
        Agriculture
      </>
    ),
    description:
      "Enterprise-grade agricultural solutions designed to improve productivity, sustainability, and operational excellence.",
    stats: [
      { value: "10+", label: "Partner Farms" },
      { value: "2.3M", label: "Products Output" },
      { value: "99.99%", label: "Supply Reliability" },
    ],
  },
  mining: {
    logo: miningLogo,
    bgImage: miningBgImg,
    formBgImage: miningFormBgImg,
    bgAlt: "PK5 Mining operations background",
    logoAlt: "PK5 Mining logo",
    headline: (
      <>
        Powering the Future
        <br />
        of Mineral Development
      </>
    ),
    description:
      "Enterprise grade administrative control for global mining operations",
    stats: [
      { value: "3+", label: "ACTIVE SITES" },
      { value: "2.3M", label: "DAILY OUTPUT" },
      { value: "99.9%", label: "SYSTEM UPTIME" },
    ],
  },
};
