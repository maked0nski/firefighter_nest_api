import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiTags} from "@nestjs/swagger";

import {FuelCardService} from "./fuel_card.service";
import {CreateFuelCardDto} from "./dto";
import {UpdateFuelCardDto} from "./dto/update.fuel.card.dto";
import {FuelCard} from "./type";
import {AtGuard} from "../core/guards";
import {CustomOkResponse} from "../utils/swagger.helper";
import {
    SWAGGER_EXAMPLE_ARRAY_FUEL_CARD_LIST,
    SWAGGER_EXAMPLE_ONE_FUEL_CARD
} from "../utils/example";


@ApiTags('Fuel cards')
@Controller('fuel_card')
@UseGuards(AtGuard)
export class FuelCardController {

    constructor(private fuelCardService: FuelCardService) {
    }


    @ApiOperation({summary: 'Get all list fuel cards'})
    @CustomOkResponse({status:HttpStatus.OK, exampleData:SWAGGER_EXAMPLE_ARRAY_FUEL_CARD_LIST})
    @HttpCode(HttpStatus.OK)
    @Get()
    getAllFuelCards(): Promise<FuelCard[]> {
        return this.fuelCardService.getAllFuelCards();
    }

    @ApiOperation({summary: 'Get fuel card by id'})
    @CustomOkResponse({status:HttpStatus.OK, exampleData:SWAGGER_EXAMPLE_ONE_FUEL_CARD})
    @HttpCode(HttpStatus.OK)
    @Get(':id')
    getFuelCardById(@Param('id') id: string): Promise<any> {
        return this.fuelCardService.getFuelCardById(id);
    }

    @ApiOperation({summary: 'Create fuel card'})
    @CustomOkResponse({status:HttpStatus.CREATED, exampleData:SWAGGER_EXAMPLE_ONE_FUEL_CARD})
    @HttpCode(HttpStatus.CREATED)
    @Post()
    createFuelCard(@Body() createFuelCardDto: CreateFuelCardDto): Promise<any> {
        return this.fuelCardService.createFuelCard(createFuelCardDto);
    }

    @ApiOperation({summary: 'Update fuel card by id'})
    @CustomOkResponse({status:HttpStatus.OK, exampleData:SWAGGER_EXAMPLE_ONE_FUEL_CARD})
    @HttpCode(HttpStatus.OK)
    @Patch(':id')
    updateFuelCardById(@Param('id') id: string, @Body() updateFuelCardDto: UpdateFuelCardDto) {
        return this.fuelCardService.updateFuelCardById(id, updateFuelCardDto)
    }

    @ApiOperation({summary: 'Delete fuel card by id'})
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteFuelCardById(@Param('id') id: string) {
        return this.fuelCardService.deleteFuelCardById(id);
    }
}
