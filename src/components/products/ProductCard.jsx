import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

const ProductCard = ({ product, onAddToCart }) => {
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <Link to={`/products/${product._id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.productName} 
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.isNew && (
            <span className="absolute top-2 left-2 bg-brand-accent text-white px-2 py-1 text-xs font-medium rounded">
              New
            </span>
          )}
          {product.originalPrice && (
            <span className="absolute top-2 right-2 bg-destructive text-white px-2 py-1 text-xs font-medium rounded">
              Sale
            </span>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-medium text-brand-charcoal mb-1 group-hover:text-brand-accent transition-colors">
            {product.productName} 
          </h3>
          <p className="text-sm text-brand-warm-gray mb-2">
            {product.desc || "No description available"} 
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-brand-charcoal">
                Rs. {product.price} 
              </span>
              {product.originalPrice && (
                <span className="text-sm text-brand-warm-gray line-through">
                  Rs. {product.originalPrice}
                </span>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleAddToCart}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-brand-accent hover:text-white"
            >
              <ShoppingBag className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
