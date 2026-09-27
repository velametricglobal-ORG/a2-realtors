import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, Eye, EyeOff, ArrowRight, ArrowLeft, KeyRound, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Logo } from '../common/Logo';

interface LoginProps {
  onSwitchToPublic?: () => void;
}

export const Login: React.FC<LoginProps> = ({ onSwitchToPublic }) => {
  const { login } = useStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleBackToWebsite = () => {
    if (onSwitchToPublic) {
      onSwitchToPublic();
    }
    navigate('/');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setErrorMsg('Please enter both your Login ID (Email) and Password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const success = login(cleanEmail, cleanPassword);
      setIsLoading(false);

      if (success) {
        navigate('/admin/dashboard');
      } else {
        setErrorMsg('Invalid Login ID or Password. Please check your credentials and try again.');
      }
    }, 300);
  };

  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        backgroundColor: '#0B1120', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '2.5rem 1.5rem',
        backgroundImage: 'radial-gradient(circle at 50% 15%, rgba(56, 102, 53, 0.3) 0%, transparent 60%), radial-gradient(circle at 85% 85%, rgba(197, 160, 89, 0.12) 0%, transparent 50%)',
        position: 'relative'
      }}
    >
      {/* Return to Public Website */}
      <div style={{ position: 'absolute', top: 24, left: 24, zIndex: 10 }}>
        <button
          type="button"
          onClick={handleBackToWebsite}
          className="flex items-center gap-2"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            color: '#CBD5E1',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            padding: '0.5rem 1rem',
            borderRadius: 30,
            fontSize: '0.85rem',
            fontWeight: 600,
            backdropFilter: 'blur(6px)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.color = '#FFFFFF';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.color = '#CBD5E1';
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Public Website</span>
        </button>
      </div>

      <div style={{ width: '100%', maxWidth: 480, margin: '0 auto' }}>
        
        {/* Main Secure Sign-In Card */}
        <div 
          className="glass-panel-dark"
          style={{ 
            borderRadius: 28, 
            padding: '2.75rem 2.25rem',
            color: '#FFFFFF',
            boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
            border: '1px solid rgba(255, 255, 255, 0.12)'
          }}
        >
          
          {/* Brand Header */}
          <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
            <div style={{ display: 'inline-block', marginBottom: '1.25rem' }}>
              <Logo size="md" lightMode={true} />
            </div>

            <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', marginBottom: '0.35rem' }}>
              Staff & Admin Portal
            </h1>
            <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.5 }}>
              Sign in with your authorized credentials to access internal CRM, client leads, and property inventory.
            </p>
          </div>

          {/* Error Notice */}
          {errorMsg && (
            <div 
              style={{ 
                backgroundColor: 'rgba(239, 68, 68, 0.15)', 
                border: '1px solid #EF4444', 
                color: '#FCA5A5', 
                padding: '0.85rem 1.15rem', 
                borderRadius: 14, 
                fontSize: '0.86rem', 
                marginBottom: '1.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: 10
              }}
            >
              <Shield size={18} style={{ flexShrink: 0 }} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
            
            {/* Field 1: Email / Login ID */}
            <div className="form-group" style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#E2E8F0', letterSpacing: '0.01em' }}>
                Login ID / Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: 16, top: 14, color: '#64748B' }}>
                  <Mail size={18} />
                </div>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@a2realtors.in or your email"
                  style={{
                    width: '100%',
                    backgroundColor: '#111A2E',
                    border: '1.5px solid #1E2E4F',
                    borderRadius: 14,
                    padding: '0.85rem 1rem 0.85rem 2.85rem',
                    color: '#FFFFFF',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#386635';
                    e.currentTarget.style.boxShadow = '0 0 0 4px rgba(56,102,53,0.2)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#1E2E4F';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Field 2: Password */}
            <div className="form-group" style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div className="flex justify-between items-center">
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#E2E8F0', letterSpacing: '0.01em' }}>
                  Password
                </label>
              </div>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: 16, top: 14, color: '#64748B' }}>
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={{
                    width: '100%',
                    backgroundColor: '#111A2E',
                    border: '1.5px solid #1E2E4F',
                    borderRadius: 14,
                    padding: '0.85rem 2.85rem 0.85rem 2.85rem',
                    color: '#FFFFFF',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#386635';
                    e.currentTarget.style.boxShadow = '0 0 0 4px rgba(56,102,53,0.2)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#1E2E4F';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: 16, top: 14, color: '#64748B', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div style={{ paddingTop: '0.5rem' }}>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-green w-full"
                style={{
                  width: '100%',
                  borderRadius: 14,
                  padding: '0.95rem',
                  fontSize: '1rem',
                  fontWeight: 800,
                  boxShadow: '0 8px 25px rgba(56,102,53,0.45)',
                  cursor: 'pointer'
                }}
              >
                {isLoading ? 'Authenticating...' : 'Sign In to CRM Portal'}
                <ArrowRight size={18} />
              </button>
            </div>

          </form>

          {/* Credentials Info Helper Box */}
          <div 
            style={{ 
              marginTop: '1.75rem', 
              padding: '1rem', 
              backgroundColor: 'rgba(255, 255, 255, 0.04)', 
              borderRadius: 14, 
              border: '1px dashed rgba(223, 183, 108, 0.3)',
              fontSize: '0.82rem',
              color: '#94A3B8'
            }}
          >
            <div className="flex items-center gap-1.5" style={{ color: '#DFB76C', fontWeight: 700, marginBottom: 4 }}>
              <KeyRound size={14} /> Default Master Login Credentials:
            </div>
            <div className="flex justify-between" style={{ marginTop: 4 }}>
              <span>Login ID: <strong style={{ color: '#FFFFFF' }}>admin@a2realtors.in</strong> (or <strong style={{ color: '#FFFFFF' }}>admin</strong>)</span>
            </div>
            <div className="flex justify-between" style={{ marginTop: 2 }}>
              <span>Password: <strong style={{ color: '#FFFFFF' }}>admin123</strong></span>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: 6 }}>
              Passcodes can be updated anytime in Admin Panel → Staff & Roles.
            </div>
          </div>

          {/* Footer Security Notice */}
          <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #1E2E4F', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748B' }}>
            <span className="flex items-center gap-1">
              🔒 256-Bit Encrypted Session
            </span>
            <span>A2 Realtors Dehradun</span>
          </div>

        </div>

      </div>

    </div>
  );
};
