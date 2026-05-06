import { Request, Response } from 'express';
import { ProjectService } from '../services/project.service';
import { createProjectSchema } from '../dtos/project.dto';

const service = new ProjectService();

export class ProjectController {
  async create(req: Request, res: Response){
    const userId = (req as any).userId;
    const parsed = createProjectSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.issues });
    }

    const project = await service.create(userId, parsed.data);

    res.status(201).json(project);
  }


async list(req: Request, res: Response) {
  const userId = (req as any).userId;
  const projects = await service.list(userId);

  return res.json(projects);
}
}