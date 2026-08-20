"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';


import * as Icons from 'lucide-react';
import useCartStore from '@/store/useCartStore';
import useFavoritesStore from '@/store/useFavoritesStore';

const MobileBottomNav = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const location = { pathname, search: searchParams.toString() };
  const cartItems = useCartStore((state) => state.cartItems);
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const favorites = useFavoritesStore((state) => state.favorites);
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');

  const isActive = (path) => location.pathname === path;

  return (
    <div className="mobile-bottom-nav">
      <Link href="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
        <Icons.Home size={24} />
        <span>Home</span>
      </Link>
      <Link href="/shop" className={`nav-item ${isActive('/shop') ? 'active' : ''}`}>
        <Icons.ShoppingBag size={24} />
        <span>Shop</span>
      </Link>
      <Link href={userInfo && userInfo.token ? "/profile" : "/login"} className={`nav-item ${isActive('/profile') ? 'active' : ''}`} style={{ position: 'relative' }}>
        <Icons.Heart size={24} />
        <span>Favorites</span>
        {favorites?.length > 0 && (
          <span className="badge">
            {favorites.length}
          </span>
        )}
      </Link>
      <Link href="/cart" className={`nav-item ${isActive('/cart') ? 'active' : ''}`} style={{ position: 'relative' }}>
        <Icons.ShoppingCart size={24} />
        <span>Cart</span>
        {cartItemCount > 0 && (
          <span className="badge">
            {cartItemCount}
          </span>
        )}
      </Link>
      <Link href={userInfo && userInfo.token ? "/profile" : "/login"} className={`nav-item ${isActive('/profile') ? 'active' : ''}`}>
        <Icons.User size={24} />
        <span>Account</span>
      </Link>
    </div>
  );
};

export default MobileBottomNav;
