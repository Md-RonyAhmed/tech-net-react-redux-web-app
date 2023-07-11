import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function Payment() {
  return (
    <>
      <div className="flex justify-center items-center h-[calc(100vh-80px)] gap-10 text-primary">
        <div className="border border-gray-300 rounded-md p-10 pt-5 overflow-auto">
          <h1 className="mb-2 font-bold text-lg text-center">Payment</h1>
          <div className="w-full">
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <RadioGroup defaultValue="online" className="flex mt-2">
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
          <div className="mt-5">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input type="number" id="cardNumber" className="mt-2" required />
          </div>
          <div className="mt-5">
            <Label htmlFor="expirationDate">Expiration Date</Label>
            <Input type="date" id="expirationDate" className="mt-2" required />
          </div>
          <div className="mt-5">
            <Label htmlFor="cvv">CVV</Label>
            <Input type="text" id="cvv" className="mt-2" required />
          </div>
          <Button className="w-full my-3">Pay</Button>
        </div>
      </div>
    </>
  );
}
