export const CONNECTIONS_URL = "https://api.finon.app/connect/list";

export interface LiveConnection {
  id: string;
  name: string;
  assets: string;
  available: boolean;
  icon: string | null;
}

const assetNames: Record<string, string> = {
  cryptos: "Crypto", stocks: "Stocks", cash: "Cash", savings: "Savings", commodities: "Commodities",
};

/** Reject incomplete responses so a failed refresh cannot replace a usable list. */
export function parseConnections(data: unknown): LiveConnection[] {
  if (!Array.isArray(data)) throw new Error("Expected a connections list");
  const ids = new Set<string>();
  return data.map((item: unknown) => {
    if (typeof item !== "object" || item === null) throw new Error("Invalid connection");
    const { institution_id: id, name, available, target, icon } = item as Record<string, unknown>;
    if (
      typeof id !== "string" || !id.trim() || ids.has(id) ||
      typeof name !== "string" || !name.trim() ||
      ![0, 1, false, true].includes(available as number | boolean)
    ) throw new Error("Invalid connection details");
    ids.add(id);

    let imageURL: string | null = null;
    if (typeof icon === "string") {
      try {
        const url = new URL(icon);
        if (url.protocol === "https:") imageURL = url.href;
      } catch { /* A missing logo should not hide a connection. */ }
    }
    return {
      id,
      name: name.trim(),
      available: available === 1 || available === true,
      assets: typeof target === "string"
        ? target.split(",").map((asset) => asset.trim()).filter(Boolean)
          .map((asset) => assetNames[asset] ?? asset.charAt(0).toUpperCase() + asset.slice(1)).join(" · ")
        : "",
      icon: imageURL,
    };
  }).sort((a, b) => Number(b.available) - Number(a.available) || a.name.localeCompare(b.name, "en"));
}

export async function fetchConnections(): Promise<LiveConnection[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  try {
    const response = await fetch(CONNECTIONS_URL, {
      signal: controller.signal,
      cache: "no-store",
      credentials: "omit",
    });
    if (!response.ok) throw new Error(`Connections request failed (${response.status})`);
    return parseConnections(await response.json());
  } finally {
    clearTimeout(timeout);
  }
}
