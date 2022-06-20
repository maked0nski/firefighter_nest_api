import {Car, Fuel_card, Position, Role, UserInfo} from "@prisma/client";

export class UpdateUserDto {
    public password: string;
    public user_info?: UserInfo;
    public image?: string;
    public role?: Role;
    public position_id?: Position;
    public car_id?: Car;
    public fuel_card?: Fuel_card;
}