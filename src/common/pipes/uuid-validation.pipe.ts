import { BadRequestException, PipeTransform } from '@nestjs/common';
import { isUUID } from 'class-validator';

export class UuidValidationPipe implements PipeTransform {
    transform(value: any) {
        if (!isUUID(value, '4')) {
            throw new BadRequestException('Invalid ID format');
        }
        return value;
    }
}