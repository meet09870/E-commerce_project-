import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.scss'
import { AdminAuthProvider } from './components/common/context/AdminAuth.jsx';
import { CartProvider } from './components/common/context/CartContext.jsx';
import { AuthProvider } from './components/common/context/Auth.jsx';




createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AdminAuthProvider>
    <AuthProvider>
       <CartProvider>
       <App />
       </CartProvider>
     </AuthProvider>
   </AdminAuthProvider>
      
    
  </StrictMode>,
)
