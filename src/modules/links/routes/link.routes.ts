import { Router } from 'express';
import { LinkController } from '../controllers/link.controller';
import { authMiddleware } from '../../../shared/middlewares/auth.middlewares';

const router = Router();
const controller = new LinkController();

router.post('/', authMiddleware, controller.create);
router.get('/', authMiddleware, controller.list);
router.get('/:id/generate', authMiddleware, controller.generate);

export default router;