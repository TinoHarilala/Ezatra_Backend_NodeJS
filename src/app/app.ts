import * as dotenv from 'dotenv';
import { Application, Request, Response } from 'express';
import * as express from 'express';
import * as path from 'path';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import routes from './routes';
import errorHandler from './middlewares/error.middleware';
import { CustomError } from './models/custom-error.model';

class App {
    app: Application;

    constructor(port: number) {
        dotenv.config({ path: path.join(__dirname, '../../.env') });
        this.app = express();
        this.app.set('port', process.env.PORT || port);

        this.app.use(bodyParser.json({
            limit: '50mb'
        }));

        this.app.use(cors({
            origin: '*'
        }));

        this.initRoutes();

        this.app.use((err: Error, req: Request, res: Response, next: express.NextFunction) => {
            console.error(err);
            next(err);
        })

        this.app.use(errorHandler);
    }

    private initRoutes() {
        this.app.use('/', routes);
    }

    public listen() {
        this.app.get('/', function(request, response) {
          var result = 'App is running'
          response.send(result);
        }).listen(this.app.get('port'), () => {
            console.log('App is running, server is listening on port ', this.app.get('port'));
        });
    }
    
}

export default App;