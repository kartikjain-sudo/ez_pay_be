// src/logger/logger.service.ts
import { Injectable } from '@nestjs/common';
import { createLogger, transports, format } from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

@Injectable()
export class LoggerService {
  private readonly logger = createLogger({
    transports: [
      new transports.File({
        filename: 'error.log',
        level: 'error',
      }),
      new transports.File({
        filename: 'combined.log',
      }),
    ],
    format: format.combine(
      format.timestamp(),
      nestWinstonModuleUtilities.format.nestLike(),
    ),
  });

  error(message: string, trace: string) {
    this.logger.error(message, { trace });
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  log(message: string) {
    this.logger.info(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }
}
