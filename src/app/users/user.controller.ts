import { Request, Response } from "express";
import { UserService } from "./user.service";
import { APIResponse } from "../../lib/APIResponse";

export class UserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  create = async (req: Request, res: Response): Promise<void> => {
    const user = await this.userService.createUser(req.body);
    res.status(201).json(new APIResponse("User Created Successfully", 201, user));
  };

  findAll = async (_req: Request, res: Response):Promise<void> => {
    const users = await this.userService.getAllUsers();
    res.status(200).json(new APIResponse("Users Fetched Successfully", 200, users));
  };

  findByEmail = async (req: Request<{ email: string }>, res: Response): Promise<void> => {
    const { email } = req.params;
    const user = await this.userService.findByEmail(email);
    res.status(200).json(new APIResponse("User Fetched Successfully", 200, user))
  };

  findById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const {id} = req.params;
    const user = await this.userService.findById(id);
    res.status(200).json(new APIResponse("User Fetched Successfully", 200, user))
  };
  
  delete = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const { id } = req.params;
    const user = await this.userService.delete(id);
    res.status(200).json(new APIResponse("User Deleted Successfully", 200, user))
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const { id, name, email, password } = req.body;
    const user = await this.userService.update(id, {name, email, password});
    res.status(200).json(new APIResponse("User Deleted Successfully", 200, user))
  };

}