/**
 * Coin ping: about every 2.8 s one random coin in a group pops and sends out
 * a brand ring (the CSS in ConnectionIcon.astro plays while `.is-pinging` is
 * on), never the same coin twice in a row. Skips groups that are display:none,
 * pauses while the tab is hidden, and is off under reduced motion.
 */
const EVERY_MS = 2800; // average gap between pings
const JITTER_MS = 900; // each gap is EVERY_MS plus or minus up to this
const FIRST_PING_MS = 1200;
const PING_LENGTH_MS = 1000; // longer than the CSS animations and shorter than the smallest gap, so the class is off again before the next ping

function startGroup(group: HTMLElement): void {
  const coins = Array.from(group.querySelectorAll<HTMLElement>(".connection-icon"));
  if (coins.length === 0) return;

  let last = -1;
  let removePingTimer = 0;

  const ping = () => {
    // Pick a coin, never the same one twice in a row.
    let next = Math.floor(Math.random() * coins.length);
    while (coins.length > 1 && next === last) next = Math.floor(Math.random() * coins.length);
    last = next;

    const coin = coins[next];
    coin.classList.add("is-pinging");
    window.clearTimeout(removePingTimer);
    removePingTimer = window.setTimeout(() => coin.classList.remove("is-pinging"), PING_LENGTH_MS);
  };

  const tick = () => {
    // offsetParent is null while the group is display:none (the hero shows one coin group per breakpoint).
    const visible = !document.hidden && group.offsetParent !== null;
    if (visible) ping();
    const jitter = (Math.random() * 2 - 1) * JITTER_MS;
    window.setTimeout(tick, EVERY_MS + jitter);
  };

  window.setTimeout(tick, FIRST_PING_MS);
}

/** Starts pinging in every `[data-ping-group]` on the page. Safe to call more than once. */
export function initCoinPing(): void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  for (const group of document.querySelectorAll<HTMLElement>("[data-ping-group]")) {
    if (group.dataset.pingStarted) continue; // both coin components include this script
    group.dataset.pingStarted = "1";
    startGroup(group);
  }
}
