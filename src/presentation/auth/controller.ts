import { Request, Response } from 'express';
import { CustomError, RegisterUser, RegisterUserDto } from '../../domain';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dtos';
import { User } from '../../data/mongodb/models/user.model';
import { LoginUser } from '../../domain/use-cases/auth/loginUser.use-case';



export class AuthController {
    constructor(
        private readonly authRepository: AuthRepository,
    ) {}

    private handleError(error: unknown, res: Response) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }

    registerUser = async (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if (error) {
            return res.status(400).json({ error });
        }
        new RegisterUser(this.authRepository).execute(registerUserDto!)
        .then(data => res.json(data))
        .catch(error => this.handleError(error, res));
    }

    loginUser = async (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if (error) {
            return res.status(400).json({ error });
        }
        new LoginUser(this.authRepository).execute(loginUserDto!)
        .then(data => res.json(data))
        .catch(error => this.handleError(error, res));
    }

    getUser = async (req: Request, res: Response) => {
        try {
            const users = await User.find();
            res.json({
                users,
                user: req.body.user,
            });
            
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
