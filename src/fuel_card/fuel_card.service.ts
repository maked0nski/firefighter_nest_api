import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../core/prisma.service";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime";
import {Prisma} from "@prisma/client";
import {UpdateFuelCardDto} from "./dto/update.fuel.card.dto";

@Injectable()
export class FuelCardService {
    constructor(private prismaService: PrismaService) {
    }

    async getAllFuelCards(): Promise<any[]> {
        return await this.prismaService.fuel_card.findMany()
    }

    async getFuelCardById(id: string): Promise<any> {
        return await this.prismaService.fuel_card.findUnique({
            where: {
                id: Number(id),
            },
            rejectOnNotFound:true
        })
            .catch((e) => {
                throw new NotFoundException('Not Found Fuel_card with this id')
            })
    }

    async createFuelCard(data: Prisma.Fuel_cardCreateInput): Promise<any> {
        const fuelCard = await this.prismaService.fuel_card
            .create({data})


            //TODO ExceptionsHandler відровити помилку при введенні знечення не з  списку enum
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException('Credentials incorrect');
                    }
                }
                console.log(`ERRRRRRRRRRRRRRRRRRRRRROOOOOOR!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`)
                throw error;
            });
        return fuelCard;
    }

    async deleteFuelCardById(id: string) {
        return await this.prismaService.fuel_card.delete({
            where:{id: Number(id)}
        })
    }

    async updateFuelCardById(id: string, updateFuelCardDto: UpdateFuelCardDto) {
        return await this.prismaService.fuel_card.update({
            where:{
                id: Number(id)
            },
            data: {
                number:updateFuelCardDto.number,
                pin:updateFuelCardDto.pin,
                active:updateFuelCardDto.active,
                station_brend:updateFuelCardDto.station_brend,
                userId:updateFuelCardDto.userId
            }
        })
    }
}
