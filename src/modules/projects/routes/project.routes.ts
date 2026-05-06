import { Router } from 'express';
import { ProjectController } from '../controllers/project.controller';
import { authMiddleware } from '../../../shared/middlewares/auth.middlewares';

const router = Router();
const controller = new ProjectController();

router.post('/', authMiddleware, controller.create);
router.get('/', authMiddleware, controller.list);

export default router;