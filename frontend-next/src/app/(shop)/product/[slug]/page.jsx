import ProductDetailsClient from './ProductDetailsClient';

async function getProduct(slug) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:6710'}/api/products/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}

const stripHtml = (str) => str ? str.replace(/<[^>]*>?/gm, '') : '';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: 'Product Not Found | kinaboo.com',
    };
  }

  const cleanDesc = stripHtml(product.description || '');
  const description = cleanDesc.length > 200 ? cleanDesc.substring(0, 200) + '...' : (cleanDesc || `${product.name} - কিনুন kinaboo.com থেকে`);

  const siteUrl = process.env.SITE_URL || 'http://localhost:6710';
  const absoluteImage = (img) => {
    if (!img) return null;
    if (img.startsWith('http://') || img.startsWith('https://')) return img;
    return `${siteUrl}${img.startsWith('/') ? '' : '/'}${img}`;
  };

  let pImage = product.image;
  if (product.images && product.images.length > 0) {
    pImage = product.images[0];
  }

  return {
    title: `${product.name} | kinaboo.com`,
    description,
    openGraph: {
      title: `${product.name} | kinaboo.com`,
      description,
      images: pImage ? [{ url: absoluteImage(pImage), width: 800, height: 800 }] : [],
      type: 'product',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | kinaboo.com`,
      description,
      images: pImage ? [absoluteImage(pImage)] : [],
    }
  };
}

export default async function ProductPage({ params }) {
  return <ProductDetailsClient />;
}
