import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser, RawHeaders, RoleProtected } from './decorators';
import { User } from './entities';
import { IncomingHttpHeaders } from 'http';
import { UserRoleGuard } from './guards';
import { ValidRoles } from './enum';
import { Auth } from './decorators/auth.decorator';

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
  private(
    @GetUser('name') user: User,
    @RawHeaders() raw: string[],
    @Headers() header: IncomingHttpHeaders
  ) {
    return {
      ok: true,
      user, raw, header
    };
  }


  @Get('private2')
  @RoleProtected(ValidRoles.user)
  @UseGuards(AuthGuard(), UserRoleGuard)
  private2(
    @GetUser() user: User,
  ) {
    return {
      ok: true,
      user
    };
  }

  @Get('private3')
  @Auth(ValidRoles.superUser)
  private3(
    @GetUser() user: User,
  ) {
    return {
      ok: true,
      user
    };
  }

}
