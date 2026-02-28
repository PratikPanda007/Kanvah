import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS, COLOR_HEX } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductReviews from '../components/ProductReviews';

export default function ProductPage() {
    const { id } = useParams<{ id: string }>();
    const product = PRODUCTS.find(p => p.id === Number(id));
    const { addToCart } = useCart();

    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [addedFeedback, setAddedFeedback] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        if (product) {
            setSelectedSize(product.sizes[0]);
            setSelectedColor(product.colors[0]);
            setSelectedImage(0);
        }
    }, [product]);

    if (!product) {
        return (
            <div className="product-page-not-found">
                <h2>Product Not Found</h2>
                <p>The product you're looking for doesn't exist.</p>
                <Link to="/collections" className="back-to-shop-btn">Back to Collections</Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product, selectedSize, selectedColor);
        setAddedFeedback(true);
        setTimeout(() => setAddedFeedback(false), 2000);
    };

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalf = rating % 1 >= 0.3;
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <svg key={i} className="star-icon filled" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                );
            } else if (i === fullStars && hasHalf) {
                stars.push(
                    <svg key={i} className="star-icon half" width="16" height="16" viewBox="0 0 24 24">
                        <defs>
                            <linearGradient id={`half-star-${product.id}`}>
                                <stop offset="50%" stopColor="currentColor" />
                                <stop offset="50%" stopColor="transparent" />
                            </linearGradient>
                        </defs>
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill={`url(#half-star-${product.id})`} stroke="currentColor" strokeWidth="1" />
                    </svg>
                );
            } else {
                stars.push(
                    <svg key={i} className="star-icon empty" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                );
            }
        }
        return stars;
    };

    // Get related products (same category, excluding current)
    const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    return (
        <>
            <header className="page-header pdp-header">
                <div className="section-container">
                    <p className="page-breadcrumb">
                        <Link to="/">Home</Link> / <Link to="/collections">Collections</Link> / <span>{product.name}</span>
                    </p>
                </div>
            </header>

            <section className="pdp-section">
                <div className="pdp-container">
                    {/* Left: Image Gallery */}
                    <div className="pdp-gallery">
                        <div className="pdp-main-image">
                            <img
                                src={product.images[selectedImage]}
                                alt={product.name}
                                key={selectedImage}
                                className="pdp-main-img"
                            />
                            {product.badge && (
                                <span className={`product-badge ${product.badge}`}>{product.badge}</span>
                            )}
                        </div>
                        <div className="pdp-thumbnails">
                            {product.images.map((img, i) => (
                                <button
                                    key={i}
                                    className={`pdp-thumb${selectedImage === i ? ' active' : ''}`}
                                    onClick={() => setSelectedImage(i)}
                                    aria-label={`View image ${i + 1}`}
                                >
                                    <img src={img} alt={`${product.name} view ${i + 1}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Details */}
                    <div className="pdp-details">
                        <div className="pdp-details-top">
                            <p className="pdp-category">{product.category}</p>
                            <h1 className="pdp-name">{product.name}</h1>

                            <div className="pdp-rating">
                                <div className="pdp-stars">
                                    {renderStars(product.rating)}
                                </div>
                                <span className="pdp-rating-value">{product.rating}</span>
                                <span className="pdp-review-count">({product.reviewCount} reviews)</span>
                            </div>

                            <div className="pdp-price">
                                <span className="pdp-price-current">${product.price.toFixed(2)}</span>
                                {product.originalPrice && (
                                    <span className="pdp-price-original">${product.originalPrice.toFixed(2)}</span>
                                )}
                                {product.originalPrice && (
                                    <span className="pdp-price-discount">
                                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                                    </span>
                                )}
                            </div>
                        </div>

                        <p className="pdp-description">{product.description}</p>

                        {/* Color Selector */}
                        <div className="pdp-option-group">
                            <label className="pdp-option-label">
                                Color: <span className="pdp-option-value">{selectedColor}</span>
                            </label>
                            <div className="pdp-color-options">
                                {product.colors.map(c => (
                                    <button
                                        key={c}
                                        className={`pdp-color-btn${selectedColor === c ? ' active' : ''}`}
                                        style={{ background: COLOR_HEX[c] || c }}
                                        onClick={() => setSelectedColor(c)}
                                        aria-label={c}
                                        title={c}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Size Selector */}
                        <div className="pdp-option-group">
                            <label className="pdp-option-label">
                                Size: <span className="pdp-option-value">{selectedSize.toUpperCase()}</span>
                            </label>
                            <div className="pdp-size-options">
                                {product.sizes.map(s => (
                                    <button
                                        key={s}
                                        className={`pdp-size-btn${selectedSize === s ? ' active' : ''}`}
                                        onClick={() => setSelectedSize(s)}
                                    >
                                        {s.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <button
                            className={`pdp-add-to-cart${addedFeedback ? ' added' : ''}`}
                            onClick={handleAddToCart}
                            id="pdp-add-to-cart"
                        >
                            {addedFeedback ? (
                                <>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                    Added to Cart
                                </>
                            ) : (
                                <>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                                    Add to Cart — ${product.price.toFixed(2)}
                                </>
                            )}
                        </button>

                        {/* Product Details List */}
                        <div className="pdp-features">
                            <h3 className="pdp-features-title">Product Details</h3>
                            <ul className="pdp-features-list">
                                {product.details.map((d, i) => (
                                    <li key={i}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                        {d}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Extra Info */}
                        <div className="pdp-extras">
                            <div className="pdp-extra-item">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13" rx="2" /><path d="m16 8 4 2v6l-4 2" /><circle cx="8" cy="15" r="2" /><circle cx="18" cy="15" r="2" /></svg>
                                <span>Free shipping on orders over $150</span>
                            </div>
                            <div className="pdp-extra-item">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                                <span>30-day returns & exchanges</span>
                            </div>
                            <div className="pdp-extra-item">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                                <span>Secure checkout</span>
                            </div>
                        </div>

                        {/* Material */}
                        <div className="pdp-material">
                            <span className="pdp-material-label">Material</span>
                            <span className="pdp-material-value">{product.material.charAt(0).toUpperCase() + product.material.slice(1)}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reviews */}
            <ProductReviews productId={product.id} />

            {/* Related Products */}
            {related.length > 0 && (
                <section className="pdp-related">
                    <div className="section-container">
                        <h2 className="pdp-related-title">You May Also Like</h2>
                        <div className="pdp-related-grid">
                            {related.map(p => (
                                <Link to={`/product/${p.id}`} className="pdp-related-card" key={p.id}>
                                    <div className="pdp-related-image">
                                        <img src={p.image} alt={p.name} loading="lazy" />
                                        {p.badge && <span className={`product-badge ${p.badge}`}>{p.badge}</span>}
                                    </div>
                                    <div className="pdp-related-info">
                                        <p className="pdp-related-category">{p.category}</p>
                                        <h3 className="pdp-related-name">{p.name}</h3>
                                        <span className="pdp-related-price">${p.price.toFixed(2)}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
