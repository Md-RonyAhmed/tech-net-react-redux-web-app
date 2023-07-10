export interface IProduct {
  _id: number;
  model: string;
  image: string;
  price: number;
  keyFeature: string[];
  status: boolean;
  rating: number;
  quantity?: number;
}
