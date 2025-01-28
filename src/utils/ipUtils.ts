export const getUserIP = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      mode: 'cors'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('IP fetch response:', data);
    return data.ip;
  } catch (error) {
    console.error('Error fetching IP:', error);
    // Return a default IP address if fetching fails
    return '127.0.0.1';
  }
};