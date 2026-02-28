import { useState, useEffect } from 'react';
import { useAuth, type Address } from '../context/AuthContext';

interface Props {
    isOpen?: boolean;
    onClose?: () => void;
    onSave?: (address: Address) => void;
    initialAddress?: Address;
    inline?: boolean; // render as inline form instead of modal
}

const EMPTY_ADDRESS: Address = {
    fullName: '',
    phone: '',
    street: '',
    apartment: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
};

const COUNTRIES = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany',
    'France', 'Japan', 'India', 'Brazil', 'Mexico',
];

export default function AddressModal({ isOpen, onClose, onSave, initialAddress, inline }: Props) {
    const { user, isAddressModalOpen, setIsAddressModalOpen, updateAddress } = useAuth();

    const showModal = inline ? false : (isOpen !== undefined ? isOpen : isAddressModalOpen);
    const currentAddress = initialAddress || user?.address;

    const [form, setForm] = useState<Address>(currentAddress || EMPTY_ADDRESS);
    const [errors, setErrors] = useState<Partial<Record<keyof Address, string>>>({});
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const addr = initialAddress || user?.address;
        setForm(addr || EMPTY_ADDRESS);
        setErrors({});
        setSaved(false);
    }, [showModal, initialAddress, user?.address]);

    const updateField = (field: keyof Address, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
    };

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof Address, string>> = {};
        if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!form.street.trim()) newErrors.street = 'Street address is required';
        if (!form.city.trim()) newErrors.city = 'City is required';
        if (!form.state.trim()) newErrors.state = 'State is required';
        if (!form.zip.trim()) newErrors.zip = 'ZIP code is required';
        if (!form.country.trim()) newErrors.country = 'Country is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        const trimmed: Address = {
            fullName: form.fullName.trim(),
            phone: form.phone.trim(),
            street: form.street.trim(),
            apartment: form.apartment.trim(),
            city: form.city.trim(),
            state: form.state.trim(),
            zip: form.zip.trim(),
            country: form.country.trim(),
        };

        if (onSave) {
            onSave(trimmed);
        } else {
            updateAddress(trimmed);
        }
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleClose = () => {
        if (onClose) {
            onClose();
        } else {
            setIsAddressModalOpen(false);
        }
    };

    const formContent = (
        <form className="address-form" onSubmit={handleSubmit}>
            <div className="address-form-row">
                <div className="address-field">
                    <label className="address-label" htmlFor="addr-name">Full Name *</label>
                    <input id="addr-name" type="text" className={`address-input${errors.fullName ? ' error' : ''}`}
                        placeholder="John Doe" value={form.fullName}
                        onChange={e => updateField('fullName', e.target.value)} />
                    {errors.fullName && <span className="address-field-error">{errors.fullName}</span>}
                </div>
                <div className="address-field">
                    <label className="address-label" htmlFor="addr-phone">Phone *</label>
                    <input id="addr-phone" type="tel" className={`address-input${errors.phone ? ' error' : ''}`}
                        placeholder="+1 (555) 123-4567" value={form.phone}
                        onChange={e => updateField('phone', e.target.value)} />
                    {errors.phone && <span className="address-field-error">{errors.phone}</span>}
                </div>
            </div>

            <div className="address-field">
                <label className="address-label" htmlFor="addr-street">Street Address *</label>
                <input id="addr-street" type="text" className={`address-input${errors.street ? ' error' : ''}`}
                    placeholder="123 Main Street" value={form.street}
                    onChange={e => updateField('street', e.target.value)} />
                {errors.street && <span className="address-field-error">{errors.street}</span>}
            </div>

            <div className="address-field">
                <label className="address-label" htmlFor="addr-apt">Apartment, Suite, etc.</label>
                <input id="addr-apt" type="text" className="address-input"
                    placeholder="Apt 4B (optional)" value={form.apartment}
                    onChange={e => updateField('apartment', e.target.value)} />
            </div>

            <div className="address-form-row address-form-row-3">
                <div className="address-field">
                    <label className="address-label" htmlFor="addr-city">City *</label>
                    <input id="addr-city" type="text" className={`address-input${errors.city ? ' error' : ''}`}
                        placeholder="Los Angeles" value={form.city}
                        onChange={e => updateField('city', e.target.value)} />
                    {errors.city && <span className="address-field-error">{errors.city}</span>}
                </div>
                <div className="address-field">
                    <label className="address-label" htmlFor="addr-state">State *</label>
                    <input id="addr-state" type="text" className={`address-input${errors.state ? ' error' : ''}`}
                        placeholder="CA" value={form.state}
                        onChange={e => updateField('state', e.target.value)} />
                    {errors.state && <span className="address-field-error">{errors.state}</span>}
                </div>
                <div className="address-field">
                    <label className="address-label" htmlFor="addr-zip">ZIP Code *</label>
                    <input id="addr-zip" type="text" className={`address-input${errors.zip ? ' error' : ''}`}
                        placeholder="90001" value={form.zip}
                        onChange={e => updateField('zip', e.target.value)} />
                    {errors.zip && <span className="address-field-error">{errors.zip}</span>}
                </div>
            </div>

            <div className="address-field">
                <label className="address-label" htmlFor="addr-country">Country *</label>
                <select id="addr-country" className={`address-input address-select${errors.country ? ' error' : ''}`}
                    value={form.country} onChange={e => updateField('country', e.target.value)}>
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.country && <span className="address-field-error">{errors.country}</span>}
            </div>

            <div className="address-form-actions">
                <button type="submit" className={`address-save-btn${saved ? ' saved' : ''}`}>
                    {saved ? (
                        <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                            Saved
                        </>
                    ) : (
                        'Save Address'
                    )}
                </button>
                {!inline && (
                    <button type="button" className="address-cancel-btn" onClick={handleClose}>
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );

    // Inline mode: return just the form
    if (inline) return formContent;

    // Modal mode
    if (!showModal) return null;

    return (
        <>
            <div className="address-overlay" onClick={handleClose} />
            <div className="address-modal">
                <button className="address-modal-close" onClick={handleClose} aria-label="Close">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </button>

                <div className="address-modal-header">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                    <h2 className="address-modal-title">
                        {currentAddress ? 'Edit Address' : 'Add Address'}
                    </h2>
                    <p className="address-modal-subtitle">Your shipping and billing address</p>
                </div>

                {formContent}
            </div>
        </>
    );
}
