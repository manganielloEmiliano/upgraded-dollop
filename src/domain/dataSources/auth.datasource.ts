import { LoginUserDto } from "../dtos/auth/login-user.dtos";
import { RegisterUserDto } from "../dtos/auth/register-user.dtos";
import { UserEntity } from "../entities/user.entity";


export abstract class AuthDataSource {
    
    abstract registerUser(registerUSer:RegisterUserDto): Promise<UserEntity>;
    abstract loginUser(loginUser:LoginUserDto): Promise<UserEntity>;
}