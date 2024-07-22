import request from "../apiRequester";
import { Tag } from "./tag";

export interface Buyer {
    id?: string;
    filed?: boolean;
    name: string;
    cnpj?: string;
    cpf?: string;
    phone: string;
    free_talk?: any;
    tags?: Tag[];
    billing_window?: any;
    sales_stage?: string;
    conversation_id?: string;
    is_active?: boolean;
    collaborator_id?: string;
    basic_information?: {
        company_name?: string;
        trading_name?: string;
        cnpj?: string;
        cpf?: string;
        company_size?: string;
        industry_sector?: string;
        business_type?: string;
        contact_reference?: string;
        website?: string;
        founding_date?: string;
        state_registration?: string;
    };
    contact?: {
        contact_name?: string;
        position?: string;
        department?: string;
        commercial_phone?: string;
        cellphone?: string;
        email?: string;
        linkedin?: string;
    };
    address?: {
        commercial_address?: string;
        neighborhood?: string;
        city?: string;
        state?: string;
        zip_code?: string;
        country?: string;
    };

    
}

export interface Buyers {
    buyers: Buyer[];
    total: number;
    total_filtered: number;
}
export interface BuyersFilters {
    search: string;
    tag_id: string;
    active?: boolean;
    start_date: string;
    end_date: string;
    filed: boolean;
    offset_min: number;
    offset_max: number;
    orderby: string;
    smart_registration?: boolean;
}

export interface PriorityBuyers {
  priorities: Priority[];
  total: number;
  total_filtered: number;
}

export interface Priority {
  id: string;
  name: string;
  conversation_id: string;
  tags: string[];
  motive: string;
  trading_name?: string;
}

export interface PriorityBuyersFilters {
  search: string;
  motive: string;
  tag_id: string;
  offset_min: number;
  offset_max: number;
  orderby: string;
}
  
//GET ALL BUYERS
export const getBuyers = async (filters?:BuyersFilters) => {
  return request<Buyers>(`/buyer/?search=${filters?.search ? filters?.search : ""}&tag_id=${filters?.tag_id ? filters?.tag_id : ""}&orderby=${filters?.orderby ? filters?.orderby : "-created_at"}&filed=${filters?.filed ? filters?.filed : "false"}&start_date=${filters?.start_date ? filters?.start_date : ""}&end_date=${filters?.end_date ? filters?.end_date : ""}&offset_min=${filters?.offset_min ? filters?.offset_min : "0"}&offset_max=${filters?.offset_max ? filters?.offset_max : "10"}`, 'GET');
}

//GET BUYER BY ID
export const getBuyer = async (id: string) => {
  return request<Buyer>(`/buyer/${id}/`, 'GET');
}

//GET PRIORITY BUYERS
export const getPriorityBuyers = async (filters?:PriorityBuyersFilters) => {
  return request<PriorityBuyers>(`/buyer/priority/`, 'GET');
}

//CREATE BUYER
export const createBuyer = async (buyer: Buyer) => {
  return request<Buyer>('/buyer/', 'POST', buyer);
}

//PATCH BUYER
export const updateBuyer = async (buyer: Buyer) => {
  return request<Buyer>(`/buyer/${buyer.id}/`, 'PATCH', buyer);
}

//DELETE BUYER
export const deleteBuyer = async (id: string) => {
  return request<Buyer>(`/buyer/${id}/`, 'DELETE');
}

//DEACTIVATE BUYER
export const deactivateBuyer = async (id: string) => {
  return request<Buyer>(`/buyer/${id}/deactivate/`, 'PATCH');
}

//IMPORT BUYERS
export const importBuyers = async (formData: FormData) => {
  return request<Buyer>('/buyer/file-manager/import/', 'POST', formData, null, "multipart/form-data");
}

//EXPORT FILE MODEL
export const exportBuyersFileModel = async () => {
  return request<string>('/buyer/file-manager/export/model/', 'GET');
}