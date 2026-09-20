/**
 * Fade-in on entry. Content stays visible unless an observer is ready to
 * reveal it. Each element is released after it shows, so it never fades out again.
 */
export function initFadeIn(): void {
  const elements = document.querySelectorAll<HTMLElement>(".fade-in");
  if (
    elements.length === 0 ||
    !("IntersectionObserver" in window) ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) return;

  // Fires once 15% of the element is inside the viewport, ignoring a 12% band at the bottom.
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.remove("is-pending");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
  );
  for (const element of elements) {
    observer.observe(element);
    element.classList.add("is-pending");
  }
}
