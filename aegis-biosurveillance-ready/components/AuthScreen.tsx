import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface AuthScreenProps {
  onLogin: (payload: { email: string; password: string }) => Promise<void>;
  onSignup: (payload: SignupFormState) => Promise<void>;
  isSubmitting: boolean;
  errorMessage: string | null;
}

export interface SignupFormState {
  name: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  profession: string;
  organization: string;
  password: string;
}

const countryCodes = [
  { label: 'Afghanistan (+93)', value: '+93' },
  { label: 'Albania (+355)', value: '+355' },
  { label: 'Algeria (+213)', value: '+213' },
  { label: 'Argentina (+54)', value: '+54' },
  { label: 'Australia (+61)', value: '+61' },
  { label: 'Austria (+43)', value: '+43' },
  { label: 'Bahrain (+973)', value: '+973' },
  { label: 'Bangladesh (+880)', value: '+880' },
  { label: 'Belgium (+32)', value: '+32' },
  { label: 'Bhutan (+975)', value: '+975' },
  { label: 'Brazil (+55)', value: '+55' },
  { label: 'Canada (+1)', value: '+1' },
  { label: 'China (+86)', value: '+86' },
  { label: 'Colombia (+57)', value: '+57' },
  { label: 'Denmark (+45)', value: '+45' },
  { label: 'Egypt (+20)', value: '+20' },
  { label: 'Finland (+358)', value: '+358' },
  { label: 'France (+33)', value: '+33' },
  { label: 'Germany (+49)', value: '+49' },
  { label: 'Greece (+30)', value: '+30' },
  { label: 'Hong Kong (+852)', value: '+852' },
  { label: 'India (+91)', value: '+91' },
  { label: 'Indonesia (+62)', value: '+62' },
  { label: 'Iran (+98)', value: '+98' },
  { label: 'Iraq (+964)', value: '+964' },
  { label: 'Ireland (+353)', value: '+353' },
  { label: 'Israel (+972)', value: '+972' },
  { label: 'Italy (+39)', value: '+39' },
  { label: 'Japan (+81)', value: '+81' },
  { label: 'Jordan (+962)', value: '+962' },
  { label: 'Kenya (+254)', value: '+254' },
  { label: 'Kuwait (+965)', value: '+965' },
  { label: 'Malaysia (+60)', value: '+60' },
  { label: 'Mexico (+52)', value: '+52' },
  { label: 'Myanmar (+95)', value: '+95' },
  { label: 'Nepal (+977)', value: '+977' },
  { label: 'Netherlands (+31)', value: '+31' },
  { label: 'New Zealand (+64)', value: '+64' },
  { label: 'Nigeria (+234)', value: '+234' },
  { label: 'Norway (+47)', value: '+47' },
  { label: 'Oman (+968)', value: '+968' },
  { label: 'Pakistan (+92)', value: '+92' },
  { label: 'Philippines (+63)', value: '+63' },
  { label: 'Poland (+48)', value: '+48' },
  { label: 'Portugal (+351)', value: '+351' },
  { label: 'Qatar (+974)', value: '+974' },
  { label: 'Russia (+7)', value: '+7' },
  { label: 'Saudi Arabia (+966)', value: '+966' },
  { label: 'Singapore (+65)', value: '+65' },
  { label: 'South Africa (+27)', value: '+27' },
  { label: 'South Korea (+82)', value: '+82' },
  { label: 'Spain (+34)', value: '+34' },
  { label: 'Sri Lanka (+94)', value: '+94' },
  { label: 'Sweden (+46)', value: '+46' },
  { label: 'Switzerland (+41)', value: '+41' },
  { label: 'Taiwan (+886)', value: '+886' },
  { label: 'Thailand (+66)', value: '+66' },
  { label: 'Turkey (+90)', value: '+90' },
  { label: 'Ukraine (+380)', value: '+380' },
  { label: 'United Arab Emirates (+971)', value: '+971' },
  { label: 'United Kingdom (+44)', value: '+44' },
  { label: 'United States (+1)', value: '+1' },
  { label: 'Vietnam (+84)', value: '+84' },
];

const emptySignupForm: SignupFormState = {
  name: '',
  email: '',
  phoneCountryCode: '+91',
  phoneNumber: '',
  profession: '',
  organization: '',
  password: '',
};

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <label className="space-y-2">
    <span className="text-sm font-medium text-slate-300">{label}</span>
    {children}
  </label>
);

const inputClassName =
  'w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400';

