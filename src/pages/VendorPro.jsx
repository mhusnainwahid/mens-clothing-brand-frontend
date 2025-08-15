import React, { useState, useEffect } from "react";
import axios from "axios";

const VendorPro = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);

  const vendorId = localStorage.getItem("userId");

  // Fetch products on mount
  useEffect(() => {
    const fetchVendorPro = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_LOCAL_URI}getvendorpro/${vendorId}`
        );
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVendorPro();
  }, [vendorId]);

  // Delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_LOCAL_URI}deletepro/${id}`);
      alert("Product deleted successfully!");
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // Open edit modal
  const openModal = (product) => {
    setSelectedProductId(product._id);
    setName(product.productName);
    setDesc(product.desc);
    setPrice(product.price);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
    setName("");
    setDesc("");
    setPrice("");
  };

  // Update product
  const handleUpdate = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_LOCAL_URI}updatepro/${selectedProductId}`,
        { name, desc, price }
      );

      setProducts((prev) =>
        prev.map((p) =>
          p._id === selectedProductId ? { ...p, name, desc, price } : p
        )
      );

      alert("Product updated successfully!");
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Your Products
      </h1>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-lg hover:shadow-2xl transition-shadow rounded-2xl overflow-hidden flex flex-col border border-gray-200"
          >
            <div className="overflow-hidden">
              <img
                src={product.imageUrl || "https://via.placeholder.com/300x200"}
                alt={product.name}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <h2 className="text-2xl font-semibold text-center text-gray-800">
                {product.productName}
              </h2>
              <p className="text-gray-600 text-sm mt-3 text-justify line-clamp-4">
                {product.desc || "No description provided."}
              </p>
              <p className="text-lg text-blue-600 font-bold mt-4">
                PKR {product.price}
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => openModal(product)}
                  className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white py-2 rounded-lg hover:from-green-500 hover:to-green-600 transition-all font-medium shadow-md hover:shadow-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all font-medium shadow-md hover:shadow-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 md:p-8 transition-all">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Update Product
            </h2>

            <div className="space-y-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Product Name"
              />
              <input
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Description"
              />
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Price"
                type="number"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpdate}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorPro;
