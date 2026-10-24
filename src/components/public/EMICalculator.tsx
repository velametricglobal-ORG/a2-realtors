import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, Calendar, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Building2 } from 'lucide-react';

export const EMICalculator: React.FC = () => {
  const [propertyPrice, setPropertyPrice] = useState<number>(15000000); // 1.5 Cr
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(20);

  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const loanAmount = propertyPrice - downPaymentAmount;

  // Monthly EMI Calculation: E = P * r * (1+r)^n / ((1+r)^n - 1)
  const monthlyRate = interestRate / (12 * 100);
  const totalMonths = tenureYears * 12;
  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - loanAmount;
  const principalPercent = Math.round((loanAmount / totalPayment) * 100);
  const interestPercent = 100 - principalPercent;

  const formatLakhsCr = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    return `₹${(val / 100000).toFixed(2)} Lakhs`;
  };

  const quickPresets = [
    { label: '₹75 Lakhs', val: 7500000 },
    { label: '₹1.50 Cr', val: 15000000 },
    { label: '₹2.75 Cr', val: 27500000 },
    { label: '₹5.00 Cr', val: 50000000 }
  ];

  return (
    <section style={{ padding: '6.5rem 0', backgroundColor: '#FFFFFF', position: 'relative', borderBottom: '1px solid #E2E8F0' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', maxWidth: 740, margin: '0 auto 3.75rem auto' }}>
          <div className="flex items-center justify-center gap-2" style={{ marginBottom: '0.85rem' }}>
            <span 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: '0.78rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                backgroundColor: '#EBF4EC',
                color: '#166534',
                padding: '0.38rem 1rem',
                borderRadius: 999,
                border: '1px solid rgba(22, 101, 52, 0.25)',
                boxShadow: '0 2px 8px rgba(22, 101, 52, 0.08)'
              }}
            >
              <Calculator size={13} style={{ color: '#166534' }} /> Precision Mortgage Advisory
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(2.1rem, 3.6vw, 2.9rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.025em', lineHeight: 1.2, fontFamily: 'Outfit, sans-serif' }}>
            Interactive Real Estate EMI &amp; Investment Calculator
          </h2>
          <p style={{ color: '#64748B', fontSize: '1.05rem', marginTop: '0.75rem', lineHeight: 1.65 }}>
            Plan your Dehradun dream home purchase with precision. Adjust variables to estimate monthly installments and pre-approved partner bank rates.
          </p>

          {/* Quick Preset Buttons */}
          <div className="flex items-center justify-center gap-2" style={{ marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 700, marginRight: 6 }}>Popular Budgets:</span>
            {quickPresets.map((p) => (
              <button
                key={p.val}
                type="button"
                onClick={() => setPropertyPrice(p.val)}
                style={{
                  padding: '0.38rem 0.95rem',
                  borderRadius: 999,
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  backgroundColor: propertyPrice === p.val ? '#166534' : '#F8FAFC',
                  color: propertyPrice === p.val ? '#FFFFFF' : '#475569',
                  border: propertyPrice === p.val ? '1px solid #166534' : '1px solid #E2E8F0',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div 
          className="card-luxury" 
          style={{ 
            padding: '2.5rem 2.75rem', 
            backgroundColor: '#F8FAFC', 
            borderRadius: 28,
            border: '1px solid #E2E8F0',
            boxShadow: '0 10px 35px -5px rgba(15, 23, 42, 0.06)'
          }}
        >
          <div 
            className="grid grid-cols-1 lg:grid-cols-12 items-center"
            style={{ columnGap: '3.5rem', rowGap: '2.5rem' }}
          >
            
            {/* Left Controls: 7 Cols */}
            <div 
              className="lg:col-span-7 flex flex-col"
              style={{ gap: '2rem', paddingRight: '0.75rem' }}
            >
              
              {/* Property Value Slider */}
              <div>
                <div className="flex justify-between items-center" style={{ marginBottom: '0.65rem' }}>
                  <label style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0F172A' }}>
                    Total Property Value
                  </label>
                  <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#166534', fontFamily: 'Outfit' }}>
                    {formatLakhsCr(propertyPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min="2000000"
                  max="100000000"
                  step="500000"
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#166534', height: 7, cursor: 'pointer' }}
                />
                <div className="flex justify-between" style={{ color: '#94A3B8', fontSize: '0.74rem', marginTop: 6, fontWeight: 600 }}>
                  <span>₹20 Lakhs</span>
                  <span>₹2.50 Cr</span>
                  <span>₹5.00 Cr</span>
                  <span>₹10.00 Cr</span>
                </div>
              </div>

              {/* Down Payment Slider */}
              <div>
                <div className="flex justify-between items-center" style={{ marginBottom: '0.65rem' }}>
                  <label style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0F172A' }}>
                    Down Payment ({downPaymentPercent}%)
                  </label>
                  <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', fontFamily: 'Outfit' }}>
                    {formatLakhsCr(downPaymentAmount)}
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  step="5"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#166534', height: 7, cursor: 'pointer' }}
                />
                <div className="flex justify-between" style={{ color: '#94A3B8', fontSize: '0.74rem', marginTop: 6, fontWeight: 600 }}>
                  <span>10% (Minimum)</span>
                  <span>25% (Recommended)</span>
                  <span>60% (High Equity)</span>
                </div>
              </div>

              {/* Grid 2 Cols: Interest Rate & Loan Tenure */}
              <div 
                className="grid grid-cols-1 sm:grid-cols-2"
                style={{ gap: '1.25rem' }}
              >
                
                {/* Interest Rate */}
                <div style={{ backgroundColor: '#FFFFFF', padding: '1.25rem 1.35rem', borderRadius: 16, border: '1px solid #E2E8F0' }}>
                  <div className="flex justify-between items-center" style={{ marginBottom: '0.45rem' }}>
                    <label style={{ fontSize: '0.86rem', fontWeight: 800, color: '#0F172A' }}>
                      Interest Rate (%)
                    </label>
                    <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#166534', fontFamily: 'Outfit' }}>
                      {interestRate}% p.a.
                    </span>
                  </div>
                  <input
                    type="range"
                    min="6.5"
                    max="14.0"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#166534', height: 6, cursor: 'pointer' }}
                  />
                  <div className="flex justify-between" style={{ color: '#94A3B8', fontSize: '0.7rem', marginTop: 4 }}>
                    <span>6.5% (Prime)</span>
                    <span>14.0%</span>
                  </div>
                </div>

                {/* Loan Tenure */}
                <div style={{ backgroundColor: '#FFFFFF', padding: '1.25rem 1.35rem', borderRadius: 16, border: '1px solid #E2E8F0' }}>
                  <div className="flex justify-between items-center" style={{ marginBottom: '0.45rem' }}>
                    <label style={{ fontSize: '0.86rem', fontWeight: 800, color: '#0F172A' }}>
                      Loan Tenure
                    </label>
                    <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', fontFamily: 'Outfit' }}>
                      {tenureYears} Years
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#166534', height: 6, cursor: 'pointer' }}
                  />
                  <div className="flex justify-between" style={{ color: '#94A3B8', fontSize: '0.7rem', marginTop: 4 }}>
                    <span>5 Yrs</span>
                    <span>30 Yrs</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Right Summary Pod: 5 Cols */}
            <div className="lg:col-span-5">
              <div 
                style={{
                  backgroundColor: '#070C16',
                  color: '#FFFFFF',
                  borderRadius: 24,
                  padding: '2.25rem 2rem',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
                  border: '1px solid #1E2E4F',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Subtle Ambient Glow */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '-20%',
                    right: '-20%',
                    width: 220,
                    height: 220,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(197, 160, 89, 0.22) 0%, transparent 70%)',
                    filter: 'blur(35px)',
                    pointerEvents: 'none'
                  }}
                />

                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#4ADE80', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Estimated Monthly Installment
                </div>
                
                <div style={{ fontSize: '2.6rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'Outfit', margin: '0.65rem 0' }}>
                  ₹{emi.toLocaleString('en-IN')}<span style={{ fontSize: '1rem', fontWeight: 500, color: '#94A3B8' }}>/month</span>
                </div>

                {/* Visual Ratio Bar */}
                <div style={{ margin: '1.6rem 0 1.25rem 0' }}>
                  <div className="flex justify-between" style={{ fontSize: '0.76rem', marginBottom: 6, color: '#CBD5E1' }}>
                    <span className="flex items-center gap-1.5">
                      <span style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: '#166534', display: 'inline-block' }} />
                      Principal: <strong>{principalPercent}%</strong>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: '#DFB76C', display: 'inline-block' }} />
                      Interest: <strong>{interestPercent}%</strong>
                    </span>
                  </div>
                  <div style={{ width: '100%', height: 10, borderRadius: 10, overflow: 'hidden', display: 'flex', backgroundColor: '#1E293B' }}>
                    <div style={{ width: `${principalPercent}%`, backgroundColor: '#166534', transition: 'width 0.3s ease' }}></div>
                    <div style={{ width: `${interestPercent}%`, backgroundColor: '#DFB76C', transition: 'width 0.3s ease' }}></div>
                  </div>
                </div>

                {/* Details Breakdown */}
                <div className="flex flex-col gap-2.5" style={{ fontSize: '0.88rem', borderTop: '1px solid #1E2E4F', paddingTop: '1.25rem', marginBottom: '1.75rem' }}>
                  <div className="flex justify-between">
                    <span style={{ color: '#94A3B8' }}>Principal Loan:</span>
                    <strong>{formatLakhsCr(loanAmount)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#94A3B8' }}>Total Interest Payable:</span>
                    <strong style={{ color: '#DFB76C' }}>{formatLakhsCr(totalInterest)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#94A3B8' }}>Total Repayment:</span>
                    <strong>{formatLakhsCr(totalPayment)}</strong>
                  </div>
                </div>

                <a
                  href="tel:+918445190135"
                  className="btn-gold w-full hover-lift"
                  style={{ borderRadius: 14, padding: '0.9rem', fontSize: '0.95rem', width: '100%', fontWeight: 800 }}
                >
                  <span>Apply with Partner Banks</span>
                  <ArrowRight size={16} />
                </a>

                <div style={{ textAlign: 'center', fontSize: '0.74rem', color: '#94A3B8', marginTop: '1rem', lineHeight: 1.4 }}>
                  Approved partner banking network: <strong>SBI, HDFC Bank, ICICI Bank, Axis Bank</strong>.
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
