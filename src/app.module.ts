import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module, ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './core/interceptors';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { UserModule } from './features/user/user.module';
import { AuthModule } from './features/auth/auth.module';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoConfigFactory from './configs/mongo.config';
import secretConfigFactory from './configs/secret.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mongoConfigFactory, secretConfigFactory],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('mongo.uri'),
        useFindAndModify: false,
      }),
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    AppService,
  ],
})
export class AppModule {}
