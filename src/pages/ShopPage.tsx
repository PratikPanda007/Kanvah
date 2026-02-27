import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterSidebar, { type Filters } from '../components/FilterSidebar';
import ProductGrid from '../components/ProductGrid';
import { PRODUCTS, type Product } from '../data/products';

interface Props {
    title: string;
    titleAccent: string;
    titleRest: string;
    subtitle: string;
    breadcrumb: string;
    onlyNew?: boolean;
    defaultSort?: string;
    searchPlaceholder?: string;
}

export default function ShopPage({ title, titleAccent, titleRest, subtitle, breadcrumb, onlyNew, defaultSort = 'featured', searchPlaceholder = 'Search products...' }: Props) {
    const [searchParams] = useSearchParams();
    const categoryParam = searchParams.get('category');

    const [filters, setFilters] = useState<Filters>({
        gender: [],
        category: categoryParam ? [categoryParam] : [],
        color: [],
        size: [],
        material: [],
        priceMin: 0,
        priceMax: 500,
    });
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState(defaultSort);
    const [filterOpen, setFilterOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (categoryParam) {
            setFilters(f => ({ ...f, category: [categoryParam] }));
        }
    }, [categoryParam]);

    const filtered = useMemo(() => {
        let list: Product[] = onlyNew ? PRODUCTS.filter(p => p.isNew || p.badge === 'new') : [...PRODUCTS];

        if (search) {
            const q = search.toLowerCase();
            list = list.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
        }
        if (filters.gender.length) list = list.filter(p => filters.gender.includes(p.gender));
        if (filters.category.length) list = list.filter(p => filters.category.includes(p.category));
        if (filters.color.length) list = list.filter(p => p.colors.some(c => filters.color.includes(c)));
        if (filters.size.length) list = list.filter(p => p.sizes.some(s => filters.size.includes(s)));
        if (filters.material.length) list = list.filter(p => filters.material.includes(p.material));
        list = list.filter(p => p.price >= filters.priceMin && p.price <= filters.priceMax);

        switch (sort) {
            case 'newest': list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
            case 'price-low': list.sort((a, b) => a.price - b.price); break;
            case 'price-high': list.sort((a, b) => b.price - a.price); break;
            case 'name-az': list.sort((a, b) => a.name.localeCompare(b.name)); break;
            default: list.sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0));
        }
        return list;
    }, [filters, search, sort, onlyNew]);

    const activeFilterTags = useMemo(() => {
        const tags: { type: string; value: string; label: string }[] = [];
        (['gender', 'category', 'color', 'size', 'material'] as const).forEach(type => {
            filters[type].forEach(v => tags.push({ type, value: v, label: v }));
        });
        if (search) tags.push({ type: 'search', value: search, label: `"${search}"` });
        if (filters.priceMax < 500 || filters.priceMin > 0) tags.push({ type: 'price', value: 'range', label: `$${filters.priceMin} — $${filters.priceMax}` });
        return tags;
    }, [filters, search]);

    const removeTag = (type: string, value: string) => {
        if (type === 'search') { setSearch(''); return; }
        if (type === 'price') { setFilters(f => ({ ...f, priceMin: 0, priceMax: 500 })); return; }
        setFilters(f => ({ ...f, [type]: (f as any)[type].filter((v: string) => v !== value) }));
    };

    return (
        <>
            <header className="page-header">
                <div className="section-container">
                    <p className="page-breadcrumb"><a href="/">Home</a> / <span>{breadcrumb}</span></p>
                    <h1 className="page-title">{title}<span className="title-k">{titleAccent}</span>{titleRest}</h1>
                    <p className="page-subtitle">{subtitle}</p>
                </div>
            </header>

            <div className="shop-layout">
                <FilterSidebar filters={filters} onChange={setFilters} isOpen={filterOpen} onClose={() => setFilterOpen(false)} />

                <main className="shop-content">
                    <div className="shop-toolbar">
                        <button className="filter-toggle-btn" onClick={() => setFilterOpen(true)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" /></svg>
                            Filters
                        </button>
                        <div className="shop-search">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                            <input type="text" className="shop-search-input" placeholder={searchPlaceholder} value={search} onChange={e => setSearch(e.target.value)} />
                        </div>
                        <div className="shop-meta">
                            <span className="shop-count">Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}</span>
                            <select className="shop-sort" value={sort} onChange={e => setSort(e.target.value)}>
                                <option value="featured">Featured</option>
                                <option value="newest">Newest</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="name-az">Name: A-Z</option>
                            </select>
                        </div>
                    </div>

                    {activeFilterTags.length > 0 && (
                        <div className="active-filters">
                            {activeFilterTags.map((tag, i) => (
                                <span className="active-filter-tag" key={i}>
                                    {tag.label}
                                    <button onClick={() => removeTag(tag.type, tag.value)} aria-label="Remove filter">×</button>
                                </span>
                            ))}
                        </div>
                    )}

                    <ProductGrid products={filtered} />

                    <div className="pagination">
                        <button className="pagination-btn disabled">←</button>
                        <button className="pagination-btn active">1</button>
                        <button className="pagination-btn">2</button>
                        <button className="pagination-btn">3</button>
                        <button className="pagination-btn">→</button>
                    </div>
                </main>
            </div>
        </>
    );
}
