import {PassportStrategy} from "@nestjs/passport";
import { UnauthorizedException} from "@nestjs/common";
import { Strategy, ExtractJwt} from 'passport-jwt';
import {JwtPayload} from "./jwt-payload.interface";
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "./user.repository";
import {User} from "./user.entity";
import * as config from 'config';

export  class JwtStrategy extends PassportStrategy(Strategy){

constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
) {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
    });
}
async validate(payload: JwtPayload): Promise<User>{
    const{ username } = payload;
    const user = await this.userRepository.findOne({ username });

    if(!user){
        throw new UnauthorizedException();
    }
    return user;
}
}