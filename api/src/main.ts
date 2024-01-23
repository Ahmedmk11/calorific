import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const configService = app.get(ConfigService)
    app.use(cookieParser())

    const port = configService.get<number>('port')

    app.enableCors({
        origin: ['http://127.0.0.1:5176', 'http://localhost:5176'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    })

    await app.listen(port)

    console.log(
        `Application is running on: ${await app.getUrl()} on port ${port}`
    )
}

bootstrap()
