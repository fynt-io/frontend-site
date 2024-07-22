import { Buyer } from "../api/callers/buyer";
import { Conversation } from "../api/callers/conversation";
import { Tag } from "../api/callers/tag";

export interface MenuLink {
  name: string;
  link: string;
  icon: string;
  iconActive: string;
  superuser: boolean;
}

export interface CollaboratorInterface {
  id?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  email: string;
  phone?: string;
  seller_id?: string;
  password?: string;
  repeat_password?: string;
  accept_terms?: boolean;
  is_superuser?: boolean;
  responsible_for_buyer?: boolean;
}

export interface SellerInterface {
  id?: string;
  is_onboarding_completed?: boolean;
  trading_name?: string;
  cnpj?: string;
  company_name?: string;
  representant_name?: string;
  logo?: string;
  representant_image?: string;
  whatsapp_number?: string;
  meta_id?: string;
  created_at?: string;
  update_at?: string;
  is_active?: boolean | null;
  display_name?: string;
  whatsapp_about?: string;
  smart_registration_activate?: boolean;
  wallet?: Wallet;
  balance_credits?: number;
  count_billing_windows?: number;
  main_activity?: string;
  ddd?: string;
  collaborator?: {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    new_password: string;
    confirm_password: string;
    is_superuser: boolean;
  };
  allowed_new_conversation?: boolean;
}

export interface Credit {
  id: string;
  type: string;
  amount: number;
  wallet: string;
  created_at: string;
  expires_at: string;
  buyer?: Partial<Buyer>;
}

export interface Subscription {
  id: string;
  description: string;
  payment_email: string;
  payment_phone: string;
  total_paid: number;
  wallet: string;
  period_start: string;
  period_end: string;
  provider_subscription_id: string;
  interval_count: number;
  interval: string;
  invoice_pdf: string;
  provider_customer: string;
  setup_intent: string;
  payment_intent: string;
  created_at: string;
}

export interface Wallet {
  open_postpaid?: boolean;
  balance_reserve_credits: number;
  balance_additional_credits: number;
  balance_subscription_credits: number;
  total_credits: number;
  total_reserve_credits: number;
  total_additional_credits: number;
  total_subscription_credits: number;
  credits: Credit[];
  charges: Credit[];
  subscription: Subscription;
  id: string;
  seller: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  cards?: any;
  billing_method?: any;
}


export interface BuyerSearchFilter {
  search: string;
  tag_id: string;
  buyers?: string;
  free_talk: string;
  billing_window: string;
  orderby: string;
  limit: string;
  offset: string;
  filed: boolean;
  limit_size: number;
  offset_min: number;
  offset_max: number;
  date_min?: string;
  date_max?: string;
  smart_registration?: boolean | null;
}

export interface CampaignSearchFilter {
  search: string;
  tag_id?: string;
  limit: string;
  offset: string;
  orderby: string;
  offset_min: number;
  offset_max: number;
}

export interface CampaignEstimates {
  amount_free: number;
  monetary_investment: number;
  service_monetary_investment: number;
  marketing_monetary_investment: number;
  amount_credits_available: number;
  amount_credits_to_be_consumed: number;
  amount_credits_available_after_submitted: number;
}

export interface EmpresaConfigInterface {
  nome_representante: string;
  numero_whatsapp: string;
  whatsapp_id: string;
  apresentacao_representante: string;
  piloto_automatico_padrao: boolean;
  mensagem_abordagem: string;
  mensagem_resposta: string;
  template_mensagem_abordagem: string;
  template_mensagem_resposta: string;
  access_token?: string;
  meta_id?: string;
  id?: string;
  empresa_id?: string;
  catalogo?: string;
  imagem_representante: string;
  dt_criacao?: string;
  dt_alteracao?: string;
  user_id_criacao?: string;
  user_id_alteracao?: string;
  excluido?: boolean;
}

export interface AtendimentoInterface {
  active?: boolean;
  auto_created?: boolean;
  auto_pilot?: boolean;
  created_at?: string;
  created_by_user?: string | null;
  customer_id?: string;
  display_name?: string;
  excluded?: boolean;
  free_talk?: any;
  billing_window?: any;
  id?: string;
  last_message?: {
    atendimento_id: string;
    tipo_mensagem: string;
    mensagem_original: string;
    components: any[];
    // Add more properties as needed
  };
  not_viewed?: any;
  status: string;
  updated_at?: string;
  updated_by_user?: string | null;
}

interface ResumeTriggers {
  total: number
  reach: number
  not_reached: number
}

