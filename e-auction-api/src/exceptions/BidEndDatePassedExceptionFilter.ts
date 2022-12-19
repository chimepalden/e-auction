import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { BidEndDatePassedException } from './BidEndDatePassedException';
import { Response } from 'express';

@Catch(BidEndDatePassedException)
export class BidEndDatePassedExceptionFilter implements ExceptionFilter {
  catch(exception: BidEndDatePassedException, host: ArgumentsHost) {
    const body = {
      message: exception.message,
      error: 'Date expiration error',
    };

    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    res.status(HttpStatus.BAD_REQUEST).json(body);
  }
}
