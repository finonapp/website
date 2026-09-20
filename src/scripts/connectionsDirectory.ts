import { fetchConnections, type LiveConnection } from "../lib/connections";

/** Refresh only while visible, preserving the last successful list on network errors. */
export function initConnectionsDirectory(): void {
  const directory = document.querySelector<HTMLElement>("[data-connections-directory]");
  if (!directory) return;
  const list = directory.querySelector<HTMLUListElement>("[data-connections-list]")!;
  const lastChecked = directory.querySelector<HTMLTimeElement>("[data-connections-checked]")!;
  const empty = directory.querySelector<HTMLElement>("[data-connections-empty]")!;
  const template = directory.querySelector<HTMLTemplateElement>("[data-connection-template]")!;
  let checkedAt = directory.dataset.checkedAt || "";
  let pending = false;

  // Use textContent and validated image URLs, never API data as HTML.
  function render(connections: LiveConnection[]) {
    const cards = connections.map((connection) => {
      const card = template.content.firstElementChild!.cloneNode(true) as HTMLElement;
      card.querySelector<HTMLElement>("[data-connection-name]")!.textContent = connection.name;
      card.querySelector<HTMLElement>("[data-connection-initial]")!.textContent = connection.name.charAt(0);
      card.querySelector<HTMLElement>("[data-connection-assets]")!.textContent = connection.assets;
      const status = card.querySelector<HTMLElement>("[data-connection-status]")!;
      status.textContent = connection.available ? "Available" : "Unavailable";
      status.dataset.available = String(connection.available);
      const icon = card.querySelector<HTMLImageElement>("[data-connection-icon]")!;
      if (connection.icon) {
        icon.src = connection.icon;
        icon.hidden = false;
      }
      return card;
    });
    list.replaceChildren(...cards);
    empty.hidden = connections.length > 0;
    empty.textContent = "No connections are listed right now. Please check again later.";
  }

  // Broken or absent provider logos fall back to the provider's initial.
  list.addEventListener("error", (event) => {
    if (event.target instanceof HTMLImageElement) event.target.hidden = true;
  }, true);

  async function refresh() {
    if (pending || document.visibilityState === "hidden") return;
    pending = true;
    list.setAttribute("aria-busy", "true");
    try {
      const connections = await fetchConnections();
      render(connections);
      checkedAt = new Date().toISOString();
      lastChecked.dateTime = checkedAt;
      lastChecked.textContent = `Last checked ${new Date(checkedAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}`;
      lastChecked.hidden = false;
    } catch {
      // Keep the previous list and its successful check time when a refresh fails.
      if (!checkedAt) {
        empty.textContent = "Connections are temporarily unavailable. Check availability in the Finon app.";
        empty.hidden = false;
      }
    } finally {
      pending = false;
      list.setAttribute("aria-busy", "false");
    }
  }

  document.addEventListener("visibilitychange", () => { if (!document.hidden) void refresh(); });
  window.setInterval(refresh, 60_000);
  void refresh();
}
