import React, { useState } from 'react';
import { 
  Hammer, HardHat, Home, RefreshCw, CheckCircle2, Phone, 
  ArrowRight, MapPin, Calculator, ShieldCheck, Sparkles, Ruler, Award, Calendar, Layers
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ConstructionPage: React.FC = () => {
  const { projects, submitGeneralContact } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [projectCategory, setProjectCategory] = useState('Residential Turnkey Villa');
  const [message, setMessage] = useState('');

  // Interactive Estimator States
  const [areaSqft, setAreaSqft] = useState<number>(2500);
  const [packageTier, setPackageTier] = useState<'classic' | 'premium' | 'ultra'>('premium');

  const packages = {
    classic: {
      name: 'Classic Villa',
      rate: 1850,
      description: 'First-class red clay brick construction, Vitrified 4x2 tiles, Jaquar brass sanitaryware, Asian Paints Apex Royale.',
      color: '#166534'
    },
    premium: {
      name: 'Premium Architectural',
      rate: 2450,
      description: 'Imported Italian marble, German Kommerling UPVC windows, Kohler fittings, concealed VRV conduits, teak wood main door.',
      color: '#B45309'
    },
    ultra: {
      name: 'Ultra-Luxury Bespoke',
      rate: 3400,
      description: 'Double-height glass living, automated smart lighting, VRV central air-conditioning, heated plunge pool & terrace lounge.',
      color: '#7C3AED'
    }
  };

  const selectedPkg = packages[packageTier];
  const totalEstimate = areaSqft * selectedPkg.rate;
  const civilCost = Math.round(totalEstimate * 0.55);
  const finishCost = Math.round(totalEstimate * 0.30);
  const mepCost = Math.round(totalEstimate * 0.15);

  const formatLakhs = (val: number) => {
    if (val >= 10000000) return `₹ ${(val / 10000000).toFixed(2)} Cr`;
    return `₹ ${(val / 100000).toFixed(2)} Lakhs`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    submitGeneralContact({
      name,
      phone,
      message: `CONSTRUCTION INQUIRY: Package [${selectedPkg.name}], Area [${areaSqft} sq.ft], Estimated [${formatLakhs(totalEstimate)}]. Note: ${message || 'Site inspection requested.'}`
    });
    setSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC', paddingBottom: '6rem' }}>
      
      {/* 1. LUXURY HERO BANNER */}
      <div style={{ backgroundColor: '#0B1120', color: '#FFFFFF', padding: '6rem 0 5rem 0', position: 'relative', overflow: 'hidden', borderBottom: '1px solid #1E2E4F' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: 900, textAlign: 'center' }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, backgroundColor: 'rgba(56,102,53,0.3)', border: '1px solid rgba(167,243,208,0.3)', padding: '0.35rem 1rem', borderRadius: 20, fontSize: '0.8rem', fontWeight: 700, color: '#A7F3D0', marginBottom: '1.25rem' }}>
            <Award size={14} style={{ color: '#DFB76C' }} /> 35+ Turnkey Luxury Residences Built in Dehradun
          </div>

          <h1 style={{ fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '1.25rem', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            Build Your Valley Sanctuary with <span style={{ color: '#DFB76C', fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>Unrivaled Craftsmanship</span>
          </h1>

          <p style={{ fontSize: '1.15rem', color: '#CBD5E1', lineHeight: 1.7, maxWidth: 780, margin: '0 auto' }}>
            From MDDA architectural sanctions and seismic RCC foundations to bespoke imported finishes, A2 Realtors delivers turnkey residential construction on fixed timelines and guaranteed budgets.
          </p>

          <div className="flex justify-center items-center gap-4 flex-wrap" style={{ marginTop: '2.25rem' }}>
            <a href="#estimator" className="btn-green btn-pill" style={{ padding: '0.85rem 1.8rem', fontWeight: 800 }}>
              <Calculator size={16} /> Calculate Construction Cost
            </a>
            <a href="tel:+918445190135" className="btn-outline-gray btn-pill" style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.2)', padding: '0.85rem 1.8rem' }}>
              <Phone size={15} style={{ color: '#DFB76C' }} /> Talk to Chief Architect
            </a>
          </div>

        </div>
      </div>

      {/* 2. TRUST HIGHLIGHT PILLARS */}
      <div className="container" style={{ marginTop: '-2rem', position: 'relative', zIndex: 10 }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { title: '100% On-Time Handover', subtitle: 'Guaranteed milestone penalties', icon: <Calendar size={20} /> },
            { title: 'Seismic Zone IV Safe', subtitle: 'Tata Tiscon & UltraTech RCC', icon: <ShieldCheck size={20} /> },
            { title: 'Single-Window Approvals', subtitle: 'MDDA & UREDA permissions', icon: <Layers size={20} /> },
            { title: 'Fixed Stage Payments', subtitle: 'Escrow-backed progress billing', icon: <Sparkles size={20} /> }
          ].map((item, idx) => (
            <div 
              key={idx}
              className="card"
              style={{
                backgroundColor: '#FFFFFF',
                padding: '1.25rem 1.5rem',
                borderRadius: 16,
                boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                gap: 12
              }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: '#EBF4EC', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {item.icon}
              </div>
              <div>
                <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.92rem' }}>{item.title}</div>
                <div style={{ fontSize: '0.78rem', color: '#64748B' }}>{item.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container" style={{ marginTop: '4.5rem' }}>
        
        {/* 3. INTERACTIVE CONSTRUCTION ESTIMATOR */}
        <div id="estimator" style={{ marginBottom: '5.5rem' }}>
          
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 3rem auto' }}>
            <div className="section-tag">Instant Estimator</div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
              Interactive Villa Construction Cost Calculator
            </h2>
            <p style={{ color: '#64748B', fontSize: '1rem', marginTop: 6 }}>
              Select your expected built-up area and quality tier for an accurate preliminary budget estimation.
            </p>
          </div>

          <div className="card-luxury" style={{ padding: '2.5rem', backgroundColor: '#FFFFFF', borderRadius: 24, border: '1px solid #E2E8F0' }}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Controls Column (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                
                {/* Built-up area slider */}
                <div>
                  <div className="flex justify-between items-center" style={{ marginBottom: 6 }}>
                    <label style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0F172A' }}>
                      Proposed Built-Up Area (sq.ft)
                    </label>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#166534', fontFamily: 'Outfit' }}>
                      {areaSqft.toLocaleString('en-IN')} sq.ft
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="10000"
                    step="100"
                    value={areaSqft}
                    onChange={(e) => setAreaSqft(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#166534', height: 8 }}
                  />
                  <div className="flex justify-between text-xs" style={{ color: '#94A3B8', fontSize: '0.75rem', marginTop: 4 }}>
                    <span>1,000 sq.ft (Bungalow)</span>
                    <span>5,000 sq.ft (Kothi)</span>
                    <span>10,000 sq.ft (Estate)</span>
                  </div>
                </div>

                {/* Package Tier Selection Cards */}
                <div>
                  <label style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0F172A', marginBottom: 8, display: 'block' }}>
                    Select Quality & Material Grade:
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {(Object.keys(packages) as Array<keyof typeof packages>).map((tierKey) => {
                      const tier = packages[tierKey];
                      const isSelected = packageTier === tierKey;
                      return (
                        <div
                          key={tierKey}
                          onClick={() => setPackageTier(tierKey)}
                          style={{
                            padding: '1.1rem',
                            borderRadius: 14,
                            cursor: 'pointer',
                            border: isSelected ? '2px solid #166534' : '1px solid #E2E8F0',
                            backgroundColor: isSelected ? '#EBF4EC' : '#F8FAFC',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <div style={{ fontWeight: 800, fontSize: '0.95rem', color: isSelected ? '#166534' : '#0F172A' }}>
                            {tier.name}
                          </div>
                          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: isSelected ? '#166534' : '#334155', fontFamily: 'Outfit', marginTop: 4 }}>
                            ₹{tier.rate} <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>/ sq.ft</span>
                          </div>
                          <p style={{ fontSize: '0.75rem', color: '#64748B', marginTop: 6, lineHeight: 1.4 }}>
                            {tier.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Estimate Summary Box (5 Cols) */}
              <div className="lg:col-span-5" style={{ backgroundColor: '#0B1120', color: '#FFFFFF', padding: '2.25rem', borderRadius: 20, boxShadow: '0 15px 35px rgba(11,17,32,0.2)' }}>
                <div style={{ fontSize: '0.8rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>
                  Estimated Turnkey Construction Cost
                </div>

                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#DFB76C', fontFamily: 'Outfit', margin: '0.5rem 0' }}>
                  {formatLakhs(totalEstimate)}
                </div>

                <p style={{ fontSize: '0.82rem', color: '#CBD5E1', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                  Based on <strong>{areaSqft.toLocaleString('en-IN')} sq.ft</strong> with <strong>{selectedPkg.name}</strong> standards in Dehradun.
                </p>

                {/* Breakdown Strip */}
                <div className="flex flex-col gap-2.5" style={{ borderTop: '1px solid #1E2E4F', paddingTop: '1.25rem', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
                  <div className="flex justify-between">
                    <span style={{ color: '#94A3B8' }}>Civil & Structural RCC (55%):</span>
                    <strong style={{ color: '#FFFFFF' }}>{formatLakhs(civilCost)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#94A3B8' }}>Finishes, Flooring & Woodwork (30%):</span>
                    <strong style={{ color: '#FFFFFF' }}>{formatLakhs(finishCost)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#94A3B8' }}>Electrical, Sanitary & Plumbing (15%):</span>
                    <strong style={{ color: '#FFFFFF' }}>{formatLakhs(mepCost)}</strong>
                  </div>
                </div>

                <a
                  href={`https://wa.me/918445190135?text=Hello%20A2%20Realtors%2C%20I%20used%20the%20cost%20estimator%20for%20${areaSqft}%20sqft%20(${selectedPkg.name}%20tier%20at%20${formatLakhs(totalEstimate)}).%20I%20would%20like%20to%20schedule%20a%20site%20meeting`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold w-full flex items-center justify-center gap-2"
                  style={{ borderRadius: 12, padding: '0.8rem', fontWeight: 800, width: '100%' }}
                >
                  <Phone size={16} /> Request Architectural Site Survey
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* 4. FOUR-STAGE ARCHITECTURAL EXECUTION ROADMAP */}
        <div style={{ marginBottom: '5.5rem' }}>
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 3rem auto' }}>
            <div className="section-tag">End-to-End Governance</div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
              Our 4-Stage Turnkey Architectural Process
            </h2>
            <p style={{ color: '#64748B', fontSize: '1rem', marginTop: 6 }}>
              Total visibility with weekly photo progress reports and certified quality tests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Architecture & Approvals',
                desc: 'Topographical soil survey, 3D BIM modeling, floor plan optimization, and MDDA sanction clearance.'
              },
              {
                step: '02',
                title: 'RCC Superstructure',
                desc: 'Anti-termite treatment, seismic column casting, Tata Tiscon Fe 550D rebar and M25 ready-mix concrete.'
              },
              {
                step: '03',
                title: 'Plumbing & Concealed MEP',
                desc: 'Astral CPVC pressure piping, Finolex fire-retardant wiring, acoustic sound insulation, and waterproofing.'
              },
              {
                step: '04',
                title: 'Turnkey Handover',
                desc: 'Precision Italian stone polishing, designer sanitary fittings, modular kitchen setup, and final OC certificate.'
              }
            ].map((st) => (
              <div 
                key={st.step}
                className="card-luxury"
                style={{ padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: 20 }}
              >
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#DFB76C', fontFamily: 'Outfit', marginBottom: '0.5rem' }}>
                  {st.step}
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.4rem' }}>
                  {st.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#64748B', lineHeight: 1.6 }}>
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. DELIVERED PROJECTS PORTFOLIO */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 3rem auto' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
              Delivered Architectural Milestones
            </h2>
            <p style={{ color: '#64748B', fontSize: '1rem', marginTop: 4 }}>
              Inspect our executed residential villas and commercial facades across Dehradun
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map(proj => (
              <div key={proj.id} className="card-luxury flex flex-col" style={{ backgroundColor: '#FFFFFF', borderRadius: 20, overflow: 'hidden' }}>
                <img src={proj.imageUrl} alt={proj.title} style={{ width: '100%', height: 280, objectFit: 'cover' }} />
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: '0.6rem' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#166534', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {proj.category}
                    </span>
                    <span style={{ fontSize: '0.82rem', color: '#94A3B8', fontWeight: 600 }}>Completed {proj.completionYear}</span>
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.35rem', lineHeight: 1.3 }}>{proj.title}</h3>
                  <div className="flex items-center gap-1.5" style={{ fontSize: '0.88rem', color: '#B45309', fontWeight: 600, marginBottom: '0.85rem' }}>
                    <MapPin size={15} /> <span>{proj.location}</span>
                  </div>
                  <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.25rem' }}>{proj.description}</p>
                  <div style={{ backgroundColor: '#F8FAFC', padding: '0.85rem 1.15rem', borderRadius: 12, fontSize: '0.85rem', color: '#334155', marginTop: 'auto', border: '1px solid #F1F5F9' }}>
                    <strong>Delivered Scope:</strong> {proj.scope}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. CONSULTATION & ESTIMATE REQUEST FORM */}
        <div className="card-luxury" style={{ maxWidth: 800, margin: '0 auto', padding: '2.75rem', backgroundColor: '#FFFFFF', borderRadius: 24, border: '1px solid #E2E8F0' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <CheckCircle2 size={52} style={{ color: '#166534', margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontSize: '1.6rem', color: '#0F172A', fontWeight: 800, marginBottom: '0.5rem' }}>
                Construction Inquiry Received!
              </h3>
              <p style={{ color: '#64748B', maxWidth: 520, margin: '0 auto 1.5rem auto', fontSize: '0.95rem' }}>
                Our chief project engineer will call you at <strong>{phone}</strong> to arrange a site meeting and architectural consultation.
              </p>
              <button onClick={() => setSubmitted(false)} className="btn-green btn-pill">
                Submit Another Consultation Query
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0F172A', textAlign: 'center', marginBottom: '0.35rem' }}>
                Schedule Architectural Site Consultation
              </h2>
              <p style={{ fontSize: '0.92rem', color: '#64748B', textAlign: 'center', marginBottom: '2rem' }}>
                Complimentary on-site plot measurement, soil inspection, and preliminary 3D floor plan layout.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="form-input" 
                    placeholder="e.g. Lt. Col. Arvind Rawat" 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input 
                    type="tel" 
                    required 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    className="form-input" 
                    placeholder="+91 98970 00000" 
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Project Scope</label>
                <select 
                  value={projectCategory} 
                  onChange={(e) => setProjectCategory(e.target.value)} 
                  className="form-select"
                >
                  <option value="Residential Turnkey Villa">New Turnkey Villa Construction</option>
                  <option value="Heritage Bungalow Remodeling">Heritage Remodeling & Renovation</option>
                  <option value="Commercial Plaza & Retail">Commercial Structural Construction</option>
                  <option value="Boundary & Land Development">Plot Boundary & Infrastructure</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Plot Location & Key Requirements</label>
                <textarea 
                  rows={3} 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  className="form-textarea" 
                  placeholder="e.g. 350 sq.yd plot in Rajpur Road, planning 4 BHK duplex with stilt parking..." 
                />
              </div>

              <button 
                type="submit" 
                className="btn-green w-full" 
                style={{ width: '100%', borderRadius: 12, padding: '0.9rem', fontSize: '1rem', fontWeight: 800, marginTop: '0.5rem' }}
              >
                <Phone size={17} /> Request Site Meeting & Detailed Estimate
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
