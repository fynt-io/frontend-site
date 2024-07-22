import request from "../apiRequester";

export interface CampaignSearchFilter{
  search: string;
  tag_id?: string;
  limit: string;
  offset: string;
  orderby: string;
  offset_min: number;
  offset_max: number;
}

export interface Campaign {
  id?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  title?: string;
  draft?: boolean;
  send_date?: string;
  scheduling_date?: string;
  errors?: any;
  all_base?: boolean;
  seller?: string;
  template_id?: string;
  collaborator_id?: string;
  buyers_ids?: string[];
}
  
//GET ALL CAMPAIGNS
export const getCampaigns = async () => {
  return request<Campaign[]>('/campaign/', 'GET');
}

//GET CAMPAIGN BY ID
export const getCampaign = async (id: string) => {
  return request<Campaign>(`/campaign/${id}`, 'GET');
}

//PATCH CAMPAIGN
export const updateCampaign = async (campaign: Campaign) => {
  return request<Campaign>(`/campaign/${campaign.id}`, 'PATCH', campaign);
}

//CREATE CAMPAIGN
export const createCampaign = async (campaign: Campaign) => {
  return request<Campaign>('/campaign/', 'POST', campaign);
}

//CALCULATE COSTS OF A CAMPAIGN
export const calculateCampaignCost = async (buyer_ids: string[]) => {
  return request<any>('/campaign/calculate-costs/', 'POST', buyer_ids);
}

//SEND CAMPAIGN
export const sendCampaign = async (campaign_id: string) => {
  return request<any>(`/campaign/${campaign_id}/send/`, 'POST');
}

//UPLOAD CAMPAIGN MEDIA
export const uploadCampaignMedia = async (campaign_id: string, media: any) => {
  return request<any>(`/campaign/${campaign_id}/media`, 'POST', media, null, "multipart/form-data");
}

export const campaignMessageTier = async () => {
  return request<any>('/campaign/tier/', 'GET');
}