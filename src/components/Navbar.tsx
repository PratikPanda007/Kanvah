import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const isHome = location.pathname === '/';
    const { totalItems, setIsCartOpen } = useCart();
    const { user, setIsLoginModalOpen, setIsAddressModalOpen, logout } = useAuth();
    let lastScroll = 0;

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            setScrolled(y > 60);
            if (isHome) {
                setHidden(y > lastScroll && y > 200);
            }
            lastScroll = y;
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [isHome]);

    useEffect(() => {
        setMobileOpen(false);
        setUserMenuOpen(false);
    }, [location]);

    // Close user menu on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
                setUserMenuOpen(false);
            }
        };
        if (userMenuOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [userMenuOpen]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const navClass = `navbar${scrolled || !isHome ? ' scrolled' : ''}${hidden ? ' hidden' : ''}`;

    return (
        <>
            <nav id="navbar" className={navClass}>
                <div className="nav-container">
                    <Link to="/" className="nav-logo" id="nav-logo">
                        <span className="logo-k">K</span><span className="logo-rest">ANVAH</span>
                    </Link>
                    <div className="nav-links" id="nav-links">
                        <Link to="/" className={`nav-link${location.pathname === '/' ? ' active' : ''}`}>Home</Link>
                        <Link to="/collections" className={`nav-link${location.pathname === '/collections' ? ' active' : ''}`}>Collections</Link>
                        <Link to="/new-releases" className={`nav-link${location.pathname === '/new-releases' ? ' active' : ''}`}>New Releases</Link>
                        <Link to="/lookbook" className={`nav-link${location.pathname === '/lookbook' ? ' active' : ''}`}>Lookbook</Link>
                        <Link to="/about" className={`nav-link${location.pathname === '/about' ? ' active' : ''}`}>About</Link>
                    </div>
                    <div className="nav-actions">
                        <button className="nav-icon-btn" id="search-btn" aria-label="Search">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                        </button>

                        {/* User / Auth Button */}
                        {user ? (
                            <div className="nav-user-wrap" ref={userMenuRef}>
                                <button
                                    className="nav-user-btn"
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    aria-label="User menu"
                                >
                                    <div className="nav-user-avatar" style={{ background: user.avatar }}>
                                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                    </div>
                                </button>
                                {userMenuOpen && (
                                    <div className="nav-user-dropdown">
                                        <div className="nav-user-dropdown-header">
                                            <div className="nav-user-avatar-lg" style={{ background: user.avatar }}>
                                                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="nav-user-dropdown-name">{user.name}</p>
                                                <p className="nav-user-dropdown-email">{user.email}</p>
                                            </div>
                                        </div>
                                        <div className="nav-user-dropdown-divider" />
                                        <button className="nav-user-dropdown-item" onClick={() => { setIsAddressModalOpen(true); setUserMenuOpen(false); }}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                            {user.address ? 'Edit Address' : 'Add Address'}
                                        </button>
                                        <button className="nav-user-dropdown-item" onClick={() => { logout(); setUserMenuOpen(false); }}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                className="nav-icon-btn"
                                id="user-btn"
                                aria-label="Sign In"
                                onClick={() => setIsLoginModalOpen(true)}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            </button>
                        )}

                        <button className="nav-icon-btn cart-icon-btn" id="cart-btn" aria-label="Cart" onClick={() => setIsCartOpen(true)}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                            {totalItems > 0 && <span className="cart-badge-count">{totalItems}</span>}
                        </button>
                        <button className={`hamburger${mobileOpen ? ' active' : ''}`} id="hamburger-btn" aria-label="Menu" onClick={() => setMobileOpen(!mobileOpen)}>
                            <span></span><span></span><span></span>
                        </button>
                    </div>
                </div>
            </nav>

            <div className={`mobile-menu${mobileOpen ? ' active' : ''}`} id="mobile-menu">
                <div className="mobile-menu-content">
                    <Link to="/collections" className="mobile-link">Collections</Link>
                    <Link to="/new-releases" className="mobile-link">New Releases</Link>
                    <Link to="/lookbook" className="mobile-link">Lookbook</Link>
                    <Link to="/about" className="mobile-link">About</Link>
                    {user ? (
                        <button className="mobile-link mobile-logout-btn" onClick={() => { logout(); setMobileOpen(false); }}>
                            Sign Out ({user.name})
                        </button>
                    ) : (
                        <button className="mobile-link mobile-login-btn" onClick={() => { setIsLoginModalOpen(true); setMobileOpen(false); }}>
                            Sign In
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}
