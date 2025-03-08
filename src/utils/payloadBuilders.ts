import { FormData } from './apiConfig';
import { getStateAbbreviation } from './stateAbbreviations';
import { API_KEY } from './apiConfig';

export const buildPingPayload = (formData: FormData) => {
  return {
    Request: {
      Mode: "ping",
      Key: API_KEY,
      API_Action: "pingPostLead",
      TYPE: "37",
      IP_Address: formData.IP_Address,
      SRC: "Accident_Helping",
      State: getStateAbbreviation(formData.state),
      Zip: formData.zipcode,
      Has_Attorney: formData.hasAttorney ? "Yes" : "No",
      At_Fault: formData.atFault ? "Yes" : "No",
      Injured: "Yes",
      Has_Insurance: formData.otherPartyInsured ? "Yes" : "No",
      Primary_Injury: formData.injuryType,
      Incident_Date: formData.timing,
      Skip_Dupe_Check: "1",
      Test_Lead: "1",
      Format: "JSON"
    }
  };
};

export const buildPostPayload = (
  formData: FormData,
  leadId: string,
  trustedFormCertUrl: string,
  tcpaLanguage: string
) => {
  return {
    Request: {
      Mode: "post",
      Key: API_KEY,
      API_Action: "pingPostLead",
      TYPE: "37",
      IP_Address: formData.IP_Address,
      SRC: "Accident_Helping",
      Landing_Page: "https://legaluplift.com",
      Trusted_Form_URL: trustedFormCertUrl,
      First_Name: formData.firstName,
      Last_Name: formData.lastName,
      State: getStateAbbreviation(formData.state),
      Zip: formData.zipcode,
      Primary_Phone: formData.phone,
      Email: formData.email,
      Has_Attorney: formData.hasAttorney ? "Yes" : "No",
      At_Fault: formData.atFault ? "Yes" : "No",
      Injured: "Yes",
      Has_Insurance: formData.otherPartyInsured ? "Yes" : "No",
      Primary_Injury: formData.injuryType,
      Incident_Date: formData.timing,
      Description: formData.description || "",
      Skip_Dupe_Check: "1",
      Test_Lead: "1",
      Lead_ID: leadId,
      TCPA_Consent: "Yes",
      TCPA_Language: tcpaLanguage,
      Format: "JSON"
    }
  };
};
