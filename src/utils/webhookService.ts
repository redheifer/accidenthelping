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
        State: formData.state,
        Zip: formData.zipcode,
        Has_Attorney: formData.hasAttorney ? "Yes" : "No",
        At_Fault: formData.atFault ? "Yes" : "No",
        Injured: "Yes",
        Has_Insurance: formData.otherPartyInsured ? "Yes" : "No",
        Primary_Injury: formData.injuryType,
        Incident_Date: formData.accidentDate,
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
    
    if (!pingData.success) {
      console.error('Ping request failed:', pingData);
      throw new Error('Ping request failed');
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
        State: formData.state,
        Zip: formData.zipcode,
        Primary_Phone: formData.phone,
        Email: formData.email,
        Has_Attorney: formData.hasAttorney ? "Yes" : "No",
        At_Fault: formData.atFault ? "Yes" : "No",
        Injured: "Yes",
        Has_Insurance: formData.otherPartyInsured ? "Yes" : "No",
        Primary_Injury: formData.injuryType,
        Incident_Date: formData.accidentDate,
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
      message: 'Failed to submit form data'
    };
  }
};