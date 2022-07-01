import {ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
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
        try {
            return await this.prismaService.position.create({data})
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new ForbiddenException(Exception.FORBIDDEN);
            }
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }


    async getAll(): Promise<PositionModel[]> {
        try {
            return await this.prismaService.position.findMany();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }

    }


    async getById(id: number): Promise<PositionModel> {
        try {
            return await this.prismaService.position.findUnique({
                where: {
                    id
                },
                rejectOnNotFound: true
            })
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException(Exception.POSITION_NOT_FOUND)
            }
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }


    async update(id: number, data: PositionDto): Promise<PositionModel> {
        try {
            return await this.prismaService.position
                .update({
                    where: {id},
                    data
                })
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException(Exception.FORBIDDEN);
                }
                if (error.code === 'P2025') {
                    throw new NotFoundException(Exception.POSITION_NOT_FOUND)
                }
            }
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }


    async delete(id: number): Promise<void> {
        try {
            await this.prismaService.position
                .delete({
                    where: {id}
                })
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException(Exception.POSITION_NOT_FOUND)
            }
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}

