import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/dto/User.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('signup')
  async signup(@Body() body: UserDto) {
    const { email, password }: UserDto = body;
    const existingUser = await this.userService.findUserByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const user = this.userService.createUser(email, password);
    return user;
  }
}
