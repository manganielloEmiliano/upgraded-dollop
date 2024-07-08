import moongoose from 'mongoose';

interface Options {
    mongoUrl: string;
    dbName:string}

export class MongoDatabase {
    static async connect(options:Options) {
        const {dbName,mongoUrl}=options;

        try {
            await moongoose.connect(mongoUrl,{
                dbName:dbName,
            });
            console.log('Connected to the database');
            }
        catch (error) {
            console.log('Error connecting to the database',error);
            throw error;

        }
    }
}
 