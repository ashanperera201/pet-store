import { Pet } from '../../core/entities/pets.entity';

export abstract class PetRepositoryAbstract {
    abstract getAllPetsAsync(): Promise<Pet[]>;
    abstract getPetAsync(petId: string): Promise<Pet>;
    abstract savePetAsync(pet: Pet): Promise<Pet>;
    abstract updatePetAsync(pet: Pet): Promise<any>;
    abstract deletePetAsync(petIds: string[]): Promise<boolean>;
}
