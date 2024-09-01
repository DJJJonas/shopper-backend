import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Response } from 'express';
import IErrorResponseBody from '~/common/interfaces/error.interface';

@Catch(UnprocessableEntityException)
export class UnprocessableEntityExceptionFilter implements ExceptionFilter {
  constructor(private errorCode: Uppercase<string>) {}

  catch(exception: UnprocessableEntityException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const data = exception.getResponse() as IErrorResponseBody;

    data.error_code = this.errorCode;
    response.status(400).json(data);
  }
}
