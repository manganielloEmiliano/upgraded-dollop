import { LoginUserDto } from "../../dtos/auth/login-user.dtos";
import { CustomError } from "../../errors/cusmtom.error";
import { AuthRepository } from "../../repositories/auth.repository";
import { JwtAdapter } from "../../../config";


interface LoginUserUseCase {
    execute(LoginUserDto: LoginUserDto): Promise<UserToken>;
}

interface UserToken {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}

type SignToken = (payload: object, duration?: string) => Promise<string | null>;

export class LoginUser implements LoginUserUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken
    ) { }

    async execute(LoginUserDto: LoginUserDto): Promise<UserToken> {
        const user = await this.authRepository.loginUser(LoginUserDto);

        const token = await this.signToken({ id: user.id }, '2h');
        if (!token) throw CustomError.internalServer('Error generating token');

        return {
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }

    }

}