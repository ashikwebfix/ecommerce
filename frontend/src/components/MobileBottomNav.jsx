import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as Icons from 'lucide-react';
import useCartStore from '../store/useCartStore';
import useFavoritesStore from '../store/useFavoritesStore';

const MobileBottomNav = () => {
  const location = useLocation();
  const cartItems = useCartStore((state) => state.cartItems);
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const favorites = useFavoritesStore((state) => state.favorites);
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');

  const isActive = (path) => location.pathname === path;

  return (
    <div className="mobile-bottom-nav">
      <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
        <Icons.Home size={24} />
        <span>Home</span>
      </Link>
      <Link to="/shop" className={`nav-item ${isActive('/shop') ? 'active' : ''}`}>
        <Icons.ShoppingBag size={24} />
        <span>Shop</span>
      </Link>
      <Link to={userInfo && userInfo.token ? "/profile" : "/login"} className={`nav-item ${isActive('/profile') ? 'active' : ''}`} style={{ position: 'relative' }}>
        <Icons.Heart size={24} />
        <span>Favorites</span>
        {favorites?.length > 0 && (
          <span className="badge">
            {favorites.length}
          </span>
        )}
      </Link>
      <Link to="/cart" className={`nav-item ${isActive('/cart') ? 'active' : ''}`} style={{ position: 'relative' }}>
        <Icons.ShoppingCart size={24} />
        <span>Cart</span>
        {cartItemCount > 0 && (
          <span className="badge">
            {cartItemCount}
          </span>
        )}
      </Link>
      <Link to={userInfo && userInfo.token ? "/profile" : "/login"} className={`nav-item ${isActive('/profile') ? 'active' : ''}`}>
        <Icons.User size={24} />
        <span>Account</span>
      </Link>
    </div>
  );
};

export default MobileBottomNav;
