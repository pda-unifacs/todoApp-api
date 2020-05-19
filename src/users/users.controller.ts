import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common'
import { CreateUsersDTO } from './dto/create-user.dto'
import { UsersService } from './users.service'
import { AuthGuard } from '@nestjs/passport'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDTO: CreateUsersDTO) {
    return await this.usersService.createUser(createUserDTO)
  }

  @Get('test')
  @UseGuards(AuthGuard())
  testAuthRoute() {
    return { message: 'Voce conseguiu!' }
  }
}
