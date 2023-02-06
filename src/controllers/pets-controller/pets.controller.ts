import { Body, Controller, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { PetApplicationAbstract } from '../../abstracts/application-abstracts/pet-application.abstract';
import { PetDto } from '../../shared';

@ApiTags('Pets')
@Controller('api/pets')
export class PetsController {

    constructor(private _petApplicationAbstract: PetApplicationAbstract) { }

    @Get()
    async getAllPetDetailsAsync(@Res() response: Response): Promise<any> {
        try {
            const serviceResponse = await this._petApplicationAbstract.getAllPetsAsync();
            return response.status(serviceResponse.statusCode).json(serviceResponse);
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    @Get('/:petId')
    async getPetDetailAsync(@Param() { petId }: any, @Res() response: Response) {
        try {
            const serviceResult = await this._petApplicationAbstract.getPetAsync(petId);
            return response.status(serviceResult.statusCode).json(serviceResult);
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    @Post('delete')
    async deletePetAsync(@Body() ids: string[], @Res() response: Response): Promise<any> {
        try {
            if (ids && ids.length > 0) {
                const deletedRes = await this._petApplicationAbstract.deletePetAsync(ids);
                return response.status(deletedRes.statusCode).json(deletedRes);
            } else {
                return response.status(HttpStatus.BAD_REQUEST).json("pet id's are required.");
            }
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    @Post()
    async savePetAsync(@Body() petDto: PetDto, @Res() response: Response): Promise<any> {
        try {
            const serviceResult = await this._petApplicationAbstract.savePetAsync(petDto);
            return response.status(serviceResult.statusCode).json(serviceResult);
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    @Put()
    async updatePetAsync(@Body() petDto: PetDto, @Res() response: Response): Promise<any> {
        try {
            const updatedResult = await this._petApplicationAbstract.updatePetAsync(petDto);
            return response.status(updatedResult.statusCode).json(updatedResult);
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    }
}
