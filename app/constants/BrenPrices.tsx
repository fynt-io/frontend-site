import { BrenPriceTier } from "./types";

export const BREN_PRICE_FIXED = [
  {
    name:'monthly',
    before: null, 
    now: 1998.99,
    total: 1998.99,
    discount: null
  },
  {
    name:'bi-annual',
    before: 1998, 
    now: 1698.30,
    total: 10189.8,
    discount: 1798.2
  },
  {
    name:'annual',
    before: 1998, 
    now: 1498.5,
    total: 17982,
    discount: 5994
  },
  
]

export const BREN_SERVICES_QUANTITY = {
  defaultTotalQuantity: 1000,
  bonusActive: 250,
  bonusWhatsappClick: 750,
  bonusReceptives: 1000,
}

export const BREN_PRICE: BrenPriceTier[] = [
  { min: 5000, max: 7499, monthly: 0.3996, semi_annual: 0.3396, annual: 0.2996 },
  { min: 7500, max: 9999, monthly: 0.3991, semi_annual: 0.3392, annual: 0.2992 },
  { min: 10000, max: 14999, monthly: 0.3985, semi_annual: 0.3387, annual: 0.2989 },
  { min: 15000, max: 19999, monthly: 0.3973, semi_annual: 0.3377, annual: 0.2980 },
  { min: 20000, max: 29999, monthly: 0.3963, semi_annual: 0.3368, annual: 0.2972 },
  { min: 30000, max: 39999, monthly: 0.3938, semi_annual: 0.3348, annual: 0.2954 },
  { min: 40000, max: 49999, monthly: 0.3916, semi_annual: 0.3329, annual: 0.2937 },
  { min: 50000, max: 59999, monthly: 0.3895, semi_annual: 0.3311, annual: 0.2921 },
  { min: 60000, max: 69999, monthly: 0.3874, semi_annual: 0.3293, annual: 0.2906 },
  { min: 70000, max: 79999, monthly: 0.3854, semi_annual: 0.3276, annual: 0.2890 },
  { min: 80000, max: 89999, monthly: 0.3833, semi_annual: 0.3258, annual: 0.2875 },
  { min: 90000, max: 99999, monthly: 0.3813, semi_annual: 0.3241, annual: 0.2860 },
  { min: 100000, max: 149999, monthly: 0.379250, semi_annual: 0.322360, annual: 0.284440 },
  { min: 150000, max: 199999, monthly: 0.366500, semi_annual: 0.311527, annual: 0.274873 },
  { min: 200000, max: 249999, monthly: 0.355125, semi_annual: 0.301855, annual: 0.266345 },
  { min: 250000, max: 299999, monthly: 0.344300, semi_annual: 0.292656, annual: 0.258224 },
  { min: 300000, max: 349999, monthly: 0.333750, semi_annual: 0.283687, annual: 0.250313 },
  { min: 350000, max: 399999, monthly: 0.323357, semi_annual: 0.274854, annual: 0.242517 },
  { min: 400000, max: 449999, monthly: 0.313063, semi_annual: 0.266103, annual: 0.234798 },
  { min: 450000, max: 499999, monthly: 0.302833, semi_annual: 0.257409, annual: 0.227124 },
  { min: 500000, max: 549999, monthly: 0.292650, semi_annual: 0.248752, annual: 0.219488 },
  { min: 550000, max: 599999, monthly: 0.282500, semi_annual: 0.240125, annual: 0.211875 },
  { min: 600000, max: 699999, monthly: 0.272375, semi_annual: 0.231518, annual: 0.204282 },
  { min: 700000, max: 799999, monthly: 0.250750, semi_annual: 0.213137, annual: 0.188063 },
  { min: 800000, max: 899999, monthly: 0.229531, semi_annual: 0.195101, annual: 0.172149 },
  { min: 900000, max: 999999, monthly: 0.208583, semi_annual: 0.177296, annual: 0.156438 },
  { min: 1000000, max: 1000000, monthly: 0.187825, semi_annual: 0.159651, annual: 0.140869 },
  // { min: 1000, max: 1999, monthly: 1.66, semi_annual: 1.49, annual: 1.33 },
  // { min: 2000, max: 2999, monthly: 1.66, semi_annual: 1.49, annual: 1.32 },
  // { min: 3000, max: 3999, monthly: 1.65, semi_annual: 1.49, annual: 1.32 },
  // { min: 4000, max: 4999, monthly: 1.65, semi_annual: 1.48, annual: 1.32 },
  // { min: 5000, max: 5999, monthly: 0.3996, semi_annual: 1.48, annual: 1.32 },
  // { min: 6000, max: 6999, monthly: 1.65, semi_annual: 1.48, annual: 1.31 },
  // { min: 7000, max: 7999, monthly: 1.64, semi_annual: 1.47, annual: 1.31 },
  // { min: 8000, max: 8999, monthly: 1.64, semi_annual: 1.47, annual: 1.31 },
  // { min: 9000, max: 9999, monthly: 1.64, semi_annual: 1.47, annual: 1.3 },
  // { min: 10000, max: 19999, monthly: 1.63, semi_annual: 1.46, annual: 1.3 },
  // { min: 20000, max: 29999, monthly: 1.6, semi_annual: 1.43, annual: 1.27 },
  // { min: 30000, max: 39999, monthly: 1.57, semi_annual: 1.4, annual: 1.24 },
  // { min: 40000, max: 49999, monthly: 1.54, semi_annual: 1.36, annual: 1.21 },
  // { min: 50000, max: 59999, monthly: 1.51, semi_annual: 1.33, annual: 1.19 },
  // { min: 60000, max: 69999, monthly: 1.48, semi_annual: 1.3, annual: 1.16 },
  // { min: 70000, max: 79999, monthly: 1.45, semi_annual: 1.27, annual: 1.13 },
  // { min: 80000, max: 89999, monthly: 1.42, semi_annual: 1.23, annual: 1.1 },
  // { min: 90000, max: 99999, monthly: 1.39, semi_annual: 1.2, annual: 1.07 },
  // { min: 100000, max: 100000, monthly: 1.36, semi_annual: 1.17, annual: 1.04 },
];
