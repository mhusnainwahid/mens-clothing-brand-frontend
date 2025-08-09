import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const FormInput = ({ className = "", ...props }) => {
    return (
        <input
            className={`w-full border border-gray-300 rounded-lg p-3 text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-charcoal ${className}`}
            {...props}
        />
    );
};
const FormSelect = ({ className = "", children, ...props }) => {
    return (
        <select
            className={`w-full border border-gray-300 rounded-lg p-3 text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-charcoal ${className}`}
            {...props}
        >
            {children}
        </select>
    );
};
const FormTextarea = ({ className = "", ...props }) => {
    return (
        <textarea
            className={`w-full border border-gray-300 rounded-lg p-3 text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-charcoal ${className}`}
            {...props}
        />
    );
};

const CreateProduct = () => {


    const [productName, setProductName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(productName,description,price,image,category)
        const data = new FormData();
        data.append('productname', productName),
        data.append('price', price)
        data.append('description', description)
        data.append('category', category)
        data.append('image', image)
        try {
            const res = await axios.post(`${import.meta.env.VITE_LOCAL_URI}createpro`, data)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen bg-brand-light-gray py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
                <h1 className="text-3xl md:text-4xl font-bold text-brand-charcoal mb-8 text-center">
                    Add New Product
                </h1>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-brand-charcoal mb-2">
                            Product Name
                        </label>
                        <FormInput
                            type="text"
                            placeholder="Enter product name"
                            required
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-brand-charcoal mb-2">
                            Price
                        </label>
                        <FormInput
                            type="number"
                            placeholder="Enter price"
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-brand-charcoal mb-2">
                            Category
                        </label>
                        <FormSelect
                            required
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Select category</option>
                            <option value="shirts">Shirts</option>
                            <option value="pants">Pants</option>
                            <option value="jackets">Jackets</option>
                            <option value="accessories">Accessories</option>
                        </FormSelect>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-brand-charcoal mb-2">
                            Description
                        </label>
                        <FormTextarea
                            rows={4}
                            placeholder="Enter product description"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-brand-charcoal mb-2">
                            Product Image
                        </label>
                        <FormInput
                            type="file"
                            accept="image/*"
                            required
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            type="submit"
                            className="bg-black text-white hover:bg-gray-900"
                            size="lg"
                        >
                            Save Product
                        </Button>
                        <Button type="reset" variant="outline" size="lg">
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
