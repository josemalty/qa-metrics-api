import { throws } from "assert";
import { Router, Response, Request } from "express";
import { GoalsEntity } from "../database/entities/goals.entity";
import { GoalsService } from "../services/goals.service"; // import service

export class GoalsController {
    public router: Router;
    private goalsService: GoalsService;

    constructor() {
        this.goalsService = new GoalsService(); // Create a new instance of GoalsController
        this.router = Router();
        this.routes();
    }

    public index = async (req: Request, res: Response) => {
        const goals = await this.goalsService.index();
        const foundGoals = await this.goalsService.index();
        if (!foundGoals) {
            return res.status(404).send("Nenhuma meta foi cadastrada!");
        }
        res.send(goals).json();
    };

    public create = async (req: Request, res: Response) => {
        const goals = req["body"] as GoalsEntity;
        const newGoals = await this.goalsService.create(goals);
        return res.status(201).send(newGoals);
    };

    public update = async (req: Request, res: Response) => {
        try {
            const goals = req["body"] as GoalsEntity;
            const id = req["params"]["id"];
            const foundGoals = await this.goalsService.findById(Number(id));
            if (foundGoals === undefined) {
                return res.status(404).send("Meta não encontrada!");
            }
            const updatedGoals = await this.goalsService.update(goals, Number(id));
            res.send(updatedGoals);
        } catch (error) {
            console.error(error);
            res.send(error);
        }
    };

    public delete = async (req: Request, res: Response) => {
        const id = req["params"]["id"];
        const foundGoals = await this.goalsService.findById(Number(id));
        if (foundGoals === undefined) {
            return res.status(404).send("Meta não encontrada!");
        }
        await this.goalsService.delete(Number(id));
        res.status(204).send("Meta deletada com sucesso!");
    };

    public findById = async (req: Request, res: Response) => {
        try {
            const id = req["params"]["id"];
            const foundGoals = await this.goalsService.findById(Number(id));
            if (!foundGoals) {
                return res.status(404).send("Meta não encontrada!");
            }
            res.send(await this.goalsService.findById(Number(id)));
        } catch (error) {
            console.error(error);
            res.send(error);
        }
    };

    /**
     * Configure the routes of controller
     */
    public routes() {
        this.router.get("/", this.index);
        this.router.get("/:id", this.findById);
        this.router.post("/", this.create);
        this.router.put("/:id", this.update);
        this.router.delete("/:id", this.delete);
    }
}
