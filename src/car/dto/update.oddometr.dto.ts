import {ApiProperty} from "@nestjs/swagger";
import { IsString} from "class-validator";

export class UpdateOddometrDto{
    @ApiProperty({example: '4 1234 1234', description: 'Показник оддометра авто (скільки проїхав км)'})
    @IsString()
    public oddometr: string
}