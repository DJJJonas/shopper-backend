import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';
import IErrorResponseBody from '~/common/interfaces/error.interface';

@Catch(BadRequestException)
export class BadRequestFilter implements ExceptionFilter {
  constructor(private errorCode: Uppercase<string>) {}

  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const data = exception.getResponse() as IErrorResponseBody;

    data.error_code = this.errorCode;
    response.status(400).json(data);
  }
}
