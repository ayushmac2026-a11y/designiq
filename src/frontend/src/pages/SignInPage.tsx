import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Step = "options" | "phone" | "otp";

const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+33", flag: "🇫🇷", name: "France" },
];

export default function SignInPage() {
  const [step, setStep] = useState<Step>("options");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0]);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpTimer, setOtpTimer] = useState(0);
  const [phoneError, setPhoneError] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const { login, loginStatus, identity } = useInternetIdentity();

  // Redirect on successful login
  useEffect(() => {
    if (identity && loginStatus === "success") {
      setIsGoogleLoading(false);
      navigate({ to: "/" });
    }
  }, [identity, loginStatus, navigate]);

  // OTP countdown timer
  useEffect(() => {
    if (otpTimer <= 0) return;
    const t = setTimeout(() => setOtpTimer((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [otpTimer]);

  const handlePhoneSubmit = () => {
    if (phone.length < 8) {
      setPhoneError("Please enter a valid phone number");
      return;
    }
    setPhoneError("");
    setStep("otp");
    setOtpTimer(60);
    setOtp(["", "", "", "", "", ""]);
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      otpRefs.current[5]?.focus();
    }
    e.preventDefault();
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await login();
    } catch {
      setIsGoogleLoading(false);
    }
  };

  const isOtpComplete = otp.every((d) => d !== "");

  return (
    <div
      data-ocid="signin.page"
      className="min-h-screen relative flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.96 0.04 315) 0%, oklch(0.97 0.02 250) 40%, oklch(0.96 0.04 200) 100%)",
      }}
    >
      {/* Floating decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-30 animate-float"
        style={{
          background:
            "radial-gradient(circle, oklch(0.55 0.22 295 / 0.4) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-20 w-[500px] h-[500px] rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(circle, oklch(0.75 0.12 200 / 0.35) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-10 w-64 h-64 rounded-full opacity-20 animate-glow-pulse"
        style={{
          background:
            "radial-gradient(circle, oklch(0.35 0.15 315 / 0.3) 0%, transparent 70%)",
        }}
      />

      {/* Decorative grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.35 0.15 315) 1px, transparent 1px), linear-gradient(90deg, oklch(0.35 0.15 315) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Card */}
      <AnimatePresence mode="wait">
        {step === "options" && (
          <OptionsStep
            key="options"
            onPhone={() => setStep("phone")}
            onGoogle={handleGoogleSignIn}
            isGoogleLoading={isGoogleLoading || loginStatus === "logging-in"}
          />
        )}
        {step === "phone" && (
          <PhoneStep
            key="phone"
            phone={phone}
            setPhone={setPhone}
            countryCode={countryCode}
            setCountryCode={setCountryCode}
            showCountryDropdown={showCountryDropdown}
            setShowCountryDropdown={setShowCountryDropdown}
            phoneError={phoneError}
            onBack={() => {
              setStep("options");
              setPhoneError("");
            }}
            onSubmit={handlePhoneSubmit}
          />
        )}
        {step === "otp" && (
          <OtpStep
            key="otp"
            otp={otp}
            otpTimer={otpTimer}
            isOtpComplete={isOtpComplete}
            otpRefs={otpRefs}
            phone={`${countryCode.code} ${phone}`}
            onOtpChange={handleOtpChange}
            onOtpKeyDown={handleOtpKeyDown}
            onOtpPaste={handleOtpPaste}
            onResend={() => {
              setOtpTimer(60);
              setOtp(["", "", "", "", "", ""]);
            }}
            onBack={() => setStep("phone")}
            onVerify={() => navigate({ to: "/" })}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Options Step ─────────────────────────────────────────────────────────── */
function OptionsStep({
  onPhone,
  onGoogle,
  isGoogleLoading,
}: {
  onPhone: () => void;
  onGoogle: () => void;
  isGoogleLoading: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      data-ocid="signin.options_card"
      className="relative w-full max-w-md mx-4"
    >
      <div className="glass rounded-3xl p-8 shadow-elevated border border-border/60">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-glow mb-4">
            <ZapIcon />
          </div>
          <h1 className="font-display font-bold text-2xl text-foreground tracking-tight">
            Welcome back to{" "}
            <span className="text-gradient-primary">DesignIQ</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1.5 text-center">
            Crack UCEED, NID & NIFT with Smart AI Prep
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground font-medium">
            Sign in with
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Sign-in options */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            data-ocid="signin.phone_option_button"
            onClick={onPhone}
            className="group relative w-full flex items-center gap-4 p-4 rounded-2xl border border-border/60 bg-background/50 hover:border-primary/40 hover:bg-primary/5 transition-smooth"
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center gradient-primary shadow-glow flex-shrink-0">
              <PhoneIcon />
            </div>
            <div className="text-left flex-1 min-w-0">
              <div className="font-semibold text-sm text-foreground">
                Continue with Phone Number
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                Receive a 6-digit OTP via SMS
              </div>
            </div>
            <ChevronRight />
            {/* Gradient border on hover */}
            <span
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-smooth"
              style={{ boxShadow: "0 0 0 1.5px oklch(0.35 0.15 315 / 0.35)" }}
            />
          </button>

          <button
            type="button"
            data-ocid="signin.google_option_button"
            onClick={onGoogle}
            disabled={isGoogleLoading}
            className="group relative w-full flex items-center gap-4 p-4 rounded-2xl border border-border/60 bg-background/50 hover:border-accent/40 hover:bg-accent/5 transition-smooth disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-card border border-border/60 flex-shrink-0">
              {isGoogleLoading ? <Spinner /> : <GoogleIcon />}
            </div>
            <div className="text-left flex-1 min-w-0">
              <div className="font-semibold text-sm text-foreground">
                Continue with Google
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {isGoogleLoading
                  ? "Authenticating securely…"
                  : "Fast & secure Internet Identity login"}
              </div>
            </div>
            {!isGoogleLoading && <ChevronRight />}
            <span
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-smooth"
              style={{ boxShadow: "0 0 0 1.5px oklch(0.55 0.22 295 / 0.35)" }}
            />
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          New to DesignIQ?{" "}
          <button
            type="button"
            data-ocid="signin.signup_link"
            className="text-primary font-semibold hover:underline bg-transparent border-none cursor-pointer"
          >
            Start Free
          </button>
        </p>

        {/* Terms */}
        <p className="text-center text-xs text-muted-foreground mt-3 leading-relaxed">
          By signing in, you agree to our{" "}
          <span className="text-primary cursor-pointer hover:underline">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="text-primary cursor-pointer hover:underline">
            Privacy Policy
          </span>
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Phone Step ────────────────────────────────────────────────────────────── */
function PhoneStep({
  phone,
  setPhone,
  countryCode,
  setCountryCode,
  showCountryDropdown,
  setShowCountryDropdown,
  phoneError,
  onBack,
  onSubmit,
}: {
  phone: string;
  setPhone: (v: string) => void;
  countryCode: (typeof COUNTRY_CODES)[0];
  setCountryCode: (v: (typeof COUNTRY_CODES)[0]) => void;
  showCountryDropdown: boolean;
  setShowCountryDropdown: (v: boolean) => void;
  phoneError: string;
  onBack: () => void;
  onSubmit: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      data-ocid="signin.phone_card"
      className="relative w-full max-w-md mx-4"
    >
      <div className="glass rounded-3xl p-8 shadow-elevated border border-border/60">
        {/* Back + Branding */}
        <div className="flex items-center gap-3 mb-7">
          <button
            type="button"
            data-ocid="signin.phone_back_button"
            onClick={onBack}
            className="w-9 h-9 rounded-xl flex items-center justify-center border border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
            aria-label="Go back"
          >
            <BackIcon />
          </button>
          <div>
            <h2 className="font-display font-bold text-xl text-foreground">
              Enter Phone Number
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              We'll send a 6-digit OTP to verify
            </p>
          </div>
        </div>

        {/* Phone Input */}
        <div className="mb-5">
          <label
            htmlFor="phone-input"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Phone Number
          </label>
          <div className="flex gap-2">
            {/* Country code selector */}
            <div className="relative">
              <button
                type="button"
                data-ocid="signin.country_code_select"
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                className="flex items-center gap-2 h-12 px-3 rounded-xl border border-input bg-background hover:border-primary/40 transition-smooth text-sm font-medium whitespace-nowrap"
              >
                <span>{countryCode.flag}</span>
                <span className="text-foreground">{countryCode.code}</span>
                <ChevronDown />
              </button>
              {showCountryDropdown && (
                <div
                  data-ocid="signin.country_dropdown"
                  className="absolute top-14 left-0 z-50 w-56 glass rounded-xl border border-border/60 shadow-elevated overflow-auto max-h-52"
                >
                  {COUNTRY_CODES.map((cc) => (
                    <button
                      key={cc.code}
                      type="button"
                      onClick={() => {
                        setCountryCode(cc);
                        setShowCountryDropdown(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm hover:bg-primary/5 text-left transition-smooth"
                    >
                      <span>{cc.flag}</span>
                      <span className="text-foreground flex-1">{cc.name}</span>
                      <span className="text-muted-foreground">{cc.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Phone input */}
            <input
              id="phone-input"
              type="tel"
              data-ocid="signin.phone_input"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              onKeyDown={(e) => e.key === "Enter" && onSubmit()}
              placeholder="Enter your phone number"
              className="flex-1 h-12 px-4 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-smooth"
              maxLength={15}
              autoComplete="tel-national"
            />
          </div>
          {phoneError && (
            <p
              data-ocid="signin.phone_field_error"
              className="mt-2 text-xs text-destructive"
            >
              {phoneError}
            </p>
          )}
        </div>

        <button
          type="button"
          data-ocid="signin.send_otp_button"
          onClick={onSubmit}
          disabled={phone.length < 8}
          className="w-full h-12 rounded-xl gradient-primary text-white font-semibold text-sm shadow-glow hover:opacity-90 transition-smooth disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Send OTP
        </button>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Standard SMS rates may apply
        </p>
      </div>
    </motion.div>
  );
}

const OTP_POSITIONS = ["pos1", "pos2", "pos3", "pos4", "pos5", "pos6"] as const;

/* ─── OTP Step ──────────────────────────────────────────────────────────────── */
function OtpStep({
  otp,
  otpTimer,
  isOtpComplete,
  otpRefs,
  phone,
  onOtpChange,
  onOtpKeyDown,
  onOtpPaste,
  onResend,
  onBack,
  onVerify,
}: {
  otp: string[];
  otpTimer: number;
  isOtpComplete: boolean;
  otpRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  phone: string;
  onOtpChange: (i: number, v: string) => void;
  onOtpKeyDown: (i: number, e: React.KeyboardEvent) => void;
  onOtpPaste: (e: React.ClipboardEvent) => void;
  onResend: () => void;
  onBack: () => void;
  onVerify: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      data-ocid="signin.otp_card"
      className="relative w-full max-w-md mx-4"
    >
      <div className="glass rounded-3xl p-8 shadow-elevated border border-border/60">
        {/* Back + Heading */}
        <div className="flex items-center gap-3 mb-7">
          <button
            type="button"
            data-ocid="signin.otp_back_button"
            onClick={onBack}
            className="w-9 h-9 rounded-xl flex items-center justify-center border border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
            aria-label="Go back"
          >
            <BackIcon />
          </button>
          <div>
            <h2 className="font-display font-bold text-xl text-foreground">
              Verify OTP
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Sent to{" "}
              <span className="text-foreground font-medium">{phone}</span>
            </p>
          </div>
        </div>

        {/* OTP boxes */}
        <div className="flex gap-2.5 justify-center mb-6" onPaste={onOtpPaste}>
          {otp.map((digit, i) => (
            <input
              key={OTP_POSITIONS[i]}
              ref={(el) => {
                otpRefs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              data-ocid={`signin.otp_input.${i + 1}`}
              onChange={(e) => onOtpChange(i, e.target.value)}
              onKeyDown={(e) => onOtpKeyDown(i, e)}
              className="w-12 h-14 text-center text-xl font-bold rounded-xl border-2 border-input bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-smooth caret-primary"
              style={digit ? { borderColor: "oklch(0.35 0.15 315 / 0.7)" } : {}}
              aria-label={`OTP digit ${i + 1}`}
            />
          ))}
        </div>

        {/* Timer & Resend */}
        <div className="text-center mb-6">
          {otpTimer > 0 ? (
            <p className="text-sm text-muted-foreground">
              Resend OTP in{" "}
              <span
                data-ocid="signin.otp_timer"
                className="font-semibold text-foreground tabular-nums"
              >
                {otpTimer}s
              </span>
            </p>
          ) : (
            <button
              type="button"
              data-ocid="signin.resend_otp_button"
              onClick={onResend}
              className="text-sm font-semibold text-primary hover:underline bg-transparent border-none cursor-pointer"
            >
              Resend OTP
            </button>
          )}
        </div>

        <button
          type="button"
          data-ocid="signin.verify_button"
          onClick={onVerify}
          disabled={!isOtpComplete}
          className="w-full h-12 rounded-xl gradient-primary text-white font-semibold text-sm shadow-glow hover:opacity-90 transition-smooth disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Verify &amp; Sign In
        </button>
      </div>
    </motion.div>
  );
}

/* ─── Inline SVG Icons ──────────────────────────────────────────────────────── */
function ZapIcon() {
  return (
    <svg
      aria-hidden="true"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.5 12.07 19.79 19.79 0 0 1 1.5 3.44 2 2 0 0 1 3.5 1.26h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.72a16 16 0 0 0 6.37 6.37l1.83-1.84a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-muted-foreground flex-shrink-0"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg
      aria-hidden="true"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-muted-foreground"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      aria-hidden="true"
      className="animate-spin"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}
