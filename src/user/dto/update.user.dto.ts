import {Car, Fuel_card, Position, Role} from "@prisma/client";
import { IsNotEmpty, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateUserDto {

    @ApiProperty({example: 'Клопотенко', description: 'Прізвище'})
    @IsString()
    @IsOptional()
    public surename: string;

    @ApiProperty({example: 'Андрій', description: "Ім'я"})
    @IsString()
    @IsOptional()
    public name: string;

    @ApiProperty({example: 'Богданович', description: "По батькові"})
    @IsString()
    @IsOptional()
    public fathersname: string;

    @ApiProperty({example: '(050) 86-99-012', description: "№ телефону"})
    @IsString()
    @IsOptional()
    public phone: string;

    @ApiProperty({example: '31.12.1982', description: "Дата народження строка"})
    @IsString()
    @IsOptional()
    public birthday: string;

    @ApiProperty({example: 'qwerty12', description: "Пароль від 8 до 20 символів"})
    @IsNotEmpty()
    @IsOptional()
    public password?: string;

    @ApiProperty({example: '"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"', description: "Посилання на фото користувача"})
    @IsString()
    @IsOptional()
    public image?: string;

    @ApiProperty({example: 'ADMIN', description: "Роль користувача USER, ADMIN чи ROOT"})
    @IsString()
    @IsOptional()
    public role?: Role;


    @IsOptional()
    public position_id?: Position;


    @IsOptional()
    public car?: Car;

    @IsOptional()
    public fuel_card?: Fuel_card;


}