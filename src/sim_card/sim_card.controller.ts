import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards} from '@nestjs/common';
import { ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {AtGuard} from "../core/guards";
import {SimCardService} from "./sim_card.service";
import {Exception} from "../exceptions";
import {CreateSimCardDto, UpdateSimCardDto} from "./dto";


@ApiTags('Sim card list')
@Controller('sim_card')
@UseGuards(AtGuard)
export class SimCardController {

    constructor(private simCardService: SimCardService) {
    }

    @ApiOperation({summary: 'Create sim card'})
    @ApiForbiddenResponse({description: Exception.FORBIDDEN})
    // @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_ONE_FUEL_CARD})
    // @ApiBody({
    //     description: "User id or null", schema: {
    //         example: {
    //             userId: "2"
    //         }
    //     }
    // })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() dto: CreateSimCardDto): Promise<CreateSimCardDto> {
        return this.simCardService.create(dto)
    };


    @ApiOperation({summary: 'Find all list sim cards'})
    @HttpCode(HttpStatus.OK)
    @Get()
    findAll(): Promise<CreateSimCardDto[]> {
        return this.simCardService.findAll();
    };

    @ApiOperation({summary: 'Get sim card by id'})
    @ApiNotFoundResponse({description: Exception.SIM_CARD_NOT_FOUND})
    @HttpCode(HttpStatus.OK)
    @Get(':id')
    findById(@Param('id') id: string): Promise<CreateSimCardDto> {
        return this.simCardService.findById(Number(id));
    };

    @ApiOperation({summary: 'Update sim card by id'})
    // @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_ONE_FUEL_CARD})
    @ApiForbiddenResponse({description: Exception.FORBIDDEN})
    @ApiNotFoundResponse({description: Exception.SIM_CARD_NOT_FOUND})
    @HttpCode(HttpStatus.CREATED)
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateSimCardDto): Promise<CreateSimCardDto> {
        return this.simCardService.update(Number(id), dto);
    }

    @ApiOperation({summary: 'Delete sim card by id'})
    @ApiNotFoundResponse({description: Exception.SIM_CARD_NOT_FOUND})
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.simCardService.delete(Number(id));
    }

}
