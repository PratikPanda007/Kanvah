import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';
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
    }, [location]);

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
                        <button className="nav-icon-btn" id="cart-btn" aria-label="Cart">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
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
                </div>
            </div>
        </>
    );
}
