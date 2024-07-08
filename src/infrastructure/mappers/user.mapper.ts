import { CustomError, UserEntity } from "../../domain";


export class UserMapper{

    static userEntityFromObject(object:{[key: string]:any}){
        const {id,_id ,name, email, password, roles} = object;
        if (!_id ||!id){
            throw CustomError.badRequest('Invalid id'); 
        }
        if (!name){
            throw CustomError.badRequest('Invalid name'); 
        }
        if (!email){
            throw CustomError.badRequest('Invalid email'); 
        }
        if (!password){
            throw CustomError.badRequest('Invalid password'); 
        }
        if (!roles){
            throw CustomError.badRequest('Invalid roles'); 
        }
        return new UserEntity(id||_id, name, email, password, roles);
    }


}