import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ShieldCheck, Users, MapPin, Award, Phone } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AboutPage: React.FC = () => {
  const { staff } = useStore();

  return (
    <div style={{ backgroundColor: '#F8FAFC', paddingBottom: '6rem' }}>
      
      {/* Hero Header */}
      <div style={{ backgroundColor: '#0F172A', color: '#FFFFFF', padding: '4.5rem 0', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: 840 }}>
          <div className="badge badge-featured" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            🏛️ About A2 Realtors Dehradun
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '1rem', lineHeight: 1.2 }}>
            Local Knowledge, <span style={{ color: '#D97706', fontFamily: 'Playfair Display', fontStyle: 'italic' }}>Uncompromising Integrity.</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#CBD5E1', lineHeight: 1.6 }}>
            Headquartered at 25 B, Inder Road, Dalanwala, A2 Realtors is Dehradun’s dedicated property advisory firm connecting discerning buyers with verified residential bungalows, apartments, land plots, and commercial spaces.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '3rem' }}>
        
        {/* Core Values */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ marginBottom: '4rem' }}>
          <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
            <ShieldCheck size={32} style={{ color: '#D97706', marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1.25rem', color: '#0F172A', marginBottom: '0.5rem' }}>Verified Property Inventory</h3>
            <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.6 }}>
              Every property listed undergoes rigorous title deed checks, mutation verification, and MDDA layout compliance before being published.
            </p>
          </div>

          <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
            <MapPin size={32} style={{ color: '#D97706', marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1.25rem', color: '#0F172A', marginBottom: '0.5rem' }}>Dehradun Locality Mastery</h3>
            <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.6 }}>
              Deep local roots in Dalanwala, Rajpur Road, Sahastradhara, Mussoorie Road, and Vasant Vihar ensure accurate pricing benchmarks.
            </p>
          </div>

          <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
            <Users size={32} style={{ color: '#D97706', marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1.25rem', color: '#0F172A', marginBottom: '0.5rem' }}>Personalized Advisory</h3>
            <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.6 }}>
              Dedicated property consultants guide you through site visits, legal documentation, bank loans, and final deal registration.
            </p>
          </div>
        </div>

        {/* Team Members */}
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A', textAlign: 'center', marginBottom: '2rem' }}>
          Meet Our Senior Property Consultants
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6" style={{ marginBottom: '4rem' }}>
          {staff.map(member => (
            <div key={member.id} className="card" style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', textAlign: 'center' }}>
              <img src={member.avatar} alt={member.name} style={{ width: 90, height: 90, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontSize: '1.15rem', color: '#0F172A', marginBottom: '0.2rem' }}>{member.name}</h3>
              <div style={{ fontSize: '0.82rem', color: '#D97706', fontWeight: 600, marginBottom: '0.5rem' }}>{member.role.replace('_', ' ')}</div>
              <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1rem' }}>⭐ {member.rating} / 5.0 rating • {member.dealsClosed} deals closed</div>
              <a href="tel:+918445190135" className="btn btn-outline btn-sm w-full">
                <Phone size={14} /> Contact
              </a>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
