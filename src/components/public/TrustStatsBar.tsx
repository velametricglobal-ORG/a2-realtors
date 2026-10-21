import React from 'react';
import { ShieldCheck, Award, Users, TrendingUp, Sparkles, Building, Star, CheckCircle2 } from 'lucide-react';

export const TrustStatsBar: React.FC = () => {
  const stats = [
    {
      icon: TrendingUp,
      value: '₹650 Cr+',
      label: 'Real Estate Transacted',
      subtitle: 'Across Dehradun & Mussoorie',
      accent: '#166534',
      bg: '#EBF4EC'
    },
    {
      icon: Building,
      value: '2,400+',
      label: 'Verified Title Properties',
      subtitle: '100% Freehold Clearance',
      accent: '#C5A059',
      bg: '#FDF7EB'
    },
    {
      icon: Users,
      value: '1,850+',
      label: 'Happy Families Settled',
      subtitle: 'Residential & NRI Buyers',
      accent: '#166534',
      bg: '#EBF4EC'
    },
    {
      icon: ShieldCheck,
      value: '15+ Yrs',
      label: 'Valley Market Authority',
      subtitle: 'Uttarakhand Certified Advisory',
      accent: '#C5A059',
      bg: '#FDF7EB'
    }
  ];

  return (
    <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '2.5rem 0', position: 'relative' }}>
      <div className="container">
        
        {/* Top Trust Header Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4" style={{ marginBottom: '1.85rem', paddingBottom: '1.25rem', borderBottom: '1px dashed #E2E8F0' }}>
          <div className="flex items-center gap-3">
            <span className="pulse-dot"></span>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#166534', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Dehradun’s #1 Most Trusted Real Estate Partner
            </span>
            <span style={{ fontSize: '0.72rem', backgroundColor: '#EBF4EC', color: '#166534', padding: '0.2rem 0.6rem', borderRadius: 20, fontWeight: 700 }}>
              Inder Road, Dalanwala
            </span>
          </div>

          <div className="flex items-center gap-6" style={{ fontSize: '0.82rem', color: '#475569', flexWrap: 'wrap' }}>
            <span className="flex items-center gap-1.5 font-semibold">
              <CheckCircle2 size={15} style={{ color: '#166534' }} /> <strong>30-Year</strong> Title Due Diligence
            </span>
            <span className="flex items-center gap-1.5 font-semibold">
              <Star size={15} fill="#F59E0B" style={{ color: '#F59E0B' }} /> Google Rating: <strong>4.9 / 5.0 (520+ Reviews)</strong>
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
                padding: '1.25rem',
                borderRadius: 18,
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.borderColor = stat.accent;
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 28px -6px rgba(15, 23, 42, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F8FAFC';
                e.currentTarget.style.borderColor = '#E2E8F0';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.02)';
              }}
            >
              <div 
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 14,
                  backgroundColor: stat.bg,
                  color: stat.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: `1px solid ${stat.accent}33`,
                  boxShadow: `0 4px 12px ${stat.accent}1A`
                }}
              >
                <stat.icon size={24} />
              </div>
              <div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#166534', marginTop: 3 }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: 2 }}>
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
