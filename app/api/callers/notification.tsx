import request from "../apiRequester";

export interface Notification {
  title: string;
  content: string;
  url: string;
  id: string;
  view: boolean;
  created_at: string;
  updated_at: string;
  collaborator_id: string;
  seller_id: string;
}
  
//GET ALL NOTIFICATIONS
export const getNotifications = async () => {
  return request<Notification[]>('/notification/', 'GET');
}

//GET NOTIFICATION BY ID
export const getNotification = async (id: string) => {
  return request<Notification>(`/notification/${id}/`, 'GET');
}

//UPDATE VIEW STATUS
export const updateViewStatus = async (id: string) => {
  return request<Notification>(`/notification/${id}/viewed/`, 'PATCH');
}