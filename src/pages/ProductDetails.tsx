import ProductReview from '@/components/ProductReview';
import Error from '@/components/ui/Error';
import Loading from '@/components/ui/Loading';
import { Button } from '@/components/ui/button';
import { useGetProductQuery } from '@/redux/api/apiSlice';
import { addToCart } from '@/redux/features/cart/cartSlice';
import { useAppDispatch } from '@/redux/hook';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useGetProductQuery(id);
  const dispatch = useAppDispatch();

  if (isLoading && !product) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (!isLoading && isError) {
    return (
      <div>
        <Error error="Error fetching product" />
      </div>
    );
  }

  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="w-[50%]">
          <img src={product?.image} alt="" />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{product?.model}</h1>
          <p className="text-xl">Rating: {product?.rating}</p>
          <p className="text-xl">
            Availability:{' '}
            {product?.status ? (
              <span className="text-blue-600 bg-blue-100 p-1 rounded-md">
                In stock
              </span>
            ) : (
              <span className="text-red-600 bg-red-200 p-1 rounded-md">
                Out of stock
              </span>
            )}
          </p>
          <p className="text-xl">
            Price: <span className="font-bold">{product?.price}</span> Bdt
          </p>
          <h1 className='font-bold text-xl'>Key Features:</h1>
          <ul className="space-y-1 text-lg list-disc">
            {product?.keyFeature?.map((feature: string) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <Button
            variant="default"
            disabled={!product?.status}
            onClick={() => dispatch(addToCart(product))}
          >
            Add to cart
          </Button>
        </div>
      </div>
      <ProductReview />
    </>
  );
}
