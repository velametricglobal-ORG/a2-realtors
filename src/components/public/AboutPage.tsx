import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, ShieldCheck, Award, Phone, CheckCircle2, 
  Sparkles, Landmark, Compass, MessageSquare, TrendingUp, 
  Home, Trees, Briefcase, MapPin, Quote, Mail, ArrowRight,
  Check, Star
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AboutPage: React.FC = () => {
  const { staff, homepageSettings } = useStore();

  useEffect(() => {
    document.title = "Best Property Dealer in Dehradun & Uttarakhand | About A2 Realtors";
  }, []);

  const ownerName = homepageSettings.directorName || 'Punit Tyagi';
  const ownerRole = homepageSettings.directorRole || 'Owner & Managing Director';
  const ownerPhoto = homepageSettings.directorPhoto || '/director-punit-tyagi.jpg';

  // Comprehensive Under One Roof Offerings
  const offerings = [
    {
      title: 'Luxury Flats & Penthouses',
      icon: Building2,
      tag: 'Ready & Under-Construction',
      desc: 'MDDA & RERA-approved 2, 3 & 4 BHK apartments and hillside penthouses with modern clubhouse amenities, 24/7 security, and breathtaking views of the Mussoorie range.',
      highlights: ['MDDA Approved Gated Communities', 'Panoramic Himalayan Vistas', 'High Rental & Resale Yields']
    },
    {
      title: 'Freehold Plots & Land',
      icon: MapPin,
      tag: 'Immediate Registry & Mutation',
      desc: 'Prime residential and township plots with 30-ft to 60-ft wide roads, complete utility conduits, Section 143 clearances, and verified Khatauni/Khasra revenue records.',
      highlights: ['100% Clear Title Guarantee', 'Section 143 Non-Agri Clear', 'Prime Growth Corridors']
    },
    {
      title: 'Duplex Houses & Kothis',
      icon: Home,
      tag: 'Bespoke Turnkey Residences',
      desc: 'Architecturally curated independent duplex homes and colonial-style kothis in Dehradun’s most prestigious colonies, featuring earthquake-resistant RCC construction and elegant interiors.',
      highlights: ['Turnkey Luxury Finishes', 'Dalanwala & Rajpur Road Belts', 'Vaastu-Compliant Layouts']
    },
    {
      title: 'Commercial Properties',
      icon: Briefcase,
      tag: 'High Rental Yield Assets',
      desc: 'High-visibility retail shops, SCO commercial plots, corporate office floors, and institutional spaces offering verified 8%–12% annual rental yields on prime arterial avenues.',
      highlights: ['Arterial Main Road Frontage', 'Assured Tenant Leasing Support', 'Maximum Capital Appreciation']
    },
    {
      title: 'Farmhouses & Mountain Retreats',
      icon: Trees,
      tag: 'Scenic Valley Sanctuaries',
      desc: 'Sprawling scenic acreage, tranquil holiday estates, and foothill farmhouses in Purukul, Mussoorie foothills, Thano, and Bhauwala for discerning high-net-worth families.',
      highlights: ['Pristine Mountain Environs', 'Clear Land Ownership Dossiers', 'Ideal for Second Homes & Wellness']
    }
  ];

  return (
    <div style={{ backgroundColor: '#F8FAFC', paddingBottom: '6rem' }}>
      
      {/* 1. HERO HEADER */}
      <div 
        style={{ 
          backgroundColor: '#0B1120', 
          color: '#FFFFFF', 
          padding: '6.5rem 0 5.5rem 0', 
          position: 'relative', 
          overflow: 'hidden', 
          borderBottom: '1px solid #1E2E4F', 
          textAlign: 'center' 
        }}
      >
        {/* Ambient background glow */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: 1200,
            height: '100%',
            backgroundImage: 'radial-gradient(circle at 50% 20%, rgba(56, 102, 53, 0.28) 0%, transparent 65%)',
            pointerEvents: 'none'
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: 940 }}>
          
          {/* Official Recognition Badge */}
          <div 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: 8, 
              backgroundColor: 'rgba(197, 160, 89, 0.16)', 
              border: '1px solid rgba(223, 183, 108, 0.45)', 
              padding: '0.45rem 1.25rem', 
              borderRadius: 999, 
              fontSize: '0.82rem', 
              fontWeight: 800, 
              color: '#DFB76C', 
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
            }}
          >
            <Award size={15} style={{ color: '#DFB76C' }} /> 
            Best Property Dealer in Dehradun • Best Property Dealer in Uttarakhand
          </div>

          <h1 
            style={{ 
              fontSize: 'clamp(2.4rem, 4.6vw, 3.8rem)', 
              fontWeight: 800, 
              color: '#FFFFFF', 
              marginBottom: '1.25rem', 
              lineHeight: 1.18, 
              letterSpacing: '-0.025em',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            14 Years of Flawless Real Estate, <br />
            <span style={{ color: '#DFB76C', fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>
              Exceptional Returns &amp; Unbroken Trust
            </span>
          </h1>

          <p 
            style={{ 
              fontSize: '1.12rem', 
              color: '#CBD5E1', 
              lineHeight: 1.75, 
              maxWidth: 820, 
              margin: '0 auto',
              textWrap: 'pretty' 
            }}
          >
            Founded and headquartered at <strong>25 B, Inder Road, Dalanwala</strong>, A2 Realtors is recognized across Uttarakhand as the benchmark property advisory firm. We bring together premier flats, freehold plots, luxury duplexes, commercial assets, and foothill farmhouses — all conveniently vetted and curated under one roof.
          </p>

          {/* Quick Pillars Pill */}
          <div 
            className="flex flex-wrap items-center justify-center gap-4" 
            style={{ marginTop: '2rem' }}
          >
            {[
              '14+ Years Proven Leadership',
              'Flawless Legal Title Guarantee',
              'Remarkable Client ROI',
              'All Solutions Under One Roof'
            ].map((tag, idx) => (
              <span 
                key={idx}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  color: '#94A3B8',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  padding: '0.35rem 0.9rem',
                  borderRadius: 20,
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <CheckCircle2 size={13} style={{ color: '#10B981' }} /> {tag}
              </span>
            ))}
          </div>

        </div>
      </div>

      {/* 2. CREDIBILITY STATS STRIP (14-YEAR PERFORMANCE) */}
      <div className="container" style={{ marginTop: '-2.5rem', position: 'relative', zIndex: 10 }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { 
              metric: '14+ Years', 
              label: 'Proven Market Leadership', 
              sub: 'Guiding Uttarakhand Property Since 2012' 
            },
            { 
              metric: '₹650+ Cr', 
              label: 'Assets & Capital Transacted', 
              sub: 'Exceptional ROI Across Doon Valley' 
            },
            { 
              metric: '100%', 
              label: 'Flawless Title Guarantee', 
              sub: '30-Year Revenue & Registry Vetting' 
            },
            { 
              metric: '1,500+', 
              label: 'Delighted HNW Families', 
              sub: 'Doctors, Defense Officers & NRI Investors' 
            }
          ].map((stat, i) => (
            <div
              key={i}
              className="card hover-lift"
              style={{
                backgroundColor: '#FFFFFF',
                padding: '1.85rem 1.5rem',
                borderRadius: 20,
                textAlign: 'center',
                boxShadow: '0 12px 30px rgba(0,0,0,0.06)',
                border: '1px solid #E2E8F0'
              }}
            >
              <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#166534', fontFamily: 'Outfit, sans-serif' }}>
                {stat.metric}
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', marginTop: 3 }}>
                {stat.label}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: 4, lineHeight: 1.4 }}>
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container" style={{ marginTop: '5.5rem' }}>
        
        {/* 3. EXECUTIVE FOUNDER'S MESSAGE (THE STAR ADDRESS) */}
        <section style={{ marginBottom: '6rem' }}>
          
          <div 
            className="card-luxury"
            style={{
              backgroundColor: '#070C16',
              borderRadius: 28,
              border: '1px solid #1E2E4F',
              boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            {/* Subtle atmospheric ambient glow */}
            <div 
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 450,
                height: 450,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(197, 160, 89, 0.16) 0%, transparent 70%)',
                filter: 'blur(50px)',
                pointerEvents: 'none'
              }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
              
              {/* Left Column: Owner Portrait & Identity Card (4.5 Cols) */}
              <div 
                className="lg:col-span-5 flex flex-col justify-between"
                style={{
                  backgroundColor: '#0B1120',
                  padding: '3rem 2.5rem',
                  borderRight: '1px solid #1E2E4F',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                <div>
                  
                  {/* Executive Header Tag */}
                  <div style={{ marginBottom: '1.75rem' }}>
                    <span 
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        backgroundColor: 'rgba(197, 160, 89, 0.18)',
                        color: '#DFB76C',
                        border: '1px solid rgba(197, 160, 89, 0.4)',
                        padding: '0.4rem 0.9rem',
                        borderRadius: 20,
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase'
                      }}
                    >
                      <Award size={13} /> Message from the Owner
                    </span>
                  </div>

                  {/* Owner Portrait with Gold Trim */}
                  <div style={{ position: 'relative', width: 140, height: 140, margin: '0 0 1.75rem 0' }}>
                    <img 
                      src={ownerPhoto} 
                      alt={`${ownerName} - ${ownerRole}, A2 Realtors`}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        objectPosition: 'center 20%',
                        border: '3px solid #C5A059',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                      }}
                    />
                    <div 
                      style={{
                        position: 'absolute',
                        bottom: 4,
                        right: 4,
                        backgroundColor: '#166534',
                        color: '#FFFFFF',
                        borderRadius: '50%',
                        width: 32,
                        height: 32,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid #0B1120',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
                      }}
                      title="Verified Founder"
                    >
                      <CheckCircle2 size={16} />
                    </div>
                  </div>

                  <h3 
                    style={{ 
                      fontSize: '1.75rem', 
                      fontWeight: 800, 
                      color: '#FFFFFF', 
                      fontFamily: 'Outfit, sans-serif',
                      marginBottom: '0.35rem'
                    }}
                  >
                    {ownerName}
                  </h3>

                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#DFB76C', marginBottom: '0.35rem' }}>
                    {ownerRole}
                  </div>

                  <div style={{ fontSize: '0.82rem', color: '#94A3B8', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                    A2 Realtors • 25 B, Inder Road, Dalanwala, Dehradun
                  </div>

                  {/* Highlight Quote Box */}
                  <div 
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(223, 183, 108, 0.25)',
                      borderRadius: 16,
                      padding: '1.25rem',
                      marginBottom: '1.5rem',
                      position: 'relative'
                    }}
                  >
                    <Quote size={20} style={{ color: '#DFB76C', marginBottom: 8, opacity: 0.8 }} />
                    <p style={{ fontSize: '0.88rem', color: '#CBD5E1', lineHeight: 1.65, fontStyle: 'italic' }}>
                      "Our success as a company is measured not by volume, but by the remarkable returns and generational security we have consistently provided our clients over the past 14 years."
                    </p>
                  </div>

                </div>

                {/* Direct Connect Buttons */}
                <div className="flex flex-col gap-2.5" style={{ marginTop: '1rem' }}>
                  <a 
                    href="tel:+918445190135" 
                    className="btn-gold"
                    style={{
                      padding: '0.75rem 1.25rem',
                      borderRadius: 12,
                      fontWeight: 800,
                      fontSize: '0.86rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      textDecoration: 'none'
                    }}
                  >
                    <Phone size={15} /> Call Founder Directly
                  </a>

                  <a 
                    href="https://wa.me/918445190135?text=Hello%20Punit%20Ji%2C%20I%20would%20like%20to%20personally%20consult%20with%20you%20regarding%20property%20investment%20in%20Dehradun"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp"
                    style={{
                      padding: '0.75rem 1.25rem',
                      borderRadius: 12,
                      fontWeight: 700,
                      fontSize: '0.86rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      textDecoration: 'none'
                    }}
                  >
                    <MessageSquare size={15} /> Direct WhatsApp Advisory
                  </a>
                </div>

              </div>

              {/* Right Column: Full Official Letter (7.5 Cols) */}
              <div 
                className="lg:col-span-7 flex flex-col justify-between"
                style={{ 
                  padding: '3rem 3rem 3rem 3.5rem',
                  position: 'relative',
                  zIndex: 2 
                }}
              >
                <div>
                  
                  {/* Official Salutation */}
                  <div style={{ marginBottom: '1.75rem' }}>
                    <div 
                      style={{ 
                        fontSize: '0.84rem', 
                        color: '#94A3B8', 
                        fontWeight: 700, 
                        letterSpacing: '0.08em', 
                        textTransform: 'uppercase',
                        marginBottom: 6
                      }}
                    >
                      Official Executive Address
                    </div>
                    <h2 
                      style={{ 
                        fontSize: 'clamp(1.7rem, 2.5vw, 2.2rem)', 
                        fontWeight: 800, 
                        color: '#FFFFFF', 
                        lineHeight: 1.25,
                        fontFamily: 'Outfit, sans-serif'
                      }}
                    >
                      A Personal Message to Our Esteemed Clients &amp; Investors
                    </h2>
                  </div>

                  {/* Letter Body */}
                  <div 
                    style={{ 
                      color: '#CBD5E1', 
                      fontSize: '0.98rem', 
                      lineHeight: 1.82, 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '1.15rem' 
                    }}
                  >
                    <p style={{ fontSize: '1.08rem', color: '#FFFFFF', fontWeight: 600 }}>
                      Dear Clients &amp; Homebuyers,
                    </p>

                    <p>
                      As the proud owner of <strong>A2 Realtors</strong>, I wanted to personally reach out to you and share the foundational philosophy that makes our company Uttarakhand’s most trusted real estate institution.
                    </p>

                    <p>
                      At A2 Realtors, we pride ourselves on being a trusted benchmark for all your real estate and housing needs. Our core expertise lies in helping our clients find their dream homes, ensuring they are absolutely <strong>flawless — legally vetted, architecturally sound, and located in prime appreciation corridors</strong>. We understand that a home is not merely a purchase; it is a sacred foundation for your family’s future and often your most significant life investment.
                    </p>

                    <p>
                      To deliver total convenience and peace of mind, we have eliminated the need to juggle multiple brokers and uncertain intermediaries. Whether you are in search of buying <strong>flats, freehold plots, luxury duplex houses, high-yield commercial properties, or serene foothill farmhouses</strong>, we offer a comprehensive, hand-curated portfolio of authenticated options — <em>all conveniently available under one roof</em>.
                    </p>

                    <p>
                      Our success as a company is not measured by transaction numbers or fleeting hype; <strong style={{ color: '#DFB76C' }}>it is measured by the remarkable returns and enduring wealth we have consistently provided our clients over the past 14 years.</strong> Every plot, kothi, and apartment we represent carries our personal guarantee of 100% clean title clearance, zero litigation, and transparent dealing.
                    </p>

                    <p>
                      Whether you are an NRI investor seeking a secure mountain retreat, a defense or corporate family planning your dream home, or an entrepreneur expanding your commercial presence in Dehradun, my team and I look forward to welcoming you to our Dalanwala office.
                    </p>
                  </div>

                  {/* Sign-off Block */}
                  <div 
                    style={{ 
                      marginTop: '2rem', 
                      paddingTop: '1.5rem', 
                      borderTop: '1px solid #1E2E4F',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '1rem'
                    }}
                  >
                    <div>
                      <div style={{ color: '#94A3B8', fontSize: '0.86rem', fontStyle: 'italic', marginBottom: 2 }}>
                        With utmost commitment and warm regards,
                      </div>
                      <div style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '1.15rem', fontFamily: 'Outfit, sans-serif' }}>
                        {ownerName}
                      </div>
                      <div style={{ color: '#DFB76C', fontSize: '0.82rem', fontWeight: 700 }}>
                        {ownerRole} • A2 Realtors
                      </div>
                    </div>

                    <Link 
                      to="/contact" 
                      className="btn-green hover-lift"
                      style={{
                        padding: '0.75rem 1.5rem',
                        borderRadius: 12,
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        textDecoration: 'none'
                      }}
                    >
                      <Mail size={15} /> Book In-Person Consultation <ArrowRight size={14} />
                    </Link>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* 4. "ALL UNDER ONE ROOF" PORTFOLIO SHOWCASE */}
        <section style={{ marginBottom: '6rem' }}>
          
          <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 3.5rem auto' }}>
            <div className="section-tag">Comprehensive Offerings</div>
            <h2 style={{ fontSize: 'clamp(2rem, 3.2vw, 2.5rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
              All Your Property Needs Under One Roof
            </h2>
            <p style={{ color: '#64748B', fontSize: '1.02rem', marginTop: 8, lineHeight: 1.7 }}>
              From entry-level family residences to premier commercial investments and sprawling foothill estates, our 14-year curated catalog guarantees flawless selection and zero compromise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={idx}
                  className="card-luxury hover-lift"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 22,
                    padding: '2.25rem',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
                  }}
                >
                  <div>
                    {/* Icon & Badge */}
                    <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem' }}>
                      <div 
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: 14,
                          backgroundColor: '#EBF4EC',
                          color: '#166534',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid rgba(22, 101, 52, 0.2)'
                        }}
                      >
                        <IconComp size={26} />
                      </div>
                      <span 
                        style={{
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          color: '#166534',
                          backgroundColor: '#F0FDF4',
                          border: '1px solid #DCFCE7',
                          padding: '0.3rem 0.75rem',
                          borderRadius: 999
                        }}
                      >
                        {item.tag}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.65rem', fontFamily: 'Outfit, sans-serif' }}>
                      {item.title}
                    </h3>

                    <p style={{ fontSize: '0.92rem', color: '#64748B', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                      {item.desc}
                    </p>
                  </div>

                  {/* Highlights Bullet List */}
                  <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '1.25rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                      {item.highlights.map((point, pIdx) => (
                        <div key={pIdx} className="flex items-center gap-2" style={{ fontSize: '0.82rem', color: '#334155', fontWeight: 600 }}>
                          <Check size={14} style={{ color: '#166534', flexShrink: 0 }} />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>

                    <Link 
                      to={`/properties?search=${encodeURIComponent(item.title.split(' ')[0])}`}
                      className="hover-lift"
                      style={{
                        marginTop: '1.25rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        fontSize: '0.84rem',
                        fontWeight: 700,
                        color: '#166534',
                        textDecoration: 'none'
                      }}
                    >
                      Explore {item.title} <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              );
            })}

            {/* Sixth Special Card: Bespoke Advisory */}
            <div 
              className="card-luxury hover-lift"
              style={{
                backgroundColor: '#0B1120',
                color: '#FFFFFF',
                borderRadius: 22,
                padding: '2.25rem',
                border: '1px solid #1E2E4F',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
              }}
            >
              <div>
                <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem' }}>
                  <div 
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      backgroundColor: 'rgba(197, 160, 89, 0.18)',
                      color: '#DFB76C',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(197, 160, 89, 0.35)'
                    }}
                  >
                    <Sparkles size={26} />
                  </div>
                  <span 
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      color: '#DFB76C',
                      backgroundColor: 'rgba(197, 160, 89, 0.1)',
                      border: '1px solid rgba(197, 160, 89, 0.25)',
                      padding: '0.3rem 0.75rem',
                      borderRadius: 999
                    }}
                  >
                    Concierge Mandates
                  </span>
                </div>

                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.65rem', fontFamily: 'Outfit, sans-serif' }}>
                  Custom Land &amp; Estate Mandates
                </h3>

                <p style={{ fontSize: '0.92rem', color: '#CBD5E1', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                  Have a specific location or institutional requirement? Our senior directors personally source and acquire off-market land parcels, colonial bungalows, and school/hospitality sites across Uttarakhand.
                </p>
              </div>

              <div style={{ borderTop: '1px solid #1E2E4F', paddingTop: '1.25rem' }}>
                <a 
                  href="tel:+918445190135"
                  className="btn-gold"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    padding: '0.7rem 1.25rem',
                    borderRadius: 12,
                    fontSize: '0.86rem',
                    fontWeight: 800,
                    textDecoration: 'none'
                  }}
                >
                  <Phone size={14} /> Discuss Custom Mandate
                </a>
              </div>
            </div>

          </div>

        </section>

        {/* 5. CORE ETHICAL PILLARS & FIDUCIARY STANDARD */}
        <section style={{ marginBottom: '6rem' }}>
          
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 3rem auto' }}>
            <div className="section-tag">Our Fiduciary Standard</div>
            <h2 style={{ fontSize: 'clamp(2rem, 3.2vw, 2.5rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
              Why We Are Dehradun’s #1 Rated Property Dealer
            </h2>
            <p style={{ color: '#64748B', fontSize: '1rem', marginTop: 8 }}>
              Every mandate in our portfolio is thoroughly authenticated by in-house advocates and civil engineers before being presented to clients.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="card-luxury hover-lift" style={{ padding: '2.25rem', backgroundColor: '#FFFFFF', borderRadius: 22, border: '1px solid #E2E8F0' }}>
              <div style={{ width: 54, height: 54, borderRadius: 14, backgroundColor: '#EBF4EC', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <ShieldCheck size={28} style={{ color: '#166534' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem', fontFamily: 'Outfit, sans-serif' }}>
                Rigorous 30-Year Title Search
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#64748B', lineHeight: 1.7 }}>
                We examine sub-registrar deed archives, revenue mutation records (Khatauni &amp; Khasra), and guarantee zero encumbrances, land acquisition notices, or pending disputes before listing any asset.
              </p>
            </div>

            <div className="card-luxury hover-lift" style={{ padding: '2.25rem', backgroundColor: '#FFFFFF', borderRadius: 22, border: '1px solid #E2E8F0' }}>
              <div style={{ width: 54, height: 54, borderRadius: 14, backgroundColor: '#EBF4EC', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Compass size={28} style={{ color: '#166534' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem', fontFamily: 'Outfit, sans-serif' }}>
                Hyper-Local Corridor Precision
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#64748B', lineHeight: 1.7 }}>
                Deep generational knowledge across Dalanwala, Rajpur Road, Sahastradhara, Mussoorie foothills, and Cantt areas guarantees market-validated valuations and long-term capital preservation.
              </p>
            </div>

            <div className="card-luxury hover-lift" style={{ padding: '2.25rem', backgroundColor: '#FFFFFF', borderRadius: 22, border: '1px solid #E2E8F0' }}>
              <div style={{ width: 54, height: 54, borderRadius: 14, backgroundColor: '#EBF4EC', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Landmark size={28} style={{ color: '#166534' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem', fontFamily: 'Outfit, sans-serif' }}>
                Frictionless Banking &amp; Registry
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#64748B', lineHeight: 1.7 }}>
                Our dedicated liaisons streamline bank valuations with SBI, HDFC, and ICICI, handle stamp duty computations, and coordinate seamless deed registrations at the sub-registrar office.
              </p>
            </div>
          </div>

        </section>

        {/* 6. SENIOR CONSULTANT TEAM */}
        <section style={{ marginBottom: '6rem' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="section-tag">Dedicated Advisors</div>
            <h2 style={{ fontSize: 'clamp(2rem, 3.2vw, 2.5rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
              Meet Our Senior Property Consultants
            </h2>
            <p style={{ color: '#64748B', fontSize: '1rem', marginTop: '0.4rem' }}>
              Specialized advisors with deep local expertise in Dehradun residential &amp; commercial corridors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {staff.map(member => (
              <div 
                key={member.id} 
                className="card-luxury hover-lift" 
                style={{ 
                  backgroundColor: '#FFFFFF', 
                  padding: '1.85rem 1.5rem', 
                  textAlign: 'center', 
                  borderRadius: 22,
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 18px rgba(0,0,0,0.03)'
                }}
              >
                <img 
                  src={member.avatar} 
                  alt={member.name} 
                  style={{ 
                    width: 92, 
                    height: 92, 
                    borderRadius: '50%', 
                    objectFit: 'cover', 
                    margin: '0 auto 1.15rem auto', 
                    border: '3px solid #EBF4EC',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
                  }} 
                />
                <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.2rem', fontFamily: 'Outfit, sans-serif' }}>
                  {member.name}
                </h3>
                <div style={{ fontSize: '0.82rem', color: '#166534', fontWeight: 700, marginBottom: '0.45rem' }}>
                  {member.role.replace(/_/g, ' ')}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '1.25rem' }}>
                  ⭐ {member.rating} / 5.0 rating • {member.dealsClosed} deals closed
                </div>
                <div className="flex gap-2">
                  <a 
                    href="tel:+918445190135" 
                    className="btn-outline-gray btn-sm flex-1 flex items-center justify-center gap-1" 
                    style={{ borderRadius: 10, fontSize: '0.8rem' }}
                  >
                    <Phone size={13} style={{ color: '#166534' }} /> Call
                  </a>
                  <a 
                    href={`https://wa.me/918445190135?text=Hello%20${encodeURIComponent(member.name)}%2C%20I%20would%20like%20to%20consult%20regarding%20property%20in%20Dehradun`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp btn-sm flex-1 flex items-center justify-center gap-1" 
                    style={{ borderRadius: 10, fontSize: '0.8rem' }}
                  >
                    <MessageSquare size={13} /> WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* 7. VISIT OUR DALANWALA HEADQUARTERS */}
        <section>
          
          <div 
            className="card-dark"
            style={{
              backgroundColor: '#0B1120',
              border: '1px solid #1E2E4F',
              borderRadius: 26,
              padding: '3.25rem',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <span className="badge-gold" style={{ marginBottom: '1.15rem' }}>
                  <MapPin size={13} /> Dalanwala Headquarters
                </span>
                <h3 
                  style={{ 
                    fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', 
                    fontWeight: 800, 
                    color: '#FFFFFF', 
                    marginBottom: '0.85rem', 
                    letterSpacing: '-0.02em',
                    fontFamily: 'Outfit, sans-serif'
                  }}
                >
                  Experience Real Estate Advisory at Our Colonial Estate Office
                </h3>
                <p style={{ color: '#CBD5E1', fontSize: '1.02rem', lineHeight: 1.75, maxWidth: 640 }}>
                  We invite you to our heritage office at <strong>25 B, Inder Road, Dalanwala</strong> to review authenticated property dossiers, master layout plans, and revenue records over freshly brewed coffee.
                </p>
                <div className="flex items-center gap-3 flex-wrap" style={{ marginTop: '2rem' }}>
                  <a 
                    href="tel:+918445190135" 
                    className="btn-gold btn-pill hover-lift" 
                    style={{ padding: '0.85rem 1.75rem', fontWeight: 800, fontSize: '0.92rem' }}
                  >
                    <Phone size={15} /> Book In-Person Consultation
                  </a>
                  <Link 
                    to="/contact" 
                    className="btn-outline-gray btn-pill hover-lift" 
                    style={{ 
                      backgroundColor: 'rgba(255,255,255,0.08)', 
                      color: '#FFFFFF', 
                      borderColor: 'rgba(255,255,255,0.25)', 
                      padding: '0.85rem 1.75rem',
                      fontSize: '0.92rem'
                    }}
                  >
                    Get Office Directions
                  </Link>
                </div>
              </div>

              <div 
                className="lg:col-span-4" 
                style={{ 
                  borderRadius: 20, 
                  overflow: 'hidden', 
                  height: 240, 
                  border: '1px solid #1E2E4F',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.4)'
                }}
              >
                <iframe
                  title="A2 Realtors Dalanwala Headquarters Location"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(40%) contrast(1.15)' }}
                  src="https://maps.google.com/maps?q=25+B+Inder+Road+Dalanwala+Dehradun&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

        </section>

      </div>
    </div>
  );
};
