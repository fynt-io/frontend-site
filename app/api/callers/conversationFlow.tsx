import { FLOW_CONVERSATION_STAGES } from "@/app/constants/FlowConversationStages";
import request, { ApiResponse } from "../apiRequester";

export interface ConversationFlow {
  agent_id?: string;
  title: string;
  type: "sales_stage" | "action";
  value: string;
  configuration: any | ConversationFlowConfigurationInterface[];
  position_x?: number;
  x: number;
  position_y?: number;
  y: number;
  order: number;
  mandatory: boolean;
  id?: any;
  created_at?: string;
  updated_at?: string;
  sales_stage_id?: string;
  context?: any;
  sections?: string[];
  content_preview?: string;
  content?: string;
  tools?: any;
  icon?: string;
  realId?: string;
}


export interface ConversationFlowConfigurationInterface {
  title: string;
  info?: string;
  type: "text" | "text-area" | "toggle-switch" | "multi-toggle-options" | "html_content" | "html";
  max_characters?: number;
  back_end_key_field: string;
  back_end_value_field: string | boolean | number | string[] | any[] | object | null | undefined;
  toggle_switch_parent_back_end_key?: string;
  placeholder?:string;
  content?:any;
}



//GET ALL CONVERSATION FLOWS
export const getConversationFlows = async (agent_id: string) => {
  const returnCorrectFlow = (flow: ConversationFlow) => FLOW_CONVERSATION_STAGES.find((stage) => stage.value === flow.value);

  const res : ApiResponse<ConversationFlow[]> | undefined = await request<ConversationFlow[]>(`/conversation-flow/agent/${agent_id}/`, 'GET');
  //mount the conversation flow using ConversatonFlowInterface
  if(!res) return;
  res.data.forEach((flow:ConversationFlow, i:number) => {

    //fix configuration
    let oldConfig : ConversationFlowConfigurationInterface[] = []
    returnCorrectFlow(flow)?.configuration.forEach((c:ConversationFlowConfigurationInterface) => {
      oldConfig.push({
        title: c.title,
        info: c.info,
        type: c.type,
        max_characters: c.max_characters,
        back_end_key_field: c.back_end_key_field,
        back_end_value_field: flow.configuration[c.back_end_key_field],
        toggle_switch_parent_back_end_key: c.toggle_switch_parent_back_end_key,
        placeholder: c.placeholder,
        content: c.content
      });
    });

    flow.configuration = oldConfig ? oldConfig : returnCorrectFlow(flow)?.configuration;
    flow.icon = returnCorrectFlow(flow)?.icon;
    flow.content_preview = returnCorrectFlow(flow)?.content_preview;
    flow.content = returnCorrectFlow(flow)?.content;
    flow.icon = returnCorrectFlow(flow)?.icon;
    flow.realId = flow.id?.toString();
    flow.sections = returnCorrectFlow(flow)?.sections;
    flow.id = flow.order;
    flow.x = flow.position_x || 0;
    flow.y = flow.position_y || 0;
  } );

  //sort based on order
  res.data.sort((a:ConversationFlow, b:ConversationFlow) => a.order - b.order);

  return res;
}

//GET CONVERSATION FLOW BY ID
export const getConversationFlowById = async (id: string) => {
  return request<ConversationFlow>(`/conversation-flow/${id}/`, 'GET');
}

//CREATE CONVERSATION FLOW
export const createConversationFlow = async (conversationFlow: ConversationFlow, agent_id:string) => {

  //fix configuration
  let configuration : any = {};
  conversationFlow.configuration.forEach((c:ConversationFlowConfigurationInterface) => {
    configuration[c.back_end_key_field] = c.back_end_value_field;
  });

  //fix payload
  conversationFlow.position_x = conversationFlow.x;
  conversationFlow.position_y = conversationFlow.y;
  conversationFlow.order = conversationFlow.id;
  conversationFlow.agent_id = agent_id;
  conversationFlow.configuration = configuration;
  
  return request<ConversationFlow>(`/conversation-flow/`, 'POST', conversationFlow);
}

//PATCH CONVERSATION FLOW
export const updateConversationFlow = async (conversationFlow: ConversationFlow) => {
    //fix configuration
    let configuration : any = {};
    conversationFlow.configuration.forEach((c:ConversationFlowConfigurationInterface) => {
      configuration[c.back_end_key_field] = c.back_end_value_field;
    });
  
    //fix payload
    conversationFlow.position_x = conversationFlow.x;
    conversationFlow.position_y = conversationFlow.y;
    conversationFlow.order = conversationFlow.order || 0;
    conversationFlow.configuration = configuration;
    conversationFlow.id = conversationFlow.realId;

  return request<ConversationFlow>(`/conversation-flow/${conversationFlow.id}/`, 'PATCH', conversationFlow);
}

//DELETE CONVERSATION FLOW
export const deleteConversationFlow = async (ids: string[]) => {
  return request<any>(`/conversation-flow/`, 'DELETE',  ids );
}