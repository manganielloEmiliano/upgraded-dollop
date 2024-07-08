import { compareSync, genSaltSync, hashSync } from 'bcryptjs'

export class BcryptjsAdapter{
    static hash (password: string): string {
        const salt =genSaltSync(15)
        return hashSync(password, salt)
    }
    static compare (password: string, hashed: string): boolean {
        return compareSync(password, hashed)
    }
}