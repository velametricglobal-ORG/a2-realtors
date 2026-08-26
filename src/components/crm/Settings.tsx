import React, { useState } from 'react';
import { Settings as SettingsIcon, Shield, Database, Palette, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Settings: React.FC = () => {
  const { brandTheme, updateBrandTheme } = useStore();
  const [savedNotice, setSavedNotice] = useState(false);

  const [primaryColor, setPrimaryColor] = useState(brandTheme.primaryColor);
  const [accentColor, setAccentColor] = useState(brandTheme.accentColor);
  const [phone, setPhone] = useState(brandTheme.phone);
  const [address, setAddress] = useState(brandTheme.address);

  const handleSaveBrandTheme = (e: React.FormEvent) => {
    e.preventDefault();
    updateBrandTheme({
      primaryColor,
      accentColor,
      phone,
      address
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const permissionsMatrix = [
    { role: 'SUPER_ADMIN', viewLeads: true, editLeads: true, deleteLeads: true, viewFinances: true, editCMS: true },
    { role: 'ADMIN', viewLeads: true, editLeads: true, deleteLeads: true, viewFinances: true, editCMS: true },
    { role: 'SALES_MANAGER', viewLeads: true, editLeads: true, deleteLeads: false, viewFinances: true, editCMS: false },
    { role: 'AGENT', viewLeads: true, editLeads: true, deleteLeads: false, viewFinances: false, editCMS: false },
    { role: 'TELECALLER', viewLeads: true, editLeads: true, deleteLeads: false, viewFinances: false, editCMS: false },
    { role: 'VIEWER', viewLeads: true, editLeads: false, deleteLeads: false, viewFinances: false, editCMS: false }
  ];

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A' }}>System Settings & RBAC Permissions</h1>
        <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
          Configure A2 Realtors company info, brand colors, database schemas, and role permission matrices.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* BRAND & COMPANY SETTINGS */}
        <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginBottom: '1.25rem' }} className="flex items-center gap-2">
            <Palette size={18} style={{ color: '#D97706' }} /> Company & Brand Customization
          </h3>

          {savedNotice && (
            <div style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '0.75rem', borderRadius: 8, marginBottom: '1rem', fontSize: '0.85rem' }}>
              ✓ Brand settings updated successfully!
            </div>
          )}

          <form onSubmit={handleSaveBrandTheme}>
            <div className="form-group">
              <label className="form-label">Registered Business Location</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-input" />
            </div>

            <div className="form-group">
              <label className="form-label">Public Contact Phone</label>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-input" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="form-group">
                <label className="form-label">Primary Color</label>
                <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} style={{ width: '100%', height: 40, border: 'none', cursor: 'pointer' }} />
              </div>
              <div className="form-group">
                <label className="form-label">Accent Color</label>
                <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} style={{ width: '100%', height: 40, border: 'none', cursor: 'pointer' }} />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" style={{ marginTop: '1rem', width: '100%' }}>
              Save Brand Customization
            </button>
          </form>
        </div>

        {/* ROLE PERMISSIONS MATRIX (RBAC) */}
        <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginBottom: '1rem' }} className="flex items-center gap-2">
            <Shield size={18} style={{ color: '#D97706' }} /> Granular Role Access Control Matrix
          </h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', color: '#475569' }}>
                  <th style={{ padding: '0.5rem' }}>Role</th>
                  <th style={{ padding: '0.5rem' }}>Leads</th>
                  <th style={{ padding: '0.5rem' }}>Delete</th>
                  <th style={{ padding: '0.5rem' }}>Finance</th>
                  <th style={{ padding: '0.5rem' }}>CMS</th>
                </tr>
              </thead>
              <tbody>
                {permissionsMatrix.map(p => (
                  <tr key={p.role} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '0.65rem 0.5rem', fontWeight: 700, color: '#0F172A' }}>{p.role}</td>
                    <td style={{ padding: '0.65rem 0.5rem', color: p.viewLeads ? '#10B981' : '#EF4444' }}>{p.viewLeads ? '✓ Full' : '✕ No'}</td>
                    <td style={{ padding: '0.65rem 0.5rem', color: p.deleteLeads ? '#10B981' : '#EF4444' }}>{p.deleteLeads ? '✓ Yes' : '✕ Denied'}</td>
                    <td style={{ padding: '0.65rem 0.5rem', color: p.viewFinances ? '#10B981' : '#EF4444' }}>{p.viewFinances ? '✓ Yes' : '✕ Restricted'}</td>
                    <td style={{ padding: '0.65rem 0.5rem', color: p.editCMS ? '#10B981' : '#EF4444' }}>{p.editCMS ? '✓ Yes' : '✕ Denied'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};
