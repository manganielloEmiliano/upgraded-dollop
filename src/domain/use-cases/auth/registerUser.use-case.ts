import { JwtAdapter } from "../../../config";
import { RegisterUserDto } from "../../dtos/auth/register-user.dtos";
import { CustomError } from "../../errors/cusmtom.error";
import { AuthRepository } from "../../repositories/auth.repository";


interface RegisterUserUseCase {
   execute(RegisterUserDto:RegisterUserDto):Promise<UserToken>;
    }

interface UserToken{
    token:string;
    user:{
        id:string;
        name:string;
        email:string;
    };
}

type SigntToken =(payload: object, duration?: string) => Promise<string | null>;

export class RegisterUser implements RegisterUserUseCase{

    constructor(   
         private readonly authRepository: AuthRepository,
         private readonly  signToken:SigntToken = JwtAdapter.generateToken
        ){} 
    
   async execute(RegisterUserDto: RegisterUserDto): Promise<UserToken> {
        const user = await this.authRepository.registerUser(RegisterUserDto);

        const token = await this.signToken({ id: user.id },'2h');
        if(!token) throw CustomError.internalServer('Error generating token');





       return{
        token: token,
        user:{
            id: user.id,
            name: user.name,
            email: user.email
        }
       }

    }
    
}