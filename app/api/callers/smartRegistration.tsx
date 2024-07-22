import request from "../apiRequester";
import { Buyer } from "./buyer";


export interface SmartRegistrationQuestion {
  question: string;
  value_buyer: string;
  order_question: number;
  id?: string;
  seller_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SmartRegistrationAnswer {
  value: string;
  updated_at: string;
  created_at: string;
  buyer: Buyer;
  smart_registration: SmartRegistrationQuestion;
}
  
//GET ALL SMART REGISTRATION QUESTIONS
export const getSmartRegistration = async () => {
  return request<SmartRegistrationQuestion[]>('/smart-registration/', 'GET');
}

//GET SMART REGISTRATION QUESTION BY ID
export const getSmartRegistrationQuestion = async (id: string) => {
  return request<SmartRegistrationQuestion>(`/smart-registration/${id}/`, 'GET');
}

//CREATE SMART REGISTRATION QUESTION
export const createSmartRegistrationQuestion = async (data: {question:string, value_buyer:string, order_question:number}) => {
  return request<SmartRegistrationQuestion>('/smart-registration/', 'POST', data);
}

//PATCH SMART REGISTRATION QUESTION
export const updateSmartRegistrationQuestion = async (data: {question:string, value_buyer:string, order_question:number, id:string}) => {
  return request<SmartRegistrationQuestion>(`/smart-registration/${data.id}/`, 'PATCH', data);
}

//DELETE SMART REGISTRATION QUESTION
export const deleteSmartRegistrationQuestion = async (id: string) => {
  return request<SmartRegistrationQuestion>(`/smart-registration/${id}/`, 'DELETE');
}

//ORDER SMART REGISTRATION QUESTION
export const updateSmartRegistrationOrder = async (data: SmartRegistrationQuestion[]) => {
  return request<SmartRegistrationQuestion>(`/smart-registration/order/`, 'PATCH', data);
}

//GET ALL ANSWERS BY BUYER ID
export const getAnswerByBuyerId = async (id: string) => {
  return request<SmartRegistrationAnswer>(`/smart-registration/answer/${id}/`, 'GET');
}

//GET ALL ANSWERED BY BUYER ID
export const getAnswered = async (id: string) => {
  return request<SmartRegistrationAnswer[]>(`/smart-registration/answer/${id}/answered/`, 'GET');
}

//GET ALL UNANSWERED BY BUYER ID
export const getUnanswered = async (id: string) => {
  return request<SmartRegistrationAnswer[]>(`/smart-registration/answer/${id}/unanswered/`, 'GET');
}
