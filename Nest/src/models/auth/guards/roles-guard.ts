import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../enums/role-enum";
import { ROLES_KEY } from "../decorators/role-decorator";

@Injectable()
export class RolesGuard implements CanActivate{

    //reflector sluzi da procita metadata podatke
    constructor(private reflector: Reflector){
    }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()]  //gethandler - metoda, getclass - kontroler 
        );
        
        //propusti zahtev, inace vraca 403 forbidden
        if (!requiredRoles)
            return true;

        const { user } = context.switchToHttp().getRequest();   //uzmi usera iz request-a

        return requiredRoles.includes(user.role);
    }

}