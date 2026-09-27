import React from 'react';
import { ShieldCheck, Award, Users, TrendingUp, Sparkles, Building } from 'lucide-react';

export const TrustStatsBar: React.FC = () => {
  const stats = [
    {
      icon: TrendingUp,
      value: '₹650 Cr+',
      label: 'Real Estate Transacted',
      subtitle: 'Across Dehradun & Mussoorie'
    },
    {
      icon: Building,
      value: '2,400+',
      label: 'Verified Title Properties',
      subtitle: '100% Freehold Clearance'
    },
    {
      icon: Users,
      value: '1,850+',
      label: 'Happy Families Settled',
      subtitle: 'Residential & NRI Buyers'
    },
    {
      icon: ShieldCheck,
      value: '15+ Yrs',
      label: 'Valley Market Authority',
      subtitle: 'Uttarakhand Certified Advisory'
    }
  ];

  return (
    <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '2.5rem 0', position: 'relative' }}>
      <div className="container">
        
        {/* Top Trust Header */}
        <div className="flex flex-wrap items-center justify-between gap-4" style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px dashed #E2E8F0' }}>
          <div className="flex items-center gap-3">
            <span className="pulse-dot"></span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1B4332', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Dehradun's #1 Most Trusted Real Estate Partner
            </span>
          </div>

          <div className="flex items-center gap-6" style={{ fontSize: '0.82rem', color: '#64748B' }}>
            <span className="flex items-center gap-1.5">
              <Award size={16} style={{ color: '#C5A059' }} /> Verified <strong>Title Deeds Guarantee</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles size={16} style={{ color: '#C5A059' }} /> Google Rating: <strong>4.9 / 5.0 (520+ Reviews)</strong>
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div 
              key={idx}
              className="flex items-start gap-4"
              style={{
                padding: '1rem',
                borderRadius: 16,
                backgroundColor: '#F8FAFC',
                border: '1px solid #F1F5F9',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#EBF4EC';
                e.currentTarget.style.borderColor = 'rgba(56,102,53,0.3)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#F8FAFC';
                e.currentTarget.style.borderColor = '#F1F5F9';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div 
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  backgroundColor: '#386635',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 4px 10px rgba(56,102,53,0.25)'
                }}
              >
                <stat.icon size={22} />
              </div>
              <div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.65rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.1 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#386635', marginTop: 2 }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: 1 }}>
                  {stat.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
