 import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../config';
import { User } from '../../data/mongodb';


export class AuthMiddleware {
    static  validatejwt = async (req:Request, res:Response,next :NextFunction) => {

        const authorization = req.header('Authorization');
        if (!authorization) return res.status(401).json({ error: 'Unauthorized' });
        if (!authorization.startsWith('Bearer ')) return res.status(401).json({ error: 'invalid bearer token' });
        
        const token = authorization.split(' ').at(1) || '';
        try {

            const payload =await JwtAdapter.validateToken<{id:string}>(token);
            if (!payload) return res.status(401).json({ error: 'pepe' });
            const user =User.findById(payload.id);

            

            req.body.payload = payload;

            next();} 
            catch (error) {
            console.log(error)
            return res.status(401).json({ error: 'Unauthorized' });
        }

        

        console.log("paso por el middleware")
 
        console.log("salio del middleware")
    }
    
    


}