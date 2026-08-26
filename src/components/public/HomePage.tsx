import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, Home, Landmark, Briefcase, FileCheck, ShieldCheck, 
  MapPin, Phone, Mail, ArrowRight, ArrowLeft, Star, Calendar, User, CheckCircle2, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Hero } from './Hero';
import { PropertyCard } from './PropertyCard';
import { useStore } from '../../context/StoreContext';
import { PropertyType } from '../../types';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { properties, blogPosts, submitGeneralContact, homepageSettings } = useStore();

  const [activePropertyTab, setActivePropertyTab] = useState<string>('ALL');

  // Contact Form states
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Dynamic Grid Columns Class for Property Showcase
  const gridColsClass = 
    homepageSettings.propertyGridCols === 2 ? 'lg:grid-cols-2' :
    homepageSettings.propertyGridCols === 3 ? 'lg:grid-cols-3' :
    homepageSettings.propertyGridCols === 6 ? 'lg:grid-cols-6' :
    'lg:grid-cols-4';

  // Filtered properties for "Best Properties Sale" section
  const filteredProperties = properties.filter(p => {
    if (!p.published) return false;
    if (activePropertyTab === 'ALL') return true;
    if (activePropertyTab === 'APARTMENT') return p.propertyType === 'APARTMENT';
    if (activePropertyTab === 'COMMERCIAL') return p.propertyType === 'COMMERCIAL';
    if (activePropertyTab === 'PLOT') return p.propertyType === 'PLOT';
    if (activePropertyTab === 'FARM') return p.propertyType === 'FARMHOUSE' || p.propertyType === 'INDEPENDENT_HOUSE';
    return true;
  }).slice(0, homepageSettings.maxPropertiesCount || 8);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone) return;
    submitGeneralContact({
      name: formName,
      email: formEmail,
      phone: formPhone,
      message: `Desired Date: ${formDate || 'N/A'}. Message: ${formMessage}`
    });
    setFormSubmitted(true);
  };

  // Property categories grid
  const categories = [
    { icon: Home, name: 'Kothi / Villa', count: '12 Property', type: 'INDEPENDENT_HOUSE' },
    { icon: Landmark, name: 'Plot / Land', count: '10 Property', type: 'PLOT' },
    { icon: Building2, name: 'Builder Floors', count: '02 Property', type: 'APARTMENT' },
    { icon: Briefcase, name: 'Office Space', count: '05 Property', type: 'COMMERCIAL' },
    { icon: MapPin, name: 'Plots & Floors', count: '02 Property', type: 'PLOT' },
    { icon: Building2, name: 'Commercial Property', count: '11 Property', type: 'COMMERCIAL' }
  ];

  // Developer partner logos
  const partnerLogos = [
    { name: 'DLF' },
    { name: 'M3M' },
    { name: 'Signature Global' },
    { name: 'Godrej Properties' },
    { name: 'Raheja' },
    { name: 'Sobha' },
    { name: 'Eldeco' },
    { name: 'Ashiana' }
  ];

  return (
    <div>
      
      {/* SECTION 1: HERO BANNER */}
      <Hero />

      {/* SECTION 2: DEVELOPER / PARTNER LOGOS ROW */}
      {homepageSettings.showPartnerLogos && (
        <div style={{ backgroundColor: '#FFFFFF', padding: '2rem 0', borderBottom: '1px solid #E5E7EB' }}>
          <div className="container">
            <div className="flex items-center justify-between gap-6" style={{ overflowX: 'auto', paddingBottom: '0.5rem' }}>
              {partnerLogos.map((brand, idx) => (
                <div key={idx} className="flex items-center justify-center" style={{ minWidth: 110, height: 48, filter: 'grayscale(100%)', opacity: 0.75, transition: 'all 0.2s ease' }} onMouseOver={(e) => (e.currentTarget.style.filter = 'grayscale(0%)')} onMouseOut={(e) => (e.currentTarget.style.filter = 'grayscale(100%)')}>
                  <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.1rem', color: '#111827', letterSpacing: '-0.02em' }}>{brand.name}</span>
                </div>
              ))}
            </div>

            {/* Slider Pagination Dots */}
            <div className="flex justify-center gap-1.5" style={{ marginTop: '1.25rem' }}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((dot, idx) => (
                <span key={idx} style={{ width: idx === 0 ? 10 : 6, height: 6, borderRadius: '50%', backgroundColor: idx === 0 ? '#386635' : '#D1D5DB', display: 'inline-block' }}></span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: CATEGORIES GRID */}
      {homepageSettings.showCategories && (
        <section style={{ padding: `${homepageSettings.sectionPaddingY || '4.5rem'} 0`, backgroundColor: '#FAFAFA' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            
            <div className="section-tag">— CATEGORIES —</div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#111827', marginBottom: '2.5rem' }}>
              {homepageSettings.categoriesTitle || 'Choose Your Property Type'}
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              {categories.map((cat, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate(`/search?category=${cat.type}`)}
                  style={{
                    backgroundColor: '#FFFFFF',
                    padding: '1.75rem 1rem',
                    borderRadius: 16,
                    border: '1px solid #E5E7EB',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.25s ease'
                  }}
                  className="card"
                >
                  <div style={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    backgroundColor: '#F3F4F6',
                    color: '#111827',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem auto'
                  }}>
                    <cat.icon size={22} />
                  </div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827', marginBottom: 2 }}>{cat.name}</h3>
                  <div style={{ fontSize: '0.78rem', color: '#6B7280' }}>{cat.count}</div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* SECTION 4: POPULAR PROPERTIES */}
      {homepageSettings.showPopularProperties && (
        <section style={{ padding: `${homepageSettings.sectionPaddingY || '4.5rem'} 0`, backgroundColor: '#FFFFFF' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            
            <div className="section-tag">— POPULAR PROPERTIES —</div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#111827', marginBottom: '1.75rem' }}>
              {homepageSettings.popularPropertiesTitle || 'Best Properties Sale'}
            </h2>

            {/* Filter Tabs */}
            <div className="flex justify-center gap-2" style={{ marginBottom: '2.5rem', flexWrap: 'wrap' }}>
              {[
                { id: 'ALL', label: 'View All' },
                { id: 'APARTMENT', label: 'Apartment' },
                { id: 'COMMERCIAL', label: 'Commercial' },
                { id: 'PLOT', label: 'Land Or Plot' },
                { id: 'FARM', label: 'Farm' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActivePropertyTab(tab.id)}
                  className={activePropertyTab === tab.id ? "btn-green btn-green-pill" : "btn-outline-gray"}
                  style={{ padding: '0.45rem 1.25rem', fontSize: '0.85rem', backgroundColor: activePropertyTab === tab.id ? '#386635' : undefined }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Dynamic Grid Columns & Gap Spacing */}
            <div className={`grid grid-cols-1 ${gridColsClass}`} style={{ textAlign: 'left', gap: homepageSettings.gridGap || '1.5rem' }}>
              {filteredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

          </div>
        </section>
      )}

      {/* SECTION 5: WHAT WE DO */}
      {homepageSettings.showWhatWeDo && (
        <section style={{ padding: '4.5rem 0', backgroundColor: '#FAFAFA' }}>
          <div className="container">
            
            <div className="section-tag">— WHAT WE DO —</div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#111827', marginBottom: '2.5rem' }}>
              {homepageSettings.whatWeDoTitle || 'See how A2 Realtors can Help'}
            </h2>

            {/* 4 Numbered White Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              
              <div className="card" style={{ padding: '2rem 1.5rem', backgroundColor: '#FFFFFF', position: 'relative', borderRadius: 16 }}>
                <div style={{ position: 'absolute', top: 16, right: 20, fontSize: '2.2rem', fontWeight: 800, color: '#E5E7EB', fontFamily: 'Outfit' }}>01</div>
                <div style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: '#EBF4EC', color: '#386635', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <Home size={20} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Residential Properties</h3>
                <p style={{ fontSize: '0.85rem', color: '#6B7280', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Apartments, villas, and luxury homes in Dehradun's top sectors.
                </p>
                <Link to="/buy" className="btn-outline-gray" style={{ fontSize: '0.78rem' }}>Read More</Link>
              </div>

              <div className="card" style={{ padding: '2rem 1.5rem', backgroundColor: '#FFFFFF', position: 'relative', borderRadius: 16 }}>
                <div style={{ position: 'absolute', top: 16, right: 20, fontSize: '2.2rem', fontWeight: 800, color: '#E5E7EB', fontFamily: 'Outfit' }}>02</div>
                <div style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: '#EBF4EC', color: '#386635', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <Briefcase size={20} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Commercial Properties</h3>
                <p style={{ fontSize: '0.85rem', color: '#6B7280', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Premium office spaces, co-working hubs, and retail shops.
                </p>
                <Link to="/commercial" className="btn-outline-gray" style={{ fontSize: '0.78rem' }}>Read More</Link>
              </div>

              <div className="card" style={{ padding: '2rem 1.5rem', backgroundColor: '#FFFFFF', position: 'relative', borderRadius: 16 }}>
                <div style={{ position: 'absolute', top: 16, right: 20, fontSize: '2.2rem', fontWeight: 800, color: '#E5E7EB', fontFamily: 'Outfit' }}>03</div>
                <div style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: '#EBF4EC', color: '#386635', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <Landmark size={20} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Property Consultation</h3>
                <p style={{ fontSize: '0.85rem', color: '#6B7280', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Expert guidance on investments, resale, and property management.
                </p>
                <Link to="/about" className="btn-outline-gray" style={{ fontSize: '0.78rem' }}>Read More</Link>
              </div>

              <div className="card" style={{ padding: '2rem 1.5rem', backgroundColor: '#FFFFFF', position: 'relative', borderRadius: 16 }}>
                <div style={{ position: 'absolute', top: 16, right: 20, fontSize: '2.2rem', fontWeight: 800, color: '#E5E7EB', fontFamily: 'Outfit' }}>04</div>
                <div style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: '#EBF4EC', color: '#386635', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <FileCheck size={20} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Loan & Legal Assistance</h3>
                <p style={{ fontSize: '0.85rem', color: '#6B7280', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Hassle-free support for home loans, paperwork, and documentation.
                </p>
                <Link to="/contact" className="btn-outline-gray" style={{ fontSize: '0.78rem' }}>Read More</Link>
              </div>

            </div>

          </div>
        </section>
      )}

      {/* SECTION 6: TESTIMONIALS */}
      {homepageSettings.showTestimonials && (
        <section style={{ padding: '4.5rem 0', backgroundColor: '#FFFFFF' }}>
          <div className="container" style={{ textAlign: 'center', maxWidth: 840 }}>
            
            <div className="section-tag">— TESTIMONIALS —</div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#111827', marginBottom: '2rem' }}>
              {homepageSettings.testimonialsTitle || 'What Clients Say About Pillar'}
            </h2>

            <div style={{ fontSize: '4.5rem', color: '#EBF4EC', lineHeight: 1, fontFamily: 'serif', marginBottom: '0.5rem' }}>
              ”
            </div>

            <p style={{ fontSize: '1.15rem', color: '#111827', fontWeight: 700, lineHeight: 1.6, marginBottom: '1.5rem' }}>
              As an NRI, I was worried about investing in Dehradun real estate, but A2 Realtors handled everything smoothly. From documentation to final handover, their services exceeded my expectations.
            </p>

            <div className="flex justify-center gap-1" style={{ color: '#F59E0B', marginBottom: '1.25rem' }}>
              {[1, 2, 3, 4, 5].map(s => <Star key={s} size={18} fill="#F59E0B" />)}
            </div>

            <div className="flex flex-col items-center gap-1" style={{ marginBottom: '2rem' }}>
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
                alt="Amit Khurana"
                style={{ width: 54, height: 54, borderRadius: '50%', objectFit: 'cover', border: '2px solid #386635' }}
              />
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#111827', marginTop: 4 }}>Amit Khurana</div>
              <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>Property owner</div>
            </div>

            <div className="flex items-center gap-4" style={{ maxWidth: 400, margin: '0 auto' }}>
              <button style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280' }}>
                <ChevronLeft size={16} />
              </button>

              <div style={{ flexGrow: 1, height: 2, backgroundColor: '#386635', position: 'relative' }}>
                <span style={{ position: 'absolute', top: -3, left: '30%', width: 8, height: 8, borderRadius: '50%', backgroundColor: '#386635' }}></span>
              </div>

              <button style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280' }}>
                <ChevronRight size={16} />
              </button>
            </div>

          </div>
        </section>
      )}

      {/* SECTION 7: GET IN TOUCH FLOATING FORM */}
      {homepageSettings.showContactForm && (
        <section style={{ padding: '4.5rem 0', backgroundColor: '#FAFAFA' }}>
          <div className="container">
            
            <div style={{
              position: 'relative',
              borderRadius: 24,
              overflow: 'hidden',
              backgroundImage: 'linear-gradient(to right, rgba(11,15,25,0.2), rgba(11,15,25,0.7)), url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1600")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              padding: '3rem 2rem',
              display: 'flex',
              justifyContent: 'flex-end'
            }}>

              <div className="card" style={{ maxWidth: 480, width: '100%', padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: 20, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
                
                <div className="section-tag" style={{ marginBottom: '0.25rem' }}>— GET IN TOUCH —</div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1.25rem' }}>
                  {homepageSettings.contactTitle || "Let's Talk Your Property Goal"}
                </h3>

                {formSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                    <CheckCircle2 size={42} style={{ color: '#386635', margin: '0 auto 0.75rem auto' }} />
                    <strong style={{ display: 'block', fontSize: '1.1rem', color: '#111827' }}>Message Sent!</strong>
                    <p style={{ fontSize: '0.85rem', color: '#6B7280', marginTop: 4 }}>
                      Our sales advisor will reach out to <strong>{formPhone}</strong> shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit}>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label" style={{ fontSize: '0.78rem' }}>Name*</label>
                        <input type="text" required placeholder="Your Name" value={formName} onChange={(e) => setFormName(e.target.value)} className="form-input" style={{ padding: '0.55rem 0.75rem', fontSize: '0.85rem' }} />
                      </div>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label" style={{ fontSize: '0.78rem' }}>Email*</label>
                        <input type="email" required placeholder="Email Address" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} className="form-input" style={{ padding: '0.55rem 0.75rem', fontSize: '0.85rem' }} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3" style={{ marginTop: '0.75rem' }}>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label" style={{ fontSize: '0.78rem' }}>Phone Number*</label>
                        <input type="tel" required placeholder="Phone Number" value={formPhone} onChange={(e) => setFormPhone(e.target.value)} className="form-input" style={{ padding: '0.55rem 0.75rem', fontSize: '0.85rem' }} />
                      </div>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label" style={{ fontSize: '0.78rem' }}>Desired Date*</label>
                        <input type="date" value={formDate} onChange={(e) => setFormDate(e.target.value)} className="form-input" style={{ padding: '0.55rem 0.75rem', fontSize: '0.85rem' }} />
                      </div>
                    </div>

                    <div className="form-group" style={{ marginTop: '0.75rem', marginBottom: '1.25rem' }}>
                      <label className="form-label" style={{ fontSize: '0.78rem' }}>Additional Message</label>
                      <textarea rows={3} placeholder="Please write any note here..." value={formMessage} onChange={(e) => setFormMessage(e.target.value)} className="form-textarea" style={{ padding: '0.55rem 0.75rem', fontSize: '0.85rem' }} />
                    </div>

                    <button type="submit" className="btn-green w-full" style={{ width: '100%', borderRadius: 8, padding: '0.7rem', backgroundColor: '#386635' }}>
                      Submit Now
                    </button>

                  </form>
                )}

              </div>

            </div>

          </div>
        </section>
      )}

      {/* SECTION 8: HELPFUL REAL ESTATE ARTICLES */}
      {homepageSettings.showLatestArticles && (
        <section style={{ padding: '4.5rem 0', backgroundColor: '#FFFFFF' }}>
          <div className="container">
            
            <div className="flex flex-wrap items-center justify-between gap-4" style={{ marginBottom: '2.5rem' }}>
              <div>
                <div className="section-tag">— LATEST NEWS —</div>
                <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#111827' }}>
                  {homepageSettings.articlesTitle || 'Helpful Real Estate Articles'}
                </h2>
              </div>
              <Link to="/insights" className="btn-outline-gray">
                Explore All Post
              </Link>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              <div className="card flex flex-col" style={{ backgroundColor: '#FFFFFF', borderRadius: 16 }}>
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800" alt="Article main" style={{ width: '100%', height: 260, objectFit: 'cover' }} />
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ fontSize: '0.78rem', color: '#6B7280', marginBottom: 4 }}>March 19, 2024 • 3 min read</div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', lineHeight: 1.3, marginBottom: '0.5rem' }}>
                    Building gains into housing stocks and how to trade the sector
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#6B7280', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    On the Querio mobile app, gamified tours in the cities of Rajpur Road, Dalanwala, and Mussoorie take you on a trip to reveal pieces of design.
                  </p>
                  <div className="flex items-center justify-between" style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #F3F4F6' }}>
                    <div className="flex items-center gap-2" style={{ fontSize: '0.8rem', color: '#374151' }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <User size={14} />
                      </div>
                      <span>Written by <strong>Admin</strong></span>
                    </div>
                    <Link to="/insights" className="btn-outline-gray" style={{ fontSize: '0.78rem' }}>Read More</Link>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                
                <div className="card flex flex-col lg:flex-row" style={{ backgroundColor: '#FFFFFF', borderRadius: 16, overflow: 'hidden' }}>
                  <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=500" alt="Article 2" style={{ width: '100%', height: 160, objectFit: 'cover' }} className="lg:w-48" />
                  <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: 2 }}>March 20, 2024 • 2 min read</div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', lineHeight: 1.3, marginBottom: '0.35rem' }}>
                      Choosing a Reliable Real Estate Agent.
                    </h4>
                    <div className="flex items-center justify-between" style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid #F3F4F6' }}>
                      <div style={{ fontSize: '0.78rem', color: '#374151' }}>Written by <strong>Admin</strong></div>
                      <Link to="/insights" className="btn-outline-gray" style={{ fontSize: '0.75rem', padding: '0.3rem 0.75rem' }}>Read More</Link>
                    </div>
                  </div>
                </div>

                <div className="card flex flex-col lg:flex-row" style={{ backgroundColor: '#FFFFFF', borderRadius: 16, overflow: 'hidden' }}>
                  <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=500" alt="Article 3" style={{ width: '100%', height: 160, objectFit: 'cover' }} className="lg:w-48" />
                  <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: 2 }}>March 20, 2024 • 2 min read</div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', lineHeight: 1.3, marginBottom: '0.35rem' }}>
                      Breaking down the latest tech trends
                    </h4>
                    <div className="flex items-center justify-between" style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid #F3F4F6' }}>
                      <div style={{ fontSize: '0.78rem', color: '#374151' }}>Written by <strong>Admin</strong></div>
                      <Link to="/insights" className="btn-outline-gray" style={{ fontSize: '0.75rem', padding: '0.3rem 0.75rem' }}>Read More</Link>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>
      )}

    </div>
  );
};
