import React from 'react';
import { ShieldCheck, Award, Users, TrendingUp, Sparkles, Building, Star, CheckCircle2, Shield } from 'lucide-react';

export const TrustStatsBar: React.FC = () => {
  const stats = [
    {
      icon: TrendingUp,
      value: '₹650 Cr+',
      label: 'Real Estate Transacted',
      subtitle: 'Across Dehradun & Mussoorie Foothills',
      accent: '#166534',
      bg: '#EBF4EC'
    },
    {
      icon: Building,
      value: '2,400+',
      label: 'Verified Title Properties',
      subtitle: '100% Freehold & Mutation Clearance',
      accent: '#C5A059',
      bg: '#FDF7EB'
    },
    {
      icon: Users,
      value: '1,850+',
      label: 'Happy Families Settled',
      subtitle: 'Premium Resident & NRI Homeowners',
      accent: '#166534',
      bg: '#EBF4EC'
    },
    {
      icon: ShieldCheck,
      value: '15+ Yrs',
      label: 'Valley Market Authority',
      subtitle: 'Uttarakhand RERA Certified Advisory',
      accent: '#C5A059',
      bg: '#FDF7EB'
    }
  ];

  return (
    <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '2.75rem 0', position: 'relative' }}>
      <div className="container">
        
        {/* Top Trust Header Strip */}
        <div 
          className="flex flex-wrap items-center justify-between gap-4" 
          style={{ 
            marginBottom: '2rem', 
            paddingBottom: '1.4rem', 
            borderBottom: '1px solid #F1F5F9' 
          }}
        >
          <div className="flex items-center gap-3 flex-wrap">
            <span className="pulse-dot"></span>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#166534', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Dehradun’s #1 Most Trusted Real Estate Partner
            </span>
            <span style={{ fontSize: '0.72rem', backgroundColor: '#EBF4EC', color: '#166534', padding: '0.22rem 0.65rem', borderRadius: 999, fontWeight: 700, border: '1px solid rgba(22, 101, 52, 0.2)' }}>
              25 B Inder Road, Dalanwala
            </span>
          </div>

          <div className="flex items-center gap-6" style={{ fontSize: '0.82rem', color: '#475569', flexWrap: 'wrap' }}>
            <span className="flex items-center gap-1.5 font-semibold">
              <CheckCircle2 size={15} style={{ color: '#166534' }} /> <strong>30-Year</strong> Forensic Title Due Diligence
            </span>
            <span className="flex items-center gap-1.5 font-semibold">
              <Star size={15} fill="#F59E0B" style={{ color: '#F59E0B' }} /> Google Rating: <strong>4.9 / 5.0 (520+ Client Reviews)</strong>
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div 
              key={idx}
              className="hover-lift flex items-start gap-4"
              style={{
                padding: '1.5rem',
                borderRadius: 20,
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                boxShadow: '0 2px 10px rgba(15, 23, 42, 0.03)',
                cursor: 'default'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.borderColor = stat.accent;
                e.currentTarget.style.boxShadow = '0 16px 32px -6px rgba(15, 23, 42, 0.09)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F8FAFC';
                e.currentTarget.style.borderColor = '#E2E8F0';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(15, 23, 42, 0.03)';
              }}
            >
              <div 
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  backgroundColor: stat.bg,
                  color: stat.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: `1px solid ${stat.accent}33`,
                  boxShadow: `0 4px 14px ${stat.accent}20`
                }}
              >
                <stat.icon size={26} />
              </div>
              <div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.85rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.15, letterSpacing: '-0.025em' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#166534', marginTop: 4 }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '0.76rem', color: '#64748B', marginTop: 2, lineHeight: 1.4 }}>
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
