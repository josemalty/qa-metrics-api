import express, { Request, Response } from "express";
import { UserController } from "./controller/user.controller"; // import the post controller
import { createConnection } from "typeorm";
import { QaasController } from "./controller/qaas.controller";
import { GoalsController } from "./controller/goals.controller";
require("dotenv").config();

class Server {
    private userController: UserController;
    private qaasController: QaasController;
    private goalsController: GoalsController;
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
        console.log("process.env.HOST_DB", process.env.HOST_DB);
        console.log("process.env.PORT_DB", process.env.PORT_DB);
        const PORT_DB = Number(process.env.PORT_DB) || 5432;
        const HOST_DB = process.env.HOST_DB || "172.18.0.2";
        console.log("PORT_DB", PORT_DB);
        console.log("HOST_DB", HOST_DB);
        await createConnection({
            type: "postgres",
            host: HOST_DB,
            port: PORT_DB,
            username: "postgres",
            password: "rngtjeb2",
            database: "postgres",
            entities: ["build/database/entities/**/*.js"],
            synchronize: true,
            name: "postgres",
        });

        this.userController = new UserController();
        this.qaasController = new QaasController();
        this.goalsController = new GoalsController();

        this.app.get("/", (req: Request, res: Response) => {
            res.send("App is working!");
        });

        this.app.use(`/api/users/`, this.userController.router); // Configure the new routes of the controller post
        this.app.use(`/api/qaas/`, this.qaasController.router);
        this.app.use(`/api/goals/`, this.goalsController.router);
    }

    /**
     * Used to start the server
     */
    public start() {
        this.app.listen(this.app.get("port"), () => {
            console.info(`Server is listening ${this.app.get("port")} port.`);
        });
    }
}

const server = new Server(); // Create server instance
server.start(); // Execute the server
