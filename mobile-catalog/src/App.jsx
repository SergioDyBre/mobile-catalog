import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <CartProvider>
      <BrowserRouter future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}>
        <AppRouter />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;