import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status_code =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException ? exception.getResponse() : exception;

    this.logger.error(
      `Status Code: ${status_code}, Message: ${JSON.stringify(message)}`,
    );

    response.status(status_code).json({
      timestamp: new Date().toISOString(),
      path: request.path,
      error: message,
    });
  }
}

export { AllExceptionsFilter };
