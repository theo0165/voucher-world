import { Router } from 'express';

import store from './store';
import voucher from './voucher';

import ApiIndexController from '../controllers/ApiIndexController';

const router: Router = Router();

router.use('/store', store);
router.use('/voucher', voucher);

router.get('/', ApiIndexController);

export default router;
