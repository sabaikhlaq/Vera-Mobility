import { useState } from 'react';
import { Send, CheckCircle2, Building2, Users2, CalendarClock } from 'lucide-react';

export function ContactSection() {
  const [accountType, setAccountType] = useState<'family' | 'executive' | 'institution'>('family');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errs.email = 'Valid email is required';
    if (!phone.trim()) errs.phone = 'Phone number is required';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-[#FAF7F5] via-[#F4EDF0] to-[#FAF7F5] border-b border-[#EFE7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Context & Programs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-white/80 text-[11px] font-semibold uppercase tracking-widest text-[#782846]">
              <span>Dedicated Accounts</span>
              <span aria-hidden="true">·</span>
              <span>Tailored Inquiries</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#2A222B] font-display tracking-tight leading-tight">
              Establish a protected transport program for your <span className="italic font-medium text-[#782846]">family or firm</span>.
            </h2>
            
            <p className="text-base text-[#5D5262] leading-relaxed font-normal">
              Whether you need automated weekly healthcare rides for an aging mother, daily safe transit for hospital staff, or a trusted corporate account for female traveling executives, our concierge team structures tailored arrangements.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 glass-panel p-4 rounded-2xl border border-white">
                <div className="p-2.5 bg-[#FAF2F5] text-[#782846] rounded-xl border border-[#F2DEE5] shrink-0">
                  <Users2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#2A222B]">Family & Senior Care Circles</h3>
                  <p className="text-xs text-[#7B6E7D] mt-0.5">Unified billing, designated familiar chauffeurs, and automated SMS arrival alerts to all siblings or family guardians.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 glass-panel p-4 rounded-2xl border border-white">
                <div className="p-2.5 bg-[#FAF2F5] text-[#782846] rounded-xl border border-[#F2DEE5] shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#2A222B]">Corporate Duty-of-Care Programs</h3>
                  <p className="text-xs text-[#7B6E7D] mt-0.5">Late-night employee transit programs for law firms, medical centers, tech offices, and consulting practices.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 glass-panel p-4 rounded-2xl border border-white">
                <div className="p-2.5 bg-[#FAF2F5] text-[#782846] rounded-xl border border-[#F2DEE5] shrink-0">
                  <CalendarClock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#2A222B]">Fixed Weekly Commute Retainers</h3>
                  <p className="text-xs text-[#7B6E7D] mt-0.5">Guaranteed driver reservation at locked flat rates for recurring campus or office commutes.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Frosted Inquiry Form */}
          <div className="lg:col-span-6 glass-panel-elevated rounded-3xl p-6 sm:p-10 border border-white shadow-xl">
            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 bg-[#EDF5F1] text-[#3E6554] rounded-full flex items-center justify-center mx-auto border border-[#D5E6DC]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-normal text-[#2A222B] font-display">Inquiry Received</h3>
                <p className="text-xs sm:text-sm text-[#5D5262] max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-[#2A222B]">{fullName}</span>. A senior coordinator from our female operations team will review your requirements and reach out via <span className="font-semibold text-[#782846]">{email}</span> within 2 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFullName('');
                    setEmail('');
                    setPhone('');
                    setMessage('');
                  }}
                  className="mt-4 px-6 py-2.5 text-xs font-semibold text-[#782846] bg-[#FAF2F5] hover:bg-[#F2DEE5] rounded-full transition-colors border border-[#F2DEE5]"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-xl font-normal text-[#2A222B] font-display">Inquire About Recurring or Corporate Transit</h3>
                  <p className="text-xs text-[#7B6E7D] mt-0.5">Direct response from our local female dispatch leadership.</p>
                </div>

                {/* Account Type Buttons */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#5D5262] mb-2">
                    Account Classification
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'family', label: 'Family & Senior' },
                      { id: 'executive', label: 'Individual Exec' },
                      { id: 'institution', label: 'Firm / Hospital' },
                    ].map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setAccountType(type.id as any)}
                        className={`py-2 px-2 text-xs font-medium rounded-xl border text-center transition-all ${
                          accountType === type.id
                            ? 'bg-[#782846] text-white border-[#782846] shadow-sm'
                            : 'bg-white/80 text-[#5D5262] border-white hover:border-[#782846]/30'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Inputs with soft frosted styles */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#5D5262] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Katherine Sterling"
                    className={`w-full p-3 text-xs bg-white/80 border rounded-xl focus:outline-none focus:ring-1 ${
                      errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-[#ECE2E6] focus:border-[#782846] focus:ring-[#782846]'
                    }`}
                  />
                  {errors.fullName && <p className="text-[10px] text-red-600 mt-1">{errors.fullName}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#5D5262] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="katherine@firm.com"
                      className={`w-full p-3 text-xs bg-white/80 border rounded-xl focus:outline-none focus:ring-1 ${
                        errors.email ? 'border-red-500 focus:ring-red-500' : 'border-[#ECE2E6] focus:border-[#782846] focus:ring-[#782846]'
                      }`}
                    />
                    {errors.email && <p className="text-[10px] text-red-600 mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#5D5262] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 000-0000"
                      className={`w-full p-3 text-xs bg-white/80 border rounded-xl focus:outline-none focus:ring-1 ${
                        errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-[#ECE2E6] focus:border-[#782846] focus:ring-[#782846]'
                      }`}
                    />
                    {errors.phone && <p className="text-[10px] text-red-600 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#5D5262] mb-1">
                    Route Frequency & Specific Care Requirements
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g., Bi-weekly Tuesday rides for my mother to St. Jude Clinic, requires arm support and rollator stowage..."
                    className="w-full p-3 text-xs bg-white/80 border border-[#ECE2E6] rounded-xl focus:border-[#782846] focus:ring-1 focus:ring-[#782846]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#782846] hover:bg-[#601F37] text-white text-xs font-semibold rounded-full tracking-wider uppercase transition-all shadow-md hover:shadow-lg hover:shadow-[#782846]/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 text-[#F3CBD7]" />
                  <span>Send Concierge Inquiry</span>
                </button>

                <p className="text-[10px] text-[#8C7D8E] text-center">
                  Strict passenger privacy & HIPAA confidentiality guaranteed.
                </p>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
