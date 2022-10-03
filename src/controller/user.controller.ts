import { throws } from "assert";
import { Router, Response, Request } from "express";
import { UserEntity } from "../database/entities/user.entity";
import { QaasEntity } from "../database/entities/qaas.entity";
import { UserService } from "../services/user.service"; // import service

export class UserController {
  public router: Router;
  private userService: UserService;

  constructor() {
    this.userService = new UserService(); // Create a new instance of UserController
    this.router = Router();
    this.routes();
  }

  public index = async (req: Request, res: Response) => {
    const users = await this.userService.index();
    const foundUsers = await this.userService.index();
    if (!foundUsers) {
      return res.status(404).send("Usuários não encontrados!");
    }
    res.send(users).json();
  };

  public create = async (req: Request, res: Response) => {
    const user = req["body"] as UserEntity;
    const newUser = await this.userService.create(user);
    return res.status(201).send(newUser);
  };

  public update = async (req: Request, res: Response) => {
    try {
      const user = req["body"] as UserEntity;
      const id = req["params"]["id"];
      const foundUser = await this.userService.findById(Number(id));
      if (foundUser === undefined) {
        return res.status(404).send("Usuário não encontrado!");
      }
      const updatedUser = await this.userService.update(user, Number(id));
      res.send(updatedUser);
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  };

  public delete = async (req: Request, res: Response) => {
    const id = req["params"]["id"];
    const foundUser = await this.userService.findById(Number(id));
    if (foundUser === undefined) {
      return res.status(404).send("Usuário não encontrado!");
    }
    await this.userService.delete(Number(id));
    res.status(204).send("Deletado com sucesso!");
  };

  public findById = async (req: Request, res: Response) => {
    try {
      const id = req["params"]["id"];
      const foundUser = await this.userService.findById(Number(id));
      if (!foundUser) {
        return res.status(404).send("Usuário não encontrado!");
      }
      res.send(await this.userService.findById(Number(id)));
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
