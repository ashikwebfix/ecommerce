/**
 * Utility functions for triggering Google Tag Manager and Facebook Pixel events.
 */

// Helper to push to dataLayer (GTM)
export const pushToDataLayer = (data) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(data);
  }
};

// Helper to push to fbq (Facebook Pixel)
export const pushToFbq = (event, eventName, data) => {
  if (typeof window !== 'undefined' && window.fbq) {
    if (data) {
      window.fbq(event, eventName, data);
    } else {
      window.fbq(event, eventName);
    }
  }
};

export const trackPageView = (url) => {
  pushToDataLayer({ event: 'page_view', page_path: url });
  pushToFbq('track', 'PageView');
};

export const trackViewContent = (product) => {
  if (!product) return;
  const price = product.sellPrice || product.price || 0;
  
  // GTM
  pushToDataLayer({
    event: 'view_item',
    ecommerce: {
      items: [{
        item_name: product.name,
        item_id: product.id,
        price: price,
        item_category: product.categoryId || '',
      }]
    }
  });

  // FB
  pushToFbq('track', 'ViewContent', {
    content_name: product.name,
    content_ids: [product.id],
    content_type: 'product',
    value: price,
    currency: 'BDT'
  });
};

export const trackAddToCart = (product, qty = 1) => {
  if (!product) return;
  const price = product.sellPrice || product.price || 0;

  // GTM
  pushToDataLayer({
    event: 'add_to_cart',
    ecommerce: {
      items: [{
        item_name: product.name,
        item_id: product.id,
        price: price,
        quantity: qty
      }]
    }
  });

  // FB
  pushToFbq('track', 'AddToCart', {
    content_name: product.name,
    content_ids: [product.id],
    content_type: 'product',
    value: price * qty,
    currency: 'BDT'
  });
};

export const trackBeginCheckout = (cartItems, totalPrice) => {
  if (!cartItems || cartItems.length === 0) return;

  // GTM
  pushToDataLayer({
    event: 'begin_checkout',
    ecommerce: {
      value: totalPrice,
      currency: 'BDT',
      items: cartItems.map(item => ({
        item_name: item.name,
        item_id: item.productId || item.id,
        price: item.price,
        quantity: item.qty
      }))
    }
  });

  // FB
  pushToFbq('track', 'InitiateCheckout', {
    content_ids: cartItems.map(item => item.productId || item.id),
    content_type: 'product',
    value: totalPrice,
    currency: 'BDT',
    num_items: cartItems.length
  });
};

export const trackSearch = (query) => {
  if (!query) return;

  // GTM
  pushToDataLayer({
    event: 'search',
    search_term: query
  });

  // FB
  pushToFbq('track', 'Search', {
    search_string: query
  });
};

// Note: Purchase is also tracked server-side via CAPI. 
export const trackPurchase = (order, cartItems) => {
  if (!order) return;

  // GTM
  pushToDataLayer({
    event: 'purchase',
    ecommerce: {
      transaction_id: order.id,
      value: order.totalPrice,
      currency: 'BDT',
      items: cartItems.map(item => ({
        item_name: item.name,
        item_id: item.productId || item.id,
        price: item.price,
        quantity: item.qty
      }))
    }
  });

  // FB (Client-side)
  pushToFbq('track', 'Purchase', {
    content_ids: cartItems.map(item => item.productId || item.id),
    content_type: 'product',
    value: order.totalPrice,
    currency: 'BDT'
  });
};
