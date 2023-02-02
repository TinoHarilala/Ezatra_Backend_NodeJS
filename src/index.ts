import App from "./app/app"
import { AppDataSource } from "./data-source"

AppDataSource.initialize().then(async () => {
    const app = new App(5001);
    
    app.listen();

}).catch(error => console.log('Index', error))
