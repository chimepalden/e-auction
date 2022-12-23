import { Product } from 'src/products/schema/product.schema';

export const productStub = (): Product => {
  return {
    productId: '123456',
    name: 'Product 1',
    description: 'This is product 1.',
    detailDescription: 'This is detail of product 1',
    category: 'Ornament',
    startingPrice: 1000,
    bidEndDate: new Date('2023-04-14'),
    bids: [],
    sellerId: '1234',
  };
};
