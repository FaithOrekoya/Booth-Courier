import React, { useState } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RotateCcw,
  Phone,
  Check,
} from 'lucide-react';
import { QuoteFormData, validateQuoteForm, calculateEstimatedRate } from '../utils/freight.ts';

interface FreightQuoteSectionProps {
  initialFreightType?: string;
}

export const FreightQuoteSection: React.FC<FreightQuoteSectionProps> = ({
  initialFreightType = 'port-drayage',
}) => {
  // Pre-fill sensible defaults for secondary fields so the form remains lightweight and fast
  const defaultDate = new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0];

  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    businessEmail: '',
    companyName: '',
    phoneNumber: '',
    originLocation: '',
    destinationLocation: '',
    freightType: (initialFreightType as any) || 'port-drayage',
    cargoType: 'standard-dry',
    approxWeightLbs: '38000',
    dimensionsOrPallets: '1x 40ft Container',
    preferredDate: defaultDate,
    additionalDetails: '',
    liftgateRequired: false,
    appointmentRequired: true,
    hazmatCertified: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState<{
    referenceId: string;
    estimate: any;
    submissionTime: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof QuoteFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const validation = validateQuoteForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      const firstErrorKey = Object.keys(validation.errors)[0];
      const el = document.getElementById(`field-${firstErrorKey}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit quote request.');
      }

      setSubmissionSuccess({
        referenceId: data.referenceId,
        estimate: data.estimate,
        submissionTime: data.submissionTime,
      });
    } catch (err: any) {
      console.error('Submission failed:', err);
      setServerError(err.message || 'Error submitting quote. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmissionSuccess(null);
    setServerError(null);
    setErrors({});
    setFormData({
      fullName: '',
      businessEmail: '',
      companyName: '',
      phoneNumber: '',
      originLocation: '',
      destinationLocation: '',
      freightType: 'port-drayage',
      cargoType: 'standard-dry',
      approxWeightLbs: '38000',
      dimensionsOrPallets: '1x 40ft Container',
      preferredDate: defaultDate,
      additionalDetails: '',
      liftgateRequired: false,
      appointmentRequired: true,
      hazmatCertified: false,
    });
  };

  return (
    <section id="quote-section" className="py-16 sm:py-20 bg-[#050b18] text-white border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {submissionSuccess ? (
          <div className="bg-[#0a1128] border border-emerald-500/50 rounded-2xl p-6 sm:p-8 max-w-lg mx-auto text-center animate-fadeIn shadow-xl">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3 border border-emerald-500/30">
              <CheckCircle2 className="w-5 h-5" />
            </div>

            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
              Request Received
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-white mt-0.5 mb-2 font-heading">
              Dispatch Coordinator Assigned
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed mb-5 font-sans">
              Confirmation sent to <strong className="text-white">{formData.businessEmail}</strong>. Written pricing will follow within 60 minutes.
            </p>

            <div className="bg-slate-900 border border-slate-700/80 rounded-xl p-3 mb-5 text-left">
              <div className="text-[10px] text-slate-400 uppercase font-mono font-bold">
                Reference Code
              </div>
              <div className="text-lg font-mono font-bold text-amber-400">
                {submissionSuccess.referenceId}
              </div>
              <div className="text-xs text-slate-300 mt-0.5 font-sans">
                {formData.originLocation} → {formData.destinationLocation}
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 rounded-full text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer inline-flex items-center gap-1 font-sans"
              >
                <RotateCcw className="w-3 h-3" />
                <span>New Quote</span>
              </button>
              <a
                href="tel:18005552668"
                className="px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-primary transition-colors cursor-pointer shadow-md inline-flex items-center gap-1 font-sans"
              >
                <Phone className="w-3 h-3" />
                <span>Call (800) 555-BOOTH</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* LEFT COLUMN: Brief, clear write-up */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/20 px-3 py-1 rounded-full mb-3">
                  Quick Freight Quote
                </span>

                <h2 className="text-2xl sm:text-[40px] font-bold font-['Poppins',sans-serif] text-white tracking-tight leading-tight mb-2.5">
                  Let’s Move <br />
                  Your Freight.
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  Port drayage, intermodal rail, and dock deliveries with rapid dispatch and locked pricing.
                </p>
              </div>

              {/* Simple 3 bullet points */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 font-sans">
                  <div className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span><strong>60-Minute Response:</strong> Written rates locked fast.</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 font-sans">
                  <div className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span><strong>Zero Demurrage:</strong> Pre-cleared terminal gate reservations.</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 font-sans">
                  <div className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span><strong>Rail Optimization:</strong> Up to 30% savings on long-haul corridors.</span>
                </div>
              </div>

              {/* Contact footnote */}
              <div className="pt-1 text-xs text-slate-400 font-sans flex items-center gap-1.5">
                <span>Prefer to call dispatch?</span>
                <a
                  href="tel:18005552668"
                  className="font-bold text-amber-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" />
                  <span>(800) 555-BOOTH</span>
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN: Compact, streamlined form */}
            <div className="lg:col-span-7">
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-[#0a1128] border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-3"
              >
                {serverError && (
                  <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-400" />
                    <span>{serverError}</span>
                  </div>
                )}

                {/* Row 1: Name & Business Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div id="field-fullName">
                    <label htmlFor="fullName" className="block text-[11px] font-semibold text-slate-300 mb-0.5 font-sans">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="David Vance"
                      className={`w-full px-3 py-1.5 rounded-lg bg-slate-900 border text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1.5 focus:ring-amber-500 font-sans ${
                        errors.fullName ? 'border-red-500' : 'border-slate-700'
                      }`}
                    />
                    {errors.fullName && <p className="mt-0.5 text-[10px] text-red-400 font-sans">{errors.fullName}</p>}
                  </div>

                  <div id="field-businessEmail">
                    <label htmlFor="businessEmail" className="block text-[11px] font-semibold text-slate-300 mb-0.5 font-sans">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      id="businessEmail"
                      name="businessEmail"
                      value={formData.businessEmail}
                      onChange={handleChange}
                      placeholder="dvance@company.com"
                      className={`w-full px-3 py-1.5 rounded-lg bg-slate-900 border text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1.5 focus:ring-amber-500 font-sans ${
                        errors.businessEmail ? 'border-red-500' : 'border-slate-700'
                      }`}
                    />
                    {errors.businessEmail && <p className="mt-0.5 text-[10px] text-red-400 font-sans">{errors.businessEmail}</p>}
                  </div>
                </div>

                {/* Row 2: Company & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div id="field-companyName">
                    <label htmlFor="companyName" className="block text-[11px] font-semibold text-slate-300 mb-0.5 font-sans">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Apex Supply Inc."
                      className={`w-full px-3 py-1.5 rounded-lg bg-slate-900 border text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1.5 focus:ring-amber-500 font-sans ${
                        errors.companyName ? 'border-red-500' : 'border-slate-700'
                      }`}
                    />
                    {errors.companyName && <p className="mt-0.5 text-[10px] text-red-400 font-sans">{errors.companyName}</p>}
                  </div>

                  <div id="field-phoneNumber">
                    <label htmlFor="phoneNumber" className="block text-[11px] font-semibold text-slate-300 mb-0.5 font-sans">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="(555) 019-2834"
                      className={`w-full px-3 py-1.5 rounded-lg bg-slate-900 border text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1.5 focus:ring-amber-500 font-sans ${
                        errors.phoneNumber ? 'border-red-500' : 'border-slate-700'
                      }`}
                    />
                    {errors.phoneNumber && <p className="mt-0.5 text-[10px] text-red-400 font-sans">{errors.phoneNumber}</p>}
                  </div>
                </div>

                {/* Row 3: Origin & Destination */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div id="field-originLocation">
                    <label htmlFor="originLocation" className="block text-[11px] font-semibold text-slate-300 mb-0.5 font-sans">
                      Origin (Port or City) *
                    </label>
                    <input
                      type="text"
                      id="originLocation"
                      name="originLocation"
                      value={formData.originLocation}
                      onChange={handleChange}
                      placeholder="Port of Long Beach, CA"
                      className={`w-full px-3 py-1.5 rounded-lg bg-slate-900 border text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1.5 focus:ring-amber-500 font-sans ${
                        errors.originLocation ? 'border-red-500' : 'border-slate-700'
                      }`}
                    />
                    {errors.originLocation && <p className="mt-0.5 text-[10px] text-red-400 font-sans">{errors.originLocation}</p>}
                  </div>

                  <div id="field-destinationLocation">
                    <label htmlFor="destinationLocation" className="block text-[11px] font-semibold text-slate-300 mb-0.5 font-sans">
                      Destination (Ramp or City) *
                    </label>
                    <input
                      type="text"
                      id="destinationLocation"
                      name="destinationLocation"
                      value={formData.destinationLocation}
                      onChange={handleChange}
                      placeholder="Chicago BNSF Ramp, IL"
                      className={`w-full px-3 py-1.5 rounded-lg bg-slate-900 border text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1.5 focus:ring-amber-500 font-sans ${
                        errors.destinationLocation ? 'border-red-500' : 'border-slate-700'
                      }`}
                    />
                    {errors.destinationLocation && <p className="mt-0.5 text-[10px] text-red-400 font-sans">{errors.destinationLocation}</p>}
                  </div>
                </div>

                {/* Row 4: Service Mode & Target Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label htmlFor="freightType" className="block text-[11px] font-semibold text-slate-300 mb-0.5 font-sans">
                      Freight Service *
                    </label>
                    <select
                      id="freightType"
                      name="freightType"
                      value={formData.freightType}
                      onChange={handleChange}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:ring-1.5 focus:ring-amber-500 font-sans"
                    >
                      <option value="port-drayage">Port & Harbor Drayage</option>
                      <option value="intermodal-rail">Intermodal Rail Transport</option>
                      <option value="first-last-mile">First & Last Mile Cartage</option>
                      <option value="ftl">Dedicated Truckload</option>
                      <option value="multi-modal">Multi-Modal Port-to-Door</option>
                    </select>
                  </div>

                  <div id="field-preferredDate">
                    <label htmlFor="preferredDate" className="block text-[11px] font-semibold text-slate-300 mb-0.5 font-sans">
                      Target Date *
                    </label>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className={`w-full px-3 py-1.5 rounded-lg bg-slate-900 border text-xs sm:text-sm text-white focus:outline-none focus:ring-1.5 focus:ring-amber-500 font-sans ${
                        errors.preferredDate ? 'border-red-500' : 'border-slate-700'
                      }`}
                    />
                    {errors.preferredDate && <p className="mt-0.5 text-[10px] text-red-400 font-sans">{errors.preferredDate}</p>}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-1.5">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 rounded-full text-sm font-bold text-white bg-gradient-primary active:scale-[0.98] transition-all shadow-md shadow-amber-600/25 hover:shadow-amber-600/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 font-sans"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Request Rate Confirmation</span>
                      </>
                    )}
                  </button>
                  <p className="text-center text-[10px] text-slate-400 mt-1.5 font-sans">
                    Fast response within 60 minutes. No obligation.
                  </p>
                </div>
              </form>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
