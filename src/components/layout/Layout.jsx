import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  // Mock cart items count - in a real app, this would come from state management
  const cartItemsCount = 3;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartItemsCount={cartItemsCount} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;