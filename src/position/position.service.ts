import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../core/prisma.service";
import {PositionDto} from "./dto";
import {Exception} from "../exceptions";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime";
import {Position as PositionModel} from '@prisma/client';

@Injectable()
export class PositionService {

    constructor(private readonly prismaService: PrismaService) {
    }


    async create(data: PositionDto): Promise<PositionModel> {
        return await this.prismaService.position.create({data})
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException('Credentials incorrect');
                    }
                }
                console.log("position service create error code: ", error.code)
                throw error;
            });
    }


    async getAll(): Promise<PositionModel[]> {
        return await this.prismaService.position.findMany();
    }


    async getById(id: number): Promise<PositionModel> {
        return await this.prismaService.position.findUnique({
            where: {
                id
            },
            rejectOnNotFound: true
        })
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code==='P2025'){
                        throw new NotFoundException(Exception.POSITION_NOT_FOUND)
                    }
                    console.log("position service update new error code: ", error.code)
                }
                console.log("position service update new error code: ", error.code)
                throw error;
            })
    }


    async update(id: number, data: PositionDto): Promise<PositionModel> {
        return await this.prismaService.position
            .update({
                where: {id},
                data
            })
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException('Credentials incorrect');
                    }
                    if (error.code==='P2025'){
                        throw new NotFoundException(Exception.POSITION_NOT_FOUND)
                    }
                }
                console.log("position service update error code: ", error.code)
                throw error;
            });
    }


    async delete(id: number): Promise<void> {
        await this.prismaService.position
            .delete({
                where: {id}
            })
            .catch((error) => {
                console.log("position service delete error code: ", error.code)
                throw new NotFoundException(Exception.POSITION_NOT_FOUND)
            });
    }
}

