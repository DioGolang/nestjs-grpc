import { status } from '@grpc/grpc-js';
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { throwError } from 'rxjs';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const response = exception.getResponse() as { message: string | object };
    const rpcException = new RpcException({
      message: JSON.stringify(response.message),
      code: status.FAILED_PRECONDITION,
    });
    return throwError(() => rpcException.getError());
  }
}
