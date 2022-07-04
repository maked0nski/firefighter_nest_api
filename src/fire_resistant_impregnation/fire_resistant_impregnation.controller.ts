import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {ApiBody, ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiTags} from "@nestjs/swagger";
import {AtGuard} from "../core/guards";
import {FireResistantImpregnationService} from "./fire_resistant_impregnation.service";
import {Exception} from "../exceptions";
import {CustomOkResponse} from "../utils";
import {
    SWAGGER_EXAMPLE_FIRE_RESISTANT,
    SWAGGER_EXAMPLE_FIRE_RESISTANT_IMPREGNATION
} from "../utils/example";
import {CreateFireResistantImpregnationDto} from "./dto/create.fire.resistant.impregnation.dto";
import {UpdateFireResistantImpregnationDto} from "./dto/update.fire.resistant.impregnation.dto";

@ApiTags('Просочення конструкцій вогнетривкою речовиною')
@Controller('fire-resistant-impregnation')
@UseGuards(AtGuard)
export class FireResistantImpregnationController {
    constructor(private fireResistantImpregnationService: FireResistantImpregnationService) {
    }

    @ApiOperation({summary: 'Create task fire resistant impregnation'})
    @ApiForbiddenResponse({description: Exception.FORBIDDEN})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_FIRE_RESISTANT_IMPREGNATION})
    @ApiBody({
        description: "Example body",
        schema: {
            example: SWAGGER_EXAMPLE_FIRE_RESISTANT
        },
        required: true
    })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() dto: CreateFireResistantImpregnationDto): Promise<CreateFireResistantImpregnationDto> {
        return this.fireResistantImpregnationService.create(dto)
    };


    @ApiOperation({summary: 'Get fire resistant impregnation by id'})
    @ApiForbiddenResponse({description: Exception.FORBIDDEN})
    @CustomOkResponse({status: HttpStatus.OK, exampleData: SWAGGER_EXAMPLE_FIRE_RESISTANT_IMPREGNATION})
    @HttpCode(HttpStatus.OK)
    @Get('id')
    getById(@Param('id') id: string): Promise<CreateFireResistantImpregnationDto> {
        return this.fireResistantImpregnationService.getById(Number(id));
    }

    @ApiOperation({summary: 'Update fire resistant impregnation by id'})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_FIRE_RESISTANT_IMPREGNATION})
    @ApiBody({
        description: "Example body",
        schema: {
            example: SWAGGER_EXAMPLE_FIRE_RESISTANT
        },
        required: false
    })
    @ApiParam({name: "id", description: 'Fire resistant impregnation id', schema: {example: 1}})
    @ApiForbiddenResponse({description: Exception.FORBIDDEN})
    @ApiNotFoundResponse({description: Exception.FIRE_RESISTANT_IMPREGNATION_NOT_FOUND})
    @HttpCode(HttpStatus.CREATED)
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateFireResistantImpregnationDto): Promise<CreateFireResistantImpregnationDto> {
        return this.fireResistantImpregnationService.update(Number(id), dto);
    }

    @ApiOperation({summary: 'Addfirm to fire resistant impregnation by id'})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_FIRE_RESISTANT_IMPREGNATION})
    @ApiBody({
        description: "Example body",
        schema: {
            example: {
                firmId: 1
            }
        },
        required: false
    })
    @ApiParam({name: "id", description: 'fire resistant impregnation id', schema: {example: 1}})
    @ApiForbiddenResponse({description: Exception.FORBIDDEN})
    @ApiNotFoundResponse({description: Exception.FIRE_RESISTANT_IMPREGNATION_NOT_FOUND})
    @HttpCode(HttpStatus.CREATED)
    @Patch(':id/addFirm')
    addFirm(@Param('id') id: string, @Body('firmId') firmId: string): Promise<CreateFireResistantImpregnationDto> {
        return this.fireResistantImpregnationService.addFirm(Number(id), Number(firmId));
    }

    @ApiOperation({
        summary: "Remove firmId from fire resistant impregnation"
    })
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_FIRE_RESISTANT_IMPREGNATION})
    @HttpCode(HttpStatus.OK)
    @ApiNotFoundResponse({description: Exception.FIRE_RESISTANT_IMPREGNATION_NOT_FOUND})
    @Patch(':id/deleteFirm')
    deleteFirm(@Param('id') id: string): Promise<CreateFireResistantImpregnationDto> {
        return this.fireResistantImpregnationService.deleteFirm(Number(id));
    }

    @ApiOperation({summary: 'Delete fire resistant impregnation by id'})
    @ApiNotFoundResponse({description: Exception.FIRE_RESISTANT_IMPREGNATION_NOT_FOUND})
    @ApiParam({name: "id", description: 'fire resistant impregnation id', schema: {example: 1}})
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    delete(@Param('id') id: string): Promise<CreateFireResistantImpregnationDto> {
        return this.fireResistantImpregnationService.delete(Number(id));
    }

}
