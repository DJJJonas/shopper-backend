import { ValidationPipeOptions } from '@nestjs/common';

const validationPipeOptions: ValidationPipeOptions = {
  errorHttpStatusCode: 400,
};

export default validationPipeOptions;
