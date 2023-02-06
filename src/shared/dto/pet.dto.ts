import { IsNotEmpty } from 'class-validator';

export class PetDto {
    _id: string;
    @IsNotEmpty()
    petName: string;
    @IsNotEmpty()
    petType: string;
    petDob: Date;
    petColor: string;
    isActive: boolean;
    createdDate: Date;
    createdBy: string;
    modifiedBy: string;
    modifiedOn: Date;
}
