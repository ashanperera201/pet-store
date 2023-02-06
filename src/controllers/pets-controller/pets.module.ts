import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';


import { PetApplicationAbstract } from '../../abstracts/application-abstracts/pet-application.abstract';
import { PetRepositoryAbstract } from '../../abstracts/repositories-abstracts/pet-repository.abstract';
import { PetsService } from '../../services/pets/pets.service';
import { PetRepository } from '../../core/repositories/pet-repository';
import { ResponseMapperService } from '../../services/response-mapper.service';
import { configuration } from '../../configuration';
import { PetsController } from './pets.controller';
import { modelDefinitions } from '../../core/entity-exports';

@Module({
  controllers: [PetsController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
      load: [configuration],
    }),
    MongooseModule.forFeature(modelDefinitions, process.env.APP_CONNECTION_NAME),
  ],
  providers: [
    ResponseMapperService,
    {
      provide: PetApplicationAbstract,
      useClass: PetsService,
    },
    {
      provide: PetRepositoryAbstract,
      useClass: PetRepository,
    }
  ],
})
export class PetsModule { }
