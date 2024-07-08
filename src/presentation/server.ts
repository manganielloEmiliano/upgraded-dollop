import express, { Router } from 'express';

interface Options {
    port?: number;
    routes: Router;
}

export class Server {
    public readonly app = express();
    private readonly port: number;
    private readonly routes: Router;

    constructor(options: Options) {
        const { port = 3100, routes } = options;
        this.port = port;
        this.routes = routes;

        // Middleware para analizar solicitudes JSON
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        // Middleware para registro de solicitudes
        this.app.use((req, res, next) => {
            console.log(`${req.method} ${req.url}`);
            next();
        });

        // Usar las rutas definidas
        this.app.use('/', this.routes);
    }

    async start() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}
