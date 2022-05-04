import { Router } from 'express';
import ApiIndexController from '../controllers/ApiIndexController';

const router: Router = Router();

router.get('/', ApiIndexController);

export default router;
