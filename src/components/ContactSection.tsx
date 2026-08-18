import React, { useState, useEffect } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare, Phone, Instagram, Clock, ArrowRight } from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';

interface ContactSectionProps {
  selectedServiceId?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ selectedServiceId }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'video-editing',
    budget: 'standard',
    footageLink: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  // Sync selected service if passed from the ServiceModal "GET A QUOTE" button
  useEffect(() => {
    if (selectedServiceId) {
      setFormData((prev) => ({
        ...prev,
        service: selectedServiceId,
      }));
    }
  }, [selectedServiceId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: selectedServiceId || 'video-editing',
      budget: 'standard',
      footageLink: '',
      message: '',
    });
  };

  const selectedServiceObj = SERVICES_DATA.find((s) => s.id === formData.service);

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-black text-white border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Info & Availability */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
                  ACCEPTING NEW COMMISSIONS
                </span>
              </div>
              <h2
                id="contact-section-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase mb-6 font-heading"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                START YOUR PROJECT
              </h2>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-8 font-normal">
                Ready to elevate your raw footage into cinematic storytelling? Fill out the brief or reach out directly. You will receive a custom quote within 2–4 hours.
              </p>

              {/* Direct channels */}
              <div className="space-y-3 mb-8">
                <a
                  href="mailto:rajuyeshuuu@gmail.com"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80 hover:border-neutral-600 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-neutral-900 flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-black transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-neutral-500 uppercase block">
                      Direct Email
                    </span>
                    <span className="text-xs font-semibold text-white">
                      rajuyeshuuu@gmail.com
                    </span>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80">
                  <div className="w-9 h-9 rounded-lg bg-neutral-900 flex items-center justify-center text-white shrink-0">
                    <Clock className="w-4 h-4 text-neutral-300" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-neutral-500 uppercase block">
                      Average Response Time
                    </span>
                    <span className="text-xs font-semibold text-white">
                      Within 2–4 Hours (7 Days a Week)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Turnaround Badge */}
            <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/80 text-xs text-neutral-400 font-mono">
              <span className="text-white font-semibold block mb-1">
                FAST TURNAROUND PROMISE
              </span>
              Standard reels in 24h • Cinematic edits in 48-72h • Rush delivery available upon request.
            </div>
          </div>

          {/* Right Column: Quote & Brief Form */}
          <div className="lg:col-span-7">
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 relative">
              {submitted ? (
                <div id="contact-success-state" className="py-12 text-center animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center mx-auto mb-6 shadow-2xl">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold uppercase text-white mb-2 font-heading">
                    Quote Request Received
                  </h3>
                  <p className="text-neutral-300 text-sm max-w-md mx-auto mb-6">
                    Thank you, <strong className="text-white">{formData.name || 'Creator'}</strong>. Yeshuuu has received your brief for <strong className="text-white">{selectedServiceObj?.name || 'Video Editing'}</strong> and will review your requirements shortly.
                  </p>
                  <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-800 max-w-md mx-auto mb-8 text-left text-xs font-mono text-neutral-300 space-y-1.5">
                    <div><span className="text-neutral-500">Service:</span> {selectedServiceObj?.name}</div>
                    <div><span className="text-neutral-500">Starting Base:</span> {selectedServiceObj?.startingPrice}</div>
                    <div><span className="text-neutral-500">Contact:</span> {formData.email || formData.phone}</div>
                  </div>
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form id="contact-quote-form" onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-2">
                    <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider font-heading">
                      PROJECT QUOTE FORM
                    </h3>
                    <span className="text-[11px] font-mono text-neutral-400">
                      Step 1 of 1
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs uppercase font-mono tracking-wider text-neutral-400 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Rivera"
                        className="w-full px-3.5 py-2.5 bg-neutral-900/90 border border-neutral-800 rounded-lg text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs uppercase font-mono tracking-wider text-neutral-400 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@creator.com"
                        className="w-full px-3.5 py-2.5 bg-neutral-900/90 border border-neutral-800 rounded-lg text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-service" className="block text-xs uppercase font-mono tracking-wider text-neutral-400 mb-1.5">
                        Selected Service *
                      </label>
                      <select
                        id="contact-service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-neutral-900/90 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-neutral-500 transition-colors cursor-pointer"
                      >
                        {SERVICES_DATA.map((srv) => (
                          <option key={srv.id} value={srv.id} className="bg-neutral-950 text-white">
                            {srv.name} (from {srv.startingPrice})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-phone" className="block text-xs uppercase font-mono tracking-wider text-neutral-400 mb-1.5">
                        WhatsApp / Phone (Optional)
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 bg-neutral-900/90 border border-neutral-800 rounded-lg text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-footage-link" className="block text-xs uppercase font-mono tracking-wider text-neutral-400 mb-1.5">
                      Footage / Drive Link (Optional)
                    </label>
                    <input
                      id="contact-footage-link"
                      type="url"
                      value={formData.footageLink}
                      onChange={(e) => setFormData({ ...formData, footageLink: e.target.value })}
                      placeholder="https://drive.google.com/drive/folders/..."
                      className="w-full px-3.5 py-2.5 bg-neutral-900/90 border border-neutral-800 rounded-lg text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs uppercase font-mono tracking-wider text-neutral-400 mb-1.5">
                      Project Brief & Creative Vision *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your video, target duration, reference style, music mood, and specific deadline..."
                      className="w-full px-3.5 py-2.5 bg-neutral-900/90 border border-neutral-800 rounded-lg text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    id="contact-submit-quote-btn"
                    type="submit"
                    className="w-full py-4 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 shadow-xl shadow-white/10 active:scale-98 cursor-pointer mt-2"
                  >
                    <span>SUBMIT QUOTE REQUEST</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
