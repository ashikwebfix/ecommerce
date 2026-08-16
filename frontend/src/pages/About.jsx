import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Shield, Truck, Clock, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 2rem 5rem' }}>
      
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
        <Link to="/" style={{ transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color='var(--accent-primary)'} onMouseOut={e => e.currentTarget.style.color='var(--text-secondary)'}>Home</Link>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>আমাদের সম্পর্কে</span>
      </div>

      {/* Hero Section */}
      <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', minHeight: '350px', marginBottom: '4rem', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}>
        <img 
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=2000" 
          alt="About Us" 
          style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, objectFit: 'cover' }} 
        />
        <div style={{ position: 'relative', height: '100%', minHeight: '350px', background: 'linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.4))', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem' }}>
          <h1 style={{ color: 'white', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', margin: '0 0 1rem 0' }}>আমাদের গল্প</h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem', maxWidth: '600px', lineHeight: '1.6' }}>
            আমাদের লক্ষ্য হলো বাংলাদেশের প্রতিটি ঘরে সেরা মানের ও ট্রেন্ডিং সব পণ্য পৌঁছে দেওয়া। আমরা নিশ্চিত করি সেরা মান, সাশ্রয়ী মূল্য এবং চমৎকার কাস্টমার সার্ভিস।
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', marginBottom: '5rem' }}>
        <div>
          <h2 className="heading-lg" style={{ marginBottom: '1.5rem' }}>আমরা কারা</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.05rem', marginBottom: '1.5rem' }}>
            kinaboo.com প্রতিষ্ঠিত হয়েছে একটি স্পষ্ট লক্ষ্য নিয়ে: বাংলাদেশের সবচেয়ে বিশ্বস্ত এবং ক্রেতাবান্ধব ই-কমার্স প্ল্যাটফর্ম হওয়া, যেখানে পাওয়া যাবে ট্রেন্ডিং সব প্রোডাক্ট সবচেয়ে সাশ্রয়ী মূল্যে।
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.05rem' }}>
            আমরা ক্রেতাদের চাহিদা খুব ভালোভাবে বুঝি। তাই সেরা প্রস্তুতকারকদের থেকে সরাসরি সংগ্রহ করে আমরা মানসম্মত প্রোডাক্ট পৌঁছে দিচ্ছি সারা দেশে।
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div className="glass" style={{ padding: '2rem', borderRadius: '16px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>10k+</h3>
            <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>সন্তুষ্ট গ্রাহক</p>
          </div>
          <div className="glass" style={{ padding: '2rem', borderRadius: '16px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>5+</h3>
            <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>বছরের অভিজ্ঞতা</p>
          </div>
          <div className="glass" style={{ padding: '2rem', borderRadius: '16px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>100%</h3>
            <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>গ্রাহক সন্তুষ্টি</p>
          </div>
          <div className="glass" style={{ padding: '2rem', borderRadius: '16px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>24/7</h3>
            <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>সাপোর্ট সুবিধা</p>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div style={{ background: '#f8fafc', margin: '0 -2rem', padding: '5rem 2rem', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ padding: 0 }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>আমাদের মূল নীতি</h2>
            <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
              আমাদের মূল নীতি ও আদর্শই আমাদের ব্রান্ডকে সামনের দিকে এগিয়ে নিয়ে যাচ্ছে।
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div className="glass" style={{ padding: '2.5rem', borderRadius: '16px', textAlign: 'center', transition: 'transform 0.3s' }} onMouseOver={e => e.currentTarget.style.transform='translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform='none'}>
              <div style={{ width: '60px', height: '60px', background: 'rgba(6, 78, 59, 0.1)', color: 'var(--accent-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <Shield size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-primary)' }}>গুণগত মান সবার আগে</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>আমরা পণ্যের গুণগত মানের সাথে কখনোই আপোষ করি না।</p>
            </div>
            
            <div className="glass" style={{ padding: '2.5rem', borderRadius: '16px', textAlign: 'center', transition: 'transform 0.3s' }} onMouseOver={e => e.currentTarget.style.transform='translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform='none'}>
              <div style={{ width: '60px', height: '60px', background: 'rgba(6, 78, 59, 0.1)', color: 'var(--accent-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <Truck size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-primary)' }}>দ্রুত ডেলিভারি</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>আপনার অর্ডারকৃত পণ্য দ্রুত ও নিরাপদে পৌঁছে দিতে আমরা বদ্ধপরিকর।</p>
            </div>
            
            <div className="glass" style={{ padding: '2.5rem', borderRadius: '16px', textAlign: 'center', transition: 'transform 0.3s' }} onMouseOver={e => e.currentTarget.style.transform='translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform='none'}>
              <div style={{ width: '60px', height: '60px', background: 'rgba(6, 78, 59, 0.1)', color: 'var(--accent-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <Clock size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-primary)' }}>২৪/৭ সাপোর্ট</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>যেকোনো প্রয়োজনে আমাদের ডেডিকেটেড সাপোর্ট টিম সব সময় আপনার পাশে আছে।</p>
            </div>

            <div className="glass" style={{ padding: '2.5rem', borderRadius: '16px', textAlign: 'center', transition: 'transform 0.3s' }} onMouseOver={e => e.currentTarget.style.transform='translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform='none'}>
              <div style={{ width: '60px', height: '60px', background: 'rgba(6, 78, 59, 0.1)', color: 'var(--accent-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <Award size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-primary)' }}>নতুনত্ব</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>আমরা প্রতিনিয়ত আমাদের প্রোডাক্ট ও কাস্টমার সার্ভিস উন্নত করার নতুন উপায় খুঁজি।</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;
