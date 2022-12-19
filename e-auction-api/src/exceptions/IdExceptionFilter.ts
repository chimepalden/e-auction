import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { IdException } from './IdException';
import { Response } from 'express';

@Catch(IdException)
export class IdExceptionFilter implements ExceptionFilter {
  catch(exception: IdException, host: ArgumentsHost) {
    const body = {
      message: exception.message,
      error: 'Invalid Id error.',
    };

    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    res.status(HttpStatus.BAD_REQUEST).json(body);
  }
}
