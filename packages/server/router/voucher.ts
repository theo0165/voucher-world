import { Router } from 'express';
import VoucherIndexController from '../controllers/Voucher/VoucherIndexController';

const router: Router = Router();

router.get('/', VoucherIndexController);

export default router;
