import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { SendPlatformMessage } from '../Utils/Utils';
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
import Cookies from "js-cookie";

export interface ApiResponse<T> {
  data: T;
  status: number;
}

async function request<T>(
  url: string,
  method: AxiosRequestConfig['method'],
  data?: any,
  params?: any,
  contentType?: string,
): Promise<ApiResponse<T> | undefined> {
  try {
    const config: AxiosRequestConfig = {
      url: `${BASE_URL}${url}`,
      method,
      data,
      params,
      headers: {
        'Authorization': Cookies.get("jwt") ? `Bearer ${Cookies.get("jwt")}` : '',
        'Content-Type': contentType || 'application/json',
      },
    };

    const response: AxiosResponse<T> = await axios(config);
    return { data: response.data, status: response.status };
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      if (url !== '/auth/login/') {
        Cookies.remove("jwt");
        window.location.href = '/login?expired=true';
      } else {
        window.location.href = '/login?wrong-credentials=true';
      }
    }
    if (error.response && error.response.status !== 404 && url === "/faq/") {
      throw error.response ? SendPlatformMessage(error.response.data) : SendPlatformMessage(error);
    }
    
    // Adicione um retorno no final para satisfazer o TypeScript
    return undefined;
  }
}

export default request;
