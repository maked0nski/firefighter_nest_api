import {Role} from "@prisma/client";
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

    @ApiProperty({example: '31.12.1982', description: "Дата народження строка"})
    @IsString()
    @IsOptional()
    public birthday: string;

    @ApiProperty({example: 'qwerty12', description: "Пароль від 8 до 20 символів"})
    @IsNotEmpty()
    @IsOptional()
    public password?: string;

    @ApiProperty({example: 'ADMIN', description: "Роль користувача USER, ADMIN чи ROOT"})
    @IsString()
    @IsOptional()
    public image?: string;
    public role?: Role;
}