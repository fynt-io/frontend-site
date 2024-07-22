import request, { ApiResponse } from "../apiRequester";
import Cookies from "js-cookie";

export interface Auth {
  email: string;
  password: string;
}

export interface ResetPassword {
  email: string;
  url: string;
  new_password?: string;
  confirm_password?: string;
}

export interface ChangePassword {
  new_password: string;
  confirm_password: string;
  old_password: string;
}

export interface AuthResponse {
  access_token: string;
}


//LOGIN
export const login = async (auth: Auth)  => {
  const token = await request<AuthResponse>('/auth/login/', 'POST', auth) as ApiResponse<AuthResponse>;
  Cookies.set("jwt", token.data.access_token, { expires: 1 });
  const loggedIn = token ? true : false;
  return loggedIn;
}

//LOGOUT
export const logout = async () => {
  request<null>('/auth/logout/', 'POST').then((res:ApiResponse<null> | undefined) => {
    Cookies.remove("jwt");
    window.location.href = "/login?logged-out=true";
  }); 
}

//RESET PASSWORD
export const resetPassword = async (resetPassword: ResetPassword, token?:string) => {
  return request<ResetPassword>(`/auth/reset-password/${token ? `?token=${token}` : ``}`, 'POST', resetPassword);
}

//CHANGE PASSWORD
export const changePassword = async (changePassword: ChangePassword, user_id:string) => {
  return request<ChangePassword>(`/auth/${user_id}/change-password/`, 'PATCH', changePassword);
}