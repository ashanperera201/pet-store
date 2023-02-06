import { ResponseDto, PetDto } from '../../shared';

export abstract class PetApplicationAbstract {
    abstract getAllPetsAsync(): Promise<ResponseDto<PetDto[]>>;
    abstract getPetAsync(petId: string): Promise<ResponseDto<PetDto>>;
    abstract savePetAsync(pet: PetDto): Promise<ResponseDto<PetDto>>;
    abstract updatePetAsync(pet: PetDto): Promise<ResponseDto<any>>;
    abstract deletePetAsync(pet: string[]): Promise<ResponseDto<boolean>>;
}
