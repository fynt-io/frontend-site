import request from "../apiRequester";

export interface SaleStage {
  title: string;
  description: string;
  color: string;
  type: string;
  id: string;
  order: number;
  created_at: string;
  updated_at: string;
  buyers: any[];
  total_buyer: number;
}
  
//GET ALL SALE STAGE
export const getSaleStages = async () => {
  return request<SaleStage[]>('/sales-stage/', 'GET');
}

//RELATED OR ADD BUYER TO SALES STAGE
export const addBuyerToSalesStage = async (buyer_id_list:string[],sales_stage_id:string[]) => {
  return request<SaleStage>('/sales-stage/', 'POST', {buyer_id_list, sales_stage_id});
}

//GET SALE STAGE BY ID
export const getSaleStage = async (id: string) => {
  return request<SaleStage>(`/sales-stage/${id}/`, 'GET');
}