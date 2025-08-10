import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { FormInput } from "@/components/ui/form-input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_LOCAL_URI}getallpro`);
        // console.log(res.data);
        setProducts(res.data);

        
        const uniqueCategories = Array.from(
          new Set(
            res.data
              .map((product) => product.category || null)
              .filter((cat) => cat) 
          )
        );

        setCategories(uniqueCategories.length > 0 ? ["All", ...uniqueCategories] : ["All"]);
      } catch (error) {
        console.log("Products can't fetch: ", error);
      }
    };

    fetchAllProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const name = product.productName || ""; 
    const desc = product.desc || product.description || "";
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-charcoal mb-4">
            Our Collection
          </h1>
          <p className="text-lg text-brand-warm-gray">
            Discover our complete range of premium men's fashion
          </p>
        </div>
        <div className="mb-8 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <Button
                key={`${category}-${index}`}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`transition-all duration-200 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] ${
                  selectedCategory === category
                    ? "bg-brand-charcoal text-white hover:bg-brand-warm-gray"
                    : "bg-white text-black hover:bg-brand-green hover:text-white"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-brand-warm-gray" />
            </div>
            <FormInput
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-xl shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-200"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-brand-charcoal mb-2">
              No products found
            </h3>
            <p className="text-brand-warm-gray">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
