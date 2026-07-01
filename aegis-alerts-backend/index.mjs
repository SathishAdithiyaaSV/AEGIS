import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import twilio from 'twilio';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || process.env.ALERTS_API_PORT || 3001);

const getMongoUriCandidates = () => {
  const configuredUri = process.env.MONGODB_URI;
  const candidates = [configuredUri];

  try {
    const parsed = new URL(configuredUri);
    const pathName = parsed.pathname.replace(/^\//, '');
    if (pathName && pathName !== pathName.toLowerCase()) {
      parsed.pathname = `/${pathName.toLowerCase()}`;
      candidates.push(parsed.toString());
    }
  } catch (_error) {
    // Keep the configured URI only if parsing fails.
  }

  return [...new Set(candidates)];
};

const ADMIN_EMAIL = 'kharthikpk@gmail.com';
const ADMIN_PASSWORD = 'Madu@2007';

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  return next();
});
app.use(express.json());

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phoneCountryCode: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true, trim: true },
    profession: { type: String, required: true, trim: true },
    organization: { type: String, required: true, trim: true },
    passwordHash: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

const requiredEnvVars = [
  'MONGODB_URI',
  'JWT_SECRET',
  'TWILIO_ACCOUNT_SID',
  'TWILIO_AUTH_TOKEN',
  'TWILIO_FROM_NUMBER',
  'TWILIO_TO_NUMBER',
];

const getMissingEnvVars = () => requiredEnvVars.filter((key) => !process.env[key]);

const sanitizeUser = (user) => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  phoneCountryCode: user.phoneCountryCode,
  phoneNumber: user.phoneNumber,
  profession: user.profession,
  organization: user.organization,
  isAdmin: user.isAdmin,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const createToken = (user) =>
  jwt.sign(
    {
      sub: user._id.toString(),
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

const authRequired = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ ok: false, error: 'Authentication required.' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub);
    if (!user) {
      return res.status(401).json({ ok: false, error: 'User not found.' });
    }
    req.authUser = user;
    return next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Invalid token.',
    });
  }
};

const adminRequired = async (req, res, next) => {
  if (!req.authUser?.isAdmin) {
    return res.status(403).json({ ok: false, error: 'Admin access required.' });
  }
  return next();
};

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

app.get('/api/health', async (_req, res) => {
  res.json({
    ok: true,
    mongoConnected: mongoose.connection.readyState === 1,
    twilioConfigured: getMissingEnvVars().filter((key) => key.startsWith('TWILIO_')).length === 0,
    missingEnvVars: getMissingEnvVars(),
  });
});

app.post('/api/auth/signup', async (req, res) => {
  try {
    const {
      name,
      email,
      phoneCountryCode,
      phoneNumber,
      profession,
      organization,
      password,
    } = req.body ?? {};

    if (!name || !email || !phoneCountryCode || !phoneNumber || !profession || !organization || !password) {
      return res.status(400).json({ ok: false, error: 'All signup fields are required.' });
    }

    if (String(password).length < 8) {
      return res.status(400).json({ ok: false, error: 'Password must be at least 8 characters.' });
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ ok: false, error: 'An account with this email already exists.' });
    }

    const user = await User.create({
      name: String(name).trim(),
      email: normalizedEmail,
      phoneCountryCode: String(phoneCountryCode).trim(),
      phoneNumber: String(phoneNumber).trim(),
      profession: String(profession).trim(),
      organization: String(organization).trim(),
      passwordHash: await bcrypt.hash(String(password), 10),
      isAdmin: normalizedEmail === ADMIN_EMAIL,
    });

    const token = createToken(user);
    return res.status(201).json({ ok: true, token, user: sanitizeUser(user) });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Signup failed.',
    });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body ?? {};
    if (!email || !password) {
      return res.status(400).json({ ok: false, error: 'Email and password are required.' });
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ ok: false, error: 'Invalid email or password.' });
    }

    const validPassword = await bcrypt.compare(String(password), user.passwordHash);
    if (!validPassword) {
      return res.status(401).json({ ok: false, error: 'Invalid email or password.' });
    }

    const token = createToken(user);
    return res.json({ ok: true, token, user: sanitizeUser(user) });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Login failed.',
    });
  }
});

app.get('/api/auth/me', authRequired, async (req, res) => {
  return res.json({ ok: true, user: sanitizeUser(req.authUser) });
});

app.get('/api/admin/users', authRequired, adminRequired, async (_req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  return res.json({
    ok: true,
    users: users.map((user) => sanitizeUser(user)),
  });
});

app.post('/api/alerts/escalate', authRequired, async (req, res) => {
  const missingEnvVars = getMissingEnvVars();
  const missingTwilioVars = missingEnvVars.filter((key) => key.startsWith('TWILIO_'));
  if (missingTwilioVars.length > 0) {
    return res.status(500).json({
      ok: false,
      error: 'Twilio environment variables are missing.',
      missingEnvVars: missingTwilioVars,
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

const start = async () => {
  const missingEnvVars = getMissingEnvVars().filter((key) => key !== 'TWILIO_ACCOUNT_SID' && key !== 'TWILIO_AUTH_TOKEN' && key !== 'TWILIO_FROM_NUMBER' && key !== 'TWILIO_TO_NUMBER');
  if (missingEnvVars.length > 0) {
    console.error('Missing required environment variables:', missingEnvVars.join(', '));
    process.exit(1);
  }

  let connected = false;
  let lastError = null;

  for (const candidate of getMongoUriCandidates()) {
    try {
      await mongoose.connect(candidate);
      connected = true;
      break;
    } catch (error) {
      lastError = error;
    }
  }

  if (!connected) {
    throw lastError;
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Aegis alerts API listening on http://0.0.0.0:${port}`);
  });
};

start().catch((error) => {
  console.error('Failed to start backend:', error);
  process.exit(1);
});
