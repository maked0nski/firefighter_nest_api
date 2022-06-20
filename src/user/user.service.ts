import {Injectable} from '@nestjs/common';

import {PrismaService} from "../core/prisma.service";
import {Prisma, User} from '@prisma/client';

@Injectable()
export class UserService {

    constructor(private prismaService: PrismaService) {
    }

    getAll(): Promise<User[]> {
        return this.prismaService.user.findMany();
    }

    getById(id: string): Promise<User> {
        return this.prismaService.user.findUnique({where: {id: Number(id)}});
    }

    createAuthUser(data: Prisma.UserCreateInput): Promise<User>{
        return this.prismaService.user.create({data});

    }

    updateUser(data:Prisma.UserUpdateInput, userId: string):Promise<User>{
        return  this.prismaService.user.update({where:{id:Number(userId)},data:{image:data.image, role:data.role }})
    }
}
