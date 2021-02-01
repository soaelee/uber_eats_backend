import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateAccountInput } from './dtos/create-account.dto';

//Service must have repository in constructor
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<[boolean, string?]> {
    //1. check new user
    try {
      const exists = await this.users.findOne({ email });
      if (exists) {
        return [false, 'There is a user with that email already'];
      }
      //2. create user & hash the password(이건 여기서 안하고 다른곳에서)
      await this.users.save(this.users.create({ email, password, role }));
      return [true];
    } catch (e) {
      console.log(e);
      return [false, 'Could not create user'];
    }
  }
}
