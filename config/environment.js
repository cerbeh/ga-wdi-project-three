const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV || 'dev';
const dbURI = process.env.MONGODB_URI || `mongodb://localhost/ga-wdi-project-three-${env}`;
const secret = '!%6f.Hxkz3A<4F%S';
const twilioKey = process.env.TWILIO_AUTH_KEY;
const twilioSid = process.env.TWILIO_SID;

module.exports = { port, dbURI, secret, twilioKey, twilioSid };
