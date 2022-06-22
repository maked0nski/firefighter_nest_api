import {Station_brend} from "../type";
import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, Length} from "class-validator";

export class CreateFuelCardDto {

    @ApiProperty({example: '1234123412341234', description: 'Номер паливної карточки 8 цифр'})
    @IsString()
    @Length(16,16)
    public number: string;

    @ApiProperty({example: '1234', description: 'Пін код до карточки 4 цифри'})
    @IsString()
    @Length(4,4)
    public pin: string;

    @ApiProperty({example: 'true', description: 'Чи активка карточка?'})
    @IsBoolean()
    @IsNotEmpty()
    public active: boolean;

    @ApiProperty({example: 'OKKO', description: "Яка заправка OKKO чи WOG"})
    @IsString()
    @IsEnum(Station_brend)
    @IsOptional()
    public station_brend?: string;
}