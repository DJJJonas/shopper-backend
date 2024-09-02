import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { InvalidMimeTypeException } from '~/common/exceptions/invalid-mimetype.exception';
import { makeError } from '~/common/util/http-error.util';

@Catch(InvalidMimeTypeException)
export default class InvalidMimeTypeExceptionFilter implements ExceptionFilter {
  constructor(private errorCode: Uppercase<string>) {}

  catch(exception: InvalidMimeTypeException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const description = exception.message;
    const error = makeError(this.errorCode, description);

    response.status(400).json(error);
  }
}
