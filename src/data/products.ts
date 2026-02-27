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
    badge: 'new' | 'sale' | 'limited' | null;
    isNew?: boolean;
    originalPrice?: number;
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
    { id: 1, name: 'Shadow Hoodie', category: 'hoodies', gender: 'unisex', colors: ['black', 'gray'], sizes: ['s', 'm', 'l', 'xl'], price: 189, material: 'cotton', image: '/assets/images/collection-4.png', badge: 'new', isNew: true },
    { id: 2, name: 'Storm Jacket', category: 'outerwear', gender: 'men', colors: ['black', 'navy'], sizes: ['m', 'l', 'xl', 'xxl'], price: 249, material: 'nylon', image: '/assets/images/collection-1.png', badge: 'new', isNew: true },
    { id: 3, name: 'Tactical Vest', category: 'techwear', gender: 'men', colors: ['black', 'olive'], sizes: ['s', 'm', 'l', 'xl'], price: 159, material: 'nylon', image: '/assets/images/collection-2.png', badge: 'new', isNew: true },
    { id: 4, name: 'Venom Parka', category: 'outerwear', gender: 'unisex', colors: ['black', 'red'], sizes: ['m', 'l', 'xl'], price: 319, material: 'polyester', image: '/assets/images/collection-3.png', badge: 'new', isNew: true },
    { id: 5, name: 'Stealth Bomber', category: 'outerwear', gender: 'men', colors: ['black', 'gray', 'navy'], sizes: ['s', 'm', 'l', 'xl', 'xxl'], price: 279, material: 'nylon', image: '/assets/images/collection-1.png', badge: 'limited' },
    { id: 6, name: 'Midnight Pullover', category: 'hoodies', gender: 'women', colors: ['black', 'white', 'beige'], sizes: ['xs', 's', 'm', 'l'], price: 149, material: 'fleece', image: '/assets/images/collection-4.png', badge: null },
    { id: 7, name: 'Edge Cargo Pants', category: 'techwear', gender: 'men', colors: ['black', 'olive', 'gray'], sizes: ['s', 'm', 'l', 'xl'], price: 179, material: 'cotton', image: '/assets/images/collection-2.png', badge: null },
    { id: 8, name: 'Core Tee', category: 'essentials', gender: 'unisex', colors: ['black', 'white', 'red', 'gray'], sizes: ['xs', 's', 'm', 'l', 'xl', 'xxl'], price: 69, material: 'cotton', image: '/assets/images/collection-3.png', badge: null },
    { id: 9, name: 'Phantom Shell', category: 'outerwear', gender: 'men', colors: ['black', 'navy'], sizes: ['m', 'l', 'xl'], price: 349, material: 'nylon', image: '/assets/images/collection-1.png', badge: 'limited' },
    { id: 10, name: 'Drift Hoodie', category: 'hoodies', gender: 'women', colors: ['gray', 'beige', 'white'], sizes: ['xs', 's', 'm', 'l'], price: 169, material: 'cotton', image: '/assets/images/collection-4.png', badge: null },
    { id: 11, name: 'Urban Tech Jacket', category: 'techwear', gender: 'unisex', colors: ['black', 'olive'], sizes: ['s', 'm', 'l', 'xl'], price: 229, material: 'polyester', image: '/assets/images/collection-2.png', badge: 'sale', originalPrice: 289 },
    { id: 12, name: 'Flux Joggers', category: 'essentials', gender: 'unisex', colors: ['black', 'gray'], sizes: ['s', 'm', 'l', 'xl'], price: 119, material: 'fleece', image: '/assets/images/collection-3.png', badge: null },
    { id: 13, name: 'Onyx Windbreaker', category: 'outerwear', gender: 'men', colors: ['black', 'red'], sizes: ['m', 'l', 'xl', 'xxl'], price: 199, material: 'nylon', image: '/assets/images/collection-1.png', badge: null },
    { id: 14, name: 'Crimson Hoodie', category: 'hoodies', gender: 'unisex', colors: ['red', 'black'], sizes: ['s', 'm', 'l', 'xl'], price: 189, material: 'cotton', image: '/assets/images/collection-4.png', badge: null },
    { id: 15, name: 'Signal Vest', category: 'techwear', gender: 'women', colors: ['black', 'white'], sizes: ['xs', 's', 'm', 'l'], price: 139, material: 'nylon', image: '/assets/images/collection-2.png', badge: 'sale', originalPrice: 179 },
    { id: 16, name: 'Monolith Coat', category: 'outerwear', gender: 'men', colors: ['black', 'brown'], sizes: ['m', 'l', 'xl'], price: 399, material: 'polyester', image: '/assets/images/collection-1.png', badge: 'limited' },
    { id: 17, name: 'Base Layer Tee', category: 'essentials', gender: 'unisex', colors: ['black', 'white', 'gray', 'navy'], sizes: ['xs', 's', 'm', 'l', 'xl', 'xxl'], price: 59, material: 'cotton', image: '/assets/images/collection-3.png', badge: null },
    { id: 18, name: 'Apex Hoodie', category: 'hoodies', gender: 'men', colors: ['black', 'navy', 'gray'], sizes: ['m', 'l', 'xl', 'xxl'], price: 209, material: 'fleece', image: '/assets/images/collection-4.png', badge: null },
    { id: 19, name: 'Gray Vest', category: 'techwear', gender: 'women', colors: ['gray', 'white'], sizes: ['xs', 's', 'm', 'l'], price: 139, material: 'nylon', image: '/assets/images/collection-5.jpeg', badge: 'sale', originalPrice: 179 },
];
