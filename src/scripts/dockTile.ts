/**
 * Docks the app icon tile (Features.astro) onto the screenshot on lg screens.
 * Toggles .is-docked on the section and writes --dx / --dy, the slot to
 * screenshot vector; the CSS transition in Features.astro does the gliding.
 * Below lg, under reduced motion or without JS the tile stays in the heading.
 */
export function initDockTile(): void {
  const section = document.querySelector<HTMLElement>("[data-features]");
  const slot = section?.querySelector<HTMLElement>("[data-reveal-slot]");
  const screenshot = section?.querySelector<HTMLElement>("[data-icon-target]");
  if (!section || !slot || !screenshot) return;

  const desktop = window.matchMedia("(min-width: 64rem)"); // Tailwind lg
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let screenshotAboveMiddle = false;

  // From the slot's centre to the middle of the screenshot's top edge.
  const measure = () => {
    const from = slot.getBoundingClientRect();
    const to = screenshot.getBoundingClientRect();
    const dx = to.left + to.width / 2 - (from.left + from.width / 2);
    const dy = to.top - (from.top + from.height / 2);
    section.style.setProperty("--dx", `${dx.toFixed(2)}px`);
    section.style.setProperty("--dy", `${dy.toFixed(2)}px`);
  };

  const update = () => {
    const dock = screenshotAboveMiddle && desktop.matches && !reduceMotion.matches;
    if (dock) measure(); // also re-measures while docked, so a resize keeps the tile on the edge
    section.classList.toggle("is-docked", dock);
  };

  // The observer's root is the top half of the viewport (rootMargin trims the
  // bottom 50%), so the screenshot "intersects" exactly while its top edge is
  // above the middle.
  const observer = new IntersectionObserver(
    (entries) => {
      const latest = entries[entries.length - 1];
      screenshotAboveMiddle = latest.isIntersecting;
      update();
    },
    { rootMargin: "0px 0px -50% 0px" },
  );
  observer.observe(screenshot);

  // Anything that can move the slot or the screenshot: re-measure.
  window.addEventListener("resize", update, { passive: true });
  window.addEventListener("pageshow", update);
  document.fonts.ready.then(update);
  desktop.addEventListener("change", update);
  reduceMotion.addEventListener("change", update);
}
