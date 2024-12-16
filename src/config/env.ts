import { config } from 'dotenv';
config();

export const GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS;
export const GOOGLE_PROJECT_ID = process.env.GOOGLE_PROJECT_ID;
export const GOOGLE_LOCATION = process.env.GOOGLE_LOCATION;
