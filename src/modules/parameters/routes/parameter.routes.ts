import { Router } from 'express';
import { ParameterController } from '../controllers/parameter.controller';
import { authMiddleware } from '../../../shared/middlewares/auth.middlewares';

const router = Router();
const controller = new ParameterController();

router.post('/', authMiddleware, controller.create);
router.get('/', authMiddleware, controller.list);

// associação
router.post('/attach', authMiddleware, controller.attach);

export default router;