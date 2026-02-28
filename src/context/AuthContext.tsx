import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

export interface Address {
    fullName: string;
    phone: string;
    street: string;
    apartment: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    purchasedProductIds: number[];
    address?: Address;
}

interface AuthContextType {
    user: User | null;
    isLoginModalOpen: boolean;
    setIsLoginModalOpen: (open: boolean) => void;
    isAddressModalOpen: boolean;
    setIsAddressModalOpen: (open: boolean) => void;
    login: (email: string, password: string) => { success: boolean; error?: string };
    signup: (name: string, email: string, password: string) => { success: boolean; error?: string };
    logout: () => void;
    updateAddress: (address: Address) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Generate avatar initials color from name
function getAvatarColor(name: string): string {
    const colors = ['#c81020', '#1a8a3e', '#2563eb', '#9333ea', '#ea580c', '#0891b2', '#be185d'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
}

// Simulated user database (localStorage-backed)
function getUsers(): Array<User & { password: string }> {
    try {
        return JSON.parse(localStorage.getItem('kanvah_users') || '[]');
    } catch { return []; }
}

function saveUsers(users: Array<User & { password: string }>) {
    localStorage.setItem('kanvah_users', JSON.stringify(users));
}

// Seed demo users on first load
function seedDemoUsers() {
    const existing = getUsers();
    if (existing.length > 0) return;

    const demoUsers: Array<User & { password: string }> = [
        {
            id: 'demo-user-1',
            name: 'Alex Rivera',
            email: 'alex@example.com',
            password: 'password123',
            avatar: getAvatarColor('Alex Rivera'),
            purchasedProductIds: [1, 2, 5, 8, 12],
            address: {
                fullName: 'Alex Rivera',
                phone: '+1 (555) 123-4567',
                street: '742 Evergreen Terrace',
                apartment: 'Apt 3B',
                city: 'Los Angeles',
                state: 'CA',
                zip: '90001',
                country: 'United States',
            },
        },
        {
            id: 'demo-user-2',
            name: 'Morgan Chen',
            email: 'morgan@example.com',
            password: 'password123',
            avatar: getAvatarColor('Morgan Chen'),
            purchasedProductIds: [1, 3, 4, 7, 11, 14],
        },
        {
            id: 'demo-user-3',
            name: 'Jordan Taylor',
            email: 'jordan@example.com',
            password: 'password123',
            avatar: getAvatarColor('Jordan Taylor'),
            purchasedProductIds: [2, 6, 9, 10, 16],
        },
    ];
    saveUsers(demoUsers);
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

    // Seed demo users and restore session on mount
    useEffect(() => {
        seedDemoUsers();
        try {
            const savedSession = localStorage.getItem('kanvah_session');
            if (savedSession) {
                const parsed = JSON.parse(savedSession);
                const users = getUsers();
                const found = users.find(u => u.id === parsed.id);
                if (found) {
                    const { password: _, ...userWithoutPassword } = found;
                    setUser(userWithoutPassword);
                }
            }
        } catch { /* ignore */ }
    }, []);

    const login = useCallback((email: string, password: string): { success: boolean; error?: string } => {
        const users = getUsers();
        const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
        if (!found) return { success: false, error: 'Invalid email or password' };

        const { password: _, ...userWithoutPassword } = found;
        setUser(userWithoutPassword);
        localStorage.setItem('kanvah_session', JSON.stringify({ id: found.id }));
        setIsLoginModalOpen(false);
        return { success: true };
    }, []);

    const signup = useCallback((name: string, email: string, password: string): { success: boolean; error?: string } => {
        const users = getUsers();
        if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
            return { success: false, error: 'An account with this email already exists' };
        }
        if (name.trim().length < 2) return { success: false, error: 'Name must be at least 2 characters' };
        if (password.length < 6) return { success: false, error: 'Password must be at least 6 characters' };

        const newUser: User & { password: string } = {
            id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password,
            avatar: getAvatarColor(name),
            purchasedProductIds: [],
        };

        users.push(newUser);
        saveUsers(users);

        const { password: _, ...userWithoutPassword } = newUser;
        setUser(userWithoutPassword);
        localStorage.setItem('kanvah_session', JSON.stringify({ id: newUser.id }));
        setIsLoginModalOpen(false);
        return { success: true };
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem('kanvah_session');
    }, []);

    const updateAddress = useCallback((address: Address) => {
        if (!user) return;
        const users = getUsers();
        const idx = users.findIndex(u => u.id === user.id);
        if (idx === -1) return;
        users[idx] = { ...users[idx], address };
        saveUsers(users);
        setUser(prev => prev ? { ...prev, address } : prev);
        setIsAddressModalOpen(false);
    }, [user]);

    return (
        <AuthContext.Provider value={{
            user, isLoginModalOpen, setIsLoginModalOpen,
            isAddressModalOpen, setIsAddressModalOpen,
            login, signup, logout, updateAddress,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
    return ctx;
}
