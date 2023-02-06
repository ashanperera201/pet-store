import { ModelDefinition } from '@nestjs/mongoose';
import { PetSchema } from './entities/pets.entity';

export const modelDefinitions: ModelDefinition[] = [
    { name: 'Pet', schema: PetSchema },
];
