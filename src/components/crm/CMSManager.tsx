import React, { useState } from 'react';
import { 
  FileText, Plus, CheckCircle2, Edit, Trash2, Eye, MapPin, 
  Building2, Sparkles, X, Check, Globe, Layers, BookOpen
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { BlogPost, ConstructionProject, LocationInfo } from '../../types';

export const CMSManager: React.FC = () => {
  const { 
    blogPosts, addBlogPost, updateBlogPost, deleteBlogPost, 
    projects, addProject, updateProject, deleteProject,
    locations, addLocation, updateLocation, deleteLocation,
    activeUser
  } = useStore();

  const [activeTab, setActiveTab] = useState<'BLOG' | 'PROJECTS' | 'LOCALITIES'>('BLOG');
  const [successNotice, setSuccessNotice] = useState('');

  // Modals for Blogs
  const [showAddBlogModal, setShowAddBlogModal] = useState(false);
  const [showEditBlogModal, setShowEditBlogModal] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);

  // Modals for Projects
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [showEditProjectModal, setShowEditProjectModal] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  // Modals for Localities
  const [showAddLocalityModal, setShowAddLocalityModal] = useState(false);
  const [showEditLocalityModal, setShowEditLocalityModal] = useState(false);
  const [editingLocalityId, setEditingLocalityId] = useState<string | null>(null);

  // Blog Form States
  const [blogTitle, setBlogTitle] = useState('');
  const [blogCategory, setBlogCategory] = useState('Dehradun Real Estate');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogImage, setBlogImage] = useState('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000');
  const [blogPublished, setBlogPublished] = useState(true);

  // Project Form States
  const [projTitle, setProjTitle] = useState('');
  const [projCategory, setProjCategory] = useState('Residential');
  const [projLocation, setProjLocation] = useState('Rajpur Road, Dehradun');
  const [projYear, setProjYear] = useState<number>(2024);
  const [projStatus, setProjStatus] = useState('Completed');
  const [projImage, setProjImage] = useState('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1000');
  const [projDescription, setProjDescription] = useState('');
  const [projScope, setProjScope] = useState('Turnkey Architectural Design & Construction');

  // Locality Form States
  const [locName, setLocName] = useState('');
  const [locSlug, setLocSlug] = useState('');
  const [locImage, setLocImage] = useState('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800');
  const [locPrice, setLocPrice] = useState<number>(7500);
  const [locDesc, setLocDesc] = useState('');
  const [locHighlights, setLocHighlights] = useState('MDDA Approved, Scenic Views, Premium Connectivity');

  const showNotification = (msg: string) => {
    setSuccessNotice(msg);
    setTimeout(() => setSuccessNotice(''), 4000);
  };

  // BLOG HANDLERS
  const openEditBlog = (post: BlogPost) => {
    setEditingBlogId(post.id);
    setBlogTitle(post.title);
    setBlogCategory(post.category);
    setBlogExcerpt(post.excerpt || '');
    setBlogContent(post.content || '');
    setBlogImage(post.coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000');
    setBlogPublished(post.published !== false);
    setShowEditBlogModal(true);
  };

  const handleAddBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle || !blogContent) return;

    addBlogPost({
      title: blogTitle,
      category: blogCategory,
      excerpt: blogExcerpt,
      content: blogContent,
      coverImage: blogImage,
      published: blogPublished,
      author: activeUser.name
    });

    setShowAddBlogModal(false);
    showNotification(`Article "${blogTitle}" published live to the public Insights page!`);
    setBlogTitle('');
    setBlogExcerpt('');
    setBlogContent('');
  };

  const handleUpdateBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlogId || !blogTitle || !blogContent) return;

    updateBlogPost(editingBlogId, {
      title: blogTitle,
      category: blogCategory,
      excerpt: blogExcerpt,
      content: blogContent,
      coverImage: blogImage,
      published: blogPublished
    });

    setShowEditBlogModal(false);
    showNotification(`Article "${blogTitle}" updated successfully!`);
  };

  const handleDeleteBlog = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete article "${title}"?`)) {
      deleteBlogPost(id);
      showNotification(`Article "${title}" deleted.`);
    }
  };

  // PROJECT HANDLERS
  const openEditProject = (proj: ConstructionProject) => {
    setEditingProjectId(proj.id);
    setProjTitle(proj.title);
    setProjCategory(proj.category);
    setProjLocation(proj.location);
    setProjYear(proj.completionYear || 2024);
    setProjStatus(proj.status || 'Completed');
    setProjImage(proj.imageUrl || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1000');
    setProjDescription(proj.description || '');
    setProjScope(proj.scope || 'Turnkey Execution');
    setShowEditProjectModal(true);
  };

  const handleAddProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle) return;

    addProject({
      title: projTitle,
      category: projCategory,
      location: projLocation,
      completionYear: projYear,
      status: projStatus,
      imageUrl: projImage,
      description: projDescription,
      scope: projScope
    });

    setShowAddProjectModal(false);
    showNotification(`Project "${projTitle}" published live to the public Projects page!`);
    setProjTitle('');
    setProjDescription('');
  };

  const handleUpdateProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProjectId || !projTitle) return;

    updateProject(editingProjectId, {
      title: projTitle,
      category: projCategory,
      location: projLocation,
      completionYear: projYear,
      status: projStatus,
      imageUrl: projImage,
      description: projDescription,
      scope: projScope
    });

    setShowEditProjectModal(false);
    showNotification(`Project "${projTitle}" updated successfully!`);
  };

  const handleDeleteProject = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete project "${title}"?`)) {
      deleteProject(id);
      showNotification(`Project "${title}" deleted.`);
    }
  };

  // LOCALITY HANDLERS
  const openEditLocality = (loc: LocationInfo) => {
    setEditingLocalityId(loc.id);
    setLocName(loc.name);
    setLocSlug(loc.slug || loc.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
    setLocImage(loc.coverImage || '');
    setLocPrice(loc.avgPricePerSqft || 6500);
    setLocDesc(loc.description || '');
    setLocHighlights((loc.highlights || []).join(', '));
    setShowEditLocalityModal(true);
  };

  const handleAddLocalitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!locName) return;

    const highlightsArr = locHighlights.split(',').map(h => h.trim()).filter(Boolean);
    addLocation({
      name: locName,
      slug: locSlug || locName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      coverImage: locImage,
      avgPricePerSqft: locPrice,
      description: locDesc,
      highlights: highlightsArr
    });

    setShowAddLocalityModal(false);
    showNotification(`Locality "${locName}" added live!`);
    setLocName('');
    setLocDesc('');
  };

  const handleUpdateLocalitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLocalityId || !locName) return;

    const highlightsArr = locHighlights.split(',').map(h => h.trim()).filter(Boolean);
    updateLocation(editingLocalityId, {
      name: locName,
      slug: locSlug || locName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      coverImage: locImage,
      avgPricePerSqft: locPrice,
      description: locDesc,
      highlights: highlightsArr
    });

    setShowEditLocalityModal(false);
    showNotification(`Locality "${locName}" updated successfully!`);
  };

  const handleDeleteLocality = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete locality "${name}"?`)) {
      deleteLocation(id);
      showNotification(`Locality "${name}" deleted.`);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A' }}>Website CMS & Content Hub</h1>
          <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
            Publish and manage blog articles, construction case studies, and Dehradun locality guides live.
          </p>
        </div>

        <div className="flex gap-2">
          {activeTab === 'BLOG' && (
            <button 
              onClick={() => { setBlogTitle(''); setBlogExcerpt(''); setBlogContent(''); setShowAddBlogModal(true); }} 
              className="btn btn-primary btn-sm flex items-center gap-1.5"
              style={{ backgroundColor: '#386635', fontWeight: 700 }}
            >
              <Plus size={16} /> Publish New Article
            </button>
          )}

          {activeTab === 'PROJECTS' && (
            <button 
              onClick={() => { setProjTitle(''); setProjDescription(''); setShowAddProjectModal(true); }} 
              className="btn btn-primary btn-sm flex items-center gap-1.5"
              style={{ backgroundColor: '#386635', fontWeight: 700 }}
            >
              <Plus size={16} /> Add Construction Project
            </button>
          )}

          {activeTab === 'LOCALITIES' && (
            <button 
              onClick={() => { setLocName(''); setLocDesc(''); setShowAddLocalityModal(true); }} 
              className="btn btn-primary btn-sm flex items-center gap-1.5"
              style={{ backgroundColor: '#386635', fontWeight: 700 }}
            >
              <Plus size={16} /> Add Locality Guide
            </button>
          )}
        </div>
      </div>

      {/* Success Notification Alert */}
      {successNotice && (
        <div style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '0.9rem 1.25rem', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10, border: '1px solid #A7F3D0', fontWeight: 600, fontSize: '0.9rem' }}>
          <CheckCircle2 size={20} />
          <span>{successNotice}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="card" style={{ padding: '0.85rem 1.25rem', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('BLOG')}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: 8,
              fontSize: '0.85rem',
              fontWeight: 700,
              backgroundColor: activeTab === 'BLOG' ? '#386635' : '#F1F5F9',
              color: activeTab === 'BLOG' ? '#FFFFFF' : '#475569',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            📰 Articles & News ({blogPosts.length})
          </button>

          <button
            onClick={() => setActiveTab('PROJECTS')}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: 8,
              fontSize: '0.85rem',
              fontWeight: 700,
              backgroundColor: activeTab === 'PROJECTS' ? '#386635' : '#F1F5F9',
              color: activeTab === 'PROJECTS' ? '#FFFFFF' : '#475569',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            🏗️ Projects Portfolio ({projects.length})
          </button>

          <button
            onClick={() => setActiveTab('LOCALITIES')}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: 8,
              fontSize: '0.85rem',
              fontWeight: 700,
              backgroundColor: activeTab === 'LOCALITIES' ? '#386635' : '#F1F5F9',
              color: activeTab === 'LOCALITIES' ? '#FFFFFF' : '#475569',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            📍 Locality Hubs ({locations.length})
          </button>
        </div>
      </div>

      {/* 1. BLOG ARTICLES TAB */}
      {activeTab === 'BLOG' && (
        <div className="card" style={{ backgroundColor: '#FFFFFF', overflow: 'hidden', border: '1px solid #E2E8F0' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', color: '#475569', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '0.85rem 1rem' }}>Article</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Category</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Author & Date</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Visibility</th>
                  <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogPosts.map(post => (
                  <tr key={post.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    
                    <td style={{ padding: '1rem', minWidth: 280 }}>
                      <div className="flex items-center gap-3">
                        <img 
                          src={post.coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=200'} 
                          alt={post.title} 
                          style={{ width: 50, height: 50, borderRadius: 8, objectFit: 'cover', flexShrink: 0, border: '1px solid #E2E8F0' }}
                        />
                        <div>
                          <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.92rem', lineHeight: 1.3 }}>{post.title}</div>
                          <div style={{ fontSize: '0.78rem', color: '#64748B', maxWidth: 300, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{post.excerpt}</div>
                        </div>
                      </div>
                    </td>

                    <td style={{ padding: '1rem' }}>
                      <span className="badge badge-verified">{post.category}</span>
                    </td>

                    <td style={{ padding: '1rem', color: '#475569', fontSize: '0.82rem' }}>
                      <div><strong>{post.author}</strong></div>
                      <div style={{ color: '#94A3B8' }}>{post.createdAt}</div>
                    </td>

                    <td style={{ padding: '1rem' }}>
                      <span style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: 4, 
                        padding: '0.2rem 0.6rem', 
                        borderRadius: 14, 
                        fontSize: '0.75rem', 
                        fontWeight: 700, 
                        backgroundColor: post.published !== false ? '#EBF4EC' : '#F1F5F9',
                        color: post.published !== false ? '#386635' : '#64748B'
                      }}>
                        {post.published !== false ? <Check size={12} /> : <X size={12} />}
                        {post.published !== false ? 'Published Live' : 'Draft'}
                      </span>
                    </td>

                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <div className="flex items-center justify-end gap-2">
                        <a 
                          href="/insights" 
                          target="_blank" 
                          rel="noreferrer" 
                          className="btn btn-outline btn-sm" 
                          style={{ padding: '0.35rem 0.65rem', color: '#386635', borderColor: '#386635' }}
                          title="View on Insights Page"
                        >
                          <Eye size={14} />
                        </a>
                        <button 
                          onClick={() => openEditBlog(post)} 
                          className="btn btn-outline btn-sm" 
                          style={{ padding: '0.35rem 0.65rem', color: '#0F172A', borderColor: '#CBD5E1' }}
                          title="Edit Article"
                        >
                          <Edit size={14} />
                        </button>
                        <button 
                          onClick={() => handleDeleteBlog(post.id, post.title)} 
                          className="btn btn-outline btn-sm" 
                          style={{ padding: '0.35rem 0.65rem', color: '#EF4444', borderColor: '#FCA5A5' }}
                          title="Delete Article"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. PROJECTS PORTFOLIO TAB */}
      {activeTab === 'PROJECTS' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map(proj => (
            <div key={proj.id} className="card" style={{ padding: '1.25rem', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 14, display: 'flex', flexDirection: 'column' }}>
              <img 
                src={proj.imageUrl} 
                alt={proj.title} 
                style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 10, marginBottom: '1rem' }} 
              />
              
              <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
                <span className="badge badge-verified">{proj.category}</span>
                <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>Completed {proj.completionYear}</span>
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: 4 }}>{proj.title}</h3>
              <div style={{ fontSize: '0.82rem', color: '#386635', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
                <MapPin size={13} /> {proj.location}
              </div>

              <p style={{ fontSize: '0.88rem', color: '#64748B', lineHeight: 1.6, marginBottom: '1rem', flexGrow: 1 }}>
                {proj.description}
              </p>

              <div style={{ backgroundColor: '#F8FAFC', padding: '0.65rem 0.9rem', borderRadius: 8, fontSize: '0.8rem', color: '#334155', marginBottom: '1rem', border: '1px solid #F1F5F9' }}>
                <strong>Scope:</strong> {proj.scope}
              </div>

              <div className="flex items-center justify-between" style={{ borderTop: '1px solid #F1F5F9', paddingTop: '0.75rem' }}>
                <a 
                  href="/projects" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn btn-outline btn-sm flex items-center gap-1"
                  style={{ color: '#386635', borderColor: '#386635' }}
                >
                  <Eye size={14} /> View Live
                </a>

                <div className="flex gap-2">
                  <button 
                    onClick={() => openEditProject(proj)} 
                    className="btn btn-outline btn-sm" 
                    style={{ color: '#0F172A', borderColor: '#CBD5E1' }}
                  >
                    <Edit size={14} /> Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteProject(proj.id, proj.title)} 
                    className="btn btn-outline btn-sm" 
                    style={{ color: '#EF4444', borderColor: '#FCA5A5' }}
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. LOCALITIES TAB */}
      {activeTab === 'LOCALITIES' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map(loc => (
            <div key={loc.id} className="card" style={{ padding: '1.25rem', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 14, display: 'flex', flexDirection: 'column' }}>
              <img 
                src={loc.coverImage} 
                alt={loc.name} 
                style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 10, marginBottom: '1rem' }} 
              />
              
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: 2 }}>{loc.name}</h3>
              <div style={{ fontSize: '0.85rem', color: '#386635', fontWeight: 700, marginBottom: '0.75rem' }}>
                Avg Rate: ₹{loc.avgPricePerSqft.toLocaleString('en-IN')}/sq.ft
              </div>

              <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.5, marginBottom: '1rem', flexGrow: 1 }}>
                {loc.description}
              </p>

              <div className="flex items-center justify-between" style={{ borderTop: '1px solid #F1F5F9', paddingTop: '0.75rem' }}>
                <a 
                  href={`/properties/dehradun/${loc.slug || loc.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn btn-outline btn-sm flex items-center gap-1"
                  style={{ color: '#386635', borderColor: '#386635' }}
                >
                  <Eye size={14} /> View Page
                </a>

                <div className="flex gap-2">
                  <button 
                    onClick={() => openEditLocality(loc)} 
                    className="btn btn-outline btn-sm" 
                    style={{ color: '#0F172A', borderColor: '#CBD5E1' }}
                  >
                    <Edit size={14} /> Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteLocality(loc.id, loc.name)} 
                    className="btn btn-outline btn-sm" 
                    style={{ color: '#EF4444', borderColor: '#FCA5A5' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD BLOG MODAL */}
      {showAddBlogModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(4px)' }}>
          <div className="card" style={{ maxWidth: 640, width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: 16, position: 'relative' }}>
            <button onClick={() => setShowAddBlogModal(false)} style={{ position: 'absolute', top: 20, right: 20, background: '#F1F5F9', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <X size={16} />
            </button>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.25rem' }}>
              Publish Website Article
            </h3>

            <form onSubmit={handleAddBlogSubmit}>
              <div className="form-group">
                <label className="form-label">Article Title *</label>
                <input type="text" required value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} className="form-input" placeholder="e.g. Why Dalanwala Remains Dehradun's Premier Luxury Colony" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select value={blogCategory} onChange={(e) => setBlogCategory(e.target.value)} className="form-select">
                    <option value="Dehradun Real Estate">Dehradun Real Estate</option>
                    <option value="Buying Guide">Buying Guide</option>
                    <option value="Market Insights">Market Insights</option>
                    <option value="MDDA & Legal Regulations">MDDA & Legal Regulations</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Cover Image URL</label>
                  <input type="text" value={blogImage} onChange={(e) => setBlogImage(e.target.value)} className="form-input" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Short Excerpt (Summary for Cards)</label>
                <textarea rows={2} value={blogExcerpt} onChange={(e) => setBlogExcerpt(e.target.value)} className="form-textarea" placeholder="Brief 1-2 sentence preview..." />
              </div>

              <div className="form-group">
                <label className="form-label">Full Article Content *</label>
                <textarea rows={6} required value={blogContent} onChange={(e) => setBlogContent(e.target.value)} className="form-textarea" placeholder="Write full article analysis, tips, and insights..." />
              </div>

              <label className="flex items-center gap-2" style={{ cursor: 'pointer', fontWeight: 600, fontSize: '0.88rem', margin: '1rem 0' }}>
                <input type="checkbox" checked={blogPublished} onChange={(e) => setBlogPublished(e.target.checked)} style={{ width: 18, height: 18, accentColor: '#386635' }} />
                <span>Publish Immediately to Public Website</span>
              </label>

              <div className="flex gap-2">
                <button type="button" onClick={() => setShowAddBlogModal(false)} className="btn btn-outline flex-1">Cancel</button>
                <button type="submit" className="btn btn-primary flex-1" style={{ backgroundColor: '#386635', fontWeight: 700 }}>Publish Article</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT BLOG MODAL */}
      {showEditBlogModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(4px)' }}>
          <div className="card" style={{ maxWidth: 640, width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: 16, position: 'relative' }}>
            <button onClick={() => setShowEditBlogModal(false)} style={{ position: 'absolute', top: 20, right: 20, background: '#F1F5F9', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <X size={16} />
            </button>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.25rem' }}>
              Edit Website Article
            </h3>

            <form onSubmit={handleUpdateBlogSubmit}>
              <div className="form-group">
                <label className="form-label">Article Title *</label>
                <input type="text" required value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} className="form-input" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select value={blogCategory} onChange={(e) => setBlogCategory(e.target.value)} className="form-select">
                    <option value="Dehradun Real Estate">Dehradun Real Estate</option>
                    <option value="Buying Guide">Buying Guide</option>
                    <option value="Market Insights">Market Insights</option>
                    <option value="MDDA & Legal Regulations">MDDA & Legal Regulations</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Cover Image URL</label>
                  <input type="text" value={blogImage} onChange={(e) => setBlogImage(e.target.value)} className="form-input" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Short Excerpt</label>
                <textarea rows={2} value={blogExcerpt} onChange={(e) => setBlogExcerpt(e.target.value)} className="form-textarea" />
              </div>

              <div className="form-group">
                <label className="form-label">Full Article Content *</label>
                <textarea rows={6} required value={blogContent} onChange={(e) => setBlogContent(e.target.value)} className="form-textarea" />
              </div>

              <label className="flex items-center gap-2" style={{ cursor: 'pointer', fontWeight: 600, fontSize: '0.88rem', margin: '1rem 0' }}>
                <input type="checkbox" checked={blogPublished} onChange={(e) => setBlogPublished(e.target.checked)} style={{ width: 18, height: 18, accentColor: '#386635' }} />
                <span>Published to Public Website</span>
              </label>

              <div className="flex gap-2">
                <button type="button" onClick={() => setShowEditBlogModal(false)} className="btn btn-outline flex-1">Cancel</button>
                <button type="submit" className="btn btn-primary flex-1" style={{ backgroundColor: '#386635', fontWeight: 700 }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD PROJECT MODAL */}
      {showAddProjectModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(4px)' }}>
          <div className="card" style={{ maxWidth: 600, width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: 16, position: 'relative' }}>
            <button onClick={() => setShowAddProjectModal(false)} style={{ position: 'absolute', top: 20, right: 20, background: '#F1F5F9', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <X size={16} />
            </button>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.25rem' }}>
              Add Construction Case Study
            </h3>

            <form onSubmit={handleAddProjectSubmit}>
              <div className="form-group">
                <label className="form-label">Project Name *</label>
                <input type="text" required value={projTitle} onChange={(e) => setProjTitle(e.target.value)} className="form-input" placeholder="e.g. Royal Pine Villa & Landscape Build" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select value={projCategory} onChange={(e) => setProjCategory(e.target.value)} className="form-select">
                    <option value="Residential">Residential Villa</option>
                    <option value="Commercial">Commercial Complex</option>
                    <option value="Construction">Architectural Construction</option>
                    <option value="Renovation">Luxury Renovation</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Locality / Address</label>
                  <input type="text" value={projLocation} onChange={(e) => setProjLocation(e.target.value)} className="form-input" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Completion Year</label>
                  <input type="number" value={projYear} onChange={(e) => setProjYear(Number(e.target.value))} className="form-input" />
                </div>

                <div className="form-group">
                  <label className="form-label">Scope of Work</label>
                  <input type="text" value={projScope} onChange={(e) => setProjScope(e.target.value)} className="form-input" placeholder="e.g. Turnkey Architecture & Interior Fitouts" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Cover Image URL</label>
                <input type="text" value={projImage} onChange={(e) => setProjImage(e.target.value)} className="form-input" />
              </div>

              <div className="form-group">
                <label className="form-label">Project Description</label>
                <textarea rows={3} value={projDescription} onChange={(e) => setProjDescription(e.target.value)} className="form-textarea" />
              </div>

              <div className="flex gap-2">
                <button type="button" onClick={() => setShowAddProjectModal(false)} className="btn btn-outline flex-1">Cancel</button>
                <button type="submit" className="btn btn-primary flex-1" style={{ backgroundColor: '#386635', fontWeight: 700 }}>Add Project Live</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PROJECT MODAL */}
      {showEditProjectModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(4px)' }}>
          <div className="card" style={{ maxWidth: 600, width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: 16, position: 'relative' }}>
            <button onClick={() => setShowEditProjectModal(false)} style={{ position: 'absolute', top: 20, right: 20, background: '#F1F5F9', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <X size={16} />
            </button>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.25rem' }}>
              Edit Project Portfolio
            </h3>

            <form onSubmit={handleUpdateProjectSubmit}>
              <div className="form-group">
                <label className="form-label">Project Name *</label>
                <input type="text" required value={projTitle} onChange={(e) => setProjTitle(e.target.value)} className="form-input" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select value={projCategory} onChange={(e) => setProjCategory(e.target.value)} className="form-select">
                    <option value="Residential">Residential Villa</option>
                    <option value="Commercial">Commercial Complex</option>
                    <option value="Construction">Architectural Construction</option>
                    <option value="Renovation">Luxury Renovation</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Locality / Address</label>
                  <input type="text" value={projLocation} onChange={(e) => setProjLocation(e.target.value)} className="form-input" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Completion Year</label>
                  <input type="number" value={projYear} onChange={(e) => setProjYear(Number(e.target.value))} className="form-input" />
                </div>

                <div className="form-group">
                  <label className="form-label">Scope of Work</label>
                  <input type="text" value={projScope} onChange={(e) => setProjScope(e.target.value)} className="form-input" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Cover Image URL</label>
                <input type="text" value={projImage} onChange={(e) => setProjImage(e.target.value)} className="form-input" />
              </div>

              <div className="form-group">
                <label className="form-label">Project Description</label>
                <textarea rows={3} value={projDescription} onChange={(e) => setProjDescription(e.target.value)} className="form-textarea" />
              </div>

              <div className="flex gap-2">
                <button type="button" onClick={() => setShowEditProjectModal(false)} className="btn btn-outline flex-1">Cancel</button>
                <button type="submit" className="btn btn-primary flex-1" style={{ backgroundColor: '#386635', fontWeight: 700 }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD LOCALITY MODAL */}
      {showAddLocalityModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(4px)' }}>
          <div className="card" style={{ maxWidth: 600, width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: 16, position: 'relative' }}>
            <button onClick={() => setShowAddLocalityModal(false)} style={{ position: 'absolute', top: 20, right: 20, background: '#F1F5F9', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <X size={16} />
            </button>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.25rem' }}>
              Add New Locality Guide
            </h3>

            <form onSubmit={handleAddLocalitySubmit}>
              <div className="form-group">
                <label className="form-label">Locality Name *</label>
                <input type="text" required value={locName} onChange={(e) => { setLocName(e.target.value); setLocSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')); }} className="form-input" placeholder="e.g. Mussoorie Diversion Road" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">URL Slug</label>
                  <input type="text" value={locSlug} onChange={(e) => setLocSlug(e.target.value)} className="form-input" />
                </div>

                <div className="form-group">
                  <label className="form-label">Avg Rate (₹/sq.ft)</label>
                  <input type="number" value={locPrice} onChange={(e) => setLocPrice(Number(e.target.value))} className="form-input" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Cover Image URL</label>
                <input type="text" value={locImage} onChange={(e) => setLocImage(e.target.value)} className="form-input" />
              </div>

              <div className="form-group">
                <label className="form-label">Highlights (Comma-separated)</label>
                <input type="text" value={locHighlights} onChange={(e) => setLocHighlights(e.target.value)} className="form-input" />
              </div>

              <div className="form-group">
                <label className="form-label">Neighborhood Description</label>
                <textarea rows={3} value={locDesc} onChange={(e) => setLocDesc(e.target.value)} className="form-textarea" placeholder="Describe the connectivity, environment, and property opportunities..." />
              </div>

              <div className="flex gap-2">
                <button type="button" onClick={() => setShowAddLocalityModal(false)} className="btn btn-outline flex-1">Cancel</button>
                <button type="submit" className="btn btn-primary flex-1" style={{ backgroundColor: '#386635', fontWeight: 700 }}>Add Locality</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT LOCALITY MODAL */}
      {showEditLocalityModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(4px)' }}>
          <div className="card" style={{ maxWidth: 600, width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: 16, position: 'relative' }}>
            <button onClick={() => setShowEditLocalityModal(false)} style={{ position: 'absolute', top: 20, right: 20, background: '#F1F5F9', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <X size={16} />
            </button>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.25rem' }}>
              Edit Locality Guide
            </h3>

            <form onSubmit={handleUpdateLocalitySubmit}>
              <div className="form-group">
                <label className="form-label">Locality Name *</label>
                <input type="text" required value={locName} onChange={(e) => setLocName(e.target.value)} className="form-input" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">URL Slug</label>
                  <input type="text" value={locSlug} onChange={(e) => setLocSlug(e.target.value)} className="form-input" />
                </div>

                <div className="form-group">
                  <label className="form-label">Avg Rate (₹/sq.ft)</label>
                  <input type="number" value={locPrice} onChange={(e) => setLocPrice(Number(e.target.value))} className="form-input" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Cover Image URL</label>
                <input type="text" value={locImage} onChange={(e) => setLocImage(e.target.value)} className="form-input" />
              </div>

              <div className="form-group">
                <label className="form-label">Highlights (Comma-separated)</label>
                <input type="text" value={locHighlights} onChange={(e) => setLocHighlights(e.target.value)} className="form-input" />
              </div>

              <div className="form-group">
                <label className="form-label">Neighborhood Description</label>
                <textarea rows={3} value={locDesc} onChange={(e) => setLocDesc(e.target.value)} className="form-textarea" />
              </div>

              <div className="flex gap-2">
                <button type="button" onClick={() => setShowEditLocalityModal(false)} className="btn btn-outline flex-1">Cancel</button>
                <button type="submit" className="btn btn-primary flex-1" style={{ backgroundColor: '#386635', fontWeight: 700 }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
