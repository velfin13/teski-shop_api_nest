import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators';
import { User } from './entities';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  private(@GetUser('user') user: User) {
    return {
      ok: true,
      message: "Holaa",
      user
    };
  }

}
