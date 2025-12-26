// src/hooks/useActiveProductSection.js
import { useEffect, useState } from 'react';

const PRODUCT_SECTION_IDS = [
  "product-dashboard",
  "product-ar-ap", 
  "product-treasury",
  "product-sales-to-cash",
  "product-tds",
  "product-forecasting"
];

export function useActiveProductSection() {
  const [active, setActive] = useState("product-dashboard");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sections = PRODUCT_SECTION_IDS
      .map(id => document.getElementById(id))
      .filter(el => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActive(visible.target.id);
        }
      },
      {
        root: null,
        threshold: 0.4
      }
    );

    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return active;
}
