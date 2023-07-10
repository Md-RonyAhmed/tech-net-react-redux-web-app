import { IProduct } from '@/types/globalTypes';
import { toast } from './ui/use-toast';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '@/redux/hook';
import { addToCart } from '@/redux/features/cart/cartSlice';

interface IProps {
  product: IProduct;
}

export default function ProductCard({ product }: IProps) {
  const dispatch = useAppDispatch();
  const handleAddProduct = (product: IProduct) => {
    dispatch(addToCart(product));
    toast({
      description: `Product added successfully!`,
    });
  };
  return (
    <div>
      <div className="rounded-2xl h-[480px] flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
        <Link to={`/product-details/${product._id}`} className="w-full">
          <img src={product?.image} alt="product" />
          <h1 className="text-xl font-semibold">{product?.name}</h1>
        </Link>
        <p>Rating: {product?.rating}</p>
        <p className="text-sm">
          Availability:{' '}
          {product?.status ? (
            'In stock'
          ) : (
            <span className="text-red-600">Out of stock</span>
          )}
        </p>
        <p className="text-sm">Price: {product?.price} Bdt</p>
        <Button
          variant="default"
          disabled={!product?.status}
          onClick={() => handleAddProduct(product)}
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
}
