import request from "../apiRequester";


export interface BrenFile {
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

//GET ALL FILES
export const getFiles = async () => {
  return request<BrenFile[]>('/files/', 'GET');
}

//GET FILE BY ID
export const getFile = async (id: string) => {
  return request<BrenFile>(`/files/${id}/`, 'GET');
}

//UPDATE FILE
export const updateFile = async (file: BrenFile) => {
  return request<BrenFile>(`/files/${file.id}/`, 'PATCH', file);
}

//DELETE FILE
export const deleteFile = async (id: string) => {
  return request<BrenFile>(`/files/${id}/`, 'DELETE');
}

//CREATE FILE
export const createFile = async (file: FormData) => {
  return request<BrenFile>('/files/', 'POST', file, null, "multipart/form-data");
}