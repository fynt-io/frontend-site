import request from "../apiRequester";

export interface FAQ {
  question: string;
  answer: string;
  id: string;
  seller_id: string;
  created_at: string;
  updated_at: string;
}

//GET ALL FAQs
export const getFAQs = async () => {
  return request<FAQ[]>('/faq/', 'GET');
}

//GET FAQ BY ID
export const getFAQ = async (id: string) => {
  return request<FAQ>(`/faq/${id}/`, 'GET');
}

//CREATE FAQ
export const createFAQ = async (faq: {question: string,  answer: string}) => {
  return request<FAQ>('/faq/', 'POST', faq);
}

//PATCH FAQ
export const updateFAQ = async (faq: {question: string,  answer: string, id:string}) => {
  return request<FAQ>(`/faq/${faq.id}/`, 'PATCH', faq);
}

//DELETE FAQ
export const deleteFAQ = async (id: string[]) => {
  return request<FAQ>(`/faq/`, 'DELETE', id);
}