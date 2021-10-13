import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof BadRequestException) {
      this.logger.error(`400 - ${(exception as any).response.message}`);
      return response.status(400).json({
        message: (exception as any).response.message,
      });
    }


    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      this.logger.error(`${exception.message}`);
      return response.status(status).json({
        message: exception.message,
      });
    }

    this.logger.error(`500 - ${exception.message}`);
    return response.status(500).json({
      message: (exception as any).detail,
    });
  }
}
