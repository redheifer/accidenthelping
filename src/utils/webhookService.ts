import { API_URL, FormData, PingPostResponse } from './apiConfig';
import { buildPingPayload, buildPostPayload } from './payloadBuilders';
import { mapTimingToWebhook } from './timingMapper';
import { getUserIP, getUserState } from './geoLocation';

export const sendPingPostWebhook = async (
  formData: FormData,
  trustedFormCertUrl: string,
  tcpaLanguage: string
): Promise<PingPostResponse> => {
  try {
    console.log('Starting ping request with form data:', formData);
    
    const userIP = await getUserIP();
    console.log('Using IP address:', userIP);
    
    let userState = formData.state;
    if (!userState) {
      userState = await getUserState();
      console.log('Determined user state from IP:', userState);
    }
    
    const formDataWithLocationInfo = {
      ...formData,
      timing: mapTimingToWebhook(formData.timing || ''),
      IP_Address: userIP,
      state: userState
    };
    
    const pingPayload = buildPingPayload({ ...formDataWithLocationInfo });
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
    
    if (!pingData.response || pingData.response.status === "Error") {
      console.error('Ping request failed:', pingData);
      throw new Error(pingData.response?.error || 'Ping request failed');
    }

    const leadId = pingData.response.lead_id;

    const postPayload = buildPostPayload(
      { ...formDataWithLocationInfo },
      leadId,
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

    if (postData.response?.errors) {
      throw new Error(postData.response.errors.error || 'Post request failed');
    }

    return {
      success: true,
      leadId: leadId,
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
