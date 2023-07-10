/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button } from '@/components/ui/button';
import { DatePickerWithPresets } from '@/components/ui/datePickerWithPreset';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useAppSelector } from '@/redux/hook';

import { useState } from 'react';

export default function Checkout() {
  const [scheduled, setScheduled] = useState<boolean>(false);

  const { products } = useAppSelector((state) => state.cart);

  // Calculate subtotal
  const subTotal = products.reduce(
    (acc, product) => acc + product.price * product.quantity!,
    0
  );

  // Calculate delivery fee (1% of subtotal)
  const deliveryFee = Number((subTotal * 0.01).toFixed(2));

  // Calculate total
  const total = (subTotal + deliveryFee).toFixed(2);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      className="flex justify-center items-center h-[calc(100vh-80px)] gap-10 text-primary"
      onSubmit={handleSubmit}
    >
      <div className="max-w-3xl w-full">
        <h1 className="mb-2 font-bold">Delivery Information</h1>
        <div className="h-[60vh] border border-gray-300 rounded-md p-10 overflow-auto">
          <div className="flex gap-5">
            <div className="w-full space-y-5">
              <div>
                <Label htmlFor="name">Name<sup className='text-red-500 text-base'>*</sup></Label>
                <Input type="text" id="name" className="mt-2" required />
              </div>
              <div>
                <Label htmlFor="email">Email<sup className='text-red-500 text-base'>*</sup></Label>
                <Input type="email" id="email" className="mt-2" required/>
              </div>
            </div>
            <div className="w-full space-y-5">
              <div>
                <Label htmlFor="phone">Phone<sup className='text-red-500 text-base'>*</sup></Label>
                <Input type="number" id="phone" className="mt-2" required/>
              </div>
              <div>
                <Label htmlFor="name">City<sup className='text-red-500 text-base'>*</sup></Label>
                <Input type="text" id="name" className="mt-2" required/>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <Label htmlFor="address">Address<sup className='text-red-500 text-base'>*</sup></Label>
            <Textarea id="address" className="mt-2" required/>
          </div>
          <div className="flex items-center gap-2 mt-5">
            <Label className="text-lg">Scheduled Delivery</Label>
            <Switch onClick={() => setScheduled(!scheduled)} />
          </div>
          <div className="flex gap-5 mt-5">
            <div className="w-full">
              <Label htmlFor="note">Note</Label>
              <Input
                disabled={!scheduled}
                type="text"
                id="note"
                className="mt-3"
              />
            </div>
            <div className="w-full flex flex-col mt-2">
              <Label className="mb-3" htmlFor="name">
                Date
              </Label>
              <DatePickerWithPresets disabled={!scheduled} />
            </div>
          </div>
          <div className="mt-3">
            <Label className="text-lg">Payment method</Label>
            <div className="flex gap-5 mt-5">
              <RadioGroup defaultValue="comfortable" className="flex">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="online"
                    id="r1"
                    className="border border-gray-400"
                  />
                  <Label htmlFor="r1">Online payment</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="cash"
                    id="r2"
                    className="border border-gray-400"
                  />
                  <Label htmlFor="r2">Cash on delivery</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-lg w-full">
        <h1 className="mb-2 font-bold">Order Summery</h1>
        <div className="border border-gray-300 rounded-md h-[60vh] p-10 flex flex-col">
          <div className="flex-grow  mb-2 space-y-2 overflow-auto">
            {products.map((product) => (
              <div className="flex justify-between items-center bg-gray-100 p-1 rounded-lg">
                <div className="flex items-center">
                  <img
                    src={product.image}
                    className="h-[82px] rounded-md mr-2"
                    alt=""
                  />
                  <div>
                    <h1 className="text-lg mb-2">{product.model}</h1>
                    <p>Price: {product.price}</p>
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl mr-5">{product.quantity}</h1>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-lg">
              <p>Subtotal</p>
              <p>{subTotal} Bdt</p>
            </div>
            <div className="flex justify-between text-lg">
              <p>Delivery</p>
              <p>{deliveryFee} Bdt</p>
            </div>
            <div className="flex justify-between text-xl font-bold">
              <p>Total</p>
              <p>{total} Bdt</p>
            </div>
          </div>
          <Button className="w-full my-3">Checkout</Button>
        </div>
      </div>
    </form>
  );
}
