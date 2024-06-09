import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class PositiveIntegerPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const finalValue = parseInt(value, 10);
    if (isNaN(finalValue) || finalValue < 1) {
      throw new BadRequestException(
        `The value of ${metadata.data} must be a positive integer`,
      );
    }
    return finalValue;
  }
}
