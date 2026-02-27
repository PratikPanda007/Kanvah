import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="section-container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <span className="logo-k">K</span><span className="logo-rest">ANVAH</span>
                        </Link>
                        <p className="footer-tagline">Premium streetwear for the bold and unfiltered.</p>
                    </div>
                    <div className="footer-col">
                        <h4 className="footer-heading">Shop</h4>
                        <Link to="/collections" className="footer-link">All Products</Link>
                        <Link to="/collections?category=hoodies" className="footer-link">Hoodies</Link>
                        <Link to="/collections?category=outerwear" className="footer-link">Jackets</Link>
                        <Link to="/collections?category=accessories" className="footer-link">Accessories</Link>
                    </div>
                    <div className="footer-col">
                        <h4 className="footer-heading">Brand</h4>
                        <Link to="/about" className="footer-link">Our Story</Link>
                        <Link to="/about" className="footer-link">Sustainability</Link>
                        <Link to="/about" className="footer-link">Careers</Link>
                        <Link to="/about" className="footer-link">Press</Link>
                    </div>
                    <div className="footer-col">
                        <h4 className="footer-heading">Support</h4>
                        <a href="#" className="footer-link">Contact</a>
                        <a href="#" className="footer-link">Shipping</a>
                        <a href="#" className="footer-link">Returns</a>
                        <a href="#" className="footer-link">FAQ</a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2026 KANVAH. All rights reserved.</p>
                    <div className="footer-socials">
                        <a href="#" className="social-link" aria-label="Instagram">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                        </a>
                        <a href="#" className="social-link" aria-label="Twitter/X">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                        </a>
                        <a href="#" className="social-link" aria-label="TikTok">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.57 6.33 6.33 0 0 0 9.37 22a6.33 6.33 0 0 0 6.37-6.33V9.18a8.16 8.16 0 0 0 3.85.97V6.69z" /></svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
