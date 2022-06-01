import { Router } from 'express';

import store from './store';
import voucher from './voucher';

const router: Router = Router();

router.use('/store', store);
router.use('/voucher', voucher);

export default router;
