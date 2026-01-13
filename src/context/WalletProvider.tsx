import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Alert } from "react-native";
import { Balances, Opportunity, Transaction } from "../types";
import {
  fetchBalances,
  fetchOpportunities,
  fetchTransactions,
} from "../api/mock";

export type WalletContextValue = {
  balances: Balances | null;
  transactions: Transaction[];
  opportunities: Opportunity[];
  loadingBalances: boolean;
  loadingTransactions: boolean;
  loadingOpportunities: boolean;
  refreshAll: () => Promise<void>;
  investInOpportunity: (
    opportunityId: string,
    amount: number
  ) => Promise<{ ok: boolean; error?: string }>;
};

const WalletContext = createContext<WalletContextValue | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [balances, setBalances] = useState<Balances | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loadingBalances, setLoadingBalances] = useState(false);
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  const [loadingOpportunities, setLoadingOpportunities] = useState(false);

  const loadBalances = useCallback(async () => {
    setLoadingBalances(true);
    try {
      const data = await fetchBalances();
      setBalances(data);
    } finally {
      setLoadingBalances(false);
    }
  }, []);

  const loadTransactions = useCallback(async () => {
    setLoadingTransactions(true);
    try {
      const data = await fetchTransactions();
      const sorted = data
        .slice()
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      setTransactions(sorted);
    } finally {
      setLoadingTransactions(false);
    }
  }, []);

  const loadOpportunities = useCallback(async () => {
    setLoadingOpportunities(true);
    try {
      const data = await fetchOpportunities();
      setOpportunities(data);
    } finally {
      setLoadingOpportunities(false);
    }
  }, []);

  const refreshAll = useCallback(async () => {
    await Promise.all([
      loadBalances(),
      loadTransactions(),
      loadOpportunities(),
    ]);
  }, [loadBalances, loadTransactions, loadOpportunities]);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  const investInOpportunity = useCallback(
    async (opportunityId: string, amount: number) => {
      if (!balances) return { ok: false, error: "Wallet not loaded" };
      if (balances.available < amount)
        return { ok: false, error: "Insufficient available balance" };
      const opportunity = opportunities.find((o) => o.id === opportunityId);
      if (!opportunity) return { ok: false, error: "Opportunity not found" };
      if (amount < opportunity.minInvestment)
        return { ok: false, error: "Below minimum investment amount" };
      const newBalances: Balances = {
        available: balances.available - amount,
        invested: balances.invested + amount,
      };
      const newTx: Transaction = {
        id: `tx_${Date.now()}`,
        type: "INVEST",
        amount,
        date: new Date().toISOString(),
      };
      setBalances(newBalances);
      setTransactions((prev) => [newTx, ...prev]);
      return { ok: true };
    },
    [balances, opportunities]
  );

  const value = useMemo(
    () => ({
      balances,
      transactions,
      opportunities,
      loadingBalances,
      loadingTransactions,
      loadingOpportunities,
      refreshAll,
      investInOpportunity,
    }),
    [
      balances,
      transactions,
      opportunities,
      loadingBalances,
      loadingTransactions,
      loadingOpportunities,
      refreshAll,
      investInOpportunity,
    ]
  );

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
}
