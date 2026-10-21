import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, ShieldCheck, Users, MapPin, Award, Phone, 
  CheckCircle2, Sparkles, FileText, Landmark, Compass, MessageSquare
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AboutPage: React.FC = () => {
  const { staff } = useStore();

  return (
    <div style={{ backgroundColor: '#F8FAFC', paddingBottom: '6rem' }}>
      
      {/* 1. HERO HEADER */}
      <div style={{ backgroundColor: '#0B1120', color: '#FFFFFF', padding: '6.5rem 0 5.5rem 0', position: 'relative', overflow: 'hidden', borderBottom: '1px solid #1E2E4F', textAlign: 'center' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: 880 }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, backgroundColor: 'rgba(56,102,53,0.3)', border: '1px solid rgba(167,243,208,0.3)', padding: '0.35rem 1rem', borderRadius: 20, fontSize: '0.8rem', fontWeight: 700, color: '#A7F3D0', marginBottom: '1.25rem' }}>
            <Award size={14} style={{ color: '#DFB76C' }} /> Established in Dalanwala • Dehradun’s Premier Advisory
          </div>

          <h1 style={{ fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '1.25rem', lineHeight: 1.2, letterSpacing: '-0.02em', textWrap: 'balance' }}>
            Local Knowledge. <span style={{ color: '#DFB76C', fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>Uncompromising Integrity.</span>
          </h1>

          <p style={{ fontSize: '1.15rem', color: '#CBD5E1', lineHeight: 1.7, maxWidth: 780, margin: '0 auto', textWrap: 'pretty' }}>
            Headquartered at 25 B, Inder Road, Dalanwala, A2 Realtors is Dehradun’s benchmark property advisory firm connecting discerning homebuyers and NRI investors with legally vetted luxury bungalows, penthouses, freehold plots, and turnkey architectural estates.
          </p>

        </div>
      </div>

      {/* 2. CREDIBILITY STATS STRIP */}
      <div className="container" style={{ marginTop: '-2rem', position: 'relative', zIndex: 10 }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { metric: '₹250+ Cr', label: 'Prime Assets Transacted', sub: 'Across Dehradun Valley' },
            { metric: '100%', label: 'Legal Title Clearance', sub: '30-Year Search Guarantee' },
            { metric: '450+', label: 'Delighted HNW Families', sub: 'Doctors, Defense & NRIs' },
            { metric: '35+', label: 'Turnkey Villas Built', sub: 'MDDA Sanctioned Architectures' }
          ].map((stat, i) => (
            <div
              key={i}
              className="card"
              style={{
                backgroundColor: '#FFFFFF',
                padding: '1.75rem',
                borderRadius: 18,
                textAlign: 'center',
                boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
                border: '1px solid #E2E8F0'
              }}
            >
              <div style={{ fontSize: '2.1rem', fontWeight: 800, color: '#166534', fontFamily: 'Outfit' }}>
                {stat.metric}
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A', marginTop: 2 }}>
                {stat.label}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: 2 }}>
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container" style={{ marginTop: '5rem' }}>
        
        {/* 3. CORE ETHICAL PILLARS */}
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 3rem auto' }}>
          <div className="section-tag">Our Institutional Standard</div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
            Why High-Intent Buyers Trust A2 Realtors
          </h2>
          <p style={{ color: '#64748B', fontSize: '1rem', marginTop: 6 }}>
            Every mandate in our portfolio is thoroughly authenticated by in-house advocates and civil engineers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" style={{ marginBottom: '5.5rem' }}>
          <div className="card-luxury" style={{ padding: '2.25rem', backgroundColor: '#FFFFFF', borderRadius: 20 }}>
            <div style={{ width: 54, height: 54, borderRadius: 14, backgroundColor: '#EBF4EC', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <ShieldCheck size={28} style={{ color: '#166534' }} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
              Rigorous 30-Year Title Search
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#64748B', lineHeight: 1.65 }}>
              We examine sub-registrar deed archives, revenue mutation records (Khatauni & Khasra), and ensure zero encumbrances or pending disputes before listing any asset.
            </p>
          </div>

          <div className="card-luxury" style={{ padding: '2.25rem', backgroundColor: '#FFFFFF', borderRadius: 20 }}>
            <div style={{ width: 54, height: 54, borderRadius: 14, backgroundColor: '#EBF4EC', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Compass size={28} style={{ color: '#166534' }} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
              Hyper-Local Corridor Precision
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#64748B', lineHeight: 1.65 }}>
              Deep generational knowledge in Dalanwala, Rajpur Road, Sahastradhara, Mussoorie foothills, and Cantt areas guarantees market-validated valuations and long-term capital preservation.
            </p>
          </div>

          <div className="card-luxury" style={{ padding: '2.25rem', backgroundColor: '#FFFFFF', borderRadius: 20 }}>
            <div style={{ width: 54, height: 54, borderRadius: 14, backgroundColor: '#EBF4EC', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Landmark size={28} style={{ color: '#166534' }} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
              Frictionless Conveyance & Banking
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#64748B', lineHeight: 1.65 }}>
              Our dedicated liaisons streamline bank valuations with SBI, HDFC, and ICICI, handle stamp duty computations, and coordinate seamless deed registrations at the sub-registrar office.
            </p>
          </div>
        </div>

        {/* 4. SENIOR CONSULTANT TEAM */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag">Dedicated Advisors</div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
            Meet Our Senior Property Consultants
          </h2>
          <p style={{ color: '#64748B', fontSize: '1rem', marginTop: '0.35rem' }}>
            Specialized advisors with deep local expertise in Dehradun residential & commercial corridors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ marginBottom: '5rem' }}>
          {staff.map(member => (
            <div key={member.id} className="card-luxury" style={{ backgroundColor: '#FFFFFF', padding: '1.75rem', textAlign: 'center', borderRadius: 20 }}>
              <img 
                src={member.avatar} 
                alt={member.name} 
                style={{ width: 90, height: 90, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 1rem auto', border: '3px solid #EBF4EC' }} 
              />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.2rem' }}>{member.name}</h3>
              <div style={{ fontSize: '0.82rem', color: '#166534', fontWeight: 700, marginBottom: '0.5rem' }}>{member.role.replace('_', ' ')}</div>
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
                  href={`https://wa.me/918445190135?text=Hello%20${member.name}%2C%20I%20would%20like%20to%20consult%20regarding%20property%20in%20Dehradun`} 
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

        {/* 5. VISIT OUR HEADQUARTERS CTA */}
        <div 
          className="card-dark"
          style={{
            backgroundColor: '#0B1120',
            border: '1px solid #1E2E4F',
            borderRadius: 24,
            padding: '3rem',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="badge-gold" style={{ marginBottom: '1rem' }}>
                <MapPin size={13} /> Dalanwala Headquarters
              </span>
              <h3 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.3rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
                Experience True Real Estate Advisory at Our Office
              </h3>
              <p style={{ color: '#CBD5E1', fontSize: '1rem', lineHeight: 1.7, maxWidth: 640 }}>
                We invite you to our colonial estate office on Inder Road, Dalanwala to review authenticated property dossiers, master plans, and physical survey maps over coffee.
              </p>
              <div className="flex items-center gap-3 flex-wrap" style={{ marginTop: '1.75rem' }}>
                <a href="tel:+918445190135" className="btn-gold btn-pill" style={{ padding: '0.8rem 1.6rem', fontWeight: 800 }}>
                  <Phone size={15} /> Book In-Person Consultation
                </a>
                <Link to="/contact" className="btn-outline-gray btn-pill" style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.2)', padding: '0.8rem 1.6rem' }}>
                  Get Office Directions
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4" style={{ borderRadius: 16, overflow: 'hidden', height: 220, border: '1px solid #1E2E4F' }}>
              <iframe
                title="Office Location"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(60%) contrast(1.2)' }}
                src="https://maps.google.com/maps?q=25+B+Inder+Road+Dalanwala+Dehradun&t=&z=14&ie=UTF8&iwloc=&output=embed"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
