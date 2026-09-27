import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, GitBranch, Home, UserCheck, Calendar, Clock, 
  CheckSquare, DollarSign, Target, Sparkles, FileText, BarChart3, Settings as SettingsIcon,
  Search, Bell, Plus, Shield, LogOut, ChevronLeft, ChevronRight, ArrowLeft, ExternalLink
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { UserRole } from '../../types';
import { Logo } from '../common/Logo';

interface CRMLayoutProps {
  children: React.ReactNode;
  onSwitchToPublic?: () => void;
}

export const CRMLayout: React.FC<CRMLayoutProps> = ({ children, onSwitchToPublic }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { activeUser, activeRole, setActiveRole, logout, leads, followUps, siteVisits } = useStore();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  const pendingTasksCount = followUps.filter(f => f.status === 'PENDING').length;
  const todayVisitsCount = siteVisits.filter(v => v.status === 'SCHEDULED').length;

  const roleOptions: { role: UserRole; label: string }[] = [
    { role: 'SUPER_ADMIN', label: '👑 Super Admin' },
    { role: 'ADMIN', label: '🛡️ Operations Admin' },
    { role: 'SALES_MANAGER', label: '💼 Sales Manager' },
    { role: 'AGENT', label: '🏢 Agent (Priya Verma)' },
    { role: 'TELECALLER', label: '📞 Telecaller (Neha Kapoor)' }
  ];

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Leads CRM', path: '/admin/leads', icon: Users, badge: leads.length },
    { name: 'Kanban Pipeline', path: '/admin/pipeline', icon: GitBranch },
    { name: 'Property Inventory', path: '/admin/properties', icon: Home },
    { name: 'Owners CRM', path: '/admin/owners', icon: UserCheck },
    { name: 'Site Visits', path: '/admin/site-visits', icon: Calendar, badge: todayVisitsCount },
    { name: 'Follow-up Tasks', path: '/admin/follow-ups', icon: Clock, badge: pendingTasksCount },
    { name: 'Deals & Commission', path: '/admin/deals', icon: DollarSign },
    { name: 'Property Matcher', path: '/admin/matching', icon: Target },
    { name: 'AI Sales Assistant', path: '/admin/ai-assistant', icon: Sparkles },
    { name: 'Marketing ROI', path: '/admin/campaigns', icon: BarChart3 },
    { name: 'Website CMS', path: '/admin/cms', icon: FileText },
    { name: 'Homepage Customizer', path: '/admin/homepage-customizer', icon: Sparkles },
    { name: 'Reports & Export', path: '/admin/reports', icon: BarChart3 },
    { name: 'Staff & Roles', path: '/admin/staff', icon: Shield },
    { name: 'Settings & Audit', path: '/admin/settings', icon: SettingsIcon }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      
      {/* SIDEBAR NAVIGATION */}
      <aside 
        style={{
          width: sidebarCollapsed ? 80 : 270,
          backgroundColor: '#0B1120',
          color: '#94A3B8',
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 40,
          borderRight: '1px solid #1E2E4F',
          flexShrink: 0
        }}
      >
        {/* Sidebar Brand Header */}
        <div style={{ padding: '1rem', borderBottom: '1px solid #1E2E4F', display: 'flex', alignItems: 'center', justifyContent: sidebarCollapsed ? 'center' : 'space-between' }}>
          {!sidebarCollapsed && (
            <div style={{ maxWidth: 190 }}>
              <Logo size="xs" lightMode={true} />
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            style={{ color: '#94A3B8', padding: '0.35rem', borderRadius: 6, cursor: 'pointer', backgroundColor: 'rgba(255,255,255,0.05)' }}
          >
            {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Role Switcher */}
        {!sidebarCollapsed && (
          <div style={{ padding: '0.85rem 1rem', borderBottom: '1px solid #1E2E4F', backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: 5 }}>
              Active User Role
            </div>
            <select
              value={activeRole}
              onChange={(e) => setActiveRole(e.target.value as UserRole)}
              style={{
                width: '100%',
                backgroundColor: '#131D33',
                color: '#FEF3C7',
                border: '1px solid #1E2E4F',
                borderRadius: 8,
                padding: '0.4rem 0.6rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                outline: 'none'
              }}
            >
              {roleOptions.map(r => (
                <option key={r.role} value={r.role}>{r.label}</option>
              ))}
            </select>
          </div>
        )}

        {/* Navigation Items */}
        <nav style={{ flexGrow: 1, overflowY: 'auto', padding: '0.85rem 0.6rem', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {menuItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                title={sidebarCollapsed ? item.name : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 10,
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 800 : 500,
                  backgroundColor: isActive ? '#386635' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#CBD5E1',
                  boxShadow: isActive ? '0 4px 12px rgba(56,102,53,0.35)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <item.icon size={18} style={{ color: isActive ? '#FFFFFF' : '#94A3B8', flexShrink: 0 }} />
                {!sidebarCollapsed && <span>{item.name}</span>}
                {!sidebarCollapsed && item.badge !== undefined && item.badge > 0 && (
                  <span style={{ marginLeft: 'auto', backgroundColor: isActive ? '#FFFFFF' : '#1E2E4F', color: isActive ? '#386635' : '#F8FAFC', fontSize: '0.68rem', fontWeight: 800, padding: '0.1rem 0.5rem', borderRadius: 10 }}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer: Return to Public Portal */}
        <div style={{ padding: '1rem', borderTop: '1px solid #1E2E4F' }}>
          <button
            onClick={onSwitchToPublic}
            className="btn-outline-gray btn-sm w-full"
            style={{ 
              color: '#F8FAFC', 
              borderColor: '#1E2E4F', 
              backgroundColor: 'rgba(255,255,255,0.05)',
              justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
              padding: '0.65rem 0.85rem',
              borderRadius: 10
            }}
          >
            <ArrowLeft size={16} />
            {!sidebarCollapsed && <span>Back to Public Site</span>}
          </button>
        </div>

      </aside>

      {/* MAIN CONTENT CONTAINER */}
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
        {/* TOP BAR HEADER */}
        <header 
          style={{ 
            height: 68, 
            backgroundColor: '#FFFFFF', 
            borderBottom: '1px solid #E2E8F0', 
            padding: '0 1.75rem', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            position: 'sticky', 
            top: 0, 
            zIndex: 30,
            boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
          }}
        >
          
          {/* Global Search Bar */}
          <div style={{ position: 'relative', width: 360 }}>
            <input
              type="text"
              placeholder="Search leads, properties (e.g. A2-1024)..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.4rem', paddingRight: '1rem', height: 40, fontSize: '0.85rem', borderRadius: 10 }}
            />
            <Search size={16} style={{ position: 'absolute', left: 12, top: 12, color: '#94A3B8' }} />
          </div>

          {/* Top Actions: Quick Add, Notifications, User Profile */}
          <div className="flex items-center gap-4">
            
            {/* Quick Add Menu */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowQuickAdd(!showQuickAdd)}
                className="btn-green btn-sm flex items-center gap-1.5"
                style={{ borderRadius: 10, padding: '0.55rem 1rem' }}
              >
                <Plus size={16} /> Quick Add
              </button>
              {showQuickAdd && (
                <div style={{ position: 'absolute', top: 48, right: 0, width: 220, backgroundColor: '#FFFFFF', borderRadius: 14, boxShadow: '0 15px 30px rgba(0,0,0,0.15)', border: '1px solid #E2E8F0', padding: '0.6rem', zIndex: 50 }}>
                  <button onClick={() => { setShowQuickAdd(false); navigate('/admin/leads?action=new'); }} style={{ width: '100%', textAlign: 'left', padding: '0.6rem 0.85rem', fontSize: '0.85rem', color: '#0F172A', cursor: 'pointer', borderRadius: 6 }}>+ Add New Lead</button>
                  <button onClick={() => { setShowQuickAdd(false); navigate('/admin/properties?action=new'); }} style={{ width: '100%', textAlign: 'left', padding: '0.6rem 0.85rem', fontSize: '0.85rem', color: '#0F172A', cursor: 'pointer', borderRadius: 6 }}>+ Add New Property</button>
                  <button onClick={() => { setShowQuickAdd(false); navigate('/admin/site-visits?action=new'); }} style={{ width: '100%', textAlign: 'left', padding: '0.6rem 0.85rem', fontSize: '0.85rem', color: '#0F172A', cursor: 'pointer', borderRadius: 6 }}>+ Schedule Site Visit</button>
                  <button onClick={() => { setShowQuickAdd(false); navigate('/admin/deals?action=new'); }} style={{ width: '100%', textAlign: 'left', padding: '0.6rem 0.85rem', fontSize: '0.85rem', color: '#0F172A', cursor: 'pointer', borderRadius: 6 }}>+ Record New Deal</button>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                style={{ position: 'relative', width: 40, height: 40, borderRadius: '50%', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', cursor: 'pointer' }}
              >
                <Bell size={18} />
                <span style={{ position: 'absolute', top: 4, right: 4, width: 8, height: 8, borderRadius: '50%', backgroundColor: '#EF4444' }}></span>
              </button>
              {showNotifications && (
                <div style={{ position: 'absolute', top: 48, right: 0, width: 320, backgroundColor: '#FFFFFF', borderRadius: 16, boxShadow: '0 15px 35px rgba(0,0,0,0.15)', border: '1px solid #E2E8F0', padding: '1.25rem', zIndex: 50 }}>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.75rem', color: '#0F172A' }}>Recent Operational Alerts</div>
                  <div className="flex flex-col gap-2.5" style={{ fontSize: '0.82rem', color: '#475569' }}>
                    <div style={{ backgroundColor: '#FEF3C7', padding: '0.65rem 0.85rem', borderRadius: 10, border: '1px solid #FDE68A' }}>
                      🔥 <strong>HOT Lead Alert:</strong> Dr. Alok Aggarwal requested Dalanwala site visit for tomorrow.
                    </div>
                    <div style={{ backgroundColor: '#F1F5F9', padding: '0.65rem 0.85rem', borderRadius: 10, border: '1px solid #E2E8F0' }}>
                      🏡 <strong>Price Update:</strong> Property A2-1088 penthouse revised to ₹2.15 Cr.
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Pill & Logout Button */}
            <div className="flex items-center gap-3" style={{ paddingLeft: '0.85rem', borderLeft: '1px solid #E2E8F0' }}>
              <img src={activeUser.avatar} alt={activeUser.name} style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover', border: '2px solid #386635' }} />
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.1 }}>{activeUser.name}</div>
                <div style={{ fontSize: '0.72rem', color: '#386635', fontWeight: 700 }}>{activeRole.replace('_', ' ')}</div>
              </div>
              <button
                onClick={() => {
                  logout();
                  navigate('/admin/login');
                }}
                title="Log Out of CRM"
                style={{
                  backgroundColor: '#FEF2F2',
                  color: '#DC2626',
                  border: '1px solid #FCA5A5',
                  borderRadius: 8,
                  padding: '0.35rem 0.65rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  marginLeft: '0.5rem'
                }}
              >
                <LogOut size={13} />
                <span>Exit</span>
              </button>
            </div>

          </div>

        </header>

        {/* CRM PAGE BODY */}
        <main style={{ flexGrow: 1, padding: '2rem', overflowY: 'auto' }}>
          {children}
        </main>

      </div>

    </div>
  );
};
