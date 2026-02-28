import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import LoginModal from './LoginModal';
import AddressModal from './AddressModal';

export default function Layout() {
    return (
        <>
            <Navbar />
            <CartDrawer />
            <LoginModal />
            <AddressModal />
            <Outlet />
            <Footer />
        </>
    );
}
