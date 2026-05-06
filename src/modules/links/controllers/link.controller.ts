import { Request, Response } from 'express';
import { LinkService } from '../services/link.service';
import { createLinkSchema } from '../dtos/link.dto';

const service = new LinkService();

export class LinkController {
  async create(req: Request, res: Response) {
    const userId = (req as any).userId;

    const data = createLinkSchema.parse(req.body);

    const link = await service.create(userId, data);

    return res.status(201).json(link);
  }

  async list(req: Request, res: Response) {
    const userId = (req as any).userId;
    const { projectId } = req.query;

    const links = await service.list(userId, projectId as string);

    return res.json(links);
  }
}