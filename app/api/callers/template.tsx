import request from "../apiRequester";
import { Collaborator } from "./collaborator";

export interface Templates {
  items: Template[];
  total: number;
}

export interface Template {
  collaborator: Collaborator;
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  name: string;
  components: {
    parameters:{
      type: string;
      url: string;
      text: string;
      example: any[];
      phoneNumber: string;
      buttons: any[]
    }[]
  }[];
  language: string;
  provider_id: string;
  category: string;
  status: string;
  rejected_reason: string;
  seller: string;
  file?: {
    category: string;
    file_name: string;
    id: string;
    public_url: string;
    blob_name: string;
    created_at: string;
    updated_at: string;
    content_type: string;
    seller_id: string;
  }
}

interface File {
  category: string;
  file_name: string;
  id: string;
  public_url: string;
  blob_name: string;
  created_at: string;
  updated_at: string;
  content_type: string;
  seller_id: string;
}

export interface TemplateCreate {
  name: string;
  category: string;
  language: string;
  components: 
    [{
      type: string;
      parameters: [
        {
          type: string;
          url: string;
          text: string;
          example?: any[];
          phoneNumber?: string;
          buttons: any[]
        }
      ] | any[]
    }]
}

export interface TemplateFilters {
  status: string;
  search: string;
  orderby: string;
  offset_min: number;
  offset_max: number;

}
  
//GET ALL TEMPLATES
export const getTemplates = async (filters?:TemplateFilters) => {
  return request<Templates>(`/template/?search=${filters?.search ? filters?.search : ''}&status=${filters?.status ? filters?.status : ''}&offset_min=${filters?.offset_min ? filters?.offset_min : 0}&offset_max=${filters?.offset_max ? filters?.offset_max : 20}&order_by=${filters?.orderby ? filters?.orderby : "-created_at"}`, 'GET');
}

//GET TEMPLATE BY ID
export const getTemplate = async (id: string) => {
  return request<Template>(`/template/${id}/`, 'GET');
}

export const createTemplate = async (template: TemplateCreate) => {
  return request<Template>('/template/', 'POST', template);
}

export const deleteTemplate = async (id: string) => {
  return request<Template>(`/template/${id}`, 'DELETE');
}

export const templateUploadMedia = async (id: string, file: File) => {
  return request<Template>(`/template/${id}/media`, 'POST', file);
}