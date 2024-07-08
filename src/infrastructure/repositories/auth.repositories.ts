import { AuthRepository, RegisterUserDto, UserEntity } from "../../domain";


export class AuthRepositoryImpl implements AuthRepository {
    constructor(private readonly datasource: any) {
    }

    async registerUser(registerUser: RegisterUserDto): Promise<UserEntity> {
        try {
            // Lógica para registrar al usuario utilizando el datasource proporcionado
            const newUser = await this.datasource.registerUser(registerUser);
            
            // Suponiendo que `this.datasource.registerUser` devuelve un UserEntity después de registrar al usuario
            return newUser;
        } catch ( CustomError) {
            throw CustomError;
           
        }
    }
    async loginUser(loginUser: any): Promise<UserEntity> {
        try {
            // Lógica para loguear al usuario utilizando el datasource proporcionado
            const user = await this.datasource.loginUser(loginUser);
            
            // Suponiendo que `this.datasource.loginUser` devuelve un UserEntity después de loguear al usuario
            return user;
        } catch ( CustomError) {
            throw CustomError;
           
        }
    }
}
