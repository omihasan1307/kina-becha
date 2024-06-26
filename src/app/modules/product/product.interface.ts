export type TInventory = {
  quantity: number;
  inStock: boolean;
};

export type TVariants = {
  type: string;
  value: string;
};

export type TProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: TVariants[];
  inventory: TInventory;
  isDeleted: boolean;
};
