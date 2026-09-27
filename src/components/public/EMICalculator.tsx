import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';

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

  return (
    <section style={{ padding: '6rem 0', backgroundColor: '#FFFFFF', position: 'relative' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 3.5rem auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            Interactive Real Estate EMI Calculator
          </h2>
          <p style={{ color: '#64748B', fontSize: '1.05rem', marginTop: '0.75rem', lineHeight: 1.6 }}>
            Plan your Dehradun dream home purchase with precision. Adjust loan variables to estimate monthly installments and partner bank approvals.
          </p>
        </div>

        <div className="card-luxury" style={{ padding: '2.5rem', backgroundColor: '#F8FAFC', borderRadius: 24 }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Controls: 7 Cols */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Property Value Slider */}
              <div>
                <div className="flex justify-between items-center" style={{ marginBottom: '0.4rem' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1E293B' }}>
                    Total Property Value
                  </label>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#386635', fontFamily: 'Outfit' }}>
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
                  style={{ width: '100%', accentColor: '#386635', height: 6 }}
                />
                <div className="flex justify-between text-xs" style={{ color: '#94A3B8', fontSize: '0.72rem', marginTop: 4 }}>
                  <span>₹20 Lakhs</span>
                  <span>₹5 Crores</span>
                  <span>₹10 Crores</span>
                </div>
              </div>

              {/* Down Payment Slider */}
              <div>
                <div className="flex justify-between items-center" style={{ marginBottom: '0.4rem' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1E293B' }}>
                    Down Payment ({downPaymentPercent}%)
                  </label>
                  <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', fontFamily: 'Outfit' }}>
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
                  style={{ width: '100%', accentColor: '#386635', height: 6 }}
                />
                <div className="flex justify-between" style={{ color: '#94A3B8', fontSize: '0.72rem', marginTop: 4 }}>
                  <span>10% (Min)</span>
                  <span>30% (Standard)</span>
                  <span>60% (Max)</span>
                </div>
              </div>

              {/* Grid 2 Cols: Interest Rate & Loan Tenure */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Interest Rate */}
                <div>
                  <div className="flex justify-between items-center" style={{ marginBottom: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E293B' }}>
                      Interest Rate (%)
                    </label>
                    <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', fontFamily: 'Outfit' }}>
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
                    style={{ width: '100%', accentColor: '#386635', height: 6 }}
                  />
                </div>

                {/* Loan Tenure */}
                <div>
                  <div className="flex justify-between items-center" style={{ marginBottom: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E293B' }}>
                      Loan Tenure (Years)
                    </label>
                    <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', fontFamily: 'Outfit' }}>
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
                    style={{ width: '100%', accentColor: '#386635', height: 6 }}
                  />
                </div>

              </div>

            </div>

            {/* Right Summary Pod: 5 Cols */}
            <div className="lg:col-span-5">
              <div 
                style={{
                  backgroundColor: '#0B1120',
                  color: '#FFFFFF',
                  borderRadius: 20,
                  padding: '2rem',
                  boxShadow: '0 20px 40px rgba(11,17,32,0.3)',
                  border: '1px solid #1E2E4F'
                }}
              >
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#A7F3D0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Estimated Monthly Installment
                </div>
                
                <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'Outfit', margin: '0.5rem 0' }}>
                  ₹{emi.toLocaleString('en-IN')}<span style={{ fontSize: '1rem', fontWeight: 500, color: '#94A3B8' }}>/month</span>
                </div>

                {/* Visual Ratio Bar */}
                <div style={{ margin: '1.5rem 0 1rem 0' }}>
                  <div className="flex justify-between" style={{ fontSize: '0.75rem', marginBottom: 4, color: '#CBD5E1' }}>
                    <span>Principal: <strong>{principalPercent}%</strong></span>
                    <span>Interest: <strong>{interestPercent}%</strong></span>
                  </div>
                  <div style={{ width: '100%', height: 10, borderRadius: 10, overflow: 'hidden', display: 'flex', backgroundColor: '#1E293B' }}>
                    <div style={{ width: `${principalPercent}%`, backgroundColor: '#386635', transition: 'width 0.3s ease' }}></div>
                    <div style={{ width: `${interestPercent}%`, backgroundColor: '#C5A059', transition: 'width 0.3s ease' }}></div>
                  </div>
                </div>

                {/* Details Breakdown */}
                <div className="flex flex-col gap-2.5" style={{ fontSize: '0.85rem', borderTop: '1px solid #1E2E4F', paddingTop: '1rem', marginBottom: '1.5rem' }}>
                  <div className="flex justify-between">
                    <span style={{ color: '#94A3B8' }}>Principal Loan:</span>
                    <strong>{formatLakhsCr(loanAmount)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#94A3B8' }}>Total Interest:</span>
                    <strong style={{ color: '#DFB76C' }}>{formatLakhsCr(totalInterest)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#94A3B8' }}>Total Payable:</span>
                    <strong>{formatLakhsCr(totalPayment)}</strong>
                  </div>
                </div>

                <a
                  href="tel:+918445190135"
                  className="btn-green w-full"
                  style={{ borderRadius: 12, padding: '0.8rem', fontSize: '0.9rem', width: '100%' }}
                >
                  <span>Apply with Partner Banks</span>
                  <ArrowRight size={16} />
                </a>

                <div style={{ textAlign: 'center', fontSize: '0.72rem', color: '#64748B', marginTop: '0.75rem' }}>
                  Official tie-ups with SBI, HDFC Bank, ICICI & Axis Bank.
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
