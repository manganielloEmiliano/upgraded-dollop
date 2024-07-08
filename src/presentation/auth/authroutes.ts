import { Router, Request, Response } from 'express';
import { AuthController } from './controller';
import { AuthDataSourceImpl, AuthRepositoryImpl } from '../../infrastructure';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { AuthRepository } from '../../domain';





export class AuthRoutes {
    public static get routes(): Router {
        const router = Router();

        const datasource = new AuthDataSourceImpl();

        const authRepository = new AuthRepositoryImpl(datasource);

        const controller = new AuthController(authRepository);

        // Ruta para manejo de login
        router.post('/login',controller.loginUser); 
        

        // Ruta para manejo de registro
        router.post('/register', controller.registerUser);


        router.get('/',AuthMiddleware.validatejwt, controller.getUser);

        return router;
        
    }
}
