export class Validators {
    static get email(): RegExp {
        // Corrección del patrón regex para validar correos electrónicos
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    }
}
