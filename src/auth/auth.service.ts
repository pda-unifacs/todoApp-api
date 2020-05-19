import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { LoginUserDTO } from '../users/dto/login-user.dto'
import { UsersService } from '../users/users.service'
import { IJwtPayload } from './interfaces/jwt-payload.interface'


@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}

  async validateUserByPassword(loginAttempt: LoginUserDTO) {
    const userToAttempt = await this.userService.findOneByEmail(loginAttempt.email)

    return new Promise((resolve) => {
      userToAttempt.checkPassword(loginAttempt.password, (err, isMatch) => {
        if(err) throw new UnauthorizedException()
        if(isMatch) {
          resolve(this.createJwtPayload(userToAttempt))
        } else {
          throw new UnauthorizedException()
        }
      })
    })
  }

  async validadeUserByJwt(payload: IJwtPayload) {
    const user = await this.userService.findOneByEmail(payload.email)

    if(user){
      return this.createJwtPayload(user)
    } else {
      throw new UnauthorizedException()
    }
  }

  createJwtPayload(user) {
    const data: JwtPayload = {
      email: user.email
    }
    const jwt = this.jwtService.sign(data)

    return {
      expiresIn: 3600,
      token: jwt
    }
  }
}
