import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/lookbook.css';

const GALLERY = [
    { img: '/assets/images/collection-1.png', name: 'Storm Jacket', label: 'Outerwear / $249' },
    { img: '/assets/images/collection-4.png', name: 'Shadow Hoodie', label: 'Hoodies / $189' },
    { img: '/assets/images/collection-2.png', name: 'Tactical Vest', label: 'Tech-Wear / $159' },
    { img: '/assets/images/collection-3.png', name: 'Venom Parka', label: 'Outerwear / $319' },
    { img: '/assets/images/hero-model.png', name: 'Apex Hoodie', label: 'Hoodies / $209' },
    { img: '/assets/images/collection-1.png', name: 'Stealth Bomber', label: 'Outerwear / $279' },
    { img: '/assets/images/collection-4.png', name: 'Drift Hoodie', label: 'Hoodies / $169' },
    { img: '/assets/images/collection-2.png', name: 'Signal Vest', label: 'Tech-Wear / $139' },
];

export default function LookbookPage() {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <>
            <section className="lookbook-hero">
                <div className="lookbook-hero-bg">
                    <img src="/assets/images/collection-3.png" alt="Kanvah Lookbook SS26" />
                </div>
                <div className="lookbook-hero-content">
                    <p className="section-label">SS26 Campaign</p>
                    <h1><span className="title-k">B</span>old. <span className="title-k">R</span>aw. <span className="title-k">U</span>nfiltered.</h1>
                    <p>A visual story shot on the streets of Tokyo — raw energy meets premium craftsmanship.</p>
                </div>
            </section>

            <section className="lookbook-gallery">
                <div className="lookbook-gallery-header">
                    <p className="section-label">Editorial</p>
                    <h2 className="section-title">The <span className="title-k">S</span>S26 Story</h2>
                </div>
                <div className="gallery-masonry">
                    {GALLERY.map((item, i) => (
                        <div className="gallery-item" key={i}>
                            <img src={item.img} alt={`${item.name} editorial`} loading="lazy" />
                            <div className="gallery-item-overlay">
                                <h3>{item.name}</h3>
                                <p>{item.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="lookbook-cta-section">
                <h2>Shop the <span className="title-k">L</span>ook</h2>
                <p>Every piece from the SS26 campaign is available now. Don't miss out on limited editions.</p>
                <Link to="/collections" className="lookbook-shop-btn">Shop Collections →</Link>
            </section>
        </>
    );
}
