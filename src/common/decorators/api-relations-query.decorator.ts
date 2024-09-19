import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function ApiRelationsQuery() {
  return applyDecorators(
    ApiQuery({
      name: 'relations',
      type: String,
      required: false,
      description:
        'Comma-separated list of related entities to include in the response',
      example: 'products,categories',
    }),
  );
}
