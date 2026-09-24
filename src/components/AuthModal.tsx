"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";

export function AuthModal() {
  const { authMode, closeAuth, login, signup, openAuth } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (authMode === "login" && !email) {
      setEmail("support@hartwell-luxury.com");
      setPassword("SecureLuxury1934!");
    }
  }, [authMode, email]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAuth();
    };
    if (authMode) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [authMode, closeAuth]);

  if (!authMode) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === "login") login(email, password);
    else signup(email, name, password);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm modal-active"
        onClick={closeAuth}
      />
      <div className="relative bg-cream w-full max-w-md p-8 md:p-12 modal-active">
        <button
          onClick={closeAuth}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center hover:text-gold-deep transition-colors"
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        <div className="text-center mb-10">
          <div className="font-serif text-sm tracking-[0.5em] text-gold-deep mb-3">
            HARTWELL & CO.
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-ink mb-2">
            {authMode === "login" ? "Welcome Back" : "Join the House"}
          </h2>
          <p className="text-sm text-graphite font-light">
            {authMode === "login"
              ? "Sign in to access your account."
              : "Create an account to begin."}
          </p>
        </div>

        <form onSubmit={submit} className="space-y-6">
          {authMode === "signup" && (
            <div>
              <label className="text-[10px] tracking-[0.3em] uppercase text-graphite font-medium block mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="luxury-input"
                placeholder="Mr. James Hartwell"
                required
              />
            </div>
          )}
          <div>
            <label className="text-[10px] tracking-[0.3em] uppercase text-graphite font-medium block mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="luxury-input"
              placeholder="gentleman@example.com"
              required
            />
          </div>
          <div>
            <label className="text-[10px] tracking-[0.3em] uppercase text-graphite font-medium block mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="luxury-input"
              placeholder="••••••••"
              required
            />
          </div>

          {authMode === "login" && (
            <div className="bg-cream-warm border border-gold/30 p-4 text-xs text-graphite font-light">
              <div className="text-[9px] tracking-[0.3em] uppercase text-gold-deep mb-1 font-medium">
                Demo Credentials
              </div>
              <div>support@hartwell-luxury.com</div>
              <div>SecureLuxury1934!</div>
            </div>
          )}

          <button type="submit" className="btn-gold w-full">
            {authMode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-graphite font-light">
          {authMode === "login" ? (
            <>
              New to Hartwell?{" "}
              <button
                onClick={() => openAuth("signup")}
                className="text-ink hover:text-gold-deep underline-offset-4 hover:underline transition-colors font-medium"
              >
                Create an account
              </button>
            </>
          ) : (
            <>
              Already a member?{" "}
              <button
                onClick={() => openAuth("login")}
                className="text-ink hover:text-gold-deep underline-offset-4 hover:underline transition-colors font-medium"
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
