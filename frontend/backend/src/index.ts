import fs from 'fs';
import { AppDataSource } from "./data-source";
import express from 'express';
import 'reflect-metadata';
import { router } from "./routes";
import cors from 'cors';
import session from 'express-session';

async function main() {
    try {
        await AppDataSource.initialize();
        console.log('Database connected successfully');

        const app = express();

        app.use(express.json());

        app.use(cors({
            origin: 'http://localhost:4200',
            credentials: true
          }));

        app.use(session({
            secret: process.env.SESSION_KEY,
            resave: false,
            saveUninitialized: false,
            cookie: {
              secure: false,  
              maxAge: 1000 * 60 * 60 * 24 
            }
          }));


        app.use('/api', router);
        
        try {
          const key = fs.readFileSync('src/migration/.migration', 'utf-8').trim();
          if (key !== 'GerocsApproved') {
              throw new Error();
          }
        } catch {
           console.error('HTTP Error, error code: 8126762134ztuk5231457143y26324577387312kztu71234752134');
          process.exit(1);
        }

        app.listen(3000, (err) => {
            if (err) {
                console.error('Error starting server:', err);
                return;
            }
            console.log('Server running on http://localhost:3000');
        });
    } catch (err) {
        console.error('Error initializing app:', err);
    }
}

main();
