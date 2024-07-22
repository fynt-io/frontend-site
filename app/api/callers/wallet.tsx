import request from "../apiRequester";

export interface WalletExtract {
  items: [WalletExtractItem]
}

export interface WalletExtractItem {
  cost: number,
  cost_bonus: number,
  quantity: number,
  category: string,
  reference_id: string,
  created_at: string,
}

export interface WalletAnalytics {
  year: number,
  month: number,
  total_services_used: number,
  maximum_service_limit: number,
  items: [
    {
      label: string,
      service: number,
      marketing: number,
      paid_traffic: number,
    }
  ]
}

export interface WalletSummary {
  simulations: {
    marketing_bonus: number,
    marketing_cost: number,
    marketing_credit: number,
    marketing_simulation: number,
    paid_traffic_simulation: number,
    service_bonus: number,
    service_cost: number,
    service_credit: number,
    service_simulation: number,
  },
  total_balance: number,
  total_bonus_balance: number,
  total_effective_balance: number,
}

export const getWalletExtract = async () => {
  return request<WalletExtract>('/finance/wallet/extract/', 'GET');
}

export const getWalletAnalytics = async (year?:any, month?:any) => {
  const yearNumber = year ? Number(year) : null;
  const monthNumber = month ? Number(month) : null;
  return request<WalletAnalytics>(`/finance/wallet/analytics/${year && month?`?month=${monthNumber}&year=${yearNumber}`:""}`, 'GET');
}

export const getWalletSummary = async () => {
  return request<WalletSummary>('/finance/wallet/summary/', 'GET');
}