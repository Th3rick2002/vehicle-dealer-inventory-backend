import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/v1');

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PATCH,POST,DELETE',
  });

  const config = new DocumentBuilder()
    .setTitle('Vehicle Dealer Inventory')
    .setDescription('API for Vehicle Dealer Inventory')
    .setVersion('1.0')
    .addTag('Inventory')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Ingresa el jwt',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server running on port ${process.env.PORT ?? 3200}`);
}
bootstrap();
