import React, { useState, useRef } from 'react';
import { Upload, Link2, Image as ImageIcon, X, CheckCircle2, AlertCircle } from 'lucide-react';

interface ImageUploadInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helpText?: string;
  required?: boolean;
  className?: string;
}

export const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
  label = 'Image / Photo',
  value,
  onChange,
  placeholder = 'https://images.unsplash.com/...',
  helpText,
  required = false,
  className = ''
}) => {
  // Determine initial mode based on value (data: means local upload, otherwise link)
  const isDataUrl = value?.startsWith('data:');
  const [mode, setMode] = useState<'link' | 'upload'>(isDataUrl ? 'upload' : 'link');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Resize and optimize image locally via Canvas to avoid massive Base64 strings
  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    // Limit to 15MB initial file size
    if (file.size > 15 * 1024 * 1024) {
      setErrorMsg('Selected file is too large. Please select an image under 15MB.');
      return;
    }

    setIsProcessing(true);
    setErrorMsg(null);

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        try {
          // Scale down to max 1600px width/height for fast loading & efficient storage
          const MAX_DIM = 1600;
          let width = img.width;
          let height = img.height;

          if (width > MAX_DIM || height > MAX_DIM) {
            if (width > height) {
              height = Math.round((height * MAX_DIM) / width);
              width = MAX_DIM;
            } else {
              width = Math.round((width * MAX_DIM) / height);
              height = MAX_DIM;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            // Fallback to raw data url
            onChange(readerEvent.target?.result as string);
            setIsProcessing(false);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          
          // Export as optimized JPEG/WebP (0.85 quality)
          const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
          const optimizedDataUrl = canvas.toDataURL(outputType, 0.85);
          onChange(optimizedDataUrl);
        } catch {
          // Fallback to raw data url if canvas has security/memory issues
          onChange(readerEvent.target?.result as string);
        } finally {
          setIsProcessing(false);
        }
      };

      img.onerror = () => {
        setErrorMsg('Unable to parse this image file.');
        setIsProcessing(false);
      };

      img.src = readerEvent.target?.result as string;
    };

    reader.onerror = () => {
      setErrorMsg('Failed to read image file from your device.');
      setIsProcessing(false);
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleClear = () => {
    onChange('');
    setErrorMsg(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`form-group ${className}`} style={{ marginBottom: '1.25rem' }}>
      {/* Label and Source Mode Toggle Tabs */}
      <div className="flex items-center justify-between gap-2" style={{ marginBottom: '0.45rem' }}>
        {label && (
          <label className="form-label" style={{ margin: 0, fontWeight: 700, fontSize: '0.86rem', color: '#1E293B' }}>
            {label} {required && <span style={{ color: '#DC2626' }}>*</span>}
          </label>
        )}

        {/* Source Toggle Pill */}
        <div style={{ 
          display: 'inline-flex', 
          backgroundColor: '#F1F5F9', 
          borderRadius: 8, 
          padding: 2, 
          border: '1px solid #E2E8F0',
          gap: 2
        }}>
          <button
            type="button"
            onClick={() => setMode('link')}
            style={{
              padding: '0.25rem 0.65rem',
              borderRadius: 6,
              fontSize: '0.74rem',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              backgroundColor: mode === 'link' ? '#FFFFFF' : 'transparent',
              color: mode === 'link' ? '#166534' : '#64748B',
              boxShadow: mode === 'link' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <Link2 size={12} />
            <span>Web Link</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('upload')}
            style={{
              padding: '0.25rem 0.65rem',
              borderRadius: 6,
              fontSize: '0.74rem',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              backgroundColor: mode === 'upload' ? '#FFFFFF' : 'transparent',
              color: mode === 'upload' ? '#166534' : '#64748B',
              boxShadow: mode === 'upload' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <Upload size={12} />
            <span>Upload Device</span>
          </button>
        </div>
      </div>

      {/* Input Mode 1: URL Text Input */}
      {mode === 'link' && (
        <div>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={value || ''}
              onChange={(e) => {
                onChange(e.target.value);
                setErrorMsg(null);
              }}
              placeholder={placeholder}
              className="form-input"
              style={{
                paddingRight: value ? '2.5rem' : '0.85rem',
                fontSize: '0.86rem'
              }}
            />
            {value && (
              <button
                type="button"
                onClick={handleClear}
                title="Clear image"
                style={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#94A3B8',
                  cursor: 'pointer',
                  padding: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%'
                }}
              >
                <X size={15} />
              </button>
            )}
          </div>
          <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: 4 }}>
            Paste a public direct image link from Unsplash, AWS S3, or your CDN.
          </div>
        </div>
      )}

      {/* Input Mode 2: Local File Upload & Drag-and-Drop */}
      {mode === 'upload' && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
              border: isDragging ? '2px dashed #166534' : '2px dashed #CBD5E1',
              backgroundColor: isDragging ? '#F0FDF4' : '#F8FAFC',
              borderRadius: 12,
              padding: '1.25rem 1rem',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                backgroundColor: isDragging ? '#DCFCE7' : '#E2E8F0',
                color: isDragging ? '#166534' : '#475569',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Upload size={20} />
              </div>
              <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#0F172A' }}>
                {isProcessing ? 'Processing & Optimizing Image...' : 'Click to Browse or Drag Image Here'}
              </div>
              <div style={{ fontSize: '0.74rem', color: '#64748B' }}>
                Supports JPG, PNG, WebP up to 15MB • Auto-optimized for instant web delivery
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Notice */}
      {errorMsg && (
        <div className="flex items-center gap-1.5" style={{ color: '#DC2626', fontSize: '0.78rem', marginTop: 6 }}>
          <AlertCircle size={13} style={{ flexShrink: 0 }} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Live Preview Box */}
      {value && (
        <div style={{
          marginTop: 10,
          position: 'relative',
          borderRadius: 10,
          overflow: 'hidden',
          border: '1px solid #E2E8F0',
          backgroundColor: '#0F172A'
        }}>
          <img
            src={value}
            alt="Uploaded Preview"
            style={{
              width: '100%',
              height: 150,
              objectFit: 'cover',
              display: 'block'
            }}
            onError={() => {
              setErrorMsg('Unable to render preview. Please verify image link or upload a different file.');
            }}
          />

          {/* Badges and Clear Action Overlay */}
          <div style={{
            position: 'absolute',
            top: 8,
            left: 8,
            right: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 6
          }}>
            <span style={{
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(6px)',
              color: '#FFFFFF',
              fontSize: '0.68rem',
              fontWeight: 700,
              padding: '0.2rem 0.55rem',
              borderRadius: 6,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4
            }}>
              {isDataUrl ? <CheckCircle2 size={11} style={{ color: '#4ADE80' }} /> : <ImageIcon size={11} style={{ color: '#DFB76C' }} />}
              {isDataUrl ? 'Local Device Upload' : 'Web Link Active'}
            </span>

            <button
              type="button"
              onClick={handleClear}
              style={{
                backgroundColor: 'rgba(220, 38, 38, 0.9)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 6,
                padding: '0.25rem 0.55rem',
                fontSize: '0.7rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4
              }}
            >
              <X size={12} />
              <span>Remove</span>
            </button>
          </div>
        </div>
      )}

      {helpText && !errorMsg && (
        <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: 4 }}>
          {helpText}
        </div>
      )}
    </div>
  );
};
