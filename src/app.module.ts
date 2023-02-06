import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { configuration } from './configuration';

import { AppController } from './controllers/app-controller/app.controller';
import { PetsModule } from './controllers/pets-controller/pets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
      load: [configuration],
    }),
    MongooseModule.forRoot(process.env.APP_DATABASE_CONNECTION, {
      connectionName: process.env.APP_CONNECTION_NAME,
      dbName: process.env.APP_CONNECTION_NAME,
    }),
    PetsModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
