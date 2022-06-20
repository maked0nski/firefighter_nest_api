import {Role} from "@prisma/client";
import {IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({example: 'Клопотенко', description: 'Прізвище'})
    @IsString()
    @IsNotEmpty()
    @Length(2, 20)
    public surename: string;

    @ApiProperty({example: 'Андрій', description: "Ім'я"})
    @IsString()
    @IsNotEmpty()
    @Length(2, 20)
    public name: string;

    @ApiProperty({example: 'Богданович', description: "По батькові"})
    @IsString()
    @IsNotEmpty()
    @Length(2, 20)
    public fathersname: string;

    @ApiProperty({example: '050-321-21-12', description: "№ телефону. Унікальний"})
    @IsString()
    @IsNotEmpty()
    public phone: string;

    @ApiProperty({example: 'klopotenko@gmail.com', description: "Електронна пошта. Унікальна"})
    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @ApiProperty({example: '31.12.1982', description: "Дата народження"})
    @IsOptional()
    @IsDateString()
    public birthday: Date;

    @ApiProperty({example: 'qwerty12', description: "Пароль від 8 до 20 символів"})
    @IsString()
    @IsNotEmpty()
    @Length(8, 20)
    public password: string;

    @ApiProperty({example: 'ADMIN', description: "Роль користувача USER, ADMIN чи ROOT"})
    @IsString()
    public image?: string;
    public role?: Role;
}