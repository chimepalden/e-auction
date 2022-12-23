import { MockModel } from '../../../database/test/support/mock.model';
import { Product } from '../../schema/product.schema';
import { productStub } from '../stubs/product.stub';

export class ProductModel extends MockModel<Product> {
  protected entityStub = productStub();
}
