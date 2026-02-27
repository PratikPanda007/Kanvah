import { useEffect } from 'react';
import '../styles/about.css';

const VALUES = [
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>, title: 'Quality First', desc: 'We never compromise on materials or craftsmanship. Every piece is built to last and designed to perform in real-world conditions.' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>, title: 'Sustainability', desc: 'Responsible production isn\'t optional. We use recycled materials, minimal packaging, and carbon-neutral shipping across all markets.' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>, title: 'Community', desc: 'Kanvah is more than a brand — it\'s a movement. We foster a global community of creators who push boundaries and redefine culture.' },
];

export default function AboutPage() {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <>
            <section className="about-hero">
                <div className="about-hero-bg">
                    <img src="/assets/images/hero-model.png" alt="Kanvah Brand" />
                </div>
                <div className="about-hero-content">
                    <p className="section-label">Our Story</p>
                    <h1>About <span className="title-k">K</span>anvah</h1>
                    <p>Born from the concrete and code of the modern metropolis.</p>
                </div>
            </section>

            <section className="about-story">
                <div className="story-grid">
                    <div className="story-text">
                        <p className="section-label">The Beginning</p>
                        <h2>From the <span className="title-k">S</span>treets</h2>
                        <p>Kanvah started in 2019 as a response to the growing gap between high fashion and functional streetwear. We saw models on runways wearing clothes that looked incredible but couldn't survive a day in the real world.</p>
                        <p>So we built something different — pieces engineered for the streets, inspired by urban architecture, military precision, and the raw energy of underground culture.</p>
                    </div>
                    <div className="story-image"><img src="/assets/images/collection-1.png" alt="Kanvah origins" loading="lazy" /></div>
                </div>

                <div className="story-grid reverse">
                    <div className="story-text">
                        <p className="section-label">Our Craft</p>
                        <h2><span className="title-k">E</span>ngineered for Life</h2>
                        <p>Every Kanvah piece goes through a rigorous 12-step design process. From concept sketches to final stitching, we obsess over every detail — seam placement, fabric weight, silhouette balance, and movement freedom.</p>
                        <p>We source premium materials from Italy, Japan, and Korea, working directly with mills to develop proprietary fabric blends that combine durability with comfort.</p>
                    </div>
                    <div className="story-image"><img src="/assets/images/collection-2.png" alt="Kanvah craftsmanship" loading="lazy" /></div>
                </div>

                <div className="story-grid">
                    <div className="story-text">
                        <p className="section-label">The Vision</p>
                        <h2><span className="title-k">B</span>old by Design</h2>
                        <p>Kanvah isn't just clothing — it's a statement about who you are and where you're going. We design for the architects of their own reality, the ones who refuse to blend in or compromise.</p>
                        <p>Our vision extends beyond fashion. We're building a community of creators, thinkers, and doers who share a belief that style should never come at the expense of substance.</p>
                    </div>
                    <div className="story-image"><img src="/assets/images/collection-3.png" alt="Kanvah vision" loading="lazy" /></div>
                </div>
            </section>

            <section className="about-stats-section">
                <div className="stats-grid">
                    <div className="stat-item"><span className="stat-number">26+</span><span className="stat-label">Collections</span></div>
                    <div className="stat-item"><span className="stat-number">140K</span><span className="stat-label">Community</span></div>
                    <div className="stat-item"><span className="stat-number">48</span><span className="stat-label">Countries</span></div>
                    <div className="stat-item"><span className="stat-number">100%</span><span className="stat-label">Sustainable</span></div>
                </div>
            </section>

            <section className="values-section">
                <div className="values-container">
                    <div className="values-header">
                        <p className="section-label">What We Stand For</p>
                        <h2 className="section-title">Our <span className="title-k">V</span>alues</h2>
                    </div>
                    <div className="values-grid">
                        {VALUES.map((v, i) => (
                            <div className="value-card" key={i}>
                                <div className="value-icon">{v.icon}</div>
                                <h3>{v.title}</h3>
                                <p>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
