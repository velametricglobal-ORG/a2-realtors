import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ShieldCheck, Users, MapPin, Award, Phone } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AboutPage: React.FC = () => {
  const { staff } = useStore();

  return (
    <div style={{ backgroundColor: '#F8FAFC', paddingBottom: '6rem' }}>
      
      {/* Hero Header */}
      <div style={{ backgroundColor: '#0B1120', color: '#FFFFFF', padding: '6rem 0 5rem 0', position: 'relative', overflow: 'hidden', borderBottom: '1px solid #1E2E4F', textAlign: 'center' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: 840 }}>
          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '1.25rem', lineHeight: 1.2, letterSpacing: '-0.02em', textWrap: 'balance' }}>
            Local Knowledge, <span style={{ color: '#DFB76C', fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>Uncompromising Integrity.</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#94A3B8', lineHeight: 1.7, maxWidth: 760, margin: '0 auto', textWrap: 'pretty' }}>
            Headquartered at 25 B, Inder Road, Dalanwala, A2 Realtors is Dehradun’s premier property advisory firm connecting discerning buyers with verified residential bungalows, luxury apartments, land plots, and commercial spaces.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '4.5rem' }}>
        
        {/* Core Values */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" style={{ marginBottom: '5rem' }}>
          <div className="card-luxury" style={{ padding: '2.25rem', backgroundColor: '#FFFFFF', borderRadius: 20 }}>
            <div style={{ width: 54, height: 54, borderRadius: 14, backgroundColor: '#EBF4EC', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <ShieldCheck size={28} style={{ color: '#386635' }} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>Verified Property Inventory</h3>
            <p style={{ fontSize: '0.92rem', color: '#64748B', lineHeight: 1.6 }}>
              Every property listed undergoes rigorous title deed checks, 30-year search report verification, mutation review, and MDDA layout compliance before being published.
            </p>
          </div>

          <div className="card-luxury" style={{ padding: '2.25rem', backgroundColor: '#FFFFFF', borderRadius: 20 }}>
            <div style={{ width: 54, height: 54, borderRadius: 14, backgroundColor: '#EBF4EC', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <MapPin size={28} style={{ color: '#386635' }} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>Dehradun Locality Mastery</h3>
            <p style={{ fontSize: '0.92rem', color: '#64748B', lineHeight: 1.6 }}>
              Deep local roots in Dalanwala, Rajpur Road, Sahastradhara, Mussoorie Road, and Vasant Vihar ensure accurate pricing benchmarks and high-appreciation asset selection.
            </p>
          </div>

          <div className="card-luxury" style={{ padding: '2.25rem', backgroundColor: '#FFFFFF', borderRadius: 20 }}>
            <div style={{ width: 54, height: 54, borderRadius: 14, backgroundColor: '#EBF4EC', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Users size={28} style={{ color: '#386635' }} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>Personalized Advisory</h3>
            <p style={{ fontSize: '0.92rem', color: '#64748B', lineHeight: 1.6 }}>
              Dedicated property consultants guide you through site visits, legal documentation, stamp duty estimation, home loans, and final registry conveyance.
            </p>
          </div>
        </div>

        {/* Team Members */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F172A' }}>
            Meet Our Senior Property Consultants
          </h2>
          <p style={{ color: '#64748B', fontSize: '1rem', marginTop: '0.35rem' }}>
            Experienced local advisors guiding you at every step of your property journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ marginBottom: '4rem' }}>
          {staff.map(member => (
            <div key={member.id} className="card-luxury" style={{ backgroundColor: '#FFFFFF', padding: '1.75rem', textAlign: 'center', borderRadius: 20 }}>
              <img src={member.avatar} alt={member.name} style={{ width: 88, height: 88, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 1rem auto', border: '3px solid #EBF4EC' }} />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.2rem' }}>{member.name}</h3>
              <div style={{ fontSize: '0.82rem', color: '#386635', fontWeight: 700, marginBottom: '0.5rem' }}>{member.role.replace('_', ' ')}</div>
              <div style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '1.25rem' }}>⭐ {member.rating} / 5.0 rating • {member.dealsClosed} deals closed</div>
              <a href="tel:+918445190135" className="btn-outline-gray btn-sm w-full flex items-center justify-center gap-1.5" style={{ borderRadius: 10 }}>
                <Phone size={14} style={{ color: '#386635' }} /> Contact Consultant
              </a>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
