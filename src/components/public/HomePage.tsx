import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, Home, Landmark, Briefcase, FileCheck, ShieldCheck, 
  MapPin, Phone, Mail, ArrowRight, ArrowLeft, Star, Calendar, User, 
  CheckCircle2, ChevronLeft, ChevronRight, Sparkles, Trees, Hammer
} from 'lucide-react';
import { Hero } from './Hero';
import { TrustStatsBar } from './TrustStatsBar';
import { LocalityExplorer } from './LocalityExplorer';
import { EMICalculator } from './EMICalculator';
import { PropertyCard } from './PropertyCard';
import { useStore } from '../../context/StoreContext';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { properties, blogPosts, submitGeneralContact, homepageSettings } = useStore();

  const [activePropertyTab, setActivePropertyTab] = useState<string>('ALL');

  // Contact Form states
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formCategory, setFormCategory] = useState('Buy Residential Property');
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
    if (activePropertyTab === 'VILLA') return p.propertyType === 'INDEPENDENT_HOUSE' || p.propertyType === 'FARMHOUSE';
    return true;
  }).slice(0, homepageSettings.maxPropertiesCount || 8);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone) return;
    submitGeneralContact({
      name: formName,
      email: formEmail,
      phone: formPhone,
      message: `Preferred Category: ${formCategory}. Preferred Date: ${formDate || 'ASAP'}. Note: ${formMessage}`
    });
    setFormSubmitted(true);
  };

  // Property categories grid
  const categories = [
    { icon: Home, name: 'Kothi / Luxury Villa', count: '14 Properties', type: 'INDEPENDENT_HOUSE', desc: 'Rajpur Road & Dalanwala' },
    { icon: Building2, name: 'Apartments & Penthouses', count: '28 Properties', type: 'APARTMENT', desc: 'Gated Hill-view Communities' },
    { icon: Landmark, name: 'Residential Plots', count: '19 Properties', type: 'PLOT', desc: 'Freehold MDDA Approved Land' },
    { icon: Briefcase, name: 'Commercial Spaces', count: '12 Properties', type: 'COMMERCIAL', desc: 'High ROI Retail & Offices' },
    { icon: Trees, name: 'Farmhouses & Estates', count: '8 Properties', type: 'FARMHOUSE', desc: 'Mussoorie Foothills' },
    { icon: Hammer, name: 'Bespoke Construction', count: 'Turnkey Execution', type: 'CONSTRUCTION', desc: 'Architectural Design & Build' }
  ];

  // Developer partner logos
  const partnerLogos = [
    { name: 'DLF India' },
    { name: 'Godrej Properties' },
    { name: 'M3M Luxury' },
    { name: 'Signature Global' },
    { name: 'Pacific Development' },
    { name: 'Eldeco Group' },
    { name: 'Sobha Developers' },
    { name: 'Ashiana Housing' }
  ];

  const testimonials = [
    {
      quote: "As an NRI based in Dubai, purchasing property in Dehradun seemed daunting. A2 Realtors handled complete title verification, mutation documents, and smooth registration for our Rajpur Road villa. Absolute transparency!",
      name: "Brig. Rajiv Sharma (Retd.)",
      role: "Luxury Villa Owner, Rajpur Road",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      rating: 5
    },
    {
      quote: "We wanted a clean plot near Sahastradhara Road with verified legal titles. A2 Realtors guided us through the entire MDDA layout check and bank loan processing within 10 days. Outstanding team!",
      name: "Dr. Sunita & Alok Aggarwal",
      role: "Plot Buyers, Sahastradhara Corridor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      rating: 5
    },
    {
      quote: "Found a prime commercial showroom floor on GMS Road for our diagnostic clinic. Their local market intelligence and negotiation skills helped us acquire it at 15% below developer rates.",
      name: "Mr. Harshvardhan Rawat",
      role: "Commercial Investor, GMS Road",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
      rating: 5
    }
  ];

  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      
      {/* 1. CINEMATIC HERO BANNER */}
      <Hero />

      {/* 2. TRUST & MARKET STATS COUNTER BAR */}
      <TrustStatsBar />

      {/* 3. DEVELOPER PARTNER LOGOS BAR */}
      {homepageSettings.showPartnerLogos && (
        <div style={{ backgroundColor: '#FAFAFA', padding: '2rem 0', borderBottom: '1px solid #E2E8F0' }}>
          <div className="container">
            <div style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: 800, color: '#94A3B8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              Trusted Advisory Partners & Approved Developers
            </div>
            
            <div className="flex items-center justify-between gap-6" style={{ overflowX: 'auto', paddingBottom: '0.5rem' }}>
              {partnerLogos.map((brand, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-center" 
                  style={{ 
                    minWidth: 130, 
                    height: 48, 
                    backgroundColor: '#FFFFFF',
                    borderRadius: 10,
                    border: '1px solid #E2E8F0',
                    padding: '0.5rem 1rem',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = '#386635';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '0.95rem', color: '#334155' }}>
                    {brand.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. EXPLORE PRIME DEHRADUN HOTSPOTS */}
      <LocalityExplorer />

      {/* 5. PROPERTY CATEGORIES GRID */}
      {homepageSettings.showCategories && (
        <section style={{ padding: '6rem 0', backgroundColor: '#FFFFFF' }}>
          <div className="container">
            
            <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 3.5rem auto' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
                {homepageSettings.categoriesTitle || 'Explore by Property Category'}
              </h2>
              <p style={{ color: '#64748B', fontSize: '1.05rem', marginTop: '0.65rem' }}>
                Select your preferred asset class to view verified inventory with high capital appreciation potential.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-6 gap-5">
              {categories.map((cat, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    if (cat.type === 'CONSTRUCTION') navigate('/construction');
                    else navigate(`/search?category=${cat.type}`);
                  }}
                  className="card-luxury"
                  style={{
                    padding: '2rem 1.25rem',
                    borderRadius: 20,
                    cursor: 'pointer',
                    textAlign: 'center',
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div 
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 16,
                      backgroundColor: '#EBF4EC',
                      color: '#386635',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <cat.icon size={26} />
                  </div>

                  <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0F172A', marginBottom: 3 }}>
                    {cat.name}
                  </h3>
                  
                  <div style={{ fontSize: '0.78rem', color: '#386635', fontWeight: 700, marginBottom: 2 }}>
                    {cat.count}
                  </div>

                  <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                    {cat.desc}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* 6. POPULAR & FEATURED PROPERTIES SHOWCASE */}
      {homepageSettings.showPopularProperties && (
        <section style={{ padding: '6rem 0', backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
          <div className="container">
            
            <div className="flex flex-wrap items-end justify-between gap-6" style={{ marginBottom: '3rem' }}>
              <div>
                <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
                  {homepageSettings.popularPropertiesTitle || 'Best Properties For Sale in Dehradun'}
                </h2>
                <p style={{ color: '#64748B', fontSize: '1.05rem', marginTop: '0.5rem' }}>
                  Hand-picked exclusive villas, penthouses, and prime plots with clear title deeds.
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
                {[
                  { id: 'ALL', label: 'All Listings' },
                  { id: 'VILLA', label: 'Luxury Villas' },
                  { id: 'APARTMENT', label: 'Apartments' },
                  { id: 'PLOT', label: 'Plots & Land' },
                  { id: 'COMMERCIAL', label: 'Commercial' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActivePropertyTab(tab.id)}
                    className={activePropertyTab === tab.id ? "btn-green btn-pill" : "btn-outline-gray btn-pill"}
                    style={{ padding: '0.55rem 1.25rem', fontSize: '0.86rem' }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Property Cards Grid */}
            <div className={`grid grid-cols-1 md:grid-cols-2 ${gridColsClass} gap-6`}>
              {filteredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* View All Properties Bottom CTA */}
            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
              <button
                onClick={() => navigate('/search')}
                className="btn-outline-green btn-pill"
                style={{ padding: '0.85rem 2.5rem', fontSize: '0.98rem' }}
              >
                <span>View All 80+ Verified Properties</span>
                <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </section>
      )}

      {/* 7. INTERACTIVE MORTGAGE & EMI CALCULATOR */}
      <EMICalculator />

      {/* 8. WHAT WE DO: BESPOKE REAL ESTATE & CONSTRUCTION SERVICES */}
      {homepageSettings.showWhatWeDo && (
        <section style={{ padding: '6rem 0', backgroundColor: '#0B1120', color: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
          
          {/* Ambient Glow */}
          <div 
            style={{
              position: 'absolute',
              top: '20%',
              right: '-10%',
              width: '450px',
              height: '450px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(197, 160, 89, 0.15) 0%, transparent 70%)',
              filter: 'blur(50px)',
              pointerEvents: 'none'
            }}
          />

          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            
            <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 4rem auto' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                End-to-End Real Estate & Architectural Solutions
              </h2>
              <p style={{ color: '#94A3B8', fontSize: '1.08rem', marginTop: '0.65rem' }}>
                We provide full-lifecycle support from property discovery, legal vetting to luxury turnkey construction.
              </p>
            </div>

            {/* 4 Feature Cards with Numbering */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="card-dark" style={{ padding: '2.4rem 1.85rem', borderRadius: 20, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 16, right: 20, fontSize: '2.4rem', fontWeight: 800, color: '#1E293B', fontFamily: 'Outfit' }}>01</div>
                <div style={{ width: 50, height: 50, borderRadius: 14, backgroundColor: 'rgba(56,102,53,0.25)', color: '#A7F3D0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid rgba(56,102,53,0.4)' }}>
                  <Home size={24} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.65rem' }}>Residential Advisory</h3>
                <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Curated luxury bungalows, mountain-facing apartments, and independent kothis in Dehradun’s most prestigious corridors.
                </p>
                <Link to="/search" style={{ color: '#DFB76C', fontSize: '0.85rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  Browse Homes <ArrowRight size={14} />
                </Link>
              </div>

              <div className="card-dark" style={{ padding: '2.4rem 1.85rem', borderRadius: 20, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 16, right: 20, fontSize: '2.4rem', fontWeight: 800, color: '#1E293B', fontFamily: 'Outfit' }}>02</div>
                <div style={{ width: 50, height: 50, borderRadius: 14, backgroundColor: 'rgba(197,160,89,0.25)', color: '#DFB76C', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid rgba(197,160,89,0.4)' }}>
                  <Hammer size={24} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.65rem' }}>Turnkey Construction</h3>
                <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Architectural planning, MDDA sanction drawings, RCC construction, and luxury interior finishing under single contract.
                </p>
                <Link to="/construction" style={{ color: '#DFB76C', fontSize: '0.85rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  Build With Us <ArrowRight size={14} />
                </Link>
              </div>

              <div className="card-dark" style={{ padding: '2.4rem 1.85rem', borderRadius: 20, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 16, right: 20, fontSize: '2.4rem', fontWeight: 800, color: '#1E293B', fontFamily: 'Outfit' }}>03</div>
                <div style={{ width: 50, height: 50, borderRadius: 14, backgroundColor: 'rgba(56,102,53,0.25)', color: '#A7F3D0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid rgba(56,102,53,0.4)' }}>
                  <FileCheck size={24} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.65rem' }}>Title & Legal Due Diligence</h3>
                <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Comprehensive 30-year search report, mutation check, registry drafting, and hassle-free bank loan liaison.
                </p>
                <Link to="/about" style={{ color: '#DFB76C', fontSize: '0.85rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  Learn More <ArrowRight size={14} />
                </Link>
              </div>

              <div className="card-dark" style={{ padding: '2.4rem 1.85rem', borderRadius: 20, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 16, right: 20, fontSize: '2.4rem', fontWeight: 800, color: '#1E293B', fontFamily: 'Outfit' }}>04</div>
                <div style={{ width: 50, height: 50, borderRadius: 14, backgroundColor: 'rgba(197,160,89,0.25)', color: '#DFB76C', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid rgba(197,160,89,0.4)' }}>
                  <Briefcase size={24} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.65rem' }}>NRI & Owner Management</h3>
                <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Dedicated property caretakers, tenant screening, lease agreements, and fast asset resale for overseas property owners.
                </p>
                <Link to="/sell" style={{ color: '#DFB76C', fontSize: '0.85rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  List With Us <ArrowRight size={14} />
                </Link>
              </div>

            </div>

          </div>
        </section>
      )}

      {/* 9. TESTIMONIALS & CLIENT REVIEWS */}
      {homepageSettings.showTestimonials && (
        <section style={{ padding: '6rem 0', backgroundColor: '#FFFFFF' }}>
          <div className="container">
            
            <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 4rem auto' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
                Trusted by 1,850+ Homeowners & Investors
              </h2>
              <p style={{ color: '#64748B', fontSize: '1.05rem', marginTop: '0.65rem' }}>
                Hear directly from clients who found their dream home and prime investments through A2 Realtors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((item, idx) => (
                <div
                  key={idx}
                  className="card-luxury"
                  style={{
                    padding: '2.4rem 2rem',
                    borderRadius: 24,
                    backgroundColor: '#F8FAFC',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative'
                  }}
                >
                  <div>
                    {/* 5 Stars */}
                    <div className="flex gap-1" style={{ color: '#F59E0B', marginBottom: '1.25rem' }}>
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="#F59E0B" />
                      ))}
                    </div>

                    <p style={{ fontSize: '0.98rem', color: '#1E293B', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '1.5rem' }}>
                      "{item.quote}"
                    </p>
                  </div>

                  {/* Author Profile */}
                  <div className="flex items-center gap-3" style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1.25rem' }}>
                    <img
                      src={item.avatar}
                      alt={item.name}
                      style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: '2px solid #386635' }}
                    />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0F172A' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                        {item.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* 10. GET IN TOUCH & SCHEDULE VIP CONSULTATION */}
      {homepageSettings.showContactForm && (
        <section style={{ padding: '6rem 0', backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
          <div className="container">
            
            <div 
              style={{
                position: 'relative',
                borderRadius: 28,
                overflow: 'hidden',
                backgroundImage: 'linear-gradient(to right, rgba(11,17,32,0.85) 0%, rgba(11,17,32,0.4) 50%, rgba(11,17,32,0.9) 100%), url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '4.5rem 3rem',
                display: 'flex',
                justifyContent: 'flex-end',
                boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
              }}
            >
              <div 
                className="glass-panel"
                style={{ 
                  maxWidth: 500, 
                  width: '100%', 
                  padding: '2.5rem', 
                  borderRadius: 24,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)' 
                }}
              >
                
                <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem', lineHeight: 1.2 }}>
                  {homepageSettings.contactTitle || "Book a Guided Valley Property Tour"}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '1.5rem' }}>
                  Our senior consultants will shortlist properties matching your exact criteria and arrange chauffeured site visits.
                </p>

                {formSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '2rem 0', backgroundColor: '#EBF4EC', borderRadius: 16 }}>
                    <CheckCircle2 size={46} style={{ color: '#386635', margin: '0 auto 0.75rem auto' }} />
                    <strong style={{ display: 'block', fontSize: '1.15rem', color: '#0F172A' }}>Consultation Booked!</strong>
                    <p style={{ fontSize: '0.88rem', color: '#64748B', marginTop: 6, maxWidth: 320, margin: '6px auto 0 auto' }}>
                      Our property specialist will contact you on <strong>{formPhone}</strong> to confirm your schedule.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit}>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label" style={{ fontSize: '0.78rem' }}>Full Name *</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="Your Name" 
                          value={formName} 
                          onChange={(e) => setFormName(e.target.value)} 
                          className="form-input" 
                          style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }} 
                        />
                      </div>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label" style={{ fontSize: '0.78rem' }}>Phone Number *</label>
                        <input 
                          type="tel" 
                          required 
                          placeholder="+91 98970 00000" 
                          value={formPhone} 
                          onChange={(e) => setFormPhone(e.target.value)} 
                          className="form-input" 
                          style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }} 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3" style={{ marginTop: '0.75rem' }}>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label" style={{ fontSize: '0.78rem' }}>Email Address</label>
                        <input 
                          type="email" 
                          placeholder="name@email.com" 
                          value={formEmail} 
                          onChange={(e) => setFormEmail(e.target.value)} 
                          className="form-input" 
                          style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }} 
                        />
                      </div>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label" style={{ fontSize: '0.78rem' }}>Preferred Date</label>
                        <input 
                          type="date" 
                          value={formDate} 
                          onChange={(e) => setFormDate(e.target.value)} 
                          className="form-input" 
                          style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }} 
                        />
                      </div>
                    </div>

                    <div className="form-group" style={{ marginTop: '0.75rem' }}>
                      <label className="form-label" style={{ fontSize: '0.78rem' }}>Property Interest</label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value)}
                        className="form-select"
                        style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                      >
                        <option value="Buy Luxury Villa / Kothi">Buy Luxury Villa / Kothi</option>
                        <option value="Buy Apartment / Penthouse">Buy Apartment / Penthouse</option>
                        <option value="Buy Residential Plot">Buy Residential Plot</option>
                        <option value="Commercial Space / Investment">Commercial Space / Investment</option>
                        <option value="Turnkey Construction / Renovation">Turnkey Construction / Renovation</option>
                        <option value="Sell / Rent My Property">Sell / Rent My Property</option>
                      </select>
                    </div>

                    <div className="form-group" style={{ marginTop: '0.75rem', marginBottom: '1.25rem' }}>
                      <label className="form-label" style={{ fontSize: '0.78rem' }}>Specific Requirements / Note</label>
                      <textarea 
                        rows={2} 
                        placeholder="e.g. Looking for 4BHK with valley view near Dalanwala..." 
                        value={formMessage} 
                        onChange={(e) => setFormMessage(e.target.value)} 
                        className="form-textarea" 
                        style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }} 
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="btn-green w-full" 
                      style={{ width: '100%', borderRadius: 12, padding: '0.85rem', fontSize: '0.95rem' }}
                    >
                      <span>Submit Tour Request</span>
                      <ArrowRight size={16} />
                    </button>

                  </form>
                )}

              </div>

            </div>

          </div>
        </section>
      )}

      {/* 11. HELPFUL REAL ESTATE ARTICLES & MARKET INSIGHTS */}
      {homepageSettings.showLatestArticles && (
        <section style={{ padding: '6rem 0', backgroundColor: '#FFFFFF' }}>
          <div className="container">
            
            <div className="flex flex-wrap items-center justify-between gap-4" style={{ marginBottom: '3.5rem' }}>
              <div>
                <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
                  {homepageSettings.articlesTitle || 'Market Reports & Buying Guides'}
                </h2>
                <p style={{ color: '#64748B', fontSize: '1.05rem', marginTop: '0.5rem' }}>
                  Expert insights on property registry laws, locality appreciation, and investment strategies in Uttarakhand.
                </p>
              </div>
              <Link to="/insights" className="btn-outline-green btn-pill" style={{ padding: '0.65rem 1.5rem' }}>
                Explore All Articles
              </Link>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {blogPosts.slice(0, 3).map((post) => (
                <div key={post.id} className="card-luxury flex flex-col" style={{ borderRadius: 20, overflow: 'hidden' }}>
                  <img 
                    src={post.coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'} 
                    alt={post.title} 
                    style={{ width: '100%', height: 220, objectFit: 'cover' }} 
                  />
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div className="flex items-center gap-2" style={{ fontSize: '0.78rem', color: '#386635', fontWeight: 700, marginBottom: '0.5rem' }}>
                      <span className="badge badge-verified" style={{ fontSize: '0.68rem' }}>{post.category}</span>
                      <span>• {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'}</span>
                    </div>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.35, marginBottom: '0.75rem' }}>
                      <Link to="/insights" style={{ color: 'inherit' }}>
                        {post.title}
                      </Link>
                    </h3>

                    <p style={{ fontSize: '0.88rem', color: '#64748B', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between" style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #F1F5F9' }}>
                      <span style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 600 }}>By {post.author}</span>
                      <Link to="/insights" style={{ color: '#386635', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 3 }}>
                        Read More <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

    </div>
  );
};
