import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from '../auth.service'
import { PassportStrategy } from '@nestjs/passport'
import { IJwtPayload } from '../interfaces/jwt-payload.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // TODO: Adicionar a Key do servico
      secretOrKey: ''
    })
  }

  async valide(payload: IJwtPayload) {
    const user = await this.authService.validateUserByJwt(payload)

    if(!user) { throw new UnauthorizedException() }
    return user
  }
}