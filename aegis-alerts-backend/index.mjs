import dotenv from 'dotenv';
import express from 'express';
import twilio from 'twilio';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || process.env.ALERTS_API_PORT || 3001);

app.use(express.json());

const requiredEnvVars = [
  'TWILIO_ACCOUNT_SID',
  'TWILIO_AUTH_TOKEN',
  'TWILIO_FROM_NUMBER',
  'TWILIO_TO_NUMBER',
];

const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);

const buildSmsBody = (payload) => {
  const lines = [
    'AEGIS NATIONAL ESCALATION',
    `Severity: ${payload.severity}`,
    `Issue: ${payload.title}`,
    `Location: ${payload.location}`,
    `Escalated from: ${payload.from}`,
    `Path: ${payload.currentLevel} -> ${payload.nextLevel}`,
    `Detected: ${payload.timestamp}`,
    'Required action: Immediate national coordination, field verification, surge medical readiness, and public health response review.',
  ];

  return lines.join('\n');
};

const buildCallMessage = (payload) => {
  return [
    'Attention. This is an automated Aegis biosurveillance national escalation.',
    `A ${payload.severity.toLowerCase()} alert has been raised for ${payload.title}.`,
    `Location: ${payload.location}.`,
    `Escalated from ${payload.from}.`,
    'Required action: immediate national coordination, field verification, surge medical readiness, and public health response review.',
  ].join(' ');
};

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    twilioConfigured: missingEnvVars.length === 0,
    missingEnvVars,
  });
});

app.post('/api/alerts/escalate', async (req, res) => {
  if (missingEnvVars.length > 0) {
    return res.status(500).json({
      ok: false,
      error: 'Twilio environment variables are missing.',
      missingEnvVars,
    });
  }

  const { title, location, severity, from, currentLevel, nextLevel, timestamp } = req.body ?? {};

  if (!title || !location || !severity || !from || !currentLevel || !nextLevel || !timestamp) {
    return res.status(400).json({
      ok: false,
      error: 'Missing required escalation fields.',
    });
  }

  const payload = {
    title,
    location,
    severity,
    from,
    currentLevel,
    nextLevel,
    timestamp,
  };

  try {
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    const [message, call] = await Promise.all([
      client.messages.create({
        body: buildSmsBody(payload),
        from: process.env.TWILIO_FROM_NUMBER,
        to: process.env.TWILIO_TO_NUMBER,
      }),
      client.calls.create({
        from: process.env.TWILIO_FROM_NUMBER,
        to: process.env.TWILIO_TO_NUMBER,
        twiml: `<Response><Say>${buildCallMessage(payload)}</Say></Response>`,
      }),
    ]);

    return res.json({
      ok: true,
      smsSid: message.sid,
      callSid: call.sid,
    });
  } catch (error) {
    console.error('Twilio escalation error:', error);
    return res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown Twilio error.',
    });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Aegis alerts API listening on http://0.0.0.0:${port}`);
});
