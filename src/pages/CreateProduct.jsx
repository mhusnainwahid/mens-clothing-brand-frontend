import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

    const handleImage = (e) => {
      setImage(e.target.files[0]);
    };
    const vendorId = localStorage.getItem('userId');

    const handleSubmit = async (e) => {
      try {
        e.preventDefault();

        if (!name || !desc || !price || !image) {
          alert('Please fill all the fields!');
          return;
        }

        const imageData = new FormData();
        imageData.append('image', image);

        const uploadRes = await axios.post(`${import.meta.env.VITE_LOCAL_URI}uploadimage`, imageData);
        const uploadedImageUrl = uploadRes.data.imageUrl;
        setImageUrl(uploadedImageUrl);

        const res = await axios.post(`${import.meta.env.VITE_LOCAL_URI}createpro`, {
          name,
          desc,
          price,
          imageUrl,
          vendorId
        });

        if (res.status === 200) {
          alert('Product created successfully!');
          setName('');
          setDesc('');
          setPrice('');
          setImage('');
          setImageUrl('');
          navigate('/products');
        }
      } catch (error) {
        console.log('Product creation error:', error.message);
      }
    };

  return (
    <div className="min-h-screen bg-brand-light-gray flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-3xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">

        <div className="hero-gradient text-white py-10 px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Create New Product</h2>
          <p className="text-lg text-white/80">
            Showcase your product to the Loveable community
          </p>
        </div>
        <form className="p-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-brand-charcoal font-semibold mb-2">Title</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product title"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm 
                         hover:shadow-md hover:scale-[1.01]
                         focus:outline-none focus:ring-2 focus:ring-brand-charcoal focus:scale-[1.01]
                         transition-all duration-200 ease-in-out"
            />
          </div>
          <div>
            <label className="block text-brand-charcoal font-semibold mb-2">Description</label>
            <textarea
              rows="3"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Enter product description"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm resize-none
                         hover:shadow-md hover:scale-[1.01]
                         focus:outline-none focus:ring-2 focus:ring-brand-charcoal focus:scale-[1.01]
                         transition-all duration-200 ease-in-out"
            ></textarea>
          </div>
          <div>
            <label className="block text-brand-charcoal font-semibold mb-2">Price (in $)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm 
                         hover:shadow-md hover:scale-[1.01]
                         focus:outline-none focus:ring-2 focus:ring-brand-charcoal focus:scale-[1.01]
                         transition-all duration-200 ease-in-out"
            />
          </div>
          <div>
            <label className="block text-brand-charcoal font-semibold mb-2">Product Image</label>
            <input
              type="file"
              onChange={handleImage}
              className="w-full p-2 border border-gray-300 rounded-xl bg-white shadow-sm
                         hover:shadow-md hover:scale-[1.01]
                         focus:outline-none focus:ring-2 focus:ring-brand-charcoal focus:scale-[1.01]
                         file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md 
                         file:text-sm file:font-semibold file:bg-brand-light-gray 
                         file:text-brand-charcoal hover:file:bg-brand-warm-gray/20 
                         transition-all duration-200 ease-in-out"
            />
          </div>
          <div className="pt-4">
            <Button
              type="submit"
              size="lg"
              className="w-full bg-white text-black border border-gray-300 shadow-md 
                         hover:hsl(158 36% 37%) hover:text-white hover:shadow-lg 
                         transform hover:-translate-y-0.5 
                         transition-all duration-300 ease-in-out"
            >
              Submit Product
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
