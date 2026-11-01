import React, { useState } from 'react';
import { Mail, Check, Copy, Send } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [showDirectForm, setShowDirectForm] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [senderEmail, setSenderEmail] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText('karthikeyanmurugan74@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderEmail.trim() || !message.trim()) return;
    setSentSuccess(true);
  };

  return (
    <section id="contact" className="py-24 border-t border-[var(--line)] relative z-10">
      <div className="max-w-[1120px] mx-auto px-6">
        <div className="cta-box text-center bg-[var(--surface)]/95 backdrop-blur-md border border-[var(--line)] rounded-[32px] py-20 px-6 sm:px-12 relative overflow-hidden shadow-xl">
          {/* Radial ambient glow backdrop */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -bottom-[200px] h-[360px] bg-[radial-gradient(ellipse_at_center,var(--glow),transparent_70%)]"
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="text-xs text-[var(--accent)] tracking-[0.12em] uppercase mb-3.5 font-bold">
              Ready when you are
            </div>

            <h2 className="text-[clamp(30px,5vw,48px)] tracking-[-0.03em] leading-[1.1] font-bold text-[var(--text)] mb-4.5">
              Ready to take your brand to the next <em className="serif-accent">level?</em>
            </h2>

            <p className="text-[var(--muted)] text-base sm:text-[18px] mb-8 leading-relaxed">
              Tell us what you’re building — software, brand or both — and we’ll reply within 24
              hours.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="mailto:karthikeyanmurugan74@gmail.com"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-[#7c3aed] to-[#2563eb] shadow-md hover:-translate-y-0.5 hover:shadow-[0_10px_30px_var(--glow)] transition-all duration-200 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>hello@suddenlaps.com</span>
              </a>

              <button
                onClick={handleCopyEmail}
                aria-label="Copy email address"
                className="inline-flex items-center gap-1.5 px-5 py-3.5 rounded-full font-medium text-xs text-[var(--text)] border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--bg)] shadow-xs transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>


            </div>

            {/* Quick Message Box */}
            {showDirectForm && (
              <div className="mt-8 pt-8 border-t border-[var(--line)] max-w-lg mx-auto text-left">
                {sentSuccess ? (
                  <div className="p-5 rounded-2xl bg-[var(--glow)] border border-[var(--accent)] text-center">
                    <p className="text-sm font-semibold text-[var(--text)]">
                      Message dispatched to hello@suddenlaps.com!
                    </p>
                    <p className="text-xs text-[var(--muted)] mt-1">
                      We'll get back to you at {senderEmail} within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSendForm} className="space-y-3.5">
                    <div>
                      <label htmlFor="contactEmail" className="block text-xs font-semibold text-[var(--text)] mb-1">
                        Your Email
                      </label>
                      <input
                        id="contactEmail"
                        type="email"
                        required
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg)] border border-[var(--line)] text-xs text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="contactMessage" className="block text-xs font-semibold text-[var(--text)] mb-1">
                        What are you building?
                      </label>
                      <textarea
                        id="contactMessage"
                        required
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Brief summary of your software, cloud or digital media project..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg)] border border-[var(--line)] text-xs text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#7c3aed] to-[#2563eb] shadow-md hover:opacity-95 transition-opacity cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send to hello@suddenlaps.com</span>
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
