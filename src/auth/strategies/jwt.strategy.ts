import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../entities";
import { JwtPayload } from "../interfaces";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
        super({
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }
    async validate(payload: JwtPayload): Promise<User> {
        const { email } = payload;
        const user = await this.userRepository.findOneBy({ email });

        if (!user) throw new UnauthorizedException(`Token! not valid`);

        if (!user.isActive) throw new UnauthorizedException(`User is inactive!`);

        return user;
    }
}