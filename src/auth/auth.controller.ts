import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDTO } from 'src/users/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async login(@Body() loginUserDTO: LoginUserDTO) {
    return await this.authService.validateUserByPassword(loginUserDTO)
  }
}
