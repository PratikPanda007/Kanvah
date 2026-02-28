import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { COLOR_HEX } from '../data/products';

export default function CartDrawer() {
    const { items, removeFromCart, updateQuantity, totalItems, totalPrice, isCartOpen, setIsCartOpen } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        setIsCartOpen(false);
        navigate('/checkout');
    };

    return (
        <>
            <div className={`cart-overlay${isCartOpen ? ' active' : ''}`} onClick={() => setIsCartOpen(false)} />
            <div className={`cart-drawer${isCartOpen ? ' active' : ''}`}>
                <div className="cart-drawer-header">
                    <h3 className="cart-drawer-title">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                        Your Cart ({totalItems})
                    </h3>
                    <button className="cart-drawer-close" onClick={() => setIsCartOpen(false)} aria-label="Close cart">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                </div>

                <div className="cart-drawer-body">
                    {items.length === 0 ? (
                        <div className="cart-empty">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                            <p>Your cart is empty</p>
                            <span>Add items to get started</span>
                        </div>
                    ) : (
                        items.map(item => (
                            <div className="cart-item" key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}>
                                <div className="cart-item-image">
                                    <img src={item.product.image} alt={item.product.name} />
                                </div>
                                <div className="cart-item-details">
                                    <h4 className="cart-item-name">{item.product.name}</h4>
                                    <div className="cart-item-meta">
                                        <span className="cart-item-size">{item.selectedSize.toUpperCase()}</span>
                                        <div className="cart-item-color-dot" style={{ background: COLOR_HEX[item.selectedColor] || item.selectedColor }} />
                                    </div>
                                    <div className="cart-item-bottom">
                                        <div className="cart-item-qty">
                                            <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>−</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</button>
                                        </div>
                                        <span className="cart-item-price">${(item.product.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                </div>
                                <button className="cart-item-remove" onClick={() => removeFromCart(item.product.id)} aria-label="Remove item">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="cart-drawer-footer">
                        <div className="cart-subtotal">
                            <span>Subtotal</span>
                            <span className="cart-subtotal-price">${totalPrice.toFixed(2)}</span>
                        </div>
                        <p className="cart-shipping-note">Shipping & taxes calculated at checkout</p>
                        <button className="cart-checkout-btn" onClick={handleCheckout}>Checkout</button>
                    </div>
                )}
            </div>
        </>
    );
}
