import { Router, Request, Response } from 'express';
import ApiIndexController from '../controllers/ApiIndexController';

const router: Router = Router();

router.get('/', ApiIndexController);

export default router;
