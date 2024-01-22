// app.module.ts
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { UserSchema } from './models/user.schema'
import { UserService } from './modules/user/user.service'
import { AuthService } from './modules/auth/auth.service'
import { UserController } from './modules/user/user.controller'
import { AuthController } from './modules/auth/auth.controller'
import configuration from './config/configuration'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                const uri = configService.get<string>('mongoUri')
                console.log('MongoDB URI:', uri)
                return {
                    uri,
                }
            },
            inject: [ConfigService],
        }),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        UserModule,
        AuthModule,
    ],
    controllers: [UserController, AuthController],
    providers: [UserService, AuthService],
})
export class AppModule {}
