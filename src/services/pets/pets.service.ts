import { HttpStatus, Injectable } from '@nestjs/common';

import { PetDto, ResponseDto } from '../../shared';
import { ResponseMapperService } from '../response-mapper.service';
import { PetApplicationAbstract } from '../../abstracts/application-abstracts/pet-application.abstract';
import { PetRepositoryAbstract } from '../../abstracts/repositories-abstracts/pet-repository.abstract';

@Injectable()
export class PetsService implements PetApplicationAbstract {

    constructor(private _petRepositoryAbstract: PetRepositoryAbstract, private _responseMapperService: ResponseMapperService) { }

    getAllPetsAsync = async (): Promise<ResponseDto<PetDto[]>> => {
        try {
            const results = await this._petRepositoryAbstract.getAllPetsAsync();
            return this._responseMapperService.serviceResponseMapper<PetDto[]>(results, null, false, results.length > 0 ? HttpStatus.OK : HttpStatus.NO_CONTENT);
        } catch (error) {
            return this._responseMapperService.serviceResponseMapper<PetDto[]>(null, error, true, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    getPetAsync = async (petId: string): Promise<ResponseDto<PetDto>> => {
        try {
            const result = await this._petRepositoryAbstract.getPetAsync(petId);
            return this._responseMapperService.serviceResponseMapper<PetDto>(result, null, false, result ? HttpStatus.OK : HttpStatus.NO_CONTENT);
        } catch (error) {
            return this._responseMapperService.serviceResponseMapper<PetDto>(null, error, true, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    savePetAsync = async (pet: PetDto): Promise<ResponseDto<PetDto>> => {
        try {
            const payload: any = {
                petName: pet.petName,
                petType: pet.petType,
                petDob: pet.petDob,
                petColor: pet.petColor,
                isActive: true,
                createdDate: Date.UTC,
                createdBy: pet.createdBy,
            };

            const savedResult = await this._petRepositoryAbstract.savePetAsync(payload);
            return this._responseMapperService.serviceResponseMapper<PetDto>(savedResult, null, false, HttpStatus.CREATED);
        } catch (error) {
            return this._responseMapperService.serviceResponseMapper<PetDto>(null, error, true, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    updatePetAsync = async (pet: PetDto): Promise<ResponseDto<any>> => {
        try {
            const payload: any = {
                _id: pet._id,
                petName: pet.petName,
                petType: pet.petType,
                petDob: pet.petDob,
                petColor: pet.petColor,
                isActive: true,
                createdDate: Date.UTC,
                createdBy: pet.createdBy,
                modifiedBy: pet?.modifiedBy,
                modifiedOn: new Date(),
            };

            const updated = await this._petRepositoryAbstract.updatePetAsync(payload);
            return this._responseMapperService.serviceResponseMapper<PetDto>(updated, null, false, HttpStatus.CREATED);
        } catch (error) {
            return this._responseMapperService.serviceResponseMapper<PetDto>(null, error, true, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    deletePetAsync = async (petIds: string[]): Promise<ResponseDto<boolean>> => {
        try {
            if (petIds && petIds.length > 0) {
                const deletedResult = await this._petRepositoryAbstract.deletePetAsync(petIds);
                return this._responseMapperService.serviceResponseMapper<boolean>(deletedResult, null, false, HttpStatus.OK);
            } else {
                return this._responseMapperService.serviceResponseMapper<boolean>(null, "id's required.", true, HttpStatus.BAD_REQUEST);
            }
        } catch (error) {
            return this._responseMapperService.serviceResponseMapper<boolean>(null, error, true, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
