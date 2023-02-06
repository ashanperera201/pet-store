import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Pet } from '../entities/pets.entity';
import { PetRepositoryAbstract } from '../../abstracts/repositories-abstracts/pet-repository.abstract';

@Injectable()
export class PetRepository implements PetRepositoryAbstract {

    constructor(@InjectModel('Pet') private readonly petModel: Model<Pet>) { }

    getAllPetsAsync = async (): Promise<Pet[]> => {
        return await this.petModel.find({ isActive: true }).sort({ createdDate: 'descending' });
    }

    getPetAsync = async (petId: string): Promise<Pet> => {
        return await this.petModel.findOne({ _id: petId });
    }

    savePetAsync = async (pet: Pet): Promise<Pet> => {
        return await this.petModel.create(pet);
    }

    updatePetAsync = async (pet: Pet): Promise<any> => {
        const updatedResult = await this.petModel.updateOne(
            { _id: pet._id },
            {
                $set: { ...pet },
            },
            { upsert: true }
        );
        return updatedResult;
    }

    deletePetAsync = async (petIds: string[]): Promise<boolean> => {
        let query = null;
        if (petIds.length === 0) {
            query = { _id: petIds[0] };
        } else {
            const queryList = [];
            petIds.forEach((e) => {
                queryList.push({ _id: e });
            });
            query = { $or: queryList };
        }

        const deletedRes = await this.petModel.deleteMany(query);
        if (deletedRes) {
            return true;
        } else {
            return false;
        }
    }
}
