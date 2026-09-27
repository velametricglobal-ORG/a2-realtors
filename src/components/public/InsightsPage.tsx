import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { BookOpen, Calendar, User, Eye, ArrowRight, X } from 'lucide-react';
import { BlogPost } from '../../types';

export const InsightsPage: React.FC = () => {
  const { blogPosts } = useStore();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div style={{ backgroundColor: '#F8FAFC', paddingBottom: '6rem' }}>
      <div style={{ backgroundColor: '#0B1120', color: '#FFFFFF', padding: '6rem 0 5rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 840 }}>
          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            Real Estate Insights & Guides
          </h1>
          <p style={{ color: '#94A3B8', maxWidth: 640, margin: '1rem auto 0 auto', fontSize: '1.15rem', lineHeight: 1.7 }}>
            Expert analysis on property market trends, legal buying guides, plot regulations, and neighborhood spotlights.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '4rem' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {blogPosts.map(post => (
            <div key={post.id} className="card-luxury flex flex-col" style={{ backgroundColor: '#FFFFFF', borderRadius: 20, overflow: 'hidden' }}>
              <img src={post.coverImage} alt={post.title} style={{ width: '100%', height: 250, objectFit: 'cover' }} />
              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#386635', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.6rem' }}>
                  {post.category}
                </span>
                <h2 
                  style={{ 
                    fontSize: '1.35rem', 
                    fontWeight: 800, 
                    color: '#0F172A', 
                    lineHeight: 1.35, 
                    marginBottom: '0.75rem',
                    minHeight: '3.6rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {post.title}
                </h2>
                <p 
                  style={{ 
                    color: '#64748B', 
                    fontSize: '0.92rem', 
                    lineHeight: 1.65, 
                    marginBottom: '1.5rem',
                    minHeight: '4.5rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between" style={{ marginTop: 'auto', paddingTop: '1.25rem', borderTop: '1px solid #F1F5F9', fontSize: '0.85rem', color: '#94A3B8' }}>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5"><User size={14} style={{ color: '#386635' }} /> {post.author}</span>
                    <span className="flex items-center gap-1.5"><Calendar size={14} style={{ color: '#386635' }} /> {post.createdAt}</span>
                  </div>
                  <button onClick={() => setSelectedPost(post)} className="btn-outline-green btn-sm flex items-center gap-1">
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
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', backdropFilter: 'blur(6px)' }}>
          <div className="card" style={{ maxWidth: 780, width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '2.5rem', backgroundColor: '#FFFFFF', borderRadius: 20, position: 'relative' }}>
            <button
              onClick={() => setSelectedPost(null)}
              style={{ position: 'absolute', top: 20, right: 20, width: 34, height: 34, borderRadius: '50%', backgroundColor: '#F1F5F9', color: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={18} />
            </button>

            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#386635', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', display: 'inline-block' }}>
              {selectedPost.category}
            </span>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.75rem', lineHeight: 1.25 }}>
              {selectedPost.title}
            </h1>
            <div style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '1.5rem' }}>
              By {selectedPost.author} • Published {selectedPost.createdAt}
            </div>

            <img src={selectedPost.coverImage} alt={selectedPost.title} style={{ width: '100%', height: 320, objectFit: 'cover', borderRadius: 14, marginBottom: '1.5rem' }} />

            <div style={{ fontSize: '1.02rem', lineHeight: 1.8, color: '#334155', whiteSpace: 'pre-line' }}>
              {selectedPost.content}
            </div>

            <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #E2E8F0', textAlign: 'center' }}>
              <button onClick={() => setSelectedPost(null)} className="btn-green" style={{ borderRadius: 30, padding: '0.65rem 2rem' }}>
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
