import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Truck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

const Checkout = () => {
  const navigate = useNavigate();
  
  // Mock order data
  const orderItems = [
    { name: "Essential White Dress Shirt", price: 89, quantity: 2, size: "M" },
    { name: "Charcoal Wool Sweater", price: 129, quantity: 1, size: "L" },
  ];
  
  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

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

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mock checkout process
    toast({
      title: "Order placed successfully!",
      description: "You'll receive a confirmation email shortly.",
    });
    
    // Redirect to a success page (or home for now)
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-brand-charcoal mb-8">Checkout</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Shipping and Payment Forms */}
            <div className="space-y-6">
              {/* Shipping Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-brand-charcoal">
                    <Truck className="h-5 w-5 mr-2" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormInput
                      label="First Name"
                      name="firstName"
                      value={shippingData.firstName}
                      onChange={handleShippingChange}
                      required
                    />
                    <FormInput
                      label="Last Name"
                      name="lastName"
                      value={shippingData.lastName}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                  
                  <FormInput
                    label="Email"
                    type="email"
                    name="email"
                    value={shippingData.email}
                    onChange={handleShippingChange}
                    required
                  />
                  
                  <FormInput
                    label="Address"
                    name="address"
                    value={shippingData.address}
                    onChange={handleShippingChange}
                    required
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormInput
                      label="City"
                      name="city"
                      value={shippingData.city}
                      onChange={handleShippingChange}
                      required
                    />
                    <FormInput
                      label="State"
                      name="state"
                      value={shippingData.state}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                  
                  <FormInput
                    label="ZIP Code"
                    name="zipCode"
                    value={shippingData.zipCode}
                    onChange={handleShippingChange}
                    required
                  />
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-brand-charcoal">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormInput
                    label="Card Number"
                    name="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handlePaymentChange}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormInput
                      label="Expiry Date"
                      name="expiryDate"
                      value={paymentData.expiryDate}
                      onChange={handlePaymentChange}
                      placeholder="MM/YY"
                      required
                    />
                    <FormInput
                      label="CVV"
                      name="cvv"
                      value={paymentData.cvv}
                      onChange={handlePaymentChange}
                      placeholder="123"
                      required
                    />
                  </div>
                  
                  <FormInput
                    label="Name on Card"
                    name="nameOnCard"
                    value={paymentData.nameOnCard}
                    onChange={handlePaymentChange}
                    required
                  />
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
                  {/* Order Items */}
                  <div className="space-y-3">
                    {orderItems.map((item, index) => (
                      <div key={index} className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-brand-charcoal">{item.name}</h4>
                          <p className="text-xs text-brand-warm-gray">Size: {item.size} | Qty: {item.quantity}</p>
                        </div>
                        <span className="text-sm text-brand-charcoal">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  {/* Order Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-brand-warm-gray">Subtotal</span>
                      <span className="text-brand-charcoal">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-warm-gray">Shipping</span>
                      <span className="text-brand-accent">Free</span>
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
                    className="w-full bg-brand-charcoal hover:bg-brand-warm-gray"
                    size="lg"
                  >
                    Complete Order
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