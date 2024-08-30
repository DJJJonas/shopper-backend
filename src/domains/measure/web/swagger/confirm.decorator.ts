import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { HttpErrorType } from '~/common/util/http-error.util';
import { ConfirmResponseBody } from '../dto/confirm.dto';

export function ApiMeasureConfirm() {
  return applyDecorators(
    ApiOkResponse({
      type: ConfirmResponseBody,
      description: 'Operação realizada com sucesso',
    }),
    ApiBadRequestResponse({
      type: HttpErrorType,
      description: 'Os dados fornecidos no corpo da requisição são inválidos',
    }),
    ApiNotFoundResponse({
      type: HttpErrorType,
      description: 'Leitura não encontrada',
    }),
    ApiConflictResponse({
      type: HttpErrorType,
      description: 'Leitura já confirmada',
    }),
    ApiOperation({
      summary: 'Confirmar leitura',
      description:
        'Responsável por confirmar ou corrigir o valor lido pelo LLM',
    }),
  );
}
