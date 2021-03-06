import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsEnum, IsOptional, IsString, Length} from "class-validator";
import {OperatorEnum} from "../enum";

export class UpdateSimCardDto {

    @ApiProperty({example: '(050) 11 22 333', description: 'Номер тенефона сім карти 15 символів'})
    @IsString()
    @Length(15, 15)
    @IsOptional()
    public number?: string;

    @ApiProperty({
        example: 'Kyivstar',
        description: "Вказати мобільного оператора enum = Kyivstar, Vodafone. По замовчуванню Kyivstar"
    })
    @IsString()
    @IsEnum(OperatorEnum)
    @IsOptional()
    public operator?: string;

    @ApiProperty({example: 'true', description: 'Чи активка карточка?'})
    @IsBoolean()
    @IsOptional()
    public active?: boolean;
}