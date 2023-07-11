/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import {
  HiOutlineShoppingCart
} from 'react-icons/hi';
import { Button } from './ui/button';
import { useAppSelector } from '@/redux/hook';
import { Link } from 'react-router-dom';
import CartCard from './CartCard';

export default function Cart() {
  const { products, total } = useAppSelector((state) => state.cart);
  const totalQuantity = products.reduce(
    (total, product) => total + product.quantity!,
    0
  );

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost">
          <HiOutlineShoppingCart size="25" />
          <sup className="text-red-600 font-bold">{totalQuantity}</sup>
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-auto relative">
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          <h1 className="text-lg pb-4">
            Total: <span className="font-bold">{total.toFixed(2)}</span> Bdt
          </h1>
        </SheetHeader>
        <div className="space-y-6">
        {products.map((product) => (
            <CartCard key={product._id} product={product} />
          ))}
        </div>
        <div className="pt-4">
          <Button variant="default" asChild>
            <Link to="/checkout">Checkout</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
