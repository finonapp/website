/** The providers Finon can connect to, with their coin logos. The coin components pick from these by id. */
import type { ImageMetadata } from "astro";
import bitget from "../assets/images/connect/bitget.png";
import chase from "../assets/images/connect/chase-bank.png";
import coinbase from "../assets/images/connect/coinbase.png";
import lloyds from "../assets/images/connect/lloyds-personal.png";
import monzo from "../assets/images/connect/monzo.png";
import revolut from "../assets/images/connect/revolut.png";
import santander from "../assets/images/connect/santander-personal.png";
import trading212 from "../assets/images/connect/trading-212.png";
import wise from "../assets/images/connect/wise.png";

export type Connection = {
  id: string;
  name: string;
  image: ImageMetadata;
};

const connections: Connection[] = [
  { id: "trading-212", name: "Trading 212", image: trading212 },
  { id: "coinbase", name: "Coinbase", image: coinbase },
  { id: "lloyds", name: "Lloyds Bank", image: lloyds },
  { id: "monzo", name: "Monzo", image: monzo },
  { id: "revolut", name: "Revolut", image: revolut },
  { id: "santander", name: "Santander", image: santander },
  { id: "chase", name: "Chase", image: chase },
  { id: "wise", name: "Wise", image: wise },
  { id: "bitget", name: "Bitget", image: bitget },
];

/** Lookup by id for the coin components. */
export const connectionById = Object.fromEntries(connections.map((c) => [c.id, c])) as Record<string, Connection>;
