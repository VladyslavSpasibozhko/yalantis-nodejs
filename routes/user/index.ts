import { Router } from 'express';
import UserControllers from '../../controllers/user';

const router = Router();

router.get('/:id', UserControllers.getUser);
router.post('/', UserControllers.createUser);

export default router;
