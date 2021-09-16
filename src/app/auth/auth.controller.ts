import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthTokensPayloadDto } from '@root/models/token/dto/auth-tokens-payload.dto';
import { UserDto } from '@root/models/user/user.dto';
import { TransformInterceptor } from '@root/app/common/interceptors/response-mapper.interceptor';
import { UserService } from '@root/app/user/user.service';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginRequest } from './request/login.request';
import { RegisterRequest } from './request/register.request';
import { LoginResponse } from './response/login.response';

@Controller('auth')
@ApiTags('auth')
@UseInterceptors(TransformInterceptor)
export class AuthController {
  constructor(public readonly userService: UserService, public readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ type: UserDto, description: 'Register User' })
  async register(@Body() registerRequest: RegisterRequest): Promise<any> {
    // return (await this.authService.register(registerRequest)).toDto();
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @ApiOkResponse({
    type: LoginResponse,
    description: 'Login User and Generate Auth Tokens',
  })
  async login(@Body() loginRequest: LoginRequest): Promise<any> {
    // return this.authService.login(loginRequest);
  }

  @Post('refresh-tokens')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: AuthTokensPayloadDto,
    description: 'Refresh Auth Tokens',
  })
  @UseGuards(JwtAuthGuard)
  async refreshToken(@Body('refreshToken') refreshToken: string): Promise<any> {
    // const tokens = await this.authService.refreshAuth(refreshToken);
    // return tokens;
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserDto, description: 'Logout User' })
  async logout(@Body('refreshToken') refreshToken: string): Promise<any> {
    // await this.authService.userLogout(refreshToken);
    // return 'User Logged Out.';
  }
}
