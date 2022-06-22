import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
    const PORT = process.env.PORT || 8080
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    // const reflector = new Reflector();
    // app.useGlobalGuards(new AtGuard(reflector));
    const config = new DocumentBuilder()
        .setTitle('Firefighter NestJs API')
        .setDescription('API Портала пожежної служби')
        .setVersion('1.0')
        .addTag('Firefighter')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    await app.listen(PORT, () => console.log(`Server started on port : ${PORT}`));

}

bootstrap();
