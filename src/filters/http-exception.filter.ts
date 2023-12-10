import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
  ValidationError,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status: number = exception.getStatus();

    if (status === 400) {
      const validationErrors = exception.getResponse()[
        'message'
      ] as ValidationError[];
      const errorMessage = validationErrors
        .map((error) => Object.values(error.constraints))
        .flat();

      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: errorMessage,
      });
    } else {
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: status === 500 ? 'Internal server error' : exception.message,
      });
    }
  }
}
