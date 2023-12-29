import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
    ) {}
  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    if (user && await bcrypt.compare(user.password, password)) {
      const { password, ...result } = user;
      return {status: true, user: result};
    }
    return {status: false, message: 'Invalid credentials'};
  }

  async login(user: any) {
      const payload = { email: user.email, sub: user.id };
      return {
          access_token: this.jwtService.sign(payload),
          status: true,
      };
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }
}