export interface CampaignInterface {
  title: string;
  content?: string;
  scheduling_date?: string | null;
  send_date?: string | null;
  template_id?: string | null;
  media_url?: string | null;
  media_type?: string | null;
  id?: string;
  seller_id?: string;
  created_at?: string;
  update_at?: string;
  buyers_count?: number;
  buyer_list?: string[];
  buyers?: Buyer[];
  triggers?: TriggerInterface[];
  resume_triggers?: ResumeTriggers;
  draft?: boolean;
  collaborator_id?: string;
  campaing_buyers?: Buyer[];
  all_base?: boolean;
}

export interface TriggerInterface {
  buyer: Buyer;
  status: MessageStatusInterface[];
  id: string;
  campaing: string;
  message: string;
  result: string;
  created_at: string;
  updated_at: string;
}

export interface MessageStatusInterface {
  id?: string;
  status?: string;
  errors?: any;
  timestamp?: string;
  pricing_type?: string;
  pricing_origin_type?: string;
  billable_expiration_timestamp?: string;
  provider_conversation_id?: string;
  created_at?: string;
}

export interface CampaignsInterface {
  items: CampaignInterface[];
  count: number;
}

interface TemplateComponents {
  type: string;
  parameters: Array<{
    type: string;
    text: string;
  }>;
}

export interface TemplateInterface {
  id?: string;
  is_active?: boolean;
  created_at?: string;
  update_at?: string;
  provider_template_id?: string;
  template_name?: string;
  media_url?: string;
  media_type?: string;
  text?: string;
  seller?: string;
  status?: string;
  locale?: string;
  category?: string;
  footer?: string;
  total_templates?: number;
  rejected_reason?: string;
  buttons?: Array<{
    id?: string;
    content: string;
    template?: string;
  }>;
}

export interface TemplateQueryParamsInterface {
  status: string;
  search: string;
  orderby: string;
  offset_min: number;
  offset_max: number;
}

export function NewTemplate(templateType: string): TemplateInterface {
  return {
    template_name: '',
    media_url: '',
    media_type: '',
    text: '',
    locale: 'pt_BR',
    category: 'MARKETING',
    footer: '',
    buttons: [],
  };
}

export interface CreditInterface {
  credit: number;
  total_credit: number;
  type: string;
  due_date: string;
  seller_id: string;
  id: string;
  dt_criacao: string;
  dt_atualizacao: string;
}

export interface NotificationInterface {
  title: string;
  content: string;
  url: string;
  seller_id: string;
  id?: string;
  created_at?: string;
  data?: string;
  updated_at?: string;
  excluido?: boolean;
  view: boolean;
  icon?: string;
  error?: boolean;
}

export interface NotificationsInterface {
  notifications: NotificationInterface[];
  pagination: {
    has_next: boolean;
    has_previous: boolean;
    items_per_page: number;
    next_page_number: number;
    page_number: number;
    previous_page_number: number;
    total_items: number;
  };
  unread_count: number;
}

export interface CreditTotalCounterInterface {
  credit: number;
  total_credit: number;
  type: string;
  due_date: string;
}

export interface MessageSearchInterface {
  search: string;
  limit?: number;
  offset?: number;
}

export interface MessageInterface {
  id?: string;
  template?: TemplateInterface;
  content: string;
  type: string;
  number_to: string;
  number_from: string;
  media: any;
  metadata?: { buttons?: [{ id: string; title: string }] };
  caption: string;
  provider_message_id: string;
  provider_timestamp: string;
  template_name: string;
  conversation: string;
  conversation_id?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  components?: any;
  statuses: [
    { id: string; status: string; errors: [{ code: string; title: string }] },
  ];
  viewed?: boolean;
  origin?: string;
}

export interface MessagesInterface {
  items: MessageInterface[];
  count: number;
}
export interface SmartQuestionInterface {
  id?: string;
  question: string;
  value_buyer: string;
  seller_id?: string;
  order_question?: number;
  created_at?: string;
  updated_at?: string;
}

export interface SmartQuestionsInterface {
  items: SmartQuestionInterface[];
  count: number;
}

export interface SmartQuestionsAnswerInterface {
  smart_registration?: SmartQuestionInterface;
  smart_registration_id?: string;
  answer: string;
  created_at?: string;
  updated_at?: string;
}
export interface SmartQuestionsAnswersInterface {
  items: SmartQuestionsAnswerInterface[];
  count: number;
}

