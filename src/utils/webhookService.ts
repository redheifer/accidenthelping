import { API_URL, FormData, PingPostResponse } from './apiConfig';
import { buildPingPayload, buildPostPayload } from './payloadBuilders';

export const sendPingPostWebhook = async (
  formData: FormData,
  trustedFormCertUrl: string,
  tcpaLanguage: string
): Promise<PingPostResponse> => {
  try {
    console.log('Starting ping request with form data:', formData);
    
    // Calculate incident date based on timing
    const timing = formData.timing || '';
    let incidentDate = new Date();
    
    switch(timing) {
      case "Within 1 Week":
        incidentDate.setDate(incidentDate.getDate() - 7);
        break;
      case "Within 1-3 months":
        incidentDate.setMonth(incidentDate.getMonth() - 2);
        break;
      case "Within 4-6 months":
        incidentDate.setMonth(incidentDate.getMonth() - 5);
        break;
      case "Within 1 Year":
        incidentDate.setMonth(incidentDate.getMonth() - 9);
        break;
      case "Within 2 Years":
        incidentDate.setFullYear(incidentDate.getFullYear() - 1);
        break;
      case "Longer than 2 Years":
        incidentDate.setFullYear(incidentDate.getFullYear() - 2);
        break;
      default:
        incidentDate = new Date();
    }

    const formDataWithDate = {
      ...formData,
      accidentDate: incidentDate.toISOString().split('T')[0] // Format as YYYY-MM-DD
    };
    
    const pingPayload = buildPingPayload(formDataWithDate);
    console.log('Sending ping request with payload:', JSON.stringify(pingPayload, null, 2));

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

    const postPayload = buildPostPayload(
      formDataWithDate,
      pingData.leadId,
      pingData.bidId,
      trustedFormCertUrl,
      tcpaLanguage
    );
    console.log('Sending post request with payload:', JSON.stringify(postPayload, null, 2));

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