import { Router } from 'express';
import { AuthRoutes } from './auth/authroutes'; // Ajusta la ruta si es necesario
import { AuthMiddleware } from './middlewares/auth.middleware';

export class AppRoutes {
    public static get routes(): Router {
        const router = Router();

        // Monta las rutas de autenticación bajo '/api/auth'
        router.use('/api/auth' ,AuthRoutes.routes);

        // Puedes montar más rutas aquí según sea necesario

        return router;
    }
}
