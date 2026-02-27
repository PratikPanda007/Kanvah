import { useState } from 'react';

export interface Filters {
    gender: string[];
    category: string[];
    color: string[];
    size: string[];
    material: string[];
    priceMin: number;
    priceMax: number;
}

interface Props {
    filters: Filters;
    onChange: (filters: Filters) => void;
    isOpen: boolean;
    onClose: () => void;
}

const CHEVRON = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
);

export default function FilterSidebar({ filters, onChange, isOpen, onClose }: Props) {
    const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

    const toggle = (key: string) => setCollapsed(p => ({ ...p, [key]: !p[key] }));

    const toggleFilter = (type: keyof Omit<Filters, 'priceMin' | 'priceMax'>, value: string) => {
        const arr = filters[type];
        const next = arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];
        onChange({ ...filters, [type]: next });
    };

    const clearAll = () => {
        onChange({ gender: [], category: [], color: [], size: [], material: [], priceMin: 0, priceMax: 500 });
    };

    return (
        <>
            <div className={`filter-overlay${isOpen ? ' open' : ''}`} onClick={onClose} />
            <aside className={`filter-sidebar${isOpen ? ' open' : ''}`}>
                <div className="filter-header">
                    <h3>Filters</h3>
                    <button className="filter-clear" onClick={clearAll}>Clear All</button>
                </div>

                {/* Gender */}
                <div className={`filter-group${collapsed.gender ? ' collapsed' : ''}`}>
                    <div className="filter-group-title" onClick={() => toggle('gender')}>Gender {CHEVRON}</div>
                    <div className="filter-options">
                        {['men', 'women', 'unisex'].map(v => (
                            <div key={v} className={`filter-option${filters.gender.includes(v) ? ' active' : ''}`} onClick={() => toggleFilter('gender', v)}>
                                <div className="filter-checkbox" /><span>{v.charAt(0).toUpperCase() + v.slice(1)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Category */}
                <div className={`filter-group${collapsed.category ? ' collapsed' : ''}`}>
                    <div className="filter-group-title" onClick={() => toggle('category')}>Category {CHEVRON}</div>
                    <div className="filter-options">
                        {[['hoodies', 'Hoodies'], ['outerwear', 'Jackets & Outerwear'], ['techwear', 'Tech-Wear'], ['essentials', 'Essentials'], ['accessories', 'Accessories']].map(([v, l]) => (
                            <div key={v} className={`filter-option${filters.category.includes(v) ? ' active' : ''}`} onClick={() => toggleFilter('category', v)}>
                                <div className="filter-checkbox" /><span>{l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Color */}
                <div className={`filter-group${collapsed.color ? ' collapsed' : ''}`}>
                    <div className="filter-group-title" onClick={() => toggle('color')}>Color {CHEVRON}</div>
                    <div className="filter-options color-swatches">
                        {['black', 'white', 'gray', 'red', 'navy', 'olive', 'brown', 'beige'].map(c => (
                            <div key={c} className={`color-swatch${filters.color.includes(c) ? ' active' : ''}`} data-color={c} title={c} onClick={() => toggleFilter('color', c)} />
                        ))}
                    </div>
                </div>

                {/* Size */}
                <div className={`filter-group${collapsed.size ? ' collapsed' : ''}`}>
                    <div className="filter-group-title" onClick={() => toggle('size')}>Size {CHEVRON}</div>
                    <div className="filter-options size-chips">
                        {['xs', 's', 'm', 'l', 'xl', 'xxl'].map(s => (
                            <div key={s} className={`size-chip${filters.size.includes(s) ? ' active' : ''}`} onClick={() => toggleFilter('size', s)}>{s.toUpperCase()}</div>
                        ))}
                    </div>
                </div>

                {/* Price Range */}
                <div className={`filter-group${collapsed.price ? ' collapsed' : ''}`}>
                    <div className="filter-group-title" onClick={() => toggle('price')}>Price Range {CHEVRON}</div>
                    <div className="filter-options price-range">
                        <div className="price-inputs">
                            <input type="number" className="price-input" placeholder="$0" min="0" value={filters.priceMin}
                                onChange={e => onChange({ ...filters, priceMin: parseInt(e.target.value) || 0 })} />
                            <span className="price-separator">—</span>
                            <input type="number" className="price-input" placeholder="$500" min="0" value={filters.priceMax}
                                onChange={e => onChange({ ...filters, priceMax: parseInt(e.target.value) || 500 })} />
                        </div>
                        <input type="range" className="price-slider" min="0" max="500" value={filters.priceMax}
                            onChange={e => onChange({ ...filters, priceMax: parseInt(e.target.value) })} />
                    </div>
                </div>

                {/* Material */}
                <div className={`filter-group${collapsed.material ? ' collapsed' : ''}`}>
                    <div className="filter-group-title" onClick={() => toggle('material')}>Material {CHEVRON}</div>
                    <div className="filter-options">
                        {['cotton', 'nylon', 'polyester', 'fleece'].map(v => (
                            <div key={v} className={`filter-option${filters.material.includes(v) ? ' active' : ''}`} onClick={() => toggleFilter('material', v)}>
                                <div className="filter-checkbox" /><span>{v.charAt(0).toUpperCase() + v.slice(1)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>
        </>
    );
}
