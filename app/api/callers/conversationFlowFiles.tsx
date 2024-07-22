import { FLOW_CONVERSATION_STAGES } from "@/app/constants/FlowConversationStages";
import request, { ApiResponse } from "../apiRequester";

export interface ConversationFlowFile {
  category: string;
  file_name: string;
  id?: string;
  public_url?: string;
  blob_name?: string;
  created_at?: string;
  updated_at?: string;
  content_type?: string;
  seller_id?: string;
}

export interface ConversationFlowFiles {
  conversation_file: {
    conversation_flow_id: string;
    type: string;
    is_active: boolean;
  };
  file: ConversationFlowFile;
}



//GET ALL CONVERSATION FLOWS FILES
export const getConversationFlowFiles = async (conversation_flow_id:string, type:string) => {
  return request<ConversationFlowFiles[]>(`/conversation-flow/files/list/?conversation_flow_id=${conversation_flow_id}&type=${type}`, 'GET');
}

//GET ALL CONVERSATION FLOWS FILES BY ID
export const getConversationFlow = async (conversation_flow_files_id:string) => {
  return request<ConversationFlowFiles[]>(`/conversation-flow/files/${conversation_flow_files_id}/`, 'GET');
}

//CREATE CONVERSATION FLOW FILE
export const createConversationFlowFile = async (conversation_flow_id: string, input_file: File) => {
  const formData = new FormData();
  formData.append('conversation_flow_id', conversation_flow_id);
  formData.append('input_file', input_file);
  formData.append('type', 'type');
  return request<ConversationFlowFiles>(`/conversation-flow/files/`, 'POST', formData);
}

//RELATE CONVERSATION FLOW FILES
export const relateConversationFlowFiles = async (data:{
  conversation_flow_id: string;
  type: string;
  is_active: boolean;
  file_id: string[];
}) => {
  return request<ConversationFlowFiles[]>(`/conversation-flow/files/relate/`, 'POST',data);
}
