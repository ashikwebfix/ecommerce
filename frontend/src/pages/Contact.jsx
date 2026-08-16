import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 2rem 5rem' }}>
      
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
        <Link to="/" style={{ transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color='var(--accent-primary)'} onMouseOut={e => e.currentTarget.style.color='var(--text-secondary)'}>Home</Link>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>যোগাযোগ</span>
      </div>

      {/* Hero Section */}
      <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', minHeight: '300px', marginBottom: '4rem', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}>
        <img 
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80&w=2000" 
          alt="Contact Us" 
          style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, objectFit: 'cover' }} 
        />
        <div style={{ position: 'relative', height: '100%', minHeight: '300px', background: 'linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.4))', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem' }}>
          <h1 style={{ color: 'white', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', margin: '0 0 1rem 0' }}>যোগাযোগ করুন</h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem', maxWidth: '600px', lineHeight: '1.6' }}>
            আপনার যেকোনো প্রশ্ন বা প্রয়োজনে আমরা আছি আপনার পাশে। আমাদের সাথে যোগাযোগ করতে নিচের ফর্মটি পূরণ করুন অথবা সরাসরি ফোন করুন।
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
        
        {/* Contact Info */}
        <div>
          <h2 className="heading-lg" style={{ marginBottom: '1.5rem' }}>যোগাযোগের তথ্য</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.05rem', marginBottom: '2.5rem' }}>
            ফর্মটি পূরণ করুন এবং আমাদের সাপোর্ট টিম দ্রুত আপনার সাথে যোগাযোগ করবে। তাৎক্ষণিক সহায়তার জন্য আমাদের হেল্পলাইনে কল করুন।
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
              <div style={{ width: '50px', height: '50px', background: 'rgba(6, 78, 59, 0.1)', color: 'var(--accent-primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MapPin size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>অফিস ঠিকানা</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Rd 53, Gulshan 2, Dhaka, Bangladesh</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
              <div style={{ width: '50px', height: '50px', background: 'rgba(6, 78, 59, 0.1)', color: 'var(--accent-primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Phone size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>ফোন</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>01354-557477</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
              <div style={{ width: '50px', height: '50px', background: 'rgba(6, 78, 59, 0.1)', color: 'var(--accent-primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Mail size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>ইমেইল</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>support@kinaboo.com</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
              <div style={{ width: '50px', height: '50px', background: 'rgba(6, 78, 59, 0.1)', color: 'var(--accent-primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Clock size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>অফিস সময়</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>রবিবার - বৃহস্পতিবার: ১০টা - ৬টা<br/>শুক্রবার - শনিবার: বন্ধ</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass" style={{ padding: '3rem', borderRadius: '16px' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '2rem', color: 'var(--text-primary)' }}>আমাদের মেসেজ পাঠান</h3>
          
          {submitted ? (
            <div style={{ background: '#dcfce7', color: '#166534', padding: '1.5rem', borderRadius: '12px', border: '1px solid #bbf7d0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', background: '#166534', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div>
                <h4 style={{ fontWeight: '700', fontSize: '1.2rem', marginBottom: '0.5rem' }}>মেসেজ পাঠানো হয়েছে!</h4>
                <p style={{ opacity: 0.9 }}>যোগাযোগ করার জন্য ধন্যবাদ। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>আপনার নাম</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required 
                    className="input-field" 
                    placeholder="আপনার নাম লিখুন" 
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>ইমেইল</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required 
                    className="input-field" 
                    placeholder="আপনার ইমেইল" 
                  />
                </div>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>বিষয়</label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required 
                  className="input-field" 
                  placeholder="আমরা কীভাবে সাহায্য করতে পারি?" 
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>মেসেজ</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required 
                  className="input-field" 
                  placeholder="আপনার মেসেজ এখানে লিখুন..." 
                  rows="6"
                  style={{ resize: 'vertical' }}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', marginTop: '0.5rem' }}>
                <Send size={18} />
                মেসেজ পাঠান
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
