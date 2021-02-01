import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

//Input과 Output 생성

//User에서 email, password, role만 pick 해서 dt
@InputType()
export class CreateAccountInput extends PickType(User, [
  'email',
  'password',
  'role',
]) {}

//ok로 결과 반환하고, 에러가 있을 경우 error
@ObjectType()
export class CreateAccountOutput {
  @Field(() => String, { nullable: true })
  error?: string;
  @Field(() => Boolean)
  ok: boolean;
}
