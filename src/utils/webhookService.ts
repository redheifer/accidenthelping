interface PingPostResponse {
  success: boolean;
  leadId?: string;
  bidId?: string;
  message?: string;
}

interface FormData {
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
}

const API_URL = "https://api.fisetbrian.workers.dev/";
const API_KEY = "4363f919c362693f3bfb2b978471ba01acd6dbf09853655f805022feb8ba199a";

const getStateAbbreviation = (state: string = "California") => {
  const stateAbbreviations: { [key: string]: string } = {
    "Alabama": "AL",
    "Alaska": "AK",
    "Arizona": "AZ",
    "Arkansas": "AR",
    "California": "CA",
    "Colorado": "CO",
    "Connecticut": "CT",
    "Delaware": "DE",
    "Florida": "FL",
    "Georgia": "GA",
    "Hawaii": "HI",
    "Idaho": "ID",
    "Illinois": "IL",
    "Indiana": "IN",
    "Iowa": "IA",
    "Kansas": "KS",
    "Kentucky": "KY",
    "Louisiana": "LA",
    "Maine": "ME",
    "Maryland": "MD",
    "Massachusetts": "MA",
    "Michigan": "MI",
    "Minnesota": "MN",
    "Mississippi": "MS",
    "Missouri": "MO",
    "Montana": "MT",
    "Nebraska": "NE",
    "Nevada": "NV",
    "New Hampshire": "NH",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "New York": "NY",
    "North Carolina": "NC",
    "North Dakota": "ND",
    "Ohio": "OH",
    "Oklahoma": "OK",
    "Oregon": "OR",
    "Pennsylvania": "PA",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    "Tennessee": "TN",
    "Texas": "TX",
    "Utah": "UT",
    "Vermont": "VT",
    "Virginia": "VA",
    "Washington": "WA",
    "West Virginia": "WV",
    "Wisconsin": "WI",
    "Wyoming": "WY"
  };
  return stateAbbreviations[state] || "CA"; // Default to CA if state not found
};

const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
};

export const sendPingPostWebhook = async (
  formData: FormData,
  trustedFormCertUrl: string,
  tcpaLanguage: string
): Promise<PingPostResponse> => {
  try {
    // First, send the ping request
    const pingPayload = {
      Request: {
        Mode: "ping",
        Key: API_KEY,
        API_Action: "pingPostConsent",
        TYPE: "37",
        IP_Address: "75.2.92.149",
        SRC: "AutoLegalUplift_",
        State: getStateAbbreviation(formData.state),
        Zip: formData.zipcode,
        Has_Attorney: formData.hasAttorney ? "Yes" : "No",
        At_Fault: formData.atFault ? "Yes" : "No",
        Injured: "Yes",
        Has_Insurance: formData.otherPartyInsured ? "Yes" : "No",
        Primary_Injury: formData.injuryType,
        Incident_Date: getCurrentDate(),
        Skip_Dupe_Check: "1",
        Format: "JSON"
      }
    };

    console.log('Sending ping request with payload:', pingPayload);

    const pingResponse = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pingPayload)
    });

    const pingData = await pingResponse.json();
    console.log('Ping response:', pingData);
    
    if (!pingData.success && pingData.response?.status === "Error") {
      console.error('Ping request failed:', pingData);
      throw new Error(pingData.response.error || 'Ping request failed');
    }

    // If ping is successful, send the post request
    const postPayload = {
      Request: {
        Mode: "post",
        Key: API_KEY,
        API_Action: "pingPostConsent",
        TYPE: "37",
        IP_Address: "75.2.92.149",
        SRC: "AutoLegalUplift_",
        Landing_Page: window.location.href,
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
        Incident_Date: getCurrentDate(),
        Skip_Dupe_Check: "1",
        Lead_ID: pingData.leadId,
        Match_With_Bid_ID: pingData.bidId,
        TCPA_Consent: "Yes",
        TCPA_Language: tcpaLanguage,
        Format: "JSON"
      }
    };

    console.log('Sending post request with payload:', postPayload);

    const postResponse = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postPayload)
    });

    const postData = await postResponse.json();
    console.log('Post response:', postData);

    return {
      success: true,
      leadId: pingData.leadId,
      bidId: pingData.bidId,
      message: 'Successfully submitted form data'
    };

  } catch (error) {
    console.error('Error in ping-post webhook:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to submit form data'
    };
  }
};