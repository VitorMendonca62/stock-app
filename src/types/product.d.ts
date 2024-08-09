interface IProductCreate {
  name: string;
  amount: number;
  description: string;
  price: string;
  category: ICategory;
}

interface IProduct extends IProductCreate {
  id: string;
}

interface ICategory {
  created_at: Date;
  id: string;
  name: string;
  updated_at: Date;
}

interface ISale {
  product_id: string;
  amount: number;
}
