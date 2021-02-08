//req를 다음 단계로 넘어갈지 아닐지 결정

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { AllowedRoles } from './role.decorator';
@Injectable()
export class AuthGuard implements CanActivate {
  // metadata가 set된 경우만 AuthGuard 작동!
  constructor(private readonly reflector: Reflector) {}
  //여기서 context는 graphql이 아닌 req(pipeline)의 request
  canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<AllowedRoles>(
      'roles',
      context.getHandler(),
    );
    if (!roles) {
      // metadata가 없는 resolver는 true!
      return true;
    }
    // metadata가 있으면 user가 있어야 한다!
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const user: User = gqlContext['user'];
    if (!user) {
      return false;
    }
    if (roles.includes('Any')) {
      return true;
    }
    return roles.includes(user.role);
    // user의 role이 metadata에 속하지 않으면 false!
    // ["Delivery"], "Owner" === false
    // ["Delivery"], "Delivery" === false
  }
}

//false일 경우 forbidden resources error;
