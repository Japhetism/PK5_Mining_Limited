import { useEffect } from "react";
import { useConsent } from "./ConsentProvider";

function loadScript(src: string) {
  const s = document.createElement("script");
  s.src = src;
  s.async = true;
  document.head.appendChild(s);
}

export function ConsentGates() {
  const { consent } = useConsent();

  useEffect(() => {
    if (!consent) return; // not chosen yet

    if (consent.analytics) {
      // example: load GA script only if analytics is allowed
      loadScript("https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX");
      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(args);
      }
      gtag("js", new Date());
      gtag("config", "G-XXXXXXX");
    }

    if (consent.marketing) {
      // load marketing pixels here
    }
  }, [consent]);

  return null;
}
