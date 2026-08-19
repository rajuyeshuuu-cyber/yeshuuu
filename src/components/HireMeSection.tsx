import React, { useState } from 'react';
import {
  Briefcase,
  Building2,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  DollarSign,
  Phone,
  Mail,
  User,
  Sparkles,
  RefreshCw,
  Film,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import {
  sendHiringRequest,
  HIRE_NOTIFICATION_EMAIL,
  SERVICE_OPTIONS,
  BUDGET_OPTIONS,
  DEADLINE_OPTIONS,
} from '../utils/hireService';
import { HiringRequestPayload, HireInquiryType } from '../types';

export const HireMeSection: React.FC = () => {
  const [inquiryType, setInquiryType] = useState<HireInquiryType>('freelancer');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    serviceRequired: SERVICE_OPTIONS[0],
    projectDetails: '',
    budget: BUDGET_OPTIONS[1],
    deadline: DEADLINE_OPTIONS[1],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleTypeSelect = (type: HireInquiryType) => {
    setInquiryType(type);
    if (type === 'job') {
      setFormData((prev) => ({
        ...prev,
        serviceRequired: 'Full-Time / In-House Editor Role',
        budget: 'Custom / Discuss during consultation',
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        serviceRequired: SERVICE_OPTIONS[0],
        budget: BUDGET_OPTIONS[1],
      }));
    }
    if (errorMessage) setErrorMessage(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.projectDetails.trim()
    ) {
      setErrorMessage('Please complete all required fields (Name, Email, and Message).');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const payload: HiringRequestPayload & { inquiryType: string; message: string } = {
      inquiryType,
      name: formData.name,
      email: formData.email,
      whatsapp: formData.whatsapp,
      serviceRequired: formData.serviceRequired,
      projectDetails: formData.projectDetails,
      message: formData.projectDetails,
      budget: formData.budget,
      deadline: formData.deadline,
    };

    const result = await sendHiringRequest(payload);

    setIsSubmitting(false);

    if (result.success) {
      setSuccessMessage('Message sent successfully. I’ll get back to you soon.');
    } else {
      setErrorMessage(
        result.error ||
          `Failed to deliver your request to ${HIRE_NOTIFICATION_EMAIL}. Please check your connection and retry.`
      );
    }
  };

  const handleResetForm = () => {
    setSuccessMessage(null);
    setErrorMessage(null);
    setFormData({
      name: '',
      email: '',
      whatsapp: '',
      serviceRequired: SERVICE_OPTIONS[0],
      projectDetails: '',
      budget: BUDGET_OPTIONS[1],
      deadline: DEADLINE_OPTIONS[1],
    });
  };

  return (
    <section
      id="hire"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-black text-white relative border-t border-neutral-900 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-neutral-700/15 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/90 text-neutral-300 text-[11px] tracking-widest uppercase mb-4 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
            <span>DIRECT INBOX • NOTIFICATION ENGINE</span>
          </div>
          <h2
            id="hire-me-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase font-heading mb-4"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            HIRE YESHUUU EDITS
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Select an option below to submit your inquiry. Every submission is sent directly to{' '}
            <span className="text-white font-mono font-medium">{HIRE_NOTIFICATION_EMAIL}</span>.
          </p>

          {/* Option Selector: 1. FREELANCER / 2. JOB */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto mt-8">
            <button
              type="button"
              id="section-tab-freelancer"
              onClick={() => handleTypeSelect('freelancer')}
              className={`p-4 rounded-xl border text-left flex items-center gap-3.5 transition-all cursor-pointer ${
                inquiryType === 'freelancer'
                  ? 'bg-neutral-800/90 border-white text-white shadow-xl shadow-white/5 ring-1 ring-white/20'
                  : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  inquiryType === 'freelancer' ? 'bg-white text-black' : 'bg-neutral-900 text-neutral-300'
                }`}
              >
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider">1. Hire Me as a Freelancer</div>
                <div className="text-[11px] text-neutral-400">Single project, reels pack, commercial ad, trailer</div>
              </div>
            </button>

            <button
              type="button"
              id="section-tab-job"
              onClick={() => handleTypeSelect('job')}
              className={`p-4 rounded-xl border text-left flex items-center gap-3.5 transition-all cursor-pointer ${
                inquiryType === 'job'
                  ? 'bg-neutral-800/90 border-white text-white shadow-xl shadow-white/5 ring-1 ring-white/20'
                  : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  inquiryType === 'job' ? 'bg-white text-black' : 'bg-neutral-900 text-neutral-300'
                }`}
              >
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider">2. Hire Me for a Job</div>
                <div className="text-[11px] text-neutral-400">Full-time, contract editor, lead colorist retainer</div>
              </div>
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Top highlight */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-500/50 to-transparent" />

          {successMessage ? (
            /* Success View */
            <div
              id="hire-me-success-box"
              className="py-8 text-center animate-in fade-in zoom-in-95 duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center mx-auto mb-5 shadow-2xl">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3
                className="text-2xl sm:text-3xl font-bold uppercase text-white mb-2 font-heading"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Message Dispatched
              </h3>
              <p
                id="hire-me-success-message"
                className="text-white text-base sm:text-lg font-medium max-w-lg mx-auto mb-6 leading-relaxed"
              >
                “Message sent successfully. I’ll get back to you soon.”
              </p>

              <div className="p-4 sm:p-5 bg-neutral-900/80 rounded-xl border border-neutral-800 max-w-lg mx-auto mb-6 text-xs font-mono text-neutral-300 text-left space-y-2">
                <div className="flex justify-between border-b border-neutral-800 pb-1.5">
                  <span className="text-neutral-500">Inquiry Type:</span>
                  <span className="text-white font-semibold uppercase">
                    {inquiryType === 'job' ? 'Job / Role' : 'Freelance Project'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-1.5">
                  <span className="text-neutral-500">Delivered To:</span>
                  <span className="text-white">{HIRE_NOTIFICATION_EMAIL}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-1.5">
                  <span className="text-neutral-500">Name:</span>
                  <span className="text-white font-semibold">{formData.name}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-1.5">
                  <span className="text-neutral-500">Email:</span>
                  <span className="text-white">{formData.email}</span>
                </div>
                {formData.whatsapp && (
                  <div className="flex justify-between border-b border-neutral-800 pb-1.5">
                    <span className="text-neutral-500">WhatsApp:</span>
                    <span className="text-white">{formData.whatsapp}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-neutral-500">Service / Role:</span>
                  <span className="text-neutral-200">{formData.serviceRequired}</span>
                </div>
              </div>

              <button
                type="button"
                id="hire-me-send-another-btn"
                onClick={handleResetForm}
                className="px-6 py-3 bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Submit Another Inquiry</span>
              </button>
            </div>
          ) : (
            /* Hiring Form */
            <form id="hire-me-form" onSubmit={handleSubmit} className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-800/80 gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs uppercase font-mono tracking-wider text-neutral-300 font-medium">
                    {inquiryType === 'job' ? 'Job / Employment Inquiry Form' : 'Freelancer Project Form'}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-neutral-500">
                  Target: {HIRE_NOTIFICATION_EMAIL}
                </span>
              </div>

              {/* Error Alert if delivery failed */}
              {errorMessage && (
                <div
                  id="hire-me-error-box"
                  className="p-4 rounded-xl bg-red-950/50 border border-red-800/80 text-red-200 text-xs flex items-start gap-3 animate-in fade-in duration-200"
                >
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-semibold block mb-0.5">Submission Error</span>
                    <span>{errorMessage}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setErrorMessage(null)}
                    className="text-red-400 hover:text-white font-mono text-[11px] underline cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              )}

              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="section-hire-name"
                    className="block text-xs uppercase font-mono tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5"
                  >
                    <User className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Name *</span>
                  </label>
                  <input
                    id="section-hire-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name or brand name"
                    className="w-full px-4 py-3 bg-neutral-900/90 border border-neutral-800 rounded-lg text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-400 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="section-hire-email"
                    className="block text-xs uppercase font-mono tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Email *</span>
                  </label>
                  <input
                    id="section-hire-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@company.com"
                    className="w-full px-4 py-3 bg-neutral-900/90 border border-neutral-800 rounded-lg text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-400 transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: WhatsApp Number & Service / Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="section-hire-whatsapp"
                    className="block text-xs uppercase font-mono tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-neutral-500" />
                    <span>WhatsApp / Phone</span>
                  </label>
                  <input
                    id="section-hire-whatsapp"
                    name="whatsapp"
                    type="tel"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="+1 555 019 2834 / +91..."
                    className="w-full px-4 py-3 bg-neutral-900/90 border border-neutral-800 rounded-lg text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-400 transition-colors font-mono"
                  />
                </div>

                <div>
                  <label
                    htmlFor="section-hire-service"
                    className="block text-xs uppercase font-mono tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5"
                  >
                    <Film className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{inquiryType === 'job' ? 'Role Type' : 'Service Required'}</span>
                  </label>
                  <select
                    id="section-hire-service"
                    name="serviceRequired"
                    value={formData.serviceRequired}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-neutral-400 transition-colors cursor-pointer"
                  >
                    {inquiryType === 'job' ? (
                      <>
                        <option value="Full-Time / In-House Editor Role">Full-Time / In-House Editor Role</option>
                        <option value="Part-Time Video Editor">Part-Time Video Editor</option>
                        <option value="Monthly Retainer Lead Editor">Monthly Retainer Lead Editor</option>
                        <option value="Contract Senior Colorist & VFX">Contract Senior Colorist & VFX</option>
                        <option value="Agency Creative Partner">Agency Creative Partner</option>
                      </>
                    ) : (
                      SERVICE_OPTIONS.map((srv) => (
                        <option key={srv} value={srv} className="bg-neutral-950 text-white">
                          {srv}
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </div>

              {/* Row 3: Budget & Deadline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="section-hire-budget"
                    className="block text-xs uppercase font-mono tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5"
                  >
                    <DollarSign className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Budget / Compensation</span>
                  </label>
                  <select
                    id="section-hire-budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-neutral-400 transition-colors cursor-pointer"
                  >
                    {BUDGET_OPTIONS.map((b) => (
                      <option key={b} value={b} className="bg-neutral-950 text-white">
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="section-hire-deadline"
                    className="block text-xs uppercase font-mono tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5"
                  >
                    <Clock className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Timeline / Deadline</span>
                  </label>
                  <select
                    id="section-hire-deadline"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-neutral-400 transition-colors cursor-pointer"
                  >
                    {DEADLINE_OPTIONS.map((d) => (
                      <option key={d} value={d} className="bg-neutral-950 text-white">
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="section-hire-details"
                  className="block text-xs uppercase font-mono tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Message *</span>
                </label>
                <textarea
                  id="section-hire-details"
                  name="projectDetails"
                  rows={4}
                  required
                  value={formData.projectDetails}
                  onChange={handleChange}
                  placeholder={
                    inquiryType === 'job'
                      ? 'Describe your team, role scope, volume of projects, salary/rate structure, and timeline...'
                      : 'Share details about the footage, style/mood, platform, length, references, or specific editorial visions...'
                  }
                  className="w-full px-4 py-3 bg-neutral-900/90 border border-neutral-800 rounded-lg text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-400 transition-colors resize-none leading-relaxed"
                />
              </div>

              {/* Send Message Button */}
              <button
                id="hire-send-message-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-white text-black font-extrabold text-xs uppercase tracking-widest rounded-lg hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 shadow-xl shadow-white/10 active:scale-[0.99] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-4"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Delivering Message to {HIRE_NOTIFICATION_EMAIL}...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-2 text-center">
                <span className="text-[11px] font-mono text-neutral-500">
                  Enquiries are securely delivered to{' '}
                  <a
                    href={`mailto:${HIRE_NOTIFICATION_EMAIL}`}
                    className="text-neutral-300 hover:text-white underline"
                  >
                    {HIRE_NOTIFICATION_EMAIL}
                  </a>
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
