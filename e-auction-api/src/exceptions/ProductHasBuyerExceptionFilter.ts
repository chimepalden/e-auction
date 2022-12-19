import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ProductHasBuyerException } from './ProductHasBuyerException';

@Catch(ProductHasBuyerException)
export class ProductHasBuyerExceptionFilter implements ExceptionFilter {
  catch(exception: ProductHasBuyerException, host: ArgumentsHost) {
    const body = {
      message: exception.message,
      error: 'Buyer-list not empty error.',
    };

    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    res.status(HttpStatus.BAD_REQUEST).json(body);
  }
}
