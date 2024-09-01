import { GoogleGenerativeAIError } from '@google/generative-ai';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { makeError } from '~/common/util/http-error.util';

@Catch(GoogleGenerativeAIError)
export default class GoogleGenerativeAIErrorFilter implements ExceptionFilter {
  constructor(private errorCode: Uppercase<string>) {}
  catch(exception: GoogleGenerativeAIError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const description = exception.message;
    const error = makeError(this.errorCode, description);

    response.status(400).json(error);
  }
}
