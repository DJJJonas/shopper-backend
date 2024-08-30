import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class ConfirmRequestBody {
  @IsUUID()
  @ApiProperty()
  measure_uuid: UUID;

  @IsInt()
  @ApiProperty()
  confirmed_value: number;
}

export class ConfirmResponseBody {
  @ApiProperty()
  success: boolean = true;
}
