import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3001', // Your frontend URL
    credentials: true, // if you want to send cookies
  });

  await app.listen(3000);
}
bootstrap();
