/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import {
  HiMinus,
  HiOutlinePlus,
  HiOutlineShoppingCart,
  HiOutlineTrash,
} from 'react-icons/hi';
import { Button } from './ui/button';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import {
  addToCart,
  removeFromCart,
  removeOne,
} from '@/redux/features/cart/cartSlice';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { products, total } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
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
            <div
              className="border h-60 p-5 pl-0 flex justify-between rounded-md"
              key={product._id}
            >
              <div className="border-r pr-5 shrink-0">
                <img src={product?.image} alt="" className="h-full" />
              </div>
              <div className="px-2 w-full flex flex-col gap-3">
                <h1 className="text-lg">{product?.model}</h1>
                <p>Quantity: {product.quantity}</p>
                <p className="text-base">
                  Total Price:{' '}
                  <span className="font-bold">
                    {(product.price * product.quantity!).toFixed(2)}
                  </span>{' '}
                  Bdt
                </p>
              </div>
              <div className="border-l pl-5 flex flex-col justify-between">
                <Button onClick={() => dispatch(addToCart(product))}>
                  <HiOutlinePlus size="20" />
                </Button>
                <Button onClick={() => dispatch(removeOne(product))}>
                  <HiMinus size="20" />
                </Button>
                <Button
                  onClick={() => dispatch(removeFromCart(product))}
                  variant="destructive"
                  className="bg-red-500 hover:bg-red-400"
                >
                  <HiOutlineTrash size="20" />
                </Button>
              </div>
            </div>
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
