import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth, type Address } from '../context/AuthContext';
import { COLOR_HEX } from '../data/products';
import AddressModal from '../components/AddressModal';

const TAX_RATE = 0.08; // 8% tax
const FREE_SHIPPING_THRESHOLD = 150;
const STANDARD_SHIPPING = 12.99;
const EXPRESS_SHIPPING = 24.99;

interface Coupon {
    code: string;
    discount: number; // percentage
    label: string;
}

const VALID_COUPONS: Coupon[] = [
    { code: 'KANVAH10', discount: 10, label: '10% off' },
    { code: 'WELCOME20', discount: 20, label: '20% off' },
    { code: 'VIP30', discount: 30, label: '30% off' },
];

export default function CheckoutPage() {
    const { items, totalItems, totalPrice, updateQuantity, removeFromCart } = useCart();
    const { user, setIsLoginModalOpen, updateAddress } = useAuth();

    const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
    const [couponError, setCouponError] = useState('');
    const [editingAddress, setEditingAddress] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Redirect if cart is empty (and order not just placed)
    useEffect(() => {
        if (items.length === 0 && !orderPlaced) {
            // Don't redirect immediately, show empty state
        }
    }, [items, orderPlaced]);

    // Calculations
    const subtotal = totalPrice;
    const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 :
        (shippingMethod === 'express' ? EXPRESS_SHIPPING : STANDARD_SHIPPING);
    const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discount / 100) : 0;
    const taxableAmount = subtotal - discountAmount;
    const tax = taxableAmount * TAX_RATE;
    const total = taxableAmount + tax + shippingCost;

    const handleApplyCoupon = () => {
        setCouponError('');
        if (!couponCode.trim()) {
            setCouponError('Please enter a coupon code');
            return;
        }
        const found = VALID_COUPONS.find(c => c.code.toLowerCase() === couponCode.trim().toLowerCase());
        if (!found) {
            setCouponError('Invalid coupon code');
            return;
        }
        setAppliedCoupon(found);
        setCouponCode('');
    };

    const removeCoupon = () => {
        setAppliedCoupon(null);
        setCouponCode('');
        setCouponError('');
    };

    const handleAddressSave = (address: Address) => {
        updateAddress(address);
        setEditingAddress(false);
    };

    const handlePlaceOrder = () => {
        if (!user) {
            setIsLoginModalOpen(true);
            return;
        }
        if (!user.address) {
            setEditingAddress(true);
            return;
        }
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            setOrderPlaced(true);
        }, 2000);
    };

    // Order placed success view
    if (orderPlaced) {
        return (
            <>
                <header className="page-header checkout-header">
                    <div className="section-container">
                        <p className="page-breadcrumb">
                            <Link to="/">Home</Link> / <span>Order Confirmed</span>
                        </p>
                    </div>
                </header>
                <section className="checkout-success">
                    <div className="checkout-success-inner">
                        <div className="checkout-success-icon">
                            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><polyline points="16 8 10.5 14 8 11.5" /></svg>
                        </div>
                        <h1 className="checkout-success-title">Order Confirmed!</h1>
                        <p className="checkout-success-msg">
                            Thank you for your order. We'll send you a confirmation email with tracking details shortly.
                        </p>
                        <p className="checkout-success-order-id">
                            Order #{Math.random().toString(36).substr(2, 8).toUpperCase()}
                        </p>
                        <div className="checkout-success-actions">
                            <Link to="/collections" className="checkout-success-btn primary">Continue Shopping</Link>
                            <Link to="/" className="checkout-success-btn secondary">Back to Home</Link>
                        </div>
                    </div>
                </section>
            </>
        );
    }

    // Empty cart
    if (items.length === 0) {
        return (
            <>
                <header className="page-header checkout-header">
                    <div className="section-container">
                        <p className="page-breadcrumb">
                            <Link to="/">Home</Link> / <span>Checkout</span>
                        </p>
                    </div>
                </header>
                <section className="checkout-empty">
                    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                    <h2>Your cart is empty</h2>
                    <p>Add some items before checking out</p>
                    <Link to="/collections" className="checkout-empty-btn">Browse Collections</Link>
                </section>
            </>
        );
    }

    return (
        <>
            <header className="page-header checkout-header">
                <div className="section-container">
                    <p className="page-breadcrumb">
                        <Link to="/">Home</Link> / <span>Checkout</span>
                    </p>
                </div>
            </header>

            <section className="checkout-section">
                <div className="checkout-container">
                    {/* Left Column: Items + Address */}
                    <div className="checkout-left">
                        {/* Cart Items */}
                        <div className="checkout-block">
                            <h2 className="checkout-block-title">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                                Your Items ({totalItems})
                            </h2>
                            <div className="checkout-items">
                                {items.map(item => (
                                    <div className="checkout-item" key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}>
                                        <Link to={`/product/${item.product.id}`} className="checkout-item-img">
                                            <img src={item.product.image} alt={item.product.name} />
                                        </Link>
                                        <div className="checkout-item-details">
                                            <Link to={`/product/${item.product.id}`} className="checkout-item-name">{item.product.name}</Link>
                                            <div className="checkout-item-meta">
                                                <span className="checkout-item-size">Size: {item.selectedSize.toUpperCase()}</span>
                                                <span className="checkout-item-color-wrap">
                                                    Color: <span className="checkout-item-color-dot" style={{ background: COLOR_HEX[item.selectedColor] || item.selectedColor }} /> {item.selectedColor}
                                                </span>
                                            </div>
                                            <div className="checkout-item-bottom">
                                                <div className="checkout-item-qty">
                                                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} aria-label="Decrease">−</button>
                                                    <span>{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} aria-label="Increase">+</button>
                                                </div>
                                                <span className="checkout-item-price">${(item.product.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        </div>
                                        <button className="checkout-item-remove" onClick={() => removeFromCart(item.product.id)} aria-label="Remove">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="checkout-block">
                            <div className="checkout-block-header">
                                <h2 className="checkout-block-title">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                    Shipping Address
                                </h2>
                                {user?.address && !editingAddress && (
                                    <button className="checkout-edit-btn" onClick={() => setEditingAddress(true)}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                                        Edit
                                    </button>
                                )}
                            </div>

                            {!user ? (
                                <div className="checkout-login-prompt">
                                    <p>Please sign in to add your shipping address</p>
                                    <button className="checkout-login-btn" onClick={() => setIsLoginModalOpen(true)}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                        Sign In
                                    </button>
                                </div>
                            ) : user.address && !editingAddress ? (
                                <div className="checkout-address-card">
                                    <p className="checkout-address-name">{user.address.fullName}</p>
                                    <p className="checkout-address-line">{user.address.street}</p>
                                    {user.address.apartment && <p className="checkout-address-line">{user.address.apartment}</p>}
                                    <p className="checkout-address-line">
                                        {user.address.city}, {user.address.state} {user.address.zip}
                                    </p>
                                    <p className="checkout-address-line">{user.address.country}</p>
                                    <p className="checkout-address-phone">{user.address.phone}</p>
                                </div>
                            ) : (
                                <div className="checkout-address-form-wrap">
                                    {!user.address && !editingAddress && (
                                        <button className="checkout-add-address-btn" onClick={() => setEditingAddress(true)}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                                            Add Shipping Address
                                        </button>
                                    )}
                                    {editingAddress && (
                                        <AddressModal
                                            inline={true}
                                            initialAddress={user.address}
                                            onSave={handleAddressSave}
                                        />
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Shipping Method */}
                        <div className="checkout-block">
                            <h2 className="checkout-block-title">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13" rx="2" /><path d="m16 8 4 2v6l-4 2" /><circle cx="8" cy="15" r="2" /><circle cx="18" cy="15" r="2" /></svg>
                                Shipping Method
                            </h2>
                            <div className="checkout-shipping-options">
                                <label className={`checkout-shipping-option${shippingMethod === 'standard' ? ' active' : ''}`}>
                                    <input type="radio" name="shipping" value="standard"
                                        checked={shippingMethod === 'standard'}
                                        onChange={() => setShippingMethod('standard')} />
                                    <div className="checkout-shipping-radio" />
                                    <div className="checkout-shipping-info">
                                        <span className="checkout-shipping-name">Standard Shipping</span>
                                        <span className="checkout-shipping-time">5-7 Business Days</span>
                                    </div>
                                    <span className="checkout-shipping-cost">
                                        {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                                            <span className="checkout-shipping-free">FREE</span>
                                        ) : (
                                            `$${STANDARD_SHIPPING.toFixed(2)}`
                                        )}
                                    </span>
                                </label>
                                <label className={`checkout-shipping-option${shippingMethod === 'express' ? ' active' : ''}`}>
                                    <input type="radio" name="shipping" value="express"
                                        checked={shippingMethod === 'express'}
                                        onChange={() => setShippingMethod('express')} />
                                    <div className="checkout-shipping-radio" />
                                    <div className="checkout-shipping-info">
                                        <span className="checkout-shipping-name">Express Shipping</span>
                                        <span className="checkout-shipping-time">2-3 Business Days</span>
                                    </div>
                                    <span className="checkout-shipping-cost">
                                        {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                                            <span className="checkout-shipping-free">FREE</span>
                                        ) : (
                                            `$${EXPRESS_SHIPPING.toFixed(2)}`
                                        )}
                                    </span>
                                </label>
                            </div>
                            {subtotal >= FREE_SHIPPING_THRESHOLD && (
                                <p className="checkout-free-ship-note">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                    You've qualified for free shipping!
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="checkout-right">
                        <div className="checkout-summary">
                            <h2 className="checkout-summary-title">Order Summary</h2>

                            {/* Coupon Code */}
                            <div className="checkout-coupon">
                                {!appliedCoupon ? (
                                    <div className="checkout-coupon-input-wrap">
                                        <input
                                            type="text"
                                            className="checkout-coupon-input"
                                            placeholder="Enter coupon code"
                                            value={couponCode}
                                            onChange={e => { setCouponCode(e.target.value); setCouponError(''); }}
                                            onKeyDown={e => e.key === 'Enter' && handleApplyCoupon()}
                                        />
                                        <button className="checkout-coupon-apply" onClick={handleApplyCoupon}>Apply</button>
                                    </div>
                                ) : (
                                    <div className="checkout-coupon-applied">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>
                                        <div className="checkout-coupon-applied-info">
                                            <span className="checkout-coupon-code">{appliedCoupon.code}</span>
                                            <span className="checkout-coupon-label">{appliedCoupon.label}</span>
                                        </div>
                                        <button className="checkout-coupon-remove" onClick={removeCoupon} aria-label="Remove coupon">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                        </button>
                                    </div>
                                )}
                                {couponError && <p className="checkout-coupon-error">{couponError}</p>}
                                {!appliedCoupon && (
                                    <p className="checkout-coupon-hint">
                                        Try: <button className="checkout-coupon-try" onClick={() => setCouponCode('KANVAH10')}>KANVAH10</button>
                                    </p>
                                )}
                            </div>

                            {/* Price Breakdown */}
                            <div className="checkout-price-rows">
                                <div className="checkout-price-row">
                                    <span>Subtotal ({totalItems} item{totalItems > 1 ? 's' : ''})</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                {appliedCoupon && (
                                    <div className="checkout-price-row discount">
                                        <span>Discount ({appliedCoupon.label})</span>
                                        <span>-${discountAmount.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="checkout-price-row">
                                    <span>Shipping</span>
                                    <span>{shippingCost === 0 ? <span className="checkout-price-free">FREE</span> : `$${shippingCost.toFixed(2)}`}</span>
                                </div>
                                <div className="checkout-price-row">
                                    <span>Tax (8%)</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="checkout-total-row">
                                <span>Total</span>
                                <span className="checkout-total-price">${total.toFixed(2)}</span>
                            </div>

                            {/* Savings */}
                            {(discountAmount > 0 || shippingCost === 0) && (
                                <div className="checkout-savings">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                    You're saving ${(discountAmount + (subtotal >= FREE_SHIPPING_THRESHOLD ? (shippingMethod === 'express' ? EXPRESS_SHIPPING : STANDARD_SHIPPING) : 0)).toFixed(2)} on this order!
                                </div>
                            )}

                            {/* Place Order */}
                            <button
                                className={`checkout-place-btn${processing ? ' processing' : ''}`}
                                onClick={handlePlaceOrder}
                                disabled={processing || items.length === 0}
                            >
                                {processing ? (
                                    <>
                                        <span className="checkout-spinner" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                                        Place Order — ${total.toFixed(2)}
                                    </>
                                )}
                            </button>

                            <div className="checkout-secure-note">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect width="18" height="11" x="3" y="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
                                <span>Secure 256-bit SSL encrypted checkout</span>
                            </div>

                            {/* Payment methods visual */}
                            <div className="checkout-payment-methods">
                                <span className="checkout-pm-label">We accept</span>
                                <div className="checkout-pm-icons">
                                    <span className="checkout-pm-icon">VISA</span>
                                    <span className="checkout-pm-icon">MC</span>
                                    <span className="checkout-pm-icon">AMEX</span>
                                    <span className="checkout-pm-icon">PP</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
