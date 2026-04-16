import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage.jsx';
import PhoneDetailPage from '../pages/PhoneDetailPage';
import CartPage from '../pages/CartPage';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product/:id" element={<PhoneDetailPage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
}

export default AppRouter;