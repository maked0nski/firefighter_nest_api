import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {ApiBody, ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiTags} from "@nestjs/swagger";
import {AtGuard} from "../core/guards";
import {SimCardService} from "./sim_card.service";
import {Exception} from "../exceptions";
import {CreateSimCardDto, UpdateSimCardDto} from "./dto";
import {CustomOkResponse} from "../utils";
import {SWAGGER_EXAMPLE_SIM_CARD, SWAGGER_EXAMPLE_SIM_CARD_LIST} from "../utils/example";


@ApiTags('Sim card list')
@Controller('sim_card')
@UseGuards(AtGuard)
export class SimCardController {

    constructor(private simCardService: SimCardService) {
    }

    @ApiOperation({summary: 'Create sim card'})
    @ApiForbiddenResponse({description: Exception.FORBIDDEN})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_SIM_CARD})
    @ApiBody({
        description: "Example body",
        schema: {
            example: {
                number: "(050) 77 88 999",
                operator: "Vodafone",
                active: true,
            }
        },
        required: true
    })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() dto: CreateSimCardDto): Promise<CreateSimCardDto> {
        return this.simCardService.create(dto)
    };


    @ApiOperation({summary: 'Find all list sim cards'})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_SIM_CARD_LIST})
    @HttpCode(HttpStatus.OK)
    @Get()
    findAll(): Promise<CreateSimCardDto[]> {
        return this.simCardService.findAll();
    };

    @ApiOperation({summary: 'Get sim card by id'})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_SIM_CARD})
    @ApiParam({name: "id", description: 'Sim card id', schema: {example: 1}})
    @ApiNotFoundResponse({description: Exception.SIM_CARD_NOT_FOUND})
    @HttpCode(HttpStatus.OK)
    @Get(':id')
    findById(@Param('id') id: string): Promise<CreateSimCardDto> {
        return this.simCardService.findById(Number(id));
    };

    @ApiOperation({summary: 'Update sim card by id'})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_SIM_CARD})
    @ApiBody({
        description: "Example body",
        schema: {
            example: {
                number: "(050) 77 88 999",
                operator: "Vodafone",
                active: true,
            }
        },
        required: false
    })
    @ApiParam({name: "id", description: 'Sim card id', schema: {example: 1}})
    @ApiForbiddenResponse({description: Exception.FORBIDDEN})
    @ApiNotFoundResponse({description: Exception.SIM_CARD_NOT_FOUND})
    @HttpCode(HttpStatus.CREATED)
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateSimCardDto): Promise<CreateSimCardDto> {
        return this.simCardService.update(Number(id), dto);
    }

    @ApiOperation({summary: 'Delete sim card by id'})
    @ApiNotFoundResponse({description: Exception.SIM_CARD_NOT_FOUND})
    @ApiParam({name: "id", description: 'Sim card id', schema: {example: 1}})
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.simCardService.delete(Number(id));
    }

}
