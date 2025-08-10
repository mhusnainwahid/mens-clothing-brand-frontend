import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const Cart = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [cartItems, setCartItems] = useState([]);

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(index);
      return;
    }
    setCartItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = async (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
    try {
      const res = await axios.delete(`${import.meta.env.VITE_LOCAL_URI}deletecartitems/${cartItems[index].productId}`)
      alert(res.data.message)
    } catch (error) {
      console.log(error)
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_LOCAL_URI}getcartitems/${userId}`
        );
        // console.log(res.data.cartItems);
        setCartItems(res.data.cartItems || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCartItems();
  }, [userId]);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-brand-charcoal mb-4">
            Your cart is empty
          </h2>
          <p className="text-brand-warm-gray mb-6">
            Start shopping to add items to your cart
          </p>
          <Button asChild variant="accent">
            <Link to="/products">Shop Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-brand-charcoal mb-8">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={`${item.productId}-${item.size || "N/A"}-${item.color || "N/A"}`}
                className="bg-white rounded-lg border border-border p-6"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={item.imageUrl}
                    alt={item.productName}
                    className="w-20 h-20 object-cover rounded"
                  />

                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-brand-charcoal">
                      {item.productName}
                    </h3>
                    <p className="text-brand-warm-gray text-sm">
                      Size: {item.size || "N/A"} | Color: {item.color || "N/A"}
                    </p>
                    <p className="text-lg font-bold text-brand-charcoal mt-1">
                      ${item.price}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(index, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(index, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-brand-light-gray rounded-lg p-6 h-fit">
            <h2 className="text-xl font-bold text-brand-charcoal mb-4">
              Order Summary
            </h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-brand-warm-gray">Subtotal</span>
                <span className="text-brand-charcoal">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-warm-gray">Shipping</span>
                <span className="text-brand-charcoal">
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              {shipping === 0 && (
                <p className="text-xs text-brand-accent">
                  Free shipping on orders over $100!
                </p>
              )}
            </div>

            <div className="border-t border-border pt-4 mb-6">
              <div className="flex justify-between">
                <span className="text-lg font-bold text-brand-charcoal">
                  Total
                </span>
                <span className="text-lg font-bold text-brand-charcoal">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <Button
              className="w-full bg-brand-charcoal hover:bg-brand-warm-gray mb-4"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </Button>

            <Button variant="outline" className="w-full" asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
