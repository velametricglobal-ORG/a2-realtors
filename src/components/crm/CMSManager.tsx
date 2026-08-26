import React, { useState } from 'react';
import { FileText, Plus, CheckCircle2, Edit } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const CMSManager: React.FC = () => {
  const { blogPosts, addBlogPost, projects, addProject } = useStore();

  const [activeTab, setActiveTab] = useState<'BLOG' | 'PROJECTS'>('BLOG');
  const [showAddBlogModal, setShowAddBlogModal] = useState(false);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Dehradun Real Estate');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');

  const handleAddBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    addBlogPost({
      title,
      category,
      excerpt,
      content,
      coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000'
    });
    setShowAddBlogModal(false);
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A' }}>Website CMS Manager</h1>
          <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
            Manage public website blog articles, construction case studies, hero taglines, and disclaimers.
          </p>
        </div>

        <button onClick={() => setShowAddBlogModal(true)} className="btn btn-primary btn-sm flex items-center gap-1">
          <Plus size={16} /> Add Blog Article
        </button>
      </div>

      {/* Tabs */}
      <div className="card" style={{ padding: '0.85rem 1.25rem', backgroundColor: '#FFFFFF' }}>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('BLOG')}
            style={{
              padding: '0.4rem 1rem',
              borderRadius: 6,
              fontSize: '0.85rem',
              fontWeight: 700,
              backgroundColor: activeTab === 'BLOG' ? '#0F172A' : '#F1F5F9',
              color: activeTab === 'BLOG' ? '#FFFFFF' : '#475569',
              cursor: 'pointer'
            }}
          >
            Blog & Insights ({blogPosts.length})
          </button>
          <button
            onClick={() => setActiveTab('PROJECTS')}
            style={{
              padding: '0.4rem 1rem',
              borderRadius: 6,
              fontSize: '0.85rem',
              fontWeight: 700,
              backgroundColor: activeTab === 'PROJECTS' ? '#0F172A' : '#F1F5F9',
              color: activeTab === 'PROJECTS' ? '#FFFFFF' : '#475569',
              cursor: 'pointer'
            }}
          >
            Projects Portfolio ({projects.length})
          </button>
        </div>
      </div>

      {/* CMS CONTENT TABLE */}
      {activeTab === 'BLOG' ? (
        <div className="card" style={{ backgroundColor: '#FFFFFF', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', color: '#475569', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '0.85rem 1rem' }}>Article Title</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Category</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Author</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Views</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Published</th>
                </tr>
              </thead>
              <tbody>
                {blogPosts.map(post => (
                  <tr key={post.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '1rem', fontWeight: 700, color: '#0F172A' }}>{post.title}</td>
                    <td style={{ padding: '1rem' }}><span className="badge badge-verified">{post.category}</span></td>
                    <td style={{ padding: '1rem', color: '#475569' }}>{post.author}</td>
                    <td style={{ padding: '1rem', color: '#64748B' }}>👁️ {post.views}</td>
                    <td style={{ padding: '1rem' }}><span className="badge badge-featured">Published</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map(proj => (
            <div key={proj.id} className="card" style={{ padding: '1.25rem', backgroundColor: '#FFFFFF' }}>
              <h3 style={{ fontWeight: 700, color: '#0F172A' }}>{proj.title}</h3>
              <div style={{ fontSize: '0.8rem', color: '#D97706', marginBottom: 4 }}>📍 {proj.location}</div>
              <p style={{ fontSize: '0.85rem', color: '#64748B' }}>{proj.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* ADD BLOG MODAL */}
      {showAddBlogModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="card" style={{ maxWidth: 540, width: '100%', padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: 16 }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.25rem' }}>
              Publish Website Article
            </h3>

            <form onSubmit={handleAddBlogSubmit}>
              <div className="form-group">
                <label className="form-label">Article Title *</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="form-input" placeholder="e.g. Why Dalanwala Remains Dehradun's Premier Colony" />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-select">
                  <option value="Dehradun Real Estate">Dehradun Real Estate</option>
                  <option value="Buying Guide">Buying Guide</option>
                  <option value="Market Insights">Market Insights</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Short Excerpt</label>
                <textarea rows={2} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="form-textarea" />
              </div>
              <div className="form-group">
                <label className="form-label">Full Article Content</label>
                <textarea rows={4} required value={content} onChange={(e) => setContent(e.target.value)} className="form-textarea" />
              </div>

              <div className="flex gap-2" style={{ marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setShowAddBlogModal(false)} className="btn btn-outline flex-1">Cancel</button>
                <button type="submit" className="btn btn-primary flex-1">Publish</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
