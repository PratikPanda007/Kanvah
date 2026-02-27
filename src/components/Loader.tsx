import { useEffect, useState } from 'react';

export default function Loader() {
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setHidden(true), 2400);
        return () => clearTimeout(timer);
    }, []);

    if (hidden) return null;

    return (
        <div id="loader" className={`loader${hidden ? ' hidden' : ''}`}>
            <div className="loader-brand">
                <span className="loader-k">K</span><span className="loader-rest">ANVAH</span>
            </div>
            <div className="loader-bar">
                <div className="loader-bar-fill"></div>
            </div>
        </div>
    );
}
