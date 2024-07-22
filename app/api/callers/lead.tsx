import request from "../apiRequester";

export interface Lead {
  id?: string;
  cnpj: string;
  company_name: string;
  email: string;
  phone: string;
  trading_name: string;
  business_type: string;
  cpf: string;
  created_at?: string;
  updated_at?: string;
}

//GET LEAD
export const getLead = async (params: { cnpj?: string, cpf?: string, phone?: string }) => {
  return request<Lead>('/lead/', 'GET', params);
} 

//CREATE LEAD
export const createLead = async (lead: Lead) => {
  return request<Lead>('/lead/', 'POST', lead);
}

//UPDATE LEAD
export const updateLead = async (lead: Lead) => {
  return request<Lead>(`/lead/${lead.id}/`, 'PATCH', lead);
}