import React, { useState, useEffect } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare, Phone, Clock, ArrowRight, ExternalLink, Calendar, Briefcase, Sparkles } from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { NOTIFICATION_EMAIL, sendBookingNotification, generateBookingMailto } from '../utils/bookingService';
import { BookingSubmission } from '../types';

interface ContactSectionProps {
  selectedServiceId?: string;
  onOpenHire?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ selectedServiceId, onOpenHire }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'video-editing',
    budget: 'Standard (₹499 - ₹1,999)',
    footageLink: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<BookingSubmission | null>(null);

  // Sync selected service if passed from the ServiceModal "GET A QUOTE" button
  useEffect(() => {
    if (selectedServiceId) {
      setFormData((prev) => ({
        ...prev,
        service: selectedServiceId,
      }));
    }
  }, [selectedServiceId]);

  const selectedServiceObj = SERVICES_DATA.find((s) => s.id === formData.service) || SERVICES_DATA[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await sendBookingNotification({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        serviceId: selectedServiceObj.id,
        serviceName: selectedServiceObj.name,
        startingPrice: selectedServiceObj.startingPrice,
        budgetTier: formData.budget,
        footageLink: formData.footageLink,
        message: formData.message,
      });

      setSubmittedData(response.notification);
    } catch (err) {
      console.error('Error submitting booking notification:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedData(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: selectedServiceId || 'video-editing',
      budget: 'Standard (₹499 - ₹1,999)',
      footageLink: '',
      message: '',
    });
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-black text-white border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Info & Booking Notification System Status */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
                  DIRECT INBOX & NOTIFICATIONS
                </span>
              </div>
              <h2
                id="contact-section-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase mb-6 font-heading"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                START YOUR PROJECT
              </h2>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                Submit your project brief below. All booking details, footage links, and specifications are dispatched directly to our studio inbox for instant review.
              </p>

              {/* Prominent High-Visibility HIRE ME Action Box */}
              <div
                id="contact-hire-me-box"
                className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-700/80 shadow-2xl mb-8 relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-400/50 to-transparent" />
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-white" />
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      DIRECT TALENT INQUIRY
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white text-black font-mono font-bold uppercase">
                    OPEN
                  </span>
                </div>
                <p className="text-xs text-neutral-300 mb-4 leading-relaxed">
                  Looking to collaborate on a freelance project or hire for a permanent job role?
                </p>
                <button
                  type="button"
                  id="contact-hire-me-action-btn"
                  onClick={() => {
                    if (onOpenHire) {
                      onOpenHire();
                    } else {
                      const hireEl = document.querySelector('#hire');
                      if (hireEl) hireEl.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full py-3 px-4 bg-white text-black hover:bg-neutral-200 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/10 active:scale-98 cursor-pointer"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>HIRE ME (FREELANCER / JOB)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Direct channels */}
              <div className="space-y-3 mb-8">
                <a
                  id="direct-email-card"
                  href={`mailto:${NOTIFICATION_EMAIL}`}
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80 hover:border-neutral-600 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-neutral-900 flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-black transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[11px] font-mono text-neutral-500 uppercase block">
                      Booking Notification Email
                    </span>
                    <span className="text-xs font-semibold text-white truncate block">
                      {NOTIFICATION_EMAIL}
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
                INSTANT NOTIFICATION DISPATCH
              </span>
              All submissions trigger automated notifications directly to{' '}
              <span className="text-neutral-200">{NOTIFICATION_EMAIL}</span> with full project specifications.
            </div>
          </div>

          {/* Right Column: Quote & Booking Form */}
          <div className="lg:col-span-7">
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 relative">
              {submittedData ? (
                <div id="contact-success-state" className="py-8 text-center animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center mx-auto mb-6 shadow-2xl">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold uppercase text-white mb-2 font-heading">
                    Booking Notification Sent
                  </h3>
                  <p className="text-neutral-300 text-sm max-w-md mx-auto mb-6">
                    Thank you, <strong className="text-white">{submittedData.name}</strong>. Your project details have been successfully transmitted to <strong className="text-white">{NOTIFICATION_EMAIL}</strong>.
                  </p>

                  {/* Notification Summary Details */}
                  <div className="p-5 bg-neutral-900/90 rounded-xl border border-neutral-800 max-w-lg mx-auto mb-6 text-left text-xs font-mono text-neutral-300 space-y-2">
                    <div className="flex items-center justify-between pb-2 border-b border-neutral-800 text-[11px] text-neutral-400">
                      <span>NOTIFICATION RECIPIENT</span>
                      <span className="text-white font-bold">{submittedData.targetEmail}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-500">Client Name:</span>
                      <span className="text-white font-medium">{submittedData.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-500">Contact Email:</span>
                      <span className="text-white font-medium">{submittedData.email}</span>
                    </div>
                    {submittedData.phone && (
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">Phone / WhatsApp:</span>
                        <span className="text-white font-medium">{submittedData.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-500">Service Booked:</span>
                      <span className="text-neutral-200">{submittedData.serviceName} ({submittedData.startingPrice})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-500">Budget Range:</span>
                      <span className="text-neutral-200">{submittedData.budgetTier}</span>
                    </div>
                    {submittedData.footageLink && (
                      <div className="flex items-center justify-between truncate">
                        <span className="text-neutral-500">Footage Link:</span>
                        <span className="text-neutral-300 truncate max-w-[220px]">{submittedData.footageLink}</span>
                      </div>
                    )}
                    <div className="pt-2 border-t border-neutral-800">
                      <span className="text-neutral-500 block mb-1">Message / Brief:</span>
                      <p className="text-neutral-200 bg-neutral-950 p-2.5 rounded border border-neutral-800 text-[11px] leading-relaxed">
                        {submittedData.message}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-1 text-[10px] text-neutral-500">
                      <span>Submitted At:</span>
                      <span>{submittedData.submittedAt}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      id="direct-mailto-action-btn"
                      href={generateBookingMailto(submittedData)}
                      className="w-full sm:w-auto px-5 py-2.5 bg-white text-black font-semibold text-xs uppercase tracking-wider rounded-lg hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Open in Email App</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      id="reset-booking-form-btn"
                      onClick={handleReset}
                      className="w-full sm:w-auto px-5 py-2.5 bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Submit Another Booking
                    </button>
                  </div>
                </div>
              ) : (
                <form id="contact-quote-form" onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-2">
                    <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider font-heading">
                      PROJECT BOOKING FORM
                    </h3>
                    <span className="text-[11px] font-mono text-neutral-400">
                      Direct to {NOTIFICATION_EMAIL}
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
                        Booking Service *
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-budget" className="block text-xs uppercase font-mono tracking-wider text-neutral-400 mb-1.5">
                        Budget Category
                      </label>
                      <select
                        id="contact-budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-neutral-900/90 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-neutral-500 transition-colors cursor-pointer"
                      >
                        <option value="Standard (₹499 - ₹1,999)" className="bg-neutral-950 text-white">Standard (₹499 - ₹1,999)</option>
                        <option value="Pro Film / Commercial (₹2,000 - ₹5,000)" className="bg-neutral-950 text-white">Pro Film / Commercial (₹2,000 - ₹5,000)</option>
                        <option value="Agency / Multi-Video Package (₹5,000+)" className="bg-neutral-950 text-white">Agency / Multi-Video Package (₹5,000+)</option>
                        <option value="Custom Scope" className="bg-neutral-950 text-white">Custom Scope</option>
                      </select>
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
                        placeholder="https://drive.google.com/..."
                        className="w-full px-3.5 py-2.5 bg-neutral-900/90 border border-neutral-800 rounded-lg text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs uppercase font-mono tracking-wider text-neutral-400 mb-1.5">
                      Project Brief & Creative Details *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your video project, target duration, reference style, music mood, and specific deadline..."
                      className="w-full px-3.5 py-2.5 bg-neutral-900/90 border border-neutral-800 rounded-lg text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    id="contact-submit-quote-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 shadow-xl shadow-white/10 active:scale-98 cursor-pointer mt-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>DISPATCHING NOTIFICATION...</span>
                    ) : (
                      <>
                        <span>SUBMIT & NOTIFY {NOTIFICATION_EMAIL}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
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