export interface FollowUpInterface {
  id?: string;
  category?: string;
  time_interval: { [key: string]: number };
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface DashboardInterface {
  total_conversations: number;
  total_buyers: number;
  media_message_per_convesation: number;
  conversations_with_free_talk: number;
  conversations_without_free_talk: number;
  conversations_with_billing_window: number;
  conversations_without_billing_window: number;
  conversations_over_24h: number;
  conversations_less_than_24h: number;
  buyer_interactions_less_24h: number;
  buyer_interactions_over_24h: number;
  last_12_months_messages: Array<{ [key: string]: number }>;
}

export interface TabSectionInterface {
  name: string;
  slug: string;
  parentSlug?: string;
  counter?: number | null;
  superuser?: boolean;
  discount?: number;
  info?: string;
}

export interface FlowInterface {
  id?: string;
  is_active: boolean;
  name?: string;
  description?: string;
  order_question?: number;
  auto_pilot: boolean;
  autopilot_condition_off?: string | null;
  autopilot_condition_on?: string | null;
  qualification?: string;
  ai_answer?: string;
  fixed: boolean;
  mandatory?: boolean;
  updated_at?: string;
  update_at?: string;
  completed?: boolean;
  created_at?: string;
  hidden?: boolean;
  advance_step?: boolean;
  smart_registration_id?: string;
  selected_condition?: boolean;
  send_file?: string[];
  send_file_condition?: boolean
}

export interface ConversationStagesInterface {
  title: string;
}


export interface BrenPriceTier {
  min: number;
  max: number;
  monthly: number;
  semi_annual: number;
  annual: number;
}

export interface LeadInterface {
  cnpj?: string;
  company_name?: string;
  email?: string;
  phone?: string;
  trading_name?: string;
  busines_type?: string;
  cpf?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CRMIntegration {
  name?: string;
  description?: string;
  actions?: any;
  active?: boolean;
  api_key?: string;
  logo?: string;
}

export interface CRMConfigInterface {
  id?: string;
  crm: any;
  buyer: {
    buyer: {
      company_name: boolean;
      trading_name: boolean;
      name: boolean;
      cnpj: boolean;
      main_activity: boolean;
      email: boolean;
      cpf: boolean;
    };
    basic_informations: {
      business_type: boolean;
      city_registration: boolean;
      company_name: boolean;
      company_size: {
        annual_revenue: boolean;
        number_of_employees: boolean;
      };
      contact_reference: boolean;
      founding_date: boolean;
      industry_sector: boolean;
      state_registration: boolean;
      website: boolean;
    };
    contacts: {
      cellphone: boolean;
      commercial_phone: boolean;
      contact_name: boolean;
      department: boolean;
      email: boolean;
      linkedin: boolean;
      position: boolean;
    };
    addresses: {
      city: boolean;
      commercial_address: boolean;
      country: boolean;
      neighborhood: boolean;
      state: boolean;
      zip_code: boolean;
    };
    sales_informations: {
      available_payment_conditions: boolean;
      generated_revenue: boolean;
      last_purchase_value: boolean;
      number_of_orders: boolean;
      payment_history: boolean;
      preferred_payment_method: boolean;
      preferred_shipping_method: boolean;
      products_services_category: boolean;
      purchase_category: boolean;
      purchase_frequency: boolean;
      purchase_history: boolean;
      sales_funnel_stage: boolean;
      sales_opportunities: boolean;
    };
    supports: {
      complaints_and_resolutions: boolean;
      feedback_and_reviews: boolean;
      interaction_history: boolean;
      product_service_feature_suggestions: boolean;
      support_tickets: boolean;
    };
    marketings: {
      campaign_responses: boolean;
      communication_preferences: boolean;
      customer_segmentation: boolean;
      interests: boolean;
      lead_source: boolean;
      targeted_marketing_campaigns: boolean;
    };
    additional_informations: {
      attachments: boolean;
      last_update_date: boolean;
      loyalty_programs: boolean;
      next_contact_meeting_date: boolean;
      notes_and_comments: boolean;
      satisfaction_level: boolean;
      social_media_information: boolean;
      status: boolean;
    };
    financial_datas: {
      annual_revenue: boolean;
      banking_information: boolean;
      credit_history: boolean;
      profitability: boolean;
    };
    legal_datas: {
      compliance_with_specific_sector_regulations: boolean;
      tax_situation: boolean;
    };
  };
  created_at?: string;
  updated_at?: string;
}

export interface CrmFieldInterface {
  category: string; //example: basic_information
  description?: string;
  categoryTitle: string; //example: Informações Básicas
  field: string; //example: company_name
  fieldType: string; //example: text
  fieldTitle: string; //example: Nome da Empresa
  active: boolean; //example: true
  mandatory?: boolean;
  options?: Array<{ name: string; value: string }>;
}

export interface SaleStepBuyerInterface {
  buyer_id: string;
  buyer_name: string;
  trading_name: string;
  tags: string[];
  status: string;
  last_event_title: string;
  last_event_created_at: string;
  conversation_id: string;
  auto_pilot: boolean;
  smart_registration_completed?: boolean;
}

export interface SaleStepInterface {
  stage_id?: string;
  stage_name: string;
  description?: string;
  seller?: SellerInterface;
  order: number;
  color: string;
  created_at?: string;
  updated_at?: string;
  buyers?: SaleStepBuyerInterface[];
  counter?: number;
  total_buyers?: number;
}
export interface BuyerEventInterface {
  title: string;
  description: string;
  responsible: string;
  id: string;
  created_at: string;
  type?: string;
}

export interface BuyerEventsInterface {
  items: BuyerEventInterface[];
  count: number;
}

export interface BuyerPriorityInterface {
  id: string;
  buyer_name: string;
  trading_name: string;
  motive: any;
  tags: string[];
  conversation_id: string;
}

export interface BuyerPrioritySearchInterface {
  search?: string;
  id?: string;
  buyer_name?: string;
  trading_name?: string;
  motive?: string;
  conversation_id?: string;
  tag_name?: string;
  limit?: number;
  offset?: number;
  orderby?: string;
  offset_min: number;
  offset_max: number;
}

export interface BuyersPriorityInterface {
  items: BuyerPriorityInterface[];
  count: number;
}

export interface SellerExpedientInterface {
  monday: {
    active: boolean | null;
    start: string | null;
    end: string | null;
  };
  tuesday: {
    active: boolean | null;
    start: string | null;
    end: string | null;
  };
  wednesday: {
    active: boolean | null;
    start: string | null;
    end: string | null;
  };
  thursday: {
    active: boolean | null;
    start: string | null;
    end: string | null;
  };
  friday: {
    active: boolean | null;
    start: string | null;
    end: string | null;
  };
  saturday: {
    active: boolean | null;
    start: string | null;
    end: string | null;
  };
  sunday: {
    active: boolean | null;
    start: string | null;
    end: string | null;
  };
}

export interface HistoriesChangesInterface {
  items: HistoryChangesInterface[];
  count: number;
}

export interface HistoryChangesInterface {
  [x: string]: any;
  oldAction: string;
  id: string;
  app: string;
  actions: string;
  id_actiond: string;
  state_old: any;
  state_now: any;
  created_at: string | number;
  collaborator_id: number;
  seller_id: string;
  categoria?: string | null;
}

export interface CreditSummaryInterface {
  total_bonus_balance: number;
  total_credits_balance: number;
  total_balance: number;
  simulations: {
    marketing_bonus: number;
    marketing_credit: number;
    marketing_simulation: number;
    service_bonus: number;
    service_credit: number;
    service_simulation: number;
    paid_traffic_simulation: number;
  };
}

export interface CreditsAnalyticsInterface {
  total_services_used: number;
  maximum_service_limit: number;
  chart: CreditChartDataInterface[];
  month: number;
  year: number;
}

export interface CreditChartDataInterface {
  label: string;
  marketing: number;
  service: number;
  paid_traffic: number;
}


export interface CreditUnitInterface {
  title: string;
  buyer: Buyer;
  campaign: CampaignInterface;
  conversation: Conversation;
  id: string;
  amount: number;
  type: string;
  intended_for: string;
  cost: number;
  wallet: string;
  created_at: string;
  expires_at: string;
  category: string;
}

export interface CreditExtractsInterface {
  pagination: {
    has_next: boolean;
    page_number: number;
    total_items: number;
    has_previous: boolean;
    items_per_page: number;
    next_page_number: number;
    previous_page_number: number;
  };
  data: CreditUnitInterface[];
}

export interface TagsSearchFilter {
  search?: string;
  offset_min: number;
  offset_max: number;
}

export interface OnboardingScriptInterface {
  step?: number;
  title?: string;
  statement?: string;
  description?: string;
  children?: React.ReactNode;
  voice?: string;

}

export interface MessageTierInterface {
  tier: number;
  balance_tier: number;
  count_active_messages: number;
  hours_remaining_until_the_next_tier: string;
  latest_billable_expiration_timestamp: string;
}