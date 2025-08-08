import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-brand-light-gray border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-brand-charcoal mb-4">Loveable</h3>
            <p className="text-brand-warm-gray mb-4 max-w-md">
              Premium men's fashion for the modern gentleman. Quality craftsmanship meets contemporary style.
            </p>
            <div className="text-brand-warm-gray">
              <p>123 Fashion Street</p>
              <p>New York, NY 10001</p>
              <p>contact@loveable.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-brand-charcoal mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-brand-warm-gray hover:text-brand-charcoal transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-brand-warm-gray hover:text-brand-charcoal transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-brand-warm-gray hover:text-brand-charcoal transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-brand-warm-gray hover:text-brand-charcoal transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold text-brand-charcoal mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-brand-warm-gray hover:text-brand-charcoal transition-colors">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-brand-warm-gray hover:text-brand-charcoal transition-colors">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="text-brand-warm-gray hover:text-brand-charcoal transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-brand-warm-gray hover:text-brand-charcoal transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-brand-warm-gray">
          <p>&copy; {new Date().getFullYear()} Loveable. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;