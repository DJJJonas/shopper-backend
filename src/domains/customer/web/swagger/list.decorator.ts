import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { HttpErrorType } from '~/common/util/http-error.util';
import { ListResponseBody } from '../dto/list.dto';

export function ApiCustomerList() {
  return applyDecorators(
    ApiOkResponse({
      type: ListResponseBody,
      description: 'Operação realizada com sucesso',
    }),
    ApiBadRequestResponse({
      type: HttpErrorType,
      description: 'Parâmetro measure type diferente de WATER ou GAS',
    }),
    ApiNotFoundResponse({
      type: HttpErrorType,
      description: 'Nenhum registro encontrado',
    }),
    ApiQuery({
      name: 'measure_type',
      enum: ['WATER', 'GAS'],
      required: false,
    }),
    ApiOperation({
      summary: 'Listar as leituras de um cliente',
      description:
        'Responsável por listar as medidas realizadas por um determinado cliente',
    }),
  );
}
