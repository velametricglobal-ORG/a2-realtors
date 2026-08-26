import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, CheckCircle2, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { submitGeneralContact } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    submitGeneralContact({
      name,
      phone,
      email,
      message
    });
    setSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC', paddingBottom: '6rem' }}>
      
      {/* Hero Banner */}
      <div style={{ backgroundColor: '#0F172A', color: '#FFFFFF', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <div className="badge badge-featured" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            📍 Dehradun Registered Office
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Contact A2 Realtors</h1>
          <p style={{ color: '#CBD5E1', maxWidth: 600, margin: '0.5rem auto 0 auto' }}>
            Visit our Dalanwala office or reach our property advisory team directly via phone or WhatsApp.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '3rem' }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT 1 COL: OFFICE INFO */}
          <div className="card" style={{ padding: '2rem', backgroundColor: '#FFFFFF', height: '100%' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '1.5rem' }}>
              Head Office Contact
            </h3>

            <div className="flex flex-col gap-6" style={{ fontSize: '0.95rem' }}>
              <div className="flex items-start gap-3">
                <MapPin size={22} style={{ color: '#D97706', marginTop: 3, flexShrink: 0 }} />
                <div>
                  <strong style={{ color: '#0F172A', display: 'block' }}>A2 Realtors Office Address</strong>
                  <span style={{ color: '#64748B' }}>
                    25 B, Inder Road, Dalanwala,<br />Dehradun, Uttarakhand 248001
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={22} style={{ color: '#D97706', marginTop: 3, flexShrink: 0 }} />
                <div>
                  <strong style={{ color: '#0F172A', display: 'block' }}>Direct Phone Contact</strong>
                  <a href="tel:+918445190135" style={{ color: '#D97706', fontWeight: 700 }}>+91 84451 90135</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare size={22} style={{ color: '#25D366', marginTop: 3, flexShrink: 0 }} />
                <div>
                  <strong style={{ color: '#0F172A', display: 'block' }}>WhatsApp Property Consultation</strong>
                  <a href="https://wa.me/918445190135" target="_blank" rel="noreferrer" style={{ color: '#25D366', fontWeight: 700 }}>
                    Chat Live with Consultant
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock size={22} style={{ color: '#D97706', marginTop: 3, flexShrink: 0 }} />
                <div>
                  <strong style={{ color: '#0F172A', display: 'block' }}>Business Hours</strong>
                  <span style={{ color: '#64748B' }}>Monday to Saturday: 9:30 AM – 7:30 PM<br />Sunday: By Prior Appointment</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2" style={{ marginTop: '2rem' }}>
              <a href="tel:+918445190135" className="btn btn-primary flex-1">
                <Phone size={16} /> Call Now
              </a>
              <a href="https://wa.me/918445190135" target="_blank" rel="noreferrer" className="btn btn-whatsapp flex-1">
                <MessageSquare size={16} /> WhatsApp
              </a>
            </div>
          </div>

          {/* RIGHT 2 COLS: CONTACT FORM & GOOGLE MAP */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* Form */}
            <div className="card" style={{ padding: '2rem', backgroundColor: '#FFFFFF' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <CheckCircle2 size={48} style={{ color: '#10B981', margin: '0 auto 1rem auto' }} />
                  <h3 style={{ fontSize: '1.5rem', color: '#0F172A', marginBottom: '0.5rem' }}>Message Received</h3>
                  <p style={{ color: '#64748B', marginBottom: '1.5rem' }}>
                    Thank you <strong>{name}</strong>. Our senior consultant will call you at <strong>{phone}</strong> shortly.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn btn-primary">Send Another Inquiry</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.25rem' }}>
                    Send Us Your Property Requirement
                  </h3>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input type="text" required placeholder="e.g. Sanjay Rawat" value={name} onChange={(e) => setName(e.target.value)} className="form-input" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone / WhatsApp Number *</label>
                      <input type="tel" required placeholder="+91 98970 00000" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-input" />
                    </div>
                    <div className="form-group lg:col-span-2">
                      <label className="form-label">Email Address (Optional)</label>
                      <input type="email" placeholder="your.email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" />
                    </div>
                    <div className="form-group lg:col-span-2">
                      <label className="form-label">How can A2 Realtors help you? *</label>
                      <textarea rows={4} required placeholder="Describe whether you want to Buy, Sell, Rent or Build property in Dehradun..." value={message} onChange={(e) => setMessage(e.target.value)} className="form-textarea" />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg w-full" style={{ width: '100%', marginTop: '1rem' }}>
                    Submit Requirement <ArrowRight size={18} />
                  </button>
                </form>
              )}
            </div>

            {/* Google Map */}
            <div className="card" style={{ height: 320, backgroundColor: '#FFFFFF', overflow: 'hidden' }}>
              <iframe
                title="A2 Realtors Dalanwala Office Map"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src="https://maps.google.com/maps?q=25%20B,%20Inder%20Road,%20Dalanwala,%20Dehradun,%20Uttarakhand%20248001&t=&z=15&ie=UTF8&iwloc=&output=embed"
              />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
