import * as mongoose from 'mongoose';

export const PetSchema = new mongoose.Schema({
    petName: { type: String, required: true },
    petType: { type: String, required: true },
    petDob: { type: Date, required: false, default: new Date() },
    petColor: { type: String, required: false },
    isActive: { type: Boolean, required: true, default: true },
    createdDate: { type: Date, required: true, default: new Date() },
    createdBy: { type: String, required: true },
    modifiedBy: { type: String, required: false },
    modifiedOn: { type: Date, required: false, default: new Date() },
});

export class Pet extends mongoose.Document {
    _id: string;
    petName: string;
    petType: string;
    petDob: Date;
    petColor: string;
    isActive: boolean;
    createdDate: Date;
    createdBy: string;
    modifiedBy: string;
    modifiedOn: Date;
}
