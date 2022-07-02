import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, Length} from "class-validator";
import {OperatorEnum} from "../type";

export class CreateSimCardDto {

    @ApiProperty({example: '(050) 11 22 333', description: 'Номер тенефона сім карти'})
    @IsString()
    @Length(15,15)
    public number: string;

    @ApiProperty({example: 'Kyivstar', description: "Вказати мобільного оператора enum = Kyivstar, Vodafone. По замовчуванню Kyivstar"})
    @IsString()
    @IsEnum(OperatorEnum)
    @IsOptional()
    public operator: string;

    @ApiProperty({example: 'true', description: 'Чи активка карточка?'})
    @IsBoolean()
    @IsNotEmpty()
    public active: boolean;
}