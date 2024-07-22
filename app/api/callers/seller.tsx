import request from "../apiRequester";
import { Collaborator } from "./collaborator";

export interface Seller {
  cnpj: "string",
  meta_id: "string",
  trading_name: "string",
  company_name: "string",
  display_name: "string",
  whatsapp_about: "string",
  whatsapp_number: "string",
  representant_name: "string",
  representant_image: "string",
  is_onboarding_completed: boolean,
  id: "string",
  collaborator: Collaborator,
  created_at: "string",
  updated_at: "string"
  allowed_new_conversation?: boolean
}

//GET CURRENT SELLER
export const getSeller = async ()  => {
  return request<Seller>('/seller/', 'GET');
}

//CREATE SELLER
export const createSeller = async (seller: Seller) => {
  return request<Seller>('/seller/', 'POST', seller);
}