/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { HiMinus, HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi';
import {
  addToCart,
  removeFromCart,
  removeOne,
} from '@/redux/features/cart/cartSlice';
import { useAppDispatch } from '@/redux/hook';
import { Button } from './ui/button';
import { IProduct } from '@/types/globalTypes';

interface IProps {
  product: IProduct;
}

export default function CartCard({ product }: IProps) {
  const dispatch = useAppDispatch();
  return (
    <div className="border h-60 p-5 pl-0 flex justify-between rounded-md">
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
  );
}
