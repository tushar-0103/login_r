import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(data: any) {
    const { password, ...user } = await this.prismaService.user.create({
      data,
    });
    return user;
  }
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.prismaService.user.findFirst({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async findAll() {
    return this.prismaService.user.findMany();
  }
}
export { User };
