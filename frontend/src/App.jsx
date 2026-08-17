import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import TrackingInjector from './components/TrackingInjector';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Categories from './pages/Categories';
import About from './pages/About';
import Contact from './pages/Contact';
import SearchResults from './pages/SearchResults';
import Tracker from './components/Tracker';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProductDetails from './pages/ProductDetails';
import Profile from './pages/Profile';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProductForm from './pages/admin/AdminProductForm';
import AdminCategories from './pages/admin/AdminCategories';
import AdminMedia from './pages/admin/AdminMedia';
import AdminOrders from './pages/admin/AdminOrders';
import AdminOrderDetails from './pages/admin/AdminOrderDetails';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminSettings from './pages/admin/AdminSettings';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminCoupons from './pages/admin/AdminCoupons';
import AdminBundles from './pages/admin/AdminBundles';
import AdminBundleForm from './pages/admin/AdminBundleForm';
import AdminFraudProtection from './pages/admin/AdminFraudProtection';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/AdminLayout';
import AdminAbandonedCarts from './pages/admin/AdminAbandonedCarts';
import AdminUsers from './pages/admin/AdminUsers';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Tracker />
        <TrackingInjector />
        <Toaster position="top-right" />
        <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<><Navbar /><div className="page-wrapper"><Home /><Footer /></div></>} />
        <Route path="/about" element={<><Navbar /><div className="page-wrapper"><About /><Footer /></div></>} />
        <Route path="/contact" element={<><Navbar /><div className="page-wrapper"><Contact /><Footer /></div></>} />
        <Route path="/shop" element={<><Navbar /><div className="page-wrapper"><Shop /><Footer /></div></>} />
        <Route path="/categories" element={<><Navbar /><div className="page-wrapper"><Categories /><Footer /></div></>} />
        <Route path="/search" element={<><Navbar /><div className="page-wrapper"><SearchResults /><Footer /></div></>} />
        <Route path="/product/:slug" element={<><Navbar /><div className="page-wrapper"><ProductDetails /><Footer /></div></>} />
        <Route path="/login" element={<><Navbar /><div className="page-wrapper"><Login /><Footer /></div></>} />
        <Route path="/profile" element={<><Navbar /><div className="page-wrapper"><Profile /><Footer /></div></>} />
        <Route path="/cart" element={<><Navbar /><div className="page-wrapper"><Cart /><Footer /></div></>} />
        <Route path="/checkout" element={<Checkout />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="orders/:id" element={<AdminOrderDetails />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="abandoned-carts" element={<AdminAbandonedCarts />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<AdminProductForm />} />
          <Route path="products/edit/:id" element={<AdminProductForm />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="media" element={<AdminMedia />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="coupons" element={<AdminCoupons />} />
          <Route path="bundles" element={<AdminBundles />} />
          <Route path="bundles/new" element={<AdminBundleForm />} />
          <Route path="bundles/edit/:id" element={<AdminBundleForm />} />
          <Route path="fraud-protection" element={<AdminFraudProtection />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Routes>
      <MobileBottomNav />
    </Router>
    </HelmetProvider>
  );
}

export default App;
