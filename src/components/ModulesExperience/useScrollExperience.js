import { useEffect } from 'react';

export function useScrollExperience() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const stage = document.querySelector('[data-stage]');
    if (!stage) return;

    const pleexPanel = stage.querySelector('[data-panel="pleex"]');
    const btsPanel = stage.querySelector('[data-panel="bts"]');
    const pleexBg = stage.querySelector('[data-bg="pleex"]');
    const btsBg = stage.querySelector('[data-bg="bts"]');


    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const triggerStagger = (panel, className) => {
      const els = panel.querySelectorAll('.' + className);
      els.forEach((el, i) =>
        setTimeout(() => el.classList.add('is-visible'), i * 120)
      );
    };

    let pleexRevealed = false;
    let btsRevealed = false;
    let rafId = null;

    const update = () => {
      rafId = null;
      const vh = window.innerHeight;
      const rect = stage.getBoundingClientRect();
      const scrollable = rect.height - vh;
      const p = Math.min(Math.max(-rect.top / scrollable, 0), 1);

      // Timeline:
      // 0.00 → 0.25 : PLEEX centrado (lectura)
      // 0.25 → 0.60 : relevo horizontal (PLEEX sale der., BTS entra izq.)
      // 0.60 → 1.00 : BTS centrado (lectura) → libera scroll
      const transitionStart = 0.25;
      const transitionEnd = 0.60;
      let t = (p - transitionStart) / (transitionEnd - transitionStart);
      t = Math.min(Math.max(t, 0), 1);
      const eased = easeInOutCubic(t);

      if (reduceMotion) {
        pleexPanel.style.transform = '';
        btsPanel.style.transform = '';
        pleexBg.style.opacity = p < 0.5 ? 1 : 0;
        btsBg.style.opacity = p < 0.5 ? 0 : 1;
      } else {
        pleexPanel.style.transform = `translate3d(${eased * 115}%, 0, 0)`;
        pleexPanel.style.opacity = 1 - eased * 0.3;

        btsPanel.style.transform = `translate3d(${-115 + eased * 115}%, 0, 0)`;
        btsPanel.style.opacity = 0.3 + eased * 0.7;

        pleexBg.style.opacity = 1 - eased;
        btsBg.style.opacity = eased;
      }

      if (!pleexRevealed && p > 0.02) {
        pleexRevealed = true;
        triggerStagger(pleexPanel, 'stagger');
      }
      if (!btsRevealed && t > 0.4) {
        btsRevealed = true;
        triggerStagger(btsPanel, 'stagger-bts');
      }

    };

    const onScroll = () => {
      if (rafId == null) rafId = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);
}
