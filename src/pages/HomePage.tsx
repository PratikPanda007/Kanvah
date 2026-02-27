import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';

export default function HomePage() {
    const heroTextRef = useRef<HTMLDivElement>(null);
    const heroSectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Scroll-based parallax for hero background text
    useEffect(() => {
        const heroText = heroTextRef.current;
        const heroSection = heroSectionRef.current;
        if (!heroText || !heroSection) return;

        let rafId: number;
        let currentX = 0;
        let targetX = 0;

        const handleScroll = () => {
            const rect = heroSection.getBoundingClientRect();
            //const sectionHeight = heroSection.offsetHeight;

            // Only animate while hero section is visible
            if (rect.bottom < 0 || rect.top > window.innerHeight) return;

            // Calculate how far we've scrolled past the top of the hero
            const scrollProgress = Math.max(0, -rect.top);

            // Move text to the left as user scrolls down
            // Speed multiplier controls how fast the text moves
            targetX = -(scrollProgress * 0.8);
        };

        const animate = () => {
            // Smooth lerp for buttery animation
            currentX += (targetX - currentX) * 0.1;

            // Apply transform only if there's meaningful change
            if (Math.abs(currentX - targetX) > 0.01) {
                heroText.style.transform = `translate(calc(-50% + ${currentX}px), -50%)`;
            } else {
                heroText.style.transform = `translate(calc(-50% + ${targetX}px), -50%)`;
            }

            rafId = requestAnimationFrame(animate);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        rafId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <>
            <Loader />

            {/* Hero */}
            <section id="hero" className="hero" ref={heroSectionRef}>
                <div className="hero-bg-text" ref={heroTextRef} aria-hidden="true">
                    <span className="hero-k">K</span><span className="hero-rest">ANVAH</span>
                </div>
                <div className="hero-model">
                    <img src="/assets/images/hero-model.png" alt="Model wearing Kanvah hoodie" id="hero-model-img" />
                </div>
                <canvas id="spine-canvas" className="spine-canvas"></canvas>
                <div className="hero-overlay">
                    <div className="hero-content">
                        <p className="hero-tagline">SS26 Collection</p>
                        <h1 className="hero-title">Redefine<br /><em>Your Edge</em></h1>
                        <Link to="/collections" className="hero-cta" id="hero-cta">
                            Explore Now
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                        </Link>
                    </div>
                </div>
                <div className="hero-scroll-indicator">
                    <div className="scroll-line"></div>
                    <span>Scroll</span>
                </div>
            </section>

            {/* Marquee */}
            <div className="marquee-section">
                <div className="marquee-track">
                    <div className="marquee-content">
                        {['URBAN EDGE', 'PREMIUM QUALITY', 'BOLD DESIGN', 'STREET CULTURE', 'LIMITED DROPS', 'URBAN EDGE', 'PREMIUM QUALITY', 'BOLD DESIGN', 'STREET CULTURE', 'LIMITED DROPS'].map((t, i) => (
                            <span key={i}>{i > 0 && <span className="marquee-dot">◆</span>}{t}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Collections */}
            <section id="collections" className="section collections">
                <div className="section-container">
                    <div className="section-header">
                        <p className="section-label">Featured</p>
                        <h2 className="section-title"><span className="title-k">C</span>ollections</h2>
                    </div>
                    <div className="collections-grid">
                        <Link to="/collections?category=outerwear" className="collection-card collection-card-large">
                            <div className="card-image"><img src="/assets/images/collection-1.png" alt="Tactical Jacket Collection" loading="lazy" /></div>
                            <div className="card-overlay">
                                <span className="card-category">Outerwear</span>
                                <h3 className="card-title">Tactical Series</h3>
                                <p className="card-desc">Engineered for the streets</p>
                                <span className="card-link">Shop Now →</span>
                            </div>
                        </Link>
                        <Link to="/collections?category=techwear" className="collection-card">
                            <div className="card-image"><img src="/assets/images/collection-2.png" alt="Tech-Wear Collection" loading="lazy" /></div>
                            <div className="card-overlay">
                                <span className="card-category">Tech-Wear</span>
                                <h3 className="card-title">Urban Utility</h3>
                                <p className="card-desc">Form meets function</p>
                                <span className="card-link">Shop Now →</span>
                            </div>
                        </Link>
                        <Link to="/collections?category=essentials" className="collection-card">
                            <div className="card-image"><img src="/assets/images/collection-3.png" alt="Essentials Collection" loading="lazy" /></div>
                            <div className="card-overlay">
                                <span className="card-category">Essentials</span>
                                <h3 className="card-title">Core Red</h3>
                                <p className="card-desc">The foundation of style</p>
                                <span className="card-link">Shop Now →</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* New Releases */}
            <section id="new-releases" className="section new-releases">
                <div className="section-container">
                    <div className="section-header center">
                        <p className="section-label">Just Dropped</p>
                        <h2 className="section-title">New <span className="title-k">R</span>eleases</h2>
                    </div>
                    <div className="releases-grid">
                        {[
                            { img: 'collection-4.png', name: 'Shadow Hoodie', price: '$189.00' },
                            { img: 'collection-1.png', name: 'Storm Jacket', price: '$249.00' },
                            { img: 'collection-2.png', name: 'Tactical Vest', price: '$159.00' },
                            { img: 'collection-3.png', name: 'Venom Parka', price: '$319.00' },
                        ].map((item, i) => (
                            <Link to="/new-releases" className="release-card" key={i}>
                                <div className="release-image">
                                    <img src={`/assets/images/${item.img}`} alt={`Kanvah ${item.name}`} loading="lazy" />
                                    <span className="release-badge">New</span>
                                </div>
                                <div className="release-info">
                                    <h3 className="release-name">{item.name}</h3>
                                    <p className="release-price">{item.price}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lookbook */}
            <section id="lookbook" className="section lookbook">
                <div className="lookbook-bg">
                    <img src="/assets/images/collection-3.png" alt="Kanvah Lookbook" loading="lazy" />
                </div>
                <div className="lookbook-overlay"></div>
                <div className="lookbook-content">
                    <p className="lookbook-label">Lookbook</p>
                    <h2 className="lookbook-title">
                        <span className="title-k">B</span>old. <span className="title-k">R</span>aw. <span className="title-k">U</span>nfiltered.
                    </h2>
                    <p className="lookbook-desc">Explore the full SS26 editorial campaign shot on the streets of Tokyo.</p>
                    <Link to="/lookbook" className="lookbook-cta">View Lookbook</Link>
                </div>
            </section>

            {/* About */}
            <section id="about" className="section about">
                <div className="section-container">
                    <div className="about-grid">
                        <div className="about-text">
                            <p className="section-label">Our Story</p>
                            <h2 className="section-title"><span className="title-k">K</span>anvah</h2>
                            <p className="about-desc">Born from the concrete and code of the modern metropolis, Kanvah is more than clothing — it's a statement. We fuse cutting-edge materials with bold, uncompromising design to create pieces that move with you through every challenge the city throws your way.</p>
                            <p className="about-desc">Every stitch, every seam, every silhouette is engineered for those who refuse to blend in. Kanvah is for the architects of their own reality.</p>
                            <div className="about-stats">
                                <div className="stat"><span className="stat-number">26+</span><span className="stat-label">Collections</span></div>
                                <div className="stat"><span className="stat-number">140K</span><span className="stat-label">Community</span></div>
                                <div className="stat"><span className="stat-number">48</span><span className="stat-label">Countries</span></div>
                            </div>
                        </div>
                        <div className="about-image">
                            <img src="/assets/images/hero-model.png" alt="Kanvah Brand Story" loading="lazy" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="section newsletter">
                <div className="section-container">
                    <div className="newsletter-inner">
                        <h2 className="newsletter-title">Join the <span className="title-k">K</span>anvah Circle</h2>
                        <p className="newsletter-desc">Get early access to drops, exclusive content, and member-only pricing.</p>
                        <form className="newsletter-form" onSubmit={e => { e.preventDefault(); alert('Thanks for subscribing!'); }}>
                            <input type="email" placeholder="Your email address" className="newsletter-input" required />
                            <button type="submit" className="newsletter-btn">Subscribe</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
