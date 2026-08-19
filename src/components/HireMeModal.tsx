import React, { useState, useEffect } from 'react';
import {
  X,
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
} from 'lucide-react';
import {
  sendHiringRequest,
  HIRE_NOTIFICATION_EMAIL,
  SERVICE_OPTIONS,
  BUDGET_OPTIONS,
  DEADLINE_OPTIONS,
} from '../utils/hireService';
import { HiringRequestPayload, HireInquiryType } from '../types';

interface HireMeModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: HireInquiryType;
  defaultService?: string;
}

export const HireMeModal: React.FC<HireMeModalProps> = ({
  isOpen,
  onClose,
  defaultType = 'freelancer',
  defaultService,
}) => {
  const [inquiryType, setInquiryType] = useState<HireInquiryType>(defaultType);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    serviceRequired: defaultService || SERVICE_OPTIONS[0],
    projectDetails: '',
    budget: BUDGET_OPTIONS[1],
    deadline: DEADLINE_OPTIONS[1],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (defaultType) {
      setInquiryType(defaultType);
      if (defaultType === 'job') {
        setFormData((prev) => ({
          ...prev,
          serviceRequired: 'Full-Time / In-House Editor Role',
        }));
      }
    }
  }, [defaultType, isOpen]);

  useEffect(() => {
    if (defaultService) {
      setFormData((prev) => ({ ...prev, serviceRequired: defaultService }));
    }
  }, [defaultService]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.projectDetails.trim()
    ) {
      setErrorMessage('Please fill in your Name, Email, and Message / Project details.');
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
          `Unable to deliver your message to ${HIRE_NOTIFICATION_EMAIL}. Please check your connection and try again.`
      );
    }
  };

  const handleReset = () => {
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
    <div
      id="hire-me-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="hire-me-modal-container"
        className="bg-neutral-950 border border-neutral-800 text-white w-full max-w-3xl rounded-2xl p-6 sm:p-8 shadow-2xl relative my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
      >
        {/* Subtle top silver highlight */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-400/60 to-transparent" />

        {/* Close Button */}
        <button
          id="hire-me-modal-close-btn"
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors cursor-pointer z-10"
          aria-label="Close Form"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-5 pr-10 border-b border-neutral-900 pb-4 shrink-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900 text-neutral-300 text-[11px] tracking-widest uppercase mb-2 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>YESHUUU EDITS • HIRE ME</span>
          </div>
          <h2
            id="hire-me-modal-title"
            className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase font-heading text-white"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            HIRE YESHUUU EDITS
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm mt-1">
            Choose your inquiry type. Submissions deliver directly to{' '}
            <span className="text-neutral-200 font-mono font-semibold">
              {HIRE_NOTIFICATION_EMAIL}
            </span>
            .
          </p>

          {/* Option Selector: 1. FREELANCER / 2. JOB */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <button
              type="button"
              id="modal-tab-freelancer"
              onClick={() => handleTypeSelect('freelancer')}
              className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                inquiryType === 'freelancer'
                  ? 'bg-neutral-800/90 border-white text-white shadow-lg'
                  : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  inquiryType === 'freelancer' ? 'bg-white text-black' : 'bg-neutral-800 text-neutral-300'
                }`}
              >
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider">1. Hire as Freelancer</div>
                <div className="text-[11px] text-neutral-400">Single project, reels, trailer, ads</div>
              </div>
            </button>

            <button
              type="button"
              id="modal-tab-job"
              onClick={() => handleTypeSelect('job')}
              className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                inquiryType === 'job'
                  ? 'bg-neutral-800/90 border-white text-white shadow-lg'
                  : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  inquiryType === 'job' ? 'bg-white text-black' : 'bg-neutral-800 text-neutral-300'
                }`}
              >
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider">2. Hire for a Job</div>
                <div className="text-[11px] text-neutral-400">Full-time, contract, retainer</div>
              </div>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto pr-1 flex-1 custom-scrollbar">
          {successMessage ? (
            /* Success confirmation state */
            <div
              id="hire-modal-success-state"
              className="py-8 px-2 text-center animate-in fade-in zoom-in-95 duration-200"
            >
              <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center mx-auto mb-5 shadow-2xl">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3
                className="text-2xl font-bold uppercase text-white mb-2 font-heading"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Inquiry Dispatched
              </h3>
              <p
                id="hire-modal-success-text"
                className="text-white text-base sm:text-lg font-medium max-w-lg mx-auto mb-6 leading-relaxed"
              >
                “Message sent successfully. I’ll get back to you soon.”
              </p>

              {/* Summary Card */}
              <div className="p-4 sm:p-5 bg-neutral-900/90 rounded-xl border border-neutral-800 max-w-lg mx-auto mb-6 text-xs font-mono text-neutral-300 text-left space-y-2">
                <div className="flex justify-between border-b border-neutral-800 pb-1.5">
                  <span className="text-neutral-500">Inquiry Type:</span>
                  <span className="text-white font-semibold uppercase">
                    {inquiryType === 'job' ? 'Job / Full-Time' : 'Freelancer Project'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-1.5">
                  <span className="text-neutral-500">Recipient:</span>
                  <span className="text-white">{HIRE_NOTIFICATION_EMAIL}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-1.5">
                  <span className="text-neutral-500">Client:</span>
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
                  <span className="text-neutral-500">Service/Role:</span>
                  <span className="text-neutral-200">{formData.serviceRequired}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  id="hire-modal-another-btn"
                  onClick={handleReset}
                  className="px-5 py-2.5 bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white rounded-lg text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors"
                >
                  Send Another Inquiry
                </button>
                <button
                  type="button"
                  id="hire-modal-done-btn"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-white text-black rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 cursor-pointer shadow-lg"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            /* Form */
            <form id="hire-modal-form" onSubmit={handleSubmit} className="space-y-4">
              {/* Error Message Box */}
              {errorMessage && (
                <div
                  id="hire-modal-error-box"
                  className="p-3.5 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-start gap-2.5 animate-in fade-in"
                >
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-semibold block">Submission Error</span>
                    <span>{errorMessage}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setErrorMessage(null)}
                    className="text-red-400 hover:text-white text-[11px] underline ml-2 cursor-pointer font-mono"
                  >
                    Dismiss
                  </button>
                </div>
              )}

              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="hire-form-name"
                    className="block text-xs uppercase font-mono tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5"
                  >
                    <User className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Name *</span>
                  </label>
                  <input
                    id="hire-form-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name / Company Name"
                    className="w-full px-3.5 py-2.5 bg-neutral-900/90 border border-neutral-800 rounded-lg text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="hire-form-email"
                    className="block text-xs uppercase font-mono tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Email *</span>
                  </label>
                  <input
                    id="hire-form-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="w-full px-3.5 py-2.5 bg-neutral-900/90 border border-neutral-800 rounded-lg text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: WhatsApp Number & Service / Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="hire-form-whatsapp"
                    className="block text-xs uppercase font-mono tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-neutral-500" />
                    <span>WhatsApp / Phone</span>
                  </label>
                  <input
                    id="hire-form-whatsapp"
                    name="whatsapp"
                    type="tel"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="+1 555 123 4567 / +91..."
                    className="w-full px-3.5 py-2.5 bg-neutral-900/90 border border-neutral-800 rounded-lg text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-white transition-colors font-mono text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="hire-form-service"
                    className="block text-xs uppercase font-mono tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5"
                  >
                    <Film className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{inquiryType === 'job' ? 'Role Type' : 'Service Required'}</span>
                  </label>
                  <select
                    id="hire-form-service"
                    name="serviceRequired"
                    value={formData.serviceRequired}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-white transition-colors cursor-pointer"
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
                    htmlFor="hire-form-budget"
                    className="block text-xs uppercase font-mono tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5"
                  >
                    <DollarSign className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Budget / Compensation</span>
                  </label>
                  <select
                    id="hire-form-budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-white transition-colors cursor-pointer"
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
                    htmlFor="hire-form-deadline"
                    className="block text-xs uppercase font-mono tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5"
                  >
                    <Clock className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Timeline / Deadline</span>
                  </label>
                  <select
                    id="hire-form-deadline"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-white transition-colors cursor-pointer"
                  >
                    {DEADLINE_OPTIONS.map((d) => (
                      <option key={d} value={d} className="bg-neutral-950 text-white">
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message / Project Details */}
              <div>
                <label
                  htmlFor="hire-form-details"
                  className="block text-xs uppercase font-mono tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Message & Project Details *</span>
                </label>
                <textarea
                  id="hire-form-details"
                  name="projectDetails"
                  rows={4}
                  required
                  value={formData.projectDetails}
                  onChange={handleChange}
                  placeholder={
                    inquiryType === 'job'
                      ? 'Tell me about the company, role responsibilities, workload/schedule, and expectations...'
                      : 'Describe your footage, pacing, vision, target platform (YouTube, Reels, Cinema), reference links...'
                  }
                  className="w-full px-3.5 py-2.5 bg-neutral-900/90 border border-neutral-800 rounded-lg text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-white transition-colors resize-none leading-relaxed"
                />
              </div>

              {/* Send Button */}
              <div className="pt-2">
                <button
                  id="hire-form-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-white text-black font-extrabold text-xs uppercase tracking-widest rounded-lg hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-xl shadow-white/10 active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-center pt-1">
                <span className="text-[11px] font-mono text-neutral-500">
                  Notification delivered directly to{' '}
                  <strong className="text-neutral-300">{HIRE_NOTIFICATION_EMAIL}</strong>
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
