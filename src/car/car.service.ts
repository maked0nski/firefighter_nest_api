import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateCarDto} from "./dto/create.car.dto";
import {PrismaService} from "../_core/prisma.service";
import {Car as CarModel} from "@prisma/client";
import {Exception} from "../_exceptions";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime";

@Injectable()
export class CarService {

    constructor(private readonly prismaService: PrismaService) {
    }

    async create(carDto: CreateCarDto): Promise<CarModel> {
        return await this.prismaService.car
            .create({
                data: carDto
            })
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException(Exception.FORBIDDEN);
                    }
                }
                throw error;
            });
    }


    async getAll(): Promise<CarModel[]> {
        return await this.prismaService.car.findMany();
    }


    async getById(id: number): Promise<CarModel> {
        return await this.prismaService.car
            .findFirst({
                where: {id},
                rejectOnNotFound: true
            })
            .catch((error) => {
                console.log(error.code)
                throw new NotFoundException(Exception.CARD_NOT_FOUND)
            })
    };

    async update(id: number, car: CreateCarDto): Promise<CarModel> {
        return await this.prismaService.car
            .update({
                where:{id},
                data:{...car}
            })
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException(Exception.FORBIDDEN);
                    }
                    if (error.code === 'P2025') {
                        throw new NotFoundException(Exception.CAR_NOT_FOUND)
                    }
                }
                console.log("position service update error code: ", error.code)
                throw error;
            });
    }

    async delete(id: number) {
        return await this.prismaService.car
            .delete({
                where: {id}
            })
            .catch(()=>{
                throw new NotFoundException(Exception.CAR_NOT_FOUND)
            });
    }


}
