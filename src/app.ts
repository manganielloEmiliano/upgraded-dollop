import { envs } from './config'; 
import { Server } from './presentation/server'; 
import { AppRoutes } from './presentation/routes'; 
import { MongoDatabase } from './data/mongodb';
(async () => {
    await main();
})();

async function main() {

    await MongoDatabase.connect(
        {
         dbName:envs.DB_NAME,
         mongoUrl:envs.MONGO_URL
        
        }
    );

    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    });
    await server.start();
}
