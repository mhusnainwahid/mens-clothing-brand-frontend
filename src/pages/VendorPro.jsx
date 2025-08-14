import React, { useState } from 'react'

const VendorPro = () => {

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-charcoal mb-4">
            Your Collection
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
}

export default VendorPro
