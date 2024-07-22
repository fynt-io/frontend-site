import request from "../apiRequester";

export interface Collaborator {
  first_name: string,
  last_name: string,
  email: string,
  phone: string,
  is_superuser: boolean,
  is_active?: boolean,
  responsible_for_buyer: boolean,
  id?: string,
  created_at?: string,
  updated_at?: string
  password?: string
  repeat_password?: string
}

export interface Collaborators {
  items: Collaborator[],
  total: number
}


export interface CollaboratorChangeHistory {
  id: string,
  app: string,
  actions: string,
  id_action: string,
  created_at: string,
  collaborator: Collaborator
}

//GET ALL COLLABORATORS BY SELLER
export const getCollaborators = async ()  => {
  return request<Collaborators>('/collaborator/', 'GET');
}

//GET COLLABORATOR BY ID
export const getCollaborator = async (id: string) => {
  return request<Collaborator>(`/collaborator/${id}/`, 'GET');
}

//GET AUTHENTICATED COLLABORATOR
export const getAuthenticatedCollaborator = async () => {
  return request<Collaborator>('/collaborator/authenticated/', 'GET');
}

//CREATE COLLABORATOR
export const createCollaborator = async (collaborator: Collaborator) => {
  return request<Collaborator>('/collaborator/', 'POST', collaborator);
}

//PATCH COLLABORATOR
export const updateCollaborator = async (collaborator: Collaborator) => {
  return request<Collaborator>(`/collaborator/${collaborator.id}/`, 'PATCH', collaborator);
}

//DELETE COLLABORATOR
export const deleteCollaborator = async (id: string) => {
  return request<Collaborator>(`/collaborator/${id}/`, 'DELETE');
}

//DEACTIVATE COLLABORATOR
export const deactivateCollaborator = async (id: string) => {
  return request<Collaborator>(`/collaborator/${id}/deactivate/`, 'DELETE');
}

//ACTIVATE COLLABORATOR
export const activateCollaborator = async (id: string) => {
  return request<Collaborator>(`/collaborator/${id}/activate/`, 'PATCH');
}

//GET CHANGE HISTORY FROM AUTHENTICATED COLLABORATOR
export const getChangeHistory = async () => {
  return request<CollaboratorChangeHistory[]>('/collaborator/authenticated/change-history/', 'GET');
}

//GET CHANGE HISTORY FROM COLLABORATOR
export const getCollaboratorChangeHistory = async (id: string) => {
  return request<CollaboratorChangeHistory[]>(`/collaborator/${id}/change-history/`, 'GET');
}