const passwordInputClassName = `${inputClassName} pr-12`;

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin, onSignup, isSubmitting, errorMessage }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState<SignupFormState>(emptySignupForm);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await onLogin(loginForm);
  };

  const handleSignupSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await onSignup(signupForm);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.2),_transparent_40%),linear-gradient(180deg,_rgba(15,23,42,0.95),_rgba(2,6,23,1))]" />
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-10 px-6 py-10 lg:flex-row lg:items-center">
        <section className="max-w-xl space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-300">Aegis Access Control</p>
          <h1 className="text-5xl font-bold tracking-tight text-white">Secure biosurveillance access for verified operators.</h1>
          <p className="text-lg leading-8 text-slate-300">
            Sign in to enter the Aegis command environment. New registrants must provide their professional and organizational details before accessing the dashboards.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              'Threat monitoring and regional drill-down',
              'Bioshield mission workspace',
              'Admin-only registrant directory',
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-sky-950/20 backdrop-blur">
          <div className="mb-6 flex rounded-2xl bg-slate-950/80 p-1">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                mode === 'login' ? 'bg-sky-500 text-white' : 'text-slate-400'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                mode === 'signup' ? 'bg-sky-500 text-white' : 'text-slate-400'
              }`}
            >
              Sign Up
            </button>
          </div>

          {errorMessage && (
            <div className="mb-5 rounded-2xl border border-red-500/30 bg-red-950/40 px-4 py-3 text-sm text-red-200">
              {errorMessage}
            </div>
          )}

          {mode === 'login' ? (
            <form className="space-y-5" onSubmit={handleLoginSubmit}>
              <Field label="Email">
                <input
                  type="email"
                  required
                  className={inputClassName}
                  value={loginForm.email}
                  onChange={(event) => setLoginForm((current) => ({ ...current, email: event.target.value }))}
                />
              </Field>
              <Field label="Password">
                <div className="relative">
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    className={passwordInputClassName}
                    value={loginForm.password}
                    onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))}
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword((current) => !current)}
                    className="absolute inset-y-0 right-3 flex items-center text-slate-400 transition hover:text-white"
                    aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                  >
                    {showLoginPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                </div>
              </Field>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Signing in...' : 'Login to Aegis'}
              </button>
            </form>
          ) : (
            <form className="grid gap-5 md:grid-cols-2" onSubmit={handleSignupSubmit}>
              <Field label="Full Name">
                <input
                  type="text"
                  required
                  className={inputClassName}
                  value={signupForm.name}
                  onChange={(event) => setSignupForm((current) => ({ ...current, name: event.target.value }))}
                />
              </Field>
              <Field label="Email">
                <input
                  type="email"
                  required
                  className={inputClassName}
                  value={signupForm.email}
                  onChange={(event) => setSignupForm((current) => ({ ...current, email: event.target.value }))}
                />
              </Field>
              <Field label="Country Code">
                <select
                  className={inputClassName}
                  value={signupForm.phoneCountryCode}
                  onChange={(event) =>
                    setSignupForm((current) => ({ ...current, phoneCountryCode: event.target.value }))
                  }
                >
                  {countryCodes.map((country) => (
                    <option key={country.value} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Phone Number">
                <input
                  type="tel"
                  required
                  className={inputClassName}
                  value={signupForm.phoneNumber}
                  onChange={(event) => setSignupForm((current) => ({ ...current, phoneNumber: event.target.value }))}
                />
              </Field>
              <Field label="Profession">
                <input
                  type="text"
                  required
                  className={inputClassName}
                  value={signupForm.profession}
                  onChange={(event) => setSignupForm((current) => ({ ...current, profession: event.target.value }))}
                />
              </Field>
              <Field label="Organization">
                <input
                  type="text"
                  required
                  className={inputClassName}
                  value={signupForm.organization}
                  onChange={(event) => setSignupForm((current) => ({ ...current, organization: event.target.value }))}
                />
              </Field>
              <div className="md:col-span-2">
                <Field label="Password">
                  <div className="relative">
                    <input
                      type={showSignupPassword ? 'text' : 'password'}
                      required
                      minLength={8}
                      className={passwordInputClassName}
                      value={signupForm.password}
                      onChange={(event) => setSignupForm((current) => ({ ...current, password: event.target.value }))}
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupPassword((current) => !current)}
                      className="absolute inset-y-0 right-3 flex items-center text-slate-400 transition hover:text-white"
                      aria-label={showSignupPassword ? 'Hide password' : 'Show password'}
                    >
                      {showSignupPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                  </div>
                </Field>
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? 'Creating account...' : 'Create Account'}
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </div>
  );
};

export default AuthScreen;
