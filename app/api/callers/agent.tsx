import request, { ApiResponse } from "../apiRequester";

export interface AgentSchedule {
  friday: {
    active: boolean;
    from_hour: string;
    to_hour: string;
  },
  monday: {
    active: boolean;
    from_hour: string;
    to_hour: string;
  },
  saturday: {
    active: boolean;
    from_hour: string;
    to_hour: string;
  },
  sunday: {
    active: boolean;
    from_hour: string;
    to_hour: string;
  },
  thursday: {
    active: boolean;
    from_hour: string;
    to_hour: string;
  },
  tuesday: {
    active: boolean;
    from_hour: string;
    to_hour: string;
  },
  wednesday: {
    active: boolean;
    from_hour: string;
    to_hour: string;
  }
}
export interface AgentAttribute {
  id?: string;
  updated_at?: string;
  type: "role" | "company_business" | "company_values" | "conversation_purpose" | "conversation_type" | "personality" | "writing_style" | "answer_type" | "language" | "follow_up" | "website" | "human_service" | "context_constraint" | "rephrasing_answer";
  meta_data: any;
}

export interface Agent {
  agent?: {
    name: string;
    template_name: string;
  }
  seller_id?: string;
  agent_id?: string;
  agent_attributes?: AgentAttribute[],
  agent_faq?: any[];
}
  
//GET ALL AGENTS
export const getAgents = async () => {
  return request<Agent[]>('/agent/', 'GET');
}

//GET AGENT BY ID
export const getAgent = async (id: string) => {
  return request<Agent>(`/agent/${id}/`, 'GET');
}

//CREATE AGENT
export const createAgent = async (agent: Agent) => {
  return request<Agent>('/agent/', 'POST', agent);
}

//PATCH AGENT
export const updateAgent = async (agent: Agent) => {
  const payload = {
    agent: {
      name: agent.agent?.name,
      template_name: agent.agent?.template_name
    },
    agent_attributes:{
      role: agent.agent_attributes?.find(a => a.type === "role")?.meta_data,
      company_business: agent.agent_attributes?.find(a => a.type === "company_business")?.meta_data,
      company_values: agent.agent_attributes?.find(a => a.type === "company_values")?.meta_data,
      conversation_purpose: agent.agent_attributes?.find(a => a.type === "conversation_purpose")?.meta_data,
      conversation_type: agent.agent_attributes?.find(a => a.type === "conversation_type")?.meta_data,
      personality: agent.agent_attributes?.find(a => a.type === "personality")?.meta_data,
      writing_style: agent.agent_attributes?.find(a => a.type === "writing_style")?.meta_data,
      answer_type: agent.agent_attributes?.find(a => a.type === "answer_type")?.meta_data,
      language: agent.agent_attributes?.find(a => a.type === "language")?.meta_data,
      follow_up: agent.agent_attributes?.find(a => a.type === "follow_up")?.meta_data,
      website: agent.agent_attributes?.find(a => a.type === "website")?.meta_data,
      human_service: agent.agent_attributes?.find(a => a.type === "human_service")?.meta_data,
      context_constraint: agent.agent_attributes?.find(a => a.type === "context_constraint")?.meta_data,
      rephrasing_answer: agent.agent_attributes?.find(a => a.type === "rephrasing_answer")?.meta_data
    },
    agent_faq: agent.agent_faq
    }
  
  return request<Agent>(`/agent/`, 'PATCH', payload);
}

//DELETE AGENT
export const deleteAgent = async (id: string) => {
  return request<Agent>(`/agent/`, 'DELETE');
}