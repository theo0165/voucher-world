import { Router } from 'express';
import StoreIndexController from '../controllers/Store/StoreIndexController';

const router: Router = Router();

router.get('/', StoreIndexController);

export default router;
