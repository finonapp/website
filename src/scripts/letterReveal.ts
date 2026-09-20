/**
 * Letter reveal for RevealHeading. Writes `--reveal` (0 to 1) on every
 * `[data-reveal-heading]` from where it sits in the viewport: 0 with the
 * heading's top at the bottom edge, 1 once it has risen to DONE_AT. Runs on
 * scroll, so it scrubs both ways; under reduced motion --reveal is left unset
 * and the CSS default (1) applies.
 */
const DONE_AT = 0.45; // fully revealed once the heading top reaches 45% of the viewport height; lower = slower

export function initLetterReveal(): void {
  const headings = document.querySelectorAll<HTMLElement>("[data-reveal-heading]");
  if (headings.length === 0) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const update = () => {
    if (reduceMotion.matches) {
      for (const heading of headings) heading.style.removeProperty("--reveal");
      return;
    }
    // Read every position first, then write: a read after a write forces the browser to lay out again.
    const travel = window.innerHeight * (1 - DONE_AT); // bottom edge to the DONE_AT line
    const tops = Array.from(headings, (heading) => heading.getBoundingClientRect().top);
    headings.forEach((heading, i) => {
      const progress = (window.innerHeight - tops[i]) / travel;
      heading.style.setProperty("--reveal", clamp01(progress).toFixed(3));
    });
  };

  // Scroll and resize fire many times a frame; run update once per frame.
  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(() => {
      queued = false;
      update();
    });
  };

  update();
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  window.addEventListener("pageshow", schedule);
  document.fonts.ready.then(schedule);
  reduceMotion.addEventListener("change", schedule);
}

function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n));
}
