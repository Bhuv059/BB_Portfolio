"use client";

import { useForm, ValidationError } from "@formspree/react";
import Script from "next/script";

export default function ContactForm() {
  const [state, handleSubmit] = useForm("maeoodkl");
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!siteKey) {
    return (
      <p className="contact-configuration-error" role="alert">
        The contact form is temporarily unavailable while bot protection is being configured.
      </p>
    );
  }

  if (state.succeeded) {
    return (
      <p className="contact-success" role="status">
        Thanks for reaching out. Your message has been sent.
      </p>
    );
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
      />
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          className="contact-honeypot"
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <div className="contact-field">
          <label htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
          />
          <ValidationError field="name" errors={state.errors} />
        </div>

        <div className="contact-field">
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <ValidationError field="email" errors={state.errors} />
        </div>

        <div className="contact-field">
          <label htmlFor="contact-message">Message</label>
          <textarea id="contact-message" name="message" rows={6} required />
          <ValidationError field="message" errors={state.errors} />
        </div>

        <div
          className="cf-turnstile"
          data-sitekey={siteKey}
          data-theme="light"
        />
        <ValidationError errors={state.errors} />

        <button
          className="btn-primary contact-submit"
          type="submit"
          disabled={state.submitting}
        >
          {state.submitting ? "Sending..." : "Send message"}
        </button>
      </form>
    </>
  );
}
