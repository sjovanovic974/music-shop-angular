import { ProductCategory } from './product-category';

export class Product {
  id!: number;
  sku!: string;
  name!: string;
  description!: string;
  unitPrice!: number;
  imageUrl!: string;
  active!: boolean;
  unitsInStock!: number;
  dateCreated!: Date;
  lastUpdated!: Date;
  category!: ProductCategory;
}
