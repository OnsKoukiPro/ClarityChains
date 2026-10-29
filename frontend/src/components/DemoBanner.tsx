import React, { useEffect, useRef, useState } from "react";
import { Info, X, Github } from "lucide-react";

const STORAGE_KEY = "cc-demo-banner-dismissed";

function wasDismissed() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export default function DemoBanner() {
  const [hidden, setHidden] = useState(wasDismissed);
  const ref = useRef<HTMLDivElement>(null);

  // Publish the banner height so the fixed sidebar and the page can sit below it
  useEffect(() => {
    const root = document.documentElement;
    const el = ref.current;
    if (!el) {
      root.style.setProperty("--cc-banner-h", "0px");
      return;
    }
    const update = () => root.style.setProperty("--cc-banner-h", `${el.offsetHeight}px`);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      observer.disconnect();
      root.style.setProperty("--cc-banner-h", "0px");
    };
  }, [hidden]);

  if (hidden) return null;

  const dismiss = () => {
    setHidden(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // storage unavailable, banner just comes back on reload
    }
  };

  return (
    <div ref={ref} className="cc-demo-banner" role="note">
      <Info className="cc-demo-banner-icon" aria-hidden="true" />
      <p>
        <strong>Interactive mockup.</strong>{" "}
        <span className="cc-hide-mobile">
          Everything here runs on sample data; uploads, Clare AI chat and exports are not connected to the backend.
        </span>
        <span className="cc-mobile-only">Sample data, no backend connected.</span>
      </p>
      <a href="https://github.com/OnsKoukiPro/ClarityChains" target="_blank" rel="noreferrer">
        <Github aria-hidden="true" />
        <span className="cc-hide-mobile">View source</span>
      </a>
      <button type="button" onClick={dismiss} aria-label="Dismiss banner">
        <X aria-hidden="true" />
      </button>
    </div>
  );
}
