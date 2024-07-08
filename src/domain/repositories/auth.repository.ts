import { RegisterUserDto } from "../dtos/auth/register-user.dtos";
import { UserEntity } from "../entities/user.entity";
import { LoginUserDto } from "../dtos/auth/login-user.dtos";


export abstract class AuthRepository {
    abstract registerUser(registerUSer:RegisterUserDto): Promise<UserEntity>;
    abstract loginUser(loginUser:LoginUserDto): Promise<UserEntity>;
}