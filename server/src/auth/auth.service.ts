import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const isMatch = await bcrypt.compare(pass, user.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = {firstName: user.firstName, lastName: user.lastName, username: user.username}
    return {
      accessToken: this.jwtService.sign(payload),
      user: payload
    };
  }


  async registration(data: any) {

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(data.password, saltOrRounds);

    const user = await this.usersService.create(data.username, hash);

    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
      user: payload
    };
  }

  
}