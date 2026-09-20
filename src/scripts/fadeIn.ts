/**
 * Fade-in on entry. Adds `.is-visible` to every `.fade-in` element the first
 * time it scrolls into view; the CSS in global.css fades, lifts and sharpens
 * it. Each element is released after it shows, so it never fades out again.
 */
export function initFadeIn(): void {
  const elements = document.querySelectorAll<HTMLElement>(".fade-in");
  if (elements.length === 0) return;

  // Fires once 15% of the element is inside the viewport, ignoring a 12% band at the bottom.
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
  );
  for (const element of elements) observer.observe(element);
}
