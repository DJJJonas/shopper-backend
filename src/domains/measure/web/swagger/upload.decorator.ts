import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { HttpErrorType } from '~/common/util/http-error.util';
import { UploadResponseBody } from '../dto/upload.dto';

export function ApiMeasureUpload() {
  return applyDecorators(
    ApiOkResponse({
      type: UploadResponseBody,
      description: 'Operação realizada com sucesso',
    }),
    ApiBadRequestResponse({
      type: HttpErrorType,
      description: 'Os dados fornecidos no corpo da requisição são inválidos',
    }),
    ApiConflictResponse({
      type: HttpErrorType,
      description: 'Já existe uma leitura para este tipo no mês atual',
    }),
    ApiOperation({
      summary: 'Upload de uma leitura',
      description:
        'Responsável por receber uma imagem em base 64, consultar o Gemini e retornar a medida lida pela API',
    }),
  );
}
