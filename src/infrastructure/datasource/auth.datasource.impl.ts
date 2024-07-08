import { RegisterUserDto, UserEntity } from "../../domain";
import { AuthDataSource } from "../../domain/dataSources/auth.datasource";
import { CustomError } from "../../domain/errors/cusmtom.error";
import { User } from "../../data/mongodb/models/user.model"; // Asegúrate de que la ruta es correcta
import { BcryptjsAdapter } from "../../config";
import { UserMapper } from "../mappers/user.mapper";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dtos";


type Hashfunction = (password: string) => string;
type comparePassword = (password: string, hashed: string) => boolean;

export class AuthDataSourceImpl implements AuthDataSource {

    constructor(
        private readonly hashPassword: Hashfunction = BcryptjsAdapter.hash,
        private readonly comparePassword: comparePassword = BcryptjsAdapter.compare
    ) {
    }



    async registerUser(registerUser: RegisterUserDto): Promise<UserEntity> {
        const { name, email, password } = registerUser;
        try {
            const exist = await User.findOne({ email: email });
            if (exist) {
                throw CustomError.badRequest('The email is already in use');
            }
            const user = await User.create({
                name: name,
                email: email,
                password: this.hashPassword(password),
            });
            await user.save();

            return UserMapper.userEntityFromObject(user) // Asegúrate de que los parámetros coincidan con el constructor
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            // Lanza una excepción genérica si el error no es de tipo CustomError
            throw CustomError.internalServer('An unexpected error occurred during user registration');
        }
    }
    async loginUser(loginUser: LoginUserDto): Promise<UserEntity> {
        const { email, password } = loginUser;
        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                throw CustomError.notFound('User not found');
            }
            const isPasswordValid = this.comparePassword(password, user.password);
            if (!isPasswordValid) {
                throw CustomError.badRequest('Invalid password');
            }
            return UserMapper.userEntityFromObject(user);
    }   catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            // Lanza una excepción genérica si el error no es de tipo CustomError
            throw CustomError.internalServer('An unexpected error occurred during user login');
        }
}}
