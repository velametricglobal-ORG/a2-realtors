import React, { useState } from 'react';
import { Building2, Phone, CheckCircle2, ShieldCheck, ArrowRight, Upload, MessageSquare, Clock, Check, Sparkles, MapPin } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ImageUploadInput } from '../common/ImageUploadInput';

export const SellPage: React.FC = () => {
  const { submitOwnerPropertyListing, locations } = useStore();

  const [submitted, setSubmitted] = useState(false);
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [propertyType, setPropertyType] = useState('INDEPENDENT_HOUSE');
  const [location, setLocation] = useState('Dalanwala');
  const [address, setAddress] = useState('Dalanwala, Dehradun');
  const [areaSqft, setAreaSqft] = useState<number | ''>(2400);
  const [bedrooms, setBedrooms] = useState<number | ''>(3);
  const [bathrooms, setBathrooms] = useState<number | ''>(3);
  const [expectedPrice, setExpectedPrice] = useState<number | ''>(18500000);
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200');
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
      description: description || `${propertyType.replace('_', ' ')} in ${location}. Area: ${areaSqft} sq.ft.`
    });

    setSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC', paddingBottom: '6rem' }}>
      
      {/* Hero Header */}
      <div style={{ backgroundColor: '#0B1120', color: '#FFFFFF', padding: '6rem 0 5rem 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: 840 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, backgroundColor: 'rgba(56,102,53,0.3)', border: '1px solid rgba(56,102,53,0.6)', padding: '0.35rem 1rem', borderRadius: 20, fontSize: '0.8rem', fontWeight: 700, color: '#A7F3D0', marginBottom: '1.25rem' }}>
            <Sparkles size={14} /> Verified Direct Buyer Network
          </div>
          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '1.25rem', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            Thinking About <span style={{ color: '#DFB76C', fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>Selling Your Property?</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#94A3B8', lineHeight: 1.7, maxWidth: 760, margin: '0 auto' }}>
            List your residential villa, luxury flat, plot, or commercial space with A2 Realtors. All listings go through swift administrative review before going live to thousands of pre-qualified buyers.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '-2.5rem', position: 'relative', zIndex: 10 }}>
        
        {/* Process Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ marginBottom: '3rem' }}>
          <div className="card flex flex-col justify-between" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF', borderRadius: 16, border: '1px solid #E2E8F0' }}>
            <div>
              <div style={{ width: 42, height: 42, borderRadius: '50%', backgroundColor: '#EBF4EC', color: '#386635', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.85rem' }}>1</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.45rem', lineHeight: 1.3 }}>Submit Property Details</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.6 }}>Share your property specifications, photos, and expected valuation securely through our portal.</p>
            </div>
          </div>
          <div className="card flex flex-col justify-between" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF', borderRadius: 16, border: '1px solid #E2E8F0' }}>
            <div>
              <div style={{ width: 42, height: 42, borderRadius: '50%', backgroundColor: '#EBF4EC', color: '#386635', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.85rem' }}>2</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.45rem', lineHeight: 1.3 }}>Admin Title Verification</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.6 }}>Our compliance desk verifies ownership papers and approves the listing for high-intent buyers.</p>
            </div>
          </div>
          <div className="card flex flex-col justify-between" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF', borderRadius: 16, border: '1px solid #E2E8F0' }}>
            <div>
              <div style={{ width: 42, height: 42, borderRadius: '50%', backgroundColor: '#EBF4EC', color: '#386635', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.85rem' }}>3</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.45rem', lineHeight: 1.3 }}>Goes Live & Matched</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.6 }}>Once approved, your property is published on our public website and shared with VIP NRI investors.</p>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="card" style={{ maxWidth: 840, margin: '0 auto', padding: '2.5rem', backgroundColor: '#FFFFFF', borderRadius: 20, boxShadow: '0 20px 40px rgba(0,0,0,0.08)', border: '1px solid #E2E8F0' }}>
          
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', backgroundColor: '#D1FAE5', color: '#065F46', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                <CheckCircle2 size={44} />
              </div>
              <div style={{ display: 'inline-block', backgroundColor: '#FEF3C7', color: '#92400E', padding: '0.35rem 0.9rem', borderRadius: 20, fontSize: '0.82rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                <Clock size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} /> Submitted for Admin Approval
              </div>
              <h2 style={{ fontSize: '1.8rem', color: '#0F172A', fontWeight: 800, marginBottom: '0.5rem' }}>Property Submitted Successfully!</h2>
              <p style={{ color: '#64748B', maxWidth: 560, margin: '0 auto 1.5rem auto', lineHeight: 1.7, fontSize: '0.95rem' }}>
                Thank you <strong>{ownerName}</strong>. Your property listing is now pending administrative approval in our CRM review desk. Our team will verify your submission and approve it to go live on the public website.
              </p>

              <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12, padding: '1.25rem', maxWidth: 460, margin: '0 auto 2rem auto', textAlign: 'left', fontSize: '0.9rem' }}>
                <div className="flex justify-between" style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#64748B' }}>Owner / Contact:</span>
                  <strong>{ownerName} ({phone})</strong>
                </div>
                <div className="flex justify-between" style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#64748B' }}>Locality:</span>
                  <strong>{location}</strong>
                </div>
                <div className="flex justify-between" style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#64748B' }}>Status:</span>
                  <strong style={{ color: '#D97706' }}>Pending Admin Review</strong>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#64748B' }}>Asking Valuation:</span>
                  <strong style={{ color: '#386635' }}>₹{(Number(expectedPrice) / 100000).toFixed(2)} Lakhs</strong>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <a href="tel:+918445190135" className="btn btn-primary" style={{ backgroundColor: '#386635' }}>
                  <Phone size={16} /> Contact Approval Desk (+91 84451 90135)
                </a>
                <button onClick={() => setSubmitted(false)} className="btn btn-outline">
                  Submit Another Property
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 style={{ fontSize: '1.6rem', color: '#0F172A', fontWeight: 800, marginBottom: '0.5rem', textAlign: 'center' }}>
                List Your Dehradun Property with A2 Realtors
              </h2>
              <p style={{ fontSize: '0.92rem', color: '#64748B', textAlign: 'center', marginBottom: '2rem' }}>
                Submissions are sent directly to the Admin Approval Panel for verification before appearing live on the public site.
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
                    <option value="INDEPENDENT_HOUSE">Independent House / Luxury Villa</option>
                    <option value="APARTMENT">Flat / Penthouse</option>
                    <option value="PLOT">Residential Plot / Land</option>
                    <option value="COMMERCIAL">Commercial Office / Showroom</option>
                    <option value="FARMHOUSE">Farmhouse & Hill Estate</option>
                  </select>
                </div>

                {/* Locality */}
                <div className="form-group">
                  <label className="form-label">Locality in Dehradun *</label>
                  <select value={location} onChange={(e) => { setLocation(e.target.value); setAddress(`${e.target.value}, Dehradun`); }} className="form-select">
                    {locations.map(loc => (
                      <option key={loc.id} value={loc.name}>{loc.name}</option>
                    ))}
                  </select>
                </div>

                {/* Total Area */}
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

                {/* Bedrooms & Bathrooms if not Plot */}
                {propertyType !== 'PLOT' && (
                  <>
                    <div className="form-group">
                      <label className="form-label">Bedrooms (BHK)</label>
                      <input
                        type="number"
                        min={1}
                        max={20}
                        value={bedrooms}
                        onChange={(e) => setBedrooms(e.target.value ? Number(e.target.value) : '')}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Bathrooms</label>
                      <input
                        type="number"
                        min={1}
                        max={20}
                        value={bathrooms}
                        onChange={(e) => setBathrooms(e.target.value ? Number(e.target.value) : '')}
                        className="form-input"
                      />
                    </div>
                  </>
                )}

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
                  {expectedPrice !== '' && Number(expectedPrice) > 0 && (
                    <span style={{ fontSize: '0.8rem', color: '#386635', marginTop: 4, fontWeight: 700, display: 'block' }}>
                      Valuation: {Number(expectedPrice) >= 10000000 ? `₹${(Number(expectedPrice) / 10000000).toFixed(2)} Cr` : `₹${(Number(expectedPrice) / 100000).toFixed(2)} Lakhs`}
                    </span>
                  )}
                </div>

                {/* Property Photo (Web Link or Local Device Upload) */}
                <div className="lg:col-span-2">
                  <ImageUploadInput
                    label="Property Photo"
                    value={imageUrl}
                    onChange={(newVal) => setImageUrl(newVal)}
                    placeholder="https://images.unsplash.com/..."
                    helpText="Upload real site photos from your phone/computer or provide a web URL link"
                  />
                </div>

                {/* Description */}
                <div className="form-group lg:col-span-2">
                  <label className="form-label">Key Highlights / Description</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. 40ft road frontage, east facing, freehold title deed, mountain views..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-textarea"
                  />
                </div>

              </div>

              <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: 10, marginTop: '1rem', marginBottom: '1.5rem', fontSize: '0.82rem', color: '#64748B', border: '1px solid #F1F5F9' }}>
                🛡️ <strong>Admin Approval Gate:</strong> Submitted listings are routed directly to the CRM Approval Desk for quality check. Once approved, they will appear automatically on the public website.
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-full" style={{ width: '100%', backgroundColor: '#386635', fontWeight: 700 }}>
                Submit Property for Admin Approval <ArrowRight size={18} />
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
