import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {ApiOperation, ApiTags} from "@nestjs/swagger";

import {FuelCardService} from "./fuel_card.service";
import {Public} from "../core/decorators";
import {CreateFuelCardDto} from "./dto";
import {UpdateFuelCardDto} from "./dto/update.fuel.card.dto";


@ApiTags('Fuel cards')
@Controller('fuel_card')
export class FuelCardController {

    constructor(private fuelCardService: FuelCardService) {
    }

    @Public()
    @ApiOperation({summary: 'Get list fuel cards'})
    @HttpCode(HttpStatus.OK)
    @Get()
    getAllFuelCards(): Promise<any[]> {
        return this.fuelCardService.getAllFuelCards();
    }

    @Public()
    @ApiOperation({summary: 'Get fuel card by id'})
    @HttpCode(HttpStatus.OK)
    @Get(':id')
    getFuelCardById(@Param('id') id: string): Promise<any> {
        return this.fuelCardService.getFuelCardById(id);
    }

    @Public()
    @ApiOperation({summary: 'Create fuel card'})
    @HttpCode(HttpStatus.CREATED)
    @Post()
    createFuelCard(@Body() createFuelCardDto: CreateFuelCardDto): Promise<any> {
        return this.fuelCardService.createFuelCard(createFuelCardDto);
    }

    @Public()
    @ApiOperation({summary: 'Update fuel card by id'})
    @HttpCode(HttpStatus.OK)
    @Put(':id')
    updateFuelCardById(@Param('id') id: string, @Body() updateFuelCardDto: UpdateFuelCardDto) {
        return this.fuelCardService.updateFuelCardById(id, updateFuelCardDto)
    }

    @Public()
    @ApiOperation({summary: 'Delete fuel card by id'})
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteFuelCardById(@Param('id') id: string) {
        return this.fuelCardService.deleteFuelCardById(id);
    }
}
