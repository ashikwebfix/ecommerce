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
        <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>About Us</span>
      </div>

      {/* Hero Section */}
      <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', minHeight: '350px', marginBottom: '4rem', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}>
        <img 
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=2000" 
          alt="About Us" 
          style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, objectFit: 'cover' }} 
        />
        <div style={{ position: 'relative', height: '100%', minHeight: '350px', background: 'linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.4))', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem' }}>
          <h1 style={{ color: 'white', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', margin: '0 0 1rem 0' }}>Our Story</h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem', maxWidth: '600px', lineHeight: '1.6' }}>
            Our mission is to bring high-quality, trending household products to every home in Bangladesh, ensuring reliability, affordability, and excellent customer service.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', marginBottom: '5rem' }}>
        <div>
          <h2 className="heading-lg" style={{ marginBottom: '1.5rem' }}>Who We Are</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.05rem', marginBottom: '1.5rem' }}>
            kinaboo.com was founded with a clear vision: to become the most trusted and customer-centric e-commerce platform in Bangladesh, offering top trending household products at unbeatable prices.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.05rem' }}>
            We understand the local market and the needs of our customers. By sourcing directly from top manufacturers and eliminating middlemen, we bring you the best household items right to your doorstep in Mirpur, Dhaka, and all across the country.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div className="glass" style={{ padding: '2rem', borderRadius: '16px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>10k+</h3>
            <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Happy Customers</p>
          </div>
          <div className="glass" style={{ padding: '2rem', borderRadius: '16px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>5+</h3>
            <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Years in Business</p>
          </div>
          <div className="glass" style={{ padding: '2rem', borderRadius: '16px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>100%</h3>
            <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Satisfaction Rate</p>
          </div>
          <div className="glass" style={{ padding: '2rem', borderRadius: '16px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>24/7</h3>
            <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Support Available</p>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div style={{ background: '#f8fafc', margin: '0 -2rem', padding: '5rem 2rem', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ padding: 0 }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>Our Core Values</h2>
            <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
              We believe in building a brand that stands the test of time by staying true to our foundational principles.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div className="glass" style={{ padding: '2.5rem', borderRadius: '16px', textAlign: 'center', transition: 'transform 0.3s' }} onMouseOver={e => e.currentTarget.style.transform='translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform='none'}>
              <div style={{ width: '60px', height: '60px', background: 'rgba(6, 78, 59, 0.1)', color: 'var(--accent-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <Shield size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-primary)' }}>Quality First</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>We never compromise on the quality of our materials or our manufacturing processes.</p>
            </div>
            
            <div className="glass" style={{ padding: '2.5rem', borderRadius: '16px', textAlign: 'center', transition: 'transform 0.3s' }} onMouseOver={e => e.currentTarget.style.transform='translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform='none'}>
              <div style={{ width: '60px', height: '60px', background: 'rgba(6, 78, 59, 0.1)', color: 'var(--accent-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <Truck size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-primary)' }}>Fast Delivery</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>We optimize our logistics to ensure your products reach you securely and on time.</p>
            </div>
            
            <div className="glass" style={{ padding: '2.5rem', borderRadius: '16px', textAlign: 'center', transition: 'transform 0.3s' }} onMouseOver={e => e.currentTarget.style.transform='translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform='none'}>
              <div style={{ width: '60px', height: '60px', background: 'rgba(6, 78, 59, 0.1)', color: 'var(--accent-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <Clock size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-primary)' }}>24/7 Support</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Our dedicated team is always available to help you with any questions or concerns.</p>
            </div>

            <div className="glass" style={{ padding: '2.5rem', borderRadius: '16px', textAlign: 'center', transition: 'transform 0.3s' }} onMouseOver={e => e.currentTarget.style.transform='translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform='none'}>
              <div style={{ width: '60px', height: '60px', background: 'rgba(6, 78, 59, 0.1)', color: 'var(--accent-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <Award size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-primary)' }}>Innovation</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>We continuously seek new ways to improve our products and customer experience.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;
