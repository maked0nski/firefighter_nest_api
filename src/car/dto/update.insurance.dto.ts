import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class UpdateInsuranceDto{
    @ApiProperty({example: '01.01.2022', description: 'Дата страховки авто'})
    @IsString()
    public insurance: string;
}