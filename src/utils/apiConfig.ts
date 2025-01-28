export const API_URL = "https://api.fisetbrian.workers.dev/";
export const API_KEY = "29343937512f7a9d13a0391790b8c2a8790dbfbaf90e68d2ee8fe4a05a1eccda";

export interface FormData {
  state?: string;
  zipcode?: string;
  hasAttorney?: boolean;
  atFault?: boolean;
  otherPartyInsured?: boolean;
  injuryType?: string;
  accidentDate?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  timing?: string;
  IP_Address?: string;
}

export interface PingPostResponse {
  success: boolean;
  leadId?: string;
  bidId?: string;
  message?: string;
}