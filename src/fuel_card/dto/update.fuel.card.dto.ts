import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length} from "class-validator";
import {Station_brend} from "../type";

export class UpdateFuelCardDto {

    @ApiProperty({example: '1234 1234 1234 1234', description: 'Номер паливної карточки 16 цифр роздылены по 4 пробелом'})
    @IsString()
    @Length(19, 19)
    @IsOptional()
    public number?: string;

    @ApiProperty({example: '1234', description: 'Пін код до карточки 4 цифри'})
    @IsString()
    @Length(4, 4)
    @IsOptional()
    public pin?: string;

    @ApiProperty({example: 'true', description: 'Чи активка карточка?'})
    @IsBoolean()
    @IsNotEmpty()
    @IsOptional()
    public active?: boolean;

    @ApiProperty({example: 'OKKO', description: "Яка заправка OKKO чи WOG"})
    @IsString()
    @IsNotEmpty()
    @IsEnum(Station_brend)
    @IsOptional()
    public station_brend?: string;

    @ApiProperty({example: '1', description: "User id"})
    @IsNumber()
    @IsOptional()
    public userId?: number;
}