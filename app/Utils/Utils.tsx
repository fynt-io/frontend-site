"use client";
const API_SERVER_URL = process.env.NEXT_PUBLIC_API_URL;
const consultarCNPJ = require("consultar-cnpj");
import Cookies from "js-cookie";
import axios from "axios";
import { validate as validate_uuid } from "uuid";
import PlatformMessages from "../components/Layout/Alerts/PlatformMessages";
import * as React from "react";
import { createRoot } from "react-dom/client";
import crypto from "crypto";
import moment from "moment";
import {
  CollaboratorInterface,
  SellerInterface,
  NotificationInterface,
  TemplateInterface,
  CampaignsInterface,
  CampaignInterface,
  SmartQuestionsInterface,
  CampaignSearchFilter,
  MessagesInterface,
  FollowUpInterface,
  DashboardInterface,
  FlowInterface,
  SmartQuestionInterface,
  LeadInterface,
  CRMConfigInterface,
  BuyerEventsInterface,
  HistoryChangesInterface,
  BuyerPrioritySearchInterface,
  CreditChartDataInterface,
  CreditSummaryInterface,
  CreditExtractsInterface,
  NotificationsInterface,
  HistoriesChangesInterface,
  TemplateQueryParamsInterface,
  MessageSearchInterface,
  MessageTierInterface
} from "../constants/types";
import { TranslateSellerHistoryTerm } from "../constants/TranslateHistoryTerms";
import {FLOW_CONVERSATION_STAGES } from "../constants/FlowConversationStages";
import { Collaborator } from "../api/callers/collaborator";
import { Tag } from "../api/callers/tag";
import { Buyer } from "../api/callers/buyer";
import { Campaign } from "../api/callers/campaign";

//Headers
const headers: {
  Accept: string;
  "Content-Type": string;
  Authorization?: string;
} = {
  Accept: "*/*",
  "Content-Type": "application/json",
};

//--------------------------------------------------------------//
////////////////////// MAIN API REQUESTER ////////////////////////
//--------------------------------------------------------------//
//  Description: Responsible for making the requests to the API.
//  Parameters:
//  - apiPath: the path to the endpoint
//  - method: the request method
//  - token: if the request needs a jwt token
//  - data: the request payload
//--------------------------------------------------------------//

export async function APIRequester({
  apiPath = "",
  method = "GET",
  token = false,
  data = null,
}: {
  apiPath: string;
  method: string;
  token?: boolean;
  data?: any;
}) {
  const apiUrl = API_SERVER_URL + apiPath;

  // If token is true, add jwt to headers
  if (token) {
    headers["Authorization"] = `Bearer ${Cookies.get("jwt")}`;

    //if token is expired, redirect to login
    if (!Cookies.get("jwt")) {
      if (window.location.pathname !== "/login") {
        window.location.href = "/login?expired=true";
      }
    }
  }

  // Recording the final response
  let finalResponse = null;

  await axios({ method, url: apiUrl, headers, data })
    .then((response) => {
      finalResponse = response;
    })
    .catch((error) => {
      finalResponse = error;
      console.error(
        "Error:",
        error.response ? error.response.data : error.message,
      );
    });

  UnauthorizedRedirect(finalResponse);
  return finalResponse;
}

// --- UNAUTHORIZED REDIRECT --- //
export function UnauthorizedRedirect(response: any) {
  //if token expired, redirect to login
  if (response) {
    if (response.response) {
      if (response.response.status) {
        if (response.response.status === 401) {
          ClearStorage();
          if (window.location.pathname !== "/login") {
            window.location.href = "/login?expired=true";
          }
        }
      }
      if (response.response.data) {
        if (response.response.data.detail) {
          if (response.response.data.detail === "Unauthorized") {
            ClearStorage();
            if (window.location.pathname !== "/login") {
              window.location.href = "/login?expired=true";
            }
          }
        }
      }
    }
  }
}

//--------------------------------------------------------------//
/////////////////////// MAIN API ROUTES //////////////////////////
//--------------------------------------------------------------//

