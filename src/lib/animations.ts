import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ═══════════════════════════════════════════════════════════════
   INIT — call on every astro:page-load
   ═══════════════════════════════════════════════════════════════ */
export function initAnimations() {
  initHero();
  initMagneticLinks();
  initEntryAnimations();
}

/* ═══════════════════════════════════════════════════════════════
   HERO — scramble text, staggered entrance, parallax
   ═══════════════════════════════════════════════════════════════ */
function initHero() {
  const heroContent = document.getElementById("hero-content");
  const heroName = document.getElementById("hero-name");
  if (!heroContent) return;

  const elements = heroContent.querySelectorAll<HTMLElement>(".hero-rule, .hero-meta, .hero-links");

  if (reduceMotion) {
    gsap.set(elements, { opacity: 1, y: 0 });
    return;
  }

  // Scramble the name
  if (heroName) {
    const target = heroName.dataset.text || heroName.textContent || "";
    const textSpan = document.createElement("span");
    textSpan.textContent = target;
    heroName.innerHTML = "";
    heroName.appendChild(textSpan);

    gsap.to(textSpan, {
      duration: 1.2,
      scrambleText: { text: target, chars: "#@%&*+?<>01", speed: 0.6 },
      ease: "none",
      delay: 0.2,
    });
  }

  // Fade up supporting elements
  gsap.set(elements, { opacity: 0, y: 20 });
  gsap.to(elements, {
    opacity: 1, y: 0,
    duration: 0.6,
    stagger: 0.12,
    ease: "power2.out",
    delay: 0.4,
  });
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL REVEALS — individual ScrollTrigger per element (reliable)
   ═══════════════════════════════════════════════════════════════ */
function initScrollReveals() {
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length === 0) return;
  // Channel-flip model — no scroll reveals, force everything visible immediately
  gsap.set(reveals, { opacity: 1, y: 0 });
}

/* ═══════════════════════════════════════════════════════════════
   CURSOR GLOW — quickTo for buttery smooth tracking
   ═══════════════════════════════════════════════════════════════ */
function initCursorGlow() {
  const glow = document.getElementById("cursor-glow");
  if (!glow) return;

  const xTo = gsap.quickTo(glow, "x", { duration: 0.4, ease: "power2.out" });
  const yTo = gsap.quickTo(glow, "y", { duration: 0.4, ease: "power2.out" });
  const opacityTo = gsap.quickTo(glow, "opacity", { duration: 0.3 });

  gsap.set(glow, { opacity: 0, xPercent: -50, yPercent: -50 });

  document.addEventListener("mousemove", (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
    opacityTo(1);
  });

  document.addEventListener("mouseleave", () => opacityTo(0));
}

/* ═══════════════════════════════════════════════════════════════
   MAGNETIC LINKS — links attract toward cursor
   ═══════════════════════════════════════════════════════════════ */
function initMagneticLinks() {
  if (reduceMotion) return;

  const links = document.querySelectorAll<HTMLElement>("[data-magnetic]");
  links.forEach((link) => {
    const xTo = gsap.quickTo(link, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(link, "y", { duration: 0.4, ease: "power3.out" });

    link.addEventListener("mousemove", (e) => {
      const rect = link.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      xTo(x * 0.4);
      yTo(y * 0.4);
    });

    link.addEventListener("mouseleave", () => {
      xTo(0);
      yTo(0);
    });
  });
}

/* ═══════════════════════════════════════════════════════════════
   ENTRY HOVER — smooth slide right with quickTo
   ═══════════════════════════════════════════════════════════════ */
function initEntryAnimations() {
  const entries = document.querySelectorAll<HTMLElement>(".entry");
  if (entries.length === 0 || reduceMotion) return;

  entries.forEach((entry) => {
    const xTo = gsap.quickTo(entry, "x", {
      duration: 0.3,
      ease: "power2.out",
    });

    entry.addEventListener("mouseenter", () => xTo(10));
    entry.addEventListener("mouseleave", () => xTo(0));
  });
}

/* ═══════════════════════════════════════════════════════════════
   TIMELINE — force visible (channel-flip model, no scroll reveals)
   ═══════════════════════════════════════════════════════════════ */
function initTimeline() {
  const timeline = document.getElementById("timeline");
  if (!timeline) return;
  timeline.querySelectorAll("[data-timeline-item]").forEach((item) => {
    item.classList.add("visible");
    gsap.set(item.querySelectorAll(".timeline-content"), { opacity: 1, x: 0 });
  });
}
