import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AuthGuard from "./routes/AuthGuard";
import IsLogin from "./routes/IsLogin";
import CreateProduct from "./pages/CreateProduct";
import VendorPro from "./pages/VendorPro";
import VendorRoutes from "./routes/privateRoutes/VendorRoutes";
import UserRoutes from "./routes/privateRoutes/UserRoutes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route element={<AuthGuard />} >
            <Route element={<><VendorRoutes/></>} >
              <Route path="/vendorpro" element={<VendorPro />} />
              <Route path="/createproduct" element={<CreateProduct />} />
            </Route>
            <Route element={<><UserRoutes/></>} >
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Route>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />          
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
            <Route element={<IsLogin/>}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;