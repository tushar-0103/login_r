import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthenticatedGugard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return request.isAuthenticated();
  }
}
