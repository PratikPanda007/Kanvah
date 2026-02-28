export interface Product {
    id: number;
    name: string;
    category: string;
    gender: string;
    colors: string[];
    sizes: string[];
    price: number;
    material: string;
    image: string;
    images: string[];
    badge: 'new' | 'sale' | 'limited' | null;
    isNew?: boolean;
    originalPrice?: number;
    description: string;
    details: string[];
    rating: number;
    reviewCount: number;
}

export const COLOR_HEX: Record<string, string> = {
    black: '#1a1a1a',
    white: '#f0f0f0',
    gray: '#666',
    red: '#c81020',
    navy: '#1a2744',
    olive: '#4a5a3a',
    brown: '#6b4226',
    beige: '#c8b890',
};

export const PRODUCTS: Product[] = [
    {
        id: 1, name: 'Shadow Hoodie', category: 'hoodies', gender: 'unisex',
        colors: ['black', 'gray'], sizes: ['s', 'm', 'l', 'xl'], price: 189, material: 'cotton',
        image: '/assets/images/collection-4.png',
        images: ['/assets/images/collection-4.png', '/assets/images/collection-3.png', '/assets/images/collection-1.png'],
        badge: 'new', isNew: true,
        description: 'The Shadow Hoodie blends stealth aesthetics with premium comfort. Crafted from heavyweight 400gsm organic cotton, this piece features a relaxed oversized silhouette, reinforced seams, and a subtle embossed Kanvah logo at the chest. Perfect for layering or wearing solo.',
        details: ['400gsm heavyweight organic cotton', 'Oversized relaxed fit', 'Embossed chest logo', 'Ribbed cuffs and hem', 'Kangaroo pocket with hidden zip'],
        rating: 4.8, reviewCount: 124,
    },
    {
        id: 2, name: 'Storm Jacket', category: 'outerwear', gender: 'men',
        colors: ['black', 'navy'], sizes: ['m', 'l', 'xl', 'xxl'], price: 249, material: 'nylon',
        image: '/assets/images/collection-1.png',
        images: ['/assets/images/collection-1.png', '/assets/images/collection-2.png', '/assets/images/collection-3.png'],
        badge: 'new', isNew: true,
        description: 'Engineered to handle the elements. The Storm Jacket features a water-resistant ripstop nylon shell with sealed seams, adjustable hood, and multiple utility pockets. A modern tactical silhouette designed for the urban explorer.',
        details: ['Water-resistant ripstop nylon', 'Sealed seams construction', 'Adjustable hood and cuffs', 'YKK® zippers throughout', 'Internal mesh lining'],
        rating: 4.9, reviewCount: 89,
    },
    {
        id: 3, name: 'Tactical Vest', category: 'techwear', gender: 'men',
        colors: ['black', 'olive'], sizes: ['s', 'm', 'l', 'xl'], price: 159, material: 'nylon',
        image: '/assets/images/collection-2.png',
        images: ['/assets/images/collection-2.png', '/assets/images/collection-1.png', '/assets/images/collection-4.png'],
        badge: 'new', isNew: true,
        description: 'Functional meets fashionable. This tactical vest features modular MOLLE-inspired webbing, 6 utility pockets, and quick-release buckles. Made from durable cordura nylon with a DWR finish for light rain protection.',
        details: ['Cordura® nylon with DWR finish', 'MOLLE-inspired webbing system', '6 utility pockets', 'Quick-release buckle closure', 'Adjustable side straps'],
        rating: 4.6, reviewCount: 67,
    },
    {
        id: 4, name: 'Venom Parka', category: 'outerwear', gender: 'unisex',
        colors: ['black', 'red'], sizes: ['m', 'l', 'xl'], price: 319, material: 'polyester',
        image: '/assets/images/collection-3.png',
        images: ['/assets/images/collection-3.png', '/assets/images/collection-1.png', '/assets/images/collection-2.png'],
        badge: 'new', isNew: true,
        description: 'The statement piece of SS26. The Venom Parka combines aggressive street styling with technical insulation. Features a fishtail hem, storm flap, and tonal venom graphic embroidery. Synthetic insulation rated to -10°C.',
        details: ['Synthetic insulation (-10°C rated)', 'Fishtail hem silhouette', 'Storm flap with snap closure', 'Tonal venom embroidery', 'Detachable faux-fur hood trim'],
        rating: 4.7, reviewCount: 45,
    },
    {
        id: 5, name: 'Stealth Bomber', category: 'outerwear', gender: 'men',
        colors: ['black', 'gray', 'navy'], sizes: ['s', 'm', 'l', 'xl', 'xxl'], price: 279, material: 'nylon',
        image: '/assets/images/collection-1.png',
        images: ['/assets/images/collection-1.png', '/assets/images/collection-3.png', '/assets/images/collection-4.png'],
        badge: 'limited',
        description: 'A modern take on the classic MA-1 silhouette. The Stealth Bomber features a matte nylon shell, quilted lining, and signature Kanvah arm patch. Limited production run — once it\'s gone, it\'s gone.',
        details: ['Matte nylon shell', 'Quilted satin lining', 'Kanvah arm patch detail', 'Ribbed collar, cuffs, and hem', 'Interior zip pocket'],
        rating: 4.9, reviewCount: 203,
    },
    {
        id: 6, name: 'Midnight Pullover', category: 'hoodies', gender: 'women',
        colors: ['black', 'white', 'beige'], sizes: ['xs', 's', 'm', 'l'], price: 149, material: 'fleece',
        image: '/assets/images/collection-4.png',
        images: ['/assets/images/collection-4.png', '/assets/images/collection-2.png', '/assets/images/collection-3.png'],
        badge: null,
        description: 'Ultra-soft brushed fleece meets minimal design. The Midnight Pullover features a mock neck, dropped shoulders, and a relaxed cropped fit. A versatile layering piece for any season.',
        details: ['Brushed fleece interior', 'Mock neck design', 'Dropped shoulder construction', 'Relaxed cropped fit', 'Tonal logo embroidery'],
        rating: 4.5, reviewCount: 156,
    },
    {
        id: 7, name: 'Edge Cargo Pants', category: 'techwear', gender: 'men',
        colors: ['black', 'olive', 'gray'], sizes: ['s', 'm', 'l', 'xl'], price: 179, material: 'cotton',
        image: '/assets/images/collection-2.png',
        images: ['/assets/images/collection-2.png', '/assets/images/collection-1.png', '/assets/images/collection-3.png'],
        badge: null,
        description: 'Utility-driven design with a tapered silhouette. The Edge Cargo Pants feature 8 pockets, adjustable ankle cuffs, and a gusseted crotch for unrestricted movement. Made from stretch cotton ripstop.',
        details: ['Stretch cotton ripstop', '8-pocket design', 'Gusseted crotch', 'Adjustable ankle cuffs', 'YKK® zippers on cargo pockets'],
        rating: 4.4, reviewCount: 98,
    },
    {
        id: 8, name: 'Core Tee', category: 'essentials', gender: 'unisex',
        colors: ['black', 'white', 'red', 'gray'], sizes: ['xs', 's', 'm', 'l', 'xl', 'xxl'], price: 69, material: 'cotton',
        image: '/assets/images/collection-3.png',
        images: ['/assets/images/collection-3.png', '/assets/images/collection-4.png', '/assets/images/collection-1.png'],
        badge: null,
        description: 'The foundation of every fit. Premium 220gsm cotton, pre-shrunk and garment-dyed for that lived-in feel from day one. Features a reinforced neck and slightly elongated body.',
        details: ['220gsm premium cotton', 'Garment-dyed finish', 'Reinforced neck seam', 'Slightly elongated body', 'Printed neck label'],
        rating: 4.7, reviewCount: 312,
    },
    {
        id: 9, name: 'Phantom Shell', category: 'outerwear', gender: 'men',
        colors: ['black', 'navy'], sizes: ['m', 'l', 'xl'], price: 349, material: 'nylon',
        image: '/assets/images/collection-1.png',
        images: ['/assets/images/collection-1.png', '/assets/images/collection-2.png', '/assets/images/collection-4.png'],
        badge: 'limited',
        description: 'Our most technical outerwear piece. The Phantom Shell features a 3-layer waterproof breathable membrane, fully taped seams, and pit zips for ventilation. Minimalist design, maximum performance.',
        details: ['3-layer waterproof membrane', 'Fully taped seams', 'Pit zips for ventilation', 'Adjustable hood and hem', 'Packable into chest pocket'],
        rating: 4.8, reviewCount: 34,
    },
    {
        id: 10, name: 'Drift Hoodie', category: 'hoodies', gender: 'women',
        colors: ['gray', 'beige', 'white'], sizes: ['xs', 's', 'm', 'l'], price: 169, material: 'cotton',
        image: '/assets/images/collection-4.png',
        images: ['/assets/images/collection-4.png', '/assets/images/collection-3.png', '/assets/images/collection-2.png'],
        badge: null,
        description: 'Effortless comfort with a feminine edge. The Drift Hoodie features a boxy fit, contrast drawcords, and a washed finish that gives each piece a unique character. Made from 350gsm French terry.',
        details: ['350gsm French terry cotton', 'Boxy relaxed fit', 'Contrast drawcord detail', 'Washed vintage finish', 'Side-seam pockets'],
        rating: 4.6, reviewCount: 187,
    },
    {
        id: 11, name: 'Urban Tech Jacket', category: 'techwear', gender: 'unisex',
        colors: ['black', 'olive'], sizes: ['s', 'm', 'l', 'xl'], price: 229, material: 'polyester',
        image: '/assets/images/collection-2.png',
        images: ['/assets/images/collection-2.png', '/assets/images/collection-1.png', '/assets/images/collection-3.png'],
        badge: 'sale', originalPrice: 289,
        description: 'Where tech meets street. The Urban Tech Jacket features a mechanical stretch shell, magnetic closure system, and reflective accents. Built for movement with articulated sleeves and a gusseted back.',
        details: ['Mechanical stretch polyester', 'Magnetic snap closure', 'Reflective accent details', 'Articulated sleeve construction', 'Internal media pocket'],
        rating: 4.3, reviewCount: 76,
    },
    {
        id: 12, name: 'Flux Joggers', category: 'essentials', gender: 'unisex',
        colors: ['black', 'gray'], sizes: ['s', 'm', 'l', 'xl'], price: 119, material: 'fleece',
        image: '/assets/images/collection-3.png',
        images: ['/assets/images/collection-3.png', '/assets/images/collection-4.png', '/assets/images/collection-2.png'],
        badge: null,
        description: 'All-day comfort, zero compromises. The Flux Joggers feature a tapered fit with elasticated cuffs, side zip pockets, and a brushed fleece interior. Your new everyday essential.',
        details: ['Brushed fleece interior', 'Tapered fit with elasticated cuffs', 'Side zip pockets', 'Flat drawcord waistband', 'Woven Kanvah tab'],
        rating: 4.5, reviewCount: 234,
    },
    {
        id: 13, name: 'Onyx Windbreaker', category: 'outerwear', gender: 'men',
        colors: ['black', 'red'], sizes: ['m', 'l', 'xl', 'xxl'], price: 199, material: 'nylon',
        image: '/assets/images/collection-1.png',
        images: ['/assets/images/collection-1.png', '/assets/images/collection-3.png', '/assets/images/collection-2.png'],
        badge: null,
        description: 'Lightweight protection with aggressive styling. The Onyx Windbreaker features a half-zip design, mesh-lined hood, and packable construction. Bold colorblocking makes it a standout piece.',
        details: ['Lightweight ripstop nylon', 'Half-zip pullover design', 'Mesh-lined hood', 'Packable into front pocket', 'Elastic hem and cuffs'],
        rating: 4.4, reviewCount: 112,
    },
    {
        id: 14, name: 'Crimson Hoodie', category: 'hoodies', gender: 'unisex',
        colors: ['red', 'black'], sizes: ['s', 'm', 'l', 'xl'], price: 189, material: 'cotton',
        image: '/assets/images/collection-4.png',
        images: ['/assets/images/collection-4.png', '/assets/images/collection-1.png', '/assets/images/collection-3.png'],
        badge: null,
        description: 'Make a statement in Kanvah crimson. This heavyweight hoodie features a double-layered hood, reinforced kangaroo pocket, and puff-print Kanvah branding. Bold color, premium construction.',
        details: ['400gsm heavyweight cotton', 'Double-layered hood', 'Puff-print branding', 'Reinforced kangaroo pocket', 'Heavy-gauge ribbed trim'],
        rating: 4.7, reviewCount: 143,
    },
    {
        id: 15, name: 'Signal Vest', category: 'techwear', gender: 'women',
        colors: ['black', 'white'], sizes: ['xs', 's', 'm', 'l'], price: 139, material: 'nylon',
        image: '/assets/images/collection-2.png',
        images: ['/assets/images/collection-2.png', '/assets/images/collection-4.png', '/assets/images/collection-1.png'],
        badge: 'sale', originalPrice: 179,
        description: 'Sleek utility meets feminine silhouette. The Signal Vest features a tailored cut, contrast stitching, and snap-button cargo pockets. Lightweight enough for layering, bold enough to stand alone.',
        details: ['Lightweight nylon construction', 'Tailored feminine cut', 'Contrast stitching detail', 'Snap-button cargo pockets', 'Adjustable internal drawcord'],
        rating: 4.2, reviewCount: 58,
    },
    {
        id: 16, name: 'Monolith Coat', category: 'outerwear', gender: 'men',
        colors: ['black', 'brown'], sizes: ['m', 'l', 'xl'], price: 399, material: 'polyester',
        image: '/assets/images/collection-1.png',
        images: ['/assets/images/collection-1.png', '/assets/images/collection-2.png', '/assets/images/collection-3.png'],
        badge: 'limited',
        description: 'The pinnacle of Kanvah outerwear. The Monolith Coat features a structured below-knee silhouette, storm collar, and premium hardware. Filled with recycled synthetic insulation for warmth without weight.',
        details: ['Recycled polyester shell', 'Recycled synthetic insulation', 'Below-knee length', 'Storm collar with snap closure', 'Premium gunmetal hardware'],
        rating: 4.9, reviewCount: 27,
    },
    {
        id: 17, name: 'Base Layer Tee', category: 'essentials', gender: 'unisex',
        colors: ['black', 'white', 'gray', 'navy'], sizes: ['xs', 's', 'm', 'l', 'xl', 'xxl'], price: 59, material: 'cotton',
        image: '/assets/images/collection-3.png',
        images: ['/assets/images/collection-3.png', '/assets/images/collection-2.png', '/assets/images/collection-4.png'],
        badge: null,
        description: 'Your wardrobe\'s workhorse. The Base Layer Tee is made from smooth 180gsm Supima cotton with a slim fit and clean finish. No tags, no fuss — just a perfect tee.',
        details: ['180gsm Supima cotton', 'Slim fit silhouette', 'Tagless interior', 'Clean-finish seams', 'Pre-washed for softness'],
        rating: 4.6, reviewCount: 467,
    },
    {
        id: 18, name: 'Apex Hoodie', category: 'hoodies', gender: 'men',
        colors: ['black', 'navy', 'gray'], sizes: ['m', 'l', 'xl', 'xxl'], price: 209, material: 'fleece',
        image: '/assets/images/collection-4.png',
        images: ['/assets/images/collection-4.png', '/assets/images/collection-1.png', '/assets/images/collection-2.png'],
        badge: null,
        description: 'The ultimate performance hoodie. The Apex features a tech-fleece construction with bonded seams, zippered side pockets, and a scuba-style hood. Streamlined design for the modern minimalist.',
        details: ['Tech-fleece construction', 'Bonded seam technology', 'Scuba-style hood', 'Zippered side pockets', 'Laser-cut ventilation panels'],
        rating: 4.8, reviewCount: 91,
    },
    {
        id: 19, name: 'Gray Vest', category: 'techwear', gender: 'women',
        colors: ['gray', 'white'], sizes: ['xs', 's', 'm', 'l'], price: 139, material: 'nylon',
        image: '/assets/images/collection-5.jpeg',
        images: ['/assets/images/collection-5.jpeg', '/assets/images/collection-2.png', '/assets/images/collection-4.png'],
        badge: 'sale', originalPrice: 179,
        description: 'Understated utility in a neutral palette. The Gray Vest features padded construction, hidden magnetic closures, and articulated back panel for movement. A contemporary take on the classic gilet.',
        details: ['Padded nylon construction', 'Hidden magnetic closures', 'Articulated back panel', 'Fleece-lined hand pockets', 'Reflective back tab'],
        rating: 4.3, reviewCount: 42,
    },
];
