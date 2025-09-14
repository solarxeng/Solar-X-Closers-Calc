import type { DealMode } from "@/types/deal";

export type CalcInput = {
  systemKw: number;       // e.g., 7.5
  ppw: number;            // price per watt ($)
  redlinePpw: number;     // baseline/redline ($/W)
  repSplit: number;       // 0.40 = 40%
  selfGenBonus?: number;  // $ amount
  bigSystemBonus?: number;// $ amount
  promoAdj?: number;      // +/- $ adjustment
  mode: DealMode;         // "loan_cash" | "tpo_ppa"
};

export type CalcBreakdown = {
  baseCommission: number;
  bonuses: { selfGen: number; bigSystem: number; promo: number };
  total: number;
};

export function calcCommission(input: CalcInput): CalcBreakdown {
  const watts = Math.max(0, input.systemKw) * 1000;
  const marginPerW = Math.max(0, input.ppw - input.redlinePpw);
  const grossMargin = marginPerW * watts;
  const baseCommission = Math.max(0, grossMargin * input.repSplit);

  const rawBonuses = {
    selfGen: Math.max(0, input.selfGenBonus ?? 0),
    bigSystem: Math.max(0, input.bigSystemBonus ?? 0),
    promo: input.promoAdj ?? 0,
  };

  const bonuses =
    input.mode === "tpo_ppa"
      ? { selfGen: 0, bigSystem: 0, promo: 0 } // Base only in TPO/PPA
      : rawBonuses;

  const total = baseCommission + bonuses.selfGen + bonuses.bigSystem + bonuses.promo;
  return { baseCommission, bonuses, total };
}
