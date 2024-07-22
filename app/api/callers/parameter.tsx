import request from "../apiRequester";


export interface Parameter {
  crm: {
    hubspot: {
      actions: {
        create_contact: boolean,
        sync_hubspot_plataform: boolean,
        sync_plataform_hubspot: boolean,
        update_contact: boolean
      },
      active: boolean,
      api_key: string,
      logo: string
    }
  },
  buyer: {
    basic_information: {
      business_type: boolean,
      cnpj: boolean,
      cpf: boolean,
      company_name: boolean,
      company_size: boolean,
      contact_reference: boolean,
      founding_date: boolean,
      industry_sector: boolean,
      state_registration: boolean,
      trading_name: boolean,
      website: boolean
    },
    contact: {
      cellphone: boolean,
      commercial_phone: boolean,
      contact_name: boolean,
      department: boolean,
      email: boolean,
      linkedin: boolean,
      position: boolean
    },
    address: {
      city: boolean,
      commercial_address: boolean,
      country: boolean,
      neighborhood: boolean,
      state: boolean,
      zip_code: boolean
    }
  },
  id: string,
  created_at: string,
  updated_at: string
}

//GET PARAMETERS
export const getParameters = async ()  => {
  return request<Parameter>('/parameter/', 'GET');
}

//PUT PARAMETERS
export const updateParameters = async (parameter: Parameter) => {
  return request<Parameter>('/parameter/', 'PUT', parameter);
}