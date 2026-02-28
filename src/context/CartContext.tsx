import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Product } from '../data/products';

export interface CartItem {
    product: Product;
    quantity: number;
    selectedSize: string;
    selectedColor: string;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product, size: string, color: string) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = useCallback((product: Product, size: string, color: string) => {
        setItems(prev => {
            const existing = prev.find(
                i => i.product.id === product.id && i.selectedSize === size && i.selectedColor === color
            );
            if (existing) {
                return prev.map(i =>
                    i.product.id === product.id && i.selectedSize === size && i.selectedColor === color
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }
            return [...prev, { product, quantity: 1, selectedSize: size, selectedColor: color }];
        });
        setIsCartOpen(true);
    }, []);

    const removeFromCart = useCallback((productId: number) => {
        setItems(prev => prev.filter(i => i.product.id !== productId));
    }, []);

    const updateQuantity = useCallback((productId: number, quantity: number) => {
        if (quantity <= 0) {
            setItems(prev => prev.filter(i => i.product.id !== productId));
        } else {
            setItems(prev => prev.map(i =>
                i.product.id === productId ? { ...i, quantity } : i
            ));
        }
    }, []);

    const clearCart = useCallback(() => setItems([]), []);

    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

    return (
        <CartContext.Provider value={{
            items, addToCart, removeFromCart, updateQuantity, clearCart,
            totalItems, totalPrice, isCartOpen, setIsCartOpen,
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within a CartProvider');
    return ctx;
}
