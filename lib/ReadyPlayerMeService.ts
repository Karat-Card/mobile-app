import axios from "axios";

const BASE_URL = 'https://engame.readyplayer.me/api'; // Use your specific subdomain here
const BASE_URL_V2 = 'https://api.readyplayer.me/v2';
const APP_ID = '677f15ded5e3587b0437c82b'; // Your App ID
const SUBDOMAIN = 'engame'; // Your subdomain

/**
 * Creates an anonymous user and returns user ID and access token.
 */
export const createAnonymousUser = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/users`, 
      {
        applicationId: APP_ID,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log("Create User Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating anonymous user:", error.response?.data || error);
    throw error;
  }
};

/**
 * Fetches available avatar templates using the provided token.
 */
export const fetchAvatarTemplates = async (token) => {
  try {
    if (!token) {
      console.error("Error: No token provided. User might not be authenticated.");
      return null;
    }

    console.log("Fetching avatar templates with token:", token);

    const response = await axios.get(`${BASE_URL_V2}/avatars/templates`, {
      headers: { 
        Authorization: `Bearer ${token}` 
      },
    });

    console.log("Fetched Avatar Templates:", response.data);
    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching avatar templates:",
      error.response?.data || error.message || error
    );
    throw error;
  }
};

/**
 * Creates a draft avatar using a template ID.
 */
export const createDraftAvatar = async (templateId: string, token: string) => {

  try {
    const response = await axios.post(
      `${BASE_URL_V2}/avatars/templates/${templateId}`,
      {
        data: {
          partner: SUBDOMAIN, // Using your subdomain as partner
          bodyType: "fullbody",
        },
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("Draft Avatar Created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating draft avatar:", error);
    throw error;
  }
};

/**
 * Fetches an avatar 2D render (PNG or JPG) using the avatar ID.
 */
/**
 * Fetches a list of assets using the provided token.
 */
export const fetchAssets = async (token, userId, applicationId) => {
  try {
    if (!token) {
      console.error("Error: No token provided. User might not be authenticated.");
      return null;
    }

    if (!userId || !applicationId) {
      console.error("Error: Missing userId or applicationId.");
      return null;
    }

    console.log("Fetching assets with token:", token);
    console.log("Fetching assets for userId:", userId);
    console.log("Using applicationId:", applicationId);

    const response = await axios.get('https://api.readyplayer.me/v1/assets', {
      headers: { 
        Authorization: `Bearer ${token}`,
        'X-APP-ID': applicationId,  // Include application ID in headers
      },
      params: {
        filter: 'usable-by-user-and-app',
        filterApplicationId: applicationId,  // Application ID as query parameter
        filterUserId: userId,  // User ID as query parameter
      },
    });

    console.log("Fetched Assets:", response.data);
    return response.data.data; // Adjust according to the API response structure
  } catch (error) {
    console.error(
      "Error fetching assets:",
      error.response?.data || error.message || error
    );
    throw error;
  }
};




/**
 * Publishes a draft avatar.
 */
export const publishAvatar = async (avatarId: string, token: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL_V2}/avatars/${avatarId}/publish`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("Avatar Published:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error publishing avatar:", error);
    throw error;
  }
};

/**
 * Deletes an avatar.
 */
export const deleteAvatar = async (avatarId: string, token: string) => {
  try {
    await axios.delete(`${BASE_URL_V2}/avatars/${avatarId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`Avatar ${avatarId} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting avatar:", error);
    throw error;
  }
};

/**
 * Updates avatar assets with new outfit.
 */

/**
 * Updates avatar assets with new outfit.
 */
/**
 * Updates avatar assets with new outfit.
 */
export const equipAssetToAvatar = async (userId: string, assetId: string, token: string) => {
  try {
    // Debug logs for userId and assetId
    console.log('Attempting to equip asset to avatar:');
    console.log('User ID (Avatar ID):', userId);
    console.log('Asset ID:', assetId);

    // Make sure to properly construct the URL and request body
    const response = await axios.put(
      `https://api.readyplayer.me/v1/avatars/${userId}/equip`, // Correct path with the userId (avatar ID)
      {
        data: {
          assetId, // Correct request body structure with assetId
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Log the full response for debugging
    console.log('Response data:', response.data);

    return response.data; // Return the response data
  } catch (error) {
    // Log any error details
    console.error('Error during asset equip operation:', error.response?.data || error.message || error);

    // Adding more details for debugging
    console.error('Failed to equip asset with User ID:', userId, 'and Asset ID:', assetId);

    throw error; // Re-throw the error after logging it
  }
};


