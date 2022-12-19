export class ProductHasBuyerException extends Error {
  constructor(message?: string) {
    super(
      message ||
        'Can not delete the product. There is one or more buyer for this product.',
    );
  }
}
