"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Failed to send message. Please try again.");
      }

      setSuccess(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-24 bg-charcoal-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-gold-500 text-xs uppercase tracking-[0.25em] font-semibold block mb-2">
            Get In Touch
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-ivory-100 mb-4">
            Contact & Location
          </h1>
          <p className="text-sm text-ivory-muted font-sans">
            Have questions regarding private dining, table reservations, catering or catering feasts? We would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details & Info (Left 5 Cols) */}
          <div className="lg:col-span-5 bg-charcoal-800 p-8 rounded-2xl border border-gold-500/20 space-y-8 shadow-card">
            <div>
              <h2 className="font-serif text-2xl font-bold text-ivory-100 mb-2">
                Jain Dhaba Restaurant
              </h2>
              <p className="text-xs text-ivory-muted leading-relaxed font-sans">
                Sector 18, Connaught Place Extension, New Delhi. Valet parking provided at our main entrance.
              </p>
            </div>

            <div className="space-y-5 text-sm text-ivory-100">
              <div className="flex items-start space-x-3.5">
                <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-ivory-100 text-xs uppercase tracking-wider text-gold-400 mb-0.5">
                    Physical Address
                  </p>
                  <p className="text-xs text-ivory-muted">Plot 42, Sector 18, Connaught Place Extension, New Delhi 110001</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Clock className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-ivory-100 text-xs uppercase tracking-wider text-gold-400 mb-0.5">
                    Operating Hours
                  </p>
                  <p className="text-xs text-ivory-muted">Monday – Sunday: 11:30 AM – 11:30 PM</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Phone className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-ivory-100 text-xs uppercase tracking-wider text-gold-400 mb-0.5">
                    Direct Telephone
                  </p>
                  <p className="text-xs text-ivory-muted">+91 98765 43210 / +91 11 2345 6789</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Mail className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-ivory-100 text-xs uppercase tracking-wider text-gold-400 mb-0.5">
                    Email Inquiries
                  </p>
                  <p className="text-xs text-ivory-muted">namaste@jaindhaba.com</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700">
              <p className="text-xs font-semibold text-gold-400 mb-1">
                For Large Banquets & Events
              </p>
              <p className="text-[11px] text-ivory-muted">
                Please contact our events director directly at banquets@jaindhaba.com for tailored multi-course menus.
              </p>
            </div>
          </div>

          {/* Inquiry Form (Right 7 Cols) */}
          <div className="lg:col-span-7 bg-charcoal-800 p-8 sm:p-10 rounded-2xl border border-gold-500/20 shadow-card">
            <h2 className="font-serif text-2xl font-bold text-ivory-100 mb-2">
              Send Us a Message
            </h2>
            <p className="text-xs text-ivory-muted mb-6">
              Fill out the form below and our management team will reply within 24 hours.
            </p>

            {success ? (
              <div className="p-8 text-center bg-charcoal-900 rounded-xl border border-indiangreen-500/40">
                <CheckCircle2 className="w-12 h-12 text-indiangreen-400 mx-auto mb-3" />
                <h3 className="font-serif text-xl font-bold text-ivory-100 mb-1">
                  Message Dispatched Successfully
                </h3>
                <p className="text-xs text-ivory-muted mb-6">
                  Thank you for contacting Jain Dhaba. We have stored your message and dispatched a confirmation alert to our management team.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-6 py-2 rounded-sm bg-gold-gradient text-charcoal-900 text-xs font-bold uppercase tracking-wider"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMsg && (
                  <div className="p-4 rounded-lg bg-terracotta-500/20 border border-terracotta-500/50 flex items-center space-x-3 text-xs text-terracotta-400">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-ivory-muted mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Ananya Roy"
                      className="w-full px-3.5 py-2.5 bg-charcoal-900 border border-charcoal-700 rounded-md text-sm text-ivory-100 focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-ivory-muted mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className="w-full px-3.5 py-2.5 bg-charcoal-900 border border-charcoal-700 rounded-md text-sm text-ivory-100 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ivory-muted mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="e.g. ananya@example.com"
                    className="w-full px-3.5 py-2.5 bg-charcoal-900 border border-charcoal-700 rounded-md text-sm text-ivory-100 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ivory-muted mb-1.5">
                    Message / Inquiry Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your requirements, reservation dates, or feedback..."
                    className="w-full px-3.5 py-2.5 bg-charcoal-900 border border-charcoal-700 rounded-md text-sm text-ivory-100 focus:outline-none focus:border-gold-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-sm bg-gold-gradient text-charcoal-900 font-bold uppercase tracking-wider text-xs shadow-gold hover:brightness-110 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting To MongoDB...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Guest Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
