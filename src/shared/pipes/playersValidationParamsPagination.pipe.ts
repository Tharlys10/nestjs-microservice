import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

class PlayersValidationParamsPagination implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.data === 'amount') {
      if (!value || Number(value) <= 0) {
        value = 10;
      }
    }

    if (metadata.data === 'page') {
      if (!value || Number(value) <= 0) {
        value = 1;
      }
    }

    return Number(value);
  }
}

export { PlayersValidationParamsPagination };
