import { create } from 'zustand';
import { trackAddToCart } from '@/utils/tracking';

// Try to load cart from local storage on initial load
const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem('cartItems');
  return storedCart ? JSON.parse(storedCart) : [];
};

const loadShippingFromStorage = () => {
  const storedShipping = localStorage.getItem('shippingAddress');
  return storedShipping ? JSON.parse(storedShipping) : {};
};

const useCartStore = create((set, get) => ({
  cartItems: loadCartFromStorage(),
  shippingAddress: loadShippingFromStorage(),

  addToCart: (product, qty = 1) => {
    const { cartItems } = get();
    const itemKey = product.cartId || product.id;
    const existItem = cartItems.find((x) => (x.cartId || x.id) === itemKey);

    let newCartItems;
    if (existItem) {
      newCartItems = cartItems.map((x) =>
        (x.cartId || x.id) === itemKey ? { ...x, qty: x.qty + qty, price: product.price, sellPrice: product.sellPrice } : x
      );
    } else {
      newCartItems = [...cartItems, { ...product, qty }];
    }

    set({ cartItems: newCartItems });
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    
    try {
      trackAddToCart(product, qty);
    } catch (err) {
      console.error('Failed to track add to cart', err);
    }
  },

  removeFromCart: (identifier) => {
    const { cartItems } = get();
    // identifier can be either cartId or id
    const newCartItems = cartItems.filter((x) => (x.cartId || x.id) !== identifier);
    set({ cartItems: newCartItems });
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  },

  updateCartQuantity: (identifier, qty) => {
    const { cartItems } = get();
    const newCartItems = cartItems.map((x) =>
      (x.cartId || x.id) === identifier ? { ...x, qty } : x
    );
    set({ cartItems: newCartItems });
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  },

  saveShippingAddress: (data) => {
    set({ shippingAddress: data });
    localStorage.setItem('shippingAddress', JSON.stringify(data));
  },

  clearCart: () => {
    set({ cartItems: [] });
    localStorage.removeItem('cartItems');
  },

  getCartTotal: () => {
    const { cartItems } = get();
    return cartItems.reduce((acc, item) => {
      const price = item.sellPrice || item.price;
      const discount = item.bundleDiscount || 0;
      return acc + (price - discount) * item.qty;
    }, 0).toFixed(2);
  }
}));

export default useCartStore;
