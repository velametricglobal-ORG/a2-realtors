import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { BookOpen, Calendar, User, Eye, ArrowRight, X } from 'lucide-react';
import { BlogPost } from '../../types';

export const InsightsPage: React.FC = () => {
  const { blogPosts } = useStore();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div style={{ backgroundColor: '#F8FAFC', paddingBottom: '6rem' }}>
      <div style={{ backgroundColor: '#0F172A', color: '#FFFFFF', padding: '4.5rem 0', textAlign: 'center' }}>
        <div className="container">
          <div className="badge badge-featured" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            📰 Dehradun Property Market Intelligence
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Real Estate Insights & Guides</h1>
          <p style={{ color: '#CBD5E1', maxWidth: 640, margin: '0.5rem auto 0 auto' }}>
            Expert analysis on property market trends, legal buying guides, plot regulations, and neighborhood spotlights.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '3rem' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {blogPosts.map(post => (
            <div key={post.id} className="card" style={{ backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
              <img src={post.coverImage} alt={post.title} style={{ width: '100%', height: 240, objectFit: 'cover' }} />
              <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <span className="badge badge-verified" style={{ marginBottom: '0.5rem', alignSelf: 'start' }}>{post.category}</span>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0F172A', lineHeight: 1.3, marginBottom: '0.75rem' }}>
                  {post.title}
                </h2>
                <p style={{ color: '#64748B', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between" style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #F1F5F9', fontSize: '0.82rem', color: '#94A3B8' }}>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><User size={13} /> {post.author}</span>
                    <span className="flex items-center gap-1"><Calendar size={13} /> {post.createdAt}</span>
                  </div>
                  <button onClick={() => setSelectedPost(post)} className="btn btn-outline btn-sm flex items-center gap-1" style={{ color: '#D97706', borderColor: '#D97706' }}>
                    Read Article <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Drawer / Modal */}
      {selectedPost && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div className="card" style={{ maxWidth: 780, width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '2.5rem', backgroundColor: '#FFFFFF', borderRadius: 20, position: 'relative' }}>
            <button
              onClick={() => setSelectedPost(null)}
              style={{ position: 'absolute', top: 20, right: 20, width: 34, height: 34, borderRadius: '50%', backgroundColor: '#F1F5F9', color: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={18} />
            </button>

            <span className="badge badge-featured" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>{selectedPost.category}</span>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.75rem', lineHeight: 1.25 }}>
              {selectedPost.title}
            </h1>
            <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.5rem' }}>
              By {selectedPost.author} • Published {selectedPost.createdAt}
            </div>

            <img src={selectedPost.coverImage} alt={selectedPost.title} style={{ width: '100%', height: 300, objectFit: 'cover', borderRadius: 12, marginBottom: '1.5rem' }} />

            <div style={{ fontSize: '1rem', lineHeight: 1.8, color: '#334155', whiteSpace: 'pre-line' }}>
              {selectedPost.content}
            </div>

            <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #E2E8F0', textAlign: 'center' }}>
              <button onClick={() => setSelectedPost(null)} className="btn btn-primary">
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
