import miningBgImg from "@/assets/images/miningloginbg.png";
import agroBgImg from "@/assets/images/agrologinbg.png";
import miningFormBgImg from "@/assets/images/miningloginformbg.png";
import agroFormBgImg from "@/assets/images/agrologinformbg.png";

export const LOGIN_CONTENT = {
  agro: {
    bgImage: agroBgImg,
    formBgImage: agroFormBgImg,
    bgAlt: "PK5 Agro Allied operations background",
    logoAlt: "PK5 Agro Allied logo",
    headline: (
      <>
        Sustaining the Future
        <br />
        of Agribusiness
      </>
    ),
    description:
      "Enterprise-grade operational control for global agricultural value chains",
    stats: [
      { value: "50+", label: "HUBS" },
      { value: "10.5M", label: "TONS YIELD" },
      { value: "99.99%", label: "UPTIME" },
    ],
  },
  mining: {
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
