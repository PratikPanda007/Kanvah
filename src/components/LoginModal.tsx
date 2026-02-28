import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginModal() {
    const { isLoginModalOpen, setIsLoginModalOpen, login, signup } = useAuth();
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    if (!isLoginModalOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (mode === 'login') {
            const result = login(email, password);
            if (!result.success) setError(result.error || 'Login failed');
        } else {
            const result = signup(name, email, password);
            if (!result.success) setError(result.error || 'Signup failed');
        }
    };

    const switchMode = () => {
        setMode(mode === 'login' ? 'signup' : 'login');
        setError('');
        setName('');
        setEmail('');
        setPassword('');
    };

    const handleClose = () => {
        setIsLoginModalOpen(false);
        setError('');
        setName('');
        setEmail('');
        setPassword('');
        setMode('login');
    };

    return (
        <>
            <div className="auth-overlay" onClick={handleClose} />
            <div className="auth-modal">
                <button className="auth-modal-close" onClick={handleClose} aria-label="Close">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </button>

                <div className="auth-modal-header">
                    <div className="auth-logo">
                        <span className="logo-k">K</span><span className="logo-rest">ANVAH</span>
                    </div>
                    <h2 className="auth-title">
                        {mode === 'login' ? 'Welcome Back' : 'Join Kanvah'}
                    </h2>
                    <p className="auth-subtitle">
                        {mode === 'login'
                            ? 'Sign in to your account to continue'
                            : 'Create an account to leave reviews and more'
                        }
                    </p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    {mode === 'signup' && (
                        <div className="auth-field">
                            <label className="auth-label" htmlFor="auth-name">Full Name</label>
                            <div className="auth-input-wrap">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                <input
                                    id="auth-name"
                                    type="text"
                                    className="auth-input"
                                    placeholder="Your name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    required
                                    autoComplete="name"
                                />
                            </div>
                        </div>
                    )}

                    <div className="auth-field">
                        <label className="auth-label" htmlFor="auth-email">Email Address</label>
                        <div className="auth-input-wrap">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" /></svg>
                            <input
                                id="auth-email"
                                type="email"
                                className="auth-input"
                                placeholder="you@example.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                            />
                        </div>
                    </div>

                    <div className="auth-field">
                        <label className="auth-label" htmlFor="auth-password">Password</label>
                        <div className="auth-input-wrap">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
                            <input
                                id="auth-password"
                                type={showPassword ? 'text' : 'password'}
                                className="auth-input"
                                placeholder={mode === 'login' ? 'Enter your password' : 'Min. 6 characters'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                minLength={6}
                                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                            />
                            <button
                                type="button"
                                className="auth-toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                                ) : (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="auth-error">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                            {error}
                        </div>
                    )}

                    <button type="submit" className="auth-submit-btn">
                        {mode === 'login' ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                <div className="auth-switch">
                    <span>{mode === 'login' ? "Don't have an account?" : 'Already have an account?'}</span>
                    <button className="auth-switch-btn" onClick={switchMode}>
                        {mode === 'login' ? 'Sign Up' : 'Sign In'}
                    </button>
                </div>

                {mode === 'login' && (
                    <div className="auth-demo-hint">
                        <p className="auth-demo-title">Demo accounts:</p>
                        <p className="auth-demo-cred">alex@example.com / password123</p>
                        <p className="auth-demo-cred">morgan@example.com / password123</p>
                    </div>
                )}
            </div>
        </>
    );
}
