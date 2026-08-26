import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, Eye, EyeOff, CheckCircle2, ArrowRight, Building2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { UserRole } from '../../types';

export const Login: React.FC = () => {
  const { login, staff } = useStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@a2realtors.in');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('SUPER_ADMIN');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter email address and password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const success = login(email, password, selectedRole);
      setIsLoading(false);

      if (success) {
        navigate('/admin');
      } else {
        setErrorMsg('Invalid credentials. Use admin123 or select a demo role below.');
      }
    }, 400);
  };

  const handleQuickRoleSelect = (role: UserRole, roleEmail: string) => {
    setSelectedRole(role);
    setEmail(roleEmail);
    setPassword('admin123');
    setErrorMsg('');
  };

  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        backgroundColor: '#0B0F19', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '2rem 1rem',
        backgroundImage: 'radial-gradient(circle at 50% 20%, rgba(56, 102, 53, 0.18) 0%, transparent 60%)'
      }}
    >
      <div 
        style={{ 
          width: '100%', 
          maxWidth: 480, 
          backgroundColor: '#111827', 
          borderRadius: 24, 
          border: '1px solid #1F2937', 
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          padding: '2.5rem 2rem',
          color: '#FFFFFF'
        }}
      >
        
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div 
            style={{ 
              width: 64, 
              height: 64, 
              borderRadius: 20, 
              backgroundColor: '#386635', 
              color: '#FFFFFF', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto',
              boxShadow: '0 10px 25px rgba(56, 102, 53, 0.4)'
            }}
          >
            <Building2 size={32} />
          </div>

          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
            A2 REALTORS <span style={{ color: '#457B43' }}>CRM</span>
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#9CA3AF' }}>
            Private Staff Authentication Portal
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div 
            style={{ 
              backgroundColor: 'rgba(239, 68, 68, 0.1)', 
              border: '1px solid #EF4444', 
              color: '#F87171', 
              padding: '0.75rem 1rem', 
              borderRadius: 12, 
              fontSize: '0.85rem', 
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            <Shield size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit}>
          
          {/* Email Field */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#D1D5DB', marginBottom: '0.4rem' }}>
              Staff Email / Username
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: 14, top: 12, color: '#6B7280' }}>
                <Mail size={18} />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="staff@a2realtors.in"
                style={{
                  width: '100%',
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: 12,
                  padding: '0.7rem 1rem 0.7rem 2.6rem',
                  color: '#FFFFFF',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div className="flex justify-between items-center" style={{ marginBottom: '0.4rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#D1D5DB' }}>
                Password
              </label>
              <span style={{ fontSize: '0.75rem', color: '#457B43', cursor: 'pointer' }} onClick={() => alert('Please contact Super Admin at info@a2realtors.in for password resets.')}>
                Forgot Password?
              </span>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: 14, top: 12, color: '#6B7280' }}>
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: 12,
                  padding: '0.7rem 2.6rem 0.7rem 2.6rem',
                  color: '#FFFFFF',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: 14, top: 12, color: '#6B7280', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Login Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              backgroundColor: '#386635',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 12,
              padding: '0.85rem 1.5rem',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              boxShadow: '0 4px 14px rgba(56, 102, 53, 0.4)',
              transition: 'all 0.2s ease'
            }}
          >
            {isLoading ? 'Authenticating...' : 'Sign In to CRM Portal'}
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Demo Roles Quick Login Pills */}
        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #1F2937' }}>
          <div style={{ fontSize: '0.78rem', color: '#9CA3AF', marginBottom: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            ⚡ 1-Click Demo Role Presets
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              { role: 'SUPER_ADMIN', label: 'Super Admin', email: 'admin@a2realtors.in' },
              { role: 'ADMIN', label: 'Operations Admin', email: 'operations@a2realtors.in' },
              { role: 'SALES_MANAGER', label: 'Sales Manager', email: 'sales@a2realtors.in' },
              { role: 'AGENT', label: 'Property Agent', email: 'vikram@a2realtors.in' },
              { role: 'TELECALLER', label: 'Telecaller', email: 'priya@a2realtors.in' }
            ].map(preset => (
              <button
                key={preset.role}
                type="button"
                onClick={() => handleQuickRoleSelect(preset.role as UserRole, preset.email)}
                style={{
                  backgroundColor: selectedRole === preset.role ? '#386635' : '#1F2937',
                  color: selectedRole === preset.role ? '#FFFFFF' : '#D1D5DB',
                  border: '1px solid',
                  borderColor: selectedRole === preset.role ? '#457B43' : '#374151',
                  borderRadius: 10,
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>{preset.label}</span>
                {selectedRole === preset.role && <CheckCircle2 size={13} />}
              </button>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.75rem', color: '#6B7280' }}>
          Restricted access for authorized A2 Realtors staff only.
        </div>

      </div>
    </div>
  );
};
