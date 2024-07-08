export class LoginUserDto{
    private constructor(
        public email: string,
        public password: string
    ){}
    static create(object:{ [key :string]:any}):[string?, LoginUserDto?]{
        const {email, password} = object;
        if(!email) return ['email is required'];
        if(!password) return ['password is required'];
        if(password.length < 8) return ['password must be at least 8 characters long']
        return [undefined, new LoginUserDto(email, password)]
    }
}