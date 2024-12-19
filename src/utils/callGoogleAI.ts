import { GOOGLE_APPLICATION_CREDENTIALS, GOOGLE_LOCATION, GOOGLE_PROJECT_ID } from '../config/env';
import { GoogleAuth } from 'google-auth-library';
import axios from 'axios';

const location = GOOGLE_LOCATION;
const projectId = GOOGLE_PROJECT_ID;

const endpoint = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/imagetext:predict`;

export const callGoogleAI = async (base64Image: string) => {
    const accessToken = await getAccessToken();

    if (!accessToken) {
        throw new Error('Access token is not available');
    }

    try {
        const response = await axios.post(
            endpoint,
            {
                instances: [
                    {
                        image: {
                            bytesBase64Encoded: base64Image
                        }
                    }
                ],
                parameters: {
                    sampleCount: 1,
                    language: 'en'
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error calling Google AI:', error);
        return null;
    }
};

export const getAccessToken = async (): Promise<string | null> => {
    try {
        const keyFile = GOOGLE_APPLICATION_CREDENTIALS;

        if (!keyFile) {
            throw new Error('Service account key file path is not set in environment variables');
        }

        const auth = new GoogleAuth({
            keyFile,
            scopes: ['https://www.googleapis.com/auth/cloud-platform'] // Add more scopes if required
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        return accessToken.token || null;
    } catch (error) {
        console.error('Error obtaining access token:', error);
        return null;
    }
};
