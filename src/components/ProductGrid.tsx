import { type Product, COLOR_HEX } from '../data/products';

interface Props {
    products: Product[];
}

export default function ProductGrid({ products }: Props) {
    if (products.length === 0) {
        return (
            <div className="product-grid">
                <div className="no-results">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /><path d="M8 11h6" /></svg>
                    <h3>No products found</h3>
                    <p>Try adjusting your filters or search terms.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="product-grid">
            {products.map(product => (
                <div className="product-card" key={product.id} data-id={product.id}>
                    <div className="product-image">
                        <img src={product.image} alt={product.name} loading="lazy" />
                        {product.badge && <span className={`product-badge ${product.badge}`}>{product.badge}</span>}
                        <div className="product-quick-actions">
                            <button className="quick-action-btn">Quick View</button>
                            <button className="quick-action-btn">Add to Cart</button>
                        </div>
                    </div>
                    <div className="product-info">
                        <p className="product-category-label">{product.category}</p>
                        <h3 className="product-name">{product.name}</h3>
                        <div className="product-price">
                            <span className="current">${product.price.toFixed(2)}</span>
                            {product.originalPrice && <span className="original">${product.originalPrice.toFixed(2)}</span>}
                        </div>
                        <div className="product-colors">
                            {product.colors.map(c => (
                                <div key={c} className="product-color-dot" style={{ background: COLOR_HEX[c] || c }} title={c} />
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
