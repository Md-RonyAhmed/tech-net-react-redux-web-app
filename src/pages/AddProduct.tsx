import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export default function AddProduct() {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [keyFeatures, setKeyFeatures] = useState('');
  const [status, setStatus] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = async () => {
    // Validate the form data before submission
    // if (!productName || !price || !keyFeatures || !imgUrl) {
    //   console.error('Please fill in all required fields');
    //   return;
    // }

    const newProduct = {
      model: productName,
      image: imgUrl,
      status,
      keyFeature: keyFeatures.split('\n').map((feature) => feature.trim()), // Convert to array
      price: parseFloat(price), // Assuming price is an integer
      rating,
      comments: [],
    };

    // Send a POST request to your backend API to add the new product
    // try {
    //   const response = await fetch('https://your-backend-api.com/products', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(newProduct),
    //   });

    //   if (response.ok) {
    //     console.log('Product added successfully');
    //     // Optionally, you can redirect the user or show a success message
    //   } else {
    //     console.error('Failed to add product:', response.statusText);
    //   }
    // } catch (error) {
    //   console.error('Error adding product:');
    // }

    console.log(newProduct)
  };
  return (
    <div className="flex justify-center items-center h-[100vh] text-primary my-8">
      <div className="max-w-3xl w-full">
        <h1 className="my-8 font-bold text-2xl">Add a new product</h1>
        <div className="h-[60vh] border border-gray-300 rounded-md p-10 overflow-auto">
          <div className="space-y-5">
            <div>
              <Label htmlFor="productName">
                Product Name<sup className="text-red-500 text-base">*</sup>
              </Label>
              <Input
                type="text"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="price">
                Price<sup className="text-red-500 text-base">*</sup>
              </Label>
              <Input
                type="text"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="keyFeatures">
                Key Features<sup className="text-red-500 text-base">*</sup>
              </Label>
              <Textarea
                id="keyFeatures"
                value={keyFeatures}
                onChange={(e) => setKeyFeatures(e.target.value)}
                className="mt-2 h-24"
                required
              />
            </div>
            <div className="w-full">
              <Label htmlFor="rating">
                Rating<sup className="text-red-500 text-base">*</sup>
              </Label>
              <Input
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                type="text"
                id="rating"
                className="mt-2"
                required
                placeholder="give rating out of 5"
              />
            </div>
            <div>
              <Label htmlFor="imgUrl">
                Image URL<sup className="text-red-500 text-base">*</sup>
              </Label>
              <Input
                type="text"
                id="imgUrl"
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 mt-5">
              <Label className="text-lg">Status</Label>
              <Switch onClick={() => setStatus(!status)} />
            </div>
          </div>
          <Button className="w-full mt-12" onClick={handleSubmit}>
            Add New Product
          </Button>
        </div>
      </div>
    </div>
  );
}
