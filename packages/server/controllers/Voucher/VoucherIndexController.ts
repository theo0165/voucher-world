import { Request, Response } from 'express';
import { supabase } from '../../utils/supabase';

const VoucherIndexController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const vouchers = await supabase.from('voucher').select();

  if (vouchers.error) {
    res.json({
      error: vouchers.error.message,
      code: vouchers.status,
      successful: false,
    });
  }

  res.json({ data: vouchers.data, successful: true });
};

export default VoucherIndexController;
