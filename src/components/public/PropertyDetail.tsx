import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, Bed, Bath, Maximize2, CheckCircle2, Phone, MessageSquare, 
  Calendar, ShieldCheck, FileText, Share2, Heart, Scale, User, School, Building2, ShoppingBag, Car
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { properties, submitPropertyEnquiry, scheduleSiteVisit, toggleFavorite, favorites, toggleCompare, compareList } = useStore();

  const property = properties.find(p => p.id === id || p.propertyCode === id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [showSiteVisitModal, setShowSiteVisitModal] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [requirement, setRequirement] = useState('');

  // Site Visit Modal states
  const [visitDate, setVisitDate] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
  const [visitTime, setVisitTime] = useState('11:00 AM');

  if (!property) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <h2>Property Not Found</h2>
        <p style={{ color: '#64748B', margin: '1rem 0' }}>The property listing you are looking for does not exist or has been archived.</p>
        <Link to="/search" className="btn btn-primary">Back to Search</Link>
      </div>
    );
  }

  const isFav = favorites.includes(property.id);
  const isComp = compareList.includes(property.id);

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    submitPropertyEnquiry({
      propertyId: property.id,
      name,
      phone,
      email,
      requirement
    });
    setEnquirySuccess(true);
  };

  const handleBookVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    
    // First create lead/enquiry
    submitPropertyEnquiry({
      propertyId: property.id,
      name,
      phone,
      email,
      requirement: `SITE VISIT REQUESTED for ${visitDate} at ${visitTime}`
    });

    // Schedule Visit
    scheduleSiteVisit({
      propertyId: property.id,
      customerName: name,
      customerPhone: phone,
      visitDate,
      visitTime
    });

    setShowSiteVisitModal(false);
    setEnquirySuccess(true);
  };

  const currentImage = property.images[activeImageIndex]?.url || property.images[0]?.url;

  return (
    <div style={{ backgroundColor: '#F8FAFC', paddingBottom: '6rem' }}>
      
      {/* Breadcrumb Navigation Header */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '0.85rem 0' }}>
        <div className="container flex items-center justify-between" style={{ fontSize: '0.88rem', color: '#64748B' }}>
          <div>
            <Link to="/" style={{ color: '#64748B' }}>Home</Link> / <Link to="/search" style={{ color: '#64748B' }}>Properties</Link> / <span style={{ color: '#0F172A', fontWeight: 600 }}>{property.propertyCode}</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => toggleCompare(property.id)} className="btn btn-outline btn-sm flex items-center gap-1">
              <Scale size={14} /> {isComp ? 'In Comparison' : 'Compare'}
            </button>
            <button onClick={() => toggleFavorite(property.id)} className="btn btn-outline btn-sm flex items-center gap-1">
              <Heart size={14} fill={isFav ? '#EF4444' : 'none'} style={{ color: isFav ? '#EF4444' : 'inherit' }} /> {isFav ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '2rem' }}>
        
        {/* Title, Address & Price Header */}
        <div className="flex flex-wrap items-start justify-between gap-4" style={{ marginBottom: '1.5rem' }}>
          <div>
            <div className="flex items-center gap-2" style={{ marginBottom: '0.5rem' }}>
              <span className="badge badge-featured">{property.transactionType}</span>
              {property.verified && <span className="badge badge-verified"><CheckCircle2 size={12} /> Title Verified</span>}
              <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>ID: {property.propertyCode}</span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>
              {property.title}
            </h1>
            <div className="flex items-center gap-1" style={{ color: '#64748B', fontSize: '1rem', marginTop: '0.35rem' }}>
              <MapPin size={16} style={{ color: '#D97706' }} />
              <span>{property.address}</span>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#D97706', fontFamily: 'Outfit' }}>
              {property.priceDisplay}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#64748B' }}>
              ₹{Math.round(property.price / property.areaSqft).toLocaleString('en-IN')}/sq.ft
            </div>
          </div>
        </div>

        {/* IMAGE GALLERY SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4" style={{ marginBottom: '2.5rem' }}>
          
          {/* Main Hero Image */}
          <div className="lg:col-span-2" style={{ position: 'relative', height: 440, borderRadius: 16, overflow: 'hidden', backgroundColor: '#0F172A' }}>
            <img 
              src={currentImage} 
              alt={property.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {property.images[activeImageIndex]?.caption && (
              <div style={{ position: 'absolute', bottom: 16, left: 16, backgroundColor: 'rgba(15,23,42,0.85)', color: '#FFF', padding: '0.4rem 0.85rem', borderRadius: 6, fontSize: '0.85rem', backdropFilter: 'blur(4px)' }}>
                📷 {property.images[activeImageIndex].caption}
              </div>
            )}
          </div>

          {/* Gallery Thumbnails List */}
          <div className="flex flex-col gap-3" style={{ height: 440, overflowY: 'auto' }}>
            {property.images.map((img, idx) => (
              <div
                key={img.id}
                onClick={() => setActiveImageIndex(idx)}
                style={{
                  height: 100,
                  borderRadius: 12,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: activeImageIndex === idx ? '3px solid #D97706' : '2px solid transparent',
                  opacity: activeImageIndex === idx ? 1 : 0.75,
                  transition: 'all 0.15s ease'
                }}
              >
                <img src={img.url} alt={`Thumbnail ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>

        </div>

        {/* MAIN BODY GRID: Details Left, Lead Capture Right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT 2 COLUMNS: PROPERTY SPECIFICATIONS & DESCRIPTION */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* Key Specs Bar */}
            <div className="card" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#0F172A' }}>Property Key Features</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" style={{ textAlign: 'center' }}>
                <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: 10 }}>
                  <Bed size={22} style={{ color: '#D97706', margin: '0 auto 0.35rem auto' }} />
                  <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{property.bedrooms || '-'} Beds</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Bedrooms</div>
                </div>
                <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: 10 }}>
                  <Bath size={22} style={{ color: '#D97706', margin: '0 auto 0.35rem auto' }} />
                  <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{property.bathrooms || '-'} Baths</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Bathrooms</div>
                </div>
                <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: 10 }}>
                  <Maximize2 size={22} style={{ color: '#D97706', margin: '0 auto 0.35rem auto' }} />
                  <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{property.areaSqft.toLocaleString('en-IN')}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Super Area (sq.ft)</div>
                </div>
                <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: 10 }}>
                  <Car size={22} style={{ color: '#D97706', margin: '0 auto 0.35rem auto' }} />
                  <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{property.parkingSpaces || 1} Vehicle</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Parking</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#0F172A' }}>Detailed Overview</h3>
              <div style={{ whiteSpace: 'pre-line', lineHeight: '1.75', color: '#334155', fontSize: '0.98rem' }}>
                {property.description}
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', color: '#0F172A' }}>Amenities & Features</h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {property.amenities.map(amenity => (
                  <div key={amenity} className="flex items-center gap-2" style={{ backgroundColor: '#F8FAFC', padding: '0.65rem 0.85rem', borderRadius: 8, fontSize: '0.9rem', color: '#1E293B' }}>
                    <CheckCircle2 size={16} style={{ color: '#10B981', flexShrink: 0 }} />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location & Nearby Amenities */}
            <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#0F172A' }}>Location & Neighborhood Highlights</h3>
              <p style={{ color: '#64748B', fontSize: '0.92rem', marginBottom: '1.25rem' }}>
                Situated in <strong>{property.location}</strong>. Landmark: {property.landmark || 'Prime Residential Corridor'}.
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginBottom: '1.5rem' }}>
                <div className="flex items-center gap-2" style={{ fontSize: '0.85rem', color: '#334155' }}>
                  <School size={18} style={{ color: '#D97706' }} /> Top Schools &lt; 2 km
                </div>
                <div className="flex items-center gap-2" style={{ fontSize: '0.85rem', color: '#4B5563' }}><Building2 size={16} style={{ color: '#386635' }} /> Max Super Speciality Hospital (2.5 km)</div>
                <div className="flex items-center gap-2" style={{ fontSize: '0.85rem', color: '#334155' }}>
                  <ShoppingBag size={18} style={{ color: '#D97706' }} /> Shopping Malls &lt; 1.5 km
                </div>
                <div className="flex items-center gap-2" style={{ fontSize: '0.85rem', color: '#334155' }}>
                  <Car size={18} style={{ color: '#D97706' }} /> ISBT/Railway Station 15 min
                </div>
              </div>

              {/* Interactive Map Placeholder / Embed Frame */}
              <div style={{ width: '100%', height: 260, borderRadius: 12, backgroundColor: '#E2E8F0', overflow: 'hidden', position: 'relative' }}>
                <iframe
                  title="Dehradun Property Location Map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(property.address + ' Dehradun')}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                />
              </div>
            </div>

            {/* Property Documents (Secure Preview) */}
            {property.documents && property.documents.length > 0 && (
              <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#0F172A' }}>Verified Documents & Clear Titles</h3>
                <div className="flex flex-col gap-2">
                  {property.documents.map(doc => (
                    <div key={doc.id} className="flex items-center justify-between" style={{ padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: 8 }}>
                      <div className="flex items-center gap-2">
                        <FileText size={18} style={{ color: '#D97706' }} />
                        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{doc.name}</span>
                      </div>
                      <span className="badge badge-verified">
                        <ShieldCheck size={12} /> {doc.visibility}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT COL: STICKY LEAD CAPTURE WIDGET & AGENT CARD */}
          <div className="flex flex-col gap-6" style={{ alignSelf: 'start', position: 'sticky', top: 90 }}>
            
            {/* Sticky Lead Capture Card */}
            <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF', border: '2px solid #FEF3C7', boxShadow: '0 10px 25px -5px rgba(217,119,6,0.15)' }}>
              
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.25rem' }}>
                Interested in this property?
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.25rem' }}>
                Schedule a guided site visit or talk directly with our A2 Realtors Dehradun property consultant.
              </p>

              {enquirySuccess ? (
                <div style={{ backgroundColor: '#D1FAE5', border: '1px solid #A7F3D0', padding: '1rem', borderRadius: 10, color: '#065F46', textAlign: 'center' }}>
                  <CheckCircle2 size={28} style={{ margin: '0 auto 0.5rem auto' }} />
                  <strong style={{ display: 'block', fontSize: '1rem' }}>Enquiry Received!</strong>
                  <p style={{ fontSize: '0.85rem', marginTop: 4 }}>
                    Our consultant will call you shortly. You can also reach us immediately at <strong>+91 84451 90135</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit}>
                  
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Alok Aggarwal"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98970 00000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address (Optional)</label>
                    <input
                      type="email"
                      placeholder="your.email@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Specific Requirement / Query</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. I want to inspect property title deed..."
                      value={requirement}
                      onChange={(e) => setRequirement(e.target.value)}
                      className="form-textarea"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-full" style={{ width: '100%', marginBottom: '0.75rem' }}>
                    <Phone size={16} /> Request Callback
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowSiteVisitModal(true)}
                    className="btn btn-outline w-full"
                    style={{ width: '100%', borderColor: '#D97706', color: '#B45309' }}
                  >
                    <Calendar size={16} /> Book Guided Site Visit
                  </button>

                </form>
              )}

            </div>

            {/* Assigned Consultant Card */}
            <div className="card" style={{ padding: '1.25rem', backgroundColor: '#FFFFFF' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Assigned Property Consultant
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150"
                  alt={property.assignedAgentName || 'Priya Verma'}
                  style={{ width: 54, height: 54, borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '1rem' }}>
                    {property.assignedAgentName || 'Priya Verma'}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B' }}>Senior Property Specialist</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#D97706', marginTop: 2 }}>
                    +91 84451 90135
                  </div>
                </div>
              </div>

              <div className="flex gap-2" style={{ marginTop: '1rem' }}>
                <a href="tel:+918445190135" className="btn btn-dark btn-sm flex-1">
                  <Phone size={14} /> Call Agent
                </a>
                <a
                  href={`https://wa.me/918445190135?text=Hi%20${property.assignedAgentName || 'Priya'}%2C%20I%20am%20inquiring%20about%20Property%20${property.propertyCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-sm flex-1"
                >
                  <MessageSquare size={14} /> WhatsApp
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* BOOK SITE VISIT MODAL */}
      {showSiteVisitModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="card" style={{ maxWidth: 480, width: '100%', padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: 16 }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
              Book Guided Site Visit
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.25rem' }}>
              Select your preferred date and time to visit <strong>{property.title}</strong> with our consultant.
            </p>

            <form onSubmit={handleBookVisitSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className="form-input" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="form-group">
                  <label className="form-label">Visit Date *</label>
                  <input type="date" required value={visitDate} onChange={(e) => setVisitDate(e.target.value)} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Preferred Time *</label>
                  <select value={visitTime} onChange={(e) => setVisitTime(e.target.value)} className="form-select">
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:30 PM">04:30 PM</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2" style={{ marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setShowSiteVisitModal(false)} className="btn btn-outline flex-1">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary flex-1">
                  Confirm Site Visit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
