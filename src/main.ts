import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'FgIjLl01', //senha
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000,  // tempo de expiração da sessão
      },
    }),
  );

  app.enableCors({ // Habilita CORS
    origin: 'http://localhost:5173',  // Permitir o frontend
    credentials: true,  // Permitir cookies
  });

  await app.listen(3000);
}
bootstrap();
