import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem('userInfo') || '{}').token;

  useEffect(() => {
    if (!token) navigate('/login');
    fetchProducts();
  }, [navigate, token]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5005/api/products/admin', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await fetch(`http://localhost:5005/api/products/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchProducts();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="animate-fade-in">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="heading-lg">Products Management</h1>
        <button className="btn btn-primary" onClick={() => navigate('/admin/products/new')}>
          <Plus size={18} /> Add Product
        </button>
      </header>

      <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f9fafb', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
            <tr>
              <th style={{ padding: '1rem' }}>Product</th>
              <th style={{ padding: '1rem' }}>Price</th>
              <th style={{ padding: '1rem' }}>Category</th>
              <th style={{ padding: '1rem' }}>Stock</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img src={p.image || 'https://placehold.co/400x400?text=No+Image'} alt={p.name} onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x400?text=No+Image'; }} style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                  <span style={{ fontWeight: '500' }}>{p.name}</span>
                </td>
                <td style={{ padding: '1rem' }}>{Number(p.price).toFixed(2)} BDT</td>
                <td style={{ padding: '1rem' }}>{p.category}</td>
                <td style={{ padding: '1rem' }}>{p.stock}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.5rem', borderRadius: '16px', fontSize: '0.85rem', 
                    background: p.status === 'published' ? '#d1fae5' : '#fef3c7',
                    color: p.status === 'published' ? '#065f46' : '#92400e'
                  }}>
                    {p.status || 'published'}
                  </span>
                </td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <button className="btn" onClick={() => navigate(`/admin/products/edit/${p.id}`)} style={{ padding: '0.5rem', marginRight: '0.5rem' }} title="Edit"><Edit size={16} /></button>
                  <a href={`/product/${p.slug || p.id}`} target="_blank" rel="noreferrer" className="btn" style={{ padding: '0.5rem', marginRight: '0.5rem', display: 'inline-flex', color: 'var(--text-secondary)' }} title="View on Store"><Eye size={16} /></a>
                  <button className="btn" onClick={() => handleDelete(p.id)} style={{ padding: '0.5rem', color: '#ef4444' }} title="Delete"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