//--- Auth ---//
export async function AuthUser(data: any) {
  //remove old cookies and localStorage
  ClearStorage();

  //make the requests
  const auth: any = await APIRequester({
    apiPath: "/auth-user/login",
    method: "POST",
    data: data,
  });

  //if response is code 200 (success)
  if (auth) {
    if (auth.status === 200) {
      const token = await auth.data.access_token;
      const permissions: string[] = await auth.data.permissions;
      Cookies.set("jwt", token, { expires: 1 });
      Cookies.set("permissions", permissions.join(","), { expires: 1 });
      await GetUser();
      await GetEmpresa();

      // if token is valid, return success
      if (token) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}

// --- LOGOUT --- //
export function LoggedOut() {
  if (typeof window === "undefined") return;
  APIRequester({
    apiPath: "/auth-user/logout",
    method: "POST",
    token: true,
    data: null,
  })
    .then((res) => {
      //remove jwt and user data
      ClearStorage();
      window.location.href = "/login?logged-out=true";
    })
    .catch((error) => {
      SendPlatformMessage(error.detalhes, true);
      return error;
    });
}

// --- GET COLLABORATORS --- //
export async function GetCollaborators() {
  const response: any = await APIRequester({
    apiPath: "/collaborator/",
    method: "GET",
    token: true,
    data: null,
  });
  const collaborators: CollaboratorInterface[] = response.data;
  return collaborators;
}

// --- GET USER --- //
export async function GetUser() {
  localStorage.removeItem("bren_user");
  const response: any = await APIRequester({
    apiPath: "/collaborator/authenticated",
    method: "GET",
    token: true,
    data: null,
  });
  const user: CollaboratorInterface = response.data;
  if (!user) {
    return null;
  }
  user.name = user.first_name + " " + user.last_name;
  localStorage.setItem("bren_user", JSON.stringify(user));
  return user;
}

// --- GET USER BY ID --- //
export async function GetUserById(user_id: string) {
  //     const response = await makeRequest('GET', `/auth/user/${user_id}/`, null);
  //     return response.data;
  return null;
}

// --- CREATE USER --- //
export async function CreateUser(data: CollaboratorInterface) {
  headers["Content-Type"] = "application/json";
  const response: any = await APIRequester({
    apiPath: "/collaborator/",
    method: "POST",
    token: false,
    data: data,
  });
  return response;
}

// --- EDIT USER --- //
export async function EditUser(data: CollaboratorInterface, user_id: string) {
  headers["Content-Type"] = "application/json";
  const response: any = await APIRequester({
    apiPath: `/collaborator/${user_id}`,
    method: "PATCH",
    token: true,
    data: data,
  });
  return response;
}

// --- DELETE USER --- //
export async function DeleteUser(user_id: string) {
  headers["Content-Type"] = "application/json";
  const response: any = await APIRequester({
    apiPath: `/collaborator/${user_id}`,
    method: "DELETE",
    token: true,
    data: null,
  });
  return response;
}

// --- CHANGE PASSWORD --- //
export async function ChangePassword(user_id: any, data: any) {
  headers["Content-Type"] = "application/json";
  const res: any = await APIRequester({
    apiPath: `/auth-user/${user_id}/change-password/`,
    method: "PATCH",
    token: true,
    data: data,
  });
  return res.data;
}

// --- RESET PASSWORD --- //
export async function ResetPassword(data: any, token?: string) {
  headers["Content-Type"] = "application/json";
  const res: any = await APIRequester({
    apiPath: `/auth-user/reset-password${token ? "?token=" + token : ""}`,
    method: "POST",
    token: false,
    data: data,
  });
  return res.data;
}

// --- GET EMPRESA --- //
export async function GetEmpresa() {
  localStorage.removeItem("bren_empresa");
  const response: any = await APIRequester({
    apiPath: "/seller/",
    method: "GET",
    token: true,
    data: null,
  });
  const seller: SellerInterface = response.data;
  localStorage.setItem("bren_empresa", JSON.stringify(seller));
  return seller;
}

// --- UPDATE EMPRESA --- //
export async function UpdateEmpresa(data: any) {
  headers["Content-Type"] = "application/json";
  const response: any = await APIRequester({
    apiPath: "/seller/",
    method: "PATCH",
    token: true,
    data: data,
  });
  return response.data;
}

// --- UPDATE EMPRESA LOGOTIPO --- //
export async function UpdateSellerLogo(data: any) {
  headers["Content-Type"] = "multipart/form-data";
  const response: any = await APIRequester({
    apiPath: "/seller/logo",
    method: "POST",
    token: true,
    data: data,
  });
  return response.data;
}

// --- UPDATE WHATSAPP IMAGEM REPRESENTATE --- //
export async function UpdateWhatsAppProfilePicture(data: any) {
  headers["Content-Type"] = "multipart/form-data";
  const response: any = await APIRequester({
    apiPath: "/seller/whatsapp-profile-picture",
    method: "POST",
    token: true,
    data: data,
  });
  return response.data;
}

// --- CREATE EMPRESA --- //
export async function CreateEmpresa(data: any) {
  headers["Content-Type"] = "application/json";
  const response: any = await APIRequester({
    apiPath: "/seller/",
    method: "POST",
    token: false,
    data: data,
  });
  return response.data;
}

// --- GET EMPRESA BY CNPJ --- //
export async function GetEmpresaByCNPJ(empresa_cnpj: any) {
  //     const response = await makeRequest('GET', `/empresa/cnpj/${empresa_cnpj}/`, null);
  //     return response.data;
}

// --- GET EMPRESA CONFIG --- //
export async function GetEmpresaConfig() {
  // localStorage.removeItem('bren_empresa_config');
  // const response = await makeRequest('GET', `/empresa-config/`, null);
  // localStorage.setItem('bren_empresa_config', JSON.stringify(response.data));
  // return response.data;
}

// --- UPDATE EMPRESA CONFIG --- //
export async function UpdateEmpresaConfig(data: any) {
  //     header['Content-Type'] = 'application/json';
  //     const response = await makeRequest('PATCH', `/empresa-config/`, data);
  //     return response.data;
}


// --- CHANGE PROMPT --- //
export async function ChangePrompt(
  training_id: string | null = null,
  body: any = null,
) {
  headers["Content-Type"] = "application/json";

  //iterate for all keys in body and remove empty values, null values, empty strings, empty arrays, empty objects
  if (body) {
    Object.keys(body).forEach((key) => {
      if (
        body[key] === null ||
        body[key] === undefined ||
        (Array.isArray(body[key]) && body[key].length === 0) ||
        (typeof body[key] === "object" && Object.keys(body[key]).length === 0)
      ) {
        delete body[key];
      }
    });
  }

  //if training_id is null, create a new training
  if (training_id) {
    const response: any = await APIRequester({
      apiPath: `/training/${training_id}`,
      method: "PATCH",
      token: true,
      data: body,
    });
    return response.data;
  } else {
    SendPlatformMessage("Erro ao salvar o treinamento!", true);
  }
}

// --- CREATE KEYWORDS --- //
export async function CreateKeyword(
  training_id: string | null = null,
  word: string | null = null,
) {
  if (!word) {
    SendPlatformMessage("Palavra-chave não pode ser vazia!", true);
    return null;
  }

  let trainingId = training_id;
  const payload = { content: word };
  const response: any = await APIRequester({
    apiPath: `/training/${trainingId}/keywords`,
    method: "POST",
    token: true,
    data: payload,
  });
  if (response.data) {
    SendPlatformMessage("Palavra chave adicionada com sucesso!");
  }
  return response.data;
}

// --- DELETE KEYWORDS --- //
export async function DeleteKeyword(training_id: any, keyword_id = null) {
  if (!keyword_id) {
    return null;
  }
  const response: any = await APIRequester({
    apiPath: `/training/${training_id}/keywords/${keyword_id}`,
    method: "DELETE",
    token: true,
    data: null,
  });
  return response.data;
}

// --- UPLOAD MATERIAL TREINAMENTO --- //
export async function UploadTrainingFile(
  training_id: string,
  category: string,
  file: any,
) {
  headers["Content-Type"] = "multipart/form-data";
  const payload = new FormData();
  payload.append("category", category);
  payload.append("file", file);
  const response: any = await APIRequester({
    apiPath: `/training/${training_id}/files`,
    method: "POST",
    token: true,
    data: payload,
  });
  return response.data;
}

// --- UPLOAD MATERIAL TREINAMENTO --- //
export async function UploadIAFile(
  training_id: string,
  category: "catalogue",
  file: any,
) {
  headers["Content-Type"] = "multipart/form-data";
  const payload = new FormData();
  payload.append("category", category);
  payload.append("file", file);
  payload.append("name", file.name);
  const response: any = await APIRequester({
    apiPath: `/training/${training_id}/files/ia`,
    method: "POST",
    token: true,
    data: payload,
  });
  return response.data;
}

// --- UPLOAD MATERIAL TREINAMENTO POR LINK --- //
export async function UploadIAFileViaLink(
  training_id: string,
  category: "catalogue",
  link: string,
  name?: string,
) {
  headers["Content-Type"] = "multipart/form-data";
  const payload = new FormData();
  payload.append("category", category);
  payload.append("link", link);
  const linkname = link.match(/\/([^\/?#]+)[^\/]*$/);
  payload.append("file_name", name ? name : linkname ? linkname[1] : "");
  const response: any = await APIRequester({
    apiPath: `/training/${training_id}/files/ia`,
    method: "POST",
    token: true,
    data: payload,
  });
  return response.data;
}

export async function RenameIAFile(
  training_id: string,
  file_id: string,
  newFileName: string,
) {
  headers["Content-Type"] = "application/json"; // Definindo o tipo de conteúdo como JSON
  console.log(file_id)
  const data = {
    file_name: newFileName,
  };
  const response: any = await APIRequester({
    apiPath: `/training/${training_id}/rename_files/${file_id}`,
    method: "PATCH", // Mudando o método para PATCH
    token: true,
    data: JSON.stringify(data), // Convertendo os dados para JSON
  });
  return response.data;
}

// --- DELETE MATERIAL DE TREINAMENTO --- //
export async function DeleteTrainingFile(
  treinamento_id: string,
  file_id: string,
) {
  headers["Content-Type"] = "application/json";
  // Verifique se a categoria existe no objeto treinamento
  if (treinamento_id && file_id) {
    const response: any = await APIRequester({
      apiPath: `/training/${treinamento_id}/files/${file_id}`,
      method: "DELETE",
      token: true,
      data: null,
    });
    SendPlatformMessage("Arquivo removido com sucesso!");
    return response.data;
  } else {
    SendPlatformMessage("Erro ao deletar o arquivo!");
  }
}

// --- UPDATE MATERIAL DE TREINAMENTO --- //
export async function UpdateTrainingFile(
  treinamento_id: string,
  file_id: string,
  data: any,
) {
  headers["Content-Type"] = "application/json";
  const response: any = await APIRequester({
    apiPath: `/training/${treinamento_id}/files/ia/${file_id}`,
    method: "PATCH",
    token: true,
    data: data,
  });
  return response.data;
}

// --- TRAINING CHAT SELLER --- //
export async function TrainingChatSeller(training_id: string) {
  headers["Content-Type"] = "application/json";
  const response: any = await APIRequester({
    apiPath: `/training/train/${training_id}`,
    method: "POST",
    token: true,
    data: null,
  });
  return response.data;
}



// --- GET CHAT MESSAGE HISTORY --- //
export async function GetChatMessageHistory(currentChatId:string, filters:MessageSearchInterface){
  if(!currentChatId){return;}
  if(!filters){return;}
  const response: any = await APIRequester({
    apiPath: `/conversation/${currentChatId}/message?search=${filters.search}&limit=${filters.limit}`,
    method: "GET",
    token: true,
    data: null,
  });
  return response.data;
}

// --- GET CONVERSATION DETAILS BY ID --- //
export async function GetConversationDetailsById(currentChatId:string){
  const response: any = await APIRequester({
    apiPath: `/conversation/${currentChatId}`,
    method: "GET",
    token: true,
    data: null,
  });

  return response.data;
}


// --- MODEL EXPORT BUYER --- //
export async function ModelExportBuyerV2() {
  const response: any = await APIRequester({
    apiPath: `/buyer/v2/buyer-model/`,
    method: "POST",
    token: true,
  });
  if (response.code === "ERR_BAD_REQUEST") {
    if (response.response.data.error) {
      SendPlatformMessage(response.response.data.error);
    }
  }
  return response.data;
}

// --- UPLOAD BUYERS (CSV) --- //
export async function ImportBuyerViaCSV(file: any) {
  headers["Content-Type"] = "multipart/form-data";
  const response: any = await APIRequester({
    apiPath: `/buyer/import`,
    method: "POST",
    token: true,
    data: file,
  });
  if (response.code === "ERR_BAD_REQUEST") {
    if (response.response.data.error) {
      SendPlatformMessage(response.response.data.error);
    }
  }
  return response.data;
}

export async function ImportBuyersV2(file: any) {
  headers["Content-Type"] = "multipart/form-data";
  const response: any = await APIRequester({
    apiPath: `/buyer/v2/import/`,
    method: "POST",
    token: true,
    data: file,
  });
  if (response.code === "ERR_BAD_REQUEST") {
    if (response.response.data.error) {
      SendPlatformMessage(response.response.data.error);
    }
  }
  return response.data;
}

export async function UndoImport(){
  const response: any = await APIRequester({
    apiPath: `/buyer/v2/undo-import/`,
    method: "POST",
    token: true,
    data: { undo_import: true }, // Se necessário enviar dados adicionais, adicione-os aqui
  });

  if (response.code === "ERR_BAD_REQUEST") {
    if (response.response.data.error) {
      SendPlatformMessage(response.response.data.error);
    }
  }

  return response.data;
}

// --- EXPORT BUYERS (CSV) --- //
export async function ExportBuyers() {
  const response: any = await APIRequester({
    apiPath: `/buyer/export`,
    method: "POST",
    token: true,
    data: null,
  });
  return response.data;
}

export async function ExportBuyersV2() {
  const response: any = await APIRequester({
    apiPath: `/buyer/v2/export/`,
    method: "POST",
    token: true,
    data: null,
  });
  console.log(response)
  return response.data;
}

// --- GET ATENDIMENTOS --- //
export async function GetAtendimentos() {
  // const response = await makeRequest('GET', `/chats/`, null);
  // if (response.data === undefined) {
  //     return [];
  // } else {
  //     //filter by updated_at and return most recent
  //     response.data.forEach(c => {
  //         if (c.dt_alteracao === null) {
  //             c.dt_alteracao = c.dt_criacao;
  //         }
  //     });
  //     const nd = response.data.sort((a, b) =>
  //         moment(b.dt_alteracao) - moment(a.dt_alteracao)
  //     );
  //     return nd;
  // }
}


// --- SEND SIMULATION MESSAGE --- //
export async function SendSimuladorMessage(message: string, history: any) {
  // header['Content-Type'] = 'application/json';
  // const response = await makeRequest('POST', `/simulador/chatbot/`, { message_user: message, history });
  // return response.data;
}

// --- REPROVA MESSAGE --- //
export async function ReprovaMensagem(message_id: any) {
  // header['Content-Type'] = 'application/json';
  // const response = await makeRequest('PATCH', `/mensagem/${message_id}/reprova_mensagem`, null);
  // return response.data;
}

// --- INATIVA MESSAGE --- //
export async function InativaMensagem(message_id: any) {
  // header['Content-Type'] = 'application/json';
  // const response = await makeRequest('PATCH', `/mensagem/${message_id}/inativa`, null);
  // return response.data;
}

// --- UNREAD LAST MESSAGE --- //
export async function UnreadLastMessage(conversation_id: string | null = null) {
  headers["Content-Type"] = "application/json";
  const response: any = await APIRequester({
    apiPath: `/conversation/${conversation_id}/mark_last_message_as_unviewed`,
    method: "PATCH",
    token: true,
    data: null,
  });
  return response.data;
}

export async function ResetReadMessages(conversation_id: string) {
  headers["Content-Type"] = "application/json";
  const response: any = await APIRequester({
    apiPath: `/conversation/${conversation_id}/mark_all_messages_as_viewed`,
    method: "PATCH",
    token: true,
    data: null,
  });
  return response.data;
}

// --- UPDATE MESSAGE --- //
export async function UpdateMensagem(message_id: string, data: any) {
  // header['Content-Type'] = 'application/json';
  // const response = await makeRequest('PATCH', `/mensagem/${message_id}/`, data);
  // return response.data;
}

// --- DELETE MESSAGE --- //
export async function DeletaMensagem(message_id: string) {
  // header['Content-Type'] = 'application/json';
  // const response = await makeRequest('DELETE', `/mensagem/${message_id}/`, null);
  // return response.data;
}

//--- CREATE LEADS ---//
export async function CreateLead(data: LeadInterface) {
  headers["Content-Type"] = "application/json";
  const res: any = await APIRequester({
    apiPath: "/lead/",
    method: "POST",
    token: false,
    data,
  });
  return res.data;
}

//--- GET LEADS BY EMAIL ---//
export async function GetLeadByEmail(email_empresa: any) {
  // const res = await makeRequest('GET', `/leads/${email_empresa}/`, null, true);
  // return res.data;
}

//--- UPDATE LEAD ---//
export async function UpdateLead(lead_id: any, data: any) {
  // header['Content-Type'] = 'application/json';
  // const res = await makeRequest('PATCH', `/leads/${lead_id}/`, data, true);
  // return res.data;
}

// --- GET SUGESTAO DA IA --- //
export async function GetSugestaoIA(atendimento_id: string) {
  // header['Content-Type'] = 'application/json';
  // const response = await makeRequest('GET', `/mensagem/${atendimento_id}/get_mensagem_validacao`, null);
  // return response.data;
}

// --- CHANGE PILOTO AUTOMATICO --- //
export async function ChangeAutopilot(
  autopilot: boolean,
  conversation_id: any,
) {
  headers["Content-Type"] = "application/json";
  const response: any = await APIRequester({
    apiPath: `/conversation/${conversation_id}`,
    method: "PATCH",
    token: true,
    data: { auto_pilot: autopilot },
  });
  return response.data;
}

// --- CREATE ZAPSIGN DOC --- //
export async function CreateZapSignDocToAssign(data: any) {
  const res: any = await APIRequester({
    apiPath: "/seller/zapsign/doc",
    method: "POST",
    token: false,
    data,
  });
  return res.data;
}

// --- UPDATE IMAGEM PERFIL EMPRESA --- //
export async function UpdateEmpresaConfigImagemPerfil(data: any) {
  // if (localStorage.getItem("bren_empresa_config")) {
  //     let empresa_id = JSON.parse(localStorage.getItem("bren_empresa")).id;
  //     header['Content-Type'] = 'multipart/form-data';
  //     const res = await makeRequest('PATCH', `/empresa/config/${empresa_id}/imagem_perfil`, data);
  //     return res.data;
  // }
}

// --- GET DISPAROS --- //
export async function GetCampaigns(
  searchParams: CampaignSearchFilter | null = null,
) {
  headers["Content-Type"] = "application/json";
  let res: any = await APIRequester({
    apiPath: `/campaing/?search=${searchParams?.search ? searchParams?.search : ""}&orderby=${searchParams?.orderby ? searchParams?.orderby : "-created_at"}&offset_min=${searchParams?.offset_min ? searchParams?.offset_min : "0"}&offset_max=${searchParams?.offset_max ? searchParams?.offset_max : "20"}`,
    method: "GET",
    token: true,
    data: null,
  });
  let campaigns: CampaignsInterface = res.data;
  if (campaigns) {
    return campaigns;
  }
}

// --- GET TOTAL DISPAROS --- //
export async function GetTotalCampaignsCount() {
  headers["Content-Type"] = "application/json";
  let res: any = await APIRequester({
    apiPath: `/campaing/count/`,
    method: "GET",
    token: true,
    data: null,
  });
  return res.data.total_campaings;
}

// --- GET CAMPAIGN INVESTMENT ESTIMATE --- //
export async function GetCampaignInvestmentEstimate(buyers_ids: string[]) {
  headers["Content-Type"] = "application/json";
  let res: any = await APIRequester({
    apiPath: `/campaing/investment`,
    method: "POST",
    token: true,
    data: {buyers_ids:buyers_ids},
  });
  return res.data;
} 


// --- GET MESSAGE TIER --- //
export async function GetMessageTier() {
  headers["Content-Type"] = "application/json";
  let res: any = await APIRequester({
    apiPath: `/message/tier`,
    method: "GET",
    token: true,
    data: null,
  });
  const tiers: MessageTierInterface = res.data;
  return res.data;
}

// --- GET DISPARO DETAIL --- //
export async function GetCampaignsDetail(campaign_id: string) {
  if (validate_uuid(campaign_id)) {
    headers["Content-Type"] = "application/json";
    let res: any = await APIRequester({
      apiPath: `/campaing/${campaign_id}`,
      method: "GET",
      token: true,
      data: null,
    });
    let campaign: CampaignsInterface = res.data;
    if (campaign) {
      return campaign;
    }
  }
}

export async function GetCampaignsBuyers(campaign_id: string) {
  if (validate_uuid(campaign_id)) {
    headers["Content-Type"] = "application/json";
    let res: any = await APIRequester({
      apiPath: `/campaing/${campaign_id}/buyers?campaing_id=${campaign_id}&limit=1000`,
      method: "GET",
      token: true,
      data: null,
    });
    let buyers_campaign = res.data;
    if (buyers_campaign) {
      return buyers_campaign;
    }
  }
}

// --- GET DISPARO --- //
export async function GetDisparo(campanha_id: any) {
  // header['Content-Type'] = 'application/json';
  // const res = await makeRequest('GET', `/campanha/${campanha_id}/`, null);
  // return res.data;
}

// --- CREATE DISPARO --- //
export async function CreateDisparo(data: any, media: any) {
  headers["Content-Type"] = "application/json";
  const res: any = await APIRequester({
    apiPath: `/campaing/`,
    method: "POST",
    token: true,
    data: data,
  });

  if (media) {
    const mediaRes = await DisparoMediaUpload(res.data.id, media);
  }
  return res.data;
}

// --- UPLOAD MEDIA ON DISPARO --- //
export async function DisparoMediaUpload(campanha_id: any, data: any) {
  headers["Content-Type"] = "multipart/form-data";
  const res: any = await APIRequester({
    apiPath: `/campaing/${campanha_id}/media`,
    method: "POST",
    token: true,
    data: data,
  });
  return res.data;
}

// --- SEND DISPARO --- //
export async function SendDisparo(
  campaign_id: string, 
  data: any = null, 
  onDataReceived?: (chunk: string) => void // Função de retorno de chamada para atualização em tempo real
): Promise<void> {
  const apiPath = `/campaing/${campaign_id}/trigger`;
  const apiUrl = API_SERVER_URL + apiPath;
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
  };

  const token = Cookies.get("jwt");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  } else {
    if (window.location.pathname !== "/login") {
      window.location.href = "/login?expired=true";
    }
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: data ? JSON.stringify(data) : null,
    });

    if (!response.ok) {
      throw new Error(`Erro na resposta do servidor: ${response.statusText}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Streaming não suportado pelo navegador.');
    }

    const decoder = new TextDecoder('utf-8');

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      if(onDataReceived){
        onDataReceived(chunk); // Chama a função de retorno de chamada com o chunk recebido
      }
    }

  } catch (error) {
    console.error('Erro ao fazer o disparo:', error);
    throw error;
  }
}

// --- DELETE DISPARO --- //
export async function DeleteDisparo(campaign_id: any) {
  headers["Content-Type"] = "application/json";
  let res: any = await APIRequester({
    apiPath: `/campaing/${campaign_id}`,
    method: "DELETE",
    token: true,
    data: null,
  });
  let campaign: CampaignsInterface = res.data;
  if (campaign) {
    return campaign;
  }
}

// --- UPDATE DISPARO --- //
export async function UpdateDisparo(campaign_id: any, data: any) {
  headers["Content-Type"] = "application/json";
  let res: any = await APIRequester({
    apiPath: `/campaing/${campaign_id}`,
    method: "PATCH",
    token: true,
    data: data,
  });
  let campaign: CampaignsInterface = res.data;
  if (campaign) {
    return campaign;
  }
}

// --- NOTIFICATION --- //
export async function GetNotifications(limit:number = 10, page:number = 1) {
  headers["Content-Type"] = "application/json";
  const res: any = await APIRequester({
    apiPath: `/notification/?limit=${limit}&page_number=${page}`,
    method: "GET",
    token: true,
    data: null,
  });
  const notifications: NotificationsInterface = res.data;
  return notifications;
}

export async function DeleteNotification(notification_id: any) {
  headers["Content-Type"] = "application/json";
  const res: any = await APIRequester({
    apiPath: `/notification/${notification_id}`,
    method: "DELETE",
    token: true,
    data: null,
  });
  return res.data;
}

export async function UpdateNotification(notification_id: any) {
  headers["Content-Type"] = "application/json";
  const res: any = await APIRequester({
    apiPath: `/notification/${notification_id}/view`,
    method: "PATCH",
    token: true,
    data: null,
  });
  const notifications: NotificationInterface[] = res.data;
  return notifications;
}

export async function MarkAllNotificationRead() {
  headers["Content-Type"] = "application/json";
  const res: any = await APIRequester({
    apiPath: "/notification/mark-all-read",
    method: "PATCH",
    token: true,
    data: null,
  });
  const notifications: NotificationInterface[] = res.data;
  return notifications;
}

// --- TEMPLATES --- //
export async function GetTemplates(params?: TemplateQueryParamsInterface) {
  headers["Content-Type"] = "application/json";
  const queryParams = []

  if (params?.search) {
    queryParams.push(`search=${params.search}`)
  }

  if (params?.status) {
    queryParams.push(`status=${params.status}`)
  }

  if (params?.offset_min) {
    queryParams.push(`offset_min=${params.offset_min}`)
  }

  if (params?.offset_max) {
    queryParams.push(`offset_max=${params.offset_max}`)
  }

  if (params?.orderby) {
    queryParams.push(`orderby=${params.orderby}`)
  }

  const queryString = queryParams.join('&')

  const res: any = await APIRequester({
    apiPath: `/template/?${queryString}`,
    method: "GET",
    token: true,
    data: null,
  });
  const templates: TemplateInterface[] | null = res.data ? res.data : null;
  let error = null;
  if (res.response) {
    if (res.response.data) {
      if (res.response.data.detail) {
        error = res.response.data.detail;
      }
    }
  }
  const marketingTemplates =
    templates &&
    templates.filter(
      (template: TemplateInterface) => template.category === "MARKETING",
    );
  return marketingTemplates ? marketingTemplates : error ? error : res;
}

// --- GET TOTAL TEMPLATES COUNT --- //
export async function GetTotalTemplatesCount() {
  headers["Content-Type"] = "application/json";
  let res: any = await APIRequester({
    apiPath: `/template/count/`,
    method: "GET",
    token: true,
    data: null,
  });
  return res.data.total_templates;
}

export async function DeleteTemplate(template_id: string) {
  headers["Content-Type"] = "application/json";
  const res: any = await APIRequester({
    apiPath: `/template/${template_id}`,
    method: "DELETE",
    token: true,
    data: null,
  });
  return res.data;
}

export async function CreateTemplate(data: TemplateInterface) {
  headers["Content-Type"] = "application/json";
  const res: any = await APIRequester({
    apiPath: `/template/`,
    method: "POST",
    token: true,
    data: data,
  });
  return res.data;
}

export async function UploadMediaIntoTemplate(template_id: string, data: any) {
  headers["Content-Type"] = "multipart/form-data";
  const res: any = await APIRequester({
    apiPath: `/template/${template_id}/file`,
    method: "POST",
    token: true,
    data: data,
  });
  return res.data;
}

// --- CONTROLE DE ATENDIMENTOS --- //
export async function GetControleAtendimentos() {
  // header['Content-Type'] = 'application/json';
  // const res = await makeRequest('GET', `/controle-atendimentos/`, null);
  // return res.data;
  return [];
}

// --- CONTADOR DE ATENDIMENTOS --- //
export async function GetControleAtendimentosTotalCredits() {
  // header['Content-Type'] = 'application/json';
  // const res = await makeRequest('GET', `/controle-atendimentos/counter-credit/`, null);
  // return res.data;
}

// --- ADMIN --- //
export async function GetEmpresaAsAdmin() {
  // header['Content-Type'] = 'application/json';
  // const res = await makeRequest('GET', `/admin/empresa/`, null);
  // return res.data;
}

export async function GetUsersAsAdmin() {
  // header['Content-Type'] = 'application/json';
  // const res = await makeRequest('GET', `/auth/users/list/`, null);
  // return res.data;
}

export async function UpdateUserAsAdmin(user_id: any, data: any) {
  // header['Content-Type'] = 'application/json';
  // const res = await makeRequest('PATCH', `/auth/users/${user_id}/`, data);
  // return res.data;
}
export async function UpdateEmpresaAsAdmin(empresa_id: any, data: any) {
  // header['Content-Type'] = 'application/json';
  // const res = await makeRequest('PATCH', `/admin/empresa/${empresa_id}/`, data);
  // return res.data;
}

// --- GET SMART REGISTRATIONS --- //
export async function GetSmartRegistrations() {
  headers["Content-Type"] = "application/json";
  const res: any = await APIRequester({
    apiPath: `/smart-registration/`,
    method: "GET",
    token: true,
    data: null,
  });
  const smartRegistrations: SmartQuestionsInterface = res.data;
  return smartRegistrations;
}

// --- CREATE SMART REGISTRATIONS --- //
export async function CreateSmartRegistration(data: any) {
  headers["Content-Type"] = "application/json";
  const res: any = await APIRequester({
    apiPath: `/smart-registration/`,
    method: "POST",
    token: true,
    data: data,
  });
  return res.data;
}

// --- UPDATE SMART REGISTRATIONS --- //
export async function UpdateSmartRegistration(
  smart_registration_id: any,
  data: any,
) {
  headers["Content-Type"] = "application/json";
  const res: any = await APIRequester({
    apiPath: `/smart-registration/${smart_registration_id}`,
    method: "PATCH",
    token: true,
    data: data,
  });
  return res.data;
}

// --- DELETE SMART REGISTRATIONS --- //
export async function DeleteSmartRegistration(smart_registration_id: any) {
  headers["Content-Type"] = "application/json";
  const res: any = await APIRequester({
    apiPath: `/smart-registration/${smart_registration_id}`,
    method: "DELETE",
    token: true,
    data: null,
  });
  return res.data;
}

// --- UPDATE SMART REGISTRATIONS ORDER --- //
export async function UpdateSmartRegistrationOrder(
  data: SmartQuestionInterface[],
) {
  headers["Content-Type"] = "application/json";
  const res: any = await APIRequester({
    apiPath: `/smart-registration/updatelist_order_question/`,
    method: "PATCH",
    token: true,
    data: data,
  });
  return res.data;
}

// --- GET SMART REGISTRATIONS LOGS --- //
export async function GetSmartRegistrationLogs(
  buyer_id?: string,
  limit?: number,
  offset?: number,
) {
  headers["Content-Type"] = "application/json";
  const res: any = await APIRequester({
    apiPath: `/smart-registration/log?limit=${limit}&offset=${offset}&buyer_id=${buyer_id}`,
    method: "GET",
    token: true,
    data: null,
  });
  return res.data;
}

// --- GET FOLLOW UPS --- ///
export async function GetFollowUps() {
  headers["Content-Type"] = "application/json";
  const res: any = await APIRequester({
    apiPath: `/follow-up/`,
    method: "GET",
    token: true,
    data: null,
  });
  return res.data;
}

// --- CREATE FOLLOW UP --- //
export async function CreateFollowUp(data: FollowUpInterface) {
  headers["Content-Type"] = "application/json";
  const res: any = await APIRequester({
    apiPath: `/follow-up/`,
    method: "POST",
    token: true,
    data: data,
  });
  return res.data;
}

// --- UPDATE FOLLOW UP --- //
export async function UpdateFollowUp(
  follow_up_id: any,
  data: FollowUpInterface,
) {
  headers["Content-Type"] = "application/json";
  //remove id, created_at and updated_at from data
  delete data.id;
  delete data.created_at;

  const res: any = await APIRequester({
    apiPath: `/follow-up/${follow_up_id}`,
    method: "PATCH",
    token: true,
    data: data,
  });
  return res.data;
}

// --- DELETE FOLLOW UP --- //
export async function DeleteFollowUp(follow_up_id: any) {
  headers["Content-Type"] = "application/json";
  const res: any = await APIRequester({
    apiPath: `/follow-up/${follow_up_id}`,
    method: "DELETE",
    token: true,
    data: null,
  });
  return res.data;
}

// --- TRIGGER FOLLOW UP --- //
export async function TriggerFollowUp(type_follow_up: any) {
  headers["Content-Type"] = "application/json";
  const res: any = await APIRequester({
    apiPath: `/follow-up/trigger?type_follow_up=${type_follow_up}`,
    method: "POST",
    token: true,
    data: null,
  });
  return res.data;
}

// --- GET DASHBOARD --- //
export async function GetDashboard() {
  headers["Content-Type"] = "application/json";
  const res: any = await APIRequester({
    apiPath: `/dashboard/`,
    method: "GET",
    token: true,
    data: null,
  });
  const dashboard: DashboardInterface = res.data;
  return dashboard;
}

// --- GET FLOWSTATES --- //
export async function GetFlowStates() {
  headers["Content-Type"] = "application/json";
  const res: any = await APIRequester({
    apiPath: `/state-machine/`,
    method: "GET",
    token: true,
    data: null,
  });
  const flowStates: FlowInterface[] = res.data;
  return flowStates;
}

// --- EDIT FLOWSTATE --- //
export async function UpdateFlowState(flowStateId: string, data: any) {
  headers["Content-Type"] = "application/json";
  const res: any = await APIRequester({
    apiPath: `/state-machine/${flowStateId}/`,
    method: "PUT",
    token: true,
    data: data,
  });
  return res.data;
}

// --- DELETE FLOWSTATE --- //
export async function DeleteFlowState(flowStateId: string, data: any) {
  headers["Content-Type"] = "application/json";
  const res: any = await APIRequester({
    apiPath: `/state-machine/${flowStateId}`,
    method: "DELETE",
    token: true,
    data: data,
  });
  return res.data;
}

// --- CREATE FLOWSTATE --- //
export async function CreateFlowState(data: FlowInterface, order: number) {
  data.order_question = order;
  data.update_at = new Date().toISOString();
  data.created_at = new Date().toISOString();
  data.completed = false;
  data.is_active = true;
  headers["Content-Type"] = "application/json";
  const res: any = await APIRequester({
    apiPath: `/state-machine/`,
    method: "POST",
    token: true,
    data: data,
  });
  return res.data;
}

// --- UPDATE FLOWSTATE ORDER --- //
export async function UpdateFlowStateOrder(
  data: { id: string; name: string; order_question: number }[],
) {
  headers["Content-Type"] = "application/json";
  const res: any = await APIRequester({
    apiPath: `/state-machine/update_order_list`,
    method: "PATCH",
    token: true,
    data: data,
  });
  return res.data;
}


// -- UPLOAD PRODUCTS -- //
export async function UploadProducts(data: any) {
  headers["Content-Type"] = "multipart/form-data";
  const res: any = await APIRequester({
    apiPath: `/training/document-ai/table-products`,
    method: "POST",
    token: true,
    data: data,
  });
  return res.data;
}


// -- DELETE DOCUMENT AI FILE -- //
export async function DeleteDocumentAIFile(product_id: string) {
  headers["Content-Type"] = "multipart/form-data";
  const res: any = await APIRequester({
    apiPath: `/training/document-ai/processed-documents/${product_id}`,
    method: "DELETE",
    token: true,
    data: null,
  });
  return res.data;
}

// -- UPLOAD FAQ -- //
export async function UploadFAQ(data: any) {
  headers["Content-Type"] = "multipart/form-data";
  const res: any = await APIRequester({
    apiPath: `/training/document-ai/faq`,
    method: "POST",
    token: true,
    data: data,
  });
  return res.data;
}

// -- GET Document Ai Files -- //
export async function GetDocumentAiFiles() {
  headers["Content-Type"] = "application/json";
  const res: any = await APIRequester({
    apiPath: `/training/document-ai/processed-documents`,
    method: "GET",
    token: true,
    data: null,
  });
  return res.data;
}

// -- GET OR CREATE CRM PARAMETERS --//
export async function GetCrmParameters() {
  headers["Content-Type"] = "application/json";
  const res: any = await APIRequester({
    apiPath: `/parameters/`,
    method: "GET",
    token: true,
    data: null,
  });
  const parameters: CRMConfigInterface = res.data;
  return parameters;
}

// -- UPDATE CRM PARAMETERS --//
export async function UpdateCrmParameters(data: any) {
  headers["Content-Type"] = "application/json";
  //add seller_id to data
  const ls = localStorage.getItem("bren_empresa");
  if (!ls) {
    return null;
  }
  data.seller_id = JSON.parse(ls).id;
  const res: any = await APIRequester({
    apiPath: `/parameters/`,
    method: "PUT",
    token: true,
    data: data,
  });
  const parameters: CRMConfigInterface = res.data;
  return parameters;
}

// -- GET BUYER EVENTS --//
export async function GetBuyerEvents(buyer_id: string, offset: number, limit: number) {
  headers["Content-Type"] = "application/json";
  const res: any = await APIRequester({
    apiPath: `/event/buyer/${buyer_id}?limit=${limit}&offset=${offset}`,
    method: "GET",
    token: true,
    data: null,
  });
  const buyerEvents: BuyerEventsInterface = res.data;
  return buyerEvents;
}

// -- GET SALES STAGE --//
export async function GetSalesStage(searchParams: any, pagination?: any) {

  if (!searchParams) {
    searchParams = {
      search: "",
      collaborator: "",
      tag_id: "",
      free_talk: "",
      billing_window: "",
      offset: "0",
      date_min: "",
      date_max: "",
      smart_registration: null,
    };
  }

  if(searchParams.date_min===null || searchParams.date_min===undefined || searchParams.date_min===""){
    searchParams.date_min = "";
    searchParams.date_max = "";
  }

  function inverterDiaMes(data:string) {
    // Divide a data em dia, mês e ano
    if(data===""){
      const dataInvertida = "";
      return dataInvertida;
    }

    const partes = data.split('-');
    
    // Inverte o dia com o mês
    const dataInvertida = partes[1] + '-' + partes[0] + '-' + partes[2];
    
    return dataInvertida;
  } 

  const date_min_formatted = searchParams.date_min?searchParams.date_min:"";
  const date_max_formatted = searchParams.date_max?searchParams.date_max:"";
  headers["Content-Type"] = "application/json";
  const res: any = await APIRequester({
    apiPath:
      "/sales-stage/stages?search=" +
      searchParams.search +
      "&collaborator=" +
      searchParams.collaborator +
      "&tag_id=" +
      searchParams.tag_id +
      "&free_talk=" +
      searchParams.free_talk.toString() +
      "&billing_window=" +
      searchParams.billing_window.toString() +
      "&created_at_in=" +
      (date_min_formatted) +
      "&created_at_until=" +
      (date_max_formatted) +
      "&limit_size=" +
      (pagination && pagination.limit_size ? pagination.limit_size : 10) +
      "&offset=" +
      searchParams.offset +
      ((searchParams.smart_registration !== null && searchParams.smart_registration !== undefined)?"&smart_registration_status_completed="+searchParams.smart_registration:""),
    method: "GET",
    token: true,
    data: null,
  });
  const salesStage: any = res.data;
  return salesStage;
}

// -- CREATE SALES STAGE --//
export async function CreateSalesStage(data: any) {
  headers["Content-Type"] = "application/json";
  const payload = {
    title: data.stage_name,
    description: "",
    order: data.order,
    color: data.color,
  };
  const res: any = await APIRequester({
    apiPath: `/sales-stage/`,
    method: "POST",
    token: true,
    data: payload,
  });
  return res.data;
}

// -- UPDATE SALES STAGE --//
export async function UpdateSalesStage(data: any, sales_stage_id: string) {
  headers["Content-Type"] = "application/json";

  const payload = {
    title: data.stage_name,
    description: "",
    order: data.order,
    color: data.color,
  };

  const res: any = await APIRequester({
    apiPath: `/sales-stage/${sales_stage_id}`,
    method: "PATCH",
    token: true,
    data: payload,
  });
  return res.data;
}

// -- ADD BUYER TO STAGE --//
export async function AddBuyersToStage(
  buyer_id_list: string[],
  sales_stage_id: string,
) {
  headers["Content-Type"] = "application/json";
  const payload = {
    buyer_id_list: buyer_id_list,
    sales_stage_id: sales_stage_id,
  };
  const res: any = await APIRequester({
    apiPath: `/sales-stage/add-stage`,
    method: "POST",
    token: true,
    data: payload,
  });
  return res.data;
}

// -- GET PRIORITY BUYERS --//
export async function GetPriorityBuyers(filters: BuyerPrioritySearchInterface) {
  headers["Content-Type"] = "application/json";
  const res: any = await APIRequester({
    apiPath: `/buyer/priority/?search=${filters.search}&limit=${filters.limit}&offset_min=${filters.offset_min}&offset_max=${filters.offset_max}&orderby=${filters.orderby}`,
    method: "GET",
    token: true,
    data: null,
  });

  const priorityBuyers: Buyer[] = res.data;
  return priorityBuyers;
}

// -- GET PRIORITY BUYERS COUNT --//
export async function GetPriorityBuyersCount() {
  headers["Content-Type"] = "application/json";
  const res: any = await APIRequester({
    apiPath: `/buyer/count/priority/`,
    method: "GET",
    token: true,
    data: null,
  });

  return res.data.total_priorities;
}

// -- GET SALE STAGE BUYER DETAIL --//
export async function GetBuyerDetailsOnSaleStage(id: string) {
  headers["Content-Type"] = "application/json";
  const res: any = await APIRequester({
    apiPath: `/buyer/sale-stage-details/${id}/`,
    method: "GET",
    token: true,
    data: null,
  });

  const buyerDetail: any = res.data;
  return buyerDetail;
}

// -- GET HISTORY CHANGES --//
export async function GetHistoryChanges() {

  headers["Content-Type"] = "application/json";
  const res: any = await APIRequester({
    apiPath: `/collaborator/changes`,
    method: "GET",
    token: true,
    data: null,
  });
  let historyChanges: HistoriesChangesInterface = res.data;
  historyChanges.items.forEach((h:HistoryChangesInterface) => {
    h.oldAction = h.actions;
    h.actions = TranslateSellerHistoryTerm(h, h.actions, "action");
    h.categoria = TranslateSellerHistoryTerm(h, h.app, "categoria");
    h.app = TranslateSellerHistoryTerm(h, h.app, "icon");
    h.created_at = new Date(h.created_at).getTime();
  });

  historyChanges.items = historyChanges.items.sort((a:any, b:any) => b.created_at - a.created_at);

  return historyChanges;
}

// -- GET CREDITS ANALYTICS --//
export async function GetCreditsAnalytics({month="0", year="0"}: {month: string, year: string}) {
  headers["Content-Type"] = "application/json";
  const res: any = await APIRequester({
    apiPath: `/wallet/subscription/analytics?month=${month}&year=${year}`,
    method: "GET",
    token: true,
    data: null,
  });
  const creditsAnalytics: CreditChartDataInterface = res.data;
  return creditsAnalytics;
}

// -- GET CREDITS SUMMARY --//
export async function GetCreditsSummary() {
  headers["Content-Type"] = "application/json";
  const res: any = await APIRequester({
    apiPath: `/wallet/subscription/summary`,
    method: "GET",
    token: true,
    data: null,
  });
  const creditsSummary: CreditSummaryInterface = res.data;
  return creditsSummary;
}

// -- GET CREDITS SUMMARY --//
export async function GetCreditsExtract({view, limit, page_number}: {view: string, limit: number, page_number: number}) {
  headers["Content-Type"] = "application/json";
  const res: any = await APIRequester({
    apiPath: `/wallet/subscription/extract?view=${view}&limit=${limit}&page_number=${page_number}`,
    method: "GET",
    token: true,
    data: null,
  });
  const creditsExtract: CreditExtractsInterface = res.data;
  return creditsExtract;
}

// -- CREATE CREDIT RESERVE -- //
export async function CreateCreditReserve() {
  headers["Content-Type"] = "application/json";
  const res: any = await APIRequester({
    apiPath:  `/wallet/checkout/session/add-postpaid-credits`,
    method: "POST",
    token: true,
    data: null,
  });
  return res;
}

//--------------------------------------------------------------//
////////////////////// AUTHENTICATION HELPERS ////////////////////
//--------------------------------------------------------------//

//Check if user has a valid jwt token
export function isLoggedIn() {
  if (typeof window === "undefined") return;
  const token = Cookies.get("jwt");

  if (!token) {
    if (window.location.pathname !== "/login") {
      window.location.href = "/login?expired=true";
    }

    return false;
  } else {
    //if it does and if the user is on the login page, redirect to the clients
    if (window.location.pathname === "/login") {
      window.location.href = "/platform/clientes";
    }
    return true;
  }
}

//Clear localStorage and cookies
export function ClearStorage() {
  Cookies.remove("jwt");
  Cookies.remove("permissions");
  localStorage.removeItem("bren_user");
  localStorage.removeItem("bren_empresa");
  localStorage.removeItem("sale_step_buyers_pagination");
  localStorage.removeItem("temporarySearchParams");
}

//Check if user is superuser
export function IsSuperUser(
  is_permission_for_superuser: boolean,
  collaborator?: Collaborator,
): boolean {
  if (typeof window === "undefined") return false;
  if (!collaborator) {return false;}

  if (is_permission_for_superuser) {
    if (collaborator.is_superuser) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}

//Show Platform Message
export function SendPlatformMessage(text: string, isError = false) {
  if (text !== "") {
    if (typeof text !== "string") {
      text = "Erro: Processo não concluído. Favor tentar novamente mais tarde";
    }

    //guarante that this method call will only happen on the client-side
    if (typeof window === "undefined") return;

    //turn the text into a crypto hash
    const hash = crypto.createHash("md5").update(text).digest("hex");
    //check if the message is already on the screen
    if (document.getElementById(hash)) return;

    const messageContainer: any = document.getElementById("mensagens");
    const platformMessagesNode = document.createElement("div");
    platformMessagesNode.style.width = "100%";
    platformMessagesNode.style.display = "flex";
    platformMessagesNode.style.justifyContent = "center";

    createRoot(platformMessagesNode).render(
      // @ts-ignore
      <PlatformMessages id={hash} text={text} isError={isError} />,
    );

    messageContainer.appendChild(platformMessagesNode);

    document.body.style.overflow = "auto";
  }
}

// Get CNPJ INFO
export async function GetCNPJInfo(cnpj: string) {
  //keep only numbers
  cnpj = cnpj.replace(/\D/g, "");
  //check if has 14 numbers
  if (cnpj.length !== 14) {
    return;
  }
  //to int
  const empresa = await consultarCNPJ(
    cnpj,
    process.env.NEXT_PUBLIC_CNPJWS_TOKEN,
  )
    .then((res: any) => {
      return res;
    })
    .catch((error: any) => {
      SendPlatformMessage(error.detalhes, true);
      return error;
    });
  return empresa;
}

// Get DDD
export function GetDDD(number: any) {
  // Remove todos os caracteres não numéricos do número
  const cleanedNumber = number.replace(/\D/g, "");

  // Use uma expressão regular para extrair o DDD
  const match = cleanedNumber.match(/^(?:\+55|55)?\s?\(?(\d{2})\)?/);

  if (match && match[1]) {
    return match[1];
  } else {
    return "DDD não encontrado";
  }
}

// Is Time Expired
export function IsTimeExpirated(time: any) {
  if (!time) return false;

  const now = new Date();
  const end = new Date(time);
  const start = new Date(time);

  return now <= end;
}

export function GetInitials(name: string) {
  //Get the first letter of the first and last name
  var initials: any = name.match(/\b\w/g) || [];
  //Join the letters
  initials = ((initials.shift() || "") + (initials.pop() || "")).toUpperCase();
  return initials;
}

export function RecordEditingProgress(isEditing: boolean) {
  if (typeof window === "undefined") return false;
  if (isEditing) {
    localStorage.setItem("bren_is_editing", "true");
  } else {
    if (localStorage.getItem("bren_is_editing")) {
      localStorage.removeItem("bren_is_editing");
    }
  }
}

export function GetEditingProgress() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("bren_is_editing");
}

export function CheckDisparoStatus(disparo: Campaign) {
  interface StatusInterface {
    name: string;
    mainColor: string;
    icon: string;
    color: string;
    bg: string;
    description: string;
  }
  const error: StatusInterface = {
    name: "Erro no Disparo",
    mainColor: "bg-red",
    icon: "times",
    color: "!text-white",
    bg: "!bg-red",
    description: `Erro no disparo — Tentativa feita em ${moment(disparo?.updated_at).format("DD/MM/YYYY")} às ${moment(disparo?.updated_at).format("HH:mm")}`,
  };
  const sent: StatusInterface = {
    name: "Disparado",
    mainColor: "bg-[green]",
    icon: "paper-plane",
    color: "dark:!text-black !text-white",
    bg: "bg-gradient-primary-horizontal",
    description: `Disparada em ${moment(disparo?.send_date).format("DD/MM/YYYY")} às ${moment(disparo?.send_date).format("HH:mm")}`,
  };
  const draft: StatusInterface = {
    name: "Rascunho",
    mainColor: "dark:bg-cloudy-blue/25 bg-light-grey",
    icon: "pencil",
    color: "dark:text-white  text-black",
    bg: "border border-cloudy-blue/50 dark:border-white/50 bg-cloudy-blue/25 dark:bg-tall-grey",
    description: `Em Rascunho — Atualizado em ${moment(disparo?.updated_at).format("DD/MM/YYYY")} às ${moment(disparo?.created_at).format("HH:mm")}`,
  };
  const scheduled: StatusInterface = {
    name: "Agendada",
    mainColor: "!bg-yellow",
    icon: "clock",
    color: "!text-black",
    bg: "!bg-yellow",
    description: `Agendada para ${moment(disparo?.scheduling_date).format("DD/MM/YYYY")} às ${moment(disparo?.scheduling_date).format("HH:mm")}`,
  };

  const isSchedulingDateExpired = (date: any) => {
    if (!date) {
      return false;
    }
    if (moment(date).isBefore(moment())) {
      return true;
    }
  };

  if (disparo?.send_date) {
    return sent;
  }
  if (disparo?.draft) {
    return draft;
  }

  if (disparo?.scheduling_date) {
    if (isSchedulingDateExpired(disparo?.scheduling_date)) {
      return sent;
    }
    if (!isSchedulingDateExpired(disparo?.scheduling_date)) {
      return scheduled;
    }
  } else {
    return error;
  }

  return error;
}

export default function currencyFormatter(value: number) {
  if (!Number(value)) return "";

  const amount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value / 100);

  return `${amount}`;
}

export function GetIdFromUrl() {
  let url = new URL(window.location.href);
  let params = url.searchParams;
  let id = params.get("id") ? (params.get("id") === "null" ? "" : params.get("id")) : "";
  return id;
}
