import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { BadedException } from './BadedException';

@Catch(BadedException)
export class BadedExceptionFilter implements ExceptionFilter {
  catch(exception: BadedException, host: ArgumentsHost) {
    const body = {
      message: exception.message,
      error: 'Bid limit error!',
    };

    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    res.status(HttpStatus.BAD_REQUEST).json(body);
  }
}
