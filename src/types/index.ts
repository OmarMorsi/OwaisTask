export type TransactionType = "DEPOSIT" | "INVEST";

export type Transaction = {
  id: string;
  type: TransactionType;
  amount: number;
  date: string;
};

export type Balances = {
  available: number;
  invested: number;
};

export type Opportunity = {
  id: string;
  name: string;
  expectedReturn: number;
  durationMonths: number;
  minInvestment: number;
  description: string;
};
