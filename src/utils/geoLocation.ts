import { getStateAbbreviation } from './stateAbbreviations';

interface GeoLocationResponse {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  postal: string;
  timezone: string;
}

/**
 * Gets the user's IP address and location information
 * @returns An object containing IP and location data, or null if the request fails
 */
export const getUserLocation = async (): Promise<GeoLocationResponse | null> => {
  try {
    // Using ipinfo.io which provides geolocation data including region (state)
    const response = await fetch('https://ipinfo.io/json?token=YOUR_IPINFO_TOKEN');
    const data = await response.json();
    console.log('Fetched location data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching location data:', error);
    return null;
  }
};

/**
 * Gets the user's IP address
 * @returns The user's IP address or a fallback value
 */
export const getUserIP = async (): Promise<string> => {
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

/**
 * Gets the user's state based on their IP address
 * @returns The user's state name or a default value
 */
export const getUserState = async (): Promise<string> => {
  try {
    const locationData = await getUserLocation();
    
    if (locationData && locationData.region) {
      // Return the full state name
      return locationData.region;
    }
    
    // Default fallback
    return "California";
  } catch (error) {
    console.error('Error determining user state:', error);
    return "California";
  }
}; 