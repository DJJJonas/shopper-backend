import {
  UnprocessableEntityException,
  ValidationPipeOptions,
} from '@nestjs/common';
import { makeError } from '~/common/util/http-error.util';

const validationPipeOptions: ValidationPipeOptions = {
  errorHttpStatusCode: 400,
  stopAtFirstError: true,
  transform: true,
  exceptionFactory: (errors) => {
    const errorCode = 'INVALID_DATA';
    const errorDescriptions = [];
    errors.forEach((error) => {
      const constraints = Object.values(error.constraints);
      errorDescriptions.push(constraints.join(', '));
    });
    const errorDescription = errorDescriptions.join(', ');
    const message = makeError(errorCode, errorDescription);
    return new UnprocessableEntityException(message);
  },
};

export default validationPipeOptions;
