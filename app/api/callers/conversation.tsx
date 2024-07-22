import request, { ApiResponse } from "../apiRequester";


export interface SendMessage {
  name?: string;
  receiver: string;
  text?: string,
  caption?: string,
  media_type?: string
  template_id?: string;
}

export interface Conversations {
  items: Conversation[];
  total: number;
  total_filed: number;
  total_filtered: number;
}

export interface MessageStatus {
  type: "failed"|"read"|"sent"|"delivered"
  error: {code:number; message:string}[]
}
export interface Message {
  id: string;
  origin: string;
  viewed: boolean;
  header: MessageHeader;
  content: MessageContent;
  statuses: {
    id: string;
    content: {
      status: MessageStatus;
    }
  }[]
  conversation: string;
  created_at: string;
}

export interface MessageHeader {
  user: {
    id: string;
    name: string;
  };
  sender: {
    id: string;
    name: string;
  };
  receiver: {
    id: string;
  };
  messageID: string;
  timestamp: number;
  contentType: string;
}

export interface MessageContent {
  status?: string;
  text: string;
  image?: {
    url?: string;
    link?: string;
    mimeType?: string;
    caption: string;
  }
  IMAGE?: {
    url?: string;
    link?: string;
    mimeType?: string;
    caption: string;
  }
  video?: {
    url?: string;
    link?: string;
    mimeType?: string;
    caption: string;
  }
  VIDEO?: {
    url?: string;
    link?: string;
    mimeType?: string;
    caption: string;
  }
  document?: {
    url?: string;
    link?: string;
    mimeType?: string;
    caption: string;
  }
  DOCUMENT?: {
    url?: string;
    link?: string;
    mimeType?: string;
    caption: string;
  }
  audio?: {
    url?: string;
    link?: string;
    mimeType?: string;
    caption: string;
  }
  AUDIO?: {
    url?: string;
    link?: string;
    mimeType?: string;
    caption: string;
  }
  location?: {
    latitude: number;
    longitude: number;
  }
  notification?: {
    name: string,
    components: {
      type: "header" | "body" | "button";
      parameters:{
        url: string | null;
        text: string | null;
        type: "text" | "image" | "video" | "document" | "audio" | "location" | "button";
        image?: {
          link: string;
          caption: string;
        }
      }[]
    }[]
  }
}

export interface ConversationDetails{
  conversation: Conversation;
  messages: {items:Message[];}
}

export interface Conversation {
  billing_window: any;
  free_talk: any;
  id: string;
  filed: boolean;
  unread_messages: number;
  automatic_pilot: boolean;
  updated_at: string;
  buyer: {
    id: string;
    name:string,
    trading_name:string
    phone: string;
    },
  last_message: {
    statuses: any[];
    id: string;
    header: MessageHeader;
    content: MessageContent;
    origin: string;
    viewed: boolean;
    idempotency_key: string;
    conversation: string;
    created_at: string;
  };
  messages?: {
    items: Message[];
  }
}

  
export interface ConversationFilters {
  orderby?: string;
  search?: string;
  viewed?: string;
  tag_id?: string;
  free_talk?: string;
  billing_window?: string;
  auto_pilot?: string;
  limit?: number;
  offset_min: number;
  offset_max?: number;
  filed?: boolean;
  date_min?: string;
  date_max?: string;
  lastUpdate?: string;
}


//GET CONVERSATIONS
export const getConversations = async (filters?:ConversationFilters) => {
  //function that inverts dd-mm-yyyy to yyyy-mm-dd
  function invertDate(date:any){
    return date.toString().split("-").reverse().join("-");
  }

  return request<Conversations>(`/conversation/?search=${filters?.search ? filters?.search : ""}&orderby=${filters?.orderby ? filters?.orderby : "-created_at"}${filters?.viewed ? `&unread_messages=${filters?.viewed}` : ""}${filters?.tag_id ? `&tag_id=${filters?.tag_id}` : ""}${filters?.free_talk ? `&free_talk=${filters?.free_talk}` : ""}${filters?.billing_window ? `&billing_window=${filters?.billing_window}` : ""}${filters?.auto_pilot ? `&automatic_pilot=${filters?.auto_pilot}` : ""}&offset_min=${filters?.offset_min ? filters?.offset_min : 0}&offset_max=${filters?.offset_max ? filters?.offset_max : 20}&filed=${filters?.filed ? filters?.filed : false}${filters?.date_min ? `&buyer_created_date_min=${invertDate(filters?.date_min)}` : ""}${filters?.date_max ? `&buyer_created_date_max=${invertDate(filters?.date_max)}` : ""}`, 'GET');
}

//GET CONVERSATION BY ID
export const getConversation = async (id:string) => {
  return request<ConversationDetails>(`/conversation/${id}/`, 'GET');
}

//SEND MESSAGE
export const sendMessage = async (message: SendMessage, media?:any) => {
  if (!message.template_id) {
    delete message.template_id
  }
  //mount form data
  const data = new FormData();
  data.append('data', message ? JSON.stringify(message) : '');
  if( media) data.append('media', media);
  
    return request<any>(`/conversation/messages/send/`, 'POST', data, null, "multipart/form-data");
  }


//UPDATE CONVERSATION
export const updateConversation = async (conversation: any) => {
  return request<any>(`/conversation/${conversation.id}/`, 'PATCH', conversation);
}

//DELETE CONVERSATION
export const deleteConversation = async (id: string) => {
  return request<any>(`/conversation/${id}/`, 'DELETE');
}

//CHANGE VIEWS
export const changeConversationViews = async (id: string, amount:string = "all", view:boolean = true) => {
  return request<any>(`/conversation/${id}/messages/change_views/?amount=${amount}&view=true`, 'PATCH');
}
