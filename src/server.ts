import express, { Request, Response } from "express";
import { UserController } from "./controller/user.controller"; // import the post controller
import { createConnection } from "typeorm";
import {throws} from "balbal";

class Server {
    private userController: UserController;
    private app: express.Application;

    constructor() {
        this.app = express(); // init the application
        this.configuration();
        this.routes();
    }

    /**
     * Method to configure the server,
     * If we didn't configure the port into the environment
     * variables it takes the default port 3000
     */
    public configuration() {
        this.app.set("port", process.env.PORT || 3001);
        this.app.use(express.json());
    }

    /**
     * Method to configure the routes
     */
    public async routes() {
        await createConnection({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "rngtjeb2",
            database: "postgres",
            entities: ["build/database/entities/**/*.js"],
            synchronize: true,
            name: "postgres",
        });

        this.userController = new UserController();

        this.app.get("/", (req: Request, res: Response) => {
            res.send("Hello world!");
        });

        this.app.use(`/api/users/`, this.userController.router); // Configure the new routes of the controller post
    }

    /**
     * Used to start the server
     */
    public start() {
        this.app.listen(this.app.get("port"), () => {
            console.log(`Server is listening ${this.app.get("port")} port.`);
        });
    }
}

const server = new Server(); // Create server instance
server.start(); // Execute the server
