
import { API_URL, FormData, PingPostResponse } from './apiConfig';
import { buildPingPayload, buildPostPayload } from './payloadBuilders';
import { mapTimingToWebhook } from './timingMapper';

const getUserIP = async (): Promise<string> => {
  try {
    const response = await fetch('https://ip.fisetbrian.workers.dev/');
    const data = await response.json();
    console.log('Fetched IP:', data.ip);
    return data.ip;
  } catch (error) {
    console.error('Error fetching IP:', error);
    return '127.0.0.1';
  }
};

export const sendPingPostWebhook = async (
  formData: FormData,
  trustedFormCertUrl: string,
  tcpaLanguage: string
): Promise<PingPostResponse> => {
  try {
    console.log('Starting ping request with form data:', formData);
    
    const userIP = await getUserIP();
    console.log('Using IP address:', userIP); 
    
    const formDataWithTiming = {
      ...formData,
      timing: mapTimingToWebhook(formData.timing || ''),
      IP_Address: userIP
    };
    
    const pingPayload = buildPingPayload({ ...formDataWithTiming });
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
      { ...formDataWithTiming },
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
