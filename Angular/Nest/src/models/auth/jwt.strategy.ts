import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'asdarsatadwqhery23521fvsdF2R'
        });
    }

    async validate(payload: any){
        return {
            id: payload.sub,
            name: payload.name,
            surname: payload.surname,
            username: payload.username,
            email: payload.email,
            createdAt: payload.createdAt,            
        };
    }
}