import React, { useState } from 'react';
import { Building2, Phone, CheckCircle2, ShieldCheck, ArrowRight, Upload, MessageSquare } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const SellPage: React.FC = () => {
  const { submitOwnerPropertyListing, locations } = useStore();

  const [submitted, setSubmitted] = useState(false);
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [propertyType, setPropertyType] = useState('INDEPENDENT_HOUSE');
  const [location, setLocation] = useState('Dalanwala');
  const [areaSqft, setAreaSqft] = useState<number | ''>(2400);
  const [expectedPrice, setExpectedPrice] = useState<number | ''>(18500000);
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerName || !phone || !expectedPrice || !areaSqft) return;

    submitOwnerPropertyListing({
      ownerName,
      phone,
      email,
      propertyType,
      location,
      areaSqft: Number(areaSqft),
      expectedPrice: Number(expectedPrice),
      description
    });

    setSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC', paddingBottom: '6rem' }}>
      
      {/* Hero Header */}
      <div style={{ backgroundColor: '#0F172A', color: '#FFFFFF', padding: '4.5rem 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: 800 }}>
          <div className="badge badge-featured" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            🏡 For Dehradun Property Owners
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '1rem', lineHeight: 1.2 }}>
            Thinking About <span style={{ color: '#D97706', fontFamily: 'Playfair Display', fontStyle: 'italic' }}>Selling Your Property?</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#CBD5E1', lineHeight: 1.6 }}>
            A2 Realtors helps property owners showcase their residential houses, plots, flats, and commercial assets to verified serious buyers with total privacy and professional guidance.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '-2.5rem', position: 'relative', zIndex: 10 }}>
        
        {/* Process Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ marginBottom: '3rem' }}>
          <div className="card" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF' }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', backgroundColor: '#FEF3C7', color: '#B45309', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.75rem' }}>1</div>
            <h3 style={{ fontSize: '1.1rem', color: '#0F172A', marginBottom: '0.35rem' }}>Verified Buyer Matching</h3>
            <p style={{ fontSize: '0.88rem', color: '#64748B' }}>We connect your property directly with pre-qualified buyers seeking inventory in your exact locality.</p>
          </div>
          <div className="card" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF' }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', backgroundColor: '#FEF3C7', color: '#B45309', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.75rem' }}>2</div>
            <h3 style={{ fontSize: '1.1rem', color: '#0F172A', marginBottom: '0.35rem' }}>Transparent Valuation</h3>
            <p style={{ fontSize: '0.88rem', color: '#64748B' }}>Get genuine Dehradun market price recommendations based on real transactional benchmarks.</p>
          </div>
          <div className="card" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF' }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', backgroundColor: '#FEF3C7', color: '#B45309', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.75rem' }}>3</div>
            <h3 style={{ fontSize: '1.1rem', color: '#0F172A', marginBottom: '0.35rem' }}>End-to-End Assistance</h3>
            <p style={{ fontSize: '0.88rem', color: '#64748B' }}>Our staff manages site visits, buyer negotiations, title verification, and deal closing documentation.</p>
          </div>
        </div>

        {/* Form Container */}
        <div className="card" style={{ maxWidth: 840, margin: '0 auto', padding: '2.5rem', backgroundColor: '#FFFFFF', borderRadius: 20, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
          
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <CheckCircle2 size={54} style={{ color: '#10B981', margin: '0 auto 1rem auto' }} />
              <h2 style={{ fontSize: '1.8rem', color: '#0F172A', marginBottom: '0.5rem' }}>Property Submitted Successfully!</h2>
              <p style={{ color: '#64748B', maxWidth: 520, margin: '0 auto 1.5rem auto', lineHeight: 1.6 }}>
                Thank you <strong>{ownerName}</strong>. Our senior property acquisition manager will review your submission and contact you at <strong>{phone}</strong> to verify title details and schedule an intake visit.
              </p>

              <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12, padding: '1.25rem', maxWidth: 460, margin: '0 auto 2rem auto', textAlign: 'left', fontSize: '0.9rem' }}>
                <div className="flex justify-between" style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#64748B' }}>Owner Name:</span>
                  <strong>{ownerName}</strong>
                </div>
                <div className="flex justify-between" style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#64748B' }}>Locality:</span>
                  <strong>{location}</strong>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#64748B' }}>Expected Price:</span>
                  <strong style={{ color: '#D97706' }}>₹{(Number(expectedPrice) / 100000).toFixed(2)} Lakhs</strong>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <a href="tel:+918445190135" className="btn btn-primary">
                  <Phone size={16} /> Speak to Sales Manager Now
                </a>
                <button onClick={() => setSubmitted(false)} className="btn btn-outline">
                  Submit Another Property
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 style={{ fontSize: '1.5rem', color: '#0F172A', marginBottom: '0.5rem', textAlign: 'center' }}>
                List Your Dehradun Property with A2 Realtors
              </h2>
              <p style={{ fontSize: '0.92rem', color: '#64748B', textAlign: 'center', marginBottom: '2rem' }}>
                Enter your property specs below. Our team will verify ownership and connect with serious prospects.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                
                {/* Owner Name */}
                <div className="form-group">
                  <label className="form-label">Property Owner Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lt. Gen. Devender Bisht"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="form-input"
                  />
                </div>

                {/* Phone */}
                <div className="form-group">
                  <label className="form-label">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98970 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-input"
                  />
                </div>

                {/* Email */}
                <div className="form-group">
                  <label className="form-label">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="owner@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                  />
                </div>

                {/* Property Type */}
                <div className="form-group">
                  <label className="form-label">Property Category *</label>
                  <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="form-select">
                    <option value="INDEPENDENT_HOUSE">Independent House / Bungalow</option>
                    <option value="APARTMENT">Flat / Penthouse</option>
                    <option value="PLOT">Residential Plot / Land</option>
                    <option value="COMMERCIAL">Commercial Office / Shop</option>
                    <option value="FARMHOUSE">Farmhouse & Hill Estate</option>
                  </select>
                </div>

                {/* Locality */}
                <div className="form-group">
                  <label className="form-label">Locality in Dehradun *</label>
                  <select value={location} onChange={(e) => setLocation(e.target.value)} className="form-select">
                    {locations.map(loc => (
                      <option key={loc.id} value={loc.name}>{loc.name}</option>
                    ))}
                  </select>
                </div>

                {/* Area Sq.ft */}
                <div className="form-group">
                  <label className="form-label">Total Area (sq.ft / sq.yards) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 2400"
                    value={areaSqft}
                    onChange={(e) => setAreaSqft(e.target.value ? Number(e.target.value) : '')}
                    className="form-input"
                  />
                </div>

                {/* Expected Price */}
                <div className="form-group lg:col-span-2">
                  <label className="form-label">Expected Asking Price (₹) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 18500000 for ₹1.85 Cr"
                    value={expectedPrice}
                    onChange={(e) => setExpectedPrice(e.target.value ? Number(e.target.value) : '')}
                    className="form-input"
                  />
                  {expectedPrice !== '' && expectedPrice > 0 && (
                    <span style={{ fontSize: '0.8rem', color: '#D97706', marginTop: 2, fontWeight: 600 }}>
                      Formatted: ₹{(Number(expectedPrice) / 100000).toFixed(2)} Lakhs
                    </span>
                  )}
                </div>

                {/* Description */}
                <div className="form-group lg:col-span-2">
                  <label className="form-label">Key Highlights / Description</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Corner property facing 40ft road, freehold title deed..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-textarea"
                  />
                </div>

              </div>

              <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: 10, marginTop: '1rem', marginBottom: '1.5rem', fontSize: '0.82rem', color: '#64748B' }}>
                🔒 <strong>Privacy Assurance:</strong> Your contact details and property documents remain strictly private. We never publish owner numbers publicly.
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-full" style={{ width: '100%' }}>
                Submit Property for Valuation & Listing <ArrowRight size={18} />
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
