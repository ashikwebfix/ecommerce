import React, { useState, useEffect, useMemo } from 'react';
import { Filter } from 'lucide-react';

const ProductFilterSidebar = ({
  selectedCategories = [],
  setSelectedCategories,
  selectedTags = [],
  setSelectedTags,
  maxPrice = 2000,
  setMaxPrice,
  inStockOnly = false,
  setInStockOnly,
  searchQuery = '',
  setSearchQuery,
  setCurrentPage,
  showSearch = true,
}) => {
  const [globalProducts, setGlobalProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5005/api/products')
      .then(res => res.json())
      .then(data => setGlobalProducts(data))
      .catch(err => console.error(err));
  }, []);

  const categories = useMemo(() => {
    return Array.from(new Set(globalProducts.map(p => p.category))).filter(Boolean);
  }, [globalProducts]);

  const allTags = useMemo(() => {
    const tagsSet = new Set();
    globalProducts.forEach(p => {
      let pTags = [];
      if (Array.isArray(p.tags)) {
        pTags = p.tags;
      } else if (typeof p.tags === 'string') {
        try { 
          pTags = JSON.parse(p.tags); 
        } catch(e) {
          pTags = p.tags.split(',').map(s => s.trim()).filter(Boolean);
        }
      }
      pTags.forEach(t => tagsSet.add(t));
    });
    return Array.from(tagsSet).sort();
  }, [globalProducts]);

  // Handle category toggle
  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    if (setCurrentPage) setCurrentPage(1);
  };

  // Handle tag toggle
  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    if (setCurrentPage) setCurrentPage(1);
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
    if (showSearch && setSearchQuery) setSearchQuery('');
    setMaxPrice(2000);
    setInStockOnly(false);
    if (setCurrentPage) setCurrentPage(1);
  };

  return (
    <aside className="shop-sidebar">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1.5rem',
          color: 'var(--text-primary)',
        }}
      >
        <Filter size={20} />
        <h2 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0 }}>Filters</h2>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Max Price: {maxPrice} BDT</h3>
        <input
          type="range"
          min="0"
          max="2000"
          step="50"
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(Number(e.target.value));
            if (setCurrentPage) setCurrentPage(1);
          }}
          style={{
            width: '100%',
            accentColor: 'var(--accent-primary)',
            cursor: 'pointer',
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            marginTop: '0.5rem',
          }}
        >
          <span>0 BDT</span>
          <span>2000+ BDT</span>
        </div>
      </div>

      {showSearch && setSearchQuery && (
        <div className="filter-section">
          <h3 className="filter-title">Search</h3>
          <input
            type="text"
            className="input-field"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (setCurrentPage) setCurrentPage(1);
            }}
            style={{ width: '100%' }}
          />
        </div>
      )}

      <div className="filter-section">
        <h3 className="filter-title">Categories</h3>
        {categories.length > 0 ? (
          categories.map((category) => (
            <label key={category} className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
              />
              {category}
            </label>
          ))
        ) : (
          <span className="text-muted" style={{ fontSize: '0.9rem' }}>
            No categories available
          </span>
        )}
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Tags</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {allTags.length > 0 ? (
            allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                style={{
                  padding: '0.4rem 0.8rem',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: '500',
                  border: `1px solid ${
                    selectedTags.includes(tag)
                      ? 'var(--accent-primary)'
                      : 'var(--border-color)'
                  }`,
                  background: selectedTags.includes(tag)
                    ? 'var(--accent-primary)'
                    : 'white',
                  color: selectedTags.includes(tag)
                    ? 'white'
                    : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {tag}
              </button>
            ))
          ) : (
            <span className="text-muted" style={{ fontSize: '0.9rem' }}>
              No tags available
            </span>
          )}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Availability</h3>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => {
              setInStockOnly(e.target.checked);
              if (setCurrentPage) setCurrentPage(1);
            }}
          />
          In Stock Only
        </label>
      </div>

      <button
        className="btn btn-secondary"
        style={{ width: '100%' }}
        onClick={clearFilters}
      >
        Clear Filters
      </button>
    </aside>
  );
};

export default ProductFilterSidebar;
