import ProductCard from '@/components/ProductCard';
import Error from '@/components/ui/Error';
import Loading from '@/components/ui/Loading';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useGetProductsQuery } from '@/redux/api/apiSlice';
import {
  setPriceRange,
  toggleState,
} from '@/redux/features/filter/filterSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { IProduct } from '@/types/globalTypes';

export default function Products() {
  const { data, isLoading, isError } = useGetProductsQuery(undefined);
  const { priceRange, status } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();

  const handleSlider = (value: number[]) => {
    dispatch(setPriceRange(value[0]));
  };

  if (isLoading && !data) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (!isLoading && isError) {
    return (
      <div>
        <Error error="Error fetching products" />
      </div>
    );
  }

  if (!isLoading && !isError && data?.data?.length <= 0) {
    return (
      <div>
        <Error error="No products were found!" />
      </div>
    );
  }

  let filteredProducts;

  if (status) {
    filteredProducts = data?.data?.filter(
      (item: { status: boolean; price: number }) =>
        item.status === true && item.price <= priceRange
    );
  } else if (priceRange > 0) {
    filteredProducts = data?.data?.filter(
      (item: { price: number }) => item.price <= priceRange
    );
  } else {
    filteredProducts = data?.data;
  }

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
        <div>
          <h1 className="text-2xl uppercase">Availability</h1>
          <div
            className="flex items-center space-x-2 mt-3"
            onClick={() => dispatch(toggleState())}
          >
            <Switch id="in-stock" />
            <Label htmlFor="in-stock">In stock</Label>
          </div>
        </div>
        <div className="space-y-3 ">
          <h1 className="text-2xl uppercase">Price Range</h1>
          <div className="max-w-xl">
            <Slider
              defaultValue={[450000]}
              max={450000}
              min={0}
              step={1}
              onValueChange={(value) => handleSlider(value)}
            />
          </div>
          <div>From 0 Bdt To {priceRange} Bdt</div>
        </div>
      </div>
      <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
        {filteredProducts?.map((product: IProduct) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
}
