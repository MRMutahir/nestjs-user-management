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

  @Post('login')
  async login(@Body() body: UserDto) {
    try {
      const { email, password }: UserDto = body;
      const user = await this.userService.findUserByEmail(email);
      if (!user) {
        throw new BadRequestException('user not found credentials');
      }

      if (user.password !== password) {
        throw new BadRequestException(
          'Password dose not match Invalid credentials',
        );
      }

      return { message: 'Login successful' };
    } catch (error) {
      // throw new BadRequestException(error);
    }
  }
}
