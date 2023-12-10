import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/decorators/role.decorator';
import { UserRole } from 'src/modules/users/users.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [ctx.getHandler(), ctx.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }

    const { user } = ctx.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
