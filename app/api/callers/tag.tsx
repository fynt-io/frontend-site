import request, { ApiResponse } from "../apiRequester";

export interface Tag {
    id?: string;
    name: string;
    created_at?: string;
    updated_at?: string;
}
  
//GET ALL TAGS
export const getTags = async () => {
  const res : ApiResponse<Tag[]> = await request<Tag[]>('/tag/', 'GET') as ApiResponse<Tag[]>;
  res.data.reverse();
  return res;
}

//GET TAG BY ID
export const getTag = async (id: string) => {
  return request<Tag>(`/tag/${id}/`, 'GET');
}

//CREATE TAG
export const createTag = async (tag: Tag) => {
  return request<Tag>('/tag/', 'POST', tag);
}

//PATCH TAG
export const updateTag = async (tag: Tag) => {
  return request<Tag>(`/tag/${tag.id}/`, 'PATCH', tag);
}

//DELETE TAG
export const deleteTag = async (id: string) => {
  return request<Tag>(`/tag/${id}/`, 'DELETE');
}

//COMBINE BUYER AND TAGS
export const combineBuyersAndTags = async ( tags:string[], buyers:string[],) => {
  return request(`/buyer/tag/batch/`, 'POST', {buyers, tags});
}

//DELETE TAG FROM BUYER
export const deleteTagFromBuyer = async (buyer_id:string, tag_id:string) => {
  return request(`/buyer/tag/`, 'DELETE', {buyer_id, tag_id});
}

//BATCH DELETE TAGS FROM BUYERS
export const batchDeleteTagsFromBuyers = async (buyers_id:string[], tags_id:string[]) => {
  return request(`/buyer/tag/batch/`, 'DELETE', {buyers_id, tags_id});
}
