import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

export interface Review {
    id: string;
    productId: number;
    userId: string;
    userName: string;
    userAvatar: string;
    rating: number;
    text: string;
    image?: string; // base64 data URL
    date: string;
}

// localStorage helpers
function getReviews(productId: number): Review[] {
    try {
        const all: Review[] = JSON.parse(localStorage.getItem('kanvah_reviews') || '[]');
        return all.filter(r => r.productId === productId);
    } catch { return []; }
}

function getAllReviews(): Review[] {
    try {
        return JSON.parse(localStorage.getItem('kanvah_reviews') || '[]');
    } catch { return []; }
}

function saveReview(review: Review) {
    const all = getAllReviews();
    all.push(review);
    localStorage.setItem('kanvah_reviews', JSON.stringify(all));
}

// Seed some demo reviews
function seedDemoReviews() {
    if (localStorage.getItem('kanvah_reviews_seeded')) return;

    const demoReviews: Review[] = [
        {
            id: 'demo-review-1',
            productId: 1,
            userId: 'demo-user-1',
            userName: 'Alex Rivera',
            userAvatar: '#c81020',
            rating: 5,
            text: 'Absolutely love this hoodie. The heavyweight cotton feels premium and the oversized fit is exactly what I wanted. The embossed logo is subtle but adds a nice touch. Already planning to get it in gray too.',
            date: '2026-02-15T10:30:00Z',
        },
        {
            id: 'demo-review-2',
            productId: 1,
            userId: 'demo-user-2',
            userName: 'Morgan Chen',
            userAvatar: '#2563eb',
            rating: 4,
            text: 'Great quality hoodie, the 400gsm cotton is thick and warm. Runs a bit large — I normally wear L but M fits perfectly for the oversized look. The hidden zip on the kangaroo pocket is a clever detail.',
            date: '2026-02-20T14:15:00Z',
        },
        {
            id: 'demo-review-3',
            productId: 2,
            userId: 'demo-user-1',
            userName: 'Alex Rivera',
            userAvatar: '#c81020',
            rating: 5,
            text: 'This jacket is a beast. Wore it in heavy rain and stayed completely dry. The sealed seams really work. Looks amazing with the tactical silhouette — gets compliments everywhere I go.',
            date: '2026-02-18T09:00:00Z',
        },
        {
            id: 'demo-review-4',
            productId: 2,
            userId: 'demo-user-3',
            userName: 'Jordan Taylor',
            userAvatar: '#9333ea',
            rating: 5,
            text: 'The Storm Jacket exceeded my expectations. Build quality is exceptional, the YKK zippers are smooth, and the internal mesh lining makes it breathable enough for layering. Worth every dollar.',
            date: '2026-02-22T16:45:00Z',
        },
        {
            id: 'demo-review-5',
            productId: 5,
            userId: 'demo-user-1',
            userName: 'Alex Rivera',
            userAvatar: '#c81020',
            rating: 5,
            text: 'Managed to grab one before they sold out. The matte nylon has such a clean look, and the quilted lining keeps it warm without bulk. The arm patch is a nice detail — very MA-1 but modernized.',
            date: '2026-02-10T11:20:00Z',
        },
        {
            id: 'demo-review-6',
            productId: 8,
            userId: 'demo-user-1',
            userName: 'Alex Rivera',
            userAvatar: '#c81020',
            rating: 4,
            text: 'Perfect everyday tee. The garment-dyed finish gives it character right out of the bag. Slightly elongated body is great for tucking or layering. Grabbed 3 in different colors.',
            date: '2026-02-12T08:30:00Z',
        },
        {
            id: 'demo-review-7',
            productId: 3,
            userId: 'demo-user-2',
            userName: 'Morgan Chen',
            userAvatar: '#2563eb',
            rating: 4,
            text: 'Really functional vest with great pocket placement. The DWR finish handled light drizzle well. Runs true to size. Only wish the MOLLE webbing was a touch more robust.',
            date: '2026-02-19T13:00:00Z',
        },
        {
            id: 'demo-review-8',
            productId: 4,
            userId: 'demo-user-2',
            userName: 'Morgan Chen',
            userAvatar: '#2563eb',
            rating: 5,
            text: 'Statement piece of the year. The fishtail hem gives it such a unique silhouette. Insulation is legit warm — wore it in -5°C and was comfortable. The venom embroidery is 🔥',
            date: '2026-02-25T10:00:00Z',
        },
    ];

    localStorage.setItem('kanvah_reviews', JSON.stringify(demoReviews));
    localStorage.setItem('kanvah_reviews_seeded', 'true');
}

