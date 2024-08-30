import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';
import { makeError } from '~/common/util/http-error.util';

@Catch(BadRequestException)
export class BadRequestFilter implements ExceptionFilter {
  constructor(private errorCode: Uppercase<string>) {}

  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const data = exception.getResponse() as {
      message: string[];
      error: string;
      statusCode: number;
      error_description?: string;
    };
    if (data?.error_description) {
      return;
    }
    response.status(400).json(makeError(this.errorCode, data.message));
  }
}
