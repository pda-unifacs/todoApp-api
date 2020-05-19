import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { IUser } from './user.interface'
import { CreateUsersDTO } from './dto/create-user.dto'

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private userModel: Model<User>) {}

  async createUser(createUserDTO: CreateUsersDTO) {
    const createUser = new this.userModel(createUserDTO)
    return await createUser.save()
  }

  async findOneByEmail(email): Model<User> {
    return await this.userModel.findOne({email: email})
  }
}
