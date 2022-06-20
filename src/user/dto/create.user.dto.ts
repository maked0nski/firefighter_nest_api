import {Car, Fuel_card, Position, Role, UserInfo} from "@prisma/client";

export class CreateUserDto {
    public email: string;
    public password: string;
    public image?: string;
    public role?: Role;
    public fuel_card?: Fuel_card; // має приймає участі у створенні
}