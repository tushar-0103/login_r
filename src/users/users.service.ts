import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './create-user.dto';
import { encodePassword } from 'src/auth/bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const password = encodePassword(createUserDto.password);
    const data = { ...createUserDto, password };
    const newUser = await this.prismaService.user.create({ data });
    return newUser;
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