// Star rating component for the form
function StarRatingInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
    const [hover, setHover] = useState(0);

    return (
        <div className="review-star-input">
            {[1, 2, 3, 4, 5].map(star => (
                <button
                    key={star}
                    type="button"
                    className={`review-star-btn${star <= (hover || value) ? ' active' : ''}`}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => onChange(star)}
                    aria-label={`${star} star${star > 1 ? 's' : ''}`}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24"
                        fill={star <= (hover || value) ? 'currentColor' : 'none'}
                        stroke="currentColor" strokeWidth="1.5">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                </button>
            ))}
        </div>
    );
}

// Render static stars
function StaticStars({ rating }: { rating: number }) {
    return (
        <div className="review-stars-display">
            {[1, 2, 3, 4, 5].map(star => (
                <svg
                    key={star}
                    className={`review-star-icon${star <= rating ? ' filled' : ''}`}
                    width="14" height="14" viewBox="0 0 24 24"
                    fill={star <= rating ? 'currentColor' : 'none'}
                    stroke="currentColor" strokeWidth="1.5"
                >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
            ))}
        </div>
    );
}

function formatDate(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

interface Props {
    productId: number;
}

export default function ProductReviews({ productId }: Props) {
    const { user, setIsLoginModalOpen } = useAuth();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [reviews, setReviews] = useState<Review[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [rating, setRating] = useState(0);
    const [text, setText] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [expandedImage, setExpandedImage] = useState<string | null>(null);

    // Seed on mount, load reviews
    useEffect(() => {
        seedDemoReviews();
        setReviews(getReviews(productId));
    }, [productId]);

    // Determine user permissions
    const hasPurchased = user ? user.purchasedProductIds.includes(productId) : false;
    const hasReviewed = user ? reviews.some(r => r.userId === user.id) : false;
    const canReview = user !== null && hasPurchased && !hasReviewed;

    // Average rating from reviews
    const avgRating = reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length)
        : 0;

    // Rating distribution
    const ratingDist = [5, 4, 3, 2, 1].map(star => ({
        star,
        count: reviews.filter(r => r.rating === star).length,
        percentage: reviews.length > 0
            ? Math.round((reviews.filter(r => r.rating === star).length / reviews.length) * 100)
            : 0,
    }));

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            alert('Image must be under 5MB');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !canReview || rating === 0 || text.trim().length < 10) return;

        setSubmitting(true);

        // Simulate network delay
        setTimeout(() => {
            const review: Review = {
                id: `review-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                productId,
                userId: user.id,
                userName: user.name,
                userAvatar: user.avatar,
                rating,
                text: text.trim(),
                image: imagePreview || undefined,
                date: new Date().toISOString(),
            };

            saveReview(review);
            setReviews(prev => [review, ...prev]);
            setRating(0);
            setText('');
            setImagePreview(null);
            setShowForm(false);
            setSubmitting(false);
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 3000);
        }, 800);
    };

    return (
        <section className="reviews-section" id="reviews">
            <div className="section-container">
                <div className="reviews-header">
                    <h2 className="reviews-title">
                        Customer Reviews
                    </h2>
                    <div className="reviews-summary">
                        <div className="reviews-summary-left">
                            <span className="reviews-avg-rating">{avgRating.toFixed(1)}</span>
                            <StaticStars rating={Math.round(avgRating)} />
                            <span className="reviews-total-count">
                                Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                            </span>
                        </div>
                        <div className="reviews-distribution">
                            {ratingDist.map(d => (
                                <div className="reviews-dist-row" key={d.star}>
                                    <span className="reviews-dist-star">{d.star}★</span>
                                    <div className="reviews-dist-bar">
                                        <div
                                            className="reviews-dist-fill"
                                            style={{ width: `${d.percentage}%` }}
                                        />
                                    </div>
                                    <span className="reviews-dist-count">{d.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Write a review CTA */}
                <div className="reviews-cta">
                    {!user && (
                        <div className="reviews-login-prompt">
                            <p>Sign in to leave a review</p>
                            <button
                                className="reviews-login-btn"
                                onClick={() => setIsLoginModalOpen(true)}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                Sign In
                            </button>
                        </div>
                    )}
                    {user && !hasPurchased && (
                        <div className="reviews-purchase-prompt">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                            <p>Purchase this product to leave a review</p>
                        </div>
                    )}
                    {user && hasReviewed && (
                        <div className="reviews-already-done">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                            <p>You've already reviewed this product</p>
                        </div>
                    )}
                    {canReview && !showForm && !submitted && (
                        <button className="write-review-btn" onClick={() => setShowForm(true)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                            Write a Review
                        </button>
                    )}
                    {submitted && (
                        <div className="review-submitted-msg">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                            Review submitted successfully!
                        </div>
                    )}
                </div>

                {/* Review Form */}
                {showForm && canReview && (
                    <form className="review-form" onSubmit={handleSubmit}>
                        <div className="review-form-header">
                            <h3 className="review-form-title">Write Your Review</h3>
                            <button
                                type="button"
                                className="review-form-cancel"
                                onClick={() => { setShowForm(false); setRating(0); setText(''); setImagePreview(null); }}
                            >
                                Cancel
                            </button>
                        </div>

                        <div className="review-form-field">
                            <label className="review-form-label">Rating</label>
                            <StarRatingInput value={rating} onChange={setRating} />
                            {rating === 0 && <span className="review-form-hint">Click a star to rate</span>}
                        </div>

                        <div className="review-form-field">
                            <label className="review-form-label" htmlFor="review-text">Your Review</label>
                            <textarea
                                id="review-text"
                                className="review-textarea"
                                placeholder="Share your experience with this product... (min. 10 characters)"
                                value={text}
                                onChange={e => setText(e.target.value)}
                                required
                                minLength={10}
                                maxLength={1000}
                                rows={4}
                            />
                            <span className="review-char-count">{text.length}/1000</span>
                        </div>

                        <div className="review-form-field">
                            <label className="review-form-label">Photo (Optional)</label>
                            <div className="review-image-upload">
                                {!imagePreview ? (
                                    <label className="review-upload-area" htmlFor="review-image-input">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 00-2.828 0L6 21" /></svg>
                                        <span>Click to upload an image</span>
                                        <span className="review-upload-hint">JPG, PNG up to 5MB</span>
                                        <input
                                            ref={fileInputRef}
                                            id="review-image-input"
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp"
                                            className="review-file-input"
                                            onChange={handleImageUpload}
                                        />
                                    </label>
                                ) : (
                                    <div className="review-image-preview-wrap">
                                        <img src={imagePreview} alt="Review upload preview" className="review-image-preview" />
                                        <button type="button" className="review-image-remove" onClick={removeImage} aria-label="Remove image">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`review-submit-btn${submitting ? ' submitting' : ''}`}
                            disabled={rating === 0 || text.trim().length < 10 || submitting}
                        >
                            {submitting ? (
                                <>
                                    <span className="review-spinner" />
                                    Submitting...
                                </>
                            ) : (
                                'Submit Review'
                            )}
                        </button>
                    </form>
                )}

                {/* Reviews List */}
                <div className="reviews-list">
                    {reviews.length === 0 ? (
                        <div className="reviews-empty">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
                            <p>No reviews yet</p>
                            <span>Be the first to share your thoughts</span>
                        </div>
                    ) : (
                        reviews.map(review => (
                            <div className="review-card" key={review.id}>
                                <div className="review-card-header">
                                    <div className="review-avatar" style={{ background: review.userAvatar }}>
                                        {review.userName.split(' ').map(n => n[0]).join('').toUpperCase()}
                                    </div>
                                    <div className="review-user-info">
                                        <span className="review-user-name">{review.userName}</span>
                                        <span className="review-date">{formatDate(review.date)}</span>
                                    </div>
                                    <div className="review-card-rating">
                                        <StaticStars rating={review.rating} />
                                    </div>
                                </div>
                                <p className="review-text">{review.text}</p>
                                {review.image && (
                                    <button
                                        className="review-image-thumb"
                                        onClick={() => setExpandedImage(review.image!)}
                                        aria-label="View full image"
                                    >
                                        <img src={review.image} alt="Review photo" />
                                    </button>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Image Lightbox */}
            {expandedImage && (
                <div className="review-lightbox" onClick={() => setExpandedImage(null)}>
                    <button className="review-lightbox-close" aria-label="Close image">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                    <img src={expandedImage} alt="Review photo full size" onClick={e => e.stopPropagation()} />
                </div>
            )}
        </section>
    );
}
