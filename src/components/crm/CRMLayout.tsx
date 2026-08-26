import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, GitBranch, Home, UserCheck, Calendar, Clock, 
  CheckSquare, DollarSign, Target, Sparkles, FileText, BarChart3, Settings as SettingsIcon,
  Search, Bell, Plus, Shield, LogOut, ChevronLeft, ChevronRight, ArrowLeft
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { UserRole } from '../../types';

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
    { role: 'ADMIN', label: '🛡️ Admin' },
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
    { name: 'Settings & Audit', path: '/admin/settings', icon: SettingsIcon }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F1F5F9' }}>
      
      {/* SIDEBAR NAVIGATION */}
      <aside 
        style={{
          width: sidebarCollapsed ? 80 : 260,
          backgroundColor: '#0F172A',
          color: '#94A3B8',
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 40,
          borderRight: '1px solid #1E293B'
        }}
      >
        {/* Sidebar Brand Header */}
        <div style={{ padding: '1.25rem 1rem', borderBottom: '1px solid #1E293B', display: 'flex', alignItems: 'center', justifyContent: sidebarCollapsed ? 'center' : 'space-between' }}>
          {!sidebarCollapsed && (
            <div>
              <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.25rem', color: '#FFFFFF' }}>
                A2 <span style={{ color: '#D97706' }}>CRM</span>
              </div>
              <div style={{ fontSize: '0.65rem', color: '#64748B', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Internal Sales Platform
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            style={{ color: '#94A3B8', padding: '0.25rem', borderRadius: 4, cursor: 'pointer' }}
          >
            {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Role Switcher Pill (Section 41) */}
        {!sidebarCollapsed && (
          <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #1E293B' }}>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: 4 }}>
              Current User & Role
            </div>
            <select
              value={activeRole}
              onChange={(e) => setActiveRole(e.target.value as UserRole)}
              style={{
                width: '100%',
                backgroundColor: '#1E293B',
                color: '#FEF3C7',
                border: '1px solid #334155',
                borderRadius: 6,
                padding: '0.35rem 0.5rem',
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
        <nav style={{ flexGrow: 1, overflowY: 'auto', padding: '0.75rem 0.5rem', display: 'flex', flexDirection: 'column', gap: 4 }}>
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
                  gap: '0.75rem',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 8,
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 700 : 500,
                  backgroundColor: isActive ? '#D97706' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#CBD5E1',
                  transition: 'all 0.15s ease'
                }}
              >
                <item.icon size={18} style={{ color: isActive ? '#FFFFFF' : '#94A3B8', flexShrink: 0 }} />
                {!sidebarCollapsed && <span>{item.name}</span>}
                {!sidebarCollapsed && item.badge !== undefined && item.badge > 0 && (
                  <span style={{ marginLeft: 'auto', backgroundColor: isActive ? '#FFFFFF' : '#334155', color: isActive ? '#D97706' : '#F8FAFC', fontSize: '0.68rem', fontWeight: 700, padding: '0.1rem 0.45rem', borderRadius: 10 }}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer: Return to Public Portal */}
        <div style={{ padding: '1rem', borderTop: '1px solid #1E293B' }}>
          <button
            onClick={onSwitchToPublic}
            className="btn btn-outline btn-sm w-full"
            style={{ color: '#F8FAFC', borderColor: '#334155', justifyContent: sidebarCollapsed ? 'center' : 'flex-start' }}
          >
            <ArrowLeft size={16} />
            {!sidebarCollapsed && <span>Back to Public Website</span>}
          </button>
        </div>

      </aside>

      {/* MAIN CRM CONTENT CONTAINER */}
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
        {/* TOP BAR HEADER */}
        <header style={{ height: 64, backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 30 }}>
          
          {/* Global Search Bar (Section 54) */}
          <div style={{ position: 'relative', width: 340 }}>
            <input
              type="text"
              placeholder="Search leads, properties, deals (e.g. A2-1024)..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.2rem', paddingRight: '1rem', height: 38, fontSize: '0.85rem' }}
            />
            <Search size={16} style={{ position: 'absolute', left: 10, top: 11, color: '#94A3B8' }} />
          </div>

          {/* Top Actions: Quick Add, Notifications, User Profile */}
          <div className="flex items-center gap-4">
            
            {/* Quick Add Menu */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowQuickAdd(!showQuickAdd)}
                className="btn btn-primary btn-sm flex items-center gap-1"
              >
                <Plus size={16} /> Quick Add
              </button>
              {showQuickAdd && (
                <div style={{ position: 'absolute', top: 44, right: 0, width: 200, backgroundColor: '#FFFFFF', borderRadius: 10, boxShadow: '0 10px 25px rgba(0,0,0,0.15)', border: '1px solid #E2E8F0', padding: '0.5rem', zIndex: 50 }}>
                  <button onClick={() => { setShowQuickAdd(false); navigate('/admin/leads?action=new'); }} style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', fontSize: '0.85rem', color: '#0F172A', cursor: 'pointer', borderRadius: 4 }}>+ Add New Lead</button>
                  <button onClick={() => { setShowQuickAdd(false); navigate('/admin/properties?action=new'); }} style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', fontSize: '0.85rem', color: '#0F172A', cursor: 'pointer', borderRadius: 4 }}>+ Add New Property</button>
                  <button onClick={() => { setShowQuickAdd(false); navigate('/admin/site-visits?action=new'); }} style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', fontSize: '0.85rem', color: '#0F172A', cursor: 'pointer', borderRadius: 4 }}>+ Schedule Site Visit</button>
                  <button onClick={() => { setShowQuickAdd(false); navigate('/admin/deals?action=new'); }} style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', fontSize: '0.85rem', color: '#0F172A', cursor: 'pointer', borderRadius: 4 }}>+ Record New Deal</button>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                style={{ position: 'relative', width: 38, height: 38, borderRadius: '50%', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569' }}
              >
                <Bell size={18} />
                <span style={{ position: 'absolute', top: 2, right: 2, width: 8, height: 8, borderRadius: '50%', backgroundColor: '#EF4444' }}></span>
              </button>
              {showNotifications && (
                <div style={{ position: 'absolute', top: 44, right: 0, width: 300, backgroundColor: '#FFFFFF', borderRadius: 12, boxShadow: '0 10px 25px rgba(0,0,0,0.15)', border: '1px solid #E2E8F0', padding: '1rem', zIndex: 50 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.75rem' }}>Recent Notifications</div>
                  <div className="flex flex-col gap-2" style={{ fontSize: '0.82rem', color: '#475569' }}>
                    <div style={{ backgroundColor: '#FEF3C7', padding: '0.5rem', borderRadius: 6 }}>🔥 New HOT lead Dr. Alok Aggarwal requested Dalanwala site visit.</div>
                    <div style={{ backgroundColor: '#F1F5F9', padding: '0.5rem', borderRadius: 6 }}>🏡 Property A2-1088 penthouse price updated to ₹2.15 Cr.</div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Pill & Logout Button */}
            <div className="flex items-center gap-3" style={{ paddingLeft: '0.75rem', borderLeft: '1px solid #E2E8F0' }}>
              <img src={activeUser.avatar} alt={activeUser.name} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', lineHeight: 1.1 }}>{activeUser.name}</div>
                <div style={{ fontSize: '0.7rem', color: '#386635', fontWeight: 600 }}>{activeRole}</div>
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
                  padding: '0.35rem 0.6rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  marginLeft: '0.5rem'
                }}
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            </div>

          </div>

        </header>

        {/* CRM PAGE BODY */}
        <main style={{ flexGrow: 1, padding: '1.75rem', overflowY: 'auto' }}>
          {children}
        </main>

      </div>

    </div>
  );
};
