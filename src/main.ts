import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './shared/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/v1');

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(Number(process.env.APP_PORT));
}

bootstrap();
