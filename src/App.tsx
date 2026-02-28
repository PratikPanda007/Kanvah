import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import LookbookPage from './pages/LookbookPage';
import AboutPage from './pages/AboutPage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="collections" element={
                <ShopPage
                  title=""
                  titleAccent="C"
                  titleRest="ollections"
                  subtitle="Explore our full range of premium streetwear crafted for the bold and unfiltered."
                  breadcrumb="Collections"
                  searchPlaceholder="Search collections..."
                />
              } />
              <Route path="new-releases" element={
                <ShopPage
                  title="New "
                  titleAccent="R"
                  titleRest="eleases"
                  subtitle="The latest drops from Kanvah. Be the first to wear what's next."
                  breadcrumb="New Releases"
                  defaultSort="newest"
                  searchPlaceholder="Search new releases..."
                />
              } />
              <Route path="product/:id" element={<ProductPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="lookbook" element={<LookbookPage />} />
              <Route path="about" element={<AboutPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
