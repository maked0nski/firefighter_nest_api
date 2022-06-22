import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Length} from "class-validator";
import {Station_brend} from "../type";

export class UpdateFuelCardDto {

    @ApiProperty({example: '1234123412341234', description: 'Номер паливної карточки 8 цифр'})
    @IsString()
    @Length(16, 16)
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
    @IsOptional()
    public station_brend?: Station_brend;

    @ApiProperty({example: '1', description: "User id"})
    @IsNumber()
    @IsOptional()
    public userId?: number;
}