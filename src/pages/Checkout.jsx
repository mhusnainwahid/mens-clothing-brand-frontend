import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CreditCard, Truck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { total = 0, subtotal = 0, shipping = 0, cartItems = [] } = location.state || {};

  const tax = subtotal * 0.08; // Example tax calculation

  // Redirect if cart data is missing
  useEffect(() => {
    if (!subtotal || !total || cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checkout.",
      });
      navigate("/cart");
    }
  }, [subtotal, total, cartItems, navigate]);

  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  const [loading, setLoading] = useState(false);

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    for (const [key, value] of Object.entries(shippingData)) {
      if (!value.trim()) {
        toast({ title: "Missing Information", description: `Please fill out ${key}.` });
        return false;
      }
    }
    for (const [key, value] of Object.entries(paymentData)) {
      if (!value.trim()) {
        toast({ title: "Missing Information", description: `Please fill out ${key}.` });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_LOCAL_URI}checkout`,
        {
          shippingData,
          paymentData,
          subtotal,
          total,
          shipping,
          cartItems,
        }
      );

      if (res.status >= 200 && res.status < 300) {
        toast({
          title: "Order placed successfully!",
          description: "You'll receive a confirmation email shortly.",
        });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        throw new Error("Unexpected server response");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Order couldn't be placed!",
        description:
          error.response?.data?.message || "There was an error processing your order.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-brand-charcoal mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Shipping Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-brand-charcoal">
                    <Truck className="h-5 w-5 mr-2" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormInput label="First Name" name="firstName" value={shippingData.firstName} onChange={handleShippingChange} required />
                    <FormInput label="Last Name" name="lastName" value={shippingData.lastName} onChange={handleShippingChange} required />
                  </div>
                  <FormInput label="Email" type="email" name="email" value={shippingData.email} onChange={handleShippingChange} required />
                  <FormInput label="Address" name="address" value={shippingData.address} onChange={handleShippingChange} required />
                  <div className="grid grid-cols-2 gap-4">
                    <FormInput label="City" name="city" value={shippingData.city} onChange={handleShippingChange} required />
                    <FormInput label="State" name="state" value={shippingData.state} onChange={handleShippingChange} required />
                  </div>
                  <FormInput label="ZIP Code" name="zipCode" value={shippingData.zipCode} onChange={handleShippingChange} required />
                </CardContent>
              </Card>

              {/* Payment Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-brand-charcoal">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormInput label="Card Number" name="cardNumber" value={paymentData.cardNumber} onChange={handlePaymentChange} placeholder="1234 5678 9012 3456" required />
                  <div className="grid grid-cols-2 gap-4">
                    <FormInput label="Expiry Date" name="expiryDate" value={paymentData.expiryDate} onChange={handlePaymentChange} placeholder="MM/YY" required />
                    <FormInput label="CVV" name="cvv" value={paymentData.cvv} onChange={handlePaymentChange} placeholder="123" required />
                  </div>
                  <FormInput label="Name on Card" name="nameOnCard" value={paymentData.nameOnCard} onChange={handlePaymentChange} required />
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="text-brand-charcoal">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {cartItems.map((item, index) => (
                      <div key={index} className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-brand-charcoal">{item.name}</h4>
                          <p className="text-xs text-brand-warm-gray">Size: {item.size} | Qty: {item.quantity}</p>
                        </div>
                        <span className="text-sm text-brand-charcoal">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-brand-warm-gray">Subtotal</span>
                      <span className="text-brand-charcoal">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-warm-gray">Shipping</span>
                      <span className="text-brand-accent">{shipping === 0 ? "Free" : `$${shipping}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-warm-gray">Tax</span>
                      <span className="text-brand-charcoal">${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-brand-charcoal">Total</span>
                    <span className="text-brand-charcoal">${total.toFixed(2)}</span>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-charcoal hover:bg-brand-warm-gray"
                    size="lg"
                  >
                    {loading ? "Placing Order..." : "Complete Order"}
                  </Button>

                  <div className="flex items-center justify-center text-xs text-brand-warm-gray mt-4">
                    <Shield className="h-4 w-4 mr-1" />
                    Secure 256-bit SSL encryption
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
