import React, { useState } from 'react';
import { 
  Users, Shield, Key, Plus, Trash2, Edit3, CheckCircle2, 
  X, Eye, EyeOff, Lock, Phone, Mail, UserCheck, AlertTriangle, 
  Sparkles, Check, ChevronRight, ShieldCheck, RefreshCw
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { UserProfile, UserRole, UserRoleDefinition, RolePermissions } from '../../types';
import { ImageUploadInput } from '../common/ImageUploadInput';

export const StaffManagement: React.FC = () => {
  const { 
    staff, 
    roles, 
    activeUser, 
    addStaff, 
    updateStaff, 
    changeStaffPassword, 
    removeStaff, 
    addRole, 
    removeRole 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'STAFF' | 'ROLES'>('STAFF');
  const [notification, setNotification] = useState<string | null>(null);

  // Modals state
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEditStaffModal, setShowEditStaffModal] = useState(false);
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

  // Selected staff for action
  const [selectedStaff, setSelectedStaff] = useState<UserProfile | null>(null);

  // Add Staff Form state
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffEmail, setNewStaffEmail] = useState('');
  const [newStaffPhone, setNewStaffPhone] = useState('+91 ');
  const [newStaffRole, setNewStaffRole] = useState<UserRole>('AGENT');
  const [newStaffPassword, setNewStaffPassword] = useState('admin123');
  const [newStaffAvatar, setNewStaffAvatar] = useState('');
  const [showNewStaffPass, setShowNewStaffPass] = useState(false);

  // Change Password Form state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordText, setShowPasswordText] = useState(false);

  // Edit Staff Form state
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editRole, setEditRole] = useState<UserRole>('AGENT');
  const [editAvatar, setEditAvatar] = useState('');

  // Create Role Form state
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDesc, setNewRoleDesc] = useState('');
  const [newRolePermissions, setNewRolePermissions] = useState<RolePermissions>({
    viewLeads: true,
    editLeads: true,
    deleteLeads: false,
    manageProperties: true,
    viewFinances: false,
    editCMS: false,
    manageStaff: false
  });

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // 1. Handle Add Staff
  const handleAddStaffSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffName || !newStaffEmail) return;

    // Check if email already exists
    if (staff.some(s => s.email.toLowerCase() === newStaffEmail.trim().toLowerCase())) {
      alert('A staff member with this login email already exists. Please use a unique email.');
      return;
    }

    addStaff({
      name: newStaffName,
      email: newStaffEmail.trim(),
      phone: newStaffPhone,
      role: newStaffRole,
      password: newStaffPassword || 'admin123',
      avatar: newStaffAvatar
    });

    setShowAddStaffModal(false);
    setNewStaffName('');
    setNewStaffEmail('');
    setNewStaffPhone('+91 ');
    setNewStaffRole('AGENT');
    setNewStaffPassword('admin123');
    setNewStaffAvatar('');
    showToast(`Staff member ${newStaffName} created successfully with login access!`);
  };

  // 2. Handle Change Password
  const openPasswordModal = (member: UserProfile) => {
    setSelectedStaff(member);
    setNewPassword('');
    setConfirmPassword('');
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStaff || !newPassword) return;

    if (newPassword.length < 4) {
      alert('Password must be at least 4 characters long.');
      return;
    }

    if (confirmPassword && newPassword !== confirmPassword) {
      alert('Passwords do not match. Please re-type to confirm.');
      return;
    }

    changeStaffPassword(selectedStaff.id, newPassword);
    setShowPasswordModal(false);
    showToast(`Password for ${selectedStaff.name} (${selectedStaff.email}) was updated successfully!`);
    setSelectedStaff(null);
  };

  // 3. Handle Edit Staff
  const openEditModal = (member: UserProfile) => {
    setSelectedStaff(member);
    setEditName(member.name);
    setEditPhone(member.phone);
    setEditRole(member.role);
    setEditAvatar(member.avatar || '');
    setShowEditStaffModal(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStaff || !editName) return;

    updateStaff(selectedStaff.id, {
      name: editName,
      phone: editPhone,
      role: editRole,
      avatar: editAvatar
    });

    setShowEditStaffModal(false);
    showToast(`Profile details for ${editName} updated successfully!`);
    setSelectedStaff(null);
  };

  // 4. Handle Remove Staff
  const openDeleteConfirm = (member: UserProfile) => {
    setSelectedStaff(member);
    setShowDeleteConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedStaff) return;
    const success = removeStaff(selectedStaff.id);
    setShowDeleteConfirmModal(false);

    if (success) {
      showToast(`Staff member ${selectedStaff.name} was removed from the system.`);
    } else {
      alert('Cannot remove the only remaining staff account in the system.');
    }
    setSelectedStaff(null);
  };

  // 5. Handle Create Custom Role
  const handleAddRoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoleName) return;

    const roleKey = newRoleName.toUpperCase().replace(/[^A-Z0-9]+/g, '_');

    // Check if role key exists
    if (roles.some(r => r.roleKey === roleKey)) {
      alert('A role with a similar key already exists. Please choose another name.');
      return;
    }

    addRole({
      name: newRoleName,
      roleKey,
      description: newRoleDesc || `Custom ${newRoleName} role with customized CRM access privileges.`,
      permissions: newRolePermissions,
      isSystem: false
    });

    setShowAddRoleModal(false);
    setNewRoleName('');
    setNewRoleDesc('');
    setNewRolePermissions({
      viewLeads: true,
      editLeads: true,
      deleteLeads: false,
      manageProperties: true,
      viewFinances: false,
      editCMS: false,
      manageStaff: false
    });
    showToast(`Role "${newRoleName}" created! You can now assign staff members to this role.`);
  };

  // Stats Counters
  const totalStaff = staff.length;
  const adminCount = staff.filter(s => s.role === 'SUPER_ADMIN' || s.role === 'ADMIN').length;
  const agentCount = staff.filter(s => s.role === 'AGENT' || s.role === 'SALES_MANAGER').length;

  return (
    <div className="flex flex-col gap-6" style={{ paddingBottom: '4rem' }}>
      
      {/* Top Banner Alert Notice */}
      {notification && (
        <div 
          className="flex items-center gap-2.5"
          style={{ 
            backgroundColor: '#DCFCE7', 
            color: '#166534', 
            border: '1px solid #86EFAC', 
            padding: '1rem 1.25rem', 
            borderRadius: 14,
            fontSize: '0.92rem',
            fontWeight: 700,
            boxShadow: '0 4px 12px rgba(22, 101, 52, 0.1)'
          }}
        >
          <CheckCircle2 size={20} style={{ color: '#16A34A', flexShrink: 0 }} />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Header & Tab Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
            Staff & Role Access Control (RBAC)
          </h1>
          <p style={{ color: '#64748B', fontSize: '0.92rem', marginTop: 4 }}>
            Create and manage staff login accounts, change passwords, assign role permissions, and remove team members.
          </p>
        </div>

        {/* Tab Switcher & Quick Add Buttons */}
        <div className="flex items-center gap-3">
          <div style={{ backgroundColor: '#E2E8F0', padding: 4, borderRadius: 12, display: 'flex', gap: 4 }}>
            <button
              onClick={() => setActiveTab('STAFF')}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: 8,
                fontSize: '0.85rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeTab === 'STAFF' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'STAFF' ? '#0F172A' : '#64748B',
                boxShadow: activeTab === 'STAFF' ? '0 2px 5px rgba(0,0,0,0.08)' : 'none'
              }}
            >
              Staff Directory ({staff.length})
            </button>
            <button
              onClick={() => setActiveTab('ROLES')}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: 8,
                fontSize: '0.85rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeTab === 'ROLES' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'ROLES' ? '#0F172A' : '#64748B',
                boxShadow: activeTab === 'ROLES' ? '0 2px 5px rgba(0,0,0,0.08)' : 'none'
              }}
            >
              Roles & Permissions ({roles.length})
            </button>
          </div>

          {activeTab === 'STAFF' ? (
            <button 
              onClick={() => setShowAddStaffModal(true)}
              className="btn-green flex items-center gap-1.5"
              style={{ borderRadius: 12, padding: '0.55rem 1.15rem', fontSize: '0.88rem' }}
            >
              <Plus size={16} />
              <span>Add New Staff</span>
            </button>
          ) : (
            <button 
              onClick={() => setShowAddRoleModal(true)}
              className="btn-dark flex items-center gap-1.5"
              style={{ borderRadius: 12, padding: '0.55rem 1.15rem', fontSize: '0.88rem' }}
            >
              <Plus size={16} />
              <span>Create Custom Role</span>
            </button>
          )}
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        
        <div className="card" style={{ padding: '1.25rem 1.5rem', backgroundColor: '#FFFFFF', borderRadius: 16 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Total Staff Accounts
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A', marginTop: 4, fontFamily: 'Outfit' }}>
            {totalStaff}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#16A34A', marginTop: 2, fontWeight: 600 }}>
            Active CRM Logins
          </div>
        </div>

        <div className="card" style={{ padding: '1.25rem 1.5rem', backgroundColor: '#FFFFFF', borderRadius: 16 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Administrators
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A', marginTop: 4, fontFamily: 'Outfit' }}>
            {adminCount}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: 2 }}>
            Super Admin & Ops
          </div>
        </div>

        <div className="card" style={{ padding: '1.25rem 1.5rem', backgroundColor: '#FFFFFF', borderRadius: 16 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Sales Agents & Managers
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A', marginTop: 4, fontFamily: 'Outfit' }}>
            {agentCount}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: 2 }}>
            Field & Pipeline Execs
          </div>
        </div>

        <div className="card" style={{ padding: '1.25rem 1.5rem', backgroundColor: '#FFFFFF', borderRadius: 16 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Configured Roles
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A', marginTop: 4, fontFamily: 'Outfit' }}>
            {roles.length}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#386635', marginTop: 2, fontWeight: 700 }}>
            System & Custom
          </div>
        </div>

      </div>

      {/* TAB 1: STAFF DIRECTORY */}
      {activeTab === 'STAFF' && (
        <div className="card" style={{ backgroundColor: '#FFFFFF', borderRadius: 20, overflow: 'hidden', border: '1px solid #E2E8F0', padding: 0 }}>
          
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>
                Active Staff Directory
              </h2>
              <p style={{ fontSize: '0.82rem', color: '#64748B' }}>
                All users listed below can log into the CRM using their Email address as the Login ID.
              </p>
            </div>
            
            <button 
              onClick={() => setShowAddStaffModal(true)}
              className="btn-outline-green btn-sm flex items-center gap-1.5"
              style={{ borderRadius: 10 }}
            >
              <Plus size={14} /> Add Staff
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  <th style={{ padding: '1rem 1.5rem' }}>Staff Member / ID</th>
                  <th style={{ padding: '1rem 1.25rem' }}>Contact Info</th>
                  <th style={{ padding: '1rem 1.25rem' }}>Assigned Role</th>
                  <th style={{ padding: '1rem 1.25rem' }}>Deals Closed</th>
                  <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {staff.map(member => {
                  const isCurrent = activeUser.id === member.id;
                  const roleDef = roles.find(r => r.roleKey === member.role);

                  return (
                    <tr key={member.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      
                      {/* Name & Avatar */}
                      <td style={{ padding: '1.1rem 1.5rem' }}>
                        <div className="flex items-center gap-3">
                          <img 
                            src={member.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'} 
                            alt={member.name}
                            style={{ width: 42, height: 42, borderRadius: 12, objectFit: 'cover', border: '1.5px solid #E2E8F0' }}
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.95rem' }}>
                                {member.name}
                              </span>
                              {isCurrent && (
                                <span style={{ backgroundColor: '#EBF4EC', color: '#1B4332', fontSize: '0.68rem', fontWeight: 800, padding: '0.1rem 0.45rem', borderRadius: 8 }}>
                                  YOU
                                </span>
                              )}
                            </div>
                            <div style={{ fontSize: '0.78rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                              <code>{member.email}</code>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Contact Phone */}
                      <td style={{ padding: '1.1rem 1.25rem', color: '#334155' }}>
                        <div className="flex items-center gap-1.5" style={{ fontSize: '0.86rem' }}>
                          <Phone size={14} style={{ color: '#94A3B8' }} />
                          <span>{member.phone || '+91 84451 90135'}</span>
                        </div>
                      </td>

                      {/* Assigned Role */}
                      <td style={{ padding: '1.1rem 1.25rem' }}>
                        <span 
                          style={{ 
                            fontSize: '0.75rem', 
                            fontWeight: 800, 
                            padding: '0.3rem 0.75rem', 
                            borderRadius: 20,
                            backgroundColor: member.role === 'SUPER_ADMIN' ? '#FEF3C7' : member.role === 'ADMIN' ? '#EBF4EC' : '#F1F5F9',
                            color: member.role === 'SUPER_ADMIN' ? '#B45309' : member.role === 'ADMIN' ? '#1B4332' : '#334155',
                            border: '1px solid rgba(0,0,0,0.06)'
                          }}
                        >
                          {roleDef?.name || member.role}
                        </span>
                      </td>

                      {/* Deals & Performance */}
                      <td style={{ padding: '1.1rem 1.25rem', color: '#0F172A', fontWeight: 700 }}>
                        {member.dealsClosed} Closed Deals
                      </td>

                      {/* Action Buttons: Password Change, Edit, Delete */}
                      <td style={{ padding: '1.1rem 1.5rem', textAlign: 'right' }}>
                        <div className="flex items-center justify-end gap-2">
                          
                          {/* Change Password Button */}
                          <button
                            onClick={() => openPasswordModal(member)}
                            className="btn-outline-gray btn-sm flex items-center gap-1.5"
                            style={{ borderRadius: 8, fontSize: '0.78rem', padding: '0.35rem 0.75rem', color: '#0F172A' }}
                            title="Change Login Password"
                          >
                            <Key size={13} style={{ color: '#C5A059' }} />
                            <span>Change Password</span>
                          </button>

                          {/* Edit Profile Button */}
                          <button
                            onClick={() => openEditModal(member)}
                            className="btn-outline-gray btn-sm"
                            style={{ borderRadius: 8, padding: '0.35rem 0.55rem' }}
                            title="Edit Staff Member"
                          >
                            <Edit3 size={14} style={{ color: '#475569' }} />
                          </button>

                          {/* Delete Staff Button */}
                          <button
                            onClick={() => openDeleteConfirm(member)}
                            disabled={staff.length <= 1}
                            className="btn-outline-gray btn-sm"
                            style={{ borderRadius: 8, padding: '0.35rem 0.55rem', color: '#EF4444', borderColor: '#FEE2E2', backgroundColor: '#FEF2F2' }}
                            title="Remove Staff Member"
                          >
                            <Trash2 size={14} />
                          </button>

                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* TAB 2: ROLES & PERMISSIONS */}
      {activeTab === 'ROLES' && (
        <div className="flex flex-col gap-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map(r => (
              <div 
                key={r.id || r.roleKey}
                className="card"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 20,
                  padding: '1.75rem',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div className="flex items-center justify-between" style={{ marginBottom: '0.65rem' }}>
                    <div className="flex items-center gap-2">
                      <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: '#EBF4EC', color: '#386635', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Shield size={18} />
                      </div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>
                        {r.name}
                      </h3>
                    </div>

                    {r.isSystem ? (
                      <span style={{ fontSize: '0.68rem', fontWeight: 800, backgroundColor: '#F1F5F9', color: '#64748B', padding: '0.15rem 0.5rem', borderRadius: 8 }}>
                        SYSTEM
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete custom role "${r.name}"?`)) {
                            removeRole(r.roleKey);
                            showToast(`Role ${r.name} removed.`);
                          }
                        }}
                        style={{ color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer' }}
                        title="Delete Role"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>

                  <p style={{ fontSize: '0.84rem', color: '#64748B', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                    {r.description}
                  </p>

                  {/* Permissions Chips */}
                  <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '1rem' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.65rem' }}>
                      Enabled Permissions
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {r.permissions.viewLeads && <span style={{ fontSize: '0.72rem', backgroundColor: '#EBF4EC', color: '#166534', padding: '0.2rem 0.55rem', borderRadius: 8, fontWeight: 700 }}>✓ View Leads</span>}
                      {r.permissions.editLeads && <span style={{ fontSize: '0.72rem', backgroundColor: '#EBF4EC', color: '#166534', padding: '0.2rem 0.55rem', borderRadius: 8, fontWeight: 700 }}>✓ Edit Leads</span>}
                      {r.permissions.deleteLeads && <span style={{ fontSize: '0.72rem', backgroundColor: '#FEF3C7', color: '#B45309', padding: '0.2rem 0.55rem', borderRadius: 8, fontWeight: 700 }}>✓ Delete Records</span>}
                      {r.permissions.manageProperties && <span style={{ fontSize: '0.72rem', backgroundColor: '#EBF4EC', color: '#166534', padding: '0.2rem 0.55rem', borderRadius: 8, fontWeight: 700 }}>✓ Manage Properties</span>}
                      {r.permissions.viewFinances && <span style={{ fontSize: '0.72rem', backgroundColor: '#EDE9FE', color: '#5B21B6', padding: '0.2rem 0.55rem', borderRadius: 8, fontWeight: 700 }}>✓ Financial Reports</span>}
                      {r.permissions.editCMS && <span style={{ fontSize: '0.72rem', backgroundColor: '#E0F2FE', color: '#0369A1', padding: '0.2rem 0.55rem', borderRadius: 8, fontWeight: 700 }}>✓ CMS Editor</span>}
                      {r.permissions.manageStaff && <span style={{ fontSize: '0.72rem', backgroundColor: '#FEE2E2', color: '#991B1B', padding: '0.2rem 0.55rem', borderRadius: 8, fontWeight: 700 }}>✓ Manage Staff & Roles</span>}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid #F1F5F9', fontSize: '0.78rem', color: '#64748B', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Assigned Staff:</span>
                  <strong>{staff.filter(s => s.role === r.roleKey).length} Members</strong>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* MODAL 1: ADD NEW STAFF MEMBER */}
      {showAddStaffModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.75)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', backdropFilter: 'blur(4px)' }}>
          <div className="card" style={{ maxWidth: 520, width: '100%', backgroundColor: '#FFFFFF', borderRadius: 24, padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
            
            <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A' }}>
                  Create New Staff Account
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#64748B' }}>
                  Add a new team member and set their initial login password.
                </p>
              </div>
              <button onClick={() => setShowAddStaffModal(false)} style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddStaffSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Full Name *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Ramesh Chandra" 
                  value={newStaffName} 
                  onChange={(e) => setNewStaffName(e.target.value)} 
                  className="form-input" 
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Email (Used as Login ID) *</label>
                <input 
                  type="email" 
                  required 
                  placeholder="ramesh@a2realtors.in" 
                  value={newStaffEmail} 
                  onChange={(e) => setNewStaffEmail(e.target.value)} 
                  className="form-input" 
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Phone / WhatsApp *</label>
                <input 
                  type="tel" 
                  required 
                  placeholder="+91 98970 12345" 
                  value={newStaffPhone} 
                  onChange={(e) => setNewStaffPhone(e.target.value)} 
                  className="form-input" 
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Assign Role *</label>
                <select 
                  value={newStaffRole} 
                  onChange={(e) => setNewStaffRole(e.target.value as UserRole)} 
                  className="form-select"
                >
                  {roles.map(r => (
                    <option key={r.roleKey} value={r.roleKey}>
                      {r.name} ({r.roleKey})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Initial Login Password *</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showNewStaffPass ? 'text' : 'password'} 
                    required 
                    value={newStaffPassword} 
                    onChange={(e) => setNewStaffPassword(e.target.value)} 
                    className="form-input" 
                    placeholder="Enter password (e.g. admin123)"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewStaffPass(!showNewStaffPass)}
                    style={{ position: 'absolute', right: 12, top: 12, background: 'none', border: 'none', color: '#64748B', cursor: 'pointer' }}
                  >
                    {showNewStaffPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <ImageUploadInput
                label="Staff Profile Photo (Optional)"
                value={newStaffAvatar}
                onChange={(newVal) => setNewStaffAvatar(newVal)}
                placeholder="https://images.unsplash.com/..."
                helpText="Upload a portrait photo from your computer/device or enter an image URL"
              />

              <div className="flex justify-end gap-2.5" style={{ marginTop: '0.75rem' }}>
                <button 
                  type="button" 
                  onClick={() => setShowAddStaffModal(false)} 
                  className="btn-outline-gray" 
                  style={{ borderRadius: 10 }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-green" 
                  style={{ borderRadius: 10, padding: '0.65rem 1.5rem' }}
                >
                  Create Staff Member
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* MODAL 2: CHANGE / RESET PASSWORD */}
      {showPasswordModal && selectedStaff && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.75)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', backdropFilter: 'blur(4px)' }}>
          <div className="card" style={{ maxWidth: 460, width: '100%', backgroundColor: '#FFFFFF', borderRadius: 24, padding: '2rem' }}>
            
            <div className="flex items-center justify-between" style={{ marginBottom: '1.25rem' }}>
              <div className="flex items-center gap-2.5">
                <div style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: '#FEF3C7', color: '#B45309', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Key size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
                    Change Password
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#64748B' }}>
                    for {selectedStaff.name} ({selectedStaff.email})
                  </p>
                </div>
              </div>
              <button onClick={() => setShowPasswordModal(false)} style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">New Password *</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showPasswordText ? 'text' : 'password'} 
                    required 
                    placeholder="Enter new password"
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    className="form-input" 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordText(!showPasswordText)}
                    style={{ position: 'absolute', right: 12, top: 12, background: 'none', border: 'none', color: '#64748B', cursor: 'pointer' }}
                  >
                    {showPasswordText ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Confirm New Password (Optional)</label>
                <input 
                  type={showPasswordText ? 'text' : 'password'} 
                  placeholder="Re-enter to confirm"
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  className="form-input" 
                />
              </div>

              <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem 1rem', borderRadius: 10, fontSize: '0.78rem', color: '#64748B' }}>
                The user can immediately log in using their new password.
              </div>

              <div className="flex justify-end gap-2.5" style={{ marginTop: '0.5rem' }}>
                <button 
                  type="button" 
                  onClick={() => setShowPasswordModal(false)} 
                  className="btn-outline-gray" 
                  style={{ borderRadius: 10 }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-green" 
                  style={{ borderRadius: 10, padding: '0.65rem 1.5rem' }}
                >
                  Save New Password
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* MODAL 3: EDIT STAFF PROFILE */}
      {showEditStaffModal && selectedStaff && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.75)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', backdropFilter: 'blur(4px)' }}>
          <div className="card" style={{ maxWidth: 480, width: '100%', backgroundColor: '#FFFFFF', borderRadius: 24, padding: '2rem' }}>
            
            <div className="flex items-center justify-between" style={{ marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
                Edit Staff Member
              </h3>
              <button onClick={() => setShowEditStaffModal(false)} style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Full Name *</label>
                <input 
                  type="text" 
                  required 
                  value={editName} 
                  onChange={(e) => setEditName(e.target.value)} 
                  className="form-input" 
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Phone Number *</label>
                <input 
                  type="tel" 
                  required 
                  value={editPhone} 
                  onChange={(e) => setEditPhone(e.target.value)} 
                  className="form-input" 
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Assigned Role *</label>
                <select 
                  value={editRole} 
                  onChange={(e) => setEditRole(e.target.value as UserRole)} 
                  className="form-select"
                >
                  {roles.map(r => (
                    <option key={r.roleKey} value={r.roleKey}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>

              <ImageUploadInput
                label="Profile Photo (Optional)"
                value={editAvatar}
                onChange={(newVal) => setEditAvatar(newVal)}
                placeholder="https://images.unsplash.com/..."
                helpText="Upload a portrait photo from your computer/device or enter an image URL"
              />

              <div className="flex justify-end gap-2.5" style={{ marginTop: '0.75rem' }}>
                <button 
                  type="button" 
                  onClick={() => setShowEditStaffModal(false)} 
                  className="btn-outline-gray" 
                  style={{ borderRadius: 10 }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-green" 
                  style={{ borderRadius: 10, padding: '0.65rem 1.5rem' }}
                >
                  Save Changes
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* MODAL 4: CREATE CUSTOM ROLE */}
      {showAddRoleModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.75)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', backdropFilter: 'blur(4px)' }}>
          <div className="card" style={{ maxWidth: 540, width: '100%', backgroundColor: '#FFFFFF', borderRadius: 24, padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
            
            <div className="flex items-center justify-between" style={{ marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A' }}>
                  Create New Role
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#64748B' }}>
                  Define custom access privileges for your agency staff.
                </p>
              </div>
              <button onClick={() => setShowAddRoleModal(false)} style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddRoleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Role Title / Name *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Legal & Title Auditor" 
                  value={newRoleName} 
                  onChange={(e) => setNewRoleName(e.target.value)} 
                  className="form-input" 
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Role Description</label>
                <textarea 
                  rows={2}
                  placeholder="Summarize responsibilities and scope..." 
                  value={newRoleDesc} 
                  onChange={(e) => setNewRoleDesc(e.target.value)} 
                  className="form-textarea" 
                />
              </div>

              {/* Granular Permission Checkboxes */}
              <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1rem' }}>
                <label className="form-label" style={{ marginBottom: '0.75rem' }}>
                  Granular Permissions & Feature Access:
                </label>

                <div className="flex flex-col gap-2.5">
                  <label className="flex items-center gap-2" style={{ fontSize: '0.88rem', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={newRolePermissions.viewLeads} 
                      onChange={(e) => setNewRolePermissions(prev => ({ ...prev, viewLeads: e.target.checked }))} 
                      style={{ accentColor: '#386635', width: 16, height: 16 }}
                    />
                    <span>View Customer Inquiries & Pipeline</span>
                  </label>

                  <label className="flex items-center gap-2" style={{ fontSize: '0.88rem', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={newRolePermissions.editLeads} 
                      onChange={(e) => setNewRolePermissions(prev => ({ ...prev, editLeads: e.target.checked }))} 
                      style={{ accentColor: '#386635', width: 16, height: 16 }}
                    />
                    <span>Edit Leads, Log Calls & Schedule Visits</span>
                  </label>

                  <label className="flex items-center gap-2" style={{ fontSize: '0.88rem', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={newRolePermissions.manageProperties} 
                      onChange={(e) => setNewRolePermissions(prev => ({ ...prev, manageProperties: e.target.checked }))} 
                      style={{ accentColor: '#386635', width: 16, height: 16 }}
                    />
                    <span>Manage & Add Property Listings</span>
                  </label>

                  <label className="flex items-center gap-2" style={{ fontSize: '0.88rem', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={newRolePermissions.viewFinances} 
                      onChange={(e) => setNewRolePermissions(prev => ({ ...prev, viewFinances: e.target.checked }))} 
                      style={{ accentColor: '#386635', width: 16, height: 16 }}
                    />
                    <span>View Deals, Commissions & Revenue Reports</span>
                  </label>

                  <label className="flex items-center gap-2" style={{ fontSize: '0.88rem', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={newRolePermissions.editCMS} 
                      onChange={(e) => setNewRolePermissions(prev => ({ ...prev, editCMS: e.target.checked }))} 
                      style={{ accentColor: '#386635', width: 16, height: 16 }}
                    />
                    <span>Edit Website Content & Banners</span>
                  </label>

                  <label className="flex items-center gap-2" style={{ fontSize: '0.88rem', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={newRolePermissions.deleteLeads} 
                      onChange={(e) => setNewRolePermissions(prev => ({ ...prev, deleteLeads: e.target.checked }))} 
                      style={{ accentColor: '#386635', width: 16, height: 16 }}
                    />
                    <span>Delete Inquiries & Inventory Records</span>
                  </label>

                  <label className="flex items-center gap-2" style={{ fontSize: '0.88rem', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={newRolePermissions.manageStaff} 
                      onChange={(e) => setNewRolePermissions(prev => ({ ...prev, manageStaff: e.target.checked }))} 
                      style={{ accentColor: '#386635', width: 16, height: 16 }}
                    />
                    <span>Manage Staff Accounts & Reset Passwords</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2.5" style={{ marginTop: '0.75rem' }}>
                <button 
                  type="button" 
                  onClick={() => setShowAddRoleModal(false)} 
                  className="btn-outline-gray" 
                  style={{ borderRadius: 10 }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-green" 
                  style={{ borderRadius: 10, padding: '0.65rem 1.5rem' }}
                >
                  Create Role
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* MODAL 5: DELETE STAFF CONFIRMATION */}
      {showDeleteConfirmModal && selectedStaff && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.75)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', backdropFilter: 'blur(4px)' }}>
          <div className="card" style={{ maxWidth: 440, width: '100%', backgroundColor: '#FFFFFF', borderRadius: 24, padding: '2rem', textAlign: 'center' }}>
            
            <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: '#FEE2E2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <AlertTriangle size={28} />
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
              Remove Staff Account?
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.5, marginBottom: '1.75rem' }}>
              Are you sure you want to remove <strong>{selectedStaff.name}</strong> (<code>{selectedStaff.email}</code>)? They will no longer be able to log in to the CRM.
            </p>

            <div className="flex justify-center gap-3">
              <button 
                type="button" 
                onClick={() => setShowDeleteConfirmModal(false)} 
                className="btn-outline-gray" 
                style={{ borderRadius: 10, padding: '0.65rem 1.25rem' }}
              >
                Cancel
              </button>
              <button 
                type="button" 
                onClick={handleConfirmDelete} 
                className="btn" 
                style={{ backgroundColor: '#DC2626', color: '#FFFFFF', borderRadius: 10, padding: '0.65rem 1.5rem', fontWeight: 700 }}
              >
                Yes, Remove Staff
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
