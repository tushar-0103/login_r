import { Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { comparePasswords } from './bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user && comparePasswords) {
      return user;
    }
    return null;
  }
}
