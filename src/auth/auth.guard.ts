//req를 다음 단계로 넘어갈지 아닐지 결정

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  //여기서 context는 graphql이 아닌 req(pipeline)의 request
  canActivate(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const user = gqlContext['user'];
    if (!user) {
      return false;
    }
    return true;
  }
}

//false일 경우 forbidden resources error;
