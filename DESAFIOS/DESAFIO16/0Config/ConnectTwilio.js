import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const ACCOUNTSID = process.env.ACCOUNTSID;
const AUTHTOKEN = process.env.AUTHTOKEN;

const twilioClient = twilio(ACCOUNTSID, AUTHTOKEN);

export default twilioClient