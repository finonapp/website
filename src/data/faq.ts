/** FAQ entries shared by the FAQ section and the FAQPage JSON-LD, so they cannot drift apart. */
export interface FaqItem {
  question: string;
  answer: string;
  link?: { href: string; text: string };
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What can I track with Finon?",
    answer: "Finon brings your bank balances, stocks and crypto into one dashboard. Follow the value of your tracked holdings over time, see your asset allocation and add commodities such as gold manually.",
  },
  {
    question: "Which accounts can I connect?",
    answer: "You can track accounts from supported banks, investment platforms and crypto exchanges. Check the connections page for the current list and availability. The connection method and account coverage depend on the provider.",
    link: { href: "/connections", text: "Check available connections" },
  },
  {
    question: "Can I track investments without an automatic connection?",
    answer: "You can import statements from Freetrade and Moneybox to bring those holdings into your portfolio. Follow the import instructions in the app and upload new statements to update them. Manual entry is also available for commodities such as gold and silver.",
    link: { href: "/connections", text: "Check connection availability" },
  },
  {
    question: "Can Finon move my money or make trades?",
    answer: "No. Finon is a read-only financial app: it displays account information and cannot transfer funds or place trades. Bank connections use Open Banking authorisation, while some investment and crypto connections use API keys with read-only permissions.",
  },
  {
    question: "Is Finon free?",
    answer: "Yes. Finon’s free plan includes up to 2 connections. To add more than 2, upgrade to Finon Pro. You can see the current pricing and plan details in the app before upgrading.",
  },
  {
    question: "How does Finon compare with other personal financial apps?",
    answer: "Personal financial apps cover different needs, from budgeting to investment tracking. Finon focuses on bringing your balances and investments into one view, with portfolio history and an asset breakdown. When choosing an app, check its supported accounts, connection methods, pricing and the features you need.",
  },
  {
    question: "Is Finon safe?",
    answer: "Finon is read-only: it cannot move money or place trades, and your funds stay with your bank, broker or exchange. Bank connections use Open Banking authorisation, and some investment and crypto connections use API keys with read-only permissions. Your connection credentials and other sensitive data are encrypted. No online service can guarantee absolute security, and you can read how we handle your data in our privacy policy.",
    link: { href: "/privacy", text: "Read the privacy policy" },
  },
  {
    question: "Where is Finon available?",
    answer: "Finon is available on iPhone and Android for users in the UK. You can download it from the UK App Store or Google Play and follow the in-app steps to add your first account.",
  },
];
