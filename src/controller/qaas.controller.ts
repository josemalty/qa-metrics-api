import { throws } from "assert";
import { Router, Response, Request } from "express";
import { QaasEntity } from "../database/entities/qaas.entity";
import { QaasService } from "../services/qaas.service"; // import service

export class QaasController {
    public router: Router;
    private qaasService: QaasService;

    constructor() {
        this.qaasService = new QaasService(); // Create a new instance of QaasController
        this.router = Router();
        this.routes();
    }

    public index = async (req: Request, res: Response) => {
        const qaass = await this.qaasService.index();
        const foundQaass = await this.qaasService.index();
        if (!foundQaass) {
            return res.status(404).send("Nenhum serviço foi cadastrado!");
        }
        res.send(qaass).json();
    };

    public create = async (req: Request, res: Response) => {
        const qaas = req["body"] as QaasEntity;
        const newQaas = await this.qaasService.create(qaas);
        return res.status(201).send(newQaas);
    };

    public update = async (req: Request, res: Response) => {
        try {
            const qaas = req["body"] as QaasEntity;
            const id = req["params"]["id"];
            const foundQaas = await this.qaasService.findById(Number(id));
            if (foundQaas === undefined) {
                return res.status(404).send("Serviço não encontrado!");
            }
            const updatedQaas = await this.qaasService.update(qaas, Number(id));
            res.send(updatedQaas);
        } catch (error) {
            console.error(error);
            res.send(error);
        }
    };

    public delete = async (req: Request, res: Response) => {
        const id = req["params"]["id"];
        const foundQaas = await this.qaasService.findById(Number(id));
        if (foundQaas === undefined) {
            return res.status(404).send("Serviço não encontrado!");
        }
        await this.qaasService.delete(Number(id));
        res.status(204).send("Serviço deletado com sucesso!");
    };

    public findById = async (req: Request, res: Response) => {
        try {
            const id = req["params"]["id"];
            const foundQaas = await this.qaasService.findById(Number(id));
            if (!foundQaas) {
                return res.status(404).send("Serviço não encontrado!");
            }
            res.send(await this.qaasService.findById(Number(id)));
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
