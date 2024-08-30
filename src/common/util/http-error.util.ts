import { ApiProperty } from '@nestjs/swagger';

export class HttpErrorType {
  @ApiProperty({ examples: ['INVALID_DATA', 'INVALID_TYPE'] })
  error_code: string;
  @ApiProperty()
  error_description: any;
}

export const makeError = (error_code: string, error_description?: any) =>
  error_description
    ? {
        error_code,
        error_description,
      }
    : { error_code: '', error_description: error_code };
