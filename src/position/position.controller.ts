import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiTags} from "@nestjs/swagger";

import {Position as PositionModel} from '@prisma/client';
import {PositionService} from "./position.service";
import {PositionDto} from "./dto";
import {AtGuard} from "../core/guards";


@ApiTags('Positions list')
@Controller('position')
@UseGuards(AtGuard)
export class PositionController {

    constructor(private positionService: PositionService) {
    }

    @ApiOperation({summary: 'Get all position'})
    @Get()
    getAllPositions(): Promise<PositionModel[]> {
        return this.positionService.getAll();
    }

    @ApiOperation({summary: 'Get position by id'})
    @Get(':id')
    getPositionById(@Param('id') id: string): Promise<PositionModel> {
        return this.positionService.getById(Number(id));
    }

    @ApiOperation({summary: 'Create new position'})
    @Post()
    createPosition(@Body() dto: PositionDto): Promise<PositionModel> {
        return this.positionService.create(dto);
    }

    @ApiOperation({summary: 'Update position by id'})
    @Patch(':id')
    updatePosition(@Param('id') id: string, @Body() dto: PositionDto): Promise<PositionModel> {
        return this.positionService.update(Number(id), dto);
    }

    @ApiOperation({summary: 'Detete position by id'})
    @Delete(':id')
    deletPosition(@Param('id') id: string): Promise<void> {
        return this.positionService.delete(Number(id));
    }

}
