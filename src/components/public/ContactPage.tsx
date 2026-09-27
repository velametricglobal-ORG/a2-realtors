import React, { useState } from 'react';
import { 
  MapPin, Phone, Mail, Clock, MessageSquare, CheckCircle2, 
  ArrowRight, Shield, Sparkles, Navigation, User, Home, 
  Building2, HelpCircle, ChevronDown, ChevronUp, Check
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { submitGeneralContact, locations } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Villas & Flats');
  const [preferredLocality, setPreferredLocality] = useState('ALL');
  const [budgetRange, setBudgetRange] = useState('₹1 Cr – ₹2.5 Crore');
  const [message, setMessage] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const categories = [
    { id: 'Villas & Flats', label: 'Villas & Flats' },
    { id: 'Plots & Land', label: 'Plots & Land' },
    { id: 'Independent House', label: 'Kothis & Luxury Villas' },
    { id: 'Commercial', label: 'Commercial Spaces' },
    { id: 'Sell Property', label: 'Sell My Property' },
    { id: 'Construction', label: 'Construction & Build' }
  ];

  const budgetOptions = [
    'Under ₹50 Lakhs',
    '₹50 Lakhs – ₹1 Crore',
    '₹1 Cr – ₹2.5 Crore',
    '₹2.5 Cr – ₹5 Crore',
    '₹5 Crore+ (Ultra Luxury)'
  ];

  const faqs = [
    {
      q: 'Can outstation / non-Uttarakhand residents purchase property in Dehradun?',
      a: 'Yes. For municipal corporation limits (MDDA zones) and apartment / flat purchases, there is no restriction on land size. For freehold land outside municipal limits, non-residents can purchase up to 250 sq. meters (approx 300 sq. yards) per family member with full legal registry.'
    },
    {
      q: 'Do you provide verified title search and legal verification reports?',
      a: 'Absolutely. Every property in our portfolio undergoes a mandatory 30-year title deed search, mutation check (Khatauni/Khasra verification), and MDDA / RERA compliance audit before listing.'
    },
    {
      q: 'How do I schedule a site visit in Dehradun?',
      a: 'You can submit the inquiry form above, call our hotline at +91 84451 90135, or message us on WhatsApp. We provide complimentary chauffeur-driven site visit pick-ups from your hotel, Dehradun Railway Station, or Jolly Grant Airport.'
    },
    {
      q: 'Do you assist with home loans and property registration?',
      a: 'Yes. Our dedicated in-house banking liaisons coordinate directly with SBI, HDFC, ICICI, and Axis Bank for swift loan approvals, stamp duty calculation, and sub-registrar deed registration.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    
    const formattedRequirement = `Category: ${selectedCategory} | Locality: ${preferredLocality === 'ALL' ? 'Any Dehradun Locality' : preferredLocality} | Budget: ${budgetRange} | Note: ${message || 'Looking for verified property options in Dehradun.'}`;

    submitGeneralContact({
      name,
      phone,
      email,
      message: formattedRequirement,
      requirement: selectedCategory
    });
    setSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC', paddingBottom: '6rem' }}>
      
      {/* 1. HERO HEADER BANNER */}
      <div 
        style={{ 
          backgroundColor: '#0B1120', 
          color: '#FFFFFF', 
          padding: '5rem 0 4.5rem 0', 
          borderBottom: '1px solid #1E2E4F', 
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          
          <div className="flex flex-wrap items-center justify-between gap-8">
            <div style={{ maxWidth: 760 }}>
              <h1 style={{ fontSize: 'clamp(2.4rem, 4.2vw, 3.4rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                Let's Discuss Your Real Estate Goals in <span style={{ color: '#DFB76C', fontFamily: 'Playfair Display', fontStyle: 'italic' }}>Dehradun</span>
              </h1>
              <p style={{ color: '#CBD5E1', marginTop: '1rem', fontSize: '1.1rem', lineHeight: 1.65 }}>
                Connect with Dehradun’s most trusted RERA-certified property advisors for verified luxury villas, freehold plots, apartments, and commercial investments.
              </p>
            </div>

            {/* 3 Value Pillars */}
            <div 
              className="card-dark"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '1.75rem',
                borderRadius: 20,
                minWidth: 290,
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="flex flex-col gap-3.5" style={{ fontSize: '0.9rem' }}>
                <div className="flex items-center gap-2.5" style={{ color: '#A7F3D0', fontWeight: 700 }}>
                  <Sparkles size={16} style={{ color: '#DFB76C' }} /> 15-Minute Guaranteed Callback
                </div>
                <div className="flex items-center gap-2.5" style={{ color: '#FFFFFF', fontWeight: 600 }}>
                  <Shield size={16} style={{ color: '#A7F3D0' }} /> 100% Free Title Check Consultation
                </div>
                <div className="flex items-center gap-2.5" style={{ color: '#DFB76C', fontWeight: 700 }}>
                  <CheckCircle2 size={16} style={{ color: '#25D366' }} /> Zero Brokerage on New Projects
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 2. THREE QUICK DIRECT-CONTACT CARDS */}
      <div className="container" style={{ marginTop: '-1.8rem', position: 'relative', zIndex: 10 }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Office Card */}
          <div 
            className="card-luxury" 
            style={{ 
              backgroundColor: '#FFFFFF', 
              padding: '1.75rem', 
              borderRadius: 18,
              border: '1px solid #E2E8F0',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)'
            }}
          >
            <div className="flex items-start gap-3.5">
              <div style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: '#EBF4EC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MapPin size={24} style={{ color: '#386635' }} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#386635', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Registered Office
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', marginTop: 2 }}>
                  25 B, Inder Road, Dalanwala
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#64748B', marginTop: 4, lineHeight: 1.4 }}>
                  Dehradun, Uttarakhand 248001 (Near Survey Chowk & Karanpur)
                </p>
                <div className="flex items-center gap-1.5" style={{ marginTop: 10, fontSize: '0.78rem', color: '#0F172A', fontWeight: 700 }}>
                  <Clock size={14} style={{ color: '#386635' }} /> Mon – Sat: 9:30 AM – 7:30 PM
                </div>
              </div>
            </div>
          </div>

          {/* Hotline Card */}
          <div 
            className="card-luxury" 
            style={{ 
              backgroundColor: '#FFFFFF', 
              padding: '1.75rem', 
              borderRadius: 18,
              border: '1px solid #E2E8F0',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)'
            }}
          >
            <div className="flex items-start gap-3.5">
              <div style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: '#EBF4EC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Phone size={24} style={{ color: '#386635' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#386635', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Direct Hotline
                </div>
                <a 
                  href="tel:+918445190135" 
                  style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', display: 'block', marginTop: 2 }}
                >
                  +91 84451 90135
                </a>
                <p style={{ fontSize: '0.84rem', color: '#64748B', marginTop: 4 }}>
                  Direct line to Senior Property Advisor
                </p>
                <div className="flex items-center gap-1.5" style={{ marginTop: 10, fontSize: '0.78rem', color: '#16A34A', fontWeight: 700 }}>
                  <span className="pulse-dot"></span> Lines Active Now (Avg Wait: &lt; 30s)
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Card */}
          <div 
            className="card-luxury" 
            style={{ 
              backgroundColor: '#FFFFFF', 
              padding: '1.75rem', 
              borderRadius: 18,
              border: '1px solid #E2E8F0',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)'
            }}
          >
            <div className="flex items-start gap-3.5">
              <div style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MessageSquare size={24} style={{ color: '#16A34A' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#16A34A', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  WhatsApp Desk
                </div>
                <a 
                  href="https://wa.me/918445190135?text=Hello%20A2%20Realtors%2C%20I%20would%20like%20to%20inquire%20about%20properties%20in%20Dehradun."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '1.1rem', fontWeight: 800, color: '#16A34A', display: 'block', marginTop: 2 }}
                >
                  Chat Live on WhatsApp →
                </a>
                <p style={{ fontSize: '0.84rem', color: '#64748B', marginTop: 4 }}>
                  Instant floor plans, brochures & video tours
                </p>
                <div style={{ marginTop: 10, fontSize: '0.78rem', color: '#0F172A', fontWeight: 700 }}>
                  Available 24/7 for NRI & Outstation Buyers
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. MAIN SECTION: REDESIGNED LUXURY FORM + MAP & TRUST SUITE */}
      <div className="container" style={{ marginTop: '3.5rem' }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 7 COLS: SPACIOUS & INTUITIVE INQUIRY FORM */}
          <div className="lg:col-span-7">
            
            <div 
              className="card-luxury" 
              style={{ 
                padding: 'clamp(1.75rem, 3vw, 2.75rem)', 
                backgroundColor: '#FFFFFF', 
                borderRadius: 24,
                boxShadow: '0 20px 45px rgba(11, 17, 32, 0.06)'
              }}
            >
              
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
                  <div 
                    style={{ 
                      width: 76, 
                      height: 76, 
                      borderRadius: '50%', 
                      backgroundColor: '#EBF4EC', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      margin: '0 auto 1.5rem auto',
                      boxShadow: '0 10px 25px rgba(56, 102, 53, 0.15)'
                    }}
                  >
                    <CheckCircle2 size={42} style={{ color: '#386635' }} />
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#386635', marginBottom: '0.5rem' }}>
                    Inquiry Reference: A2-{Math.floor(1000 + Math.random() * 9000)}
                  </div>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
                    Thank You, {name}!
                  </h3>
                  <p style={{ color: '#475569', fontSize: '1rem', maxWidth: 480, margin: '0 auto 1.75rem auto', lineHeight: 1.6 }}>
                    Your property requirement has been assigned to our senior consultant for <strong>{preferredLocality === 'ALL' ? 'Dehradun' : preferredLocality}</strong>. We will call you at <strong>{phone}</strong> within 15 minutes.
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-3">
                    <a 
                      href={`https://wa.me/918445190135?text=Hello%20A2%20Realtors%2C%20I%20just%20submitted%20my%20requirement%20for%20${encodeURIComponent(selectedCategory)}%20(${encodeURIComponent(name)}).`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp flex items-center gap-2"
                      style={{ padding: '0.75rem 1.5rem', borderRadius: 12, fontWeight: 700 }}
                    >
                      <MessageSquare size={17} /> Connect on WhatsApp Now
                    </a>
                    
                    <button 
                      onClick={() => setSubmitted(false)} 
                      className="btn-outline-gray"
                      style={{ padding: '0.75rem 1.25rem', borderRadius: 12 }}
                    >
                      Submit Another Requirement
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  
                  {/* Form Header */}
                  <div style={{ borderBottom: '1px solid #F1F5F9', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.01em' }}>
                      Send Us Your Property Requirement
                    </h2>
                    <p style={{ color: '#64748B', fontSize: '0.95rem', marginTop: '0.35rem' }}>
                      Tell us what you are looking for, and we'll deliver handpicked, legally-vetted listings directly to you.
                    </p>
                  </div>

                  {/* Step 1: Clickable Category Chips */}
                  <div style={{ marginBottom: '1.75rem' }}>
                    <label className="form-label" style={{ fontSize: '0.85rem', marginBottom: '0.65rem', display: 'block' }}>
                      1. Select What You Are Looking For *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(cat => {
                        const isSelected = selectedCategory === cat.id;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setSelectedCategory(cat.id)}
                            style={{
                              padding: '0.55rem 1rem',
                              borderRadius: 12,
                              fontSize: '0.86rem',
                              fontWeight: isSelected ? 800 : 600,
                              border: '1.5px solid',
                              borderColor: isSelected ? '#386635' : '#E2E8F0',
                              backgroundColor: isSelected ? '#EBF4EC' : '#FFFFFF',
                              color: isSelected ? '#1B4332' : '#334155',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 6,
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <span>{cat.label}</span>
                            {isSelected && <Check size={14} style={{ color: '#386635' }} />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Contact Info Grid (2 Columns) */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.65rem' }}>
                      2. Your Contact Information *
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Full Name */}
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Full Name *</label>
                        <div style={{ position: 'relative' }}>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Sanjay Rawat"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-input"
                            style={{ paddingLeft: '2.4rem' }}
                          />
                          <User size={16} style={{ position: 'absolute', left: 12, top: 14, color: '#94A3B8' }} />
                        </div>
                      </div>

                      {/* Phone / WhatsApp */}
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Phone / WhatsApp Number *</label>
                        <div style={{ position: 'relative' }}>
                          <input
                            type="tel"
                            required
                            placeholder="+91 98970 00000"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-input"
                            style={{ paddingLeft: '2.4rem' }}
                          />
                          <Phone size={16} style={{ position: 'absolute', left: 12, top: 14, color: '#94A3B8' }} />
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Step 3: Preferences (Locality & Budget & Email) */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.65rem' }}>
                      3. Location & Budget Preferences
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Email Address */}
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Email Address (Optional)</label>
                        <div style={{ position: 'relative' }}>
                          <input
                            type="email"
                            placeholder="your.email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                            style={{ paddingLeft: '2.4rem' }}
                          />
                          <Mail size={16} style={{ position: 'absolute', left: 12, top: 14, color: '#94A3B8' }} />
                        </div>
                      </div>

                      {/* Preferred Locality */}
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Preferred Dehradun Locality</label>
                        <select
                          value={preferredLocality}
                          onChange={(e) => setPreferredLocality(e.target.value)}
                          className="form-select"
                        >
                          <option value="ALL">All Dehradun Corridors</option>
                          {locations.map(loc => (
                            <option key={loc.id} value={loc.name}>{loc.name}</option>
                          ))}
                          <option value="Rajpur Road">Rajpur Road / Hathibarkala</option>
                          <option value="Dalanwala">Dalanwala / Inder Road</option>
                          <option value="Sahastradhara Road">Sahastradhara Road</option>
                          <option value="Mussoorie Road">Mussoorie Road / Malsi</option>
                          <option value="Vasant Vihar">Vasant Vihar / Ballupur</option>
                        </select>
                      </div>

                      {/* Budget Range */}
                      <div className="form-group col-span-full" style={{ marginBottom: 0 }}>
                        <label className="form-label">Approximate Budget Range</label>
                        <select
                          value={budgetRange}
                          onChange={(e) => setBudgetRange(e.target.value)}
                          className="form-select"
                        >
                          {budgetOptions.map(b => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                      </div>

                    </div>
                  </div>

                  {/* Step 4: Specific Message / Requirement */}
                  <div className="form-group" style={{ marginBottom: '1.75rem' }}>
                    <label className="form-label">4. Specific Requirements or Notes (Optional)</label>
                    <textarea
                      rows={4}
                      placeholder="e.g. Looking for a 3 BHK duplex villa near Rajpur Road with mountain views, or a 250 sq. yard plot with clear mutation and registry..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="form-textarea"
                      style={{ resize: 'vertical', minHeight: 95 }}
                    />
                  </div>

                  {/* Trust & Privacy Notice */}
                  <div 
                    style={{ 
                      backgroundColor: '#F8FAFC', 
                      border: '1px solid #E2E8F0', 
                      borderRadius: 12, 
                      padding: '0.85rem 1.15rem', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 10,
                      marginBottom: '1.5rem',
                      fontSize: '0.82rem',
                      color: '#64748B'
                    }}
                  >
                    <Shield size={18} style={{ color: '#386635', flexShrink: 0 }} />
                    <span>
                      <strong>100% Privacy Protected:</strong> We never share your phone number. No spam, only direct assistance from licensed A2 Realtors advisors.
                    </span>
                  </div>

                  {/* Submit CTA Button */}
                  <button 
                    type="submit" 
                    className="btn-green w-full flex items-center justify-center gap-2"
                    style={{ 
                      width: '100%', 
                      padding: '1rem 1.75rem', 
                      fontSize: '1.02rem', 
                      fontWeight: 800, 
                      borderRadius: 14,
                      cursor: 'pointer'
                    }}
                  >
                    <span>Submit Requirement & Get Verified Matches</span>
                    <ArrowRight size={19} />
                  </button>

                </form>
              )}

            </div>

          </div>

          {/* RIGHT 5 COLS: GOOGLE MAP EMBED & LUXURY ASSURANCE SUITE */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* 1. Interactive Google Map Card */}
            <div 
              className="card-luxury" 
              style={{ 
                backgroundColor: '#FFFFFF', 
                borderRadius: 24, 
                overflow: 'hidden',
                border: '1px solid #E2E8F0',
                boxShadow: '0 10px 30px rgba(0,0,0,0.04)'
              }}
            >
              <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyItems: 'space-between', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A' }}>
                    Find Our Dalanwala Office
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                    5 mins from Clock Tower & Survey Chowk
                  </span>
                </div>
                <a
                  href="https://maps.google.com/?q=25+B,+Inder+Road,+Dalanwala,+Dehradun,+Uttarakhand+248001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-green btn-sm flex items-center gap-1"
                  style={{ borderRadius: 8, fontSize: '0.76rem', padding: '0.35rem 0.75rem' }}
                >
                  <Navigation size={13} /> Open in Maps
                </a>
              </div>

              <div style={{ height: 280, width: '100%', position: 'relative' }}>
                <iframe
                  title="A2 Realtors Dalanwala Head Office Map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  loading="lazy"
                  src="https://maps.google.com/maps?q=25%20B,%20Inder%20Road,%20Dalanwala,%20Dehradun,%20Uttarakhand%20248001&t=&z=15&ie=UTF8&iwloc=&output=embed"
                />
              </div>

              <div style={{ padding: '1rem 1.5rem', backgroundColor: '#F8FAFC', fontSize: '0.82rem', color: '#475569' }}>
                <strong style={{ color: '#0F172A' }}>Landmark:</strong> Near Karanpur & Welham Boys School road, Inder Road, Dalanwala.
              </div>
            </div>

            {/* 2. Why Choose A2 Realtors Trust Suite */}
            <div 
              className="card-luxury" 
              style={{ 
                backgroundColor: '#FFFFFF', 
                padding: '2rem', 
                borderRadius: 24,
                border: '1px solid #E2E8F0'
              }}
            >
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.5rem' }}>
                The A2 Realtors Assurance
              </h3>

              <div className="flex flex-col gap-4">
                
                <div className="flex items-start gap-3.5">
                  <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: '#EBF4EC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Shield size={18} style={{ color: '#386635' }} />
                  </div>
                  <div>
                    <strong style={{ color: '#0F172A', fontSize: '0.95rem', display: 'block' }}>
                      100% Verified Title Deeds
                    </strong>
                    <span style={{ color: '#64748B', fontSize: '0.84rem', lineHeight: 1.5 }}>
                      Every property listed has undergone 30-year search report verification, mutation review, and MDDA clearance.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: '#FFF9EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Sparkles size={18} style={{ color: '#C5A059' }} />
                  </div>
                  <div>
                    <strong style={{ color: '#0F172A', fontSize: '0.95rem', display: 'block' }}>
                      Certified Advisory & Compliance
                    </strong>
                    <span style={{ color: '#64748B', fontSize: '0.84rem', lineHeight: 1.5 }}>
                      Ethical, transparent, and 100% legally verified real estate advisory across Uttarakhand.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: '#EBF4EC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Home size={18} style={{ color: '#386635' }} />
                  </div>
                  <div>
                    <strong style={{ color: '#0F172A', fontSize: '0.95rem', display: 'block' }}>
                      End-to-End Registry & Loan Support
                    </strong>
                    <span style={{ color: '#64748B', fontSize: '0.84rem', lineHeight: 1.5 }}>
                      From site visit chauffeur service to SBI/HDFC bank loans and sub-registrar conveyance, we manage everything.
                    </span>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>

      {/* 4. FREQUENTLY ASKED QUESTIONS SECTION */}
      <div className="container" style={{ marginTop: '6rem' }}>
        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.3rem)', fontWeight: 800, color: '#0F172A' }}>
              Frequently Asked Questions
            </h2>
            <p style={{ color: '#64748B', fontSize: '1rem', marginTop: '0.45rem' }}>
              Important legal and procedural guidance for buying property in Dehradun
            </p>
          </div>

          <div className="flex flex-col gap-3.5">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.q}
                  className="card-luxury"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 16,
                    border: '1px solid',
                    borderColor: isOpen ? '#386635' : '#E2E8F0',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    style={{
                      width: '100%',
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: isOpen ? '#F8FAFC' : '#FFFFFF',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: isOpen ? '#1B4332' : '#0F172A'
                    }}
                  >
                    <span>{faq.q}</span>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: isOpen ? '#EBF4EC' : '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: 12 }}>
                      {isOpen ? <ChevronUp size={16} style={{ color: '#386635' }} /> : <ChevronDown size={16} style={{ color: '#64748B' }} />}
                    </div>
                  </button>

                  {isOpen && (
                    <div style={{ padding: '0 1.5rem 1.35rem 1.5rem', fontSize: '0.92rem', color: '#475569', lineHeight: 1.65, borderTop: '1px solid #F1F5F9', paddingTop: '1rem' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>

    </div>
  );
};
