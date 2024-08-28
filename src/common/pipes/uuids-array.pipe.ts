import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { validate as isUUID } from 'uuid';

@Injectable()
export class ValidateUUIDsArrayPipe implements PipeTransform {
  transform(value: string[]): string[] {
    if (!Array.isArray(value)) {
      throw new BadRequestException('Expected an array of UUIDs');
    }

    const invalidIds = value.filter((id) => !isUUID(id));
    if (invalidIds.length > 0) {
      throw new BadRequestException(`Invalid UUIDs: ${invalidIds.join(', ')}`);
    }

    return value;
  }
}
