import {ApiProperty} from "@nestjs/swagger";
import {IsString, Length} from "class-validator";

export class CreateCarDto {

    @ApiProperty({example: 'JN1WNYD21U0000001', description: 'VIN номер машини 17 символів'})
    @IsString()
    @Length(17, 17)
    public vin: string;

    @ApiProperty({example: 'Lamborghini Diablo', description: 'Модель машини'})
    @IsString()
    public model: string;

    @ApiProperty({example: 'Газ', description: 'На якому паливі'})
    @IsString()
    public fuel: string;


    @ApiProperty({example: '2001', description: 'Рік випуску авто'})
    @IsString()
    public year: string;


    @ApiProperty({example: 'ав 3434543', description: 'Номер техпаспорта авто'})
    @IsString()
    public passport_car: string;


    @ApiProperty({example: '4 1234 1234', description: 'Показник оддометра авто (скільки проїхав км)'})
    @IsString()
    public oddometr: number;


    @ApiProperty({example: '01.01.2022', description: 'Дата страховки авто'})
    @IsString()
    public insurance: string;

}