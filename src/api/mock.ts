import { Balances, Opportunity, Transaction } from "../types";

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export async function fetchBalances(): Promise<Balances> {
  await delay(400);
  return { available: 8500, invested: 1500 };
}

export async function fetchTransactions(): Promise<Transaction[]> {
  await delay(500);
  return [
    {
      id: "t3",
      type: "DEPOSIT",
      amount: 5000,
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    },
    {
      id: "t2",
      type: "INVEST",
      amount: 1500,
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    },
    {
      id: "t1",
      type: "DEPOSIT",
      amount: 5000,
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    },
  ];
}

export async function fetchOpportunities(): Promise<Opportunity[]> {
  await delay(450);
  return [
    {
      id: "o1",
      name: "Real Estate Fund A",
      expectedReturn: 12,
      durationMonths: 24,
      minInvestment: 1000,
      description:
        "Diversified real estate assets with quarterly distributions.",
    },
    {
      id: "o2",
      name: "SME Growth Fund B",
      expectedReturn: 10,
      durationMonths: 18,
      minInvestment: 1000,
      description: "Growth capital for SMEs across multiple sectors.",
    },
    {
      id: "o3",
      name: "Green Energy Notes",
      expectedReturn: 9,
      durationMonths: 12,
      minInvestment: 1000,
      description: "Structured notes supporting renewable energy projects.",
    },
  ];
}
