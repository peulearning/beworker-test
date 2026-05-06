import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { loginSchema, registerSchema } from "../dtos/auth.dto";

const service = new AuthService();

export class AuthController {
  async register(req: Request, res: Response){
    const data = registerSchema.parse(req.body);

    const user = await service.register(data);

    return res.status(201).json(user);
  }

async login(req: Request, res: Response){
  const data = loginSchema.parse(req.body);
  const result = await service.login(data);

  return res.json(result);
}


}