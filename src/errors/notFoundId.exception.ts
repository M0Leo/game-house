import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundIdException extends HttpException {
  constructor(id: number) {
    super(`No entity found with id ${id}`, HttpStatus.NOT_FOUND);
  }
}
