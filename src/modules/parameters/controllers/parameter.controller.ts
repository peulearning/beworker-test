import { Request, Response } from 'express';
import { ParameterService } from '../services/parameter.services';
import { createParameterSchema } from '../dto/parameter.dto';

const service = new ParameterService();

export class ParameterController {
  async create(req: Request, res: Response) {
    const data = createParameterSchema.parse(req.body);

    const parameter = await service.create(data);

    return res.status(201).json(parameter);
  }

  async list(req: Request, res: Response) {
    const parameters = await service.list();

    return res.json(parameters);
  }

  async attach(req: Request, res: Response) {
    const { linkId, parameterId } = req.body;

    const result = await service.attachToLink(linkId, parameterId);

    return res.status(201).json(result);
  }
}